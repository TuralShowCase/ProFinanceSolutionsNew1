"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HeroSlide1 } from "./HeroSlide1";
import { HeroSlide2 } from "./HeroSlide2";

const TOTAL_SLIDES = 2;
const BG = "#F4F8F5";

export function HeroSection() {
  const heroRef           = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const isAnimRef         = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        slideContainerRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.15 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const goToSlide = useCallback((next: number) => {
    if (isAnimRef.current || next === activeSlide) return;
    isAnimRef.current = true;
    gsap.timeline({ onComplete: () => { isAnimRef.current = false; } })
      .to(slideContainerRef.current, { opacity: 0, duration: 0.55, ease: "sine.inOut" })
      .call(() => setActiveSlide(next))
      .set(slideContainerRef.current, { opacity: 0 })
      .to(slideContainerRef.current, { opacity: 1, duration: 0.85, ease: "sine.inOut", delay: 0.03 });
  }, [activeSlide]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isAnimRef.current) goToSlide((activeSlide + 1) % TOTAL_SLIDES);
    }, 7000);
    return () => clearInterval(id);
  }, [activeSlide, goToSlide]);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        height: "100vh",
        minHeight: 500,
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        paddingTop: 72,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div ref={slideContainerRef} style={{ flex: 1, display: "flex", alignItems: "stretch" }}>
        {activeSlide === 0 && <HeroSlide1 activeSlide={activeSlide} goToSlide={goToSlide} />}
        {activeSlide === 1 && <HeroSlide2 activeSlide={activeSlide} goToSlide={goToSlide} />}
      </div>
    </section>
  );
}
