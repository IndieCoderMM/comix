import { getSession } from "@/utils/auth";
import { inferAsyncReturnType } from "@trpc/server";

export async function createContext() {
  const session = await getSession();
  const ctx = {
    session,
  };

  return ctx;
}

export type Context = inferAsyncReturnType<typeof createContext>;
