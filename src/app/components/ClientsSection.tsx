"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Integral Express", img: "/IntegralExpress.avif" },
  { name: "Dekoriko", img: "/Dekoriko.avif" },
  { name: "La Quzu Restaurant", img: "/laquzurestourant.avif" },
  { name: "Conco", img: "/conco.avif" },
  { name: "City Park", img: "/CityPark.avif" },
  { name: "Integral Beyond Compare", img: "/IntegralBeyondCompare.avif" },
  { name: "Integral Telecom", img: "/integraltelecom.avif" },
  { name: "Shusha Qala", img: "/ShushaQala.avif" },
  { name: "Cafe City", img: "/cafecity.avif" },
  { name: "Cafe City Express", img: "/CafeCityExpress.avif" },
  { name: "Cafe City Service", img: "/CafeCityService.avif" },
  { name: "BIMD", img: "/BIMD.avif" },
];

const allClients = [...clients, ...clients];

export function ClientsSection() {
  const bp        = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".client-header-anim", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(".client-carousel-anim", { opacity: 0 }, {
        opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "72px 0" : "110px 0";
  const headerPadding  = isMobile ? "0 20px" : isTablet ? "0 24px" : "0 40px";
  const fadeWidth      = isMobile ? 60 : isTablet ? 100 : 160;
  const cardMinWidth   = isMobile ? 160 : 200;

  return (
    <section
      id="clients"
      ref={sectionRef}
      style={{ backgroundColor: "#FFFFFF", padding: sectionPadding, fontFamily: "'Inter', sans-serif", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto 56px", padding: headerPadding }}>
        <div className="client-header-anim" style={{ opacity: 0, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: "#F0F7F4", color: "#1A3D2B",
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "6px 16px", borderRadius: 999, marginBottom: 20,
            border: "1px solid rgba(26,61,43,0.1)",
          }}>
            Müştərilərimiz
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#0F1117", margin: "0 0 14px 0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Etibarlı tərəfdaşlarımız
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#6B7280", margin: "0 auto", maxWidth: 460, lineHeight: 1.6 }}>
            Azərbaycanın aparıcı korporasiyaları bizə etibar edir
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="client-carousel-anim" style={{ opacity: 0, position: "relative" }}>
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fadeWidth, background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: fadeWidth, background: "linear-gradient(270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)", zIndex: 2, pointerEvents: "none" }} />

        {/* Row 1 */}
        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <div className="carousel-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
            {allClients.map((client, i) => (
              <ClientCard key={`r1-${i}`} client={client} cardMinWidth={cardMinWidth} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ overflow: "hidden" }}>
          <div className="carousel-track-reverse" style={{ display: "flex", gap: 16, width: "max-content" }}>
            {[...allClients].reverse().map((client, i) => (
              <ClientCard key={`r2-${i}`} client={client} cardMinWidth={cardMinWidth} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom count */}
      <div style={{ maxWidth: 1280, margin: "40px auto 0", padding: headerPadding, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
        <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(90deg, transparent, #E5E7EB)" }} />
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF", fontWeight: 500, whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 700, color: "#1A3D2B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12</span>{" "}
          korporativ müştəri · Bakı, Azərbaycan
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(270deg, transparent, #E5E7EB)" }} />
      </div>
    </section>
  );
}

function ClientCard({ client, cardMinWidth, isMobile }: { client: { name: string; img: string }; cardMinWidth: number; isMobile: boolean }) {
  return (
    <div
      style={{
        backgroundColor: "#FAFAFA", border: "1px solid #EDEEED", borderRadius: 12,
        padding: isMobile ? "12px 16px" : "14px 20px",
        display: "flex", alignItems: "center", gap: isMobile ? 10 : 14,
        minWidth: cardMinWidth, flexShrink: 0, cursor: "default",
        transition: "box-shadow 250ms, border-color 250ms, background-color 250ms",
        userSelect: "none",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "#D5DDD5"; e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#EDEEED"; e.currentTarget.style.backgroundColor = "#FAFAFA"; }}
    >
      <div style={{ width: isMobile ? 48 : 64, height: isMobile ? 32 : 40, borderRadius: 8, backgroundColor: "#FFFFFF", border: "1px solid #EBEBEB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 4 }}>
        <img src={client.img} alt={client.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: isMobile ? 12 : 13, color: "#4B5563", lineHeight: 1.3, whiteSpace: "nowrap" }}>
        {client.name}
      </span>
    </div>
  );
}
