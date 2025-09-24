'use client';
import Image from "next/image";
import BackgroundImage from '/public/image1.png';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import MarqueeSection from "@/components/marquee-section";
import SectionContainer from "@/components/section-container";
import { PROFILE } from "@/data/profile";
import TextColor from "@/components/text-color";

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

  const handleHireMeClick = () => {
    const contactSection = document.getElementById("section-contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionContainer id={'section-hero'} className="md:items-center md:justify-center">

      <div className="absolute bottom-20 w-full flex flex-col items-start order-2 md:!relative md:!container md:h-[80dvh] md:mt-70 md:gap-10 2xl:px-25 3xl:px-75">

        <div className={cn(internSans.className, "w-full leading-15 md:leading-32 font-black antialiased")}>
          
          <h1 className="absolute text-[79px] italic text-secondary-500 tracking-widest left-5 md:hidden">
            {PROFILE.firstName}
          </h1>

          <h1 className="text-[100px] md:text-[170px] italic">
            {PROFILE.firstName}
          </h1>

          <h1 className="text-[50px] md:text-6xl italic tracking-widest">
            {PROFILE.lastName}
          </h1>
        </div>

        <div className="flex flex-col gap-2 w-full xl:!w-auto">
          
          <div className="w-full bg-white relative px-1 xl:!w-auto xl:!bg-transparent">
            <div
              className="absolute inset-0 z-0 xl:w-[100px] xl:!hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #d1d5db 1px, transparent 1px),
                  linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                maskImage:
                  "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              }}
            />
            <p className="mt-6 sm:max-w-xl text-2xl ">
              I bring together creativity, logic, and empathy to build beautiful and functional products. The future of code is a step toward <TextColor>better</TextColor>, <TextColor>smarter</TextColor>, and <TextColor>more human-centric experiences</TextColor>.
            </p>
          </div>

          <div className="mt-8 flex space-x-4 px-2">
            <Button className="w-full xl:!w-auto" onClick={handleHireMeClick}>
              HIRE ME
            </Button>
            <Button className="w-full xl:!w-auto" onClick={handleViewResume}>
              VIEW RESUME
            </Button>
          </div>
        </div>
        
      </div>

        <div className="relative 
                        order-1 
                        -z-10 
                        h-1/2 
                        right-0
                        md:absolute
                        md:h-dvh
                        ">
          <Image 
            src={BackgroundImage}
            alt="Image 1"
            className="w-full h-full object-cover md:object-fit md:h-3"
          />
        </div>
      <MarqueeSection data={marqueeData} className="absolute bottom-0"/>
    </SectionContainer>
  );
}