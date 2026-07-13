"use client";

import { useEffect, useRef } from "react";
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

function LogoChip({ name, img, isMobile }: { name: string; img: string; isMobile: boolean }) {
  return (
    <div style={{ flexShrink: 0, width: isMobile ? 168 : 216, height: isMobile ? 76 : 92, marginRight: isMobile ? 10 : 14, backgroundColor: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "16px 18px" : "22px 26px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", userSelect: "none" }}>
      <img src={img} alt={name} loading="lazy" style={{ maxWidth: "100%", maxHeight: isMobile ? 34 : 42, objectFit: "contain", display: "block", filter: "grayscale(14%)", opacity: 0.88 }} />
    </div>
  );
}

// Seamless marquee row: each loop half repeats the logo set 3× (~4100px on
// desktop) so even ultra-wide viewports never outrun the track, then the half
// is doubled for the CSS -50% loop. Spacing lives on the chips (marginRight),
// not flex gap, so -50% lands exactly on a period boundary — no seam jump.
function MarqueeRow({ items, reverse, isMobile }: { items: typeof clients; reverse?: boolean; isMobile: boolean }) {
  const half = [...items, ...items, ...items];
  const doubled = [...half, ...half];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className={reverse ? "carousel-track-reverse" : "carousel-track"} style={{ display: "flex", width: "max-content", padding: "2px 0" }}>
        {doubled.map((c, i) => <LogoChip key={i} name={c.name} img={c.img} isMobile={isMobile} />)}
      </div>
      {/* Edge fades so the loop reads as continuous */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: isMobile ? 40 : 120, background: "linear-gradient(90deg, var(--surface), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: isMobile ? 40 : 120, background: "linear-gradient(270deg, var(--surface), transparent)", pointerEvents: "none" }} />
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
      gsap.fromTo(".clients-anim",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".clients-marquee", { opacity: 0 }, { opacity: 1, duration: 1.0, ease: "power2.out", scrollTrigger: { trigger: ".clients-marquee", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const hPad = isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px";

  return (
    <section id="clients" ref={sectionRef} style={{ backgroundColor: "var(--surface)", padding: isMobile ? "72px 0 64px" : "100px 0 88px", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: hPad, marginBottom: isMobile ? 36 : 44 }}>
        <div>
          <p className="clients-anim" style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0 }}>{t("sectionLabel")}</p>
          <h2 className="clients-anim" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : "clamp(28px, 3.5vw, 44px)", color: "var(--text)", margin: 0, letterSpacing: "-0.038em", lineHeight: 1.08, opacity: 0 }}>
            {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
          </h2>
        </div>
        <div className="clients-anim" style={{ height: 1, backgroundColor: "var(--border)", marginTop: 32, opacity: 0 }} />
      </div>

      {/* Client logos — continuous two-row marquee */}
      <div className="clients-marquee" style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14, opacity: 0 }}>
        <MarqueeRow items={clients.slice(0, 6)} isMobile={isMobile} />
        <MarqueeRow items={clients.slice(6)} reverse isMobile={isMobile} />
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
