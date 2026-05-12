"use client";

import { useEffect, useState } from "react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { SharedCtaButtons } from "./SharedCtaButtons";
import { SharedSocialProof } from "./SharedSocialProof";
import { SlideDots } from "./SlideDots";

const backgroundPattern = "/ChatGPT_Image_May_9__2026__05_25_40_PM.png";

export function HeroSlide2({
  activeSlide,
  goToSlide,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
}) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  // iPhone SE / mini (375px) — hide graphic
  const [isSmallPhone, setIsSmallPhone] = useState(false);
  useEffect(() => { setIsSmallPhone(window.innerWidth < 390); }, []);

  const showMobileGraphic = isMobile && !isSmallPhone;

  const containerPadding = isMobile ? "32px 20px 0" : isTablet ? "60px 24px" : "80px 40px";
  const gap = isMobile ? 0 : isTablet ? 24 : 48;

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

      {/* Text block */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: containerPadding,
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap, width: "100%", position: "relative", zIndex: 2,
        flex: isMobile ? undefined : 1,
      }}>
        <div style={{
          flex: isMobile ? undefined : isTablet ? "0 0 58%" : "0 0 54%",
          minWidth: 0, width: isMobile ? "100%" : undefined,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            backgroundColor: "rgba(26,61,43,0.10)", color: "#1A3D2B",
            fontWeight: 500, fontSize: 13, padding: "6px 14px",
            borderRadius: 999, marginBottom: isMobile ? 16 : 28,
            border: "1px solid rgba(26,61,43,0.18)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#1A3D2B", flexShrink: 0 }} />
            Vergi Planlaması · Bakı, Azərbaycan
          </span>

          <div style={{ marginBottom: isMobile ? 14 : 24 }}>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: isMobile ? "clamp(28px, 7.5vw, 38px)" : "clamp(40px, 5vw, 64px)",
              lineHeight: 1.08, color: "#0F1117", margin: 0, letterSpacing: "-0.03em",
            }}>
              {"Biznesinizin maliyyə".split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em" }}>{w}</span>
              ))}
              {"uğurunu birlikdə qururuq".split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.28em", color: "#1A3D2B" }}>{w}</span>
              ))}
            </h1>
          </div>

          <p style={{
            fontWeight: 400, fontSize: isMobile ? 14 : 17,
            color: "#4B5563", lineHeight: 1.6, margin: isMobile ? "0 0 16px 0" : "0 0 36px 0",
            maxWidth: isMobile ? "100%" : 480,
          }}>
            Mühasibat uçotu, vergi planlaması, maliyyə audit və strateji konsaltinq
          </p>

          <SharedCtaButtons />
          <SharedSocialProof />
          <SlideDots activeSlide={activeSlide} goToSlide={goToSlide} />
        </div>

        {/* Tablet / Desktop human */}
        {!isMobile && (
          <div style={{
            flex: "1 1 auto", position: "relative",
            height: isTablet ? "calc(100svh - 280px)" : "calc(100svh - 232px)",
            minHeight: isTablet ? 380 : 520, overflow: "visible",
          }}>
            <div style={{ position: "absolute", bottom: -8, left: "0%", width: isTablet ? 360 : 480, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.13)", filter: "blur(18px)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "28%", left: "12%", width: 64, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.10)", filter: "blur(10px)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "18%", left: "18%", width: 72, height: 14, borderRadius: "50%", background: "rgba(0,0,0,0.09)", filter: "blur(10px)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", top: "18%", right: "14%", width: 48, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.07)", filter: "blur(8px)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", top: "22%", right: "4%", width: 56, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.07)", filter: "blur(8px)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: "6%", right: "6%", width: 80, height: 16, borderRadius: "50%", background: "rgba(0,0,0,0.11)", filter: "blur(12px)", pointerEvents: "none", zIndex: 1 }} />
            <img src="/Slide2Human.png" alt="Vergi Mütəxəssisi" style={{
              position: "absolute", bottom: 55,
              left: isTablet ? "-5%" : "-7%",
              height: "calc(80%)", width: "auto", maxWidth: "none",
              objectFit: "contain", objectPosition: "bottom center",
              userSelect: "none", pointerEvents: "none", zIndex: 2,
            }} />
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
          {/* Ground shadow */}
          <div style={{
            position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
            width: 200, height: 16, borderRadius: "50%",
            background: "rgba(0,0,0,0.09)", filter: "blur(10px)", pointerEvents: "none",
          }} />
          <img
            src="/Slide2Human.png"
            alt=""
            aria-hidden="true"
            style={{
              height: 300, width: "auto",
              objectFit: "contain", objectPosition: "bottom center",
              filter: "drop-shadow(-4px 0 14px rgba(0,0,0,0.15))",
              display: "block", position: "relative", zIndex: 1,
              userSelect: "none",
            }}
          />
        </div>
      )}

      {/* Small phone spacer */}
      {isMobile && isSmallPhone && (
        <div style={{ flex: 1 }} />
      )}
    </div>
  );
}
