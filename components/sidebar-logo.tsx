"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { IconGitMerge } from "@tabler/icons-react";

const SidebarLogo = () => {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <IconGitMerge className="size-6" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="font-poppins truncate text-h5">Commitly</span>
      </div>
    </SidebarMenuButton>
  );
};

export default SidebarLogo;
