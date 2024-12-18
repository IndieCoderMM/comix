"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateLevel } from "@/services/user/helper";
import { trpc } from "@/utils/trpc";
import { getShield } from "@/utils/users/getShield";
import { IconGitCommit, IconUsers, IconUserUp } from "@tabler/icons-react";
import { Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import ProfileSkeleton from "../components/skeletons/profile";

const Profile = () => {
  const { data: profile, isLoading } = trpc.user.getProfile.useQuery();
  const { data: user } = trpc.user.getAuthUser.useQuery();

  const { progress, nextLevel, nextLevelContributions } = useMemo(() => {
    const { level, nextLevelContributions } = calculateLevel(user?.exp || 0);

    const progress = user?.exp
      ? (user.exp / (user.exp + nextLevelContributions)) * 100
      : 0;

    return { progress, nextLevel: level + 1, nextLevelContributions };
  }, [user]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return null;
  }

  const shield = getShield(user?.level || 0);

  return (
    <div className="max-container flex items-center gap-4 rounded-lg border bg-card p-4 lg:px-10 lg:py-8">
      <div
        className="relative rounded-full p-1"
        style={{
          backgroundColor: shield.color,
        }}
      >
        <Image
          src={profile.image}
          width={100}
          height={100}
          alt={profile.name}
          className="h-24 w-24 rounded-full border-2 border-white object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <h1 className="font-heading text-h5 text-primary">
              {profile.name}
            </h1>
          </div>
          <div className="flex items-center">
            <Link
              href={`https://github.com/${profile.login}`}
              target="_blank"
              className="font-heading text-sm text-info hover:underline"
            >
              @{profile.login}
            </Link>
            <ProfileStats />
            <Button size="sm" variant="outline" className="ml-auto">
              <Share />
              Share
            </Button>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <IconGitCommit className="h-5 w-5" />
                <span className="text-body4">
                  Level: {user?.level} ({user?.title})
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IconUserUp className="h-5 w-5 text-success" />
                <p className="text-caption">
                  {nextLevelContributions} more contributions to Level{" "}
                  {nextLevel}
                </p>
              </div>
            </div>
            <Progress value={progress > 100 ? 100 : progress} />
          </div>
        </div>
        <blockquote className="text-body3">{profile.bio}</blockquote>
      </div>
      <Image
        src={shield.image}
        alt={shield.name}
        width={100}
        height={100}
        className="object-contain"
      />
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
