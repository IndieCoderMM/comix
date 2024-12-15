"use client";

import { signOut } from "next-auth/react";

const LogoutButton = ({ text }: { text?: string }) => {
  const handleClick = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hidden items-center justify-center rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-300 focus:text-black sm:inline-flex"
    >
      {text ?? "Log Out"}
    </button>
  );
};

export default LogoutButton;
