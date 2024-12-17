import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/tailwind";
import { trpc } from "@/utils/trpc";

// TODO: Calculate the target based on the user's level
const TARGET = 500;

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
  const progress = data ? (data.additions / TARGET) * 100 : 0;

  return (
    <div className={cn("flex flex-col p-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-body4">{title}</h3>
        <Button size="sm" variant="outline">
          Claim 500 GitCoins
        </Button>
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
              {progress.toFixed(2)}% of {TARGET}
            </span>
          </div>
          <Progress value={progress > 100 ? 100 : progress} />
        </div>
      </div>
    </div>
  );
};

export default DailyCommit;
