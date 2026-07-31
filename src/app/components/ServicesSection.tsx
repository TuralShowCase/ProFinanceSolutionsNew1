"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { localizedSlug, AZ_SLUGS } from "../services/servicesData";
import { DARK, INVERT, mix } from "@/app/lib/brand";
import {
  FS_H2, FS_H3, FS_H4_MOBILE,
  FS_BODY, FS_LABEL,
} from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The 3D render for each service. These carry the visual weight of the whole
   section — every card shows one, at full size on a tinted plate, so the 8
   objects read as one commissioned set rather than decorative fill. */
const SERVICE_IMAGES: Record<string, string> = {
  "ucotun-diaqnostikasi-ve-berpasi":  "/UcotunDiaqnostikasi.avif",
  "muhasibat-konsaltinqi":            "/MuhasibatKonsaltinqi.avif",
  "vergi-konsaltinqi":                "/VergiKonsaltinqi.avif",
  "maliyye-ve-idareetme-konsaltinqi": "/MaliyyeKonsaltinqi.avif",
  "emeliyyat-ve-reqemsal-konsaltinq": "/ReqemsalKonsaltinq.avif",
  "hr-ve-kadrlar-konsaltinqi":        "/HRKonsaltinqi.avif",
  "telim-ve-inkisaf":                 "/TelimInkisaf.avif",
  "auditor-xidmetleri":               "/AuditorXidmetleri.avif",
};

/* Intrinsic pixel dimensions of each render — passed to <img> so the browser
   reserves the box before decode (no layout shift on a grid of 8 images). */
const IMG_DIMS: Record<string, [number, number]> = {
  "/UcotunDiaqnostikasi.avif":  [1375, 1144],
  "/MuhasibatKonsaltinqi.avif": [1422, 1106],
  "/VergiKonsaltinqi.avif":     [1178, 1335],
  "/MaliyyeKonsaltinqi.avif":   [1295, 1215],
  "/ReqemsalKonsaltinq.avif":   [1537, 1023],
  "/HRKonsaltinqi.avif":        [1397, 1126],
  "/TelimInkisaf.avif":         [1478, 1064],
  "/AuditorXidmetleri.avif":    [1395, 1127],
};

/* Per-render optical scale. The 8 objects were composed at different crops —
   the tall receipt reads smaller than the wide laptop at identical widths — so
   each gets a nudge to make the set feel evenly weighted on its plate. */
const IMG_SCALE: Record<string, number> = {
  "/UcotunDiaqnostikasi.avif":  1.0,
  "/MuhasibatKonsaltinqi.avif": 1.0,
  "/VergiKonsaltinqi.avif":     0.88,
  "/MaliyyeKonsaltinqi.avif":   0.96,
  "/ReqemsalKonsaltinq.avif":   1.06,
  "/HRKonsaltinqi.avif":        1.0,
  "/TelimInkisaf.avif":         1.0,
  "/AuditorXidmetleri.avif":    1.0,
};

/**
 * Sizes, spacing and the grid's hairlines live in responsive.css
 * (`ServicesSection` there).
 *
 * `useBreakpoint()` stays for two things, neither of them a size: the closing
 * CTA is a different composition on a phone (figure overhanging the corner vs.
 * standing in a left gutter), and `cols` feeds the parallax offset inside a GSAP
 * effect, which paints nothing.
 */
