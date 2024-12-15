import Footer from "@/features/landing/layouts/footer";
import Header from "@/features/landing/layouts/header";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
