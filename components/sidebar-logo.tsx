"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import Image from "next/image";

const SidebarLogo = () => {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center">
        <Image
          src="/assets/logo.png"
          width={32}
          height={32}
          alt="Comix"
          className="object-contain"
        />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="font-poppins truncate text-h5">Comix</span>
      </div>
    </SidebarMenuButton>
  );
};

export default SidebarLogo;
