"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DARK } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export function PillarsSection() {
  const t       = useTranslations("pillars");
  const bp      = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  const pillars = [
    { title: t("items.0.title"), description: t("items.0.description") },
    { title: t("items.1.title"), description: t("items.1.description") },
    { title: t("items.2.title"), description: t("items.2.description") },
    { title: t("items.3.title"), description: t("items.3.description") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".plr-top-anim",   { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".plr-row-anim",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", stagger: 0.13, scrollTrigger: { trigger: ".plr-rows", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "64px 20px 40px" : isTablet ? "80px 24px 56px" : "120px 40px 72px";

  return (
    <section ref={sectionRef} id="about" style={{ backgroundColor: "var(--surface)", padding: sectionPadding, fontFamily: "var(--font-inter), 'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="plr-top-anim" style={{ opacity: 0, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 16 : 40, marginBottom: 0, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px 0" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3.8vw, 50px)", color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: "var(--border)", margin: "52px 0 0" }} />

        <div className="plr-rows">
          {pillars.map((p, i) => (
            <PillarRow key={i} number={`0${i + 1}`} {...p} isLast={i === pillars.length - 1} isMobile={isMobile} isTablet={isTablet} />
          ))}
        </div>
      </div>

    </section>
  );
}

function PillarRow({ number, title, description, isLast, isMobile, isTablet }: {
  number: string; title: string; description: string;
  isLast: boolean; isMobile: boolean; isTablet: boolean;
}) {
  if (isMobile) {
    return (
      <div className="plr-row-anim" style={{ opacity: 0, padding: "28px 0", borderBottom: isLast ? "none" : "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: "var(--text-faint)", letterSpacing: "0.06em", flexShrink: 0 }}>{number}</span>
          <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 6vw, 28px)", color: "var(--text)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{title}</h3>
        </div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{description}</p>
      </div>
    );
  }

  return (
    <PillarRowDesktop number={number} title={title} description={description} isLast={isLast} isTablet={isTablet} />
  );
}

function PillarRowDesktop({ number, title, description, isLast, isTablet }: {
  number: string; title: string; description: string;
  isLast: boolean; isTablet: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="plr-row-anim" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0, display: "grid", gridTemplateColumns: isTablet ? "60px 1fr 1fr" : "80px 1fr 1fr", alignItems: "center", gap: isTablet ? 20 : 32, padding: isTablet ? "36px 16px" : "44px 24px", borderBottom: isLast ? "none" : "1px solid var(--border)", backgroundColor: hovered ? "var(--page-bg-alt)" : "transparent", borderRadius: hovered ? 12 : 0, transition: "background-color 400ms ease, border-radius 400ms ease", cursor: "default", position: "relative" }}
    >
      <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: hovered ? DARK : "var(--text-faint)", letterSpacing: "0.06em", transition: "color 380ms ease" }}>{number}</span>
      <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 2.4vw, 32px)", color: "var(--text)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{description}</p>
    </div>
  );
}
