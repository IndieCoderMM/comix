export type ContributionData = { date: string; contributionCount: number };

interface Repository {
  name: string;
  stargazerCount: number;
  forkCount: number;
}

interface QueryResult {
  data?: {
    user?: {
      repositories?: {
        nodes?: Repository[];
        totalCount?: number;
      };
      pullRequests?: {
        totalCount?: number;
      };
    };
  };
}

interface RepoStats {
  totalStarsReceived: number;
  totalForkedRepos: number;
  mostStarredRepos: Repository[];
  totalPrMerged: number;
}

export const extractRepoStats = (queryResult: QueryResult): RepoStats => {
  const userData = queryResult?.data?.user;

  const repositories = userData?.repositories?.nodes ?? [];
  const totalForkedRepos = userData?.repositories?.totalCount ?? 0;
  const totalPrMerged = userData?.pullRequests?.totalCount ?? 0;

  let totalStarsReceived = 0;

  const repoStarData: Repository[] = repositories.map((repo) => {
    const stars = repo.stargazerCount || 0;
    const forks = repo.forkCount || 0;
    const name = repo.name || "Unnamed Repo";

    totalStarsReceived += stars;

    return {
      name,
      stargazerCount: stars,
      forkCount: forks,
    };
  });

  const mostStarredRepos = repoStarData.sort(
    (a, b) => b.stargazerCount - a.stargazerCount,
  );

  return {
    totalStarsReceived,
    totalForkedRepos,
    mostStarredRepos,
    totalPrMerged,
  };
};

export interface RepoData {
  id: string;
  name: string;
  url: string;
}

export const extractRepoData = (data: any): RepoData => {
  if (!data?.repository) {
    throw new Error("Invalid data structure");
  }

  return {
    id: data.repository.id as string,
    name: data.repository.name as string,
    url: data.repository.url as string,
  };
};

export interface PublicRepo {
  id: string;
  name: string;
  owner: string;
  url: string;
  nameWithOwner: string;
  description: string | null;
  createdAt: string;
  stargazerCount: number;
  forkCount: number;
  openIssues: {
    totalCount: number;
  };
}

export const extractPublicRepo = (data: any): PublicRepo => {
  const repo = data?.repository;
  if (!repo) {
    throw new Error("Invalid data structure");
  }

  const extractedData: PublicRepo = {
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    nameWithOwner: repo.nameWithOwner,
    url: repo.url,
    description: repo.description,
    createdAt: repo.createdAt,
    stargazerCount: repo.stargazerCount,
    forkCount: repo.forkCount,
    openIssues: {
      totalCount: repo.openIssues.totalCount,
    },
  };

  return extractedData;
};

export const extractContributions = (
  data: any,
): { total: number; data: ContributionData[] } => {
  if (
    !data?.user?.contributionsCollection?.contributionCalendar?.weeks ||
    !Array.isArray(data.user.contributionsCollection.contributionCalendar.weeks)
  ) {
    throw new Error("Invalid data structure");
  }

  const weeks = data.user.contributionsCollection.contributionCalendar.weeks;

  return {
    data: weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        contributionCount: day.contributionCount,
      })),
    ),
    total:
      data.user.contributionsCollection.contributionCalendar.totalContributions,
  };
};

export type LanguageData = { language: string; score: number; color: string };

export const extractLanguages = (data: any): LanguageData[] => {
  if (
    !data?.user?.repositories?.edges ||
    !Array.isArray(data.user.repositories.edges)
  ) {
    throw new Error("Invalid data structure");
  }

  const languageMap: Record<string, { score: number; color: string }> = {};

  data.user.repositories.edges.forEach((edge: any) => {
    const primaryLanguage = edge.node.primaryLanguage;
    if (primaryLanguage) {
      const { name, color } = primaryLanguage;

      if (!languageMap[name]) {
        languageMap[name] = { score: 0, color };
      }

      languageMap[name].score += 1;
    }
  });

  return Object.entries(languageMap).map(([language, { score, color }]) => ({
    language,
    score,
    color,
  }));
};
