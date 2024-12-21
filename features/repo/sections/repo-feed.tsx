"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";
import { IconBolt, IconCodePlus, IconShare } from "@tabler/icons-react";
import { useMemo } from "react";
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
        <Card className="top-10 sm:sticky">
          <CardHeader>
            <CardTitle className="font-heading text-h5 text-neutral-800 dark:text-neutral-200">
              Repositories & Boosting
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-neutral-800 dark:text-neutral-200">
            <div className="flex items-start gap-2">
              <div className="size-7 p-2 sm:size-10">
                <IconShare />
              </div>
              <p className="text-base">
                Share your repositories to attract collaborators or explore
                others for ideas and contributions.{" "}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-7 p-2 sm:size-10">
                <IconBolt />
              </div>
              <p className="text-base">
                Use GitCoins to boost repositories, increasing their visibility
                and popularity.{" "}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-7 p-2 sm:size-10">
                <IconCodePlus />
              </div>
              <p className="text-base">
                Contribute to repositories to earn GitCoins and EXP.{" "}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepoFeed;
