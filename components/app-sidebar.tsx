"use client";

import { Crown, HashIcon, HomeIcon, PieChart } from "lucide-react";
import * as React from "react";

import NavGroup from "@/components/nav-group";
import SidebarLogo from "@/components/sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Stats",
      url: "/dashboard/stats",
      icon: PieChart,
    },
  ],
  community: [
    {
      title: "Leaderboard",
      url: "/dashboard/leaderboard",
      icon: Crown,
    },
    {
      title: "Feed",
      url: "/dashboard/feed",
      icon: HashIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup title={"Platform"} items={data.navMain} />
        <SidebarSeparator />
        <NavGroup title={"Community"} items={data.community} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
