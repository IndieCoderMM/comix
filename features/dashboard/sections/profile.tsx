"use client";

import { trpc } from "@/utils/trpc";
import { IconUsers, IconUserUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: user, isLoading } = trpc.user.getProfile.useQuery();

  if (!user) {
    return null;
  }

  return (
    <div className="max-container flex items-center gap-4">
      <Image
        src={user.image}
        width={100}
        height={100}
        alt={user.name}
        className="h-24 w-24 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h1 className="font-heading text-h4 text-dark-gray">{user.name}</h1>
        <div className="flex items-center justify-center">
          <Link
            href={`https://github.com/${user.login}`}
            target="_blank"
            className="font-heading text-body4 text-mid-gray hover:underline"
          >
            @{user.login}
          </Link>
          <ProfileStats />
        </div>
      </div>
      <blockquote className="text-body3">{user.bio}</blockquote>
    </div>
  );
};

export default Profile;

const ProfileStats = () => {
  const { data: profile, isLoading } = trpc.user.getProfile.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mx-2 text-gray-500">•</span>
      <div className="flex items-center gap-1">
        <IconUsers className="h-4 w-4" />
        <span className="text-body4">{profile?.followers}</span>
        <span className="text-body3">Followers</span>
      </div>
      <span className="mx-2 text-gray-500">•</span>
      <div className="flex items-center gap-1">
        <IconUserUp className="h-4 w-4" />
        <span className="text-body4">{profile?.following}</span>
        <span className="text-body3">Following</span>
      </div>
    </div>
  );
};
