import { IconArrowNarrowRight } from "@tabler/icons-react";
import Contributors from "../components/contributors";
import HeroButton from "../components/hero-button";
import { Spotlight } from "../components/spotlight";
import Stack from "../components/stack";
import { content } from "../constants/content";
import { contributors } from "../constants/contributors";
import { stack } from "../constants/stack";

const Hero = () => {
  const words = [
    "GitHub Contribution Visualizer",
    "Gamified Commit Tracker",
    "Earn Rewards",
    "Track Progress",
    "Grow Your Skills",
    "Start Your Journey Today!",
  ];
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="relative flex h-screen w-full overflow-hidden bg-blackO antialiased bg-grid-white/[0.02] md:items-center md:justify-center">
        <Spotlight />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center p-4 pt-20 md:pt-0">
          <h1 className="text-gradient text-center text-h1">
            A GitHub Commit Tracker <br />
            That Makes Coding More Fun
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-body1 text-neutral-300">
            {content.hero.description}
          </p>
          <div className="my-10">
            <HeroButton
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-4 text-white"
            >
              <span className="font-body text-body3">{content.hero.cta}</span>
              <IconArrowNarrowRight />
            </HeroButton>
          </div>
          <div className="flex w-full items-center justify-center gap-10">
            <Contributors people={contributors} />
            <Stack stack={stack} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

//const Hero = async () => {
//  const session = await getSession();
//
//  return (
//    <div className="bg-white">
//      <section className="w-full bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
//        <div className="max-container px-4 sm:px-6 lg:px-8">
//          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//            <div>
//              <p className="text-base font-semibold uppercase tracking-wider text-blue-600">
//                Fun way to grow your skills
//              </p>
//              <h1 className="mt-4 font-heading text-h2 text-dark-gray sm:text-h1">
//                Become a 10x developer with{" "}
//                <span className="text-primary">Comix</span>
//              </h1>
//              <p className="mt-4 text-base text-dark-gray sm:text-xl lg:mt-8">
//                Earn rewards, track progress, and grow your skills while having
//                fun. Start your journey today!
//              </p>
//
//              <p className="mt-5 text-gray-600">
//                Over 15,000 developers are already using Comix to grow their
//                skills.
//              </p>
//              <div className="mt-8 flex items-center gap-4">
//                {session ? (
//                  <Link
//                    href="/dashboard"
//                    className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-400 lg:mt-16"
//                    role="button"
//                  >
//                    Open Dashboard
//                  </Link>
//                ) : (
//                  <SigninButton text="Join Now" />
//                )}
//              </div>
//            </div>
//
//            <div>
//              <Image
//                className="w-full object-contain"
//                width={1000}
//                height={600}
//                src="/assets/hero.png"
//                alt=""
//              />
//            </div>
//          </div>
//        </div>
//      </section>
//    </div>
//  );
//};
//
//export default Hero;
