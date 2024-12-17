import {
  IconChartLine,
  IconCrown,
  IconHome2,
  IconUser,
} from "@tabler/icons-react";

export const navLinks = [
  {
    href: "/dashboard",
    label: "Home",
    icon: IconHome2,
  },
  {
    href: "/dashboard/leaderboard",
    label: "Leaderboard",
    icon: IconCrown,
  },
  {
    href: "/dashboard/stats",
    label: "Stats",
    icon: IconChartLine,
  },
  {
    href: "/dashboard/profile",
    label: "Settings",
    icon: IconUser,
  },
];
