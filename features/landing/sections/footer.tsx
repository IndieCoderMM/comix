"use client";

import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const emojis = ["❤️", "💔", "🥲", "🤩", "☕️"];

const Footer = () => {
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 3000) {
      setFeatureOpen((prev) => (prev + 1) % emojis.length);
      setTimer(0);
    }
  }, [timer]);

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
          <p className="text-caption text-white">
            Built with
            <span> {emojis[featureOpen]} </span>
            by{" "}
            <Link
              href="https://github.com/indiecodermm"
              target="_blank"
              className="underline"
            >
              IndieCoder
            </Link>
          </p>
          <p className="text-caption text-white">© Copyright 2025</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
