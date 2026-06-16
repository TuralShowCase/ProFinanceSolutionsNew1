"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { FAQAccordion, type FAQItem } from "./FAQAccordion";
import { DARK, ACCENT, BRAND_SOLID, mix } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const FAQ_COUNT = 7;

export function HomeFAQSection() {
  const t      = useTranslations("faq");
  const bp     = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();

  const faqs: FAQItem[] = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`items.${i}.question` as Parameters<typeof t>[0]),
    answer:   t(`items.${i}.answer`   as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hfaq-left", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
      gsap.fromTo(".faq-item",  { opacity: 0, y: 14, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".hfaq-accordion", start: "top 82%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pad = isMobile ? "72px 20px 80px" : isTablet ? "88px 28px 96px" : "110px 48px 120px";

  return (
    <section id="faq" ref={sectionRef} style={{ background: "linear-gradient(160deg, var(--page-bg) 0%, var(--page-bg-alt) 55%, var(--page-bg) 100%)", padding: pad, fontFamily: "var(--font-inter), 'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: -120, left: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, ${mix(ACCENT, 13)} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${mix(DARK, 6)} 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "340px 1fr", gap: isMobile ? 44 : isTablet ? 52 : 88, alignItems: "start" }}>

          {/* Left */}
          <div className="hfaq-left" style={{ opacity: 0, position: isMobile || isTablet ? "static" : "sticky", top: 120 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: `${mix(DARK, 6)}`, border: `1px solid ${mix(DARK, 10)}`, borderRadius: 100, padding: "5px 14px 5px 10px", marginBottom: 24 }}>
              <MessageCircle size={13} color={DARK} strokeWidth={2} />
              <span style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.12em", textTransform: "uppercase" }}>{t("badge")}</span>
            </div>

            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px, 8vw, 38px)" : isTablet ? "clamp(34px, 5.5vw, 46px)" : "clamp(36px, 3.4vw, 50px)", color: "var(--text)", margin: "0 0 16px", letterSpacing: "-0.044em", lineHeight: 1.06 }}>
              {t("heading")}{" "}<span style={{ color: DARK, position: "relative", display: "inline-block" }}>{t("headingAccent")}</span>
              <br />{t("headingSuffix")}
            </h2>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 28, color: DARK, letterSpacing: "-0.05em", lineHeight: 1 }}>{faqs.length}</span>
              <span style={{ fontSize: 13, color: "var(--text-faint)", fontWeight: 500, lineHeight: 1.3 }}>{t("detailedAnswers")}</span>
            </div>

            <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, ${mix(DARK, 13)}, transparent)`, marginBottom: 20 }} />

            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.82, margin: "0 0 32px", maxWidth: isMobile || isTablet ? 520 : 290 }}>{t("description")}</p>

            <button
              onClick={openContact}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: BRAND_SOLID, color: "#ffffff", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 700, fontSize: 14, padding: "13px 22px", borderRadius: 10, border: "none", cursor: "pointer", transition: "box-shadow 320ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 4px 20px ${mix(DARK, 19)}` }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = `0 8px 32px ${mix(DARK, 27)}`; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = `0 4px 20px ${mix(DARK, 19)}`; el.style.transform = "translateY(0)"; }}
            >
              {t("cta")} <ArrowUpRight size={15} strokeWidth={2} />
            </button>
          </div>

          {/* Right */}
          <div className="hfaq-accordion">
            <FAQAccordion items={faqs} isMobile={isMobile} />
          </div>
        </div>
      </div>
    </section>
  );
}
