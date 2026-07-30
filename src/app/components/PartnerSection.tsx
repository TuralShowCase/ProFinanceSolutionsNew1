"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanSearch, Users, Layers, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { PLH_DARK, PLH_MID, PLH_ACC, PLH_TEXT, CREAM, mix } from "@/app/lib/brand";
import { FS_BODY, FS_H2, FS_LABEL, FS_CHIP, FS_H4_MOBILE, FS_H4_DESKTOP } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const FEAT_ICONS = [ScanSearch, Users, Layers];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The photo is a landscape 3:2 frame with a person in each outer third and the
// desk in the middle. Any gradient scrim on an inner edge would land on a face,
// so the panel/photo boundary is a deliberate hard split + hairline instead.
// Vertical bias sits above centre: faces and hands up top, desk clutter below.
const PHOTO_POS = "50% 32%";

export function PartnerSection() {
  const t      = useTranslations("partner");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const stacked  = isMobile || isTablet;

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

      // Ken-Burns settle, then a slow scrubbed drift. Baseline scale 1.08 leaves
      // 4% of headroom each side, so the ±3% drift never exposes a frame edge.
      gsap.fromTo(photoRef.current, { scale: 1.16 }, { scale: 1.08, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: cardRef.current, start: "top 82%", once: true } });
      gsap.fromTo(photoRef.current, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: cardRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const pad = isMobile ? "64px 20px 72px" : isTablet ? "80px 28px 88px" : "100px 40px 108px";

  /* ---- Photo panel: full-bleed on the card's right (desktop) or top (stacked) ---- */
  const photoPanel = (
    <div
      key="photo"
      ref={frameRef}
      style={{
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        // Stacked: intrinsic landscape band reserves height up front (no CLS).
        // Ratios stay close to the source's native 3:2 — mobile shows it
        // uncropped, tablet trims ~16% of the height. Anything wider (21:9)
        // starts cutting the tops of both heads.
        // Desktop: stretches to the content column, so no ratio is imposed.
        aspectRatio: stacked ? (isMobile ? "3 / 2" : "16 / 9") : undefined,
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

      {/* Teal grade — pulls the photo into PLH's palette and darkens the base
          just enough for the lockup to read. Never touches the faces. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${mix(PLH_DARK, 8)} 0%, ${mix(PLH_DARK, 4)} 42%, ${mix(PLH_DARK, 62)} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Hairline on the edge shared with the content panel — below when
          stacked, to the left on desktop — so the split reads as deliberate */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,0.14)",
          pointerEvents: "none",
          ...(stacked
            ? { left: 0, right: 0, bottom: 0, height: 1 }
            : { left: 0, top: 0, bottom: 0, width: 1 }),
        }}
      />

      {/* Partnership lockup */}
      <div
        style={{
          position: "absolute",
          right: isMobile ? 16 : 22,
          bottom: isMobile ? 16 : 22,
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

  /* ---- Content panel ---- */
  const contentPanel = (
    <div
      key="content"
      style={{
        background: `linear-gradient(145deg, ${PLH_DARK} 0%, ${PLH_MID} 100%)`,
        padding: isMobile ? "36px 28px 40px" : isTablet ? "48px 48px 52px" : "64px 64px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${mix(PLH_ACC, 10)} 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: isMobile ? 22 : 28 }}>
          <img src="/PLHLogo.avif" alt={t("firmName")} loading="lazy" decoding="async" style={{ height: isMobile ? 88 : isTablet ? 110 : 130, width: "auto", objectFit: "contain", display: "block", marginBottom: isMobile ? 14 : 20 }} />
          <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? FS_H4_MOBILE : FS_H4_DESKTOP, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, display: "block" }}>{t("firmName")}</span>
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
    <section ref={sectionRef} style={{ backgroundColor: CREAM, padding: pad, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="partner-hdr" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 16 : 40, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: PLH_ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {/* PLH_TEXT, not PLH_DARK: the raw deep teal is a panel-background
                  value and all but vanishes on the dark theme's near-black bg.
                  PLH_TEXT is the theme-flipping partner text token (as used in
                  Header.tsx) and stays legible in both. */}
              {t("heading")} <span style={{ color: PLH_TEXT }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 340 }}>{t("subtext")}</p>
        </div>

        <div style={{ height: 1, backgroundColor: mix(PLH_ACC, 19), marginBottom: 36 }} />

        {/* Main card — content panel + full-bleed partnership photo */}
        <div
          ref={cardRef}
          style={{
            display: "grid",
            gridTemplateColumns: stacked ? "1fr" : "1.02fr 0.98fr",
            borderRadius: 24,
            overflow: "hidden",
            marginBottom: 14,
            minHeight: stacked ? undefined : 500,
            opacity: 0,
            boxShadow: "0 28px 72px rgba(9,44,58,0.22)",
          }}
        >
          {/* Stacked reads photo-first: the image sets up the partnership before
              the copy explains it. Rendered as a KEYED ARRAY, not a fragment —
              a fragment reconciles these two by position, so flipping the order
              at the breakpoint made React reuse each node as the other panel.
              gsap.context().revert() then restored the photo's cached
              `opacity: 0` onto whatever node now sat in that slot, leaving the
              content panel invisible on tablet/mobile. Keys pin each panel to
              its own DOM node so the swap moves nodes instead of recycling them. */}
          {stacked ? [photoPanel, contentPanel] : [contentPanel, photoPanel]}
        </div>

        {/* How the partnership works — an ordered 3-step flow, not 3 parallel features */}
        <div className="partner-features" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="partner-feat" style={{ backgroundColor: "var(--surface)", borderRadius: 16, padding: isMobile ? "24px 20px" : "28px 28px", display: "flex", flexDirection: "column", gap: 16, opacity: 0, borderTop: "3px solid transparent", transition: "box-shadow 320ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), border-top-color 280ms ease" }}
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
