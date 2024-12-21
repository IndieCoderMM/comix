import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            <div className="flex flex-shrink-0 items-center justify-center sm:justify-start">
              <Image
                src="/assets/logo.png"
                width={40}
                height={40}
                alt="Comix"
                className="object-contain"
              />
              <Link
                href="/"
                title="Commity"
                className="hidden font-heading text-h5 text-primary sm:inline-flex"
              >
                Comix
              </Link>
            </div>
          </div>

          <p className="mt-5 text-sm text-primary xl:ml-6 xl:mt-0">
            © Copyright 2024 Comix
          </p>
          <div className="mt-8 items-center xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <div className="mb-5 mt-8 h-px w-full bg-gray-50/20 xl:m-0 xl:h-6 xl:w-px"></div>

            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <Link
                  href="https://github.com/IndieCoderMM/comix"
                  title="Our Repo"
                  target="_blank"
                  rel="noopener"
                  className="block text-primary transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <IconBrandGithub />
                </Link>
              </li>

              <li>
                <Link
                  href="https://heinthantoo.vercel.app"
                  title="My Website"
                  target="_blank"
                  rel="noopener"
                  className="block text-primary transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <IconWorld />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.linkedin.com/in/hthantoo/"
                  title="My LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <IconBrandLinkedin />
                </Link>
              </li>

              <li>
                <Link
                  href="https://bsky.app/profile/heinthantoo.bsky.social"
                  title="BlueSky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                >
                  <IconBrandBluesky />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
