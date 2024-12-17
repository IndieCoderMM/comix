import { getSession } from "@/utils/auth";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

const Hero = async () => {
  const session = await getSession();

  return (
    <div className="bg-white">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="max-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold uppercase tracking-wider text-blue-600">
                A new way to grow your skills
              </p>
              <h1 className="mt-4 font-heading text-h1 text-dark-gray">
                Commit to your goals with{" "}
                <span className="text-primary">Commitly</span>
              </h1>
              <p className="mt-4 text-base text-black sm:text-xl lg:mt-8">
                Track your GitHub commits and earn rewards.
              </p>

              {session ? (
                <Link
                  href="/dashboard"
                  className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-400 lg:mt-16"
                  role="button"
                >
                  Open Dashboard
                </Link>
              ) : (
                <a
                  href="#"
                  title=""
                  className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-secondary hover:text-black focus:bg-yellow-400 lg:mt-16"
                  role="button"
                >
                  Join for free
                  <IconArrowRight />
                </a>
              )}
              <p className="mt-5 text-gray-600">
                Already joined us?{" "}
                <a
                  href="#"
                  title=""
                  className="text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>

            <div>
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
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
