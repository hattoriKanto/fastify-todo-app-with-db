import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { todosRoutes } from "./routes/todos.route";

const PORT = 5002;

export const fastify = Fastify();
export const prisma = new PrismaClient();

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
fastify.register(todosRoutes);

const main = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`fastify is running on port ${PORT}`);
  } catch (err) {
    console.log("Error occurred while starting the server", err);
    fastify.log.error(err);
    process.exit(1);
  }
};

main();
