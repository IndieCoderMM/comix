import SigninButton from "@/components/shared/signin-button";
import { getSession } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";

const Hero = async () => {
  const session = await getSession();

  return (
    <div className="bg-white">
      <section className="w-full bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="max-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold uppercase tracking-wider text-blue-600">
                Fun way to grow your skills
              </p>
              <h1 className="mt-4 font-heading text-h2 text-dark-gray sm:text-h1">
                Become a 10x developer with{" "}
                <span className="text-primary">Comix</span>
              </h1>
              <p className="mt-4 text-base text-dark-gray sm:text-xl lg:mt-8">
                Earn rewards, track progress, and grow your skills while having
                fun. Start your journey today!
              </p>

              <p className="mt-5 text-gray-600">
                Over 15,000 developers are already using Comix to grow their
                skills.
              </p>
              <div className="mt-8 flex items-center gap-4">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-400 lg:mt-16"
                    role="button"
                  >
                    Open Dashboard
                  </Link>
                ) : (
                  <SigninButton text="Join Now" />
                )}
              </div>
            </div>

            <div>
              <Image
                className="w-full object-contain"
                width={1000}
                height={600}
                src="/assets/hero.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
