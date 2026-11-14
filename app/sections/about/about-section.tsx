'use client';
import Image from "next/image";
import ProfileImage from '/public/Jon Rey Galera - Profile.png';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ExperienceCounter from "@/components/experience-counter";
import PixelDialog from "@/components/pixel-dialog";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import TechStack from "./tech-stack";
import LearningStack from "./learning-stack";

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
                <span className="text-secondary-400 font-extrabold underline decoration-secondary-500/20 underline-offset-4">Full-stack engineer</span> experienced in building modern web and mobile applications, now creating <span className="text-secondary-500 font-bold">AI-powered products</span> built on that software engineering foundation.
              </p>
            </div>
            
            <ExperienceCounter className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100" />
          </div>

          <div className="relative group mx-auto xl:mx-0 w-full max-w-[450px] xl:w-full">
            <div className="absolute -inset-4 bg-secondary-500/10 rounded-[3rem] blur-2xl group-hover:bg-secondary-500/20 transition-all duration-700 scale-95 group-hover:scale-105" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-secondary-500/10">
              <Image 
                src={ProfileImage}
                alt="Jon Rey Galera"
                sizes="(min-width: 1280px) 400px, (min-width: 640px) 450px, 100vw"
                placeholder="blur"
                className="w-full h-full object-cover object-top brightness-[0.82] contrast-[1.08] saturate-[0.9] sepia-[0.08] group-hover:brightness-90 group-hover:saturate-100 transition-all duration-1000 group-hover:scale-110"
                priority
              />
              {/* Cinematic grade: brand-tinted shadows, soft vignette, warm lime glow (CSS only, image untouched) */}
              <div className="absolute inset-0 bg-primary-300/30 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,15,16,0.55)_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-secondary-500/15 mix-blend-soft-light pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-100/85 via-primary-100/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

              {/* Pixel-game dialog with random facts from projects & timeline */}
              <div className="absolute inset-x-5 bottom-7 sm:inset-x-6 z-10">
                <PixelDialog />
              </div>
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