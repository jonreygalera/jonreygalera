'use client';
import Image from "next/image";
import ThumbnailImage from '/public/image3.png';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SnapSection from "@/components/snap-section";
import SectionContainer from "@/components/section-container";
import CardImage from "@/components/card-image";
import { PROFILE } from "@/data/profile";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function IdeaSection() {

  const handleOnClickButton = () => {
    // Temporary button click handler
    alert('Button clicked');
  };
  
  const handleOnClickAIAgenProject = () => {
    window.open(PROFILE.ideas?.link2, '_blank');
  }

  const handleOnClickHobbiesAndProjects = () => {
    const element = document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <SectionContainer id="section-ideas" className="md:items-center md:justify-center px-2 h-auto">
      <div className="relative container flex flex-col">
        <div className={cn(internSans.className, "font-black antialiased")}>
          <h1 className="text-[50px] italic">
            {"Ideas"}
          </h1>
        </div>

        <div className="flex flex-col justify-around gap-2 w-full xl:!flex-row">
          <CardImage
            onClick={handleOnClickButton} 
            imageSrc={ThumbnailImage}
            imageAlt="Project"
            title="Project"
            description="A comprehensive web application with experimental features for modern development workflows"
            linkHref=""
            linkText="Visit Project"
          />

          <CardImage
            onClick={handleOnClickAIAgenProject} 
            imageSrc={ThumbnailImage}
            imageAlt="AI Agent"
            title="AI Agent"
            description="An intelligent AI agent that automates complex tasks and provides personalized assistance"
            linkHref=""
            linkText="Visit AI Agent"
          />

          <CardImage
            onClick={handleOnClickHobbiesAndProjects} 
            imageSrc={ThumbnailImage}
            imageAlt="Hobbies & Personal Projects"
            title="Hobbies & Personal Projects"
            description="Discover my hobbies and personal projects - from photography and creative coding experiments to outdoor adventures and personal development"
            linkHref=""
            linkText="Visit Hobbies & Projects"
          />
        </div>

      </div>
    </SectionContainer>
  );
}