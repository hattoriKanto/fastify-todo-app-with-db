import { FastifyReply, FastifyRequest } from "fastify";

export enum ActionsOnMany {
  delete = "delete",
  update = "update",
}

export type Controller = (req: FastifyRequest, rep: FastifyReply) => void;

export interface TodoRequestBody {
  title: string;
  completed: boolean;
  ids: number[];
}

export interface TodoRequestParams {
  todoId: string;
}

export interface TodoRequestQuery {
  action: ActionsOnMany;
  ids: string;
}
