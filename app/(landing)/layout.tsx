import Footer from "@/features/landing/layouts/footer";
import Header from "@/features/landing/layouts/header";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import React from "react";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
