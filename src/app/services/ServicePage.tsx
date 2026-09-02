"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Phone, ArrowLeft, X, LayoutGrid,
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SubpageHero } from "../components/SubpageHero";
import { ContactModalProvider, useContactModal } from "../contexts/ContactModalContext";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useSmoothScroll } from "../lib/smoothScroll";
import { type ServiceData, localizedSlug } from "./servicesData";
import { DARK, ACCENT, CREAM, INVERT, BRAND_SOLID, mix } from "@/app/lib/brand";
import {
  FS_H2, FS_H3, FS_LABEL, FS_H4_MOBILE, FS_H4_DESKTOP, FS_BODY,
} from "@/app/lib/typography";

const ICON_MAP: Record<string, LucideIcon> = {
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck,
};

gsap.registerPlugin(ScrollTrigger);


export const SERVICES_SIDEBAR_WIDTH = 320;


function ServicesSidebar({ allServices, currentSlug, locale, isMobile, open, onOpen, onClose }: {
  allServices: ServiceData[]; currentSlug: string; locale: string; isMobile: boolean;
  open: boolean; onOpen: () => void; onClose: () => void;
}) {
  const t = useTranslations("servicePage");
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sBase = locale === "az" ? "/services" : `/${locale}/services`;

  useEffect(() => { setMounted(true); }, []);

 
  useEffect(() => {
    if (!isMobile || !open || !backdropRef.current || !panelRef.current) return;
    document.body.style.overflow = "hidden";
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
    gsap.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "expo.out" });
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, open]);

  const handleClose = () => {
    if (!isMobile || !backdropRef.current || !panelRef.current) { onClose(); return; }
    gsap.to(panelRef.current, { xPercent: 100, duration: 0.34, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  useEffect(() => {
    if (!isMobile || !open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
   
  }, [isMobile, open]);

 
 
 
 

  const list = (
    <nav style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "6px 0 12px" }}>
      {allServices.map((s, i) => {
        const isCurrent = s.slug === currentSlug;
        const isLast = i === allServices.length - 1;
        const Icon = ICON_MAP[s.iconName];
        const rowStyle: CSSProperties = {
          display: "flex", alignItems: "center", gap: 13, padding: "14px 20px",
          textDecoration: "none", cursor: isCurrent ? "default" : "pointer",
          borderLeft: `3px solid ${isCurrent ? DARK : "transparent"}`,
          borderBottom: isLast ? "none" : "1px solid var(--border)",
          backgroundColor: isCurrent ? mix(DARK, 6) : "transparent",
          transition: "background-color 180ms ease",
        };
        const content = (
          <>
            <Icon size={17} color={isCurrent ? DARK : "var(--text-faint)"} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: FS_BODY, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? DARK : "var(--text-soft)", lineHeight: 1.35, letterSpacing: "-0.005em" }}>{s.name}</span>
          </>
        );
        return isCurrent ? (
          <div key={s.slug} style={rowStyle}>{content}</div>
        ) : (
          <a key={s.slug} href={`${sBase}/${localizedSlug(s.slug, locale)}`} onClick={isMobile ? handleClose : undefined}
            style={rowStyle}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--page-bg-alt)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );

  const header = (onCloseClick: () => void) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
      <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H4_DESKTOP, color: "var(--text)", margin: 0, letterSpacing: "-0.03em" }}>
        {t("otherServices")} <span style={{ color: DARK }}>{t("otherServicesAccent")}</span>
      </h2>
      <button
        onClick={onCloseClick}
        aria-label={t("closePanel")}
        style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: "var(--page-bg-alt)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 200ms", flexShrink: 0 }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--border)")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--page-bg-alt)")}
      >
        <X size={15} color="var(--text-muted)" strokeWidth={2} />
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={onOpen}
          aria-label={t("allServices")}
          style={{
            position: "fixed", bottom: 90, right: 20, width: 50, height: 50, borderRadius: "50%",
            backgroundColor: BRAND_SOLID, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.28)", zIndex: 60,
            opacity: open ? 0 : 1, transform: open ? "scale(0.75)" : "scale(1)", pointerEvents: open ? "none" : "auto",
            transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 220ms ease",
          }}
        >
          <LayoutGrid size={20} strokeWidth={1.8} color="#ffffff" />
        </button>

        {mounted && open && createPortal(
          <div
            ref={backdropRef}
            onMouseDown={e => { if (e.target === backdropRef.current) handleClose(); }}
            style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(15,23,17,0.46)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
          >
            <div
              ref={panelRef}
              style={{
                position: "fixed", top: 0, right: 0, height: "100dvh", width: "100%",
                backgroundColor: "var(--surface)", boxShadow: "-24px 0 80px rgba(0,0,0,0.24)",
                display: "flex", flexDirection: "column", zIndex: 10001,
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              {header(handleClose)}
              {list}
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }

 
 
 
  return (
    <aside
      style={{
        position: "sticky", top: 88, alignSelf: "flex-start", flexShrink: 0,
        maxHeight: "calc(100vh - 88px)",
        width: open ? SERVICES_SIDEBAR_WIDTH : 56,
        backgroundColor: open ? "var(--surface)" : INVERT,
        borderLeft: open ? "1px solid var(--border)" : "none",
        display: "flex", flexDirection: "column", overflow: "hidden",
        transition: "width 400ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 400ms ease",
        zIndex: 5, fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {open ? (
        <>
          {header(onClose)}
          {list}
        </>
      ) : (
        <button
          onClick={onOpen}
          aria-label={t("allServices")}
          style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, padding: "22px 8px", background: "none", border: "none", cursor: "pointer",
            transition: "background-color 220ms ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <LayoutGrid size={15} strokeWidth={1.8} color="#ffffff" />
          <span style={{ display: "inline-block", writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: FS_LABEL, fontWeight: 600, letterSpacing: "0.06em", whiteSpace: "nowrap", color: "#ffffff" }}>
            {t("allServices")}
          </span>
        </button>
      )}
    </aside>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="feat-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: "var(--surface)", border: `1px solid ${hovered ? `${mix(DARK, 19)}` : "var(--border)"}`, borderRadius: 14, position: "relative", transition: "border-color 320ms ease, box-shadow 360ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 12px 36px color-mix(in srgb, var(--brand) 8%, transparent)" : "none", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: hovered ? "100%" : "0%", backgroundColor: DARK, borderRadius: "14px 14px 0 0", transition: "width 350ms ease" }} />
      <h3 className="feat-card-title" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.78, margin: 0 }}>{description}</p>
    </div>
  );
}

function ProcessStepCard({ step, title, description }: {
  step: string; title: string; description: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="proc-step" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: CREAM, borderRadius: 18, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 360ms ease", transform: hovered ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered ? "0 20px 52px color-mix(in srgb, var(--brand) 10%, transparent)" : "none" }}
    >
      <span style={{ position: "absolute", bottom: -16, right: 8, fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 100, color: DARK, opacity: hovered ? 0.08 : 0.045, letterSpacing: "-0.08em", lineHeight: 1, userSelect: "none", pointerEvents: "none", transition: "opacity 260ms" }}>{step}</span>
      <div style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
        <span className="proc-step-num" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, color: DARK, letterSpacing: "-0.06em", lineHeight: 1, display: "block", marginBottom: 14 }}>{step}</span>
        <div style={{ height: 2, borderRadius: 1, backgroundColor: DARK, opacity: hovered ? 0.5 : 0.22, width: hovered ? 52 : 32, transition: "width 320ms ease, opacity 260ms" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 className="proc-step-title" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.025em", lineHeight: 1.25 }}>{title}</h3>
        <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

function ServicePageInner({ service, allServices, locale }: { service: ServiceData; allServices: ServiceData[]; locale: string }) {
  const t      = useTranslations("servicePage");
  const bp     = useBreakpoint();
 
 
 
  const isMobile = bp === "mobile";
  const { openContact } = useContactModal();

  const pageRef    = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const sBase           = locale === "az" ? "/services" : `/${locale}/services`;
  const homeBase        = locale === "az" ? "/"         : `/${locale}`;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".word-inner",    { yPercent: 115 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.055, delay: 0.15 });
      gsap.fromTo(".hero-anim",     { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.1, delay: 0.1 });
      gsap.fromTo(".intro-anim",    { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.88, ease: "expo.out", scrollTrigger: { trigger: ".intro-section", start: "top 85%", once: true } });
      gsap.fromTo(".feat-card",     { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ".features-bento", start: "top 78%", once: true } });
      gsap.fromTo(".whatget-anim",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.88, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".whatget-row", start: "top 85%", once: true } });
      gsap.fromTo(".proc-header",   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: processRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".proc-step",     { clipPath: "inset(0 0 100% 0 round 18px)" }, { clipPath: "inset(0 0 0% 0 round 18px)", duration: 0.7, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".proc-grid", start: "top 78%", once: true } });
      gsap.fromTo(".targets-row",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true } });
      gsap.fromTo(".target-pill",   { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.65, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".targets-row", start: "top 85%", once: true } });
    }, pageRef);
    return () => ctx.revert();
  }, [isMobile, service.slug]);

  useSmoothScroll();

  const titleWords = service.name.split(" ");

  return (
   
   
   
   
   
    <div style={{ backgroundColor: "var(--page-bg)", overflowX: "clip" }}>
    <div ref={pageRef} style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", backgroundColor: "var(--surface)", position: "relative", zIndex: 1 }}>
      <Header />

      {}
      <section style={{ position: "relative", paddingTop: 72, overflow: "hidden" }}>
        <SubpageHero>
          <div className="hero-anim svc-crumb" style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0 }}>
            <a href={`${sBase}`} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: FS_BODY, color: "var(--text-muted)", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = DARK)}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <ArrowLeft size={13} /> {t("breadcrumbServices")}
            </a>
            {}
            <span className="svc-crumb-sep" style={{ color: "var(--text-faint)", fontSize: FS_BODY }}>/</span>
            <span className="svc-crumb-current" style={{ fontSize: FS_BODY, color: "var(--text-muted)" }}>{service.name}</span>
          </div>
          <h1 className="svc-title" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: "-0.044em", lineHeight: 1.0, overflowWrap: "anywhere" }}>
            {titleWords.map((word, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i < titleWords.length - 1 ? "0.25em" : 0, paddingTop: "0.15em", paddingBottom: "0.1em" }}>
                <span className="word-inner" style={{ display: "inline-block" }}>{word}</span>
              </span>
            ))}
          </h1>
        </SubpageHero>
      </section>

      {}
      <section className="intro-section" style={{ backgroundColor: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {}
          <div className="intro-anim" style={{ opacity: 0 }}>
            <p className="service-tagline" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H3, color: DARK, margin: "0 0 20px", letterSpacing: "-0.025em", lineHeight: 1.35, maxWidth: 800 }}>{service.overview}</p>
            <div style={{ height: 1, backgroundColor: "var(--border)" }} />
          </div>
        </div>
      </section>

      {}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 1, minWidth: 0 }}>

      {}
      <section className="features-section" style={{ backgroundColor: CREAM }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="pkg-head">
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("servicePackage")}</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
                {t("whatsIncluded")} <span style={{ color: DARK }}>{t("whatsIncludedAccent")}</span>
              </h2>
              <p className="pkg-note" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 300 }}>{t("packageSubtext")}</p>
            </div>
          </div>
          <div className="pkg-rule" style={{ height: 1, backgroundColor: "var(--border)" }} />
          {}
          <div
            className={service.features.length === 4 ? "features-bento features-bento-2col" : "features-bento features-bento-3col"}
            style={{ display: "grid", gap: 12 }}
          >
            {service.features.map((f, i) => <FeatureCard key={i} title={f.title} description={f.description} />)}
          </div>

          {}
          <div className="whatget-row" style={{ display: "grid", alignItems: "start" }}>
            <div className="whatget-anim" style={{ opacity: 0 }}>
              <p style={{ fontSize: FS_LABEL, fontWeight: 700, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px" }}>{t("whatYouGet")}</p>
              <div className="whatget-list" style={{ display: "grid" }}>
                {service.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, backgroundColor: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 18, color: "var(--text-soft)", lineHeight: 1.6 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="whatget-anim" style={{ opacity: 0 }}>
              <button onClick={openContact} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: BRAND_SOLID, color: "#fff", fontWeight: 700, fontSize: 18, padding: "13px 24px", borderRadius: 9, marginBottom: 10, transition: "opacity 280ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              ><Phone size={14} strokeWidth={1.8} /> {t("freeConsultation")}</button>
              <a href={`${homeBase}#services`} style={{ display: "flex", width: "100%", boxSizing: "border-box", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "transparent", color: DARK, fontWeight: 500, fontSize: 18, padding: "12px 24px", borderRadius: 9, textDecoration: "none", border: `1px solid ${mix(DARK, 13)}`, transition: "border-color 300ms ease, background-color 300ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${mix(DARK, 31)}`; (e.currentTarget as HTMLElement).style.backgroundColor = `${mix(DARK, 2)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${mix(DARK, 13)}`; (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >{t("allServices")} <ArrowUpRight size={15} /></a>
            </div>
          </div>

          {}
          {}
          <div className="targets-row" style={{ position: "relative" }}>
            <img
              className="targets-figure-stacked"
              src="/ServiceForUHumanImage.avif" alt="" aria-hidden="true" loading="lazy"
              style={{ position: "absolute", top: 0, zIndex: 0, width: "auto", objectFit: "contain", pointerEvents: "none" }}
            />
            <div className="targets-card" style={{ backgroundColor: INVERT, borderRadius: 18, display: "flex", position: "relative", zIndex: 1, overflow: "visible" }}>
              <div className="targets-lede">
                <p style={{ fontSize: 16, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 }}>{t("suitableFor")}</p>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H4_MOBILE, color: "#ffffff", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.25, maxWidth: 180 }}>{t("doesThisServeYou")}</p>
              </div>
              <div className="targets-figure-inline" style={{ position: "relative", width: 180, flexShrink: 0, alignSelf: "stretch", overflow: "visible" }}>
                <img src="/ServiceForUHumanImage.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", bottom: -36, left: 0, height: 210, width: "auto", objectFit: "contain", pointerEvents: "none" }} />
              </div>
              <div className="targets-pills" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignSelf: "center", position: "relative", zIndex: 1 }}>
                {service.targets.map((target, i) => (
                  <div key={i} className="target-pill" style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9, padding: "9px 14px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ACCENT, flexShrink: 0 }} />
                    <span style={{ fontSize: FS_LABEL, fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>{target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section ref={processRef} style={{ backgroundColor: "var(--surface)", overflow: "hidden" }}>
        <div className="proc-header" style={{ margin: "0 auto" }}>
          <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("stepByStep")}</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
              {t("howItWorks")} <span style={{ color: DARK }}>{t("howItWorksAccent")}</span>
            </h2>
            <p className="proc-note" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>{t("stepsSupport", { count: service.process.length })}</p>
          </div>
        </div>
        <div className="proc-body" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="proc-grid" style={{ display: "grid", gap: 14 }}>
            {service.process.map((p, i) => <ProcessStepCard key={i} step={p.step} title={p.title} description={p.description} />)}
          </div>
        </div>
      </section>

      </div>
      <ServicesSidebar
        allServices={allServices}
        currentSlug={service.slug}
        locale={locale}
        isMobile={isMobile}
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />
      </div>

      {}
      <section className="spcta-section" style={{ backgroundColor: "var(--surface)" }}>
        <div className="spcta-wrap" style={{ margin: "0 auto" }}>
          <div className="spcta-card" style={{ backgroundColor: INVERT, borderRadius: 24, position: "relative", overflow: "visible", display: "flex" }}>
            <div style={{ position: "absolute", top: 0, left: 80, right: 80, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.4 }} />
            <img className="spcta-figure" src="/ServicesCTAHumanImage.avif" alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", width: "auto", objectFit: "contain", objectPosition: "bottom", pointerEvents: "none", zIndex: 0 }} />
            <div className="spcta-body" style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1, width: "100%" }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("ctaReadyLabel")}</p>
                <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H3, color: "#ffffff", margin: "0 0 14px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                  {t("ctaHeading")}<br /><span style={{ color: ACCENT }}>{t("ctaHeadingAccent")}</span>
                </h2>
                <p style={{ fontSize: 18, color: "var(--invert-text-muted)", lineHeight: 1.75, margin: 0 }}>{t("ctaSubtext", { serviceName: service.name.toLowerCase() })}</p>
              </div>
              <div className="spcta-actions" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button onClick={openContact} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: 18, padding: "14px 32px", borderRadius: 9, whiteSpace: "nowrap", transition: "transform 200ms, background-color 200ms", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg-hover)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cta-bg)"; }}
                ><Phone size={15} strokeWidth={1.8} /> {t("ctaPrimary")}</button>
                <a href={`${homeBase}#services`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.07)", color: "#ffffff", fontWeight: 500, fontSize: 18, padding: "13px 32px", borderRadius: 9, textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)", whiteSpace: "nowrap", transition: "all 200ms" }}
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
