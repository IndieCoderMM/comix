import { cn } from "@/utils/tailwind";
import { IconProps } from "@tabler/icons-react";
import React from "react";
import { StatsData } from "../constants/stats";

const Stats = () => {
  return (
    <div className="max-container flex flex-col items-center gap-8 px-8">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-around">
        {StatsData.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
      <p className="text-center text-body1 text-mid-gray">
        These are just random numbers. Enjoy the real experience yourself.
      </p>
    </div>
  );
};

export default Stats;

const StatItem = ({
  title,
  value,
  icon: Icon,
  fg,
  bg,
}: {
  title: string;
  value: string;
  icon: React.JSXElementConstructor<IconProps>;
  fg?: string;
  bg?: string;
}) => {
  return (
    <div className="flex w-full items-center justify-start sm:justify-center">
      <div
        className={cn(
          `flex h-24 w-24 items-center justify-center rounded-xl`,
          bg,
        )}
      >
        <Icon className={cn(`h-14 w-14`, fg)} />
      </div>
      <div className="ml-4">
        <h3 className="font-heading text-h5 text-dark-gray">{value}</h3>
        <p className="text-body1 text-dark-gray">{title}</p>
      </div>
    </div>
  );
};
