import LoadingSpinner from "@/components/shared/loading-spinner";
import Contributions from "@/features/stats/sections/contrib";
import DiskUsage from "@/features/stats/sections/disk-usage";
import Languages from "@/features/stats/sections/languages";
import LocGoal from "@/features/stats/sections/loc-goal";
import RepoStats from "@/features/stats/sections/repo-stats";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Stats - Comix",
  description: "Detailed statistics of your GitHub repositories",
};

const StatsPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="max-container pb-20">
        <RepoStats />
        <div className="mt-2 grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-5">
            <LocGoal />
          </div>
          <div className="col-span-12 md:col-span-4">
            <Languages />
          </div>
          <div className="col-span-12 md:col-span-3">
            <DiskUsage />
          </div>
          <div className="col-span-12">
            <Contributions />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default StatsPage;
