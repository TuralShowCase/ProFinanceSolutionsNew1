"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useContactModal } from "../../contexts/ContactModalContext";
import { HeroContent } from "./HeroContent";
import { HeroPagination } from "./HeroPagination";
import { SLIDES, SLIDE_SECONDS, HERO_SIZES } from "./heroStyle";

const TOTAL_SLIDES = SLIDES.length;
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Layout is entirely CSS (see `HeroSection` in app/responsive.css).
 *
 * This is the first thing on the page and the LCP element sits inside it, so it
 * is the worst possible place to compute layout in JS: `useBreakpoint()` reports
 * desktop during SSR, so phones used to receive desktop padding and a
 * desktop-width CTA and only correct after hydration.
 */
export function HeroSection() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const barRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const isAnimRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const t        = useTranslations("hero");
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
     * asked for less movement. The pagination buttons remain, so those users
     * can still reach slide 2 deliberately.
     */
    if (prefersReduced()) {
      if (bar) gsap.set(bar, { scaleX: 1 });
      timerRef.current = null;
      return;
    }

    // Explicitly paused (WCAG 2.2.2 control): hold the current slide and leave
    // the progress bar where it is, rather than resetting it.
    if (paused) {
      timerRef.current = null;
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
    timerRef.current = tween;
    return () => { tween.kill(); timerRef.current = null; };
  }, [activeSlide, goToSlide, paused]);

  // Pausing mid-slide should freeze the bar where it stands, not rewind it —
  // so the toggle pauses the live tween instead of tearing it down.
  const togglePause = useCallback(() => {
    setPaused((wasPaused) => {
      const next = !wasPaused;
      if (next) timerRef.current?.pause();
      return next;
    });
  }, []);

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
              srcSet={slide.srcSet}
              sizes={HERO_SIZES}
              width={1672}
              height={941}
              alt=""
              aria-hidden="true"
              fetchPriority={i === 0 ? "high" : undefined}
              // Slide 2 is offscreen until the first advance — no reason for it
              // to compete with the LCP image for bandwidth.
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
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
        className="hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          maxWidth: 1280,
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
        <div className="hero-reveal hero-cta-wrap">
          <button
            onClick={openContact}
            className="hero-cta"
            style={{
              fontWeight: 500,
              fontSize: 18,
              color: "#FFFFFF",
              backgroundColor: "var(--brand-solid)",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
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
        <div className="hero-reveal hero-pager-wrap">
          <HeroPagination
            activeSlide={activeSlide}
            goToSlide={goToSlide}
            setBarRef={setBarRef}
            paused={paused}
            onTogglePause={togglePause}
          />
        </div>
      </div>
    </section>
  );
}
