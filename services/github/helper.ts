export type ContributionData = { date: string; contributionCount: number };

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
