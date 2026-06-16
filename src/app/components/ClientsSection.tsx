"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DARK, CREAM } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);


const clients = [
  { name: "Integral Express",        img: "/IntegralExpress.avif" },
  { name: "Dekoriko",                 img: "/Dekoriko.avif" },
  { name: "La Quzu Restaurant",       img: "/laquzurestourant.avif" },
  { name: "Conco",                    img: "/conco.avif" },
  { name: "City Park",                img: "/CityPark.avif" },
  { name: "Integral Beyond Compare",  img: "/IntegralBeyondCompare.avif" },
  { name: "Integral Telecom",         img: "/integraltelecom.avif" },
  { name: "Shusha Qala",              img: "/ShushaQala.avif" },
  { name: "Cafe City",                img: "/cafecity.avif" },
  { name: "Cafe City Express",        img: "/CafeCityExpress.avif" },
  { name: "Cafe City Service",        img: "/CafeCityService.avif" },
  { name: "BIMD",                     img: "/BIMD.avif" },
];

function ClientCard({ name, img, isMobile }: { name: string; img: string; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="client-card-anim" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0, backgroundColor: "var(--surface)", borderRadius: 14, border: `1px solid ${hovered ? "color-mix(in srgb, var(--brand) 22%, transparent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "18px 14px" : "24px 20px", height: isMobile ? 76 : 92, transition: "border-color 360ms ease, box-shadow 360ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 10px 32px color-mix(in srgb, var(--brand) 9%, transparent), 0 2px 8px rgba(0,0,0,0.04)" : "0 1px 4px rgba(0,0,0,0.04)", cursor: "default", userSelect: "none" }}
    >
      <img src={img} alt={name} style={{ maxWidth: "100%", maxHeight: isMobile ? 34 : 42, objectFit: "contain", display: "block", filter: hovered ? "none" : "grayscale(18%)", opacity: hovered ? 1 : 0.82, transition: "filter 360ms ease, opacity 360ms ease" }} />
    </div>
  );
}

export function ClientsSection() {
  const t      = useTranslations("clients");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".clients-anim", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".client-card-anim", { opacity: 0, y: 16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "expo.out", stagger: 0.045, scrollTrigger: { trigger: ".clients-grid", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const hPad = isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px";

  return (
    <section id="clients" ref={sectionRef} style={{ backgroundColor: "var(--surface)", padding: isMobile ? "72px 0 64px" : "100px 0 88px", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: hPad, marginBottom: isMobile ? 48 : 56 }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", gap: isMobile ? 24 : 40, flexWrap: "wrap" }}>
          <div>
            <p className="clients-anim" style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0 }}>{t("sectionLabel")}</p>
            <h2 className="clients-anim" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : "clamp(28px, 3.5vw, 44px)", color: "var(--text)", margin: 0, letterSpacing: "-0.038em", lineHeight: 1.08, opacity: 0 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <div className="clients-anim" style={{ opacity: 0 }}>
            <p style={{ fontSize: 15, color: "var(--text-faint)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 320 }}>{t("subtext")}</p>
            <div style={{ display: "flex", gap: 28 }}>
              {[{ value: "12+", label: t("stat1Label") }, { value: "5+", label: t("stat2Label") }].map((s, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: DARK, margin: 0, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: "var(--text-faint)", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="clients-anim" style={{ height: 1, backgroundColor: "var(--border)", marginTop: 36, opacity: 0 }} />
      </div>

      <div className="clients-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: hPad, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 10 : 14 }}>
        {clients.map((c, i) => <ClientCard key={i} name={c.name} img={c.img} isMobile={isMobile} />)}
      </div>

      <div className="clients-anim" style={{ maxWidth: 1200, margin: "48px auto 0", padding: hPad, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: 0 }}>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(90deg, transparent, var(--border))" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: CREAM, borderRadius: 999, padding: "7px 18px", fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent-green)", flexShrink: 0 }} />
          {t("trustLine")}
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(270deg, transparent, var(--border))" }} />
      </div>
    </section>
  );
}
