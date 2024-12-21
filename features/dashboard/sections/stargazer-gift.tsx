"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";
import toast from "react-hot-toast";

const StargazerGift = () => {
  const utils = trpc.useUtils();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { data: baseRepo } = trpc.github.getBaseRepo.useQuery();
  const { mutate: starRepo, isLoading } = trpc.github.starRepo.useMutation({
    onSuccess: () => {
      utils.github.getBaseRepo.invalidate();
      toast.success("🌟 Thanks for starring our repo!");
    },
  });

  const handleStarRepo = async () => {
    if (!baseRepo) return;
    if (isStargazer) {
      toast.success("You are already a stargazer.");
      return;
    }

    starRepo({ repoId: baseRepo.id });
  };

  const { isStargazer } = useMemo(() => {
    if (!baseRepo || !user) return { isStargazer: false };

    return {
      isStargazer: baseRepo.stargazers.some(
        (stargazer) => stargazer.login === user.ghLogin,
      ),
    };
  }, [baseRepo, user]);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-card p-2 sm:flex-row sm:items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-dark">
        <Image
          src="/assets/icons/badge.png"
          alt="Stargazer badge"
          width={50}
          height={50}
          className="h-12 w-12 object-contain"
        />
      </div>
      {isStargazer ? (
        <div className="flex flex-1 flex-col">
          <h3 className="font-heading text-body2 text-purple-gray dark:text-neutral-300">
            Official Stargazer
          </h3>
          <p className="text-body3">
            You have received{" "}
            <span className="text-success">Stargazer Badge</span> for starring
            our repo.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <h3 className="font-heading text-body2">Become a Stargazer</h3>
          <p className="text-body3">
            You can receive{" "}
            <span className="text-success">Stargazer Badge</span> by staring our
            repo.
          </p>
        </div>
      )}
      <div>
        <Button variant="outline" onClick={handleStarRepo} disabled={isLoading}>
          {isStargazer ? (
            <IconStarFilled className="text-amber-500" />
          ) : (
            <IconStar />
          )}
          {isStargazer ? "Starred" : isLoading ? "Starring" : "Star"}
        </Button>
      </div>
    </div>
  );
};

export default StargazerGift;
