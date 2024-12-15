import { withAuth } from "./middlewares";
import { procedure } from "./trpc";

export const publicProcedure = procedure;

export const protectedProcedure = procedure.use(withAuth);
