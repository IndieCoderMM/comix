import { Button } from "@/components/ui/button";
import { IconChartPie, IconTrendingUp, IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const ActivityLinks = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <LinkItem
        icon={<IconWorld size={44} className="text-info" />}
        title="Top Committers"
        description="View your ranking among the community"
        href="/dashboard/leaderboard"
        linkLabel="View Leaderboard"
      />
      <LinkItem
        icon={<IconTrendingUp size={44} className="text-warning" />}
        title="Trending Projects"
        description="Check out the latest trending projects on the feed"
        href="/dashboard/feed"
        linkLabel="Explore Now"
      />
      <LinkItem
        icon={<IconChartPie size={44} className="text-success" />}
        title="Project Stats"
        description="Get detailed stats of your projects and contributions"
        href="/dashboard/stats"
        linkLabel="Get Stats"
      />
    </div>
  );
};

export default ActivityLinks;

const LinkItem = ({
  title,
  description,
  icon,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  linkLabel: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-card p-2 sm:flex-row sm:items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-dark">
        {icon}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="font-heading text-body2 text-purple-gray dark:text-neutral-300">
          {title}
        </h3>
        <p className="text-body3">{description}</p>
      </div>
      <div>
        <Link href={href}>
          <Button variant="outline">{linkLabel}</Button>
        </Link>
      </div>
    </div>
  );
};
