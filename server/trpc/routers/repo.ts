import { repoService } from "@/services/repo";
import { z } from "zod";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const repoRouter = router({
  getAllRepos: protectedProcedure.query(async ({ ctx }) => {
    return repoService.getAllRepos();
  }),
  createRepo: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string().url(),
        owner: z.string(),
        ownerId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const repo = await repoService.createRepo(input);
      return repo;
    }),
  deleteRepo: protectedProcedure
    .input(
      z.object({
        repoId: z.number(),
        ownerId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const repo = await repoService.deleteRepoById(
        input.repoId,
        input.ownerId,
      );
      return repo;
    }),
});
