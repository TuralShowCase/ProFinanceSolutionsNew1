"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useContactModal } from "../../contexts/ContactModalContext";
import { HeroContent } from "./HeroContent";
import { HeroPagination } from "./HeroPagination";
import { SLIDES, SLIDE_SECONDS } from "./heroStyle";

const TOTAL_SLIDES = SLIDES.length;
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HeroSection() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const barRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const isAnimRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);

  const t        = useTranslations("hero");
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isStacked = isMobile || isTablet;
  const { openContact } = useContactModal();

  // Page-load reveal
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-photo", { opacity: 0, duration: 1.2, ease: "power2.out" });
      gsap.from(".hero-reveal", { y: 26, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.09, delay: 0.25 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const goToSlide = useCallback((next: number) => {
    if (isAnimRef.current || next === activeSlide) return;
    if (prefersReduced()) { setActiveSlide(next); return; }
    isAnimRef.current = true;
    gsap.timeline({ onComplete: () => { isAnimRef.current = false; } })
      .to(textRef.current, { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" })
      .call(() => setActiveSlide(next))
      .set(textRef.current, { y: 12 })
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, [activeSlide]);

  // Single timing source: the progress-bar tween itself advances the carousel.
  // Bar and slide change share one clock, so they can never drift apart.
  useEffect(() => {
    const next = (activeSlide + 1) % TOTAL_SLIDES;
    barRefs.current.forEach((b) => { if (b) gsap.set(b, { scaleX: 0 }); });
    const bar = barRefs.current[activeSlide];

    /**
     * Reduced motion stops the carousel outright — it does not just skip the
     * transition. Previously this branch still ran a delayedCall, so the slide
     * (and the <h1> with it) kept swapping every 8s for exactly the users who
     * asked for less movement.
     *
     * The pagination buttons remain, so those users can still reach slide 2
     * deliberately. A visible pause control for everyone else is still owed
     * here — WCAG 2.2.2 wants one for any auto-advancing content.
     */
    if (prefersReduced()) {
      if (bar) gsap.set(bar, { scaleX: 1 });
      return;
    }

    if (!bar) {
      const call = gsap.delayedCall(SLIDE_SECONDS, () => goToSlide(next));
      return () => { call.kill(); };
    }

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: SLIDE_SECONDS, ease: "none", transformOrigin: "left center", onComplete: () => goToSlide(next) }
    );
    return () => { tween.kill(); };
  }, [activeSlide, goToSlide]);

  const setBarRef = useCallback((i: number, el: HTMLSpanElement | null) => {
    barRefs.current[i] = el;
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 620,
        overflow: "hidden",
        backgroundColor: "#0A140E",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Full-screen photographs (crossfade, no zoom — image stays uncropped) */}
      <div className="hero-photo" style={{ position: "absolute", inset: 0 }}>
        {SLIDES.map((slide, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === activeSlide ? 1 : 0, transition: "opacity 900ms ease" }}>
            <img
              src={slide.img}
              alt=""
              aria-hidden="true"
              fetchPriority={i === 0 ? "high" : undefined}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: slide.objectPosition, display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Directional scrim — dark on the text side, clear over the people */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(95deg, rgba(6,16,10,0.88) 0%, rgba(6,16,10,0.66) 32%, rgba(6,16,10,0.34) 58%, rgba(6,16,10,0.10) 82%, rgba(6,16,10,0.04) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,16,10,0) 70%, rgba(6,16,10,0.42) 100%)" }} />

      {/* Left-anchored content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          paddingLeft: isStacked ? 20 : 40,
          paddingRight: isStacked ? 20 : 40,
          paddingTop: 72,
          paddingBottom: isStacked ? 28 : 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        {/* Slide-specific: services heading + note */}
        <div ref={textRef}>
          <HeroContent activeSlide={activeSlide} />
        </div>

        {/* Single CTA — GSAP animates the wrapper, not the button, so the
            button's transform transition (hover lift) never fights the entrance tween */}
        <div className="hero-reveal" style={{ marginTop: isStacked ? 26 : 36, width: isMobile ? "100%" : undefined }}>
          <button
            onClick={openContact}
            style={{
              fontWeight: 500,
              fontSize: 18,
              color: "#FFFFFF",
              backgroundColor: "var(--brand-solid)",
              padding: isStacked ? "13px 26px" : "14px 30px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              width: isMobile ? "100%" : undefined,
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              boxShadow: "0 4px 20px color-mix(in srgb, var(--brand) 32%, transparent)",
              transition: "background-color 300ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => { const b = e.currentTarget; b.style.backgroundColor = "var(--brand-hover)"; b.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { const b = e.currentTarget; b.style.backgroundColor = "var(--brand-solid)"; b.style.transform = "translateY(0)"; }}
          >
            {t("ctaContact")}
          </button>
        </div>

        {/* Pagination — aligned with the text block */}
        <div className="hero-reveal" style={{ marginTop: isStacked ? 30 : 42, width: isMobile ? "70%" : 300 }}>
          <HeroPagination activeSlide={activeSlide} goToSlide={goToSlide} setBarRef={setBarRef} />
        </div>
      </div>
    </section>
  );
}
