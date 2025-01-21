import InfoCard from "@/features/repo/components/info-card";
import RepoFeedSkeleton from "@/features/repo/components/skeletons/repo-feed";

const FeedPageLoading = () => {
  return (
    <div className="w-full pb-10 lg:pb-20">
      <div className="max-container flex h-20 items-center"></div>
      <div className="max-container grid grid-cols-12 gap-2">
        <div className="col-span-12 flex flex-col gap-2 md:col-span-8">
          <RepoFeedSkeleton />
        </div>
        <div className="order-first col-span-12 md:order-last md:col-span-4">
          <InfoCard />
        </div>
      </div>
    </div>
  );
};

export default FeedPageLoading;
