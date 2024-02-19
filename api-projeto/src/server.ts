import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();

const Prisma = new PrismaClient();

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  })
  .then(() => {
    console.log(`HTTP server running`);
  });
