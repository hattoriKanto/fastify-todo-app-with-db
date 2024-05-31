import { FastifyInstance, RouteOptions } from "fastify";
import * as todosController from "../controllers/todos.controller";
import { app } from "../../api";

type Routes = (fastify: FastifyInstance, options: RouteOptions) => void;

export const todosRoutes: Routes = async (fastify, options) => {
  app.get("/todos", todosController.getAll);
  app.get("/todos/:todoId", todosController.getOne);
  app.post("/todos", todosController.createOne);
  app.delete("/todos/:todoId", todosController.deleteOne);
  app.patch("/todos/:todoId", todosController.updateOne);
};
