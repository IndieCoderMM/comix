"use client";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

const SetupUser = () => {
  const { data: contribData, isLoading } =
    trpc.github.getContributions.useQuery();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: setupNewUser, isLoading: isSettingUp } =
    trpc.user.setupNewUser.useMutation();

  useEffect(() => {
    if (!user) return;
    if (user.exp && user.exp > 0) return;

    if (contribData?.total) setupNewUser({ contribution: contribData?.total });
  }, [user, contribData]);

  if (isLoading) {
    console.log("Getting contributions...");
  }

  if (isSettingUp) {
    console.log("Setting up new user...");
  }

  return null;
};

export default SetupUser;
