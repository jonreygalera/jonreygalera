'use client';
import Image from "next/image";
import ThumbnailImage from '/public/image3.webp';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import CardImage from "@/components/card-image";
import { PROFILE } from "@/data/profile";
import React, { useState } from "react";
import Link from "next/link";
import { SOCIAL_ACCOUNTS } from "@/data/social-account";
import { useRouter } from "next/navigation";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all" 
      onClick={onClose}
    >
      <div 
        className={cn(
          "bg-white dark:bg-neutral-900 p-8 rounded-[2rem] shadow-2xl max-w-md w-full mx-4 relative border border-neutral-200 dark:border-neutral-800",
          internSans.className
        )} 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 tracking-tight">
          {title}
        </h2>
        <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {children}
        </div>
        <button 
          className="mt-8 w-full py-3.5 px-4 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-[0.98]" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function IdeaSection() {
  const router = useRouter();
  const [isUnderConstructionOpen, setIsUnderConstructionOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const handleVisitProjects = () => router.push('/projects');
  const handleOnClickAIAgenProject = () => window.open(PROFILE.ideas?.link2, '_blank');
  const handleOnClickHobbiesAndProjects = () => setIsSocialOpen(true);

  return (
    <SectionContainer id="section-ideas" className="md:items-center md:justify-center px-4 sm:px-6 h-auto py-20 sm:py-32 bg-secondary-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative container mx-auto flex flex-col z-10 w-full">
        <div className={cn(internSans.className, "font-black antialiased mb-16 sm:mb-24 text-center md:text-left relative")}>
          <h2 className="text-[15vw] sm:text-[80px] md:text-[100px] italic leading-[0.8] text-primary-100/10 absolute -top-10 -left-4 select-none pointer-events-none">
            IDEAS
          </h2>
          <h3 className="text-4xl sm:text-6xl font-bold text-primary-100 flex items-center justify-center md:justify-start gap-4 relative z-10">
            Creative <span className="text-secondary-500 italic">Labs</span>
          </h3>
          <div className="h-1.5 w-20 bg-secondary-500 mt-6 rounded-full mx-auto md:mx-0 shadow-[0_0_20px_rgba(151,199,56,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <CardImage
            onClick={handleVisitProjects} 
            imageSrc={ThumbnailImage}
            imageAlt="Project"
            title="Advanced Portfolio"
            description="A comprehensive web application with experimental features for modern development workflows, showcasing real-time data and premium animations."
            linkHref="/projects"
            linkText="EXPLORE PROJECT"
          />

          <CardImage
            onClick={handleOnClickAIAgenProject} 
            imageSrc={ThumbnailImage}
            imageAlt="AI Agent"
            title="Mrey AI Agent"
            description="An intelligent AI agent ecosystem that orchestrates complex tasks, automates workflows via n8n, and provides personalized assistance."
            linkHref=""
            linkText="VIEW AI AGENT"
          />

          <CardImage
            onClick={handleOnClickHobbiesAndProjects} 
            imageSrc={ThumbnailImage}
            imageAlt="Explorations"
            title="Creative Labs"
            description="A deep dive into my personal experiments—from creative coding labs to photography and outdoor adventures that fuel my creativity."
            linkHref=""
            linkText="SEE EXPLORATIONS"
          />
        </div>
        
        <Modal 
          isOpen={isUnderConstructionOpen} 
          onClose={() => setIsUnderConstructionOpen(false)} 
          title=""
        >
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="bg-amber-50 p-4 rounded-full mb-6 text-amber-600">
              <svg 
                className="w-12 h-12" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3 italic">
              Under Construction
            </h3>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              I'm currently refining this project to ensure the best experience. 
              Please check back soon for the full reveal!
            </p>
            <button 
              onClick={() => setIsUnderConstructionOpen(false)}
              className="mt-8 px-8 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </Modal>


        <Modal isOpen={isSocialOpen} onClose={() => setIsSocialOpen(false)} title="">
          <div className="grid gap-3 mt-2">
            {SOCIAL_ACCOUNTS.filter((social) => social.platform.toLowerCase() !== "linkedin").map((social) => (
              <Link 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 group"
                aria-label={social.platform}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 shadow-sm group-hover:scale-110 transition-transform">
                  {React.createElement(social.icon, { size: 22, className: "text-neutral-700 dark:text-neutral-300" })}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">{social.platform}</span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{social.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </Modal>

      </div>
    </SectionContainer>
  );


}