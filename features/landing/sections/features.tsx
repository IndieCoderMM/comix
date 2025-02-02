import { cn } from "@/utils/tailwind";
import { IconGitCommit } from "@tabler/icons-react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "../components/bento";
import { content } from "../constants/content";

const Features = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black pt-10">
      <div className="absolute right-0 top-1/3 h-[30%] w-[50%] transform rounded-full bg-purple-500 bg-gradient-to-r from-blue-500 to-teal-500 opacity-10 blur-3xl" />
      <div className="absolute -bottom-24 right-1/3 h-[100%] w-[50%] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5 blur-3xl" />
      <div className="flex w-full flex-col items-center">
        <h2
          id="features"
          className="text-gradient text-center text-h2 font-semibold"
        >
          {content.features.heading}
        </h2>
        <p className="mt-4 max-w-lg text-center text-body1 text-neutral-300">
          {content.features.description}
        </p>
        <div className="relative mt-10 flex w-full overflow-hidden md:items-center md:justify-center">
          <BentoGrid className="max-container mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.span}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) => (
  <div className="relative flex h-full min-h-[6rem] w-full flex-1 overflow-hidden rounded-xl">
    <Image
      src={src}
      alt={title}
      width={500}
      height={500}
      className={cn("h-auto w-full object-cover object-left-top", className)}
    />
  </div>
);

const features = content.features.list;

const items = [
  {
    title: features[0].title,
    description: features[0].description,
    header: <FeatureCard title={features[0].title} src={features[0].srcImg} />,
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
  {
    title: features[4].title,
    description: features[4].description,
    header: <FeatureCard title={features[4].title} src={features[4].srcImg} />,
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-3",
  },
  {
    title: features[2].title,
    description: features[2].description,
    header: <FeatureCard title={features[2].title} src={features[2].srcImg} />,
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-5",
  },
  {
    title: features[1].title,
    description: features[1].description,
    header: <FeatureCard title={features[1].title} src={features[1].srcImg} />,
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-6",
  },
  {
    title: features[3].title,
    description: features[3].description,
    header: <FeatureCard title={features[3].title} src={features[3].srcImg} />,
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-6",
  },
  {
    title: features[5].title,
    description: features[5].description,
    header: (
      <FeatureCard
        title={features[5].title}
        src={features[5].srcImg}
        className="object-contain object-center"
      />
    ),
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
  {
    title: features[7].title,
    description: features[7].description,
    header: (
      <FeatureCard
        title={features[7].title}
        src={features[7].srcImg}
        className="object-cover object-top"
      />
    ),
    icon: <IconGitCommit className="h-4 w-4 text-neutral-500" />,
    span: "col-span-8",
  },
];

export default Features;
