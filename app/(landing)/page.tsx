import CTA from "@/features/landing/sections/cta";
import { FAQ } from "@/features/landing/sections/faq";
import Features from "@/features/landing/sections/features";
import Hero from "@/features/landing/sections/hero";
import Metrics from "@/features/landing/sections/metrics";
import WorldMapSection from "@/features/landing/sections/worldmap";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <Metrics />
      <Features />
      <WorldMapSection />
      <FAQ />
      <CTA />
    </main>
  );
}
