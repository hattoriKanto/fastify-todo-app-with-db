import { prisma } from "../../api";
import { Body, Fields } from "../types";

export const getAll = async () => {
  const todos = await prisma.todo.findMany();

  return todos;
};

export const getOneById = async (todoId: number) => {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  return todo;
};

export const createOne = async (title: string) => {
  const newProduct = await prisma.todo.create({
    data: {
      title,
    },
  });

  return newProduct;
};

export const deleteOne = async (todoId: number) => {
  await prisma.todo.delete({ where: { id: todoId } });
};

export const updateOne = async (todoId: number, body: Body) => {
  const filteredFields = body.filter(
    ([key, value]) => typeof value === "string" || typeof value === "boolean"
  );
  const fieldsToUpdate: Fields = {};
  const updatedFields = filteredFields.reduce((accum, [key, value]) => {
    accum[key] = value;
    return accum;
  }, fieldsToUpdate);

  const updatedTodo = await prisma.todo.update({
    where: { id: todoId },
    data: {
      ...updatedFields,
    },
  });

  return updatedTodo;
};
