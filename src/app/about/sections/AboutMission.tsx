"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#1A3D2B";
const ACCENT = "#52B788";

export function AboutMission() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".msn-anim",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".msn-card",
        { opacity: 0, x: 32 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".msn-card", start: "top 82%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const sectionPad = isMobile
    ? "64px 20px 72px"
    : isTablet
    ? "80px 28px 88px"
    : "100px 48px 108px";

  // ── Mobile ─────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        style={{ backgroundColor: "#fff", padding: sectionPad, fontFamily: "'Inter', sans-serif" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="msn-anim" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Haqqımızda
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#111410", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Güvən üzərində{" "}
              <span style={{ color: DARK }}>qurulan</span>{" "}
              tərəfdaşlıq
            </h2>
          </div>

          <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: 36 }} />

          <div className="msn-anim" style={{ marginBottom: 32 }}>
            <p className="about-mission-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#111410", lineHeight: 1.6, margin: "0 0 16px", letterSpacing: "-0.015em" }}>
              Müasir dünyada biznesin uğuru yalnız ambisiyalardan deyil, həm də maliyyənin dəqiq və şəffaf idarə olunmasından asılıdır.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.82, margin: "0 0 12px" }}>
              ProFinance Solutions şirkətinizin böyüməsinə, risklərin minimuma endirilməsinə və əsaslı maliyyə qərarlarının qəbuluna dəstək verən strateji tərəfdaş kimi çıxış edir.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.82, margin: 0 }}>
              Biz müştərilərimizlə uzunmüddətli tərəfdaşlıqlar qurur, etibar, peşəkarlıq və strateji yanaşma üzərində dayanırıq.
            </p>
          </div>

          <div className="msn-card" style={{ backgroundColor: DARK, borderRadius: 16, padding: "28px 24px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>Missiyamız</p>
            <p style={{ fontSize: 16, color: "#ffffff", lineHeight: 1.72, margin: "0 0 20px", fontStyle: "italic", letterSpacing: "-0.01em" }}>
              "Müştərilərimizin biznesi üçün etibarlı və strateji tərəfdaş olmaq, maliyyə proseslərində maksimum şəffaflığı təmin etmək."
            </p>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginBottom: 16 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
              Mühasibatlıq, vergi, audit və maliyyə idarəçiliyi sahələrindəki peşəkar təcrübəmizə əsaslanaraq şirkətləri xarici risklərdən effektiv şəkildə qoruyuruq.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop / Tablet ───────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#fff", padding: sectionPad, fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div
          className="msn-anim"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: 52,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px" }}>
              Haqqımızda
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: isTablet ? 36 : "clamp(34px, 3.8vw, 52px)",
              color: "#111410",
              margin: 0,
              letterSpacing: "-0.038em",
              lineHeight: 1.08,
            }}>
              Güvən üzərində{" "}
              <span style={{ color: DARK }}>qurulan</span>{" "}
              tərəfdaşlıq
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.72, margin: 0, maxWidth: 320 }}>
            Maliyyə proseslərini proqnozlaşdırıla bilən, şəffaf və idarə olunan sistemə çeviririk.
          </p>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: 52 }} />

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr 320px" : "1fr 360px",
          gap: isTablet ? 40 : 64,
          alignItems: "stretch",
        }}>
          {/* Left: story */}
          <div className="msn-anim" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: isTablet ? 16 : 18,
              color: "#111410",
              lineHeight: 1.62,
              margin: 0,
              letterSpacing: "-0.015em",
            }}>
              Müasir dünyada biznesin uğuru yalnız ambisiyalardan deyil, həm də maliyyənin dəqiq və şəffaf idarə olunmasından asılıdır.
            </p>
            <p style={{ fontSize: isTablet ? 14 : 15, color: "#6B7280", lineHeight: 1.84, margin: 0 }}>
              ProFinance Solutions şirkətinizin böyüməsinə, risklərin minimuma endirilməsinə və əsaslı maliyyə qərarlarının qəbuluna dəstək verən strateji tərəfdaş kimi çıxış edir. Təcrübəmiz maliyyə konsaltinqinin əsas sahələrini əhatə edir: mühasibatlıq, vergi, audit və maliyyə idarəçiliyi.
            </p>
            <p style={{ fontSize: isTablet ? 14 : 15, color: "#6B7280", lineHeight: 1.84, margin: 0 }}>
              Biz müştərilərimizlə uzunmüddətli tərəfdaşlıqlar qurur, etibar, peşəkarlıq və strateji yanaşma üzərində dayanırıq.
            </p>
          </div>

          {/* Right: mission card */}
          <div
            className="msn-card"
            style={{
              backgroundColor: DARK,
              borderRadius: 20,
              padding: isTablet ? "36px 28px" : "44px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 40, right: 40, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.6 }} />
            <span style={{
              position: "absolute", bottom: -16, right: 24,
              fontFamily: "Georgia, serif", fontSize: 140,
              color: "rgba(82,183,136,0.08)",
              lineHeight: 1, userSelect: "none", pointerEvents: "none",
            }}>"</span>

            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: ACCENT, letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 20px" }}>
                Missiyamız
              </p>
              <p style={{
                fontSize: isTablet ? 16 : 18,
                color: "#ffffff",
                lineHeight: 1.72,
                margin: "0 0 28px",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                position: "relative",
                zIndex: 1,
              }}>
                "Müştərilərimizin biznesi üçün etibarlı və strateji tərəfdaş olmaq, maliyyə proseslərində maksimum şəffaflığı təmin etmək."
              </p>
            </div>

            <div>
              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 20 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.78, margin: 0 }}>
                Mühasibatlıq, vergi, audit və maliyyə idarəçiliyi sahələrindəki peşəkar təcrübəmizə əsaslanaraq şirkətləri xarici risklərdən effektiv şəkildə qoruyuruq.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
