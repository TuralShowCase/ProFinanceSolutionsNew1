"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Eye, ShieldCheck, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { DARK, ACCENT, CREAM, mix } from "@/app/lib/brand";
import { FS_LABEL, FS_H2, FS_H3, FS_H4_MOBILE } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const ICONS  = [Award, Eye, ShieldCheck, BarChart3];

export function AboutValues() {
  const t      = useTranslations("about.values");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionRef     = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const borderRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const headerRowRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const ghostRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const iconBoxRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const iconFilterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs      = useRef<(HTMLHeadingElement | null)[]>([]);
  const numLabelRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(-1);

  const values = ICONS.map((Icon, i) => ({
    Icon,
    number: `0${i + 1}`,
    title:       t(`items.${i}.title`       as Parameters<typeof t>[0]),
    description: t(`items.${i}.description` as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      descRefs.current.forEach(d => { if (d) gsap.set(d, { height: 0 }); });
      borderRefs.current.forEach(b => { if (b) gsap.set(b, { scaleY: 0, transformOrigin: "top center" }); });
      ghostRefs.current.forEach(g => { if (g) gsap.set(g, { opacity: 0 }); });
      iconBoxRefs.current.forEach(box => { if (box) gsap.set(box, { backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--brand) 45%, transparent)" }); });
      iconFilterRefs.current.forEach(wrap => { if (wrap) gsap.set(wrap, { clearProps: "filter" }); });
      titleRefs.current.forEach(t => { if (t) gsap.set(t, { color: "var(--text-faint)" }); });
      numLabelRefs.current.forEach(n => { if (n) gsap.set(n, { color: "color-mix(in srgb, var(--brand) 30%, transparent)" }); });
      dotRefs.current.forEach(d => { if (d) gsap.set(d, { height: 8, backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)" }); });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });

      activeIndexRef.current = 0;
      if (descRefs.current[0])      gsap.set(descRefs.current[0],      { height: "auto" });
      if (borderRefs.current[0])    gsap.set(borderRefs.current[0],    { scaleY: 1, transformOrigin: "top center" });
      if (ghostRefs.current[0])     gsap.set(ghostRefs.current[0],     { opacity: 0.055 });
      if (iconBoxRefs.current[0])   gsap.set(iconBoxRefs.current[0],   { backgroundColor: DARK, boxShadow: `0 0 0 1.5px ${DARK}` });
      if (iconFilterRefs.current[0]) gsap.set(iconFilterRefs.current[0], { filter: "brightness(0) invert(1)" });
      if (titleRefs.current[0])     gsap.set(titleRefs.current[0],     { color: "var(--text)" });
      if (numLabelRefs.current[0])  gsap.set(numLabelRefs.current[0],  { color: DARK });
      if (dotRefs.current[0])       gsap.set(dotRefs.current[0],       { height: 24, backgroundColor: DARK });

      function snapClosed(i: number) {
        if (descRefs.current[i])      gsap.set(descRefs.current[i],      { height: 0 });
        if (borderRefs.current[i])    gsap.set(borderRefs.current[i],    { scaleY: 0, transformOrigin: "bottom center" });
        if (ghostRefs.current[i])     gsap.set(ghostRefs.current[i],     { opacity: 0 });
        if (iconBoxRefs.current[i])   gsap.set(iconBoxRefs.current[i],   { backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--brand) 45%, transparent)", scale: 1 });
        if (iconFilterRefs.current[i]) gsap.set(iconFilterRefs.current[i], { clearProps: "filter" });
        if (titleRefs.current[i])     gsap.set(titleRefs.current[i],     { color: "var(--text-faint)" });
        if (numLabelRefs.current[i])  gsap.set(numLabelRefs.current[i],  { color: "color-mix(in srgb, var(--brand) 30%, transparent)" });
        if (dotRefs.current[i])       gsap.set(dotRefs.current[i],       { height: 8, backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)" });
      }

      function openCard(idx: number, prev: number) {
        values.forEach((_, i) => { if (i !== idx && i !== prev) snapClosed(i); });
        if (prev >= 0 && prev !== idx) {
          gsap.to(descRefs.current[prev],   { height: 0, duration: 0.38, ease: "power2.inOut", overwrite: true });
          gsap.to(borderRefs.current[prev], { scaleY: 0, duration: 0.32, ease: "power2.in", transformOrigin: "bottom center", overwrite: true });
          gsap.to(ghostRefs.current[prev],  { opacity: 0, duration: 0.24, overwrite: true });
          gsap.to(iconBoxRefs.current[prev],{ backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--brand) 45%, transparent)", duration: 0.28, overwrite: true });
          if (iconFilterRefs.current[prev]) gsap.set(iconFilterRefs.current[prev], { clearProps: "filter" });
          gsap.to(titleRefs.current[prev],  { color: "var(--text-faint)", duration: 0.28, overwrite: true });
          gsap.to(numLabelRefs.current[prev], { color: "color-mix(in srgb, var(--brand) 30%, transparent)", duration: 0.28, overwrite: true });
          gsap.to(dotRefs.current[prev],    { height: 8, backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)", duration: 0.26, overwrite: true });
        }
        gsap.to(descRefs.current[idx],   { height: "auto", duration: 0.55, ease: "expo.out", overwrite: true });
        gsap.to(borderRefs.current[idx], { scaleY: 1, duration: 0.52, ease: "expo.out", transformOrigin: "top center", overwrite: true });
        gsap.to(ghostRefs.current[idx],  { opacity: 0.055, duration: 0.55, overwrite: true });
        if (iconFilterRefs.current[idx]) gsap.set(iconFilterRefs.current[idx], { filter: "brightness(0) invert(1)" });
        gsap.to(titleRefs.current[idx],  { color: "var(--text)", duration: 0.34, overwrite: true });
        gsap.to(numLabelRefs.current[idx], { color: DARK, duration: 0.34, overwrite: true });
        gsap.to(dotRefs.current[idx],    { height: 24, backgroundColor: DARK, duration: 0.36, ease: "back.out(1.5)", overwrite: true });
        gsap.fromTo(iconBoxRefs.current[idx], { scale: 0.82 }, { scale: 1, backgroundColor: DARK, boxShadow: `0 0 0 1.5px ${DARK}`, duration: 0.48, ease: "back.out(2)", overwrite: true });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current, pin: true, start: "top top", end: "+=300%", scrub: 1.5,
        onUpdate(self) {
          gsap.set(progressBarRef.current, { scaleX: self.progress });
          const idx = Math.min(Math.floor(self.progress * 4), 3);
          if (idx !== activeIndexRef.current) { const prev = activeIndexRef.current; activeIndexRef.current = idx; openCard(idx, prev); }
        },
      });

      gsap.fromTo(".val-hdr", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 84%", once: true } });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet, mounted]);

  // Mobile / Tablet
  if (!mounted || isMobile || isTablet) {
    return (
      <section id="values" style={{ backgroundColor: CREAM, padding: "56px 20px 64px", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        <p style={{ fontSize: FS_LABEL, fontWeight: 700, color: DARK, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 12px" }}>{t("sectionLabel")}</p>
        <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "var(--text)", margin: "0 0 32px", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
          {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {values.map((v, i) => (
            <div key={i} style={{ backgroundColor: "var(--surface)", borderRadius: 16, padding: "20px 18px", display: "flex", flexDirection: "row", gap: 16, alignItems: "flex-start", borderLeft: `3px solid ${DARK}` }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, backgroundColor: `${mix(DARK, 6)}`, border: `1.5px solid ${mix(DARK, 13)}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <v.Icon size={18} color={DARK} strokeWidth={1.6} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: "0.12em", opacity: 0.45 }}>{v.number}</span>
                  <h3 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H4_MOBILE, color: "var(--text)", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{v.title}</h3>
                </div>
                <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop
  return (
    <section id="values" ref={sectionRef} style={{ backgroundColor: CREAM, position: "relative", overflow: "hidden" }}>
      <div className="val-inner" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div className="val-hdr">
          <p style={{ fontSize: FS_LABEL, fontWeight: 700, color: DARK, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 14px" }}>{t("sectionLabel")}</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.04em", lineHeight: 1.06 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
            <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.72, margin: 0, maxWidth: 310, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>{t("subtext")}</p>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {values.map((v, i) => (
            <div key={i} style={{ position: "relative", borderTop: "1px solid var(--border)" }}>
              <div ref={el => { borderRefs.current[i] = el; }} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, borderRadius: 2, backgroundColor: DARK, transform: "scaleY(0)", transformOrigin: "top center", zIndex: 2 }} />
              <span ref={el => { ghostRefs.current[i] = el; }} className="val-ghost" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 900, color: DARK, opacity: 0, letterSpacing: "-0.06em", lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0 }}>{v.number}</span>
              <div ref={el => { headerRowRefs.current[i] = el; }} className="val-row" style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
                <span ref={el => { numLabelRefs.current[i] = el; }} style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_LABEL, color: "color-mix(in srgb, var(--brand) 30%, transparent)", letterSpacing: "0.12em", flexShrink: 0 }} className="val-num">{v.number}</span>
                <div ref={el => { iconBoxRefs.current[i] = el; }} className="val-iconbox" style={{ borderRadius: 13, flexShrink: 0, boxShadow: "0 0 0 1.5px color-mix(in srgb, var(--brand) 45%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand) 7%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div ref={el => { iconFilterRefs.current[i] = el; }} style={{ display: "flex" }}>
                    <v.Icon color={DARK} strokeWidth={1.6} />
                  </div>
                </div>
                <h3 ref={el => { titleRefs.current[i] = el; }} style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H3, color: "var(--text-faint)", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{v.title}</h3>
              </div>
              <div ref={el => { descRefs.current[i] = el; }} style={{ overflow: "hidden", height: 0 }}>
                <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.78, margin: 0, fontFamily: "var(--font-inter), 'Inter', sans-serif", maxWidth: 580, paddingBottom: 26, paddingTop: 2 }} className="val-desc">{v.description}</p>
              </div>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: "var(--border)" }} />
        </div>
      </div>

      {/* Progress dots */}
      <div className="val-dots" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 20 }}>
        {values.map((_, i) => <div key={i} ref={el => { dotRefs.current[i] = el; }} style={{ width: 3, height: 8, borderRadius: 4, backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)" }} />)}
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "color-mix(in srgb, var(--brand) 6%, transparent)", zIndex: 20, overflow: "hidden" }}>
        <div ref={progressBarRef} style={{ height: "100%", width: "100%", background: `linear-gradient(90deg, ${DARK}, ${ACCENT})`, transformOrigin: "left center" }} />
      </div>
    </section>
  );
}
