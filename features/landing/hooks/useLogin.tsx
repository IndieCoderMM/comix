import { signIn } from "next-auth/react";
import { useCallback } from "react";

export const useLogin = () => {
  const login = useCallback(async () => {
    try {
      const res = await signIn("github", {
        callbackUrl: `${window.location.origin}/dashboard`,
      });

      return res;
    } catch (e) {
      console.log("Failed to login", e);
    }
  }, []);

  return login;
};
