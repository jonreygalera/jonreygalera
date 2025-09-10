'use client';
import SnapSectionContainer from "@/components/snap-section-container";
import AboutSection from "./sections/about-section";
import HeroSection from "./sections/hero-section";

export default function HomePage() {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <SnapSectionContainer>
        <HeroSection/>
        <AboutSection/>
      </SnapSectionContainer>
    </div>
  );
}
