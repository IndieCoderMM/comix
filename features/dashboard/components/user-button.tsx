"use client";

import { trpc } from "@/utils/trpc";
import { getShield } from "@/utils/users/getShield";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import UserButtonSkeleton from "./skeletons/user-button";
import UserMenu from "./user-menu";

const UserButton = () => {
  const { data: user, isLoading } = trpc.user.getAuthUser.useQuery();

  if (isLoading) {
    return <UserButtonSkeleton />;
  }

  if (!user) {
    return null;
  }

  const shield = getShield(user.level ?? 1);

  return (
    <UserMenu>
      <div className="flex items-center gap-2">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.fullName ?? "User"}
            className="h-12 w-12 rounded-full border object-cover"
            width={42}
            height={42}
          />
        ) : (
          <IconUser className="h-12 w-12 rounded-full" />
        )}
        <div className="flex items-center">
          <Image
            src="/assets/icons/coin.png"
            width={24}
            height={24}
            alt="Coins"
          />
          <div className="ml-2 flex items-center gap-1">
            <span className="text-body4 text-amber-500">{user.coins}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Image
            src={shield.image}
            alt={shield.name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
    </UserMenu>
  );
};

export default UserButton;
