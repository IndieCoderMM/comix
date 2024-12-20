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
  claimCoins: protectedProcedure
    .input(z.object({ coins: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return userService.claimCoins(ctx.auth.id, input.coins);
    }),
  updateMetadata: protectedProcedure
    .input(z.object({ userId: z.string(), commitTarget: z.number().min(0) }))
    .mutation(async ({ input }) => {
      const metadata = {
        commitTarget: input.commitTarget.toString(),
        commitUpdated: new Date().toISOString(),
      };
      return userService.updateMetadata(input.userId, metadata);
    }),
});
