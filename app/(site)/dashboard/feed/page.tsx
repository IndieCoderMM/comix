import FeedHeader from "@/features/repo/sections/feed-header";
import RepoFeed from "@/features/repo/sections/repo-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed - Comix",
  description: "Browse through inspiring projects from the community",
};

const FeedPage = () => {
  return (
    <div className="w-full pb-10 lg:pb-20">
      <FeedHeader />
      <RepoFeed />
    </div>
  );
};

export default FeedPage;
