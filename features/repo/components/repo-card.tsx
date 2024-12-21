import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PublicRepo } from "@/services/github/helper";
import { formatLargeNumber } from "@/utils/format-number";
import { trpc } from "@/utils/trpc";
import {
  IconBolt,
  IconCircleDot,
  IconGitFork,
  IconRocket,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import toast from "react-hot-toast";

const RepoCard = ({
  repo,
  publicData,
}: {
  repo: { id: number; name: string; boost: number | null };
  publicData: PublicRepo;
}) => {
  const {
    name,
    owner,
    url,
    description,
    stargazerCount,
    forkCount,
    openIssues,
  } = publicData;

  return (
    <div className="rounded-lg border bg-card p-1 sm:p-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-1">
            <Link
              href={`https://github.com/${owner}`}
              target="_blank"
              rel="nofollower"
              className="text-body4 text-primary hover:underline"
            >
              <span className="text-primary">{owner}</span>
            </Link>
            <span>/</span>
            <Link
              href={url}
              target="_blank"
              rel="nofollower"
              className="text-body4 text-primary hover:underline"
            >
              <span className="text-primary">{name}</span>
            </Link>
          </div>
          <p className="mt-2 hidden text-sm text-neutral-700 dark:text-neutral-200 sm:inline-flex">
            {description || "No description available"}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <Booster repo={repo} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Stat
          label="Booster"
          icon={<IconBolt className="size-5" />}
          value={repo.boost ? formatLargeNumber(repo.boost) : 0}
        />
        <Stat
          label="Stars"
          icon={<IconStar className="size-5" />}
          value={stargazerCount}
        />
        <Stat
          label="Forks"
          icon={<IconGitFork className="size-5" />}
          value={forkCount}
        />
        <Stat
          label="Open Issues"
          icon={<IconCircleDot className="size-5" />}
          value={openIssues.totalCount}
        />
      </div>
    </div>
  );
};

export default RepoCard;

const BOOST = 100;

const Booster = ({ repo }: { repo: { id: number; boost: number | null } }) => {
  const utils = trpc.useUtils();
  const { data: user } = trpc.user.getAuthUser.useQuery();
  const { mutate, isLoading } = trpc.repo.boostRepo.useMutation({
    onSuccess: () => {
      utils.repo.getAllRepos.invalidate();
      utils.user.getAuthUser.invalidate();
      toast.success("Repo boosted");
    },
  });

  const handleBoost = () => {
    if (!user) return;
    mutate({ userId: user.id, repoId: repo.id, boost: BOOST });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            className="text-neutral-700 dark:text-neutral-200"
            disabled={isLoading}
            onClick={handleBoost}
          >
            <IconRocket />
            {isLoading ? "Boosting..." : `Boost +${BOOST}`}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>1 Booster = 1 GitCoins</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Stat = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: any;
  value: number | string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-800">
            <div className="text-neutral-500 dark:text-neutral-200">{icon}</div>
            <p className="block text-body4 text-neutral-500 dark:text-neutral-200">
              {value}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
