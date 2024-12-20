import { getApolloClient } from "@/lib/apollo";
import { ApolloClient } from "@apollo/client";
import { extractContributions, extractLanguages } from "./helper";
import { STAR_REPO } from "./mutation";
import {
  GET_BASE_REPO,
  GET_COMMITS,
  GET_CONTRIBUTIONS,
  GET_LANGUAGES,
  GET_REPOS,
  GET_UPDATED_REPOS,
  GET_USER_ID,
} from "./query";

class GithubService {
  private client: ApolloClient<any> | null = null;

  private async getClient() {
    if (this.client) return this.client;
    this.client = getApolloClient();

    return this.client;
  }

  async starRepo(repoId: string) {
    const client = await this.getClient();
    const res = await client.mutate({
      mutation: STAR_REPO,
      variables: { repoId },
    });

    console.log("Starred repo:", res);
    return res;
  }

  async getRepoMetadata(login: string, repo: string) {
    const client = await this.getClient();
    let cursor: string | null = null;
    type StarGazer = { id: string; login: string };
    let stargazers: StarGazer[] = [];
    let hasNextPage = true;
    let id = "";

    do {
      const { data } = await client.query({
        query: GET_BASE_REPO,
        variables: { owner: login, name: repo, after: cursor },
      });

      const stars = data.repository.stargazers.edges as any;
      for (const star of stars) {
        stargazers.push({ id: star.node.id, login: star.node.login });
      }

      const repoId = data.repository.id as string;
      if (id === "" && repoId) {
        id = repoId;
      }

      hasNextPage = data.repository.stargazers.pageInfo.hasNextPage as any;
      const endCursor = data.repository.stargazers.pageInfo.endCursor as any;
      cursor = hasNextPage ? endCursor : null;
    } while (cursor);

    return { stargazers, id };
  }

  async getUserID(login: string) {
    const client = await this.getClient();
    const { data } = await client.query({
      query: GET_USER_ID,
      variables: { login },
    });

    return data.user.id;
  }

  async getDailyLOC(login: string, date: string) {
    const userId = await this.getUserID(login);
    const repos = await this.getUpdatedRepos(login, date);
    let totalAdditions = 0;
    let totalDeletions = 0;

    for (const repo of repos) {
      const { additions, deletions } = await this.getDailyRepoLOC(
        login,
        repo.name,
        userId,
        date,
      );

      totalAdditions += additions;
      totalDeletions += deletions;
    }

    return { additions: totalAdditions, deletions: totalDeletions };
  }

  async getWeeklyLOC(login: string) {
    const userId = await this.getUserID(login);
    // console.log("Getting updated repos...");
    const updatedRepos = await this.getUpdatedReposFromLastWeek(login);

    // console.log("Updated repos:", updatedRepos);

    const weeklyCalendar = new Map<
      string,
      {
        additions: number;
        deletions: number;
      }
    >();

    console.log("Getting weekly LOC...");
    for (const repo of updatedRepos) {
      const locData = await this.getWeeklyRepoLOC(login, repo.name, userId);

      // console.log("LOC data for", repo.name, ":", locData);

      for (const { date, additions, deletions } of locData) {
        if (!weeklyCalendar.has(date)) {
          weeklyCalendar.set(date, { additions, deletions });
        } else {
          const { additions: totalAdditions, deletions: totalDeletions } =
            weeklyCalendar.get(date) || { additions: 0, deletions: 0 };
          weeklyCalendar.set(date, {
            additions: totalAdditions + additions,
            deletions: totalDeletions + deletions,
          });
        }
      }
    }

    return weeklyCalendar;
  }

  async getUpdatedReposFromLastWeek(login: string) {
    const client = await this.getClient();
    let cursor: string | null = null;
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);

    const updatedRepos = [];

    do {
      const { data } = await client.query({
        query: GET_UPDATED_REPOS,
        variables: { login },
      });

      const repos = data.user.repositories.edges as any;
      for (const repo of repos) {
        const updatedAt = new Date(repo.node.updatedAt);
        if (updatedAt < last7Days) {
          return updatedRepos;
        }
        updatedRepos.push({
          name: repo.node.name,
          url: repo.node.url,
          updatedAt: repo.node.updatedAt,
        });
      }

      cursor = repos.length > 0 ? repos[repos.length - 1].cursor : null;
    } while (cursor);

