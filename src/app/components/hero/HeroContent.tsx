"use client";

import { useTranslations } from "next-intl";
import { INK, SUB, SLIDES } from "./heroStyle";

// Slide-specific block: T3 slogan as the heading, T3 line as the note under it.
// Type size and the note's top margin are breakpoint-dependent and live in
// responsive.css (`.hero-h1`, `.hero-note`) — this is the <h1>, so a
// post-hydration size correction would shift the largest text on the page.
export function HeroContent({ activeSlide }: { activeSlide: number }) {
  const t        = useTranslations("hero");

  const k = SLIDES[activeSlide].key;
  const textShadow = "0 2px 26px rgba(0,0,0,0.5)";

  return (
    <div style={{ maxWidth: 760 }}>
      <h1
        className="hero-h1"
        style={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          lineHeight: 1.14,
          letterSpacing: "-0.025em",
          color: INK,
          margin: 0,
          textShadow,
        }}
      >
        {t(`${k}.services`)}
      </h1>

      {/* Note — large and near-white so it reads, not just the heading */}
      <p
        className="hero-note"
        style={{
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1.6,
          color: SUB,
          maxWidth: 640,
          textShadow,
        }}
      >
        {t(`${k}.note`)}
      </p>
    </div>
  );
}
