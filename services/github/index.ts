import { getSession } from "@/utils/auth";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  extractContributions,
  extractLanguages,
  extractRepoStats,
} from "./helper";
import {
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

    console.log("Creating new client...");
    const session = await getSession();
    if (!session?.user?.accessToken) {
      throw new Error("Missing access token");
    }

    this.client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GITHUB_GQL_API,
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return this.client;
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
    console.log("Getting updated repos...");
    const updatedRepos = await this.getUpdatedReposFromLastWeek(login);

    console.log("Updated repos:", updatedRepos);

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

      console.log("LOC data for", repo.name, ":", locData);

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

  async getRepoStats(login: string) {
    const client = await this.getClient();
    const { data } = await client.query({
      query: GET_REPOS,
      variables: { login },
    });

    return extractRepoStats(data);
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