    return updatedRepos;
  }

  async getUpdatedRepos(login: string, date: string) {
    let cursor: string | null = null;
    const forDate = new Date(date).toISOString().split("T")[0];
    const client = await this.getClient();
    const updatedRepos = [];

    do {
      const { data } = await client.query({
        query: GET_UPDATED_REPOS,
        variables: { login, cursor },
      });

      const repos = data.user.repositories.edges as any;

      for (const repo of repos) {
        const updatedAt = new Date(repo.node.updatedAt)
          .toISOString()
          .split("T")[0];
        if (updatedAt !== forDate) return updatedRepos;

        updatedRepos.push({
          name: repo.node.name,
          url: repo.node.url,
          updatedAt: repo.node.updatedAt,
        });
      }

      cursor = repos.length > 0 ? repos[repos.length - 1].cursor : null;
    } while (cursor);

    return updatedRepos;
  }

  async getWeeklyRepoLOC(login: string, repo: string, userId: string) {
    let cursor: string | null = null;
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);
    const client = await this.getClient();

    const locData = [];

    do {
      const { data } = await client.query({
        query: GET_COMMITS,
        variables: { name: repo, owner: login, cursor },
      });

      const commits = data.repository.defaultBranchRef.target.history
        .edges as any;

      for (const commit of commits) {
        const { node } = commit;
        if (!node || node.committer?.user?.id !== userId) {
          continue;
        }

        const date = node.committedDate.split("T")[0];
        if (new Date(date) < last7Days) {
          break;
        }

        locData.push({
          date,
          additions: node.additions,
          deletions: node.deletions,
        });
      }

      cursor = commits.length > 0 ? commits[commits.length - 1].cursor : null;
    } while (cursor);

    return locData;
  }

  async getDailyRepoLOC(
    login: string,
    repo: string,
    userId: string,
    date: string,
  ) {
    let cursor: string | null = null;
    let totalAdditions = 0;
    let totalDeletions = 0;
    const forDate = new Date(date).toISOString().split("T")[0];
    const client = await this.getClient();

    do {
      const { data } = await client.query({
        query: GET_COMMITS,
        variables: { name: repo, owner: login, cursor },
      });

      const commits = data.repository.defaultBranchRef.target.history
        .edges as any;

      for (const commit of commits) {
        const { node } = commit;
        if (!node || node.committer.user.id !== userId) {
          continue;
        }

        const date = node.committedDate.split("T")[0];
        if (date !== forDate) {
          break;
        }

        totalAdditions += node.additions;
        totalDeletions += node.deletions;
      }

      cursor = commits.length > 0 ? commits[commits.length - 1].cursor : null;
    } while (cursor);

    return { additions: totalAdditions, deletions: totalDeletions };
  }

  /**
   * Get user's repo stats (total stars, forks, repos, and merged PRs)
   */
  async getRepoStats(login: string) {
    const client = await this.getClient();
    let totalStars = 0;
    let totalForks = 0;
    let totalRepos = 0;
    let totalPrMerged = 0;
    let totalDiskUsage = 0;
    let hasNextPage = true;
    let cursor: string | null = null;
    let mostStarredRepos = [];
    let mostForkedRepos = [];

    while (hasNextPage) {
      const { data } = await client.query({
        query: GET_REPOS,
        variables: { login, cursor },
      });

      const repositories = data.user.repositories as any;
      const pullRequests = data.user.pullRequests as any;

      if (!repositories) {
        break;
      }

      totalRepos += repositories.totalCount || 0;
      totalPrMerged += pullRequests.totalCount || 0;

      totalDiskUsage += repositories.nodes?.reduce(
        (sum: number, repo: any) => sum + repo.diskUsage,
        0,
      );

      for (const repo of repositories.nodes) {
        totalStars += repo.stargazerCount;
        totalForks += repo.forkCount;
        mostStarredRepos.push({
          id: repo.id,
          name: repo.name,
          stargazerCount: repo.stargazerCount,
          forkCount: repo.forkCount,
        });
      }

      hasNextPage = repositories.pageInfo.hasNextPage;
      cursor = repositories.pageInfo.endCursor;
    }

    mostStarredRepos = mostStarredRepos.sort(
      (a, b) => b.stargazerCount - a.stargazerCount,
    );

    mostForkedRepos = mostStarredRepos.sort(
      (a, b) => b.forkCount - a.forkCount,
    );

    return {
      totalRepos,
      totalStars,
      totalForks,
      totalPrMerged,
      totalDiskUsage,
      mostStarredRepos: mostStarredRepos.slice(0, 5),
      mostForkedRepos: mostForkedRepos.slice(0, 5),
    };
  }

  async getContributions(login: string) {
    const client = await this.getClient();
    // const { data: yearsData } = await client.query({
    //   query: GET_YEARS,
    //   variables: { login },
    // });
    //
    // const years = (
    //   yearsData.user.contributionsCollection.contributionYears as string[]
    // ).map(Number);
    //
    const { data } = await client.query({
      query: GET_CONTRIBUTIONS,
      variables: { login },
    });

    return extractContributions(data);
  }

  async getLanguages(login: string) {
    const client = await this.getClient();
    const { data } = await client.query({
      query: GET_LANGUAGES,
      variables: { login },
    });

    return extractLanguages(data);
  }
}

export const githubService = new GithubService();
