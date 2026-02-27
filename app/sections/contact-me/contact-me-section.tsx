'use client';
import Image from "next/image";
import BImage3 from '/public/image3.webp';
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
    <SectionContainer id="section-contact" className="px-4 sm:px-6 py-24 sm:py-32 h-auto relative bg-primary-100 overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto flex flex-col items-center">
        <div className={cn(internSans.className, "font-black antialiased mb-16 text-center max-w-4xl")}>
          <h2 className="text-sm uppercase tracking-[0.3em] text-secondary-500 font-bold mb-6">Collaboration</h2>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white italic leading-[1.1]">
            Let&apos;s turn your ideas into <span className="text-secondary-500">something amazing</span> - ready when you are!
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="relative group order-2 lg:order-1">
             <div className="absolute -inset-4 bg-secondary-500/10 rounded-[3rem] blur-2xl group-hover:bg-secondary-500/20 transition-all duration-700" />
             <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-square sm:aspect-video lg:aspect-square shadow-2xl">
                <Image 
                  src={BImage3}
                  alt="Contact"
                  fill
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-100/90 via-primary-100/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
                   <p className="text-white font-bold text-xl italic mb-2">&ldquo;Let&apos;s build the future together.&rdquo;</p>
                   <p className="text-secondary-500 text-sm font-bold tracking-widest uppercase">Jon Rey Galera</p>
                </div>
             </div>
          </div>

          <div className="w-full order-1 lg:order-2">
            <div className="bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <ContactForm id="section-contact-form"/>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}