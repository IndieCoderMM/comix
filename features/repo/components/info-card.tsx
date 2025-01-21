import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBolt, IconCodePlus, IconShare } from "@tabler/icons-react";

const InfoCard = () => {
  return (
    <Card className="top-10 sm:sticky">
      <CardHeader>
        <CardTitle className="font-heading text-h5 text-neutral-800 dark:text-neutral-200">
          Repositories & Boosting
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-neutral-800 dark:text-neutral-200">
        <div className="flex items-start gap-2">
          <div className="size-7 p-2 sm:size-10">
            <IconShare />
          </div>
          <p className="text-base">
            Share your repositories to attract collaborators or explore others
            for ideas and contributions.{" "}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="size-7 p-2 sm:size-10">
            <IconBolt />
          </div>
          <p className="text-base">
            Use GitCoins to boost repositories, increasing their visibility and
            popularity.{" "}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="size-7 p-2 sm:size-10">
            <IconCodePlus />
          </div>
          <p className="text-base">
            Contribute to repositories to earn GitCoins and EXP.{" "}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
