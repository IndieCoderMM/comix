"use client";

import { trpc } from "@/utils/trpc";
import Image from "next/image";
import toast from "react-hot-toast";

const ClaimButton = () => {
  const utils = trpc.useUtils();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: claimCoins, isLoading: isClaiming } =
    trpc.user.claimReward.useMutation({
      onSuccess(_, variables) {
        utils.user.getAuthUser.invalidate();
        toast.success(`Claimed ${variables.coins} GitCoins`);
      },
    });

  const handleClaimCoins = () => {
    if (!user || !user.claimables) {
      return;
    }
    claimCoins({ coins: user.claimables });
  };

  if (!user || !user.claimables) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className="flex cursor-pointer items-center justify-center rounded-xl border-b-[2px] border-purple-gray bg-primary/80 px-4 py-2 text-white transition-all hover:-translate-y-[1px] hover:border-b-[4px] hover:brightness-110 active:translate-y-[2px] active:border-b-[1px] active:brightness-90 dark:border-slate-700"
        disabled={isClaiming}
        onClick={handleClaimCoins}
      >
        <Image
          src="/assets/icons/chest.png"
          width={40}
          height={40}
          alt="Chest"
          className="object-contain"
        />
        <span className="ml-2 font-bold text-white">
          {isClaiming ? "Claiming..." : `Claim ${user.claimables} GitCoins`}
        </span>
      </button>
    </div>
  );
};

export default ClaimButton;
