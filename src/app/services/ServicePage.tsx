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
import { useTranslations } from "next-intl";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactModalProvider, useContactModal } from "../contexts/ContactModalContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { type ServiceData, localizedSlug } from "./servicesData";
import { DARK, ACCENT, CREAM, INVERT, BRAND_SOLID, mix } from "@/app/lib/brand";

const ICON_MAP: Record<string, LucideIcon> = {
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck,
};

gsap.registerPlugin(ScrollTrigger);


function RelatedCard({ service, isMobile, locale }: { service: ServiceData; isMobile: boolean; locale: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[service.iconName];
  const t    = useTranslations("servicePage");
  const sBase = locale === "az" ? "/services" : `/${locale}/services`;

  return (
    <a href={`${sBase}/${localizedSlug(service.slug, locale)}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", backgroundColor: "var(--surface)", borderRadius: 18, padding: isMobile ? "22px 20px" : "24px 24px", textDecoration: "none", position: "relative", overflow: "hidden", transition: "transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 380ms ease", transform: hovered ? "translateY(-6px)" : "translateY(0)", boxShadow: hovered ? "0 20px 56px color-mix(in srgb, var(--brand) 12%, transparent), 0 4px 16px color-mix(in srgb, var(--brand) 6%, transparent)" : "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: DARK, borderRadius: "18px 18px 0 0", transformOrigin: "left center", transform: hovered ? "scaleX(1)" : "scaleX(0)", transition: "transform 350ms ease" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: hovered ? DARK : `${mix(DARK, 5)}`, border: `1.5px solid ${hovered ? DARK : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background-color 280ms, border-color 280ms" }}>
          <Icon size={16} color={hovered ? "#ffffff" : DARK} strokeWidth={1.7} />
        </div>
        <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 14 : 15, color: "var(--text)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{service.name}</h3>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-faint)", lineHeight: 1.6, margin: "0 0 16px", position: "relative", zIndex: 1 }}>{service.tagline}</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: hovered ? DARK : "var(--text-faint)", transition: "color 280ms, gap 280ms", ...(hovered ? { gap: "8px" } : {}) }}>
        {t("viewDetails")} <ArrowUpRight size={14} strokeWidth={2} />
      </div>
    </a>
  );
}

function FeatureCard({ title, description, isMobile }: { title: string; description: string; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="feat-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "var(--surface)", border: `1px solid ${hovered ? `${mix(DARK, 19)}` : "var(--border)"}`, borderRadius: 14, padding: isMobile ? "22px 20px" : "28px 28px", position: "relative", transition: "border-color 320ms ease, box-shadow 360ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 12px 36px color-mix(in srgb, var(--brand) 8%, transparent)" : "none", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: hovered ? "100%" : "0%", backgroundColor: DARK, borderRadius: "14px 14px 0 0", transition: "width 350ms ease" }} />
      <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 16, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--text-muted)", lineHeight: 1.78, margin: 0 }}>{description}</p>
    </div>
  );
}

