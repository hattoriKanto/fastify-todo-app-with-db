"use strict";

import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { todosRoutes } from "../src/routes/todos.route";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();
export const app = Fastify({
  logger: true,
});

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(todosRoutes);

export default async (req: FastifyRequest, rep: FastifyReply) => {
  await app.ready();
  app.server.emit("request", req, rep);
};
