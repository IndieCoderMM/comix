import { IconBrandGithub } from "@tabler/icons-react";
import HeroButton from "../components/hero-button";
import { ShootingStars } from "../components/shooting-stars";
import { StarsBackground } from "../components/star-background";
import { content } from "../constants/content";
import Footer from "./footer";

const CTA = () => {
  return (
    <section className="relative flex h-screen w-full overflow-hidden bg-black py-20">
      <ShootingStars />
      <StarsBackground />
      <div className="max-container flex flex-col items-center">
        <h1 className="relative z-20 text-center font-heading text-3xl font-bold text-white md:text-7xl lg:text-9xl">
          Comix
        </h1>
        <div className="relative mb-20 w-[40rem]">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        </div>
        <h2 className="text-gradient text-h2">{content.footerCta.title}</h2>
        <p className="max-w-xl text-center font-sans text-lg leading-relaxed tracking-tight text-neutral-300">
          {content.footerCta.description}
        </p>

        <HeroButton
          containerClassName="rounded-full mt-10"
          as="button"
          className="flex items-center space-x-4 text-white"
        >
          <IconBrandGithub className="h-8 w-8" />
          <span>{content.footerCta.cta}</span>
        </HeroButton>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </section>
  );
};

export default CTA;
