"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const NavGroup = ({
  title,
  items,
}: {
  title?: string;
  items: {
    title: string;
    url: string;
    icon?: any;
    isActive?: boolean;
    isExternal?: boolean;
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            <Link
              href={item.url}
              target={item.isExternal ? "_blank" : undefined}
            >
              <SidebarMenuButton tooltip={item.title} size="lg">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavGroup;
