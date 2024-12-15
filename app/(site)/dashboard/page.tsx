import AccountStats from "@/features/dashboard/sections/account-stats";
import { userService } from "@/services/user";

const HomePage = async () => {
  const user = await userService.getAuthUser();

  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <main>
      <AccountStats login={user.ghLogin} />
    </main>
  );
};

export default HomePage;
