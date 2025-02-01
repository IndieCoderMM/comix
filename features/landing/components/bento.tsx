import { cn } from "@/utils/tailwind";
import SpotlightCard from "./spotlight-card";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-12 gap-4 md:auto-rows-[25rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <SpotlightCard
      className={cn(
        "group/bento bg-bento-card row-span-1 flex flex-col justify-between space-y-4 rounded-xl p-4 shadow-input transition duration-200 hover:shadow-xl dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-sans text-body4 text-neutral-200 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-body text-body3 text-neutral-200 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </SpotlightCard>
  );
};
