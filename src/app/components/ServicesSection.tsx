"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { localizedSlug, AZ_SLUGS } from "../services/servicesData";
import { DARK, INVERT, BRAND_SOLID } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);


const ICON_MAP: Record<string, React.ElementType> = {
  "ucotun-diaqnostikasi-ve-berpasi":  ScanSearch,
  "muhasibat-konsaltinqi":             Calculator,
  "vergi-konsaltinqi":                 FileText,
  "maliyye-ve-idareetme-konsaltinqi":  BarChart3,
  "emeliyyat-ve-reqemsal-konsaltinq":  Monitor,
  "hr-ve-kadrlar-konsaltinqi":         Users,
  "telim-ve-inkisaf":                  GraduationCap,
  "auditor-xidmetleri":                ShieldCheck,
};


const FEATURED_AZ_SLUGS = ["muhasibat-konsaltinqi", "vergi-konsaltinqi"];

const SERVICE_IMAGES: Record<string, string> = {
  "ucotun-diaqnostikasi-ve-berpasi":  "/UcotunDiaqnostikasi.avif",
  "maliyye-ve-idareetme-konsaltinqi": "/MaliyyeKonsaltinqi.avif",
  "emeliyyat-ve-reqemsal-konsaltinq": "/ReqemsalKonsaltinq.avif",
  "hr-ve-kadrlar-konsaltinqi":        "/HRKonsaltinqi.avif",
  "telim-ve-inkisaf":                 "/TelimInkisaf.avif",
  "auditor-xidmetleri":               "/AuditorXidmetleri.avif",
};

const FEATURED_BULLETS: Record<string, string[][]> = {
  "muhasibat-konsaltinqi": [["services.bullets.muhasibat-konsaltinqi.0", "services.bullets.muhasibat-konsaltinqi.1", "services.bullets.muhasibat-konsaltinqi.2"]],
  "vergi-konsaltinqi":     [["services.bullets.vergi-konsaltinqi.0",     "services.bullets.vergi-konsaltinqi.1",     "services.bullets.vergi-konsaltinqi.2"]],
};

const FEATURED_BADGE_KEYS = ["services.featuredBadge1", "services.featuredBadge2"] as const;

