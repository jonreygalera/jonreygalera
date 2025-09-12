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
    <SectionContainer id="section-about" className="items-center justify-center">
      <div className="w-full relative flex container">
        <Image 
          src={BImage2}
          alt="Image 2"
          className="w-auto h-auto"
          priority
          style={{ objectFit: 'cover' }}
        />

       <div className="flex flex-col gap-2 w-full">
          <div className={cn(internSans.className, "font-black antialiased")}>
            <h1 className="text-[75px] italic">
              {"About me"}
            </h1>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <p className="mt-6 w-full text-2xl ">
              I'm a software engineer with over 5 years of professional experience building modern web applications, 
              currently working at the intersection of AI and scalable software. I specialize in full-stack 
              development using ReactJS, Laravel, and Docker, delivering efficient solutions that power 
              real-world innovation.
              <br/><br/>
              Outside of work, I enjoy experimenting with automation and low-code tools—especially n8n, 
              where I build creative workflows just for fun. I'm also the creator of <a href="https://github.com/jonreygalera/prompts" target="__blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Prompts for LLM</a>, 
              a growing resource for crafting better prompts for large language models.
              <br/><br/>
              Lately, I've been diving deeper into AI Agent Automation, bridging the gap between 
              traditional software engineering and data-driven systems.
            </p>
            <div className={cn(internSans.className, "antialiased")}>
              <Hobbies/>
            </div>
          </div>
       </div>
      </div>
    </SectionContainer>
  );
}