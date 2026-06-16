"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2019",
    title: "Şirkətin Təsisi",
    description: "ProFinance Solutions Bakıda fəaliyyətə başladı. İlk günümdən mühasibat və maliyyə konsaltinqi xidmətləri göstərildi.",
    tag: "Başlanğıc",
    tagColor: "var(--accent-green)",
  },
  {
    year: "2020",
    title: "Korporativ Müştərilər",
    description: "Azərbaycanın aparıcı şirkətləri ilə uzunmüddətli müqavilələr imzalandı. İlk böyük korporativ layihələr uğurla başa çatdırıldı.",
    tag: "Böyümə",
    tagColor: "var(--brand-hover)",
  },
  {
    year: "2021",
    title: "Xidmət Portfelinin Genişlənməsi",
    description: "Vergi konsaltinqi, HR xidmətləri və maliyyə modelləşdirmə portfelə əlavə edildi. Komanda genişləndi, yeni ixtisaslaşmış mütəxəssislər qoşuldu.",
    tag: "Genişlənmə",
    tagColor: "var(--brand-hover)",
  },
  {
    year: "2022",
    title: "PLH Hüquq Bürosu ilə Tərəfdaşlıq",
    description: "PLH Hüquq Bürosu ilə strateji tərəfdaşlıq quruldu. Müştərilərə maliyyə + hüquqi dəstəyin birləşdirilmiş paketi təqdim olundu.",
    tag: "Tərəfdaşlıq",
    tagColor: "var(--brand-light)",
  },
  {
    year: "2025",
    title: "Rəqəmsal Transformasiya",
    description: "ERP tətbiqi, biznes proseslərinin avtomatlaşdırılması və rəqəmsal iş axınlarının qurulması xidmətləri portfelə əlavə edildi.",
    tag: "İnnovasiya",
    tagColor: "var(--accent-green)",
  },
];

export function AboutTimeline() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-header",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });

      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.6, ease: "power2.inOut", transformOrigin: "top",
            scrollTrigger: { trigger: ".tl-items", start: "top 75%", once: true } });
      }

      gsap.fromTo(".tl-item",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".tl-items", start: "top 78%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pad = isMobile ? "64px 20px 72px" : isTablet ? "80px 24px 88px" : "120px 40px 136px";

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--ink)",
        padding: pad,
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="tl-header" style={{ marginBottom: 72 }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 40,
            flexWrap: "wrap",
          }}>
            <div>
              <p style={{
                fontSize: 11, fontWeight: 600, color: "var(--accent-green)",
                letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px",
              }}>Tarixçəmiz</p>
              <h2 style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(30px, 3.8vw, 50px)",
                color: "#FFFFFF", margin: 0,
                letterSpacing: "-0.035em", lineHeight: 1.08,
              }}>
                6 il ərzindəki{" "}
                <span style={{ color: "var(--accent-green)" }}>yolumuz</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0, maxWidth: 360 }}>
              Hər il yeni xidmətlər, yeni tərəfdaşlıqlar — davamlı artım.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="tl-items" style={{ position: "relative" }}>

          {/* Central line — desktop/tablet */}
          {!isMobile && (
            <div ref={lineRef} style={{
              position: "absolute",
              left: "50%", top: 28, bottom: 0,
              width: 1,
              backgroundColor: "color-mix(in srgb, var(--accent-green) 25%, transparent)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }} />
          )}
          {/* Mobile left line */}
          {isMobile && (
            <div ref={lineRef} style={{
              position: "absolute",
              left: 15, top: 28, bottom: 0,
              width: 1,
              backgroundColor: "color-mix(in srgb, var(--accent-green) 25%, transparent)",
            }} />
          )}

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;

            if (isMobile) {
              return (
                <div key={i} className="tl-item" style={{ display: "flex", gap: 28, marginBottom: 40 }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, marginTop: 6, position: "relative" }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      backgroundColor: "var(--ink)",
                      border: "2px solid color-mix(in srgb, var(--accent-green) 50%, transparent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 1, position: "relative",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: m.tagColor }} />
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <span style={{
                      display: "inline-block", fontSize: 11, fontWeight: 600,
                      color: m.tagColor, letterSpacing: "0.06em",
                      backgroundColor: `${m.tagColor}18`,
                      border: `1px solid ${m.tagColor}40`,
                      borderRadius: 999, padding: "3px 12px", marginBottom: 10,
                    }}>{m.tag}</span>
                    <div style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 900, fontSize: 36,
                      color: "rgba(255,255,255,0.08)",
                      letterSpacing: "-0.05em", lineHeight: 1,
                      marginBottom: 4, userSelect: "none",
                    }}>{m.year}</div>
                    <h3 style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700, fontSize: 17,
                      color: "#FFFFFF", margin: "0 0 8px",
                      letterSpacing: "-0.02em",
                    }}>{m.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", lineHeight: 1.72, margin: 0 }}>
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            }

            // Desktop / tablet: alternating
            return (
              <div key={i} className="tl-item" style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 1fr",
                marginBottom: 56,
                alignItems: "flex-start",
              }}>
                {/* Left slot */}
                <div style={{
                  gridColumn: isLeft ? 1 : 3,
                  gridRow: 1,
                  display: "flex",
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                }}>
                  {((isLeft && true) || (!isLeft && false)) ? null : null}
                  <div style={{ maxWidth: 420, textAlign: isLeft ? "right" : "left" }}>
                    <span style={{
                      display: "inline-block", fontSize: 11, fontWeight: 600,
                      color: m.tagColor, letterSpacing: "0.06em",
                      backgroundColor: `${m.tagColor}18`,
                      border: `1px solid ${m.tagColor}40`,
                      borderRadius: 999, padding: "3px 12px", marginBottom: 12,
                    }}>{m.tag}</span>
                    <div style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 900,
                      fontSize: isTablet ? 52 : 72,
                      color: "rgba(255,255,255,0.06)",
                      letterSpacing: "-0.05em", lineHeight: 1,
                      marginBottom: -8, userSelect: "none",
                    }}>{m.year}</div>
                    <h3 style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: isTablet ? 18 : 22,
                      color: "#FFFFFF", margin: "0 0 10px",
                      letterSpacing: "-0.025em",
                    }}>{m.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", lineHeight: 1.75, margin: 0 }}>
                      {m.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div style={{
                  gridColumn: 2, gridRow: 1,
                  display: "flex", justifyContent: "center",
                  paddingTop: 12, position: "relative", zIndex: 1,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    backgroundColor: "var(--ink)",
                    border: "2px solid color-mix(in srgb, var(--accent-green) 60%, transparent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: m.tagColor }} />
                  </div>
                </div>

                {/* Right slot — empty for alternating */}
                <div style={{ gridColumn: isLeft ? 3 : 1, gridRow: 1 }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
