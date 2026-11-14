'use client';
import SectionContainer from "@/components/section-container";
import TechStack from "./tech-stack";
import LearningStack from "./learning-stack";

export default function AboutSection() {

  return (
    <SectionContainer id="section-about" className="md:items-center md:justify-center px-4 sm:px-6 h-auto py-20 sm:py-28 bg-primary-100 overflow-hidden">
      {/* Background Decor: Premium Aurora / Neural Mesh Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Aurora Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-secondary-500/10 blur-[120px] rounded-full animate-pulse duration-[10s]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-primary-600/10 blur-[120px] rounded-full animate-pulse duration-[8s] delay-1000" />

        {/* Refined Technical Grid */}
        <div
          className="absolute inset-0 [background-image:linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] [background-size:40px_40px] md:[background-size:60px_60px] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100 via-transparent to-primary-100" />
      </div>

      <div className="relative container max-w-6xl mx-auto flex flex-col z-10 w-full">

        {/* Tech Stack Integration */}
        <div className="[&>*:first-child]:mt-0">
          <TechStack />
          <LearningStack />
        </div>
      </div>
    </SectionContainer>
  );
}
