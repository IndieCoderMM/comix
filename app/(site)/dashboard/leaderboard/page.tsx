import LeaderboardTable from "@/features/leaderboard/components/leaderboard-table";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Leaderboard - Comix",
  description: "Global leaderboard of top committers on Comix",
};

const LeaderboardPage = () => {
  return (
    <div className="max-container">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src="/assets/icons/diamond-crown.svg"
          width={100}
          height={100}
          alt="Leaderboard"
        />
        <h1 className="font-heading text-h6 text-primary sm:text-h4">
          Top Committers Leaderboard
        </h1>
      </div>
      <LeaderboardTable />
    </div>
  );
};

export default LeaderboardPage;
