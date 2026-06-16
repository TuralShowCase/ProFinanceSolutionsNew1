"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/Header";
import { ContactModalProvider } from "../contexts/ContactModalContext";
import { Footer } from "../components/Footer";
import { AboutHero } from "./sections/AboutHero";
import { AboutMission } from "./sections/AboutMission";
import { AboutValues } from "./sections/AboutValues";
import { AboutTeam } from "./sections/AboutTeam";
import { AboutCTA } from "./sections/AboutCTA";

gsap.registerPlugin(ScrollTrigger);

export default function AboutApp() {
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
      <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", backgroundColor: "#FFFFFF" }}>
        <Header />
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <AboutCTA />
      </div>
      <Footer />
    </div>
    </ContactModalProvider>
  );
}
