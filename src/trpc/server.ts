// Allows server components and server-side code to call procedures
// without going through the client-side API layer
import "server-only";

import { headers } from "next/headers";
import { appRouter } from "../server/routers/_app";
import { createServerTRPCContext } from "../server/trpc";

export const api = appRouter.createCaller(
  await createServerTRPCContext({
    headers: await headers(),
  })
);