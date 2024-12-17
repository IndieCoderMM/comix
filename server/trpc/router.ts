import { githubRouter } from "./routers/github";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  github: githubRouter,
});

export type AppRouter = typeof appRouter;
