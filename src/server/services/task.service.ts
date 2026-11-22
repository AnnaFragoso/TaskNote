// Intermadiary layer between API and data acess, 
// delegates operations to repository and handles application errors

import { TRPCError } from "@trpc/server";
import { taskRepository } from "../repositories/task.repository";

type CreateTaskInput = {
  title: string;
  description: string;
};

type UpdateTaskInput = {
  id: string;
  title: string;
  description: string;
};

export const taskService = {
  findAll() {
    return taskRepository.findAll();
  },

  create(data: CreateTaskInput) {
    return taskRepository.create(data);
  },

  update(data: UpdateTaskInput) {
    const { id, ...taskData } = data;

    const task = taskRepository.update(id, taskData);

    if (!task) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Task not found",
      });
    }

    return task;
  },

  delete(id: string) {
    const deleted = taskRepository.delete(id);

    if (!deleted) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Task not found",
      });
    }

    return { success: true };
  },
};
