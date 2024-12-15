import {
  IconBuilding,
  IconGitPullRequest,
  IconUsersPlus,
} from "@tabler/icons-react";
import { Stat } from "../types";

export const StatsData: Stat[] = [
  {
    title: "Active Users",
    value: "1,200+",
    icon: IconUsersPlus,
    fg: "text-[#c06ef3]",
    bg: "bg-[#c06ef3]/10",
  },
  {
    title: "Projects",
    value: "100+",
    icon: IconGitPullRequest,
    fg: "text-[#f3c06e]",
    bg: "bg-[#f3c06e]/10",
  },
  {
    title: "Organizations",
    value: "50+",
    icon: IconBuilding,
    fg: "text-[#6ef3c0]",
    bg: "bg-[#6ef3c0]/10",
  },
];
