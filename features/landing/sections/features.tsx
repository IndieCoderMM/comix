import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "../components/bento";

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
          Features
        </h2>
        <p className="mt-4 max-w-lg text-center text-body1 text-neutral-300">
          Explore the key features of our platform and discover the endless
          possibilities.
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
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    span: "col-span-5",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    span: "col-span-3",
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    span: "col-span-6",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    span: "col-span-6",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    span: "col-span-4",
  },
];

export default Features;
