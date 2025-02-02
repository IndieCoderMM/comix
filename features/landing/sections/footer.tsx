import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="relative bg-transparent pb-8 pt-12">
      <div className="max-container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0 items-center justify-center sm:justify-start">
            <Link
              href="/"
              title="Commity"
              className="hidden font-heading text-h5 text-white sm:inline-flex"
            >
              Comix
            </Link>
          </div>

          <ul className="flex items-center justify-center space-x-8 xl:justify-end">
            <li>
              <Link
                href="https://github.com/IndieCoderMM/comix"
                title="Our Repo"
                target="_blank"
                rel="noopener"
                className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
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
                className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
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
                className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
              >
                <IconBrandLinkedin />
              </Link>
            </li>

            <li className="relative">
              <Link
                href="https://bsky.app/profile/heinthantoo.bsky.social"
                title="BlueSky"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
              >
                <IconBrandBluesky />
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-caption text-white">Built with 🥲 by IndieCoder</p>
          <p className="text-caption text-white">© Copyright 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
