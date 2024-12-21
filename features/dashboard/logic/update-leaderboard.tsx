"use client";

import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

const UpdateLeaderboard = () => {
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: updateLeaderboard, isSuccess } =
    trpc.leaderboard.addUserToLeaderboard.useMutation({
      onSuccess: () => {},
    });

  useEffect(() => {
    if (!user || !user.exp) return;

    updateLeaderboard({
      userId: user.id.toString(),
      score: user.exp,
      metadata: {
        name: user.fullName,
        ghLogin: user.ghLogin,
        image: user.image,
        level: user.level ? user.level.toString() : "0",
      },
    });
  }, [updateLeaderboard, user]);

  return null;
};

export default UpdateLeaderboard;