export function ServicesSection() {
  const t       = useTranslations();
  const locale  = useLocale();
  const bp      = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const sectionRef   = useRef<HTMLDivElement>(null);
  const garageRef  = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [handleHovered, setHandleHovered] = useState(false);
  const { openContact } = useContactModal();

  const openGarage = () => {
    if (!garageRef.current) return;
    gsap.to(garageRef.current, { height: "auto", duration: 0.72, ease: "expo.out" });
    gsap.fromTo(".svc-card-hidden",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.07, delay: 0.12 }
    );
    gsap.fromTo(".svc-garage-close",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "expo.out", delay: 0.62 }
    );
    setExpanded(true);
  };

  const closeGarage = () => {
    if (!garageRef.current) return;
    gsap.to(".svc-garage-close", { opacity: 0, duration: 0.18 });
    gsap.to(".svc-card-hidden",  { opacity: 0, y: 16, duration: 0.28, stagger: 0.04 });
    gsap.to(garageRef.current,   { height: 0, duration: 0.5, ease: "power2.inOut", delay: 0.22 });
    setExpanded(false);
  };

  const servicesBasePath = locale === "az" ? "/services" : `/${locale}/services`;

  const services = AZ_SLUGS.map((azSlug, idx) => ({
    index: `0${idx + 1}`,
    azSlug,
    slug:    localizedSlug(azSlug, locale),
    name:    t(`services.names.${azSlug}` as Parameters<typeof t>[0]),
    tagline: t(`services.taglines.${azSlug}` as Parameters<typeof t>[0]),
    Icon:    ICON_MAP[azSlug],
    href:    `${servicesBasePath}/${localizedSlug(azSlug, locale)}`,
  }));

  const featuredServices  = services.filter(s => FEATURED_AZ_SLUGS.includes(s.azSlug));
  const secondaryServices = services.filter(s => !FEATURED_AZ_SLUGS.includes(s.azSlug));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-heading-anim", { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".svc-feat-anim",    { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".svc-featured", start: "top 82%", once: true } });
      gsap.fromTo(".svc-card-anim",    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ".svc-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "64px 20px" : isTablet ? "80px 24px" : "120px 40px";

  return (
    <section id="services" ref={sectionRef} style={{ backgroundColor: "var(--page-bg-alt)", padding: sectionPadding, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="svc-heading-anim" style={{ opacity: 0, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 16 : 40, marginBottom: 60, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px 0" }}>{t("services.sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3.8vw, 50px)", color: "var(--text)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {t("services.heading")}{" "}<span style={{ color: DARK }}>{t("services.headingAccent")}</span>{" "}{t("services.headingSuffix")}
            </h2>
          </div>
          <div style={{ maxWidth: 340 }}>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, margin: "0 0 22px 0" }}>{t("services.subtext")}</p>
            <button onClick={openContact} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: DARK, fontSize: 14, fontWeight: 500, background: "none", border: "none", cursor: "pointer", transition: "gap 200ms", padding: 0, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "10px")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "6px")}
            >
              {t("services.ctaLearnMore")} <ArrowUpRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: 14 }} />

        {/* Featured 2-col */}
        <div className="svc-featured" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14, alignItems: "stretch" }}>
          {featuredServices.map((svc, i) => {
            const badgeKey = FEATURED_BADGE_KEYS[i] as Parameters<typeof t>[0];
            const bulletKeys = FEATURED_BULLETS[svc.azSlug]?.[0] ?? [];
            const bullets = bulletKeys.map(k => t(k as Parameters<typeof t>[0]));
            return <FeaturedCard key={svc.azSlug} slug={svc.slug} name={svc.name} description={svc.tagline} Icon={svc.Icon} dark={i === 0} isMobile={isMobile} isTablet={isTablet} badge={t(badgeKey)} bullets={bullets} href={svc.href} ctaLabel={t("services.viewDetails")} />;
          })}
        </div>

        {/* Garage handle — static trigger, never moves */}
        <button
          onClick={expanded ? closeGarage : openGarage}
          onMouseEnter={() => setHandleHovered(true)}
          onMouseLeave={() => setHandleHovered(false)}
          style={{
            width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12,
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 0",
            marginTop: 4,
          }}
        >
          <div style={{ flex: 1, height: 1, backgroundColor: "var(--border)", transition: "background-color 280ms ease" }} />
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: expanded
              ? (handleHovered ? "var(--border-strong)" : "var(--surface-2)")
              : BRAND_SOLID,
            color: expanded
              ? (handleHovered ? DARK : "var(--text-soft)")
              : "#FFFFFF",
            fontSize: expanded ? 12 : 13.5, fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.01em",
            padding: expanded ? "6px 14px" : "11px 24px",
            borderRadius: 999,
            boxShadow: expanded
              ? "none"
              : (handleHovered
                  ? "0 12px 28px color-mix(in srgb, var(--brand) 36%, transparent)"
                  : "0 6px 18px color-mix(in srgb, var(--brand) 26%, transparent)"),
            transform: handleHovered ? "translateY(-2px)" : "translateY(0)",
            transition: "color 280ms ease, background-color 280ms ease, box-shadow 280ms ease, transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            whiteSpace: "nowrap",
          }}>
            {expanded ? t("services.showLess") : t("services.showMore", { count: secondaryServices.length })}
            <ChevronDown
              size={15}
              className={expanded || handleHovered ? undefined : "svc-more-chevron"}
              style={{
                transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: expanded ? "rotate(180deg)" : undefined,
              }}
            />
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: "var(--border-strong)" }} />
        </button>

        {/* Garage — all 6 secondary cards + close button slide as one unit */}
        <div ref={garageRef} style={{ height: 0, overflow: "hidden" }}>
          <div style={{ paddingTop: 14 }}>
            {/* 6 cards grid */}
            <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 14 }}>
              {secondaryServices.map((svc) => (
                <ServiceCard key={svc.azSlug} slug={svc.slug} name={svc.name} description={svc.tagline} Icon={svc.Icon} href={svc.href} hidden img={SERVICE_IMAGES[svc.azSlug]} imgSize={svc.azSlug === "maliyye-ve-idareetme-konsaltinqi" ? "42%" : undefined} />
              ))}
            </div>

            {/* Close button — slides with the cards */}
            <div
              className="svc-garage-close"
              style={{ display: "flex", justifyContent: "center", marginTop: 18, opacity: 0 }}
            >
              <button
                onClick={closeGarage}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  backgroundColor: "transparent",
                  border: "1.5px solid var(--border-strong)",
                  borderRadius: 999, padding: "11px 24px",
                  cursor: "pointer", color: DARK,
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 280ms ease, background-color 300ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "color-mix(in srgb, var(--brand) 5%, transparent)";
                  el.style.borderColor = DARK;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "transparent";
                  el.style.borderColor = "var(--border-strong)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {t("services.showLess")}
                <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {isMobile ? (
          <div style={{ marginTop: 20, position: "relative", zIndex: 2, paddingTop: 110 }}>
            <img src="/CtaSitting.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", top: -3, left: 12, height: 220, width: "auto", filter: "drop-shadow(8px 0 20px rgba(0,0,0,0.22))", pointerEvents: "none", zIndex: 2 }} />
            <div style={{ backgroundColor: INVERT, borderRadius: 16, overflow: "hidden", position: "relative", zIndex: 1 }}>
              <div style={{ padding: "22px 24px 16px 148px" }}>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.02em" }}>{t("services.ctaQuestion")}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{t("services.ctaSubtext")}</p>
              </div>
              <div style={{ padding: "0 24px 24px 24px" }}>
                <button onClick={openContact} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: 14, padding: "13px 20px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
                  {t("services.ctaContact")} <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 52, position: "relative", zIndex: 2, paddingTop: isTablet ? 140 : 190 }}>
            <img src="/CtaSitting.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", top: 2, left: isTablet ? 32 : 48, height: isTablet ? 280 : 360, width: "auto", zIndex: 10, pointerEvents: "none", display: "block", filter: "drop-shadow(8px 12px 24px rgba(0,0,0,0.22))" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", padding: isTablet ? "28px 32px 28px 200px" : "36px 44px 36px 260px", backgroundColor: INVERT, borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <div>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#FFFFFF", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{t("services.ctaQuestion")}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>{t("services.ctaSubtext")}</p>
              </div>
              <button onClick={openContact} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "transform 200ms, background-color 200ms", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {t("services.ctaContact")} <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ slug, name, description, Icon, dark, isMobile, isTablet, badge, bullets, href, ctaLabel }: {
  slug: string; name: string; description: string; Icon: React.ElementType;
  dark: boolean; isMobile: boolean; isTablet: boolean; badge: string; bullets: string[]; href: string; ctaLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedLink: React.CSSProperties = { textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 18, position: "relative", overflow: "hidden", opacity: 0, transition: "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease", transform: hovered ? "translateY(-4px)" : "translateY(0)" };

  if (dark) {
    return (
      <a
        href={href}
        className="svc-feat-anim"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...sharedLink,
          padding: isMobile ? "28px 24px" : "36px 32px",
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: hovered
            ? "0 24px 64px color-mix(in srgb, var(--brand) 12%, transparent), 0 6px 18px rgba(0,0,0,0.06)"
            : "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: DARK, borderRadius: "18px 18px 0 0" }} />

        {/* Image — all breakpoints, top-right */}
        <img
          src="/MuhasibatKonsaltinqi.avif"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: isMobile ? -4 : isTablet ? -8 : -16,
            top: isMobile ? 16 : "50%",
            transform: isMobile
              ? (hovered ? "scale(1.04)" : "scale(1)")
              : (hovered ? "translateY(-50%) scale(1.04)" : "translateY(-50%) scale(1)"),
            width: isMobile ? "50%" : isTablet ? "52%" : "62%",
            height: "auto",
            objectFit: "contain",
            transition: "transform 500ms ease",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: isMobile ? "54%" : isTablet ? "55%" : "62%", display: "flex", flexDirection: "column" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--brand) 12%, transparent)", borderRadius: 999, padding: "4px 12px", marginBottom: 24, width: "fit-content" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: DARK, flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: DARK, letterSpacing: "0.1em", textTransform: "uppercase" }}>{badge}</span>
          </div>

          {/* Icon */}
          <div style={{ width: 54, height: 54, borderRadius: 15, backgroundColor: "var(--surface-3)", border: "1px solid color-mix(in srgb, var(--brand) 10%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
            <Icon size={24} color={DARK} strokeWidth={1.6} />
          </div>

          {/* Title */}
          <h4 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 18 : 21, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.025em", lineHeight: 1.2 }}>{name}</h4>

          {/* Description */}
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.72, margin: "0 0 24px", flex: 1 }}>{description}</p>

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: DARK, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--text-soft)", lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: BRAND_SOLID, borderRadius: 9, padding: "10px 18px", width: "fit-content", transition: "background-color 280ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 320ms ease" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "var(--brand-hover)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 24px color-mix(in srgb, var(--brand) 30%, transparent)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = BRAND_SOLID; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>{ctaLabel}</span>
            <ArrowUpRight size={14} color="#ffffff" />
          </div>
        </div>

      </a>
    );
  }

  return (
    <a href={href} className="svc-feat-anim" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ ...sharedLink, padding: isMobile ? "28px 24px" : "36px 32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", boxShadow: hovered ? "0 24px 64px color-mix(in srgb, var(--brand) 12%, transparent), 0 6px 18px rgba(0,0,0,0.06)" : "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: DARK, borderRadius: "18px 18px 0 0" }} />

      {/* Image — all breakpoints, top-right */}
      <img
        src="/VergiKonsaltinqi.avif"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          right: isMobile ? -4 : isTablet ? -8 : -16,
          top: isMobile ? 16 : "50%",
          transform: isMobile
            ? (hovered ? "scale(1.04)" : "scale(1)")
            : (hovered ? "translateY(-50%) scale(1.04)" : "translateY(-50%) scale(1)"),
          width: isMobile ? "50%" : isTablet ? "52%" : "62%",
          height: "auto",
          objectFit: "contain",
          transition: "transform 500ms ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: isMobile ? "54%" : isTablet ? "55%" : "62%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", border: "1px solid color-mix(in srgb, var(--brand) 12%, transparent)", borderRadius: 999, padding: "4px 12px", marginBottom: 24, width: "fit-content" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: DARK, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: DARK, letterSpacing: "0.1em", textTransform: "uppercase" }}>{badge}</span>
        </div>
        <div style={{ width: 54, height: 54, borderRadius: 15, backgroundColor: "var(--surface-3)", border: "1px solid color-mix(in srgb, var(--brand) 10%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, flexShrink: 0 }}>
          <Icon size={24} color={DARK} strokeWidth={1.6} />
        </div>
        <h4 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 18 : 21, color: "var(--text)", margin: "0 0 12px", letterSpacing: "-0.025em", lineHeight: 1.2 }}>{name}</h4>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.72, margin: "0 0 24px", flex: 1 }}>{description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: DARK, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--text-soft)", lineHeight: 1.4 }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: BRAND_SOLID, borderRadius: 9, padding: "10px 18px", width: "fit-content", transition: "background-color 280ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 320ms ease" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "var(--brand-hover)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 24px color-mix(in srgb, var(--brand) 28%, transparent)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = BRAND_SOLID; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>{ctaLabel}</span>
          <ArrowUpRight size={14} color="#ffffff" />
        </div>
      </div>
    </a>
  );
}

