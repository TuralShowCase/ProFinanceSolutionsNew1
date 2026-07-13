"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Layers, Zap, ShieldCheck, TrendingUp, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DARK, INVERT } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Lightbulb, Layers, Zap, ShieldCheck, TrendingUp];
const AUTO_ADVANCE_MS = 4500;

export function WhyUsSection() {
  const t  = useTranslations("whyUs");
  const bp = useBreakpoint();

  const outerRef        = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const hintRef         = useRef<HTMLDivElement>(null);
  const activeIndexRef  = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = Array.from({ length: 5 }, (_, i) => ({
    title:       t(`items.${i}.title` as Parameters<typeof t>[0]),
    description: t(`items.${i}.description` as Parameters<typeof t>[0]),
    Icon:        ICONS[i],
  }));

  useEffect(() => {
    if (bp === "mobile") return;
    const ctx = gsap.context(() => {
      gsap.set(".why-entrance", { opacity: 0, y: 18 });
      gsap.to(".why-entrance", { opacity: 1, y: 0, duration: 0.95, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: outerRef.current, start: "top 85%", once: true } });
      gsap.to(hintRef.current, { y: 6, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut" });
      gsap.to({}, { scrollTrigger: { trigger: outerRef.current, start: "top top", end: "bottom bottom", scrub: 0.6, onUpdate: (self) => {
        if (progressBarRef.current) progressBarRef.current.style.width = `${self.progress * 100}%`;
        const newIndex = Math.min(Math.floor(self.progress * items.length), items.length - 1);
        if (newIndex !== activeIndexRef.current) { activeIndexRef.current = newIndex; setActiveIndex(newIndex); }
      } } });
    }, outerRef);
    return () => ctx.revert();
  }, [bp, items.length]);

  useEffect(() => {
    if (bp === "mobile" || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => { const next = Math.min(prev + 1, items.length - 1); activeIndexRef.current = next; return next; });
    }, AUTO_ADVANCE_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [bp, isPaused, items.length]);

  useEffect(() => {
    if (bp === "mobile") return;
    if (rightContentRef.current) {
      gsap.fromTo(rightContentRef.current, { opacity: 0, y: 24, scale: 0.99, filter: "blur(3px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" });
    }
  }, [activeIndex, bp]);

  if (bp === "mobile") return <WhyUsMobileAccordion items={items} t={t} />;

  const isTablet = bp === "tablet";
  const point   = items[activeIndex];
  const PointIcon = point.Icon;
  const leftPadding  = isTablet ? "48px 24px 48px 32px" : "60px 32px 60px 48px";
  const rightPadding = isTablet ? "48px 40px 48px 48px" : "60px 56px 60px 72px";

  return (
    <div ref={outerRef} style={{ height: "300vh", position: "relative" }}>
      <div ref={stickyRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} style={{ position: "sticky", top: 0, height: "100vh", display: "flex", overflow: "hidden" }}>

        {/* Left */}
        <div style={{ flex: "0 0 46%", backgroundColor: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", padding: leftPadding, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -16, left: -8, fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 220, color: "color-mix(in srgb, var(--brand) 4.5%, transparent)", lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none", pointerEvents: "none" }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 24, position: "relative", zIndex: 1 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="why-entrance" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 20px 0" }}>{t("sectionLabel")}</p>
              <h2 className="why-entrance" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3vw, 44px)", color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08 }}>
                {t("heading")}{" "}<span style={{ color: DARK }}>{t("headingAccent")}</span>
              </h2>
              <div className="why-entrance" style={{ height: 1, backgroundColor: "var(--border)", margin: "32px 0 24px" }} />
              <div className="why-entrance" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((p, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 14px 11px 12px", borderRadius: 8, borderLeft: `3px solid ${isActive ? DARK : "transparent"}`, backgroundColor: isActive ? "color-mix(in srgb, var(--brand) 5%, transparent)" : "transparent", opacity: isActive ? 1 : 0.42, transition: "all 380ms ease" }}>
                      <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: isActive ? DARK : "var(--text-faint)", letterSpacing: "0.08em", minWidth: 20, flexShrink: 0, transition: "color 380ms ease" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? "var(--text)" : "var(--text-muted)", transition: "all 380ms ease", lineHeight: 1.3 }}>{p.title}</span>
                    </div>
                  );
                })}
              </div>
              <div className="why-entrance" style={{ marginTop: 28, paddingLeft: 12 }}>
                <div style={{ height: 2, backgroundColor: "var(--border)", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                  <div ref={progressBarRef} style={{ height: "100%", width: "0%", backgroundColor: DARK, borderRadius: 2 }} />
                </div>
                <div ref={hintRef} style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--text-faint)", fontSize: 11, fontFamily: "var(--font-inter), 'Inter', sans-serif", letterSpacing: "0.06em" }}>
                  <ArrowDown size={10} strokeWidth={2} />{t("scrollHint")}
                </div>
              </div>
            </div>
            {!isTablet && (
              <div style={{ flexShrink: 0, width: 245, alignSelf: "stretch", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 140, height: 18, background: "radial-gradient(ellipse, rgba(0,0,0,0.13) 0%, transparent 72%)", pointerEvents: "none", zIndex: 0 }} />
                <img src="/WhyUsHuman.avif" alt="" aria-hidden="true" loading="lazy" style={{ height: 410, width: "auto", objectFit: "contain", display: "block", filter: "drop-shadow(-4px 0 18px rgba(0,0,0,0.13))", position: "relative", zIndex: 1 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, color-mix(in srgb, var(--surface) 82%, transparent) 0%, color-mix(in srgb, var(--surface) 35%, transparent) 55%, transparent 100%)", pointerEvents: "none", zIndex: 2 }} />
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ flex: 1, backgroundColor: INVERT, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: rightPadding, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -100, right: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 18%, transparent) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 10%, transparent) 0%, transparent 68%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
          <div ref={rightContentRef} style={{ maxWidth: isTablet ? 360 : 480, width: "100%", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 44 }}>
              <div style={{ width: 62, height: 62, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <PointIcon size={26} color="#FFFFFF" strokeWidth={1.6} />
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "5px 14px" }}>
                <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              </div>
            </div>
            <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isTablet ? "clamp(24px, 3vw, 36px)" : "clamp(28px, 3.2vw, 46px)", color: "#FFFFFF", margin: "0 0 18px 0", letterSpacing: "-0.04em", lineHeight: 1.05 }}>{point.title}</h3>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginBottom: 22 }} />
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.82, margin: "0 0 44px 0" }}>{point.description}</p>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {items.map((_, i) => (
                <div key={i} style={{ height: 3, width: i === activeIndex ? 28 : 8, borderRadius: 2, backgroundColor: i === activeIndex ? "var(--accent-green)" : i < activeIndex ? "color-mix(in srgb, var(--accent-green) 35%, transparent)" : "rgba(255,255,255,0.15)", transition: "width 400ms ease, background-color 400ms ease" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyUsMobileAccordion({ items, t }: { items: { title: string; description: string; Icon: React.ElementType }[]; t: ReturnType<typeof useTranslations<"whyUs">> }) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".why-entrance", { opacity: 0, y: 18 });
      gsap.to(".why-entrance", { opacity: 1, y: 0, duration: 0.95, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: outerRef.current, start: "top 85%", once: true } });
    }, outerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={outerRef} style={{ backgroundColor: "var(--surface)", padding: "64px 20px 56px", fontFamily: "var(--font-inter), 'Inter', sans-serif", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="why-entrance" style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 20px 0" }}>{t("sectionLabel")}</p>
          <h2 className="why-entrance" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 7vw, 36px)", color: "var(--text)", margin: "0 0 32px 0", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            {t("heading")}{" "}<span style={{ color: DARK }}>{t("headingAccent")}</span>
          </h2>
        </div>
        <div style={{ flexShrink: 0, position: "relative", pointerEvents: "none" }}>
          <img src="/WhyUsHuman.avif" alt="" aria-hidden="true" loading="lazy" style={{ height: 160, width: "auto", display: "block", filter: "drop-shadow(-3px 0 14px rgba(0,0,0,0.10))", opacity: 0.9 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%", background: "linear-gradient(to top, var(--surface), transparent)", pointerEvents: "none" }} />
        </div>
      </div>

      <div className="why-entrance" style={{ height: 1, backgroundColor: "var(--border)", margin: "0 0 24px", position: "relative", zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {items.map((point, i) => {
          const isOpen = openIndex === i;
          const PointIcon = point.Icon;
          return (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpenIndex(isOpen ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: isOpen ? DARK : "var(--text-faint)", minWidth: 20, flexShrink: 0, transition: "color 280ms" }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, backgroundColor: isOpen ? "color-mix(in srgb, var(--brand) 10%, transparent)" : "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 280ms" }}>
                  <PointIcon size={17} color={isOpen ? DARK : "var(--text-faint)"} strokeWidth={1.7} />
                </div>
                <span style={{ flex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: isOpen ? 600 : 400, fontSize: 16, color: isOpen ? "var(--text)" : "var(--text-muted)", transition: "all 280ms" }}>{point.title}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transition: "transform 280ms", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <path d="M4 6L8 10L12 6" stroke="var(--text-faint)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 480ms cubic-bezier(0.4, 0, 0.2, 1)" }}>
                <div style={{ paddingBottom: 20, paddingLeft: 70 }}>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{point.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
