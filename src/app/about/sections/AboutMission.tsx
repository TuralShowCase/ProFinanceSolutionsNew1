"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { DARK, ACCENT, INVERT } from "@/app/lib/brand";

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
      gsap.fromTo(".msn-card",  { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: ".msn-card", start: "top 82%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const sectionPad = isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px";

  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ backgroundColor: "var(--surface)", padding: sectionPad, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="msn-anim" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span> {t("headingSuffix")}
            </h2>
          </div>
          <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: 36 }} />
          <div className="msn-anim" style={{ marginBottom: 32 }}>
            <p className="about-mission-text" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "var(--text)", lineHeight: 1.6, margin: "0 0 16px", letterSpacing: "-0.015em" }}>{t("leadParagraph")}</p>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.82, margin: "0 0 12px" }}>{t("paragraph1")}</p>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.82, margin: 0 }}>{t("paragraph2")}</p>
          </div>
          <div className="msn-card" style={{ backgroundColor: INVERT, borderRadius: 16, padding: "28px 24px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("missionLabel")}</p>
            <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.72, margin: "0 0 20px", fontStyle: "italic", letterSpacing: "-0.01em" }}>{t("missionQuote")}</p>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>{t("missionSub")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ backgroundColor: "var(--surface)", padding: sectionPad, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="msn-anim" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginBottom: 52, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isTablet ? 36 : "clamp(34px, 3.8vw, 52px)", color: "var(--text)", margin: 0, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span> {t("headingSuffix")}
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-faint)", lineHeight: 1.72, margin: 0, maxWidth: 320 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: 52 }} />

        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr 320px" : "1fr 360px", gap: isTablet ? 40 : 64, alignItems: "stretch" }}>
          <div className="msn-anim" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: isTablet ? 16 : 18, color: "var(--text)", lineHeight: 1.62, margin: 0, letterSpacing: "-0.015em" }}>{t("leadParagraph")}</p>
            <p style={{ fontSize: isTablet ? 14 : 15, color: "var(--text-muted)", lineHeight: 1.84, margin: 0 }}>{t("paragraph1")}</p>
            <p style={{ fontSize: isTablet ? 14 : 15, color: "var(--text-muted)", lineHeight: 1.84, margin: 0 }}>{t("paragraph2")}</p>
          </div>

          <div className="msn-card" style={{ backgroundColor: INVERT, borderRadius: 20, padding: isTablet ? "36px 28px" : "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 40, right: 40, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.6 }} />
            <span style={{ position: "absolute", bottom: -16, right: 24, fontFamily: "Georgia, serif", fontSize: 140, color: "color-mix(in srgb, var(--accent-green) 8%, transparent)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>"</span>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 20px" }}>{t("missionLabel")}</p>
              <p style={{ fontSize: isTablet ? 16 : 18, color: "#ffffff", lineHeight: 1.72, margin: "0 0 28px", fontStyle: "italic", letterSpacing: "-0.01em", position: "relative", zIndex: 1 }}>{t("missionQuote")}</p>
            </div>
            <div>
              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 20 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.78, margin: 0 }}>{t("missionSub")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