export function ServicesSection() {
  const t      = useTranslations();
  const locale = useLocale();
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();

  const servicesBasePath = locale === "az" ? "/services" : `/${locale}/services`;

  const services = AZ_SLUGS.map((azSlug, idx) => ({
    index:   String(idx + 1).padStart(2, "0"),
    azSlug,
    name:    t(`services.names.${azSlug}` as Parameters<typeof t>[0]),
    tagline: t(`services.shortTaglines.${azSlug}` as Parameters<typeof t>[0]),
    img:     SERVICE_IMAGES[azSlug],
    href:    `${servicesBasePath}/${localizedSlug(azSlug, locale)}`,
  }));

  /* Column count is set in CSS; this copy exists only to stagger the parallax
     across a row, and is never used to paint. */
  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReduced();

      gsap.fromTo(".svc-heading-anim",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.95, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });

      gsap.fromTo(".svc-cell",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.055,
          scrollTrigger: { trigger: ".svc-grid", start: "top 86%", once: true } });

      gsap.fromTo(".svc-cta-anim",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: "expo.out",
          scrollTrigger: { trigger: ".svc-cta-anim", start: "top 90%", once: true } });

      /* Scrubbed parallax: each object drifts up as the grid crosses the
         viewport, columns offset so the set breathes instead of moving as a
         slab. Lives on a wrapper — the <img> itself owns the hover transform,
         so the two never fight over `transform`. */
      if (!reduce && !isMobile) {
        gsap.utils.toArray<HTMLElement>(".svc-drift").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 10 + (i % cols) * 3 },
            {
              y: -(12 + (i % cols) * 4),
              ease: "none",
              scrollTrigger: {
                trigger: ".svc-grid",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet, cols]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="svc-section"
      style={{
        backgroundColor: "var(--page-bg-alt)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div
          className="svc-heading-anim"
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
              {t("services.sectionLabel")}
            </p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {t("services.heading")}{" "}
              <span style={{ color: DARK }}>{t("services.headingAccent")}</span>{" "}
              {t("services.headingSuffix")}
            </h2>
          </div>
          <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.75, margin: 0, maxWidth: 400 }}>
            {t("services.subtext")}
          </p>
        </div>

        {/* ── Exhibit grid ───────────────────────────────────────
            Cells carry the hairline rules (a ruled sheet); the card inside
            each cell is inset, so on hover it lifts off the rules onto a
            white surface. All 8 are always present — no disclosure step. */}
        <div
          className="svc-grid"
          style={{
            display: "grid",
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {services.map((svc) => (
            <div key={svc.azSlug} className="svc-cell" style={{ opacity: 0 }}>
              <ServiceCard {...svc} isMobile={isMobile} ctaLabel={t("services.viewDetails")} />
            </div>
          ))}
        </div>

        {/* ── Closing CTA ────────────────────────────────────────── */}
        {isMobile ? (
          /* The figure overhangs the top-right corner rather than sitting in a
             left gutter: at 390px a gutter left the copy a ~190px column that
             ran the subtext to four lines. Only the heading clears the figure;
             subtext and button use the card's full width. */
          <div className="svc-cta-anim" style={{ opacity: 0, marginTop: 34, position: "relative", zIndex: 2, paddingTop: 82 }}>
            <img
              src="/CtaSitting.avif" alt="" aria-hidden="true" loading="lazy" decoding="async"
              style={{ position: "absolute", top: 0, right: 4, height: 158, width: "auto", filter: "drop-shadow(-6px 8px 20px rgba(0,0,0,0.22))", pointerEvents: "none", zIndex: 2 }}
            />
            <div style={{ backgroundColor: INVERT, borderRadius: 20, overflow: "hidden", position: "relative", zIndex: 1, padding: "24px 22px 22px" }}>
              <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H4_MOBILE, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.25, paddingRight: 96 }}>
                {t("services.ctaQuestion")}
              </p>
              <p style={{ fontSize: FS_BODY, color: "var(--invert-text-muted)", margin: "0 0 20px", lineHeight: 1.6 }}>
                {t("services.ctaSubtext")}
              </p>
              <button
                onClick={openContact}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: FS_BODY, padding: "14px 20px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
              >
                {t("services.ctaContact")} <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="svc-cta-anim svc-cta" style={{ opacity: 0, marginTop: 64, position: "relative", zIndex: 2 }}>
            <img
              src="/CtaSitting.avif" alt="" aria-hidden="true" loading="lazy" decoding="async"
              className="svc-cta-figure"
              style={{ position: "absolute", top: 2, width: "auto", zIndex: 10, pointerEvents: "none", display: "block", filter: "drop-shadow(8px 12px 24px rgba(0,0,0,0.22))" }}
            />
            <div className="svc-cta-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", backgroundColor: INVERT, borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <div>
                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_H3, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {t("services.ctaQuestion")}
                </p>
                <p style={{ fontSize: FS_BODY, color: "var(--invert-text-muted)", margin: 0 }}>
                  {t("services.ctaSubtext")}
                </p>
              </div>
              <button
                onClick={openContact}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--cta-bg)", color: "var(--cta-text)", fontWeight: 700, fontSize: FS_BODY, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "transform 200ms, background-color 200ms", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = "var(--cta-bg-hover)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = "var(--cta-bg)";       el.style.transform = "translateY(0)"; }}
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

/* ──────────────────────────────────────────────────────────────────
   Card — desktop/tablet: object plate on top, ledger index + title below.
          mobile: the same parts turned on their side into a compact row.

   The two variants are breakpoint-exclusive, so nothing here needs a media
   query: `svc-*-row` classes only ever render below 768px and `svc-*-stack`
   only ever above it, and each carries its own values. `isTablet` is gone
   entirely — the one place it still differed (plate ratio, card padding, title
   size) is a tablet override on the stacked classes in responsive.css.
   ────────────────────────────────────────────────────────────────── */
