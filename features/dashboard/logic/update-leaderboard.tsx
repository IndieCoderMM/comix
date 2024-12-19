"use client";

import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UpdateLeaderboard = () => {
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: updateLeaderboard } =
    trpc.leaderboard.addUserToLeaderboard.useMutation({
      onSuccess: () => {
        toast.success("Leaderboard updated");
      },
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
