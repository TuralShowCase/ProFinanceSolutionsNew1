"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#1A3D2B";
const ACCENT = "#52B788";

const traits = [
  {
    number: "01",
    title: "Sertifikatlı mütəxəssislər",
    desc: "Komandamız mühasibatlıq, vergi, audit və maliyyə idarəçiliyi sahələrində sertifikatlı peşəkarlardan ibarətdir.",
  },
  {
    number: "02",
    title: "Birgə 30+ il təcrübə",
    desc: "Hər üzv öz sahəsinin dərinliklərindən gəlir. Komanda olaraq bu biliklər birləşib güclü bir həllə çevrilir.",
  },
  {
    number: "03",
    title: "Hər müştəriyə ayrıca yanaşma",
    desc: "Standart şablonlar deyil — hər biznesin özünəməxsus maliyyə mənzərəsini anlayan bir komanda.",
  },
];

const BG = "#ffffff";

export function AboutTeam() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef  = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait slides from left
      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // Text content staggers
      gsap.fromTo(
        ".team-anim",
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // Traits stagger
      gsap.fromTo(
        ".team-trait",
        { opacity: 0, x: 18 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".team-traits", start: "top 84%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const pad = isMobile
    ? "64px 20px 72px"
    : isTablet
    ? "80px 28px 88px"
    : "100px 48px 108px";

  // ── Mobile ─────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        style={{ backgroundColor: BG, padding: pad, fontFamily: "'Inter', sans-serif" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div className="team-anim" style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>
              Komandamız
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: "#111410", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Bir komanda,{" "}
              <span style={{ color: DARK }}>bir hədəf</span>
            </h2>
          </div>

          {/* Landscape image — full width on mobile */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 32, height: 220 }}>
            <img
              src="/AboutPageTeamLandscape.png"
              alt="ProFinance komandası"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>

          {/* Description */}
          <p className="team-anim" style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, margin: "0 0 32px" }}>
            ProFinance Solutions komandası maliyyə, vergi, audit və mühasibatlıq sahələrinin mütəxəssislərindən ibarətdir. Birlikdə müştərilərə tam spektrli, etibarlı maliyyə dəstəyi təqdim edirik.
          </p>

          {/* Traits */}
          <div className="team-traits">
            {traits.map((t, i) => (
              <div
                key={i}
                className="team-trait"
                style={{
                  borderTop: "1px solid #E0DDD8",
                  padding: "20px 0",
                  borderBottom: i === traits.length - 1 ? "1px solid #E0DDD8" : "none",
                  display: "grid",
                  gridTemplateColumns: "36px 1fr",
                  gap: 12,
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: DARK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 11, color: "#fff", letterSpacing: "0.04em" }}>{t.number}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111410", margin: "0 0 5px", letterSpacing: "-0.02em" }}>{t.title}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.72, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop / Tablet ───────────────────────────────────────────
  const portraitW = isTablet ? 300 : 380;

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: BG, padding: pad, fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div
          className="team-anim"
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
              Komandamız
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
              Bir komanda,{" "}
              <span style={{ color: DARK }}>bir hədəf</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.72, margin: 0, maxWidth: 300 }}>
            Sahənin ən yaxşı mütəxəssisləri bir çatı altında — sizin uğurunuz üçün.
          </p>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: 52 }} />

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `${portraitW}px 1fr`,
          gap: isTablet ? 48 : 80,
          alignItems: "start",
        }}>

          {/* ── Left: portrait image ── */}
          <div
            ref={portraitRef}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              opacity: 0,
              boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <img
              src="/AboutPageTeamPortrait.png"
              alt="ProFinance komandası"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: "center top",
                aspectRatio: "3 / 4",
              }}
            />
          </div>

          {/* ── Right: content ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 8 }}>

            {/* Description */}
            <div className="team-anim" style={{ marginBottom: 44 }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: isTablet ? 16 : 18,
                color: "#111410",
                lineHeight: 1.62,
                margin: "0 0 18px",
                letterSpacing: "-0.015em",
              }}>
                Maliyyə, vergi, audit və mühasibatlıq sahələrinin dərin biliciləri bir komanda olaraq fəaliyyət göstərir.
              </p>
              <p style={{ fontSize: isTablet ? 14 : 15, color: "#6B7280", lineHeight: 1.84, margin: 0 }}>
                ProFinance Solutions-da hər üzv öz ixtisas sahəsinin mütəxəssisidir. Lakin biz ayrı-ayrı deyil, birgə işləyirik — müştərinin problemini 360° baxış bucağından analiz edib ən optimal həlli birlikdə hazırlayırıq.
              </p>
            </div>

            {/* Trait rows */}
            <div className="team-traits">
              {traits.map((t, i) => (
                <div
                  key={i}
                  className="team-trait"
                  style={{
                    borderTop: "1px solid #E0DDD8",
                    padding: `${isTablet ? 22 : 26}px 0`,
                    borderBottom: i === traits.length - 1 ? "1px solid #E0DDD8" : "none",
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: 20,
                    alignItems: "start",
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: DARK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 11, color: "#fff", letterSpacing: "0.04em" }}>{t.number}</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: isTablet ? 15 : 16,
                      color: "#111410",
                      margin: "0 0 6px",
                      letterSpacing: "-0.02em",
                    }}>
                      {t.title}
                    </p>
                    <p style={{ fontSize: isTablet ? 13 : 14, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
