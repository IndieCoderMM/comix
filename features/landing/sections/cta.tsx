import { IconBrandGithub } from "@tabler/icons-react";
import { ShootingStars } from "../components/shooting-stars";
import { StarsBackground } from "../components/star-background";
import Footer from "./footer";

const CTA = () => {
  return (
    <section className="relative flex h-screen w-full overflow-hidden bg-black py-20">
      <ShootingStars />
      <StarsBackground />
      <div className="max-container flex flex-col items-center">
        <h1 className="relative z-20 text-center font-body text-3xl font-bold text-white md:text-7xl lg:text-9xl">
          Comix
        </h1>
        <div className="relative mb-20 w-[40rem]">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        </div>
        <h2 className="text-gradient text-h2">Get started today</h2>
        <p className="max-w-xl text-center font-sans text-lg leading-relaxed tracking-tight text-neutral-300">
          Earn rewards, track progress, and grow your skills while having fun.
          Start your journey today!
        </p>
        <button className="relative mt-10 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.2] px-10 py-2 font-heading text-body1 text-white/[0.8] transition duration-500 hover:border-white/[0.6] hover:text-white">
          <IconBrandGithub className="h-8 w-8" />
          <span>One-click Login</span>
          <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </section>
  );
};

export default CTA;
