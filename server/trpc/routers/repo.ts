import { githubService } from "@/services/github";
import { repoService } from "@/services/repo";
import { z } from "zod";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const repoRouter = router({
  getAllRepos: protectedProcedure.query(async ({ ctx }) => {
    const repos = await repoService.getAllRepos();
    return repos;
  }),
  getPublicRepos: protectedProcedure.query(async ({ ctx }) => {
    const reposFromDb = await repoService.getAllRepos();
    const queryData = reposFromDb.map((repo) => {
      return {
        name: repo.name,
        owner: repo.owner,
        boost: repo.boost,
      };
    });

    const repos = await githubService.getPublicRepoList(queryData);

    return repos;
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
  boostRepo: protectedProcedure
    .input(
      z.object({
        repoId: z.number(),
        userId: z.number(),
        boost: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const repo = await repoService.boostRepoById(
        input.userId,
        input.repoId,
        input.boost,
      );
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
