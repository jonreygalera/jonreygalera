'use client';

import Image from "next/image";
import BackgroundImage from '/public/image1.webp';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";
import VisitorStats from "@/components/visitor-stats";

const marqueeData = [
  "• develop",
  "• design",
  "• discover",
  "• hire me for your next project",
  "• full-stack developer",
  "• ai agent engineering", 
  `• ${(new Date().getFullYear() - 2019)} years experience`,
  "• let's build something amazing •",
  "• available for freelance work •"
];
const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function HeroSection({ id }: { id?: string}) {

  const handleViewResume = () => {
    if(PROFILE.resume.type == 'link') {
      const link = document.createElement('a');
      link.target = '__blank';
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
    <SectionContainer id={'section-hero'} className="relative overflow-hidden flex flex-col justify-center items-center py-20 md:py-0 min-h-[90vh]">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute right-0 bottom-0 w-full h-full md:w-1/2 md:h-full opacity-30 md:opacity-100 grayscale-[50%] md:grayscale-0">
            <Image 
              src={BackgroundImage}
              alt="Background"
              fill
              className="object-cover object-bottom transition-all duration-1000 scale-105"
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-secondary-50 via-secondary-50/80 to-transparent md:hidden" />
             <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 via-secondary-50/50 to-transparent md:hidden" />
         </div>
         {/* Decorative elements */}
         <div className="absolute top-1/4 left-10 w-64 h-64 bg-secondary-500/10 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center md:items-start md:pl-20 2xl:pl-40 gap-6 sm:gap-8">
        
        <div className={cn(internSans.className, "flex flex-col items-center md:items-start w-full relative mb-12")}>
           <h1 className="text-[18vw] leading-none sm:text-[120px] md:text-[180px] lg:text-[200px] font-black italic text-primary-100 tracking-tighter select-none animate-in fade-in slide-in-from-left-8 duration-700">
            {PROFILE.firstName}
           </h1>
           <h2 className="text-[8vw] leading-tight sm:text-[40px] md:text-6xl lg:text-7xl italic text-secondary-500 mt-2 sm:mt-4 md:mt-6 tracking-[0.2em] md:tracking-[0.3em] select-none font-bold animate-in fade-in slide-in-from-left-12 duration-1000">
            {PROFILE.lastName}
           </h2>
        </div>

        <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
           <p className="text-lg sm:text-xl md:text-2xl text-primary-500/80 font-light leading-relaxed">
             I bring together <span className="font-semibold text-secondary-600">creativity</span>, <span className="font-semibold text-secondary-600">logic</span>, and <span className="font-semibold text-secondary-600">empathy</span> to build beautiful products.
           </p>
           
           <div className="w-full flex justify-center md:justify-start">
             <VisitorStats />
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
             <div className="w-full sm:w-[180px]">
               <Button onClick={handleHireMeClick} className="w-full justify-center">
                 HIRE ME
               </Button>
             </div>
             <div className="w-full sm:w-[180px]">
               <Button onClick={handleViewResume} className="w-full justify-center">
                 VIEW RESUME
               </Button>
             </div>
        </div>

      </div>

      <MarqueeSection data={marqueeData} className="absolute bottom-0 w-full bg-primary-100/90 backdrop-blur-sm text-secondary-50 border-t border-white/10 shadow-2xl py-3"/>
    </SectionContainer>
  );
}
