"use client";

import { cn } from "@/utils/tailwind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../constants/nav-links";

const NavLinks = () => {
  const active = usePathname();

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="relative flex items-center gap-0.5 rounded-full px-4 py-2"
        >
          {active === href && (
            <div
              className={cn(
                "absolute inset-0 -z-10 rounded-full bg-gray-200 dark:bg-zinc-800",
              )}
            />
          )}
          <Icon className="relative h-4 w-4 text-purple-gray dark:text-white" />
          <span className="relative block text-purple-gray dark:text-white">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
