"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanSearch, Users, Layers, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { PLH_DARK, PLH_MID, PLH_ACC, PLH_TEXT, CREAM, mix } from "@/app/lib/brand";
import { FS_BODY, FS_H2, FS_LABEL, FS_CHIP, FS_H4_MOBILE } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const FEAT_ICONS = [ScanSearch, Users, Layers];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PHOTO_POS = "50% 32%";


export function PartnerSection() {
  const t      = useTranslations("partner");

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLImageElement>(null);

  const features = [0, 1, 2].map(i => ({
    Icon:  FEAT_ICONS[i],
    title: t(`features.${i}.title` as Parameters<typeof t>[0]),
    desc:  t(`features.${i}.desc`  as Parameters<typeof t>[0]),
  }));

  const tags = [t("tags.0"), t("tags.1"), t("tags.2")] as string[];

  useEffect(() => {
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.fromTo(".partner-hdr",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(cardRef.current, { opacity: 0, y: 28, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true } });
      gsap.fromTo(frameRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.15, scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".partner-feat", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.75, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: ".partner-features", start: "top 82%", once: true } });

      if (reduce) return;



      gsap.fromTo(photoRef.current, { scale: 1.16 }, { scale: 1.08, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true } });
      gsap.fromTo(photoRef.current, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: cardRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, sectionRef);

    return () => ctx.revert();



  }, []);



  const photoPanel = (
    <div
      key="photo"
      ref={frameRef}
      className="partner-photo"
      style={{
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        backgroundColor: PLH_MID,
      }}
    >
      <img
        ref={photoRef}
        src="/PartnerImage.avif"
        alt={t("photoAlt")}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: PHOTO_POS,
          transform: "scale(1.08)",
          willChange: "transform",
        }}
      />

      {}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${mix(PLH_DARK, 8)} 0%, ${mix(PLH_DARK, 4)} 42%, ${mix(PLH_DARK, 62)} 100%)`,
          pointerEvents: "none",
        }}
      />

      {}
      <div
        aria-hidden="true"
        className="partner-seam"
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.14)",
          pointerEvents: "none",
        }}
      />

      {}
      <div
        className="partner-lockup-chip"
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "9px 15px",
          borderRadius: 999,
          backgroundColor: "rgba(9,44,58,0.44)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_CHIP, color: "#ffffff", letterSpacing: "0.06em" }}>ProFinance</span>
        <span aria-hidden="true" style={{ fontSize: FS_CHIP, color: PLH_ACC, lineHeight: 1 }}>&times;</span>
        <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_CHIP, color: "#ffffff", letterSpacing: "0.06em" }}>PLH</span>
      </div>
    </div>
  );


  const contentPanel = (
    <div
      key="content"
      className="partner-content"
      style={{
        background: `linear-gradient(145deg, ${PLH_DARK} 0%, ${PLH_MID} 100%)`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${mix(PLH_ACC, 10)} 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="partner-logo-wrap">
          <img className="partner-logo" src="/PLHLogo.avif" alt={t("firmName")} loading="lazy" decoding="async" style={{ width: "auto", objectFit: "contain", display: "block" }} />
          <span className="partner-firm" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, display: "block" }}>{t("firmName")}</span>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 24 }} />
        <p style={{ fontSize: FS_BODY, color: "var(--invert-text-muted)", lineHeight: 1.82, margin: "0 0 24px", maxWidth: 460 }}>{t("description")}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {tags.map(tag => (
            <span key={tag} style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "7px 16px", fontSize: FS_LABEL, fontWeight: 500, color: "var(--invert-text-muted)" }}>{tag}</span>
          ))}
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 28 }} />

        <a href="https://plh.az" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: PLH_ACC, fontSize: FS_BODY, fontWeight: 600, textDecoration: "none", transition: "gap 220ms", letterSpacing: "0.02em", alignSelf: "flex-start" }}
          onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
          onMouseLeave={e => (e.currentTarget.style.gap = "7px")}
        >{t("visitSite")} <ArrowUpRight size={16} strokeWidth={2} /></a>
      </div>
    </div>
  );

  return (
    <section id="partner" ref={sectionRef} className="partner-section" style={{ backgroundColor: CREAM, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {}
        <div className="partner-hdr" style={{ display: "flex", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: PLH_ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {}
              {t("heading")} <span style={{ color: PLH_TEXT }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 340 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: mix(PLH_ACC, 19), marginBottom: 36 }} />

        {}
        <div
          ref={cardRef}
          className="partner-card"
          style={{
            display: "grid",
            borderRadius: 24,
            overflow: "hidden",
            marginBottom: 14,
            opacity: 0,
            boxShadow: "0 28px 72px rgba(9,44,58,0.22)",
          }}
        >
          {}
          {[contentPanel, photoPanel]}
        </div>

        {}
        <div className="partner-features" style={{ display: "grid", gap: 14 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="partner-feat" style={{ backgroundColor: "var(--surface)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 16, opacity: 0, borderTop: "3px solid transparent", transition: "box-shadow 320ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), border-top-color 280ms ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 36px color-mix(in srgb, var(--brand) 9%, transparent)"; el.style.transform = "translateY(-4px)"; el.style.borderTopColor = PLH_ACC; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; el.style.borderTopColor = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: mix(PLH_ACC, 8), border: `1.5px solid ${mix(PLH_ACC, 19)}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={PLH_ACC} strokeWidth={1.7} />
                </div>
                <span aria-hidden="true" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_CHIP, color: PLH_ACC, letterSpacing: "0.12em" }}>{`0${i + 1}`}</span>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H4_MOBILE, color: "var(--text)", margin: "0 0 8px", letterSpacing: "-0.015em" }}>{title}</p>
                <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
