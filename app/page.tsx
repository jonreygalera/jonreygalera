'use client';
import AboutSection from "./sections/about/about-section";
import HeroSection from "./sections/hero-section";
import ContactMeSection from "./sections/contact-me/contact-me-section";
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";

export default function HomePage() {

  return (
    <div>
      <SectionMainContainer>
        <HeroSection/>
        <AboutSection/>
        <ContactMeSection/>
        <Footer/>
      </SectionMainContainer>
    </div>
  );
}
