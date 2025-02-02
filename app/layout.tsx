import "@/styles/globals.css";
import { getSession } from "@/utils/auth";
import type { Metadata } from "next";
import { Inter, Nunito_Sans, Poppins } from "next/font/google";
import Providers from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comix - Fun way to grow your coding skills",
  description:
    "Comix is a platform that helps you to grow your skills by making coding fun and rewarding.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${nunitoSans.variable} ${inter.variable} font-body antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
