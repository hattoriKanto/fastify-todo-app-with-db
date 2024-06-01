import { prisma } from "../../api";
import { TodoRequestBody } from "../types";

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

export const updateOne = async (todoId: number, data: TodoRequestBody) => {
  const updatedTodo = await prisma.todo.update({
    where: { id: todoId },
    data: {
      ...data,
    },
  });

  return updatedTodo;
};
