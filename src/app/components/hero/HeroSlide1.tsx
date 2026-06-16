"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { SharedCtaButtons } from "./SharedCtaButtons";
import { SharedSocialProof } from "./SharedSocialProof";
import { SlideDots } from "./SlideDots";
import { Slide1Graphic } from "./Slide1Graphic";

const backgroundPattern = "/ChatGPT_Image_May_9__2026__05_25_40_PM.avif";

export function HeroSlide1({
  activeSlide,
  goToSlide,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
}) {
  const t  = useTranslations("hero.slide1");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const [isSmallPhone, setIsSmallPhone]   = useState(false);
  const [isCompactPhone, setIsCompactPhone] = useState(false);
  const [vw, setVw] = useState(1280);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setIsSmallPhone(w < 390 && h < 730);
    setIsCompactPhone(w <= 390 && h >= 730 && h <= 820);
    setVw(w);
  }, []);

  const isStacked      = isMobile || isTablet;
  const showGraphic    = isStacked && !isSmallPhone;
  const isSmallDesktop = !isMobile && !isTablet && vw < 1200;

  const mobilePw = isCompactPhone ? 196 : 220;
  const mobilePh = isCompactPhone ? 264 : 300;
  const mobilePr = isCompactPhone ? 98  : 110;
  const tabletPw = 260; const tabletPh = 360; const tabletPr = 130;
  const desktopPw = 380; const desktopPh = 560; const desktopPr = 190;

  const containerPadding = isStacked ? "32px 20px 0" : "80px 40px";
  const gap = isStacked ? 0 : 48;

  return (
    <div style={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      <div className="hero-bg-pattern" style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${backgroundPattern})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="hero-bg-scrim" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(100deg,rgba(244,248,245,0.75) 0%,rgba(244,248,245,0.45) 48%,rgba(240,247,244,0.20) 100%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: containerPadding, display: "flex", flexDirection: isStacked ? "column" : "row", alignItems: isStacked ? "flex-start" : "center", gap, width: "100%", position: "relative", zIndex: 2, flex: isStacked ? undefined : 1 }}>
        <div style={{ flex: isStacked ? undefined : "0 0 54%", minWidth: 0, width: isStacked ? "100%" : undefined }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: "color-mix(in srgb, var(--brand) 10%, transparent)", color: "var(--brand)", fontWeight: 500, fontSize: 13, padding: "6px 14px", borderRadius: 999, marginBottom: isStacked ? 16 : 28, border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--brand)", flexShrink: 0 }} />
            {t("badge")}
          </span>

          <div style={{ marginBottom: isStacked ? 14 : 24 }}>
            <h1 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isStacked ? "clamp(28px, 7.5vw, 38px)" : "clamp(40px, 5vw, 64px)", lineHeight: 1.08, color: "var(--text-strong)", margin: 0, letterSpacing: "-0.03em" }}>
              {t("titlePart1").split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em" }}>{w}</span>
              ))}
              {t("titlePart2").split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em", color: "var(--brand)" }}>{w}</span>
              ))}
            </h1>
          </div>

          <p style={{ fontWeight: 400, fontSize: isStacked ? 14 : 17, color: "var(--text-soft)", lineHeight: 1.6, margin: isStacked ? "0 0 16px 0" : "0 0 36px 0", maxWidth: isStacked ? "100%" : 480 }}>
            {t("description")}
          </p>

          <SharedCtaButtons />
          <SharedSocialProof />
          <SlideDots activeSlide={activeSlide} goToSlide={goToSlide} />
        </div>

        {!isStacked && (
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: isSmallDesktop ? "flex-start" : "center", alignItems: "center", paddingLeft: isSmallDesktop ? 16 : 0 }}>
            <Slide1Graphic pw={desktopPw} ph={desktopPh} pr={desktopPr} showBadges={!isSmallDesktop} />
          </div>
        )}
      </div>

      {showGraphic && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", overflow: "visible", position: "relative", zIndex: 1, minHeight: 0, marginTop: -40 }}>
          <Slide1Graphic pw={isTablet ? tabletPw : mobilePw} ph={isTablet ? tabletPh : mobilePh} pr={isTablet ? tabletPr : mobilePr} showBadges={false} />
        </div>
      )}

      {isStacked && isSmallPhone && <div style={{ flex: 1 }} />}
    </div>
  );
}
