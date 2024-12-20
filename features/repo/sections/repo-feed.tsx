"use client";

import { trpc } from "@/utils/trpc";

const RepoFeed = () => {
  const { data, isLoading } = trpc.repo.getAllRepos.useQuery();

  return (
    <div className="max-container">
      {data?.map((d) => (
        <div>
          <p>
            {d.owner}/{d.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RepoFeed;
