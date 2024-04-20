import fastify from "fastify";
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

app.post("/crosswalks", async (request, reply) => {
  const { state, location } = crosswalkSchema.parse(request.body);

  const city = await axios
    .get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${config.geoapifyConfig.apiKey}`
    )
    .then((response) => {
      return response.data.features[0].properties.city;
    })
    .catch((error) => {
      console.error("Error getting location:", error);
      return reply.status(500).send("Internal Server Error");
    });

  const { id } = await addDoc(collection(db, "crosswalks"), {
    id: randomUUID(),
    state,
    location,
    city,
    createdAt: serverTimestamp(),
  });

  const docSnapshot = await getDoc(doc(collection(db, "crosswalks"), id));

  if (docSnapshot.exists()) {
    const addedDocument = docSnapshot.data();

    return reply.status(201).send(addedDocument);
  } else {
    return reply.status(404).send("Document not found.");
  }
});

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
