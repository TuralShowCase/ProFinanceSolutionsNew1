"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { CounterStat } from "./CounterStat";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DARK } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const PILLAR_STATS = [
  { end: 100, suffix: "%" },
  { end: 24,  suffix: "/7" },
  { end: 13,  suffix: "+" },
] as const;

const STRIP_STATS = [
  { end: 5,   suffix: "+" },
  { end: 13,  suffix: "+" },
  { end: 100, suffix: "%" },
] as const;

export function PillarsSection() {
  const t       = useTranslations("pillars");
  const bp      = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  const pillars = [
    { ...PILLAR_STATS[0], title: t("items.0.title"), description: t("items.0.description"), statLabel: t("items.0.statLabel"), tags: [t("items.0.tags.0"), t("items.0.tags.1"), t("items.0.tags.2")] },
    { ...PILLAR_STATS[1], title: t("items.1.title"), description: t("items.1.description"), statLabel: t("items.1.statLabel"), tags: [t("items.1.tags.0"), t("items.1.tags.1"), t("items.1.tags.2")] },
    { ...PILLAR_STATS[2], title: t("items.2.title"), description: t("items.2.description"), statLabel: t("items.2.statLabel"), tags: [t("items.2.tags.0"), t("items.2.tags.1"), t("items.2.tags.2")] },
  ];

  const stripStats = [
    { ...STRIP_STATS[0], label: t("stats.0.label"), sub: t("stats.0.sub") },
    { ...STRIP_STATS[1], label: t("stats.1.label"), sub: t("stats.1.sub") },
    { ...STRIP_STATS[2], label: t("stats.2.label"), sub: t("stats.2.sub") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".plr-top-anim",   { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".plr-row-anim",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", stagger: 0.13, scrollTrigger: { trigger: ".plr-rows", start: "top 80%", once: true } });
      gsap.fromTo(".plr-strip-anim", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", scrollTrigger: { trigger: ".plr-strip", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "64px 20px 0" : isTablet ? "80px 24px 0" : "120px 40px 0";
  const stripPadding   = isMobile ? "180px 20px 0" : isTablet ? "56px 24px 0" : "64px 40px 0";

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

      <div className="plr-strip" style={{ marginTop: 80 }}>
        <div className="plr-strip-anim" style={{ opacity: 0, backgroundColor: "var(--ink)", padding: stripPadding, overflow: "visible", position: "relative" }}>
          {isMobile && (
            <img src="/handshake.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", height: 260, width: "auto", mixBlendMode: "lighten", display: "block", pointerEvents: "none", zIndex: 2 }} />
          )}
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "stretch", flexDirection: isMobile ? "column" : "row", borderTop: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 0 }}>
              {stripStats.map((item, i) => (
                <div key={i} style={{ padding: isMobile ? "0 0 40px" : isTablet ? "0 24px 64px" : "0 40px 80px", borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingBottom: isMobile ? (i < 2 ? 32 : 48) : undefined, paddingTop: isMobile ? 32 : undefined, display: "flex", flexDirection: "column", gap: 6 }}>
                  <CounterStat end={item.end} suffix={item.suffix} duration={item.end >= 100 ? 1.8 : 1.2} style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 4vw, 52px)", color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1 }} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{item.sub}</span>
                </div>
              ))}
            </div>
            {!isMobile && (
              <div style={{ flexShrink: 0, width: isTablet ? 320 : 400, position: "relative", overflow: "visible", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                <img src="/handshake.avif" alt="Partnership" loading="lazy" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: isTablet ? 270 : 320, width: "auto", mixBlendMode: "lighten", opacity: 0.97, display: "block" }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarRow({ number, title, description, end, suffix, statLabel, tags, isLast, isMobile, isTablet }: {
  number: string; title: string; description: string;
  end: number; suffix: string; statLabel: string;
  tags: string[]; isLast: boolean; isMobile: boolean; isTablet: boolean;
}) {
  if (isMobile) {
    return (
      <div className="plr-row-anim" style={{ opacity: 0, padding: "28px 0", borderBottom: isLast ? "none" : "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: "var(--text-faint)", letterSpacing: "0.06em", flexShrink: 0 }}>{number}</span>
            <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 6vw, 28px)", color: "var(--text)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{title}</h3>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <CounterStat end={end} suffix={suffix} duration={end >= 100 ? 1.8 : 1.2} style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 5.5vw, 28px)", color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1, display: "block" }} />
            <div style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 500, whiteSpace: "nowrap", marginTop: 2 }}>{statLabel}</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: "0 0 14px 0" }}>{description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map(tag => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, color: "var(--text-faint)", backgroundColor: "var(--surface-2)", padding: "3px 10px", borderRadius: 999 }}>
              <CheckCircle2 size={9} strokeWidth={2.2} />{tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <PillarRowDesktop number={number} title={title} description={description} end={end} suffix={suffix} statLabel={statLabel} tags={tags} isLast={isLast} isTablet={isTablet} />
  );
}

function PillarRowDesktop({ number, title, description, end, suffix, statLabel, tags, isLast, isTablet }: {
  number: string; title: string; description: string;
  end: number; suffix: string; statLabel: string;
  tags: string[]; isLast: boolean; isTablet: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="plr-row-anim" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0, display: "grid", gridTemplateColumns: isTablet ? "60px 1fr 1fr auto" : "80px 1fr 1fr auto", alignItems: "center", gap: isTablet ? 20 : 32, padding: isTablet ? "36px 16px" : "44px 24px", borderBottom: isLast ? "none" : "1px solid var(--border)", backgroundColor: hovered ? "var(--page-bg-alt)" : "transparent", borderRadius: hovered ? 12 : 0, transition: "background-color 400ms ease, border-radius 400ms ease", cursor: "default", position: "relative" }}
    >
      <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: hovered ? DARK : "var(--text-faint)", letterSpacing: "0.06em", transition: "color 380ms ease" }}>{number}</span>
      <div>
        <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 2.4vw, 32px)", color: "var(--text)", margin: "0 0 14px 0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{title}</h3>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map(tag => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, color: hovered ? DARK : "var(--text-faint)", backgroundColor: hovered ? "color-mix(in srgb, var(--brand) 7%, transparent)" : "var(--surface-2)", padding: "3px 10px", borderRadius: 999, transition: "all 380ms ease" }}>
              <CheckCircle2 size={9} strokeWidth={2.2} />{tag}
            </span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{description}</p>
      <div style={{ textAlign: "right", flexShrink: 0, minWidth: 100 }}>
        <CounterStat end={end} suffix={suffix} duration={end >= 100 ? 1.8 : 1.2} style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", color: hovered ? DARK : "var(--text)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4, transition: "color 380ms ease", display: "block" }} />
        <div style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 500, whiteSpace: "nowrap" }}>{statLabel}</div>
      </div>
    </div>
  );
}
