"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Building2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { CounterStat } from "./CounterStat";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

export function PartnerSection() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".partner-anim", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding  = isMobile ? "64px 20px" : isTablet ? "80px 24px" : "120px 40px";
  const logoHeight      = isMobile ? 80 : isTablet ? 110 : 150;
  const brandFontSize   = isMobile ? 18 : isTablet ? 22 : 26;
  const leftPanelPad    = isMobile ? "36px 28px" : isTablet ? "40px 32px" : "56px 52px";
  const rightPanelPad   = isMobile ? "28px 24px" : isTablet ? "40px 36px" : "52px 56px";
  const ringSize        = isMobile ? [280, 200, 130] : [480, 360, 250];

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#FFFFFF", padding: sectionPadding, fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div
          className="partner-anim"
          style={{
            opacity: 0, display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 40, marginBottom: 52, flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#29a9bd", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px", fontFamily: "'Inter', sans-serif" }}>
              Tərəfdaşlıq
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3.8vw, 50px)", color: "#111410", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              Hüquqi <span style={{ color: "#092c3a" }}>tərəfdaşımız</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
            Müştərilərimizə tam hüquqi dəstək üçün PLH Hüquq Bürosu ilə strateji tərəfdaşlıq qururuq.
          </p>
        </div>

        {/* Divider */}
        <div className="partner-anim" style={{ opacity: 0, height: 1, backgroundColor: "rgba(41,169,189,0.18)", marginBottom: 48 }} />

        {/* Feature card */}
        <div className="partner-anim" style={{ opacity: 0 }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)",
          }}>
            {/* LEFT — PLH brand zone */}
            <div style={{
              flex: isMobile ? undefined : "0 0 38%",
              background: "linear-gradient(145deg, #092c3a 0%, #0d3d50 100%)",
              position: "relative", overflow: "hidden",
              padding: leftPanelPad,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              minHeight: isMobile ? 280 : 420,
            }}>
              {/* Concentric rings */}
              {ringSize.map((size, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%",
                  right: -(size / 2) + 60, transform: "translateY(-50%)",
                  width: size, height: size, borderRadius: "50%",
                  border: `1px solid rgba(41,169,189,${0.08 + i * 0.06})`,
                  pointerEvents: "none",
                }} />
              ))}
              {/* Glow */}
              <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(41,169,189,0.2) 0%, transparent 65%)", pointerEvents: "none" }} />

              {/* Logo block */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <img src="/PLHLogo.png" alt="PLH Hüquq Bürosu" style={{ height: logoHeight, width: "auto", objectFit: "contain", display: "block", marginBottom: 24 }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: brandFontSize, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  PLH Hüquq Bürosu
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#29a9bd", flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, fontFamily: "'Inter', sans-serif" }}>Hüquqi Tərəfdaş</p>
                </div>
              </div>

              {/* Bottom stamp */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ height: 1, backgroundColor: "rgba(41,169,189,0.2)", marginBottom: 16 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
                    PROBIZ LEGAL HUB
                  </p>
                  <a href="https://plh.az" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#29a9bd", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em", transition: "opacity 200ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    plh.az <ArrowUpRight size={12} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — white content zone */}
            <div style={{
              flex: 1, backgroundColor: "#FFFFFF",
              padding: rightPanelPad,
              display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32,
            }}>
              {/* Tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["11 hüquqi xidmət", "Korporativ hüquq", "Hüquqi müdafiə", "Müqavilə hüququ"].map((tag) => (
                  <span key={tag} style={{ backgroundColor: "rgba(41,169,189,0.1)", color: "#092c3a", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 999, fontFamily: "'Inter', sans-serif" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Heading + description */}
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(20px, 2.2vw, 30px)", color: "#111410", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  Fərdi və korporativ müştərilər üçün tam hüquqi dəstək
                </h3>
                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.78, margin: 0 }}>
                  Mühasibat və maliyyə məsələlərinin hüquqi tərəflərini PLH Hüquq Bürosu ilə birlikdə həll edirik.
                  Müqavilə hazırlanmasından tutmuş korporativ strukturlaşdırmaya qədər tam dəstək.
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, paddingTop: 28, borderTop: "1px solid #EBEBEB" }}>
                {[
                  { end: 11, suffix: "+", label: "Hüquqi xidmət" },
                  { end: 5,  suffix: "+", label: "İl tərəfdaşlıq" },
                  { end: 100, suffix: "%", label: "Məxfilik zəmanəti" },
                ].map((stat, i) => (
                  <div key={i} style={{ paddingLeft: i > 0 ? 28 : 0, borderLeft: i > 0 ? "1px solid #EBEBEB" : "none" }}>
                    <CounterStat end={stat.end} suffix={stat.suffix} duration={stat.end >= 100 ? 1.8 : 1.2}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: "#092c3a", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 5, display: "block" }}
                    />
                    <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How we collaborate */}
        <div
          className="partner-anim"
          style={{
            opacity: 0, marginTop: 14,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            border: "1px solid #EBEBEB", borderRadius: 16, overflow: "hidden",
          }}
        >
          {[
            { Icon: FileText, title: "Müqavilə Hazırlanması", desc: "Biznes münasibətlərini hüquqi cəhətdən qoruyan müqavilələr və sənədlər hazırlanır." },
            { Icon: Building2, title: "Korporativ Strukturlaşdırma", desc: "Şirkətin hüquqi quruluşu optimallaşdırılır, nizamnamə və daxili aktlar tənzimlənir." },
            { Icon: ShieldCheck, title: "Hüquqi Diaqnostika", desc: "Mövcud hüquqi risklər müəyyən edilir, audit aparılır və tövsiyələr hazırlanır." },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} style={{
              backgroundColor: "#FFFFFF", padding: isMobile ? "24px 20px" : "32px 36px",
              borderLeft: !isMobile && i > 0 ? "1px solid #EBEBEB" : "none",
              borderTop: isMobile && i > 0 ? "1px solid #EBEBEB" : "none",
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: "rgba(41,169,189,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={20} color="#29a9bd" strokeWidth={1.7} />
              </div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111410", margin: "0 0 8px", letterSpacing: "-0.015em" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.72, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
