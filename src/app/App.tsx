"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PillarsSection } from "./components/PillarsSection";
import { ServicesSection } from "./components/ServicesSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { PartnerSection } from "./components/PartnerSection";
import { ClientsSection } from "./components/ClientsSection";
import { HomeFAQSection } from "./components/HomeFAQSection";
import { Footer } from "./components/Footer";
import { ContactModalProvider } from "./contexts/ContactModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: isMobile ? 0.15 : 0.08,
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
    {/* Outer wrapper uses footer's bg so it "shows through" as content scrolls away */}
    <div style={{ backgroundColor: "#0F1117", overflowX: "clip" }}>
      {/* Content sits above the footer background */}
      <div style={{ position: "relative", zIndex: 1, fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <HeroSection />
        <PillarsSection />
        <ServicesSection />
        <WhyUsSection />
        <PartnerSection />
        <ClientsSection />
        <HomeFAQSection />
      </div>
      {/* Footer — revealed as content scrolls away */}
      <Footer />
    </div>
    </ContactModalProvider>
  );
}
