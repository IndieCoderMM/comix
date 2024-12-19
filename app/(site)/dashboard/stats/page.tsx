import DiskUsage from "@/features/stats/sections/disk-usage";
import Languages from "@/features/stats/sections/languages";
import LocGoal from "@/features/stats/sections/loc-goal";
import RepoStats from "@/features/stats/sections/repo-stats";

const StatsPage = () => {
  return (
    <div className="max-container">
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
      </div>
    </div>
  );
};

export default StatsPage;
