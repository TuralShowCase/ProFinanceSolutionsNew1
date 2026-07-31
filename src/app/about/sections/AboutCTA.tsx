"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useContactModal } from "../../contexts/ContactModalContext";
import { ACCENT, INVERT } from "@/app/lib/brand";
import { FS_H3 } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);


function CTAButton({ children, href, onClick, primary, icon }: {
  children: React.ReactNode; href?: string; onClick?: () => void;
  primary?: boolean; icon?: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontWeight: primary ? 700 : 500, fontSize: 18, padding: "14px 30px", borderRadius: 9,
    textDecoration: "none", whiteSpace: "nowrap",
    transition: "background-color 320ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 320ms ease",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    ...(primary
      ? { backgroundColor: hovered ? "var(--cta-bg-hover)" : "var(--cta-bg)", color: "var(--cta-text)" }
      : { backgroundColor: hovered ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.06)", color: "#FFFFFF", border: hovered ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.18)" }),
  };
  if (onClick) return <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ ...sharedStyle, border: primary ? "none" : sharedStyle.border as string, cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>{icon}{children}</button>;
  return <a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={sharedStyle}>{icon}{children}</a>;
}

export function AboutCTA() {
  const t      = useTranslations("about.cta");
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();
  const cardRef  = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLImageElement>(null);

  const servicesHref = locale === "az" ? "/#services" : `/${locale}#services`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
      tl.fromTo(cardRef.current,  { opacity: 0, y: 44, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" })
        .fromTo(".cta-item",      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.75, ease: "expo.out", stagger: 0.1 }, "-=0.5")
        .fromTo(humanRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9,  ease: "expo.out" }, "-=0.55");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="acta-section" style={{ backgroundColor: "var(--page-bg-alt)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div className="acta-wrap">
        <div ref={cardRef} className="acta-card" style={{ backgroundColor: INVERT, borderRadius: 24, position: "relative", overflow: "visible", opacity: 0 }}>
          <div style={{ position: "absolute", top: 0, left: 60, right: 60, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.4 }} />

          <img ref={humanRef} className="acta-figure" src="/AboutCTAHumans.avif" alt="" aria-hidden="true" style={{ position: "absolute", opacity: 0, pointerEvents: "none", userSelect: "none", width: "auto", objectFit: "contain", objectPosition: "bottom", zIndex: 0 }} />

          <div className="acta-body" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
            <div>
              <h2 className="cta-item" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H3, color: "#ffffff", margin: "0 0 16px", letterSpacing: "-0.04em", lineHeight: 1.08 }}>
                {t("heading")}<br /><span style={{ color: ACCENT }}>{t("headingAccent")}</span>
              </h2>
              <div className="cta-item" style={{ width: 40, height: 2, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 18, opacity: 0.6 }} />
              <p className="cta-item" style={{ fontSize: 18, color: "var(--invert-text-muted)", lineHeight: 1.8, margin: 0 }}>{t("subtext")}</p>
            </div>
            {/* Width comes from `.acta-actions > *` in CSS rather than a
                fullWidth prop, so the buttons no longer need the breakpoint. */}
            <div className="cta-item acta-actions" style={{ display: "flex" }}>
              <CTAButton primary onClick={openContact} icon={<Phone size={15} strokeWidth={1.8} />}>{t("primaryBtn")}</CTAButton>
              <CTAButton href={servicesHref} icon={<ArrowUpRight size={16} />}>{t("secondaryBtn")}</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
