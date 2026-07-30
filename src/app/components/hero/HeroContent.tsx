"use client";

import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { INK, SUB, SLIDES } from "./heroStyle";

// Slide-specific block: T3 slogan as the heading, T3 line as the note under it.
export function HeroContent({ activeSlide }: { activeSlide: number }) {
  const t        = useTranslations("hero");
  const bp       = useBreakpoint();
  const isStacked = bp === "mobile" || bp === "tablet";

  const k = SLIDES[activeSlide].key;
  const textShadow = "0 2px 26px rgba(0,0,0,0.5)";

  return (
    <div style={{ maxWidth: 760 }}>
      <h1
        style={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: isStacked ? "clamp(28px, 7.2vw, 38px)" : "clamp(36px, 3.5vw, 52px)",
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
        style={{
          margin: `${isStacked ? 14 : 20}px 0 0`,
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
