'use client';
import Image from "next/image";
import BackgroundImage from '/public/image1.png';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Divider from "@/components/divider";
import GridPattern from "@/components/grid-pattern";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function AboutSection() {

  return (
    <section id="about" className="flex flex-col">
      <div className="w-full px-40 relative items-start flex flex-col pt-18 gap-10 h-[52rem]">
      {/* <GridPattern/> */}

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
            <Button>
              DOWNLOAD CV
            </Button>
          </div>
        </div>
      
        <Image 
          src={BackgroundImage}
          alt="Image 1"
          className="absolute w-1/2 -top-10 right-0"
        />
        
      </div>
        <Divider />
      </section>
  );
}