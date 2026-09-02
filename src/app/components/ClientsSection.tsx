"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { DARK, CREAM } from "@/app/lib/brand";
import { FS_H2, FS_LABEL } from "@/app/lib/typography";

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

function LogoChip({ name, img }: { name: string; img: string }) {
  return (
    <div className="clients-logo" style={{ flexShrink: 0, backgroundColor: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", userSelect: "none" }}>
      <img src={img} alt={name} loading="lazy" style={{ maxWidth: "100%", objectFit: "contain", display: "block", filter: "grayscale(14%)", opacity: 0.88 }} />
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: typeof clients; reverse?: boolean }) {
  const half = [...items, ...items, ...items];
  const doubled = [...half, ...half];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className={reverse ? "carousel-track-reverse" : "carousel-track"} style={{ display: "flex", width: "max-content", padding: "2px 0" }}>
        {doubled.map((c, i) => <LogoChip key={i} name={c.name} img={c.img} />)}
      </div>
      {}
      <div className="clients-fade" style={{ position: "absolute", top: 0, bottom: 0, left: 0, background: "linear-gradient(90deg, var(--surface), transparent)", pointerEvents: "none" }} />
      <div className="clients-fade" style={{ position: "absolute", top: 0, bottom: 0, right: 0, background: "linear-gradient(270deg, var(--surface), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

export function ClientsSection() {
  const t      = useTranslations("clients");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".clients-anim",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true } });
      gsap.fromTo(".clients-marquee", { opacity: 0 }, { opacity: 1, duration: 1.0, ease: "power2.out", scrollTrigger: { trigger: ".clients-marquee", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" ref={sectionRef} className="clients-section" style={{ backgroundColor: "var(--surface)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      {}
      {}
      <div className="clients-inner" style={{ maxWidth: 1200 }}>
        <div>
          <p className="clients-anim" style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", opacity: 0 }}>{t("sectionLabel")}</p>
          <h2 className="clients-anim" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.038em", lineHeight: 1.08, opacity: 0 }}>
            {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
          </h2>
        </div>
        <div className="clients-anim" style={{ height: 1, backgroundColor: "var(--border)", marginTop: 32, opacity: 0 }} />
      </div>

      {}
      <div className="clients-marquee" style={{ display: "flex", flexDirection: "column", opacity: 0 }}>
        <MarqueeRow items={clients.slice(0, 6)} />
        <MarqueeRow items={clients.slice(6)} reverse />
      </div>

      <div className="clients-anim clients-foot" style={{ maxWidth: 1200, margin: "48px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: 0 }}>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(90deg, transparent, var(--border))" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: CREAM, borderRadius: 999, padding: "7px 18px", fontSize: FS_LABEL, fontWeight: 500, color: "var(--text-muted)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent-green)", flexShrink: 0 }} />
          {t("trustLine")}
        </div>
        <div style={{ height: 1, flex: 1, maxWidth: 140, background: "linear-gradient(270deg, transparent, var(--border))" }} />
      </div>
    </section>
  );
}
