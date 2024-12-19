import { leaderboardService } from "@/services/leaderboard";
import { z } from "zod";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const leaderboardRouter = router({
  getLeaderboard: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ input }) => {
      return leaderboardService.getLeaderboardWithMetadata(input.limit);
    }),
  addUserToLeaderboard: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        score: z.number(),
        metadata: z.record(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      return leaderboardService.addUserToLeaderboard(
        input.userId,
        input.score,
        input.metadata,
      );
    }),
});
