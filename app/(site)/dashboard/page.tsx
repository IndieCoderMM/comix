import IntroDialog from "@/features/dashboard/components/intro-card";
import SetupUser from "@/features/dashboard/logic/setup-user";
import UpdateLeaderboard from "@/features/dashboard/logic/update-leaderboard";
import ActivityLinks from "@/features/dashboard/sections/activity-list";
import DailyChallenges from "@/features/dashboard/sections/daily-challenges";
import Profile from "@/features/dashboard/sections/profile";
import StargazerGift from "@/features/dashboard/sections/stargazer-gift";
import { getSession } from "@/utils/auth";
import dayjs from "dayjs";

const HomePage = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <main className="w-full">
      <Profile />
      <section className="max-container grid grid-cols-12 pb-20 lg:pb-28">
        <div className="md:col-span-6 lg:col-span-5">
          <div className="flex items-baseline justify-start gap-1 py-4">
            <h2 className="mb-2 font-heading text-h6">Daily Challenges</h2>
            <span className="font-heading text-h6 text-secondary">
              . {dayjs().format("ddd DD")}
            </span>
          </div>
          <DailyChallenges />
        </div>
        <div className="pl-4 md:col-span-6 lg:col-span-7">
          <div className="flex items-baseline justify-start gap-1 py-4">
            <h2 className="mb-2 font-heading text-h6">Activities</h2>
          </div>
          <StargazerGift />
          <ActivityLinks />
        </div>
      </section>
      <IntroDialog />
      <SetupUser />
      <UpdateLeaderboard />
    </main>
  );
};

// <AccountStats login={user.ghLogin} />
//
export default HomePage;
