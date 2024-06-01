import { FastifyReply, FastifyRequest } from "fastify";

export type Controller = (req: FastifyRequest, rep: FastifyReply) => void;

export interface TodoRequestBody {
  title: string;
  completed: boolean;
}

export interface TodoRequestParams {
  todoId: string;
}
