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
  const crosswalk = await getDocs(collection(db, "crosswalks"));
  const crosswalks = crosswalk.docs.map((doc) => doc.data());

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

  console.log(location);

  return reply.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  })
  .then(() => {
    console.log(`HTTP server running`);
  });
