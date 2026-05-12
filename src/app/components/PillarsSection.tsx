"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { CounterStat } from "./CounterStat";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    title: "Struktur",
    description:
      "Maliyyə proseslərinizə sistematik yanaşma — hər addım nəzarət altında, hər qərar əsaslandırılmış. Sistemin möhkəm olması, gələcəyinizin etibarlı olması deməkdir.",
    statEnd: 100,
    statSuffix: "%",
    statLabel: "Şəffaf hesabat",
    tags: ["Proseslər", "Metodologiya", "Sənədləşmə"],
  },
  {
    number: "02",
    title: "Nəzarət",
    description:
      "Davamlı monitorinq və hesabat sistemi ilə şəffaflıq hər mərhələdə, hər zaman təmin edilir. Rəqəmlər yalan danışmır — biz onları sizin üçün oxuyuruq.",
    statEnd: 24,
    statSuffix: "/7",
    statLabel: "Dəstək xidməti",
    tags: ["Monitorinq", "Hesabat", "Şəffaflıq"],
  },
  {
    number: "03",
    title: "İnkişaf",
    description:
      "Strateji planlaşdırma ilə biznesinizin dayanıqlı böyüməsini dəstəkləyir, yeni perspektivlər açırıq. Bugünkü qərarlar sabahın nailiyyətidir.",
    statEnd: 13,
    statSuffix: "+",
    statLabel: "Korporativ müştəri",
    tags: ["Strategiya", "Böyümə", "Planlaşdırma"],
  },
];

