"use client";

import { cn } from "@/utils/tailwind";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../constants/nav-links";

const NavLinks = () => {
  const active = usePathname();

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative rounded-full px-4 py-2"
        >
          {active === link.href && (
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",
              )}
            />
          )}

          <span className="relative block text-black dark:text-white">
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
