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

 
 
  useEffect(() => {
    const next = (activeSlide + 1) % TOTAL_SLIDES;
    barRefs.current.forEach((b) => { if (b) gsap.set(b, { scaleX: 0 }); });
    const bar = barRefs.current[activeSlide];

    
    if (prefersReduced()) {
      if (bar) gsap.set(bar, { scaleX: 1 });
      timerRef.current = null;
      return;
    }

   
   
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
      {}
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
             
             
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: slide.objectPosition, display: "block" }}
            />
          </div>
        ))}
      </div>

      {}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(95deg, rgba(6,16,10,0.88) 0%, rgba(6,16,10,0.66) 32%, rgba(6,16,10,0.34) 58%, rgba(6,16,10,0.10) 82%, rgba(6,16,10,0.04) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(180deg, rgba(6,16,10,0) 70%, rgba(6,16,10,0.42) 100%)" }} />

      {}
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
        {}
        <div ref={textRef}>
          <HeroContent activeSlide={activeSlide} />
        </div>

        {}
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

        {}
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