function ProcessStepCard({ step, title, description, isMobile, isTablet }: {
  step: string; title: string; description: string; isMobile: boolean; isTablet: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="proc-step" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: CREAM, borderRadius: 18, padding: isMobile ? "28px 24px" : isTablet ? "30px 28px" : "36px 32px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 360ms ease", transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? "0 20px 52px color-mix(in srgb, var(--brand) 10%, transparent)" : "none", minHeight: isMobile ? 180 : 220 }}
    >
      <span style={{ position: "absolute", bottom: -16, right: 8, fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 100, color: DARK, opacity: hovered ? 0.08 : 0.045, letterSpacing: "-0.08em", lineHeight: 1, userSelect: "none", pointerEvents: "none", transition: "opacity 260ms" }}>{step}</span>
      <div style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: isMobile ? 32 : 40, color: DARK, letterSpacing: "-0.06em", lineHeight: 1, display: "block", marginBottom: 14 }}>{step}</span>
        <div style={{ height: 2, borderRadius: 1, backgroundColor: DARK, opacity: hovered ? 0.5 : 0.22, width: hovered ? 52 : 32, transition: "width 320ms ease, opacity 260ms" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 18, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.025em", lineHeight: 1.25 }}>{title}</h3>
        <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

function ServicePageInner({ service, allServices, locale }: { service: ServiceData; allServices: ServiceData[]; locale: string }) {
  const t      = useTranslations("servicePage");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const { openContact } = useContactModal();

  const pageRef    = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const sBase           = locale === "az" ? "/services" : `/${locale}/services`;
  const homeBase        = locale === "az" ? "/"         : `/${locale}`;
  const relatedServices = service.relatedSlugs.map(slug => allServices.find(s => s.slug === slug)).filter(Boolean) as ServiceData[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".word-inner",    { yPercent: 115 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.055, delay: 0.15 });
      gsap.fromTo(".hero-anim",     { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.1, delay: 0.1 });
      gsap.fromTo(".intro-anim",    { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.88, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".intro-section", start: "top 85%", once: true } });
      gsap.fromTo(".feat-card",     { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ".features-bento", start: "top 78%", once: true } });
      gsap.fromTo(".proc-header",   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: processRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".proc-step",     { clipPath: "inset(0 0 100% 0 round 18px)" }, { clipPath: "inset(0 0 0% 0 round 18px)", duration: 0.7, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".proc-grid", start: "top 78%", once: true } });
      gsap.fromTo(".targets-row",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true } });
      gsap.fromTo(".target-pill",   { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.65, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true } });
      gsap.fromTo(".svc-faq-header",{ opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", scrollTrigger: { trigger: ".svc-faq-section", start: "top 82%", once: true } });
      gsap.fromTo(".svc-faq-section .faq-item", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ".svc-faq-section", start: "top 78%", once: true } });
      gsap.fromTo(".related-card",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".related-section", start: "top 80%", once: true } });
    }, pageRef);
    return () => ctx.revert();
  }, [isMobile, service.slug]);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false, lerp: isMobile ? 0.15 : 0.065, wheelMultiplier: isMobile ? 1 : 0.85, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(ticker); };
  }, [isMobile]);

  const titleWords = service.name.split(" ");

  return (
    <div style={{ backgroundColor: "var(--page-bg)" }}>
    <div ref={pageRef} style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", backgroundColor: "var(--surface)", position: "relative", zIndex: 1 }}>
      <Header />

      {/* Hero */}
      <section style={{ position: "relative", paddingTop: 72, overflow: "hidden" }}>
        <div style={{ position: "relative", height: isMobile ? 220 : isTablet ? 280 : 340, backgroundColor: "var(--hero-bg-sub)", overflow: "hidden", display: "flex", alignItems: "center" }}>
          <picture style={{ position: "absolute", inset: 0, display: "block" }}>
            <source media="(max-width: 767px)" srcSet="/AboutPageBGPhone.avif" />
            <img src="/AboutPageBGDesktop.avif" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: isMobile ? "60% center" : "center 25%", display: "block", pointerEvents: "none" }} />
          </picture>
          <div className="subhero-scrim" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(244,248,245,0.82) 0%, rgba(244,248,245,0.58) 100%)", pointerEvents: "none" }} />
          <div className="subhero-fade" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px" }}>
            <div className="hero-anim" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 14 : 20, opacity: 0 }}>
              <a href={`${sBase}`} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: `${mix(DARK, 38)}`, textDecoration: "none", transition: "color 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = DARK)}
                onMouseLeave={e => (e.currentTarget.style.color = `${mix(DARK, 38)}`)}
              >
                <ArrowLeft size={13} /> {t("breadcrumbServices")}
              </a>
              <span style={{ color: `${mix(DARK, 19)}`, fontSize: 12 }}>/</span>
              <span style={{ fontSize: 12, color: `${mix(DARK, 44)}` }}>{service.name}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : isTablet ? "clamp(40px, 6.5vw, 58px)" : "clamp(52px, 5.5vw, 78px)", color: "var(--text)", margin: 0, letterSpacing: "-0.044em", lineHeight: 1.0 }}>
              {titleWords.map((word, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i < titleWords.length - 1 ? "0.25em" : 0, paddingTop: "0.15em", paddingBottom: "0.1em" }}>
                  <span className="word-inner" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="intro-section" style={{ backgroundColor: "var(--surface)", padding: isMobile ? "40px 20px 64px" : isTablet ? "52px 28px 72px" : "64px 48px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* T3 service description as the intro heading (tagline retired from this slot) */}
          <div className="intro-anim" style={{ marginBottom: isMobile ? 32 : 44, opacity: 0 }}>
            <p className="service-tagline" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 20 : isTablet ? 24 : 28, color: DARK, margin: "0 0 20px", letterSpacing: "-0.025em", lineHeight: 1.35, maxWidth: 800 }}>{service.overview}</p>
            <div style={{ height: 1, backgroundColor: "var(--border)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 340px", gap: isMobile ? 36 : isTablet ? 40 : 72, alignItems: "start", marginBottom: isMobile ? 40 : 56 }}>
            <div className="intro-anim" style={{ opacity: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px", opacity: 0.6 }}>{t("whatYouGet")}</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : "14px 32px" }}>
                {service.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, backgroundColor: `${mix(DARK, 7)}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="intro-anim" style={{ opacity: 0 }}>
              <button onClick={openContact} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: BRAND_SOLID, color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 9, marginBottom: 10, transition: "opacity 280ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              ><Phone size={14} strokeWidth={1.8} /> {t("freeConsultation")}</button>
              <a href={homeBase} style={{ display: "flex", width: "100%", boxSizing: "border-box", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "transparent", color: DARK, fontWeight: 500, fontSize: 14, padding: "12px 24px", borderRadius: 9, textDecoration: "none", border: `1px solid ${mix(DARK, 13)}`, transition: "border-color 300ms ease, background-color 300ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${mix(DARK, 31)}`; (e.currentTarget as HTMLElement).style.backgroundColor = `${mix(DARK, 2)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${mix(DARK, 13)}`; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >{t("allServices")} <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" style={{ backgroundColor: CREAM, padding: isMobile ? "64px 16px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? 36 : 52 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("servicePackage")}</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : isTablet ? 34 : "clamp(32px, 3.5vw, 48px)", color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
                {t("whatsIncluded")} <span style={{ color: DARK }}>{t("whatsIncludedAccent")}</span>
              </h2>
              {!isMobile && <p style={{ fontSize: 15, color: "var(--text-faint)", lineHeight: 1.7, margin: 0, maxWidth: 300 }}>{t("packageSubtext")}</p>}
            </div>
          </div>
          <div style={{ height: 1, backgroundColor: "var(--border)", marginBottom: isMobile ? 32 : 48 }} />
          <div className="features-bento" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : service.features.length === 4 ? "1fr 1fr" : "1fr 1fr 1fr", gap: 12, marginBottom: isMobile ? 44 : 64 }}>
            {service.features.map((f, i) => <FeatureCard key={i} title={f.title} description={f.description} isMobile={isMobile} />)}
          </div>

          {/* Who it's for */}
          <div className="targets-row" style={{ position: "relative" }}>
            <div style={{ backgroundColor: INVERT, borderRadius: 18, padding: isMobile ? "24px 20px" : isTablet ? "28px 32px" : "36px 40px", display: "flex", flexDirection: isMobile || isTablet ? "column" : "row", gap: isMobile ? 14 : isTablet ? 16 : 32, alignItems: isMobile || isTablet ? "flex-start" : "center", position: "relative", overflow: "visible" }}>
              {(isMobile || isTablet) && <img src="/ServiceForUHumanImage.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", top: isMobile ? -94 : -108, right: isMobile ? 16 : 400, height: isMobile ? 200 : 220, width: "auto", objectFit: "contain", pointerEvents: "none", zIndex: 2 }} />}
              {(isMobile || isTablet) ? (
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>{t("suitableFor")}</p>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "#ffffff", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.25, maxWidth: 180 }}>{t("doesThisServeYou")}</p>
                </div>
              ) : (
                <div style={{ flexShrink: 0, alignSelf: "center" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>{t("suitableFor")}</p>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.25, maxWidth: 180 }}>{t("doesThisServeYou")}</p>
                </div>
              )}
              {!isMobile && !isTablet && (
                <div style={{ position: "relative", width: 180, flexShrink: 0, alignSelf: "stretch", overflow: "visible" }}>
                  <img src="/ServiceForUHumanImage.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", bottom: -36, left: 0, height: 210, width: "auto", objectFit: "contain", pointerEvents: "none" }} />
                </div>
              )}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignSelf: "center", width: isMobile || isTablet ? "100%" : undefined, position: "relative", zIndex: 1 }}>
                {service.targets.map((target, i) => (
                  <div key={i} className="target-pill" style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9, padding: "9px 14px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ACCENT, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>{target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} style={{ backgroundColor: "var(--surface)", overflow: "hidden" }}>
        <div className="proc-header" style={{ padding: isMobile ? "64px 20px 36px" : isTablet ? "72px 28px 40px" : "88px 48px 44px", maxWidth: isMobile ? undefined : 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("stepByStep")}</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : isTablet ? 34 : "clamp(32px, 3.5vw, 48px)", color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
              {t("howItWorks")} <span style={{ color: DARK }}>{t("howItWorksAccent")}</span>
            </h2>
            {!isMobile && <p style={{ fontSize: 15, color: "var(--text-faint)", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>{t("stepsSupport", { count: service.process.length })}</p>}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px 64px" : isTablet ? "0 28px 80px" : "0 48px 88px" }}>
          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            {service.process.map((p, i) => <ProcessStepCard key={i} step={p.step} title={p.title} description={p.description} isMobile={isMobile} isTablet={isTablet} />)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="related-section" style={{ backgroundColor: CREAM, padding: isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 48px 108px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: isMobile ? 20 : 0, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: DARK, letterSpacing: "0.24em", textTransform: "uppercase", margin: "0 0 14px", opacity: 0.5 }}>{t("discoverLabel")}</p>
              <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : isTablet ? 32 : "clamp(30px, 3vw, 44px)", color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
                {t("otherServices")} <span style={{ color: DARK }}>{t("otherServicesAccent")}</span>
              </h2>
            </div>
            <a href={`${homeBase}#services`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: "var(--text-faint)", textDecoration: "none", transition: "color 220ms, gap 220ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = DARK; (e.currentTarget as HTMLElement).style.gap = "10px"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-faint)"; (e.currentTarget as HTMLElement).style.gap = "7px"; }}
            >{t("allServicesLink")} <ArrowUpRight size={14} /></a>
          </div>
          <div style={{ height: 1, backgroundColor: "var(--border)", margin: isMobile ? "0 0 28px" : "36px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr", gap: 14, marginTop: isMobile ? 28 : 36 }}>
            {relatedServices.map((s, i) => (
              <div key={i} className="related-card" style={{ opacity: 0 }}>
                <RelatedCard service={s} isMobile={isMobile} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: "var(--surface)", paddingTop: isMobile ? 48 : isTablet ? 160 : 200, paddingBottom: isMobile ? 64 : isTablet ? 80 : 100, paddingLeft: isMobile ? 16 : isTablet ? 28 : 48, paddingRight: isMobile ? 16 : isTablet ? 28 : 48 }}>
        <div style={{ maxWidth: isMobile ? "100%" : isTablet ? 900 : 1200, margin: "0 auto" }}>
          <div style={{ backgroundColor: INVERT, borderRadius: 24, padding: isMobile ? "44px 24px 260px" : isTablet ? "52px 48px" : "68px 72px", position: "relative", overflow: "visible", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 28 : 48 }}>
            <div style={{ position: "absolute", top: 0, left: 80, right: 80, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.4 }} />
            <img src="/ServicesCTAHumanImage.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", ...(isMobile ? { bottom: 0, left: "50%", transform: "translateX(-50%)", height: 240 } : { bottom: 0, right: 0, height: isTablet ? 440 : 560 }), width: "auto", objectFit: "contain", objectPosition: "bottom", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 28 : 36, maxWidth: isMobile ? "100%" : isTablet ? "55%" : "50%", position: "relative", zIndex: 1, width: "100%" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("ctaReadyLabel")}</p>
                <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : isTablet ? 28 : "clamp(28px, 2.8vw, 38px)", color: "#ffffff", margin: "0 0 14px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                  {t("ctaHeading")}<br /><span style={{ color: ACCENT }}>{t("ctaHeadingAccent")}</span>
                </h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>{t("ctaSubtext", { serviceName: service.name.toLowerCase() })}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: isMobile ? "100%" : "auto" }}>
                <button onClick={openContact} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 9, whiteSpace: "nowrap", transition: "transform 200ms, background-color 200ms", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg-hover)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg)"; }}
                ><Phone size={15} strokeWidth={1.8} /> {t("ctaPrimary")}</button>
                <a href={`${homeBase}#services`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.07)", color: "#ffffff", fontWeight: 500, fontSize: 14, padding: "13px 32px", borderRadius: 9, textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)", whiteSpace: "nowrap", transition: "all 200ms" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                >{t("ctaSecondary")} <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
    <Footer />
    </div>
  );
}

export function ServicePage({ service, allServices, locale }: { service: ServiceData; allServices: ServiceData[]; locale: string }) {
  return (
    <ContactModalProvider>
      <ServicePageInner service={service} allServices={allServices} locale={locale} />
    </ContactModalProvider>
  );
}
