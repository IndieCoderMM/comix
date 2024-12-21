"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface MenuItem {
  group?: string;
  items: {
    icon: React.ElementType;
    label: string;
    shortcut?: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
}

const menuItems: MenuItem[] = [
  {
    group: "Account",
    items: [
      {
        icon: LogOut,
        label: "Log out",
        onClick: () => {
          signOut({
            callbackUrl: "/",
          });
        },
      },
    ],
  },
];

export function UserMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((group, index) => (
          <DropdownMenuGroup key={index}>
            {group.group && (
              <DropdownMenuLabel>{group.group}</DropdownMenuLabel>
            )}
            {group.items.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                <item.icon />
                <span>{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
