'use client';

import Image from "next/image";
import Link from "next/link";
import LogoImage from "/public/logo.png";
import Image4 from "/public/image4.png";
import Image5 from "/public/image5.png";
import React from "react";
import { SOCIAL_ACCOUNTS } from "@/data/social-account";

export default function Footer() {
  return (
    <footer className="bg-primary-200 text-white p-8 text-center relative xl:h-[197px]">
      <div className="absolute flex opacity-45 top-0 right-0">
        <Image 
          src={Image4}
          alt="Footer decoration"
          className="w-auto h-auto xl:hidden"
          priority
        />
        <Image 
          src={Image5}
          alt="Footer decoration"
          className="w-auto h-auto hidden xl:block"
          priority
        />
      </div>
      <div className="container flex flex-col justify-center items-center mx-auto">
        <Link href="/">
          <Image 
            src={LogoImage} 
            alt="Jon Rey Galera"
            className="sm:h-8 w-auto md:h-10 hover:animate-spin"
            priority
          />
        </Link>
        <p>Building the future, one line of code at a time</p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex justify-center gap-4 mt-4">
          {SOCIAL_ACCOUNTS.map((social) => (
            <Link 
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
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
