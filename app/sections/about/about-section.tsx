'use client';
import Image from "next/image";
import BImage2 from '/public/image2.png';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import Hobbies from "./hobbies";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function AboutSection() {

  return (
    <SectionContainer id="section-about" className="md:items-center md:justify-center px-2 h-auto">
      <div className="relative container flex flex-col">

        <div className={cn(internSans.className, "font-black antialiased")}>
          <h1 className="text-[50px] italic">
            {"About me"}
          </h1>
        </div>

        <div className="">
          <div className="mt-6 w-full px-1">
            <p className="text-2xl">Software engineer with 5+ years experience building modern web applications. 
            Specializing in ReactJS, Laravel, and Docker to deliver efficient, scalable solutions.
            </p>
            <div className="flex my-10">
              <Image 
                src={BImage2}
                alt="Image 2"
                className="w-auto h-auto"
                priority
                style={{ objectFit: 'cover' }}
              />
              <div className={cn(internSans.className, "antialiased")}>
                <Hobbies/>
              </div>
            </div>
            
            <p className="text-xl">
              Passionate about AI automation and creator of <a href="https://github.com/jonreygalera/prompts" target="__blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Prompts for LLM</a>.
              Currently exploring AI Agent Automation to bridge software engineering with data-driven systems.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}