'use client';

import Button from "@/components/button";
import { Inter } from "next/font/google";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import ProfilePortrait from "@/components/profile-portrait";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";
import VisitorStats from "@/components/visitor-stats";
import { getYearsOfExperience } from "@/lib/experience";

const marqueeData = [
  "• develop",
  "• design",
  "• discover",
  "• hire me for your next project",
  "• full-stack developer",
  "• ai agent engineering",
  `• ${getYearsOfExperience()} years experience`,
  "• let's build something amazing •",
  "• available for freelance work •"
];
const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function HeroSection() {

  const handleViewResume = () => {
    if(PROFILE.resume.type == 'link') {
      const link = document.createElement('a');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.href = PROFILE.resume.url;
      link.download = `${PROFILE.firstName}_${PROFILE.lastName} - CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(PROFILE.resume.url, '_blank');
    }
  };

  const handleHireMeClick = () => {
    const contactSection = document.getElementById("section-contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionContainer id={'section-hero'} className="relative overflow-hidden justify-center pt-28 pb-28 sm:pt-32 lg:pb-32 min-h-[100svh]">

      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-1/4 left-0 sm:left-10 w-64 h-64 bg-secondary-500/15 blur-[100px] rounded-full animate-pulse" />
         <div className="absolute bottom-10 right-0 w-72 h-72 bg-secondary-300/20 blur-[120px] rounded-full" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

        {/* Left: identity + intro + actions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8">
          <h1 className={cn(internSans.className, "flex flex-col items-center lg:items-start select-none")}>
            <span className="text-[16vw] sm:text-8xl xl:text-9xl leading-[0.9] font-black italic text-primary-100 tracking-tighter animate-in fade-in slide-in-from-left-8 duration-700">
              {PROFILE.firstName}
            </span>
            <span className="text-[7vw] sm:text-4xl xl:text-5xl leading-tight italic text-secondary-700 mt-2 sm:mt-3 tracking-[0.2em] sm:tracking-[0.3em] font-bold animate-in fade-in slide-in-from-left-12 duration-1000">
              {PROFILE.lastName}
            </span>
          </h1>

          <p className="max-w-xl text-lg sm:text-xl leading-relaxed text-primary-100/70 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <span className="font-bold text-primary-100">Full-stack engineer</span> experienced in building modern web and mobile applications, now creating <span className="font-bold text-secondary-700">AI-powered products</span> built on that software engineering foundation.
          </p>

          <div className="flex justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <VisitorStats />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Button onClick={handleHireMeClick} className="w-full sm:w-[180px] justify-center">
              HIRE ME
            </Button>
            <Button onClick={handleViewResume} className="w-full sm:w-[180px] justify-center">
              VIEW RESUME
            </Button>
          </div>
        </div>

        {/* Right: portrait + pixel dialog */}
        <ProfilePortrait className="mx-auto w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200" />
      </div>

      <MarqueeSection data={marqueeData} className="absolute bottom-0 w-full bg-primary-100/90 backdrop-blur-sm text-secondary-50 border-t border-white/10 shadow-2xl py-3"/>
    </SectionContainer>
  );
}
