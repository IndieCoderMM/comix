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
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import toast from "react-hot-toast";

// TODO: Calculate the target based on the user's level
const DEFAULT_TARGET = 500;
const MIN = 10;

/**
 * Calculate the reward {coins, exp} based on the number of lines
 */
const calculateReward = (lines: number) => {
  return { coins: 0, exp: 0 };
};

const DailyCommit = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  const { data } = trpc.github.getTodayLOC.useQuery();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate: claimCoins, isLoading: isClaiming } =
    trpc.user.claimCoins.useMutation({
      onSuccess(_, variables) {
        toast.success(`Claimed ${variables.coins} GitCoins`);
      },
      onError() {
        toast.error("Cannot claim coins");
      },
    });

  const handleClaimCoins = (coins: number) => {
    if (!user) {
      return;
    }
    claimCoins({ coins: coins });
  };

  const progress = data ? (data.additions / DEFAULT_TARGET) * 100 : 0;

  return (
    <div className={cn("flex flex-col px-4 py-2", className)}>
      <div className="mb-2 flex items-center justify-between gap-1">
        <h3 className="text-body4">{title}</h3>
        <EditCommitGoal />
      </div>
      <div className="flex flex-col">
        <p className="text-sm">{description}</p>
        {/* Progress bar */}
        <div className="mt-2 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-caption">
              <span className="text-success">+{data?.additions}</span>
              <span className="mx-1 text-neutral-500">/</span>
              <span className="text-danger">-{data?.deletions}</span>
            </p>
            <span className="text-caption">
              {progress.toFixed(2)}% of {DEFAULT_TARGET}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end">
        <Button
          variant="outline"
          onClick={() => handleClaimCoins(500)}
          disabled={isClaiming}
          className="ml-auto p-2"
          size={"lg"}
        >
          <Image
            src="/assets/icons/coin.png"
            width={20}
            height={20}
            alt="Coin"
            className="object-contain"
          />
          {isClaiming ? "Claiming..." : `Claim ${user?.claimables} GitCoins`}
        </Button>
      </div>
    </div>
  );
};

export default DailyCommit;

const EditCommitGoal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Commit Goal</DialogTitle>
          <DialogDescription>
            You can change your daily commit goal here. <br />
            <span className="text-xs">*Only once per day.</span>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Slider min={MIN} />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
