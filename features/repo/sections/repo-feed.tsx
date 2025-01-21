"use client";

import { trpc } from "@/utils/trpc";
import { useMemo } from "react";
import InfoCard from "../components/info-card";
import RepoCard from "../components/repo-card";
import RepoFeedSkeleton from "../components/skeletons/repo-feed";

const RepoFeed = () => {
  const { data: repos } = trpc.repo.getAllRepos.useQuery();
  const { data: publicRepoData, isLoading } =
    trpc.repo.getPublicRepos.useQuery();

  const renderRepoList = useMemo(() => {
    if (!repos) {
      return null;
    }

    return repos.map((repo) => {
      const nameWithOwner = `${repo.owner}/${repo.name}`;
      const publicData = publicRepoData?.get(nameWithOwner);

      if (!publicData) {
        return null;
      }

      return <RepoCard key={repo.id} repo={repo} publicData={publicData} />;
    });
  }, [repos, publicRepoData]);

  return (
    <div className="max-container grid grid-cols-12 gap-2">
      <div className="col-span-12 flex flex-col gap-2 md:col-span-8">
        {isLoading ? <RepoFeedSkeleton /> : renderRepoList}
      </div>
      <div className="order-first col-span-12 md:order-last md:col-span-4">
        <InfoCard />
      </div>
    </div>
  );
};

export default RepoFeed;
