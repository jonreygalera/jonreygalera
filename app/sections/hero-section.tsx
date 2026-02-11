'use client';

import Image from "next/image";
import BackgroundImage from '/public/image1.webp';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";

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
    <SectionContainer id={'section-hero'} className="relative overflow-hidden flex flex-col justify-center items-center py-20 md:py-0">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute right-0 bottom-0 w-full h-full md:w-1/2 md:h-full opacity-20 md:opacity-100 md:grayscale-0 md:blur-0 grayscale-[50%] blur-[2px]">
            <Image 
              src={BackgroundImage}
              alt="Background"
              fill
              className="object-cover object-bottom"
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-secondary-50 via-transparent to-transparent md:hidden" />
             <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 via-transparent to-transparent md:hidden" />
         </div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center md:items-start md:pl-20 2xl:pl-40 gap-8">
        
        <div className={cn(internSans.className, "flex flex-col items-center md:items-start")}>
           <h1 className="text-[120px] leading-none md:text-[200px] font-black italic text-primary-100  tracking-tighter  select-none">
            {PROFILE.firstName}
           </h1>
           <h1 className="text-[50px] leading-tight md:text-6xl italic text-primary-100 -mt-4 md:-mt-10 tracking-widest select-none">
            {PROFILE.lastName}
           </h1>
        </div>

        <div className="max-w-2xl text-center md:text-left">
           <p className="text-xl md:text-2xl text-primary-500 font-light leading-relaxed">
             I bring together <span className="font-semibold text-secondary-600">creativity</span>, <span className="font-semibold text-secondary-600">logic</span>, and <span className="font-semibold text-secondary-600">empathy</span> to build beautiful products.
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full md:w-auto">
             <Button onClick={handleHireMeClick} >
               HIRE ME
             </Button>
             <Button onClick={handleViewResume} >
               VIEW RESUME
             </Button>
        </div>

      </div>

      <MarqueeSection data={marqueeData} className="absolute bottom-0 w-full bg-primary-100/90 backdrop-blur-sm text-secondary-50 border-t border-white/10 shadow-2xl"/>
    </SectionContainer>
  );
}