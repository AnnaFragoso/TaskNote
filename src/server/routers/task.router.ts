// Responsable for API connection, requests and validation
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { taskService } from "../services/task.service";
import { TRPCError } from "@trpc/server";

export const taskRouter = router({
  getAll: publicProcedure.input(
    z.object({
      limit: z.number().min(1).max(50).default(10),
      cursor: z.string().nullish(),
    })
  ).query(({ input }) => {
   const tasks = [...taskService.findAll()].sort((a, b) => {
        return (
          b.createdAt.localeCompare(a.createdAt) ||
          b.id.localeCompare(a.id)
        );
      });

      const cursorIndex = input.cursor
        ? tasks.findIndex((task) => task.id === input.cursor)
        : -1;

      if (input.cursor && cursorIndex === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pagination cursor not found",
        });
      }

      const startIndex = cursorIndex + 1;

      const page = tasks.slice(
        startIndex,
        startIndex + input.limit + 1
      );

      const hasNextPage = page.length > input.limit;
      const items = page.slice(0, input.limit);

      return {
        items,
        nextCursor: hasNextPage
          ? items[items.length - 1]?.id
          : undefined,
      };
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1, "Title is required"),
        description: z.string().trim().default(""),
      })
    )
    .mutation(({ input }) => {
      return taskService.create(input);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().trim().min(1, "Title is required"),
        description: z.string().trim(),
      })
    )
    .mutation(({ input }) => {
      return taskService.update(input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(({ input }) => {
      return taskService.delete(input.id);
    }),
});
