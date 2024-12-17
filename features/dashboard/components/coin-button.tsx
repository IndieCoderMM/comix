"use client";
import { trpc } from "@/utils/trpc";
import { IconCoins } from "@tabler/icons-react";

const CoinButton = () => {
  const { data, isLoading } = trpc.user.getAuthUser.useQuery();

  if (!data || isLoading) {
    return null;
  }

  return (
    <div className="flex items-center">
      <IconCoins className="h-6 w-6 text-amber-500" />
      <div className="ml-2 flex items-center gap-1">
        <span className="text-body4">{data.coins}</span>
        <span className="text-body3">GitCoins</span>
      </div>
    </div>
  );
};

export default CoinButton;
