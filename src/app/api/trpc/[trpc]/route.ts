import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/routers/_app";
import { createServerTRPCContext } from "../../../../server/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createServerTRPCContext({
        headers: req.headers,
      }),
  });

export { handler as GET, handler as POST };

export const runtime = "nodejs";