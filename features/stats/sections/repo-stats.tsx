"use client";

import { trpc } from "@/utils/trpc";
import { GitCommit, GitFork, GitPullRequest, Star } from "lucide-react";
import RepoStatSkeleton from "../components/skeletons/repo-stats";
import StatCard from "../components/stat-card";

const RepoStats = () => {
  const { data, isLoading } = trpc.github.getRepoStats.useQuery();

  if (!data) {
    return <RepoStatSkeleton />;
  }

  return (
    <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
      <div className="">
        <StatCard
          label="Total Repos"
          value={data.totalRepos.toString()}
          icon={GitCommit}
        />
      </div>
      <div className="">
        <StatCard
          label="Total Stars"
          value={data.totalStars.toString()}
          icon={Star}
        />
      </div>
      <div className="">
        <StatCard
          label="Forked Repos"
          value={data.totalForks.toString()}
          icon={GitFork}
        />
      </div>
      <div className="">
        <StatCard
          label="PR Merged"
          value={data.totalPrMerged.toString()}
          icon={GitPullRequest}
        />
      </div>
    </div>
  );
};

export default RepoStats;
