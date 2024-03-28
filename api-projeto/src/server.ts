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
} from "firebase/firestore";
import firebase from "./config/firebase";

const app = fastify();

app.register(cors, {});

const db = getFirestore(firebase);

app.get("/", async () => {
  const crosswalks = (await getDocs(collection(db, "crosswalks"))).docs.map(
    (doc) => doc.data()
  );

  return crosswalks;
});

app.post("/crosswalk", async (request, reply) => {
  const crosswalkSchema = z.object({
    state: z.enum(["SEM_DESGASTE", "DESGASTE_SEVERO", "DESGASTE_MODERADO"]),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  });

  const { state, location } = crosswalkSchema.parse(request.body);

  const { id } = await addDoc(collection(db, "crosswalks"), {
    state,
    location,
  });

  const docSnapshot = await getDoc(doc(collection(db, "crosswalks"), id));

  if (docSnapshot.exists()) {
    const addedDocument = docSnapshot.data();

    return reply.status(201).send(addedDocument);
  } else {
    return reply.status(404).send("Document not found.");
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
