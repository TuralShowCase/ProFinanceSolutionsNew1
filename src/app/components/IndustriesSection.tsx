"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, HardHat, Compass, Factory, UtensilsCrossed, Landmark, Cpu, Scale, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DARK, mix } from "@/app/lib/brand";
import { FS_H2, FS_LABEL, FS_H4_MOBILE, FS_BODY } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

// T3 "Fəaliyyət sahələri" — order matches i18n `industries.items`.
// Drop AI-generated photos into /public/industries/ with these names;
// until a file exists, the tile gracefully falls back to a brand gradient + icon.
const INDUSTRY_META = [
  { Icon: ShoppingCart,    img: "/industries/trade.avif" },
  { Icon: HardHat,         img: "/industries/construction.avif" },
  { Icon: Compass,         img: "/industries/design.avif" },
  { Icon: Factory,         img: "/industries/manufacturing.avif" },
  { Icon: UtensilsCrossed, img: "/industries/horeca.avif" },
  { Icon: Landmark,        img: "/industries/finance.avif" },
  { Icon: Cpu,             img: "/industries/tech.avif" },
  { Icon: Scale,           img: "/industries/legal.avif" },
] as const;

/**
 * Sizes and spacing live in responsive.css (`IndustriesSection` there).
 *
 * `useBreakpoint()` stays for `isStacked` alone: below 1024px this renders a
 * grid of photo cards and above it an interactive list beside a crossfading
 * panel — two different trees with different animation targets, not one layout
 * at two sizes.
 */
export function IndustriesSection() {
  const t      = useTranslations("industries");
  const bp     = useBreakpoint();
  const isStacked = bp === "mobile" || bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<boolean[]>(() => INDUSTRY_META.map(() => false));

  const items = INDUSTRY_META.map((meta, i) => ({
    ...meta,
    label: t(`items.${i}` as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ind-hdr",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
      gsap.fromTo(".ind-row",   { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.65, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: ".ind-list", start: "top 80%", once: true } });
      gsap.fromTo(".ind-panel", { opacity: 0, y: 24, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "expo.out", scrollTrigger: { trigger: ".ind-list", start: "top 80%", once: true } });
      gsap.fromTo(".ind-card",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: ".ind-cards", start: "top 84%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
    // Only the stacked/desktop flip matters: the two trees animate different
    // elements, so the context has to be rebuilt when one replaces the other.
  }, [isStacked]);

  const markFailed = (i: number) =>
    setFailed(prev => { if (prev[i]) return prev; const next = [...prev]; next[i] = true; return next; });

  const scrollClients = () => {
    document.getElementById("clients")?.scrollIntoView({ behavior: "smooth" });
  };

  const ActiveIcon = items[active].Icon;

  return (
    <section id="industries" ref={sectionRef} className="ind-section" style={{ backgroundColor: "var(--surface)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div className="ind-hdr" style={{ opacity: 0, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: FS_LABEL, fontWeight: 600, color: DARK, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>{t("sectionLabel")}</p>
            <h2 style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_H2, color: "var(--text)", margin: 0, letterSpacing: "-0.035em", lineHeight: 1.08 }}>
              {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.75, margin: "0 0 12px", maxWidth: 400 }}>{t("intro")}</p>
            <button
              onClick={scrollClients}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", padding: 0, cursor: "pointer", color: DARK, fontSize: FS_BODY, fontWeight: 600, fontFamily: "var(--font-inter), 'Inter', sans-serif", transition: "gap 240ms ease" }}
              onMouseEnter={e => (e.currentTarget.style.gap = "11px")}
              onMouseLeave={e => (e.currentTarget.style.gap = "7px")}
            >
              <span style={{ borderBottom: `1.5px solid ${mix(DARK, 45)}`, paddingBottom: 2 }}>{t("link")}</span>
              <ArrowDown size={14} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {isStacked ? (
          /* ── Stacked: photo cards ── */
          <div className="ind-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {items.map(({ Icon, label, img }, i) => {
              const hasImg = !failed[i];
              return (
                <div key={i} className="ind-card" style={{ opacity: 0, position: "relative", aspectRatio: "4 / 3", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", backgroundColor: "var(--page-bg-alt)" }}>
                  {hasImg && (
                    <img src={img} alt={label} loading="lazy" decoding="async" onError={() => markFailed(i)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%", display: "block" }} />
                  )}
                  {!hasImg && (
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(150deg, ${mix(DARK, 13)}, ${mix(DARK, 4)})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={34} color={DARK} strokeWidth={1.5} style={{ opacity: 0.55 }} />
                    </div>
                  )}
                  {hasImg && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,17,12,0) 40%, rgba(10,17,12,0.72) 100%)" }} />}
                  <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: FS_H4_MOBILE, fontWeight: 700, lineHeight: 1.3, color: hasImg ? "#FFFFFF" : "var(--text)", textShadow: hasImg ? "0 1px 10px rgba(0,0,0,0.4)" : "none" }}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Desktop: interactive list + crossfading photo panel ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 64, alignItems: "stretch" }}>

            {/* List */}
            <div className="ind-list" style={{ borderTop: "1px solid var(--border)" }}>
              {items.map(({ Icon, label }, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="ind-row"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    style={{
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      padding: "21px 18px 21px 14px",
                      borderBottom: "1px solid var(--border)",
                      backgroundColor: isActive ? "var(--page-bg-alt)" : "transparent",
                      borderLeft: `3px solid ${isActive ? "var(--brand)" : "transparent"}`,
                      transition: "background-color 320ms ease, border-color 320ms ease",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: FS_LABEL, letterSpacing: "0.06em", color: isActive ? DARK : "var(--text-faint)", width: 26, flexShrink: 0, transition: "color 320ms ease" }}>
                      {`0${i + 1}`}
                    </span>
                    <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: isActive ? DARK : "var(--text)", flex: 1, transition: "color 320ms ease" }}>
                      {label}
                    </span>
                    <Icon size={19} color={isActive ? DARK : "var(--text-faint)"} strokeWidth={1.7} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.55, transform: isActive ? "scale(1.12)" : "scale(1)", transition: "all 320ms ease" }} />
                  </div>
                );
              })}
            </div>

            {/* Photo panel — crossfades with the active row */}
            <div className="ind-panel" style={{ opacity: 0, position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", backgroundColor: "var(--page-bg-alt)", minHeight: 480 }}>
              {/* Fallback layer (visible until the active image exists) */}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(155deg, ${mix(DARK, 14)}, ${mix(DARK, 4)})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ActiveIcon size={72} color={DARK} strokeWidth={1.2} style={{ opacity: 0.4, transition: "opacity 300ms ease" }} />
              </div>

              {items.map(({ label, img }, i) =>
                failed[i] ? null : (
                  <img
                    key={i}
                    src={img}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                    onError={() => markFailed(i)}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block", opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)", transition: "opacity 600ms ease, transform 1200ms ease" }}
                  />
                )
              )}

              {/* Caption chip */}
              <div style={{ position: "absolute", left: 18, bottom: 18, display: "inline-flex", alignItems: "center", gap: 9, backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: 12, padding: "10px 16px", boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }}>
                <ActiveIcon size={16} color={DARK} strokeWidth={2} />
                <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontSize: FS_BODY, fontWeight: 700, color: "#111410" }}>{items[active].label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
