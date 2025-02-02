import CTA from "@/features/landing/sections/cta";
import { FAQ } from "@/features/landing/sections/faq";
import Features from "@/features/landing/sections/features";
import Guides from "@/features/landing/sections/guides";
import Hero from "@/features/landing/sections/hero";
import Metrics from "@/features/landing/sections/metrics";
import Screenshot from "@/features/landing/sections/screenshot";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <Metrics />
      <Screenshot />
      <Features />
      <Guides />
      <FAQ />
      <CTA />
    </main>
  );
}
