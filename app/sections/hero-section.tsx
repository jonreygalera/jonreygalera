'use client';
import Image from "next/image";
import BackgroundImage from '/public/image1.png';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Divider from "@/components/marquee-section";
import GridPattern from "@/components/grid-pattern";
import SnapSectionContainer from "@/components/snap-section-container";
import SnapSection from "@/components/snap-section";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import { PROFILE } from "@/data/profile";

const marqueeData = [
  "• develop",
  "• design",
  "• discover",
  "• hire me for your next project",
  "• full-stack developer",
  "• ai agent engineering", 
  `• ${(new Date().getFullYear() - 2019)} + years experience`,
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

  return (
    <SectionContainer id={'section-hero'} className="md:items-center md:justify-center">
      <div className="w-full container relative items-start flex flex-col md:mt-56 md:gap-10 md:h-[80dvh] bg-amber-800 top-20">
        <div className={cn(internSans.className, "leading-15 md:leading-48 font-black antialiased")}>
          <h1 className="text-[100px] md:text-[264px] italic">
            {PROFILE.firstName}
          </h1>
          <h1 className="text-[50px] md:text-6xl italic">
            {PROFILE.lastName}
          </h1>
        </div>

        {/* <div className="flex flex-col gap-2">
          <p className="mt-6 max-w-xl text-2xl ">
            I bring together creativity, logic, and empathy to build beautiful and functional products. The future of code is a step toward better, smarter, and more human-centric experiences.
          </p>
          <div className="mt-8 flex space-x-4">
            <Button>
              HIRE ME
            </Button>
            <Button onClick={handleViewResume}>
              VIEW RESUME
            </Button>
          </div>
        </div> */}
      </div>
      {/* <Image 
        src={BackgroundImage}
        alt="Image 1"
        className="absolute w-1/2 right-0 3xl:top-32"
      /> */}
      {/* <MarqueeSection data={marqueeData}/> */}
    </SectionContainer>
  );
}