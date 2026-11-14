'use client';

import { Inter } from "next/font/google";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import ProfilePortrait from "@/components/profile-portrait";
import LatestPosts from "@/components/latest-posts";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";
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

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-y-12 lg:gap-x-16 lg:gap-y-10">

        {/* Left: identity + intro + actions */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8 lg:col-start-1 lg:row-start-1 lg:self-end">
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

          <div className="grid grid-cols-2 sm:flex gap-3 w-full max-w-sm sm:max-w-none sm:w-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            {/* Primary action */}
            <button
              type="button"
              onClick={handleHireMeClick}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary-100 text-secondary-500 text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary-100/20 transition-all duration-300 hover:bg-secondary-500 hover:text-primary-100 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-500/40"
            >
              Hire me
            </button>
            {/* Secondary action */}
            <button
              type="button"
              onClick={handleViewResume}
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl border-2 border-primary-100/80 text-primary-100 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-primary-100 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-500/40"
            >
              View resume
            </button>
          </div>
        </div>

        {/* Right: portrait + pixel dialog */}
        <ProfilePortrait className="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200" />

        {/* Latest dev-timeline posts: under the CTAs on desktop, after the portrait on mobile */}
        <LatestPosts className="mx-auto max-w-xl lg:mx-0 lg:col-start-1 lg:row-start-2 lg:self-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700" />
      </div>

      <MarqueeSection data={marqueeData} className="absolute bottom-0 w-full bg-primary-100/90 backdrop-blur-sm text-secondary-50 border-t border-white/10 shadow-2xl py-3"/>
    </SectionContainer>
  );
}
