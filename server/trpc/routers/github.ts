import { githubService } from "@/services/github";
import { protectedProcedure } from "../procedures";
import { router } from "../trpc";

export const githubRouter = router({
  getTodayLOC: protectedProcedure.query(async ({ ctx }) => {
    const login = ctx.session?.user?.profile.login;
    const today = new Date();
    const { additions, deletions } = await githubService.getDailyLOC(
      login,
      today.toISOString(),
    );

    return { additions, deletions };
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
});
