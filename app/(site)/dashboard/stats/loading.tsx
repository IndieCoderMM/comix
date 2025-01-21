import RepoStatSkeleton from "@/features/stats/components/skeletons/repo-stats";

const LoadingStatsPage = () => {
  return (
    <div className="max-container pb-20">
      <RepoStatSkeleton />
      <div className="mt-2 grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-5">
          <div className="aspect-square w-full animate-pulse rounded-lg bg-card"></div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="aspect-square w-full rounded-lg bg-card" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="aspect-video w-full animate-pulse rounded-lg bg-card" />
        </div>
        <div className="col-span-12">
          <div className="h-200 w-full animate-pulse rounded-lg bg-card" />
        </div>
      </div>
    </div>
  );
};

export default LoadingStatsPage;
