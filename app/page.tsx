'use client';
import AboutSection from "./sections/about/about-section";
import HeroSection from "./sections/hero-section";
import ContactMeSection from "./sections/contact-me/contact-me-section";
import SectionMainContainer from "@/components/section-main-container";
import Footer from "@/ui/footer";
import IdeaSection from "./sections/ideas/idea-section";

export default function HomePage() {

  return (
    <div>
      <SectionMainContainer>
        <HeroSection/>
        <AboutSection/>
        <IdeaSection/>
        <ContactMeSection/>
        <Footer/>
      </SectionMainContainer>
    </div>
  );
}
