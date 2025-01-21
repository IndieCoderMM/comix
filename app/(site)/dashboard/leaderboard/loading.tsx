import Image from "next/image";

const LeaderboardPageLoading = () => {
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
    </div>
  );
};

export default LeaderboardPageLoading;
