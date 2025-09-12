'use client';
import Image from "next/image";
import BImage3 from '/public/image3.png';
import Button from "@/components/button";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Divider from "@/components/marquee-section";
import GridPattern from "@/components/grid-pattern";
import SectionContainer from "@/components/section-container";
import SnapSection from "@/components/snap-section";
import ContactForm from "./contact-form";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function ContactMeSection() {

  return (
    <SectionContainer id="section-contact"  className="items-center justify-center">
      <div className="w-full relative flex flex-col container" id="section-contact">
        <div className={cn(internSans.className, "font-black antialiased h-auto flex flex-col justify-center items-center px-72 text-center")}>
          <h3 className="text-[40px] italic">
            Let’s turn your ideas into something amazing ready when you are!
          </h3>
        </div>

        <div className="flex">
          <Image 
            src={BImage3}
            alt="Image 2"
            className="w-auto h-auto"
            priority
            style={{ objectFit: 'cover' }}
          />

          <div className="flex gap-2 w-full">
            <ContactForm id="section-contact-form"/>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}