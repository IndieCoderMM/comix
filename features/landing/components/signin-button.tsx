"use client";

import { IconFingerprint } from "@tabler/icons-react";
import { useLogin } from "../hooks/useLogin";

const SigninButton = ({ text }: { text: string }) => {
  const login = useLogin();
  return (
    <button
      onClick={login}
      type="button"
      className="relative flex items-center justify-center gap-2 rounded-full border border-white/[0.2] px-4 py-2 text-sm font-medium text-white"
    >
      <IconFingerprint className="h-4 w-4" />
      <span>{text}</span>
      <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </button>
  );
};

export default SigninButton;
