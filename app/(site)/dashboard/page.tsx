import AccountStats from "@/features/dashboard/sections/account-stats";
import { getSession } from "@/utils/auth";

const HomePage = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <main>
      <AccountStats login={session.user.profile.login} />
    </main>
  );
};

export default HomePage;
