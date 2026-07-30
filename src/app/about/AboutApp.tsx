"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../lib/smoothScroll";
import { Header } from "../components/Header";
import { ContactModalProvider } from "../contexts/ContactModalContext";
import { Footer } from "../components/Footer";
import { AboutHero } from "./sections/AboutHero";
import { AboutMission } from "./sections/AboutMission";
import { WhyUsSection } from "../components/WhyUsSection";
import { AboutValues } from "./sections/AboutValues";
import { AboutTeam } from "./sections/AboutTeam";
import { AboutCTA } from "./sections/AboutCTA";

gsap.registerPlugin(ScrollTrigger);

export default function AboutApp() {
  useSmoothScroll();

  return (
    <ContactModalProvider>
    <div style={{ backgroundColor: "var(--page-bg)", overflowX: "clip" }}>
      <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", backgroundColor: "var(--surface)" }}>
        <Header />
        {/* Haqqımızda → Missiya → Niyə bizi seçirlər → Komandamız → Dəyərlərimiz.
            Backgrounds alternate across that order: white hero/mission, cream
            WhyUs, white team, cream values. */}
        <AboutHero />
        <AboutMission />
        <WhyUsSection />
        <AboutTeam />
        <AboutValues />
        <AboutCTA />
      </div>
      <Footer />
    </div>
    </ContactModalProvider>
  );
}
