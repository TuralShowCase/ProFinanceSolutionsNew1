"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Phone, ArrowLeft,
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { ContactModalProvider, useContactModal } from "../contexts/ContactModalContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { type ServiceData } from "./servicesData";

const ICON_MAP: Record<string, LucideIcon> = {
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck,
};

gsap.registerPlugin(ScrollTrigger);

const DARK    = "#1A3D2B";
const ACCENT  = "#52B788";
const CREAM   = "#F5F4F1";

// ─── Related service card ──────────────────────────────────────────────────────
function RelatedCard({ service, isMobile }: { service: ServiceData; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[service.iconName];

  return (
    <a
      href={`/services/${service.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: isMobile ? "22px 20px" : "24px 24px",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transition: "transform 280ms, box-shadow 280ms",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 56px rgba(26,61,43,0.12), 0 4px 16px rgba(26,61,43,0.06)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent line — slides in on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        backgroundColor: DARK,
        borderRadius: "18px 18px 0 0",
        transformOrigin: "left center",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 350ms ease",
      }} />


      {/* Icon + name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 10,
          backgroundColor: hovered ? DARK : `${DARK}0D`,
          border: `1.5px solid ${hovered ? DARK : "#E0DDD8"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 280ms, border-color 280ms",
        }}>
          <Icon size={16} color={hovered ? "#ffffff" : DARK} strokeWidth={1.7} />
        </div>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: isMobile ? 14 : 15,
          color: "#111410",
          margin: 0,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
        }}>{service.name}</h3>
      </div>

      {/* Tagline */}
      <p style={{
        fontSize: 13,
        color: "#9CA3AF",
        lineHeight: 1.6,
        margin: "0 0 16px",
        position: "relative", zIndex: 1,
      }}>{service.tagline}</p>

      {/* Arrow link */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        fontWeight: 600,
        color: hovered ? DARK : "#9CA3AF",
        transition: "color 280ms, gap 280ms",
        ...(hovered ? { gap: "8px" } : {}),
      }}>
        Ətraflı bax
        <ArrowUpRight size={14} strokeWidth={2} />
      </div>
    </a>
  );
}

// ─── Feature inclusion card ────────────────────────────────────────────────────
function FeatureCard({ title, description, isMobile }: {
  title: string; description: string; isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="feat-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${hovered ? `${DARK}30` : "#E8E6E2"}`,
        borderRadius: 14,
        padding: isMobile ? "22px 20px" : "28px 28px",
        position: "relative",
        transition: "border-color 240ms, box-shadow 240ms, transform 240ms",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 36px rgba(26,61,43,0.08)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Top green accent line — grows in on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        height: 2,
        width: hovered ? "100%" : "0%",
        backgroundColor: DARK,
        borderRadius: "14px 14px 0 0",
        transition: "width 350ms ease",
      }} />

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: isMobile ? 15 : 16,
        color: "#111410",
        margin: "0 0 10px",
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
      }}>{title}</h3>

      {/* Description */}
      <p style={{
        fontSize: isMobile ? 13 : 14,
        color: "#6B7280",
        lineHeight: 1.78,
        margin: 0,
        paddingLeft: 0,
      }}>{description}</p>
    </div>
  );
}


