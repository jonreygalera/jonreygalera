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
    <SectionContainer id="section-about" className="md:items-center md:justify-center px-2 h-auto md:mt-10">
      <div className="relative container flex flex-col">

        <div className={cn(internSans.className, "font-black antialiased")}>
          <h1 className="text-[50px] italic">
            {"About me"}
          </h1>
        </div>

        <div className="mt-6 w-full px-1 xl:flex xl:gap-2 xl:px-0">

          <div className="xl:order-2">
            <p className="text-2xl xl:hidden">Software engineer with 5+ years experience building modern web applications. 
              Specializing in ReactJS, Laravel, and Docker to deliver efficient, scalable solutions.
            </p>
            
            <div className="hidden xl:block">
              <div className="flex flex-col gap-10">
                <div className="text-2xl leading-normal">
                  <p>
                    I'm a software engineer with over 5 years of experience building modern web applications, currently working at the intersection of AI and scalable software. I specialize in full-stack development using ReactJS, Laravel, and Docker, delivering efficient solutions that power real-world innovation.
                  </p>
                  <p className="mt-5">
                    Outside of work, I enjoy experimenting with automation and low-code tools—especially n8n, where I build creative workflows just for fun. I'm also the creator of <a href="https://github.com/jonreygalera/prompts" target="__blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Prompts for LLM</a>, a growing resource for crafting better prompts for large language models.
                  </p>
                </div>
                <div className={cn(internSans.className, "antialiased")}>
                  <Hobbies/>
                </div>
              </div>
            </div>

          </div>

          <div className="flex my-10 xl:order-1 xl:h-[400px] xl:w-3xl">
            <Image 
              src={BImage2}
              alt="Image 2"
              className="w-auto h-auto object-cover xl:!object-fill"
              priority
            />
            <div className={cn(internSans.className, "antialiased xl:hidden")}>
              <Hobbies/>
            </div>
          </div>
          
          <div className="xl:hidden">
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