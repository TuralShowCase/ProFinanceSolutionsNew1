"use client";

import { useEffect, useState } from "react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { SharedCtaButtons } from "./SharedCtaButtons";
import { SharedSocialProof } from "./SharedSocialProof";
import { SlideDots } from "./SlideDots";
import { Slide1Graphic } from "./Slide1Graphic";

const backgroundPattern = "/ChatGPT_Image_May_9__2026__05_25_40_PM.png";

export function HeroSlide1({
  activeSlide,
  goToSlide,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
}) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const [isSmallPhone, setIsSmallPhone] = useState(false);
  const [isCompactPhone, setIsCompactPhone] = useState(false);
  // Viewport width — needed to distinguish small vs large desktop
  const [vw, setVw] = useState(1280);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setIsSmallPhone(w < 390 && h < 730);
    setIsCompactPhone(w <= 390 && h >= 730 && h <= 820);
    setVw(w);
  }, []);

  // Show stacked graphic for both mobile and tablet
  const isStacked    = isMobile || isTablet;
  const showGraphic  = isStacked && !isSmallPhone;

  // Small laptop: 1024–1199px (no badges, pill left-aligned)
  const isSmallDesktop = !isMobile && !isTablet && vw < 1200;

  // Pill dimensions by context
  const mobilePw = isCompactPhone ? 196 : 220;
  const mobilePh = isCompactPhone ? 264 : 300;
  const mobilePr = isCompactPhone ? 98  : 110;

  // Tablet stacked — noticeably larger than mobile
  const tabletPw = 260;
  const tabletPh = 360;
  const tabletPr = 130;

  // Desktop pill (tablet no longer uses these)
  const desktopPw = 380;
  const desktopPh = 560;
  const desktopPr = 190;

  const containerPadding = isStacked ? "32px 20px 0" : "80px 40px";
  const gap = isStacked ? 0 : 48;

  return (
    <div style={{ width: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(100deg,rgba(244,248,245,0.75) 0%,rgba(244,248,245,0.45) 48%,rgba(240,247,244,0.20) 100%)",
      }} />

      {/* Content */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: containerPadding,
        display: "flex", flexDirection: isStacked ? "column" : "row",
        alignItems: isStacked ? "flex-start" : "center",
        gap, width: "100%", position: "relative", zIndex: 2,
        flex: isStacked ? undefined : 1,
      }}>
        {/* Text */}
        <div style={{
          flex: isStacked ? undefined : "0 0 54%",
          minWidth: 0,
          width: isStacked ? "100%" : undefined,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            backgroundColor: "rgba(26,61,43,0.10)", color: "#1A3D2B",
            fontWeight: 500, fontSize: 13, padding: "6px 14px",
            borderRadius: 999, marginBottom: isStacked ? 16 : 28,
            border: "1px solid rgba(26,61,43,0.18)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#1A3D2B", flexShrink: 0 }} />
            Maliyyə Konsaltinqi · Bakı, Azərbaycan
          </span>

          <div style={{ marginBottom: isStacked ? 14 : 24 }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: isStacked ? "clamp(28px, 7.5vw, 38px)" : "clamp(40px, 5vw, 64px)",
              lineHeight: 1.08, color: "#0F1117", margin: 0, letterSpacing: "-0.03em",
            }}>
              {"Biznesiniz üçün".split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em" }}>{w}</span>
              ))}
              {"etibarlı maliyyə tərəfdaşı".split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em", color: "#1A3D2B" }}>{w}</span>
              ))}
            </h1>
          </div>

          <p style={{
            fontWeight: 400,
            fontSize: isStacked ? 14 : 17,
            color: "#4B5563", lineHeight: 1.6,
            margin: isStacked ? "0 0 16px 0" : "0 0 36px 0",
            maxWidth: isStacked ? "100%" : 480,
          }}>
            Mühasibat uçotu, vergi planlaması, maliyyə audit və strateji konsaltinq
            xidmətləri — böyük korporasiyalar üçün.
          </p>

          <SharedCtaButtons />
          <SharedSocialProof />
          <SlideDots activeSlide={activeSlide} goToSlide={goToSlide} />
        </div>

        {/* Desktop graphic — in flex row */}
        {!isStacked && (
          <div style={{
            flex: "1 1 auto",
            display: "flex",
            // Small laptop: left-align pill; large desktop: center
            justifyContent: isSmallDesktop ? "flex-start" : "center",
            alignItems: "center",
            paddingLeft: isSmallDesktop ? 16 : 0,
          }}>
            <Slide1Graphic
              pw={desktopPw}
              ph={desktopPh}
              pr={desktopPr}
              // Small laptop: no badges (too cramped); large desktop: badges visible
              showBadges={!isSmallDesktop}
            />
          </div>
        )}
      </div>

      {/* Stacked graphic (mobile + tablet) */}
      {showGraphic && (
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "visible",
          position: "relative",
          zIndex: 1,
          minHeight: 0,
          marginTop: -40,
        }}>
          <Slide1Graphic
            pw={isTablet ? tabletPw : mobilePw}
            ph={isTablet ? tabletPh : mobilePh}
            pr={isTablet ? tabletPr : mobilePr}
            showBadges={false}
          />
        </div>
      )}

      {/* Small phone spacer */}
      {isStacked && isSmallPhone && (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
}