// ─── Process step card ────────────────────────────────────────────────────────
function ProcessStepCard({ step, title, description, isMobile, isTablet }: {
  step: string; title: string; description: string;
  isMobile: boolean; isTablet: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="proc-step"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: CREAM,
        borderRadius: 18,
        padding: isMobile ? "28px 24px" : isTablet ? "30px 28px" : "36px 32px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 260ms, box-shadow 260ms",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 52px rgba(26,61,43,0.1)" : "none",
        minHeight: isMobile ? 180 : 220,
      }}
    >
      {/* Ghost step number — large background decoration */}
      <span style={{
        position: "absolute",
        bottom: -16, right: 8,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 900,
        fontSize: 100,
        color: DARK,
        opacity: hovered ? 0.08 : 0.045,
        letterSpacing: "-0.08em",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        transition: "opacity 260ms",
      }}>
        {step}
      </span>

      {/* Step number — editorial large type */}
      <div style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontSize: isMobile ? 32 : 40,
          color: DARK,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          display: "block",
          marginBottom: 14,
        }}>
          {step}
        </span>
        {/* Accent rule — grows on hover */}
        <div style={{
          height: 2,
          borderRadius: 1,
          backgroundColor: DARK,
          opacity: 0.22,
          width: hovered ? 52 : 32,
          transition: "width 320ms ease, opacity 260ms",
          ...(hovered ? { opacity: 0.5 } : {}),
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: isMobile ? 16 : 18,
          color: "#111410",
          margin: "0 0 10px",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: isMobile ? 13 : 14,
          color: "#6B7280",
          lineHeight: 1.8,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Inner component — rendered inside the provider so useContactModal works ───
function ServicePageInner({
  service,
  allServices,
}: {
  service: ServiceData;
  allServices: ServiceData[];
}) {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const { openContact } = useContactModal();

  const pageRef    = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const relatedServices = service.relatedSlugs
    .map(slug => allServices.find(s => s.slug === slug))
    .filter(Boolean) as ServiceData[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero title word-by-word slide reveal ──────────────────
      gsap.fromTo(".word-inner",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.055, delay: 0.15 }
      );

      // ── Hero badge + breadcrumb ────────────────────────────────
      gsap.fromTo(".hero-anim",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1, delay: 0.1 }
      );

      // ── Intro section below hero ───────────────────────────────
      gsap.fromTo(".intro-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".intro-section", start: "top 85%", once: true } }
      );

      // ── Feature cards stagger in ───────────────────────────────
      gsap.fromTo(".feat-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07,
          scrollTrigger: { trigger: ".features-bento", start: "top 78%", once: true },
        }
      );

      // ── Process header ─────────────────────────────────────────
      gsap.fromTo(".proc-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: processRef.current, start: "top 82%", once: true } }
      );

      // ── Process cards: clip-path stagger ───────────────────────
      gsap.fromTo(".proc-step",
        { clipPath: "inset(0 0 100% 0 round 18px)" },
        {
          clipPath: "inset(0 0 0% 0 round 18px)",
          duration: 0.7, ease: "expo.out", stagger: 0.12,
          scrollTrigger: { trigger: ".proc-grid", start: "top 78%", once: true },
        }
      );

      // ── Targets callout card ───────────────────────────────────
      gsap.fromTo(".targets-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(".target-pill",
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, duration: 0.45, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true },
        }
      );

      // ── FAQ items ─────────────────────────────────────────────
      gsap.fromTo(".svc-faq-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: ".svc-faq-section", start: "top 82%", once: true } }
      );
      gsap.fromTo(".svc-faq-section .faq-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07,
          scrollTrigger: { trigger: ".svc-faq-section", start: "top 78%", once: true },
        }
      );

      // ── Related cards ──────────────────────────────────────────
      gsap.fromTo(".related-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".related-section", start: "top 80%", once: true },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [isMobile, service.slug]);

  // ── Lenis smooth scroll ───────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: isMobile ? 0.15 : 0.08,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, [isMobile]);

  const titleWords = service.name.split(" ");

  return (
    <div style={{ backgroundColor: "#0F1117" }}>
    <div ref={pageRef} style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#fff", position: "relative", zIndex: 1 }}>
      <Header />

      {/* ══════════════════════════════════════════════════════════
          HERO — same contained style as About page
      ══════════════════════════════════════════════════════════ */}
      <section

        style={{ position: "relative", paddingTop: 72, overflow: "hidden" }}
      >
        <div style={{
          position: "relative",
          height: isMobile ? 220 : isTablet ? 280 : 340,
          backgroundColor: "#F4F8F5",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}>
          {/* Responsive background image */}
          <picture style={{ position: "absolute", inset: 0, display: "block" }}>
            <source media="(max-width: 767px)" srcSet="/AboutPageBGPhone.png" />
            <img
              src="/AboutPageBGDesktop.png"
              alt="" aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: isMobile ? "60% center" : "center 25%",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </picture>

          {/* Light overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(244,248,245,0.82) 0%, rgba(244,248,245,0.58) 100%)",
            pointerEvents: "none",
          }} />

          {/* Bottom fade into white */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
            background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)",
            pointerEvents: "none",
          }} />

          {/* Content */}
          <div style={{
            position: "relative", zIndex: 2,
            maxWidth: 1280, margin: "0 auto", width: "100%",
            padding: isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px",
          }}>
            {/* Breadcrumb */}
            <div className="hero-anim" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 14 : 20, opacity: 0 }}>
              <a
                href="/"
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: `${DARK}60`, textDecoration: "none", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = DARK)}
                onMouseLeave={e => (e.currentTarget.style.color = `${DARK}60`)}
              >
                <ArrowLeft size={13} />
                Xidmətlər
              </a>
              <span style={{ color: `${DARK}30`, fontSize: 12 }}>/</span>
              <span style={{ fontSize: 12, color: `${DARK}70` }}>{service.name}</span>
            </div>

            {/* Large title — word-by-word slide reveal */}
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile
                ? "clamp(28px, 8vw, 40px)"
                : isTablet
                ? "clamp(40px, 6.5vw, 58px)"
                : "clamp(52px, 5.5vw, 78px)",
              color: "#111410",
              margin: 0,
              letterSpacing: "-0.044em",
              lineHeight: 1.0,
            }}>
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i < titleWords.length - 1 ? "0.25em" : 0, paddingTop: "0.15em", paddingBottom: "0.1em" }}
                >
                  <span className="word-inner" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO — overview, highlights, targets, CTAs
      ══════════════════════════════════════════════════════════ */}
      <section className="intro-section" style={{ backgroundColor: "#ffffff", padding: isMobile ? "40px 20px 64px" : isTablet ? "52px 28px 72px" : "64px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Top: tagline + divider */}
          <div className="intro-anim" style={{ marginBottom: isMobile ? 32 : 44, opacity: 0 }}>
            <p className="service-tagline" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 20 : isTablet ? 24 : 28,
              color: DARK,
              margin: "0 0 20px",
              letterSpacing: "-0.025em",
              lineHeight: 1.35,
              maxWidth: 680,
            }}>
              {service.tagline}
            </p>
            <div style={{ height: 1, backgroundColor: "#EBEBEB" }} />
          </div>

          {/* Main two-column */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 340px",
            gap: isMobile ? 36 : isTablet ? 40 : 72,
            alignItems: "start",
            marginBottom: isMobile ? 40 : 56,
          }}>
            {/* Left: overview paragraph */}
            <div>
              <p className="intro-anim service-overview" style={{ fontSize: isMobile ? 15 : 16, color: "#374151", lineHeight: 1.9, margin: 0, opacity: 0 }}>
                {service.overview}
              </p>
            </div>

            {/* Right: highlights + CTAs */}
            <div className="intro-anim" style={{ opacity: 0 }}>
              {/* Highlights */}
              <p style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0.6 }}>
                Nə əldə edirsiniz
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {service.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      backgroundColor: `${DARK}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginTop: 1,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5L8.5 2.5" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: 24 }} />

              {/* CTA buttons */}
              <button
                onClick={openContact}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  backgroundColor: DARK, color: "#fff",
                  fontWeight: 700, fontSize: 14,
                  padding: "13px 24px", borderRadius: 9, textDecoration: "none",
                  marginBottom: 10,
                  transition: "opacity 200ms, transform 200ms",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <Phone size={14} strokeWidth={1.8} />
                Pulsuz konsultasiya
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
                  backgroundColor: "transparent", color: DARK,
                  fontWeight: 500, fontSize: 14,
                  padding: "12px 24px", borderRadius: 9, textDecoration: "none",
                  border: `1px solid ${DARK}22`,
                  transition: "border-color 200ms, background-color 200ms",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${DARK}50`; (e.currentTarget as HTMLElement).style.backgroundColor = `${DARK}06`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${DARK}22`; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                Bütün xidmətlər <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section className="features-section" style={{ backgroundColor: CREAM, padding: isMobile ? "64px 16px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Xidmət paketi
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: isMobile ? 26 : isTablet ? 34 : "clamp(32px, 3.5vw, 48px)",
                color: "#111410",
                margin: 0,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
              }}>
                Ətraflı <span style={{ color: DARK }}>xidmət paketi</span>
              </h2>
              {!isMobile && (
                <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, margin: 0, maxWidth: 300 }}>
                  Bu xidmətə daxil olan bütün komponentlər ətraflı şəkildə.
                </p>
              )}
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: isMobile ? 32 : 48 }} />

          {/* ── Feature inclusion grid ── */}
          <div
            className="features-bento"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: 12,
              marginBottom: isMobile ? 44 : 64,
            }}
          >
            {service.features.map((f, i) => (
              <FeatureCard key={i} title={f.title} description={f.description} isMobile={isMobile} />
            ))}
          </div>

          {/* ── Who is it for ── */}
          <div className="targets-row" style={{ position: "relative" }}>
            <div
              style={{
                backgroundColor: DARK,
                borderRadius: 18,
                padding: isMobile ? "24px 20px" : isTablet ? "28px 32px" : "36px 40px",
                display: "flex",
                flexDirection: isMobile || isTablet ? "column" : "row",
                gap: isMobile ? 14 : isTablet ? 16 : 32,
                alignItems: isMobile || isTablet ? "flex-start" : "center",
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* Mobile/tablet: image pops above card top-right, doesn't interfere with chips */}
              {(isMobile || isTablet) && (
                <img
                  src="/ServiceForUHumanImage.png"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: isMobile ? -94 : -108,
                    right: isMobile ? 16 : 400,
                    height: isMobile ? 200 : 220,
                    width: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
              )}

              {/* Mobile/tablet: label */}
              {(isMobile || isTablet) ? (
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>
                    Kimə uyğundur
                  </p>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#ffffff",
                    margin: 0,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                    maxWidth: 180,
                  }}>
                    Bu xidmət sizi əhatə edir?
                  </p>
                </div>
              ) : (
                /* Desktop: label */
                <div style={{ flexShrink: 0, alignSelf: "center" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>
                    Kimə uyğundur
                  </p>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#ffffff",
                    margin: 0,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                    maxWidth: 180,
                  }}>
                    Bu xidmət sizi əhatə edir?
                  </p>
                </div>
              )}

              {/* Desktop only: center image placeholder */}
              {!isMobile && !isTablet && (
                <div style={{
                  position: "relative",
                  width: 180,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  overflow: "visible",
                }}>
                  <img
                    src="/ServiceForUHumanImage.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{
                      position: "absolute",
                      bottom: -36,
                      left: 0,
                      height: 210,
                      width: "auto",
                      objectFit: "contain",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              )}

              {/* Chips grid — 2 columns on all sizes */}
              <div style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                alignSelf: "center",
                width: isMobile || isTablet ? "100%" : undefined,
                position: "relative",
                zIndex: 1,
              }}>
                {service.targets.map((t, i) => (
                  <div
                    key={i}
                    className="target-pill"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 9,
                      padding: "9px 14px",
                    }}
                  >
                    <div style={{
                      width: 6, height: 6,
                      borderRadius: "50%",
                      backgroundColor: ACCENT,
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.3,
                    }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={processRef}
        style={{ backgroundColor: "#ffffff", overflow: "hidden" }}
      >
        {/* Header */}
        <div
          className="proc-header"
          style={{
            padding: isMobile ? "64px 20px 36px" : isTablet ? "72px 28px 40px" : "88px 48px 44px",
            maxWidth: isMobile ? undefined : 1200,
            margin: "0 auto",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>
            Addım-addım
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? 26 : isTablet ? 34 : "clamp(32px, 3.5vw, 48px)",
              color: "#111410",
              margin: 0,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}>
              Prosesimiz <span style={{ color: DARK }}>necə işləyir?</span>
            </h2>
            {!isMobile && (
              <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>
                {service.process.length} addımda müştərilərə dəstək göstəririk.
              </p>
            )}
          </div>
        </div>

        {/* 2×2 grid for all breakpoints */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px 64px" : isTablet ? "0 28px 80px" : "0 48px 88px" }}>
          <div className="proc-grid" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 14,
          }}>
            {service.process.map((p, i) => (
              <ProcessStepCard
                key={i}
                step={p.step}
                title={p.title}
                description={p.description}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      {service.faqs && service.faqs.length > 0 && (
        <>
          {/* FAQPage schema for this service */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `https://profinancesolutions.az/services/${service.slug}#faqpage`,
                url: `https://profinancesolutions.az/services/${service.slug}`,
                name: `${service.name} — Suallar və Cavablar`,
                isPartOf: { "@id": "https://profinancesolutions.az/#website" },
                about: { "@id": `https://profinancesolutions.az/services/${service.slug}#service` },
                mainEntity: service.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }),
            }}
          />

          <section
            className="svc-faq-section"
            style={{
              background: "linear-gradient(160deg, #F0F7F3 0%, #F7F9F7 55%, #EEF5F1 100%)",
              padding: isMobile
                ? "64px 20px 72px"
                : isTablet
                ? "80px 28px 88px"
                : "100px 48px 108px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative orb */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -80, right: -60,
                width: 340, height: 340,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

              {/* Header row */}
              <div
                className="svc-faq-header"
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "flex-end",
                  justifyContent: "space-between",
                  gap: isMobile ? 16 : 40,
                  marginBottom: isMobile ? 32 : isTablet ? 44 : 52,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  {/* Badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    backgroundColor: `${DARK}0E`, border: `1px solid ${DARK}18`,
                    borderRadius: 100, padding: "4px 12px 4px 9px", marginBottom: 16,
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      backgroundColor: ACCENT,
                    }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11, fontWeight: 600, color: DARK,
                      letterSpacing: "0.14em", textTransform: "uppercase",
                    }}>
                      Suallar & Cavablar
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: isMobile ? 26 : isTablet ? 34 : "clamp(32px, 3.2vw, 46px)",
                    color: "#111410",
                    margin: 0,
                    letterSpacing: "-0.044em",
                    lineHeight: 1.06,
                  }}>
                    Tez-tez{" "}
                    <span style={{ color: DARK }}>soruşulan</span>{" "}
                    suallar
                  </h2>
                </div>
                {!isMobile && (
                  <p style={{
                    fontSize: 15, color: "#9CA3AF",
                    lineHeight: 1.75, margin: 0, maxWidth: 360,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {service.name} xidməti haqqında ən çox soruşulan suallara
                    peşəkar cavab topladıq.
                  </p>
                )}
              </div>

              {/* Accordion */}
              <FAQAccordion items={service.faqs} isMobile={isMobile} />
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════
          RELATED SERVICES
      ══════════════════════════════════════════════════════════ */}
      <section className="related-section" style={{ backgroundColor: CREAM, padding: isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: isMobile ? 8 : 0, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: DARK, letterSpacing: "0.24em", textTransform: "uppercase", margin: "0 0 14px", opacity: 0.5 }}>
                Kəşf edin
              </p>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: isMobile ? 26 : isTablet ? 32 : "clamp(30px, 3vw, 44px)",
                color: "#111410",
                margin: 0,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
              }}>
                Digər <span style={{ color: DARK }}>xidmətlər</span>
              </h2>
            </div>
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: "#9CA3AF", textDecoration: "none", transition: "color 220ms, gap 220ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = DARK; (e.currentTarget as HTMLElement).style.gap = "10px"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; (e.currentTarget as HTMLElement).style.gap = "7px"; }}
            >
              Bütün xidmətlər <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Card grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: 14,
              marginTop: isMobile ? 28 : 36,
            }}
          >
            {relatedServices.map((s, i) => (
              <div key={i} className="related-card" style={{ opacity: 0 }}>
                <RelatedCard service={s} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: "#ffffff",
        paddingTop: isMobile ? 48 : isTablet ? 160 : 200,
        paddingBottom: isMobile ? 64 : isTablet ? 80 : 100,
        paddingLeft: isMobile ? 16 : isTablet ? 28 : 48,
        paddingRight: isMobile ? 16 : isTablet ? 28 : 48,
      }}>
        <div style={{ maxWidth: isMobile ? "100%" : isTablet ? 900 : 1200, margin: "0 auto" }}>

          {/* Card */}
          <div style={{
            backgroundColor: DARK,
            borderRadius: 24,
            padding: isMobile ? "44px 24px 260px" : isTablet ? "52px 48px" : "68px 72px",
            position: "relative",
            overflow: "visible",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 28 : 48,
          }}>
            {/* Subtle top accent line */}
            <div style={{ position: "absolute", top: 0, left: 80, right: 80, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.4 }} />

            {/* Human — desktop/tablet: bleeds above from bottom-right; mobile: below card */}
            <img
              src="/ServicesCTAHumanImage.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{
                position: "absolute",
                ...(isMobile
                  ? { bottom: 0, left: "50%", transform: "translateX(-50%)", height: 240 }
                  : { bottom: 0, right: 0, height: isTablet ? 440 : 560 }
                ),
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Text + Buttons — constrained to left portion so they never reach the image */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 28 : 36,
              maxWidth: isMobile ? "100%" : isTablet ? "55%" : "50%",
              position: "relative",
              zIndex: 1,
              width: "100%",
            }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Hazırsınız?
                </p>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 24 : isTablet ? 28 : "clamp(28px, 2.8vw, 38px)",
                  color: "#ffffff",
                  margin: "0 0 14px",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}>
                  Bu xidmət haqqında<br />
                  <span style={{ color: ACCENT }}>pulsuz məsləhət alın</span>
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                  Ekspertlərimiz sizinlə əlaqə saxlayıb {service.name.toLowerCase()} xidməti haqqında ətraflı məlumat verəcək.
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: isMobile ? "100%" : "auto" }}>
              <button
                onClick={openContact}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  backgroundColor: "#ffffff", color: DARK,
                  fontWeight: 700, fontSize: 15,
                  padding: "14px 32px", borderRadius: 9,
                  whiteSpace: "nowrap",
                  transition: "transform 200ms, background-color 200ms",
                  border: "none", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.backgroundColor = "#F0F0F0"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff"; }}
              >
                <Phone size={15} strokeWidth={1.8} />
                Pulsuz konsultasiya
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  backgroundColor: "rgba(255,255,255,0.07)", color: "#ffffff",
                  fontWeight: 500, fontSize: 14,
                  padding: "13px 32px", borderRadius: 9, textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.18)",
                  whiteSpace: "nowrap", transition: "all 200ms",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; }}
              >
                Bütün xidmətlər <ArrowUpRight size={15} />
              </a>
            </div>{/* end buttons */}
            </div>{/* end text+buttons wrapper */}
          </div>{/* end card */}
        </div>{/* end maxWidth wrapper */}
      </section>

      {/* ── Keyframe animations ──────────────────────────────────── */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </div>
    <Footer />
    </div>
  );
}

// ─── Exported shell — provides context so ServicePageInner can use it ─────────
export function ServicePage({
  service,
  allServices,
}: {
  service: ServiceData;
  allServices: ServiceData[];
}) {
  return (
    <ContactModalProvider>
      <ServicePageInner service={service} allServices={allServices} />
    </ContactModalProvider>
  );
}
