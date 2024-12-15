"use client";
import { trpc } from "@/utils/trpc";

const HomePage = () => {
  const { data: user, isLoading } = trpc.user.getAuthUser.useQuery();

  console.log("Query auth user: ", user);

  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Authenticated as {user.ghLogin}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </main>
  );
};

// <AccountStats login={user.ghLogin} />
//
export default HomePage;
