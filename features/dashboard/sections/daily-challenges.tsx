"use client";

import DailyCommit from "../components/daily-commit";

// Daily challenges for github
// 1. Commit ~lines today
// 2. Explore oss projects
// 3. Contribut 1 post/comments/interact
const sampleChallenges = [
  {
    id: 1,
    type: "commit",
    title: "Commit 100 LOC today",
    description: "First rule of GitClub is you always write those code",
  },
  {
    id: 2,
    type: "explore",
    title: "Explore community posts",
    description: "Feed your head with freshing new ideas",
  },
  {
    id: 3,
    type: "contribute",
    title: "Contribute to the community",
    description:
      "Give something back by sharing/interacting with the community",
  },
];

const DailyChallenges = () => {
  return (
    <ul className="grid grid-cols-1 gap-4">
      <DailyCommit className="rounded-lg border bg-card px-4 py-4" />
      {sampleChallenges.map((challenge) => {
        return (
          <li
            key={challenge.id}
            className="rounded-lg border bg-card px-4 py-4"
          >
            <h3 className="text-body4">{challenge.title}</h3>
            <p className="text-sm">{challenge.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default DailyChallenges;