function ServiceCard({ slug, name, description, Icon, href, hidden, img, imgSize }: { slug: string; name: string; description: string; Icon: React.ElementType; href: string; hidden?: boolean; img?: string; imgSize?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} className={hidden ? "svc-card-hidden" : "svc-card-anim"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", opacity: 0, position: "relative", backgroundColor: hovered ? "var(--surface)" : "var(--surface-2)", borderRadius: 14, padding: "26px 22px 40px", cursor: "pointer", transition: "background-color 380ms ease, transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease", transform: hovered ? "translateY(-5px) scale(1.012)" : "translateY(0) scale(1)", boxShadow: hovered ? "0 16px 48px color-mix(in srgb, var(--brand) 11%, transparent), 0 4px 12px rgba(0,0,0,0.05)" : "0 1px 3px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {img && (
        <img src={img} alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", right: -6, top: 26, transform: hovered ? "scale(1.04)" : "scale(1)", width: imgSize ?? "52%", height: "auto", objectFit: "contain", transition: "transform 500ms ease", pointerEvents: "none", userSelect: "none" }} />
      )}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, backgroundColor: hovered ? DARK : "transparent", borderRadius: "14px 0 0 14px", transition: "background-color 360ms ease" }} />
      {/* Arrow — always bottom-right of full card */}
      <div style={{ position: "absolute", bottom: 16, right: 22 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: hovered ? DARK : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 360ms ease" }}>
          <ArrowUpRight size={12} color={hovered ? "#FFFFFF" : "var(--text-faint)"} />
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: img ? "56%" : "100%", display: "flex", flexDirection: "column", flex: 1, paddingLeft: img ? 6 : 0 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, backgroundColor: hovered ? "var(--surface-3)" : "color-mix(in srgb, var(--brand) 8%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, flexShrink: 0, transition: "background-color 360ms ease" }}>
          <Icon size={19} color={hovered ? DARK : "var(--brand-hover)"} strokeWidth={1.7} />
        </div>
        <h4 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14.5, color: hovered ? "var(--text)" : "var(--text)", margin: "0 0 9px 0", letterSpacing: "-0.015em", lineHeight: 1.3, transition: "color 360ms ease" }}>{name}</h4>
        <p style={{ fontSize: 12.5, color: hovered ? "var(--text-muted)" : "var(--text-muted)", lineHeight: 1.7, margin: "0 0 18px 0", flex: 1, transition: "color 360ms ease" }}>{description}</p>
      </div>
    </a>
  );
}
