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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.target = '__blank';
    link.href = '/files/Jon Rey Galera - CV.pdf';
    link.download = 'Jon Rey Galera - CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SnapSection id={'section-hero'}>
      <div className="w-full px-40 relative items-start flex flex-col md:mt-56 gap-10 md:h-[80dvh]">
        <div className={cn(internSans.className, "leading-48 font-black antialiased")}>
          <h1 className="text-[264px] italic">
            Jon Rey
          </h1>
          <h1 className="text-6xl italic">
            Galera
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mt-6 max-w-xl text-2xl ">
            I bring together creativity, logic, and empathy to build beautiful and functional products. The future of code is a step toward better, smarter, and more human-centric experiences.
          </p>
          <div className="mt-8 flex space-x-4">
            <Button>
              HIRE ME
            </Button>
            <Button onClick={handleDownloadCV}>
              DOWNLOAD CV
            </Button>
          </div>
        </div>

        <Image 
          src={BackgroundImage}
          alt="Image 1"
          className="absolute w-1/2 -top-56 right-0"
        />

        </div>
      <MarqueeSection data={marqueeData}/>
    </SnapSection>
  );
}