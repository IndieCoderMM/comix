import FeedHeader from "@/features/repo/sections/feed-header";
import RepoFeed from "@/features/repo/sections/repo-feed";

const FeedPage = () => {
  return (
    <div className="w-full">
      <FeedHeader />
      <RepoFeed />
    </div>
  );
};

export default FeedPage;
