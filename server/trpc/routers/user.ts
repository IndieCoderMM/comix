import { userService } from "@/services/user";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const userRouter = router({
  getAuthUser: protectedProcedure.query(async ({ ctx }) => {
    return userService.getAuthUser();
  }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return userService.getProfile();
  }),
});