export function PillarsSection() {
  const bp        = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".plr-top-anim", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
      gsap.fromTo(".plr-row-anim", { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".plr-rows", start: "top 80%" },
      });
      gsap.fromTo(".plr-strip-anim", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".plr-strip", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "64px 20px 0" : isTablet ? "80px 24px 0" : "120px 40px 0";
  // Mobile: extra top padding makes room below the absolute-positioned handshake image
  const stripPadding   = isMobile ? "180px 20px 0" : isTablet ? "56px 24px 0" : "64px 40px 0";

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ backgroundColor: "#FFFFFF", padding: sectionPadding, fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top header */}
        <div
          className="plr-top-anim"
          style={{
            opacity: 0, display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 40, marginBottom: 0, flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 12, fontWeight: 500, color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px 0" }}>
              Əsas Prinsiplər
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(30px, 3.8vw, 50px)", color: "#111410",
              margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08,
            }}>
              Uğurun üç <span style={{ color: "#1A3D2B" }}>dayağı</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
            Hər qərarımızın arxasında üç əsas prinsip dayanır. Bunlar sizi irəliyə aparan metodologiyamızın nüvəsidir.
          </p>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEB", margin: "52px 0 0" }} />

        {/* Rows */}
        <div className="plr-rows">
          {pillars.map((p, i) => (
            <PillarRow key={p.number} {...p} isLast={i === pillars.length - 1} isMobile={isMobile} isTablet={isTablet} />
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="plr-strip" style={{ marginTop: 80 }}>
        <div
          className="plr-strip-anim"
          style={{ opacity: 0, backgroundColor: "#111410", padding: stripPadding, overflow: "visible", position: "relative" }}
        >
          {/* Mobile handshake — absolute at top, pops ABOVE the dark strip
              mixBlendMode:lighten makes the overflowing part (on white bg) invisible,
              creating the 3D "out of the black box" effect */}
          {isMobile && (
            <img
              src="/handshake.png"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -45,
                left: "61%",
                transform: "translateX(-50%)",
                height: 260,
                width: "auto",
                mixBlendMode: "lighten",
                opacity: 1,
                display: "block",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          )}

          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "stretch", flexDirection: isMobile ? "column" : "row" }}>

            {/* Stats grid */}
            <div style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 0,
            }}>
              {[
                { end: 5, suffix: "+", label: "İl təcrübə", sub: "Azərbaycan maliyyə bazarında" },
                { end: 13, suffix: "+", label: "Korporativ müştəri", sub: "Bakı və regionlar üzrə" },
                { end: 100, suffix: "%", label: "Lisenziyalı mütəxəssislər", sub: "Beynəlxalq standartlara uyğun" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: isMobile ? "0 0 40px" : isTablet ? "0 24px 48px" : "0 40px 64px",
                  borderRight: !isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  paddingBottom: isMobile ? (i < 2 ? 32 : 48) : undefined,
                  paddingTop: isMobile && i > 0 ? 32 : undefined,
                  display: "flex", flexDirection: "column", gap: 6,
                }}>
                  <CounterStat
                    end={item.end} suffix={item.suffix}
                    duration={item.end >= 100 ? 1.8 : 1.2}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                      fontSize: "clamp(36px, 4vw, 52px)", color: "#FFFFFF",
                      letterSpacing: "-0.04em", lineHeight: 1,
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Handshake image */}
            {isMobile ? null : (
              <div style={{
                flexShrink: 0, width: isTablet ? 320 : 450,
                position: "relative", overflow: "visible",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}>
                <img src="/handshake.png" alt="Partnership" style={{
                  position: "absolute", bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  height: isTablet ? 240 : 340,
                  width: "auto", mixBlendMode: "lighten", opacity: 0.97, display: "block",
                }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PILLAR ROW ── */
function PillarRow({
  number, title, description, statEnd, statSuffix, statLabel, tags, isLast, isMobile, isTablet,
}: {
  number: string; title: string; description: string;
  statEnd: number; statSuffix: string; statLabel: string;
  tags: string[]; isLast: boolean; isMobile: boolean; isTablet: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  if (isMobile) {
    return (
      <div
        className="plr-row-anim"
        style={{
          opacity: 0, padding: "28px 0",
          borderBottom: isLast ? "none" : "1px solid #EBEBEB",
        }}
      >
        {/* Number + title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: "#C4C9C0", letterSpacing: "0.06em", flexShrink: 0 }}>
            {number}
          </span>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 6vw, 28px)", color: "#111410", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {title}
          </h3>
        </div>
        {/* Description */}
        <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, margin: "0 0 16px 0" }}>
          {description}
        </p>
        {/* Tags + stat */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 500, color: "#9CA3AF",
                backgroundColor: "#F4F4F2", padding: "3px 10px", borderRadius: 999,
              }}>
                <CheckCircle2 size={9} strokeWidth={2.2} />{tag}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <CounterStat end={statEnd} suffix={statSuffix} duration={statEnd >= 100 ? 1.8 : 1.2}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(24px, 6vw, 32px)", color: "#111410",
                letterSpacing: "-0.04em", lineHeight: 1, display: "block",
              }}
            />
            <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, whiteSpace: "nowrap" }}>{statLabel}</div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop / Tablet
  return (
    <div
      className="plr-row-anim"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0,
        display: "grid",
        gridTemplateColumns: isTablet ? "60px 1fr 1fr auto" : "80px 1fr 1fr auto",
        alignItems: "center",
        gap: isTablet ? 20 : 32,
        padding: isTablet ? "36px 16px" : "44px 24px",
        borderBottom: isLast ? "none" : "1px solid #EBEBEB",
        backgroundColor: hovered ? "#F9F8F5" : "transparent",
        borderRadius: hovered ? 12 : 0,
        transition: "background-color 300ms, border-radius 300ms",
        cursor: "default", position: "relative",
      }}
    >
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 13, color: hovered ? "#1A3D2B" : "#C4C9C0", letterSpacing: "0.06em", transition: "color 300ms" }}>
        {number}
      </span>
      <div>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 2.4vw, 32px)", color: "#111410", margin: "0 0 14px 0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          {title}
        </h3>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 500,
              color: hovered ? "#1A3D2B" : "#9CA3AF",
              backgroundColor: hovered ? "rgba(26,61,43,0.07)" : "#F4F4F2",
              padding: "3px 10px", borderRadius: 999, transition: "all 300ms",
            }}>
              <CheckCircle2 size={9} strokeWidth={2.2} />{tag}
            </span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>{description}</p>
      <div style={{ textAlign: "right", flexShrink: 0, minWidth: 100 }}>
        <CounterStat end={statEnd} suffix={statSuffix} duration={statEnd >= 100 ? 1.8 : 1.2}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 3vw, 40px)",
            color: hovered ? "#1A3D2B" : "#111410",
            letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4,
            transition: "color 300ms", display: "block",
          }}
        />
        <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, whiteSpace: "nowrap" }}>{statLabel}</div>
      </div>
    </div>
  );
}
