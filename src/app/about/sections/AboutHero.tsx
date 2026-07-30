"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { SubpageHero } from "../../components/SubpageHero";
import { FS_DISPLAY_MOBILE, FS_DISPLAY_TABLET, FS_DISPLAY_DESKTOP } from "@/app/lib/typography";

export function AboutHero() {
  const t        = useTranslations("about.hero");
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .fromTo(".abt-line", { opacity: 0, y: 26, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.12 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", paddingTop: 72, fontFamily: "var(--font-inter), 'Inter', sans-serif", overflow: "hidden" }}>
      <SubpageHero>
        <h1 className="about-tagline" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? FS_DISPLAY_MOBILE : isTablet ? FS_DISPLAY_TABLET : FS_DISPLAY_DESKTOP, color: "var(--text)", margin: 0, letterSpacing: "-0.044em", lineHeight: 1.0, overflowWrap: "anywhere" }}>
          <span className="abt-line" style={{ display: "block" }}>{t("line1")}</span>
          <span className="abt-line" style={{ display: "block", color: "var(--brand)" }}>{t("line2")}</span>
          <span className="abt-line" style={{ display: "block" }}>{t("line3")}</span>
        </h1>
      </SubpageHero>
    </section>
  );
}
