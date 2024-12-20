import { userService } from "@/services/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const userRouter = router({
  getAuthUser: protectedProcedure.query(async ({ ctx }) => {
    return userService.getAuthUser();
  }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return userService.getProfile();
  }),
  getMetadata: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return userService.getMetadata(input.userId);
    }),
  setupNewUser: protectedProcedure
    .input(z.object({ contribution: z.number() }))
    .mutation(async ({ input }) => {
      return userService.setupNewUser(input.contribution);
    }),
  addClaimables: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        coins: z.number().min(0),
        exp: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      await userService.addClaimables(input.coins, input.exp);
      await userService.updateMetadata(input.userId, {
        rewardClaimedAt: new Date().toISOString(),
      });
    }),
  markAsOnboarded: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input }) => {
      return userService.markAsOnboarded(input.userId);
    }),
  claimReward: protectedProcedure
    .input(z.object({ coins: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return userService.claimReward(ctx.auth.id, input.coins);
    }),
  updateCommitTarget: protectedProcedure
    .input(z.object({ userId: z.string(), commitTarget: z.number().min(0) }))
    .mutation(async ({ input }) => {
      const metadata = {
        commitTarget: input.commitTarget.toString(),
        commitUpdatedAt: new Date().toISOString(),
      };
      return userService.updateMetadata(input.userId, metadata);
    }),
});
