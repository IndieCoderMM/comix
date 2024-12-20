"use client";

import DailyCommit from "../components/daily-commit";

// Daily challenges for github
// 1. Commit ~lines today
// 2. Explore oss projects
// 3. Contribut 1 post/comments/interact
const sampleChallenges = [
  {
    id: 1,
    type: "post",
    title: "Share your project",
    description: "Share your project with the community",
  },
  {
    id: 2,
    type: "explore",
    title: "Explore community posts",
    description: "Explore and interact with community posts",
  },
  {
    id: 3,
    type: "contribute",
    title: "Contribute to a project",
    description: "Contribute to an open source project",
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
            className="relative rounded-lg border bg-card px-4 py-4"
          >
            <h3 className="text-body4">{challenge.title}</h3>
            <p className="text-sm">{challenge.description}</p>

            <div className="absolute right-2 top-2 rounded-full bg-success/50 px-2">
              <span className="text-xs uppercase text-white">Soon</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DailyChallenges;
