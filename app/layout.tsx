import "@/styles/globals.css";
import { getSession } from "@/utils/auth";
import type { Metadata } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Commitly - The best GitHub commit tracker",
  description: "Commitly is the best GitHub commit tracker",
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
        className={`${poppins.variable} ${nunitoSans.variable} font-nunito antialiased`}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
