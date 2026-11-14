'use client';

import Image from "next/image";
import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image4 from "/public/image4.webp";
import Image5 from "/public/image5.webp";
import React from "react";
import { SOCIAL_ACCOUNTS } from "@/data/social-account";

export default function Footer() {
  return (
    <footer className="bg-primary-200 text-white p-8 text-center relative overflow-hidden xl:h-[394px]">
      <div className="absolute flex opacity-45 top-0 right-0 pointer-events-none" aria-hidden="true">
        <Image
          src={Image4}
          alt=""
          className="w-auto h-auto xl:hidden"
          priority
        />
        <Image
          src={Image5}
          alt=""
          className="w-auto h-auto hidden xl:block xl:!h-[394px]"
          priority
        />
      </div>
      <div className="container relative z-10 flex flex-col justify-center items-center mx-auto gap-1">
        <Link href="/" className="mb-2">
          <Image
            src={LogoImage}
            alt="Jon Rey Galera"
            className="h-10 w-auto"
            priority
          />
        </Link>
        <p>Building the future, one line of code at a time</p>
        <p className="text-white/70">© {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex justify-center gap-2 mt-4" id="footer">
          {SOCIAL_ACCOUNTS.map((social) => (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-xl hover:text-secondary-400 hover:bg-white/5 transition-colors"
              aria-label={social.platform}
            >
              { React.createElement(social.icon, { size: 20 })}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
