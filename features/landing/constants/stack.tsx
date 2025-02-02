import {
  IconBrandNextjs,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandVercelFilled,
} from "@tabler/icons-react";

const iconClass = "w-10 h-10";

export const stack = [
  {
    name: "Next.js",
    icon: <IconBrandNextjs className={iconClass} />,
  },
  {
    name: "Tailwind CSS",
    icon: <IconBrandTailwind className={iconClass} />,
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
