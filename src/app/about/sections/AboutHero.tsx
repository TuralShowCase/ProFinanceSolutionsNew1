"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

export function AboutHero() {
  const t        = useTranslations("about.hero");
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .fromTo(".abt-line", { opacity: 0, y: 26, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.12 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", paddingTop: 72, fontFamily: "var(--font-inter), 'Inter', sans-serif", overflow: "hidden" }}>
      <div style={{ position: "relative", height: isMobile ? 220 : isTablet ? 280 : 340, backgroundColor: "var(--hero-bg-sub)", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <picture style={{ position: "absolute", inset: 0, display: "block" }}>
          <source media="(max-width: 767px)" srcSet="/AboutPageBGPhone.avif" />
          <img src="/AboutPageBGDesktop.avif" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: isMobile ? "60% center" : "center 25%", display: "block", pointerEvents: "none" }} />
        </picture>
        <div className="subhero-scrim" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(244,248,245,0.78) 0%, rgba(244,248,245,0.55) 100%)", pointerEvents: "none" }} />
        <div className="subhero-fade" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px" }}>
          <h1 className="about-tagline" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(36px, 10vw, 50px)" : isTablet ? "clamp(48px, 7.5vw, 68px)" : "clamp(56px, 5.8vw, 82px)", color: "var(--text)", margin: 0, letterSpacing: "-0.044em", lineHeight: 1.0 }}>
            <span className="abt-line" style={{ display: "block" }}>{t("line1")}</span>
            <span className="abt-line" style={{ display: "block", color: "var(--brand)" }}>{t("line2")}</span>
            <span className="abt-line" style={{ display: "block" }}>{t("line3")}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
