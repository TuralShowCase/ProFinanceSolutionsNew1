"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { DARK, ACCENT, INVERT } from "@/app/lib/brand";
import { FS_H2, FS_LABEL, FS_BODY, FS_BODY_LG } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Biz kimik" — the homepage introduction (replaces the old Brend fəlsəfəsi
 * pillars block). Text-first and deliberately NOT another numbered row list:
 * Industries and WhyUs further down already use that shape. One statement
 * heading, one column of copy, and the mission as a dark panel beside it —
 * the panel carries the section visually now that there's no photograph.
 */
export function WhoWeAreSection() {
  const t      = useTranslations("whoWeAre");
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);

  // Same locale→path mapping the Header/Footer use (RU about page is /o-nas).
  const base = locale === "az" ? "" : `/${locale}`;
  const aboutHref = locale === "ru" ? `${base}/o-nas` : `${base}/about`;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".wwa-anim, .wwa-mission", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(".wwa-anim", { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });

      gsap.fromTo(".wwa-mission", { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".wwa-mission", start: "top 88%", once: true } });
    }, sectionRef);

    return () => ctx.revert();
    // Markup no longer changes with the breakpoint, so these triggers are built
    // once. ScrollTrigger recalculates its own positions on resize.
  }, []);

  const headingId = "who-we-are-heading";

  /* ── Body copy: lead paragraph sets up the two About paragraphs ── */
  const bodyCopy = (
    <>
      <p className="wwa-anim" style={{ opacity: 0, fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: FS_BODY_LG, color: "var(--text)", lineHeight: 1.6, letterSpacing: "-0.015em", margin: "0 0 22px" }}>
        {t("leadParagraph")}
      </p>
      <p className="wwa-anim" style={{ opacity: 0, fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.85, margin: "0 0 18px" }}>
        {t.rich("paragraph1", { b: (chunks) => <strong style={{ fontWeight: 800, color: "var(--brand)" }}>{chunks}</strong> })}
      </p>
      <p className="wwa-anim" style={{ opacity: 0, fontSize: FS_BODY, color: "var(--text-muted)", lineHeight: 1.85, margin: 0 }}>
        {t("paragraph2")}
      </p>
    </>
  );

  const ctaLink = (
    <a
      className="wwa-anim wwa-cta"
      href={aboutHref}
      style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, color: DARK, fontSize: FS_BODY, fontWeight: 600, textDecoration: "none", transition: "gap 240ms ease" }}
      onMouseEnter={e => (e.currentTarget.style.gap = "12px")}
      onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
    >
      <span style={{ borderBottom: "1.5px solid color-mix(in srgb, var(--brand) 45%, transparent)", paddingBottom: 2 }}>{t("cta")}</span>
      <ArrowUpRight size={16} strokeWidth={2.2} />
    </a>
  );

  /* ── Mission panel — same dark-card language as the About page's mission,
       so the two pages read as one system rather than two treatments. ── */
  const missionCard = (
    <div
      className="wwa-mission"
      style={{
        opacity: 0,
        backgroundColor: INVERT,
        border: "1px solid var(--invert-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" className="wwa-mission-accent" style={{ position: "absolute", top: 0, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.6 }} />
      <span
        aria-hidden="true"
        style={{ position: "absolute", right: 18, bottom: -34, fontFamily: "Georgia, serif", fontSize: 132, lineHeight: 1, color: "color-mix(in srgb, var(--accent-green) 10%, transparent)", userSelect: "none", pointerEvents: "none" }}
      >
        &rdquo;
      </span>

      <p style={{ fontSize: FS_LABEL, fontWeight: 700, color: ACCENT, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 18px" }}>
        {t("missionLabel")}
      </p>
      <p style={{ fontSize: FS_BODY_LG, color: "var(--invert-text)", lineHeight: 1.72, letterSpacing: "-0.01em", margin: 0, position: "relative", zIndex: 1 }}>
        {t("missionText")}
      </p>
      <div className="wwa-mission-rule" style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
      <p style={{ fontSize: FS_BODY, color: "var(--invert-text-muted)", lineHeight: 1.72, margin: 0, position: "relative", zIndex: 1 }}>
        {t("missionSub")}
      </p>
    </div>
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby={headingId}
      className="wwa-section"
      style={{ backgroundColor: "var(--surface)", fontFamily: "var(--font-inter), 'Inter', sans-serif", scrollMarginTop: 88 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Header: eyebrow + one statement line ── */}
        <div className="wwa-anim wwa-head" style={{ opacity: 0 }}>
          <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
            {t("sectionLabel")}
          </p>
          <h2
            id={headingId}
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}
          >
            {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
          </h2>
        </div>

        <div className="wwa-rule" style={{ height: 1, backgroundColor: "var(--border)" }} />

        {/* One DOM order, two layouts — grid areas do the reordering.
            Desktop/tablet: copy + link stacked on the left, mission panel on the
            right. Mobile: copy, mission panel, then the link closes the section. */}
        <div className="wwa-grid">
          <div className="wwa-body">{bodyCopy}</div>
          {ctaLink}
          {missionCard}
        </div>

      </div>
    </section>
  );
}
