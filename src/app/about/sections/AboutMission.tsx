"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { DARK, ACCENT, INVERT } from "@/app/lib/brand";
import { FS_LABEL } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);


export function AboutMission() {
  const t      = useTranslations("about.mission");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".msn-anim",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
      gsap.fromTo(".msn-card",  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: ".msn-card", start: "top 85%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const sectionPad = isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px";

  return (
    <section ref={sectionRef} style={{ backgroundColor: "var(--surface)", padding: sectionPad, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="msn-anim" style={{ marginBottom: isMobile ? 32 : 40 }}>
          <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>{t("sectionLabel")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: isMobile ? 36 : 52 }} />

        {/* Full-width about-us text — no sidebar squeezing it down anymore */}
        <div className="msn-anim" style={{ marginBottom: isMobile ? 40 : 48 }}>
          <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--text)", lineHeight: 1.6, margin: "0 0 16px", letterSpacing: "-0.015em" }}>{t("leadParagraph")}</p>
          <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.82, margin: "0 0 12px" }}>{t("paragraph1")}</p>
          <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.82, margin: 0 }}>{t("paragraph2")}</p>
        </div>

        {/* Mission — moved under the about-us text instead of a sidebar card */}
        <div className="msn-card" style={{ backgroundColor: INVERT, borderRadius: isMobile ? 16 : 20, padding: isMobile ? "28px 24px" : isTablet ? "36px 40px" : "44px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 40, right: 40, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.6 }} />
          <span style={{ position: "absolute", bottom: -16, right: 24, fontFamily: "Georgia, serif", fontSize: isMobile ? 100 : 140, color: "color-mix(in srgb, var(--accent-green) 8%, transparent)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>&rdquo;</span>
          <p style={{ fontSize: 16, fontWeight: 700, color: ACCENT, letterSpacing: isMobile ? "0.2em" : "0.22em", textTransform: "uppercase", margin: isMobile ? "0 0 16px" : "0 0 20px" }}>{t("missionLabel")}</p>
          <p style={{ fontSize: 20, color: "#ffffff", lineHeight: 1.72, margin: isMobile ? "0 0 20px" : "0 0 28px", fontStyle: "italic", letterSpacing: "-0.01em", position: "relative", zIndex: 1, maxWidth: 720 }}>{t("missionQuote")}</p>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: isMobile ? 16 : 20 }} />
          <p style={{ fontSize: 18, color: "var(--invert-text-muted)", lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{t("missionSub")}</p>
        </div>
      </div>
    </section>
  );
}
