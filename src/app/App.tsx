"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PillarsSection } from "./components/PillarsSection";
import { ServicesSection } from "./components/ServicesSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { PartnerSection } from "./components/PartnerSection";
import { ClientsSection } from "./components/ClientsSection";
import { Footer } from "./components/Footer";
import { ContactModalProvider } from "./contexts/ContactModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: isMobile ? 0.15 : 0.065,
      wheelMultiplier: isMobile ? 1 : 0.85,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <ContactModalProvider>
      <div style={{ backgroundColor: "var(--page-bg)", overflowX: "clip" }}>
        <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
          <Header />
          <HeroSection />
          <PillarsSection />
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
