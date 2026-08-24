"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "./lib/smoothScroll";
import { Header } from "./components/Header";
import { HeroSection } from "./components/hero/HeroSection";
import { WhoWeAreSection } from "./components/WhoWeAreSection";
import { ServicesSection } from "./components/ServicesSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { PartnerSection } from "./components/PartnerSection";
import { ClientsSection } from "./components/ClientsSection";
import { Footer } from "./components/Footer";
import { ContactModalProvider } from "./contexts/ContactModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useSmoothScroll();

  return (
    <ContactModalProvider>
      <div style={{ backgroundColor: "var(--page-bg)", overflowX: "clip" }}>
        <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
          <Header />
          <HeroSection />
          <WhoWeAreSection />
          <ServicesSection />
          <IndustriesSection />
          <WhyUsSection />
          <PartnerSection />
          <ClientsSection />
        </div>
        <Footer />
      </div>
    </ContactModalProvider>
  );
}