function ServiceCard({
  index, name, tagline, img, href, isMobile, ctaLabel,
}: {
  index: string; name: string; tagline: string; img: string; href: string;
  isMobile: boolean; ctaLabel: string;
}) {
  const [active, setActive] = useState(false);
  const [w, h] = IMG_DIMS[img] ?? [1400, 1120];
  const scale  = IMG_SCALE[img] ?? 1;

  const on  = () => setActive(true);
  const off = () => setActive(false);

  /* The plate: a tinted well the object sits in, with a soft ground shadow so
     it reads as a physical object on a shelf rather than a floating sticker. */
  const plate = (variant: "row" | "stack") => (
    <div
      /* Both class names spelled out rather than interpolated: a template
         literal hides them from `e2e/tools/checkcls.mjs`, which is the only
         thing that catches a rule whose className never got applied. */
      className={variant === "row" ? "svc-plate svc-plate-row" : "svc-plate svc-plate-stack"}
      style={{
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
        backgroundColor: active ? "var(--plate-active)" : "var(--plate)",
        transition: "background-color 420ms ease",
      }}
    >
      {/* top-centre light wash — gives the well a sense of overhead lighting */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(120% 88% at 50% 4%, ${mix(DARK, 7)}, transparent 64%)`,
          opacity: active ? 1 : 0.75,
          transition: "opacity 420ms ease",
        }}
      />

      {/* ground shadow — tightens and darkens as the object lifts */}
      <div
        aria-hidden="true"
        className="svc-ground"
        style={{
          position: "absolute",
          left: "50%",
          width: active ? "34%" : "42%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${mix(DARK, active ? 22 : 15)}, transparent 72%)`,
          filter: "blur(4px)",
          transition: "width 480ms cubic-bezier(0.34, 1.3, 0.64, 1), background 420ms ease",
        }}
      />

      {/* parallax wrapper (GSAP owns its transform) */}
      <div
        className="svc-drift"
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src={img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={w}
          height={h}
          className="svc-obj"
          style={{
            /* The breakpoint half of this width lives in CSS; the per-asset
               correction stays here as a multiplier the stylesheet reads. */
            ["--svc-obj-scale" as string]: scale,
            height: "auto",
            objectFit: "contain",
            transform: active ? "translateY(-7px) scale(1.055)" : "translateY(0) scale(1)",
            transition: "transform 560ms cubic-bezier(0.34, 1.25, 0.64, 1)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );

  const indexEl = (
    <span
      style={{
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: FS_LABEL,
        letterSpacing: "0.14em",
        color: active ? DARK : "var(--text-faint)",
        transition: "color 380ms ease",
      }}
    >
      {index}
    </span>
  );

  const titleEl = (
    <h3
      className="svc-card-title"
      style={{
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        color: active ? DARK : "var(--text)",
        margin: 0,
        letterSpacing: "-0.025em",
        lineHeight: 1.22,
        transition: "color 380ms ease",
      }}
    >
      {name}
    </h3>
  );

  const taglineEl = (
    <p style={{ fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
      {tagline}
    </p>
  );

  const shell: React.CSSProperties = {
    display: "flex",
    textDecoration: "none",
    height: "100%",
    backgroundColor: active ? "var(--surface)" : "transparent",
    boxShadow: active
      ? "0 22px 48px color-mix(in srgb, var(--brand) 13%, transparent), 0 4px 14px rgba(0,0,0,0.06)"
      : "0 0 0 rgba(0,0,0,0)",
    transform: active ? "translateY(-6px)" : "translateY(0)",
    transition: "background-color 420ms ease, box-shadow 420ms ease, transform 460ms cubic-bezier(0.34, 1.3, 0.64, 1)",
  };

  /* ── Mobile: horizontal row ── */
  if (isMobile) {
    return (
      <a
        href={href}
        className="svc-card svc-card-row"
        onMouseEnter={on} onMouseLeave={off}
        onFocus={on} onBlur={off}
        onTouchStart={on} onTouchEnd={off}
        style={{ ...shell, alignItems: "center", gap: 14 }}
      >
        {plate("row")}
        {/* No trailing chevron here — at 390px every pixel of that column is
            needed for the title, and the whole row is already the link. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0, flex: 1 }}>
          {indexEl}
          {titleEl}
          {taglineEl}
        </div>
      </a>
    );
  }

  /* ── Tablet / desktop: object plate over ledger text ── */
  return (
    <a
      href={href}
      className="svc-card svc-card-stack"
      onMouseEnter={on} onMouseLeave={off}
      onFocus={on} onBlur={off}
      style={{ ...shell, flexDirection: "column" }}
    >
      {/* Two columns give each plate ~370px — square there would make the
          section scroll forever, so tablet plates go landscape instead (the
          ratio flip is a tablet rule on `.svc-plate-stack`). */}
      {plate("stack")}

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 10px" }}>
        {indexEl}
        <div
          aria-hidden="true"
          style={{
            height: 1, flex: 1,
            backgroundColor: active ? mix(DARK, 34) : "var(--border-strong)",
            transition: "background-color 380ms ease",
          }}
        />
      </div>

      {titleEl}
      {/* `marginTop: auto` pins the tagline to the bottom of an equal-height
          cell, so all eight share a baseline no matter whether the name above
          ran to one, two or three lines. Reserving a fixed number of title
          lines instead only works for one locale — AZ names mostly fit two,
          EN and RU push some to three. The slack lands in the gap above the
          tagline, where it reads as breathing room rather than misalignment. */}
      <div style={{ marginTop: "auto", paddingTop: 10 }}>{taglineEl}</div>

      {/* CTA sits in reserved space, so revealing it never reflows the card */}
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginTop: 16,
          fontSize: FS_BODY, fontWeight: 600, color: DARK,
          opacity: active ? 1 : 0,
          transform: active ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 340ms ease, transform 420ms cubic-bezier(0.34, 1.3, 0.64, 1)",
        }}
      >
        {ctaLabel} <ArrowUpRight size={15} strokeWidth={2} />
      </div>
    </a>
  );
}
