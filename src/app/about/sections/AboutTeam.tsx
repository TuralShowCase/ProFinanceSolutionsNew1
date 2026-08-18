"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { DARK, BRAND_SOLID } from "@/app/lib/brand";
import { FS_LABEL, FS_H2, FS_H4_MOBILE, FS_H4_DESKTOP } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);


export function AboutTeam() {
  const t      = useTranslations("about.team");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef  = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const traits = [0, 1, 2].map(i => ({
    number: `0${i + 1}`,
    title: t(`traits.${i}.title` as Parameters<typeof t>[0]),
    desc:  t(`traits.${i}.desc`  as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(portraitRef.current, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
      gsap.fromTo(".team-anim",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
      gsap.fromTo(".team-trait", { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".team-traits", start: "top 84%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);


  if (isMobile) {
    return (
      <section id="team" ref={sectionRef} className="team-section" style={{ backgroundColor: "var(--surface)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="team-anim" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 32, height: 220 }}>
            <img src="/AboutPageTeamLandscape.avif" alt={t("photoAlt")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>
          <p className="team-anim" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.8, margin: "0 0 32px" }}>{t("description")}</p>
          <div className="team-traits">
            {traits.map((trait, i) => (
              <div key={i} className="team-trait" style={{ borderTop: "1px solid var(--border)", padding: "20px 0", borderBottom: i === traits.length - 1 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "36px 1fr", gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: BRAND_SOLID, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{trait.number}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H4_MOBILE, color: "var(--text)", margin: "0 0 5px", letterSpacing: "-0.02em" }}>{trait.title}</p>
                  <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.72, margin: 0 }}>{trait.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" ref={sectionRef} className="team-section" style={{ backgroundColor: "var(--surface)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="team-anim" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginBottom: 52, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.72, margin: 0, maxWidth: 300 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: 52 }} />

        <div className="team-grid" style={{ display: "grid", alignItems: "start" }}>
          <div ref={portraitRef} style={{ borderRadius: 20, overflow: "hidden", opacity: 0, boxShadow: "0 24px 64px rgba(0,0,0,0.1)", position: "relative" }}>
            <img src="/AboutPageTeamPortrait.avif" alt={t("photoAlt")} style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", aspectRatio: "3 / 4" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 8 }}>
            <div className="team-anim" style={{ marginBottom: 44 }}>
              <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--text)", lineHeight: 1.62, margin: "0 0 18px", letterSpacing: "-0.015em" }}>{t("leadParagraph")}</p>
              <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.84, margin: 0 }}>{t("bodyParagraph")}</p>
            </div>
            <div className="team-traits">
              {traits.map((trait, i) => (
                <div key={i} className="team-trait" style={{ borderTop: "1px solid var(--border)", borderBottom: i === traits.length - 1 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "40px 1fr", gap: 20, alignItems: "start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: BRAND_SOLID, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "0.04em" }}>{trait.number}</span>
                  </div>
                  <div>
                    <p className="team-trait-title" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{trait.title}</p>
                    <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{trait.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
