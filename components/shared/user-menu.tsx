"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBrandGithub, IconUser } from "@tabler/icons-react";
import {
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Plus,
  Settings,
  Users,
} from "lucide-react";
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
    group: "Main",
    items: [
      {
        icon: IconUser,
        label: "Profile",
        shortcut: "⇧⌘P",
        onClick: () => console.log("Profile clicked"),
      },
      {
        icon: CreditCard,
        label: "Billing",
        shortcut: "⌘B",
        onClick: () => console.log("Billing clicked"),
      },
      {
        icon: Settings,
        label: "Settings",
        shortcut: "⌘S",
        onClick: () => console.log("Settings clicked"),
      },
      {
        icon: Keyboard,
        label: "Keyboard shortcuts",
        shortcut: "⌘K",
        onClick: () => console.log("Keyboard shortcuts clicked"),
      },
    ],
  },
  {
    group: "Team",
    items: [
      {
        icon: Users,
        label: "Team",
        onClick: () => console.log("Team clicked"),
        disabled: true,
      },
      {
        icon: Plus,
        label: "New Team",
        shortcut: "⌘+T",
        onClick: () => console.log("New Team clicked"),
      },
    ],
  },
  {
    items: [
      {
        icon: IconBrandGithub,
        label: "GitHub",
        onClick: () => console.log("GitHub clicked"),
      },
      {
        icon: LifeBuoy,
        label: "Support",
        onClick: () => console.log("Support clicked"),
      },
      {
        icon: Cloud,
        label: "API",
        disabled: true,
        onClick: () => console.log("API clicked"),
      },
    ],
  },
  {
    items: [
      {
        icon: LogOut,
        label: "Log out",
        shortcut: "⇧⌘Q",
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
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
