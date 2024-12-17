import DailyChallenges from "@/features/dashboard/sections/daily-challenges";
import Profile from "@/features/dashboard/sections/profile";
import { getSession } from "@/utils/auth";

const HomePage = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <main className="w-full">
      <Profile />
      <section className="max-container grid grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <DailyChallenges />
        </div>
      </section>
    </main>
  );
};

// <AccountStats login={user.ghLogin} />
//
export default HomePage;
