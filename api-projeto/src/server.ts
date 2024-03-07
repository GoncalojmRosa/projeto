import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {});

const prisma = new PrismaClient();

app.get("/", async () => {
  const crosswalk = await prisma.crosswalk.findMany();

  return crosswalk;
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

  await prisma.crosswalk.create({
    data: {
      state,
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });

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
