'use client';
import Image from "next/image";
import BImage2 from '/public/image2.webp';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import TechStack from "./tech-stack";
import Hobbies from "./hobbies";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function AboutSection() {

  return (
    <SectionContainer id="section-about" className="md:items-center md:justify-center px-6 h-auto py-24 bg-primary-100 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0 [background-image:linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:40px_40px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100 via-transparent to-primary-100" />
      </div>

      <div className="relative container max-w-6xl mx-auto flex flex-col z-10">

        <div className={cn(internSans.className, "font-black antialiased mb-16")}>
          <h2 className="text-[40px] md:text-[64px] font-bold text-white tracking-tight leading-tight">
            About <span className="text-secondary-500">me</span>
          </h2>
          <div className="h-1.5 w-24 bg-secondary-500 mt-4 rounded-full shadow-[0_0_20px_rgba(151,199,56,0.3)]" />
        </div>

        <div className="w-full xl:flex xl:gap-20 items-start">
          <div className="flex-1 xl:order-2">
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-primary-800 font-normal">
              <p>
                I'm a <span className="text-secondary-400 font-bold">Senior Software Engineer</span> with over 5 years of experience building high-volume production systems. My work focuses on the intersection of <span className="text-secondary-400 font-bold">AI Agent development</span> and scalable architectures.
              </p>
              <p>
                I orchestrate complex automation workflows via <span className="text-secondary-400 font-bold">n8n</span> and contribute to the AI community as the creator of <a href="https://github.com/jonreygalera/prompts" target="__blank" className="font-bold text-secondary-500 hover:text-secondary-400 underline decoration-secondary-500/30 hover:decoration-secondary-400 transition-all">Prompts for LLM</a>.
              </p>
            </div>
            
            <div className={cn(internSans.className, "antialiased mt-12 bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5")}>
              <Hobbies/>
            </div>
          </div>

          <div className="mt-16 xl:mt-0 xl:order-1 xl:w-[400px] flex-shrink-0">
            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/10 aspect-[4/5] shadow-2xl shadow-black/50 transition-transform duration-700 hover:scale-[1.02]">
              <Image 
                src={BImage2}
                alt="Jon Rey Galera"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-100/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Tech Stack Integration */}
        <div className="mt-20">
          <TechStack />
        </div>
      </div>
    </SectionContainer>
  );
}