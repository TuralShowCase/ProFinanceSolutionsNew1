"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const DARK  = "#1A3D2B";
const CREAM = "#F5F4F1";

const clients = [
  { name: "Integral Express",         img: "/IntegralExpress.avif" },
  { name: "Dekoriko",                  img: "/Dekoriko.avif" },
  { name: "La Quzu Restaurant",        img: "/laquzurestourant.avif" },
  { name: "Conco",                     img: "/conco.avif" },
  { name: "City Park",                 img: "/CityPark.avif" },
  { name: "Integral Beyond Compare",  img: "/IntegralBeyondCompare.avif" },
  { name: "Integral Telecom",          img: "/integraltelecom.avif" },
  { name: "Shusha Qala",               img: "/ShushaQala.avif" },
  { name: "Cafe City",                 img: "/cafecity.avif" },
  { name: "Cafe City Express",         img: "/CafeCityExpress.avif" },
  { name: "Cafe City Service",         img: "/CafeCityService.avif" },
  { name: "BIMD",                      img: "/BIMD.avif" },
];

// Duplicate for seamless loop
const row1 = [...clients, ...clients];
const row2 = [...clients].reverse();
const row2All = [...row2, ...row2];

// ── Logo card ─────────────────────────────────────────────────────────────────
function LogoCard({ name, img, isMobile }: { name: string; img: string; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: isMobile ? 100 : 130,
        height: isMobile ? 52 : 68,
        borderRadius: 12,
        backgroundColor: "#ffffff",
        border: `1px solid ${hovered ? `${DARK}22` : "#EBEBEB"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: isMobile ? "8px 12px" : "10px 16px",
        transition: "border-color 250ms, box-shadow 250ms, transform 250ms",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(26,61,43,0.09)" : "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <img
        src={img}
        alt={name}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
          filter: hovered ? "none" : "grayscale(20%)",
          transition: "filter 250ms, opacity 250ms",
          opacity: hovered ? 1 : 0.82,
        }}
      />
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ClientsSection() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef = useRef<HTMLDivElement>(null);
  const track1Ref  = useRef<HTMLDivElement>(null);
  const track2Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header stagger ──────────────────────────────────────────
      gsap.fromTo(".clients-anim",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } }
      );

      // ── Marquee fade-in ────────────────────────────────────────
      gsap.fromTo(".clients-marquee",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } }
      );

      // ── Infinite marquee row 1 → ───────────────────────────────
      const t1 = track1Ref.current;
      if (t1) {
        const w1 = t1.scrollWidth / 2;
        gsap.fromTo(t1,
          { x: 0 },
          { x: -w1, duration: 35, ease: "none", repeat: -1 }
        );
      }

      // ── Infinite marquee row 2 ← ───────────────────────────────
      const t2 = track2Ref.current;
      if (t2) {
        const w2 = t2.scrollWidth / 2;
        gsap.fromTo(t2,
          { x: -w2 },
          { x: 0, duration: 28, ease: "none", repeat: -1 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const hPad = isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px";
  const fade = isMobile ? 60 : isTablet ? 100 : 180;

  return (
    <section
      id="clients"
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: isMobile ? "72px 0 64px" : "100px 0 88px",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: hPad, marginBottom: isMobile ? 48 : 60 }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: isMobile ? 24 : 40,
          flexWrap: "wrap",
        }}>
          {/* Left */}
          <div>
            <p className="clients-anim" style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0 }}>
              Müştərilərimiz
            </p>
            <h2 className="clients-anim" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? 26 : "clamp(28px, 3.5vw, 44px)",
              color: "#111410",
              margin: 0,
              letterSpacing: "-0.038em",
              lineHeight: 1.08,
              opacity: 0,
            }}>
              Etibarlı <span style={{ color: DARK }}>tərəfdaşlarımız</span>
            </h2>
          </div>

          {/* Right: stats + subtitle */}
          <div className="clients-anim" style={{ opacity: 0 }}>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 320 }}>
              Azərbaycanın aparıcı korporasiyaları bizə etibar edir.
            </p>
            <div style={{ display: "flex", gap: 28 }}>
              {[
                { value: "12+", label: "Korporativ müştəri" },
                { value: "5+",  label: "İl tərəfdaşlıq" },
              ].map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: DARK, margin: 0, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: "#9CA3AF", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="clients-anim" style={{ height: 1, backgroundColor: "#EBEBEB", marginTop: 36, opacity: 0 }} />
      </div>

      {/* ── Marquee rows ── */}
      <div className="clients-marquee" style={{ opacity: 0, position: "relative" }}>
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fade, background: "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: fade, background: "linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />

        {/* Row 1 → */}
        <div style={{ overflow: "hidden", marginBottom: 14 }}>
          <div ref={track1Ref} style={{ display: "flex", gap: 14, width: "max-content" }}>
            {row1.map((c, i) => (
              <LogoCard key={`r1-${i}`} name={c.name} img={c.img} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Row 2 ← */}
        <div style={{ overflow: "hidden" }}>
          <div ref={track2Ref} style={{ display: "flex", gap: 14, width: "max-content" }}>
            {row2All.map((c, i) => (
              <LogoCard key={`r2-${i}`} name={c.name} img={c.img} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom trust line ── */}
      <div className="clients-anim" style={{
        maxWidth: 1200,
        margin: "48px auto 0",
        padding: hPad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        opacity: 0,
      }}>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(90deg, transparent, #E5E7EB)" }} />
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: CREAM,
          borderRadius: 999,
          padding: "7px 18px",
          fontSize: 12,
          fontWeight: 500,
          color: "#6B7280",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", flexShrink: 0 }} />
          Bakı, Azərbaycanda fəaliyyət göstəririk
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(270deg, transparent, #E5E7EB)" }} />
      </div>
    </section>
  );
}
