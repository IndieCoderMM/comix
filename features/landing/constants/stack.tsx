import {
  IconBrandFramerMotion,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandVercelFilled,
} from "@tabler/icons-react";

const iconClass = "w-10 h-10";

export const stack = [
  {
    name: "Next.js",
    icon: <IconBrandNextjs className={iconClass} />,
  },
  {
    name: "React",
    icon: <IconBrandReact className={iconClass} />,
  },
  {
    name: "Framer Motion",
    icon: <IconBrandFramerMotion className={iconClass} />,
  },
  {
    name: "Supabase",
    icon: <IconBrandSupabase className={iconClass} />,
  },
  {
    name: "Vercel",
    icon: <IconBrandVercelFilled className={iconClass} />,
  },
];
