interface UserLevelProgress {
  level: number;
  nextLevelContributions: number;
}

const BASE_PTS = 100;

export const getNextLevelContributions = (level: number): number => {
  let prev = 0;
  let curr = BASE_PTS;
  let totalContributionsNeeded = 0;

  for (let i = 0; i < level; i++) {
    totalContributionsNeeded += curr;

    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return totalContributionsNeeded;
};

export const calculateLevel = (contributions: number): UserLevelProgress => {
  let level = 0;
  let prev = 0;
  let curr = BASE_PTS;
  let totalContributionsNeeded = 0;

  while (contributions >= totalContributionsNeeded + curr) {
    level++;
    totalContributionsNeeded += curr;

    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return {
    level,
    nextLevelContributions: totalContributionsNeeded + curr - contributions,
  };
};

const titles = [
  "Newbie",
  "Syntax Explorer",
  "Bug Hunter",
  "Code Ninja",
  "PR Pro",
  "The Compiler",
  "Bit Whisperer",
  "Git Guardian",
  "Patch Lord",
  "The One Who Commits",
];

export const getTitle = (level: number): string => {
  if (level >= titles.length) {
    return titles[titles.length - 1];
  }

  return titles[level];
};
