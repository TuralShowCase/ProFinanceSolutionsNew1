"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Building2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { CounterStat } from "./CounterStat";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const PROGREEN = "#1A3D2B";   // ProFinance brand — used outside the card
const PLH_DARK = "#092c3a";   // PLH brand dark navy
const PLH_MID  = "#0d3d50";   // PLH brand mid
const PLH_ACC  = "#29a9bd";   // PLH brand teal
const CREAM    = "#F5F4F1";

const features = [
  {
    Icon: FileText,
    title: "Müqavilə Hazırlanması",
    desc: "Biznes münasibətlərini hüquqi cəhətdən qoruyan müqavilələr və sənədlər hazırlanır.",
  },
  {
    Icon: Building2,
    title: "Korporativ Strukturlaşdırma",
    desc: "Şirkətin hüquqi quruluşu optimallaşdırılır, nizamnamə və daxili aktlar tənzimlənir.",
  },
  {
    Icon: ShieldCheck,
    title: "Hüquqi Diaqnostika",
    desc: "Mövcud hüquqi risklər müəyyən edilir, audit aparılır və tövsiyələr hazırlanır.",
  },
];

const stats = [
  { end: 11,  suffix: "+",  label: "Hüquqi xidmət" },
  { end: 5,   suffix: "+",  label: "İl tərəfdaşlıq" },
  { end: 100, suffix: "%",  label: "Məxfilik" },
];

const tags = ["Korporativ hüquq", "Müqavilə hüququ", "Hüquqi müdafiə", "11+ xidmət"];

