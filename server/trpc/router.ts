import { githubRouter } from "./routers/github";
import { leaderboardRouter } from "./routers/leaderboard";
import { repoRouter } from "./routers/repo";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  github: githubRouter,
  leaderboard: leaderboardRouter,
  repo: repoRouter,
});

export type AppRouter = typeof appRouter;
