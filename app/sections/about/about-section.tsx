'use client';
import Image from "next/image";
import BImage2 from '/public/image2.webp';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import TechStack from "./tech-stack";
import LearningStack from "./learning-stack";
import Hobbies from "./hobbies";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function AboutSection() {

  return (
    <SectionContainer id="section-about" className="md:items-center md:justify-center px-4 sm:px-6 h-auto py-24 sm:py-32 bg-primary-100 overflow-hidden">
      {/* Background Decor: Premium Aurora / Neural Mesh Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Aurora Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-secondary-500/10 blur-[120px] rounded-full animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-primary-600/10 blur-[120px] rounded-full animate-pulse duration-[8s] delay-1000" />
        
        {/* Refined Technical Grid */}
        <div 
          className="absolute inset-0 [background-image:linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] [background-size:40px_40px] md:[background-size:60px_60px] opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100 via-transparent to-primary-100" />
      </div>

      <div className="relative container max-w-6xl mx-auto flex flex-col z-10 w-full">

        <div className={cn(internSans.className, "font-black antialiased mb-12 sm:mb-20")}>
          <h2 className="text-[12vw] sm:text-[64px] font-bold text-white tracking-tight leading-[0.9]">
            About <span className="text-secondary-500 italic">me</span>
          </h2>
          <div className="h-1 sm:h-2 w-16 sm:w-24 bg-secondary-500 mt-4 rounded-full shadow-[0_0_20px_rgba(151,199,56,0.5)]" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12 sm:gap-20 items-start">
          <div className="space-y-12 sm:space-y-16">
            <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl md:text-2xl leading-relaxed text-primary-800 font-normal">
              <p className="animate-in fade-in slide-in-from-left-4 duration-700">
                I'm a <span className="text-secondary-400 font-extrabold underline decoration-secondary-500/20 underline-offset-4">Senior Software Engineer</span> with over 5 years of experience building high-volume production systems. My work focuses on the intersection of <span className="text-secondary-500 font-bold">AI Agent development</span> and scalable architectures.
              </p>
              <p className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                I orchestrate complex automation workflows via <span className="text-secondary-400 font-bold">n8n</span> and contribute to the AI community as the creator of <a href="https://github.com/jonreygalera/prompts" target="__blank" className="font-bold text-secondary-500 hover:text-secondary-400 underline decoration-secondary-500/30 hover:decoration-secondary-400 transition-all">Prompts for LLM</a>.
              </p>
            </div>
            
            <div className={cn(internSans.className, "antialiased bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10 rounded-[2rem] border border-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200")}>
              <Hobbies/>
            </div>
          </div>

          <div className="relative group mx-auto xl:mx-0 w-full max-w-[450px] xl:w-full">
            <div className="absolute -inset-4 bg-secondary-500/10 rounded-[3rem] blur-2xl group-hover:bg-secondary-500/20 transition-all duration-700 scale-95 group-hover:scale-105" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-secondary-500/10">
              <Image 
                src={BImage2}
                alt="Jon Rey Galera"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-100/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Tech Stack Integration */}
        <div className="mt-24 sm:mt-32">
          <TechStack />
          <LearningStack />
        </div>
      </div>
    </SectionContainer>
  );
}