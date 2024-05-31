import { FastifyInstance, RouteOptions } from "fastify";
import * as todosController from "../controllers/todos.controller";

type Routes = (fastify: FastifyInstance, options: RouteOptions) => void;

export const todosRoutes: Routes = async (fastify, options) => {
  fastify.get("/todos", todosController.getAll);
  fastify.get("/todos/:todoId", todosController.getOne);
  fastify.post("/todos", todosController.createOne);
  fastify.delete("/todos/:todoId", todosController.deleteOne);
  fastify.patch("/todos/:todoId", todosController.updateOne);
};
