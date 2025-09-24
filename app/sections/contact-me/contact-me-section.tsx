'use client';
import Image from "next/image";
import BImage3 from '/public/image3.png';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/section-container";
import ContactForm from "./contact-form";
import TextColor from "@/components/text-color";

const internSans = Inter({
  variable: "--font-intern-sans",
  subsets: ["latin"],
});

export default function ContactMeSection() {

  return (
    <SectionContainer id="section-contact" className="px-2 mt-15 h-auto mb-10 xl:!px-25">
      <div className="relative flex flex-col">

        <div className={cn(internSans.className, "font-black antialiased h-auto flex flex-col justify-center items-center text-center")}>
          <h3 className="text-[17px] xl:text-[32px] italic">
            Let's turn your ideas into <TextColor className="xl:bg-transparent xl:text-primary-100">something amazing</TextColor> - <TextColor className="xl:bg-transparent xl:text-primary-100">ready when you are!</TextColor>
          </h3>
        </div>

        <div className="flex relative xl:container">
          <Image 
            src={BImage3}
            alt="Image 2"
            className="w-auto h-auto absolute -z-10 -top-22 -right-0 xl:!relative xl:!z-0 xl:!top-0 xl:!right-0"
            priority
            style={{ objectFit: 'cover' }}
          />

          <div className="w-full mt-8 xl:!w-1/2">
            <ContactForm id="section-contact-form"/>
          </div>

        </div>

      </div>
    </SectionContainer>
  );
}