export function PartnerSection() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const humanRef   = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".partner-hdr",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } }
      );

      // Main card
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 44, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "expo.out",
          scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true } }
      );

      // Human figure
      if (humanRef.current) {
        gsap.fromTo(humanRef.current,
          { opacity: 0, y: 56 },
          { opacity: 1, y: 0, duration: 0.95, ease: "expo.out", delay: 0.25,
            scrollTrigger: { trigger: wrapRef.current, start: "top 80%", once: true } }
        );
      }

      // Feature cards
      gsap.fromTo(".partner-feat",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".partner-features", start: "top 82%", once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const pad = isMobile
    ? "64px 20px 72px"
    : isTablet
    ? "80px 28px 88px"
    : "100px 40px 108px";

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: CREAM, padding: pad, fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div
          className="partner-hdr"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 40,
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: PLH_ACC, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
              Tərəfdaşlıq
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? 28 : "clamp(30px, 3.8vw, 50px)",
              color: "#111410",
              margin: 0,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}>
              Hüquqi <span style={{ color: PLH_DARK }}>tərəfdaşımız</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
            Müştərilərimizə tam hüquqi dəstək üçün PLH Hüquq Bürosu ilə strateji tərəfdaşlıq qururuq.
          </p>
        </div>

        <div style={{ height: 1, backgroundColor: `${PLH_ACC}30`, marginBottom: 36 }} />


        {/* ── Main partnership card ── */}
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            marginBottom: 14,
            // Extra top space so human can bleed above on desktop
            paddingTop: !isMobile && !isTablet ? 80 : 0,
            // mobile/tablet: no extra space needed, human is in-flow inside card
          }}
        >
          {/* Desktop only: human as absolute, bleeds above card */}
          {!isMobile && !isTablet && (
            <img
              ref={humanRef}
              src="/PartnerHuman.png"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: "110%",
                width: "auto",
                maxWidth: "46%",
                objectFit: "contain",
                objectPosition: "bottom right",
                zIndex: 2,
                pointerEvents: "none",
                userSelect: "none",
                filter: "drop-shadow(-12px 0 28px rgba(9,44,58,0.38))",
              }}
            />
          )}

          {/* Dark green card */}
          <div
            ref={cardRef}
            style={{
              background: `linear-gradient(145deg, ${PLH_DARK} 0%, ${PLH_MID} 100%)`,
              borderRadius: 24,
              overflow: "hidden",
              position: "relative",
              opacity: 0,
            }}
          >

            {/* Corner glow */}
            <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${PLH_ACC}12 0%, transparent 65%)`, pointerEvents: "none" }} />

            {/* Content — left portion only (leaves room for human on right) */}
            <div style={{
              width: isMobile ? "100%" : isTablet ? "100%" : "50%",
              padding: isMobile ? "40px 28px" : isTablet ? "52px 48px" : "64px 64px",
              position: "relative",
              zIndex: 1,
            }}>
              {/* Logo + name block — on mobile/tablet, human sits beside as flex-end sibling */}
              {(isMobile || isTablet) ? (
                /* WhyUs-style: flex-end aligns human feet with text bottom = divider */
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 0 }}>
                  {/* Text side — paddingBottom lifts text above the divider line */}
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 24 }}>
                    {/* Logo — centered, larger */}
                    <img
                      src="/PLHLogo.png"
                      alt="PLH Hüquq Bürosu"
                      style={{ height: isMobile ? 96 : 116, width: "auto", objectFit: "contain", display: "block", marginBottom: 16 }}
                    />
                    {/* Name */}
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 17 : 20, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.15, display: "block", marginBottom: 10 }}>
                      PLH Hüquq Bürosu
                    </span>
                  </div>

                  {/* Human — flex-end means feet touch the divider below */}
                  <div style={{ flexShrink: 0, position: "relative", marginRight: -4, pointerEvents: "none" }}>
                    <img
                      ref={humanRef}
                      src="/PartnerHuman.png"
                      alt=""
                      aria-hidden="true"
                      style={{
                        height: isMobile ? 190 : 240,
                        width: "auto",
                        display: "block",
                        filter: "drop-shadow(-6px 0 18px rgba(9,44,58,0.5))",
                        userSelect: "none",
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* Desktop: logo block only (human is absolute outside) */
                <div style={{ marginBottom: 28 }}>
                  <img
                    src="/PLHLogo.png"
                    alt="PLH Hüquq Bürosu"
                    style={{ height: 130, width: "auto", objectFit: "contain", display: "block", marginBottom: 20 }}
                  />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.1, display: "block" }}>
                    PLH Hüquq Bürosu
                  </span>
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 24 }} />

              {/* Description */}
              <p style={{ fontSize: isMobile ? 14 : 15, color: "rgba(255,255,255,0.52)", lineHeight: 1.82, margin: "0 0 24px", maxWidth: 420 }}>
                Mühasibat və maliyyə məsələlərinin hüquqi tərəflərini PLH Hüquq Bürosu ilə birlikdə həll edirik.
                Müqavilə hazırlanmasından korporativ strukturlaşdırmaya qədər tam dəstək.
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 999,
                    padding: "5px 14px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.68)",
                  }}>{tag}</span>
                ))}
              </div>

              {/* Stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginBottom: 28,
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <CounterStat
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={stat.end >= 100 ? 1.8 : 1.2}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: isMobile ? 22 : 28,
                        color: "#ffffff",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        marginBottom: 5,
                        display: "block",
                      }}
                    />
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Link to PLH */}
              <a
                href="https://plh.az"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  color: PLH_ACC,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "gap 220ms",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
                onMouseLeave={e => (e.currentTarget.style.gap = "7px")}
              >
                plh.az saytına keç <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div
          className="partner-features"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          {features.map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              className="partner-feat"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: isMobile ? "24px 20px" : "28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                opacity: 0,
                borderTop: `3px solid transparent`,
                transition: "box-shadow 260ms",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(26,61,43,0.09)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 44, height: 44,
                borderRadius: 12,
                backgroundColor: `${PLH_ACC}15`,
                border: `1.5px solid ${PLH_ACC}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={20} color={PLH_ACC} strokeWidth={1.7} />
              </div>
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 15,
                  color: "#111410", margin: "0 0 8px",
                  letterSpacing: "-0.015em",
                }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
