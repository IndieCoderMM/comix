import { createContext } from "@/server/trpc/context";
import { appRouter } from "@/server/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createContext,
  });
};

export { handler as GET, handler as POST };
