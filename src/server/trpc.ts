// Initializes the tRPC server
import { initTRPC } from "@trpc/server";

export type TRPCContext = {
  headers: Headers;
};

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export function createServerTRPCContext({
  headers,
}: TRPCContext) {
  return { headers };
}