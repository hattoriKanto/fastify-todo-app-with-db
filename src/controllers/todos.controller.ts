import httpCodes from "http-status-codes";
import * as todosServices from "../services/todos.service";
import {
  ActionsOnMany,
  Controller,
  TodoRequestBody,
  TodoRequestParams,
  TodoRequestQuery,
} from "../types";
import { isIdValid } from "../utils/isIdValid";

export const getAll: Controller = async (req, rep) => {
  const response = await todosServices.getAll();

  return rep.code(httpCodes.OK).send(response);
};

export const getOne: Controller = async (req, rep) => {
  const { todoId } = req.params as TodoRequestParams;

  const normalizedTodoId = Number(todoId);
  if (isIdValid(normalizedTodoId)) {
    return rep
      .code(httpCodes.BAD_REQUEST)
      .send({ error: "ID has incorrect type of data" });
  }

  const response = await todosServices.getOneById(normalizedTodoId);
  if (!response) {
    return rep
      .code(httpCodes.NOT_FOUND)
      .send({ error: "Todo does not exist." });
  }

  return rep.code(httpCodes.OK).send(response);
};

export const createOne: Controller = async (req, rep) => {
  const { title } = req.body as TodoRequestBody;
  if (!title) {
    return rep
      .code(httpCodes.BAD_REQUEST)
      .send({ error: "ID has incorrect type of data" });
  }

  const response = await todosServices.createOne(title);
  rep.code(httpCodes.OK).send(response);
};

export const deleteOne: Controller = async (req, rep) => {
  const { todoId } = req.params as TodoRequestParams;

  const normalizedTodoId = Number(todoId);
  if (isIdValid(normalizedTodoId)) {
    return rep
      .code(httpCodes.BAD_REQUEST)
      .send({ error: "ID has incorrect type of data" });
  }

  const isExist = Boolean(await todosServices.getOneById(normalizedTodoId));
  if (!isExist) {
    return rep
      .code(httpCodes.NOT_FOUND)
      .send({ error: "Todo does not exist." });
  }

  await todosServices.deleteOne(normalizedTodoId);
};

export const updateOne: Controller = async (req, rep) => {
  const { todoId } = req.params as TodoRequestParams;

  const normalizedTodoId = Number(todoId);
  if (isIdValid(normalizedTodoId)) {
    return rep
      .code(httpCodes.BAD_REQUEST)
      .send({ error: "ID has incorrect type of data" });
  }

  const isExist = Boolean(await todosServices.getOneById(normalizedTodoId));
  if (!isExist) {
    return rep
      .code(httpCodes.NOT_FOUND)
      .send({ error: "Todo does not exist." });
  }

  const response = await todosServices.updateOne(
    normalizedTodoId,
    req.body as TodoRequestBody
  );

  return rep.code(httpCodes.OK).send(response);
};

export const actionOnMany: Controller = async (req, rep) => {
  const { action } = req.query as TodoRequestQuery;

  if (action === ActionsOnMany.delete) {
    const query = req.query as TodoRequestQuery;
    const idsParam = query.ids;

    if (!idsParam) {
      return rep.status(400).send({ error: "Missing ids parameter" });
    }

    const ids = idsParam.split(",").map((id) => Number(id));

    if (ids.some(isNaN)) {
      return rep.status(400).send({ error: "Invalid ids parameter" });
    }

    const response = await todosServices.deleteMany(ids);

    if (response.count === 0) {
      return rep
        .code(httpCodes.NOT_FOUND)
        .send({ error: "Todos do not exist in database." });
    }

    return rep.code(httpCodes.OK).send(response);
  }

  const { ids, completed } = req.body as TodoRequestBody;

  const response = await todosServices.updateMany(ids, completed);

  if (response.count === 0) {
    return rep
      .code(httpCodes.NOT_FOUND)
      .send({ error: "Todos do not exist in database." });
  }

  return rep.code(httpCodes.OK).send(response);
};
