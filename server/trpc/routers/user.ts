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
});
