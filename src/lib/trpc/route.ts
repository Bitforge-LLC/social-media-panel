import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";

import { createContext } from "./trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    createContext,
    endpoint: "/api/trpc",
    onError({ error }) {
      console.error(error);
    },
    req,
    router: appRouter,
  });

export { handler as GET, handler as POST };
