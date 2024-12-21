import { githubService } from "@/services/github";
import { z } from "zod";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

const BASE_REPO = {
  owner: "IndieCoderMM",
  name: "comix",
};

export const githubRouter = router({
  starRepo: protectedProcedure
    .input(z.object({ repoId: z.string() }))
    .mutation(async ({ input }) => {
      const res = await githubService.starRepo(input.repoId);

      return res;
    }),
  getRepoStats: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const repos = await githubService.getRepoStats(login);

    return repos;
  }),
  getTodayLOC: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const today = new Date();
    const { additions, deletions } = await githubService.getDailyLOC(
      login,
      today.toISOString(),
    );

    return { additions, deletions };
  }),
  getBaseRepo: protectedProcedure.query(async ({ ctx }) => {
    const { id, stargazers } = await githubService.getRepoMetadata(
      BASE_REPO.owner,
      BASE_REPO.name,
    );

    return { id, stargazers };
  }),
  getOwnerRepo: protectedProcedure
    .input(z.object({ owner: z.string(), name: z.string() }))
    .query(async ({ input }) => {
      const data = await githubService.getOwnerRepo(input.owner, input.name);

      return data;
    }),
  getWeeklyLOC: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const calendar = await githubService.getWeeklyLOC(login);

    return calendar;
  }),
  getRepos: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const repos = await githubService.getRepoStats(login);

    return repos;
  }),
  getLanguages: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const languages = await githubService.getLanguages(login);

    return languages;
  }),
  getContributions: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const contributions = await githubService.getContributions(login);

    return contributions;
  }),
});
