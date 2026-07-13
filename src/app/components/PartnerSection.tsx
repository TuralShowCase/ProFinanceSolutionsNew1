"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanSearch, Users, Layers, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { PLH_DARK, PLH_MID, PLH_ACC, CREAM } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const FEAT_ICONS = [ScanSearch, Users, Layers];

export function PartnerSection() {
  const t      = useTranslations("partner");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const humanRef   = useRef<HTMLImageElement>(null);

  const features = [0, 1, 2].map(i => ({
    Icon:  FEAT_ICONS[i],
    title: t(`features.${i}.title` as Parameters<typeof t>[0]),
    desc:  t(`features.${i}.desc`  as Parameters<typeof t>[0]),
  }));

  const tags = [t("tags.0"), t("tags.1"), t("tags.2")] as string[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".partner-hdr",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(cardRef.current, { opacity: 0, y: 28, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true } });
      if (humanRef.current) gsap.fromTo(humanRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", delay: 0.2, scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true } });
      gsap.fromTo(".partner-feat", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".partner-features", start: "top 82%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const pad = isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 40px 108px";

  return (
    <section ref={sectionRef} style={{ backgroundColor: CREAM, padding: pad, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="partner-hdr" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 16 : 40, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: PLH_ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : "clamp(30px, 3.8vw, 50px)", color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {t("heading")} <span style={{ color: PLH_DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-faint)", lineHeight: 1.7, margin: 0, maxWidth: 340 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: `${PLH_ACC}30`, marginBottom: 36 }} />

        {/* Main card */}
        <div ref={wrapRef} style={{ position: "relative", marginBottom: 14, paddingTop: !isMobile && !isTablet ? 80 : 0 }}>
          {!isMobile && !isTablet && (
            <img ref={humanRef} src="/PartnerHuman.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", bottom: 0, right: 0, height: "110%", width: "auto", maxWidth: "46%", objectFit: "contain", objectPosition: "bottom right", zIndex: 2, pointerEvents: "none", userSelect: "none", filter: "drop-shadow(-12px 0 28px rgba(9,44,58,0.38))" }} />
          )}

          <div ref={cardRef} style={{ background: `linear-gradient(145deg, ${PLH_DARK} 0%, ${PLH_MID} 100%)`, borderRadius: 24, overflow: "hidden", position: "relative", opacity: 0 }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${PLH_ACC}12 0%, transparent 65%)`, pointerEvents: "none" }} />

            <div style={{ width: isMobile ? "100%" : isTablet ? "100%" : "50%", padding: isMobile ? "40px 28px" : isTablet ? "52px 48px" : "64px 64px", position: "relative", zIndex: 1 }}>
              {(isMobile || isTablet) ? (
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 0 }}>
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 24 }}>
                    <img src="/PLHLogo.avif" alt={t("firmName")} loading="lazy" style={{ height: isMobile ? 96 : 116, width: "auto", objectFit: "contain", display: "block", marginBottom: 16 }} />
                    <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 17 : 20, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.15, display: "block", marginBottom: 10 }}>{t("firmName")}</span>
                  </div>
                  <div style={{ flexShrink: 0, position: "relative", marginRight: -4, pointerEvents: "none" }}>
                    <img ref={humanRef} src="/PartnerHuman.avif" alt="" aria-hidden="true" loading="lazy" style={{ height: isMobile ? 190 : 240, width: "auto", display: "block", filter: "drop-shadow(-6px 0 18px rgba(9,44,58,0.5))", userSelect: "none" }} />
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: 28 }}>
                  <img src="/PLHLogo.avif" alt={t("firmName")} loading="lazy" style={{ height: 130, width: "auto", objectFit: "contain", display: "block", marginBottom: 20 }} />
                  <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, display: "block" }}>{t("firmName")}</span>
                </div>
              )}

              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 24 }} />
              <p style={{ fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.52)", lineHeight: 1.82, margin: "0 0 24px", maxWidth: 420 }}>{t("description")}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {tags.map(tag => (
                  <span key={tag} style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.68)" }}>{tag}</span>
                ))}
              </div>

              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 28 }} />

              <a href="https://plh.az" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: PLH_ACC, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "gap 220ms", letterSpacing: "0.02em" }}
                onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
                onMouseLeave={e => (e.currentTarget.style.gap = "7px")}
              >{t("visitSite")} <ArrowUpRight size={14} strokeWidth={2} /></a>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="partner-features" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="partner-feat" style={{ backgroundColor: "var(--surface)", borderRadius: 16, padding: isMobile ? "24px 20px" : "28px 28px", display: "flex", flexDirection: "column", gap: 16, opacity: 0, borderTop: "3px solid transparent", transition: "box-shadow 320ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), border-top-color 280ms ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 36px color-mix(in srgb, var(--brand) 9%, transparent)"; el.style.transform = "translateY(-4px)"; el.style.borderTopColor = PLH_ACC; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; el.style.borderTopColor = "transparent"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: `${PLH_ACC}15`, border: `1.5px solid ${PLH_ACC}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color={PLH_ACC} strokeWidth={1.7} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", margin: "0 0 8px", letterSpacing: "-0.015em" }}>{title}</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
