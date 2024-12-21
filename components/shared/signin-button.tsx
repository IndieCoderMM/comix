"use client";

import { signIn } from "next-auth/react";

const SigninButton = ({ text }: { text: string }) => {
  const handleClick = () => {
    signIn("github", {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="items-center justify-center rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-300 focus:text-black"
    >
      {text}
    </button>
  );
};

export default SigninButton;
