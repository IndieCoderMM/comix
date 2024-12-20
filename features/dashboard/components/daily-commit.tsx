import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/tailwind";
import { trpc } from "@/utils/trpc";
import {
  IconArrowBigUpLines,
  IconCoin,
  IconEdit,
  IconUserUp,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DailyCommitSkeleton from "./skeletons/daily-commit";

// TODO: Calculate the target based on the user's level
const DEFAULT_TARGET = 100;
const MIN = 10;
const MAX = 1000;
const coinFactor = 5;
const expFactor = 0.05;

/**
 * Calculate the reward {coins, exp} based on the number of lines.
 */
const calculateReward = (lines: number) => {
  const coins = Math.round(lines * coinFactor);
  const exp = Math.round(lines * expFactor);

  return { coins, exp };
};

const DailyCommit = ({ className }: { className?: string }) => {
  const utils = trpc.useUtils();
  const { data: locData } = trpc.github.getTodayLOC.useQuery();
  const { data: user, isLoading: isUserLoading } =
    trpc.user.getAuthUser.useQuery();
  const { data: metadata, isLoading: isMetaLoading } =
    trpc.user.getMetadata.useQuery(
      { userId: user?.id.toString() ?? "0" },
      {
        enabled: !!user?.id,
      },
    );
  const { mutate: addClaimables } = trpc.user.addClaimables.useMutation({
    onSuccess(_, variables) {
      toast.success(`Daily goal committed! (EXP +${variables.exp})`);
      utils.user.getAuthUser.invalidate();
      utils.user.getMetadata.invalidate();
    },
  });

  const { commitTarget, progress, reward } = useMemo(() => {
    if (!locData || !metadata) {
      return {
        commitTarget: DEFAULT_TARGET,
        progress: 0,
        reward: { coins: 0, exp: 0 },
      };
    }

    const commitTarget = metadata?.commitTarget || DEFAULT_TARGET;

    const progress = locData ? (locData.additions / commitTarget) * 100 : 0;
    const reward = calculateReward(commitTarget);

    return { commitTarget, progress, reward };
  }, [locData, metadata]);

  useEffect(() => {
    if (!user || !metadata || progress <= 100) {
      return;
    }

    const alreadyClaimed = metadata.rewardClaimedAt
      ? new Date(metadata.rewardClaimedAt).getDate() === new Date().getDate()
      : false;
    if (!alreadyClaimed) {
      addClaimables({
        userId: user.id.toString(),
        coins: reward.coins,
        exp: reward.exp,
      });
    }
  }, [progress, metadata, user]);

  if (isUserLoading || isMetaLoading) {
    return <DailyCommitSkeleton />;
  }

  return (
    <div className={cn("flex flex-col px-4 py-2", className)}>
      <div className="mb-2 flex items-center justify-between gap-1">
        <div>
          <h3 className="text-body4">
            {progress >= 100
              ? `Your daily goal achieved! 🎉`
              : `Commit ${commitTarget} LOC today`}
          </h3>
          <p className="text-sm">
            First rule of{" "}
            <span className="font-heading italic text-primary">Commitly</span>{" "}
            is you always commit those code
          </p>
        </div>
        <EditCommitGoal />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-body4">Rewards: </span>
        <div className="flex items-center gap-1">
          <IconCoin className="text-amber-500" />
          <span>{reward.coins} GitCoins</span>
        </div>
        <div className="flex items-center gap-1">
          <IconArrowBigUpLines className="text-success" />
          <span className="text-caption">{reward.exp} EXP</span>
        </div>
      </div>
      <div className="flex flex-col">
        {/* Progress bar */}
        <div className="mt-2 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-caption">
              <span className="text-success">+{locData?.additions}</span>
              <span className="mx-1 text-neutral-500">/</span>
              <span className="text-danger">-{locData?.deletions}</span>
            </p>
            <span className="text-caption">
              {progress.toFixed(2)}% of {commitTarget}
            </span>
          </div>
          <Progress value={progress > 100 ? 100 : progress} />
        </div>
      </div>
    </div>
  );
};

export default DailyCommit;

const EditCommitGoal = () => {
  const [open, setOpen] = useState(false);
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { data: metadata } = trpc.user.getMetadata.useQuery(
    { userId: user?.id.toString() ?? "0" },
    {
      enabled: !!user?.id,
    },
  );
  const utils = trpc.useUtils();
  const { mutate: updateMetadata, isLoading } =
    trpc.user.updateCommitTarget.useMutation({
      onSuccess() {
        utils.user.getMetadata.invalidate();
        toast.success("Commit goal updated");
        setOpen(false);
      },
    });
  const [commitTarget, setCommitTarget] = useState(DEFAULT_TARGET);
  const [updateable, setUpdateable] = useState(true);

  useEffect(() => {
    if (metadata?.commitTarget) {
      setCommitTarget(metadata.commitTarget);
    }
    const alreadyUpdated = metadata?.commitUpdatedAt
      ? new Date(metadata.commitUpdatedAt).getDate() === new Date().getDate()
      : false;
    setUpdateable(!alreadyUpdated);
  }, [metadata]);

  const reward = calculateReward(commitTarget);

  const updateCommitGoal = () => {
    if (!user) {
      return;
    }

    if (!updateable) {
      toast.error("Please stick to one goal a day");
      return;
    }

    updateMetadata({
      userId: user.id.toString(),
      commitTarget,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Commit Goal</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <span className="text-body4">Rewards: </span>
          <div className="flex items-center gap-1">
            <IconCoin className="text-amber-500" />
            <span>{reward.coins} GitCoins</span>
          </div>
          <div className="flex items-center gap-1">
            <IconUserUp className="text-success" />
            <span className="text-caption">+{reward.exp} EXP</span>
          </div>
        </div>
        <div className="pt-4">
          <p className="mb-4 text-caption">Current goal: {commitTarget} LOC</p>
          <Slider
            max={MAX}
            min={MIN}
            defaultValue={[commitTarget]}
            value={[commitTarget]}
            onValueChange={(val) => {
              setCommitTarget(val[0]);
            }}
          />
        </div>
        <DialogDescription>
          *You can only change your commit goal once a day
        </DialogDescription>
        <DialogFooter>
          <Button type="button" onClick={updateCommitGoal} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
