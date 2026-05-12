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

  // iPhone SE / mini (375px) — hide graphic to avoid clipping
  const [isSmallPhone, setIsSmallPhone] = useState(false);
  useEffect(() => { setIsSmallPhone(window.innerWidth < 390); }, []);

  const showMobileGraphic = isMobile && !isSmallPhone;

  const containerPadding = isMobile ? "32px 20px 0" : isTablet ? "60px 24px" : "80px 40px";
  const leftFlex = isMobile ? undefined : isTablet ? "0 0 58%" : "0 0 54%";
  const gap      = isMobile ? 0 : isTablet ? 24 : 48;

  // Pill dimensions for tablet / desktop
  const pw = isTablet ? 280 : 380;
  const ph = isTablet ? 420 : 560;
  const pr = isTablet ? 140 : 190;

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

      {/* Text block — flex: 1 only on tablet/desktop (fills container on those) */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: containerPadding,
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap, width: "100%", position: "relative", zIndex: 2,
        flex: isMobile ? undefined : 1,
      }}>
        <div style={{ flex: leftFlex, minWidth: 0, width: isMobile ? "100%" : undefined }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            backgroundColor: "rgba(26,61,43,0.10)", color: "#1A3D2B",
            fontWeight: 500, fontSize: 13, padding: "6px 14px",
            borderRadius: 999, marginBottom: isMobile ? 16 : 28,
            border: "1px solid rgba(26,61,43,0.18)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#1A3D2B", flexShrink: 0 }} />
            Maliyyə Konsaltinqi · Bakı, Azərbaycan
          </span>

          <div style={{ marginBottom: isMobile ? 14 : 24 }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: isMobile ? "clamp(28px, 7.5vw, 38px)" : "clamp(40px, 5vw, 64px)",
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
            fontWeight: 400, fontSize: isMobile ? 14 : isTablet ? 15 : 17,
            color: "#4B5563", lineHeight: 1.6, margin: isMobile ? "0 0 16px 0" : "0 0 36px 0",
            maxWidth: isMobile ? "100%" : 480,
          }}>
            Mühasibat uçotu, vergi planlaması, maliyyə audit və strateji konsaltinq
            xidmətləri — böyük korporasiyalar üçün.
          </p>

          <SharedCtaButtons />
          <SharedSocialProof />
          <SlideDots activeSlide={activeSlide} goToSlide={goToSlide} />
        </div>

        {/* Tablet / Desktop graphic */}
        {!isMobile && (
          <div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Slide1Graphic pw={pw} ph={ph} pr={pr} showBadges={bp === "desktop"} />
          </div>
        )}
      </div>

      {/* Mobile graphic — centered below text, anchored to section bottom */}
      {showMobileGraphic && (
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          minHeight: 0,
        }}>
          <Slide1Graphic pw={220} ph={300} pr={110} showBadges={false} />
        </div>
      )}

      {/* Small phone (SE/mini) — fill remaining height so section stays consistent */}
      {isMobile && isSmallPhone && (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
}
