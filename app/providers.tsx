"use client";

import { trpc, trpcClient } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          {children}
        </trpc.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
