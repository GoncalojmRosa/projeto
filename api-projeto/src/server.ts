import fastify, { RouteShorthandOptions } from "fastify";
import { z } from "zod";
import cors from "@fastify/cors";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import firebase from "./config/firebase";
import { randomUUID } from "crypto";
import axios from "axios";
import config from "./config/config";
import { authenticateApiKey } from "./middleware";

const app = fastify();

app.register(cors, {});

const db = getFirestore(firebase);

const crosswalkSchema = z.object({
  state: z.enum(["SEM_DESGASTE", "DESGASTE_SEVERO", "DESGASTE_MODERADO"]),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type Crosswalk = z.infer<typeof crosswalkSchema>;

async function filterCrosswalks(crosswalks: DocumentData, state: string) {
  return crosswalks.filter((crosswalk: Crosswalk) => crosswalk.state === state)
    .length;
}

app.get("/crosswalks", async () => {
  const crosswalksSnapshot = await getDocs(collection(db, "crosswalks"));
  const crosswalks = crosswalksSnapshot.docs.map((doc) => doc.data());

  const [semDesgasteCount, desgasteSeveroCount, desgasteModeradoCount] =
    await Promise.all([
      filterCrosswalks(crosswalks, "SEM_DESGASTE"),
      filterCrosswalks(crosswalks, "DESGASTE_SEVERO"),
      filterCrosswalks(crosswalks, "DESGASTE_MODERADO"),
    ]);

  return {
    crosswalks,
    semDesgasteCount,
    desgasteSeveroCount,
    desgasteModeradoCount,
  };
});

app.post(
  "/crosswalks",
  { preHandler: authenticateApiKey } as RouteShorthandOptions,
  async (request, reply) => {
    const { state, location } = crosswalkSchema.parse(request.body);

    const city = await axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${config.geoapifyConfig.apiKey}`
      )
      .then((response) => {
        return response.data.features[0].properties.formatted;
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        return reply.status(500).send("Internal Server Error");
      });

    // Query the database to find existing detections within 5 meters of the new detection
    const querySnapshot = await getDocs(collection(db, "crosswalks"));
    let existingDetection = null;
    querySnapshot.forEach((doc) => {
      const existingLocation = doc.data().location;

      const distance = calculateDistance({
        lat1: location.latitude,
        lon1: location.longitude,
        lat2: existingLocation.latitude,
        lon2: existingLocation.longitude,
      });
      if (distance <= 5) {
        existingDetection = doc.ref;
      }
    });
    if (existingDetection) {
      // Update existing detection
      await updateDoc(existingDetection, {
        state,
        location,
        city,
        updatedAt: serverTimestamp(),
      });

      const updatedDocument = (await getDoc(existingDetection)).data();

      return reply.status(200).send(updatedDocument);
    } else {
      // Add new detection
      const { id } = await addDoc(collection(db, "crosswalks"), {
        id: randomUUID(),
        state,
        location,
        city,
        createdAt: serverTimestamp(),
      });

      const newDocument = (
        await getDoc(doc(collection(db, "crosswalks"), id))
      ).data();

      return reply.status(201);
    }
  }
);

// Function to calculate distance between two coordinates
function calculateDistance({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}) {
  var R = 6371000;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

app.delete("/crosswalks/:id", async (request, reply) => {
  try {
    const { id } = request.params as { id: string };

    const crosswalksRef = collection(db, "crosswalks");

    // Query documents with the provided id field
    const querySnapshot = await getDocs(
      query(crosswalksRef, where("id", "==", id))
    );

    let deletedDocData = null;
    querySnapshot.forEach((doc) => {
      deletedDocData = { id: doc.id, ...doc.data() };
    });

    // Delete each document
    const deletionPromises = querySnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deletionPromises);

    // Return the deleted document data
    return reply.status(200).send(deletedDocData);
  } catch (error) {
    console.error("Error deleting crosswalks:", error);
    return reply.status(500).send("Internal Server Error");
  }
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  })
  .then(() => {
    console.log(`HTTP server running`);
  });
