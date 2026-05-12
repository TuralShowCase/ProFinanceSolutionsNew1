"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Layers, Zap, ShieldCheck, TrendingUp, ArrowDown } from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    title: "Ekspert Yanaşma",
    description:
      "Maliyyə sahəsinin dərin bilik və təcrübəsinə malik mütəxəssislərimiz hər layihəyə fərdi yanaşma ilə qiymətləndirirlər. Akademik bilik ilə real iş təcrübəsi bir arada.",
    Icon: Lightbulb,
    detail: "Hər müştərimizə ən az 10+ illik sahə təcrübəsi olan mütəxəssis təyin olunur.",
  },
  {
    title: "Sistematik Anlayış",
    description:
      "Biznesinizin struktur dinamikasını tam dərk edərək hərtərəfli maliyyə həlləri təklif edirik. Sistemin bütövlüyü bizim prioritetimizdir.",
    Icon: Layers,
    detail: "Hər layihə üçün fərdi diaqnostika aparılır, sonra sistem qurulur.",
  },
  {
    title: "Praktik Həllər",
    description:
      "Nəzəriyyə ilə məhdudlaşmır, real iş mühitinə uyğun, tətbiqedilə bilən strategiyalar hazırlayırıq. Nəticə yönümlü yanaşma.",
    Icon: Zap,
    detail: "Ortalama 3 həftə ərzində ilk əməli nəticələr görülür.",
  },
  {
    title: "Şəffaflıq və Məxfilik",
    description:
      "Müştəri məlumatlarını ən yüksək etik standartlara uyğun qoruyur, tam şəffaf hesabat təqdim edirik. Etibarlılıq bizim brendimizdir.",
    Icon: ShieldCheck,
    detail: "ISO 27001 standartlarına uyğun məlumat qoruma sistemi tətbiq edilir.",
  },
  {
    title: "Dayanıqlı Böyümə",
    description:
      "Qısamüddətli nəticələrlə yanaşı, uzunmüddətli inkişaf strategiyasına fokuslanırıq. Sabahınız üçün bu gün düşünürük.",
    Icon: TrendingUp,
    detail: "Müştərilərimizin 92%-i ilk ildən sonra xidmətdən davam edir.",
  },
];

const AUTO_ADVANCE_MS = 4500;

/* ══════════════════════════════════════════════════════════════
   MOBILE ACCORDION — replaces 300vh sticky scroll on phones
══════════════════════════════════════════════════════════════ */
function WhyUsMobileAccordion() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".why-entrance", { opacity: 0, y: 28 });
      gsap.to(".why-entrance", {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: outerRef.current, start: "top 85%", once: true },
      });
    }, outerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={outerRef}
      style={{
        backgroundColor: "#FFFFFF",
        padding: "64px 20px 56px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* WhyUsHuman — absolute, top-right, behind text.
          200px height → his feet land ~15px ABOVE the divider line, giving clean breathing room */}
      <div style={{
        position: "absolute",
        top: -10,
        right: 15,
        zIndex: 0,
        pointerEvents: "none",
        height: 200,
      }}>
        <img
          src="/WhyUsHuman.png"
          alt=""
          aria-hidden="true"
          style={{
            height: 200,
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(-3px 0 14px rgba(0,0,0,0.10))",
            display: "block",
            opacity: 0.9,
          }}
        />
        {/* Fade bottom to white */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
          background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Header text — paddingRight keeps text clear of the figure */}
      <div style={{ position: "relative", zIndex: 1, paddingRight: 90 }}>
        <p className="why-entrance" style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
          color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase",
          margin: "0 0 20px 0",
        }}>
          Niyə ProFinance?
        </p>
        <h2 className="why-entrance" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
          fontSize: "clamp(26px, 7vw, 36px)", color: "#111410",
          margin: "0 0 8px 0", letterSpacing: "-0.04em", lineHeight: 1.1,
        }}>
          Fərqi yaradan{" "}
          <span style={{ color: "#1A3D2B" }}>beş</span> üstünlük
        </h2>
      </div>
      <div className="why-entrance" style={{ height: 1, backgroundColor: "#EBEBEB", margin: "24px 0", position: "relative", zIndex: 1 }} />

      {/* Accordion items — position relative so they sit above the figure */}
      <div style={{ position: "relative", zIndex: 1 }}>
      {points.map((point, i) => {
        const isOpen = openIndex === i;
        const PointIcon = point.Icon;
        return (
          <div
            key={i}
            className={i === 0 ? "why-entrance" : undefined}
            style={{ borderBottom: "1px solid #EBEBEB" }}
          >
            {/* Accordion header — always visible */}
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                gap: 14, padding: "18px 0",
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: 11, color: isOpen ? "#1A3D2B" : "#9CA3AF",
                minWidth: 20, flexShrink: 0, transition: "color 280ms",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                backgroundColor: isOpen ? "rgba(26,61,43,0.10)" : "#F5F5F3",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background-color 280ms",
              }}>
                <PointIcon size={17} color={isOpen ? "#1A3D2B" : "#9CA3AF"} strokeWidth={1.7} />
              </div>
              {/* Title */}
              <span style={{
                flex: 1, fontFamily: "'Inter', sans-serif",
                fontWeight: isOpen ? 600 : 400, fontSize: 16,
                color: isOpen ? "#111410" : "#6B7280",
                transition: "all 280ms",
              }}>
                {point.title}
              </span>
              {/* Chevron */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ flexShrink: 0, transition: "transform 280ms", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M4 6L8 10L12 6" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* Expandable content */}
            <div style={{
              maxHeight: isOpen ? 500 : 0,
              overflow: "hidden",
              transition: "max-height 380ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <div style={{ paddingBottom: 20, paddingLeft: 70 }}>
                <p style={{
                  fontSize: 14, color: "#6B7280", lineHeight: 1.75,
                  margin: "0 0 14px 0",
                }}>
                  {point.description}
                </p>
                <div style={{ borderLeft: "3px solid rgba(26,61,43,0.35)", paddingLeft: 14 }}>
                  <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.68, margin: 0 }}>
                    {point.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>{/* end accordion wrapper */}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   DESKTOP / TABLET — sticky scroll (unchanged from original)
══════════════════════════════════════════════════════════════ */
export function WhyUsSection() {
  const bp = useBreakpoint();

  // All hooks must be called before any conditional return (React rules)
  const outerRef        = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const hintRef         = useRef<HTMLDivElement>(null);
  const activeIndexRef  = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* entrance + hint bounce + scroll scrub — skipped on mobile */
  useEffect(() => {
    if (bp === "mobile") return;
    const ctx = gsap.context(() => {
      gsap.set(".why-entrance", { opacity: 0, y: 28 });
      gsap.to(".why-entrance", {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: outerRef.current, start: "top 85%", once: true },
      });
      gsap.to(hintRef.current, {
        y: 6, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut",
      });
      gsap.to({}, {
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
            const newIndex = Math.min(Math.floor(self.progress * points.length), points.length - 1);
            if (newIndex !== activeIndexRef.current) {
              activeIndexRef.current = newIndex;
              setActiveIndex(newIndex);
            }
          },
        },
      });
    }, outerRef);
    return () => ctx.revert();
  }, [bp]);

  /* auto-advance */
  useEffect(() => {
    if (bp === "mobile" || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = Math.min(prev + 1, points.length - 1);
        activeIndexRef.current = next;
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bp, isPaused]);

  /* right panel transition on index change */
  useEffect(() => {
    if (bp === "mobile") return;
    if (rightContentRef.current) {
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, y: 30, filter: "blur(3px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );
    }
  }, [activeIndex, bp]);

  // Mobile: render accordion instead
  if (bp === "mobile") return <WhyUsMobileAccordion />;

  const isTablet = bp === "tablet";
  const point = points[activeIndex];
  const PointIcon = point.Icon;

  const leftPadding  = isTablet ? "48px 24px 48px 32px" : "60px 32px 60px 48px";
  const rightPadding = isTablet ? "48px 40px 48px 48px" : "60px 56px 60px 72px";
  const humanHeight  = 410;

  return (
    <div ref={outerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        ref={stickyRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ position: "sticky", top: 0, height: "100vh", display: "flex", overflow: "hidden" }}
      >
        {/* LEFT PANEL */}
        <div style={{
          flex: "0 0 46%", backgroundColor: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: leftPadding, position: "relative", overflow: "hidden",
        }}>
          {/* Decorative background number */}
          <div style={{
            position: "absolute", bottom: -16, left: -8,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900,
            fontSize: 220, color: "rgba(26,61,43,0.045)", lineHeight: 1,
            letterSpacing: "-0.06em", userSelect: "none", pointerEvents: "none",
          }}>
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          {/* Two-column inner layout */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: 24, position: "relative", zIndex: 1 }}>
            {/* Text column */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="why-entrance" style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase",
                margin: "0 0 20px 0",
              }}>Niyə ProFinance?</p>

              <h2 className="why-entrance" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(28px, 3vw, 44px)", color: "#111410",
                margin: 0, letterSpacing: "-0.04em", lineHeight: 1.08,
              }}>
                Fərqi yaradan{" "}
                <span style={{ color: "#1A3D2B" }}>beş</span>
                <br />üstünlük
              </h2>

              <div className="why-entrance" style={{ height: 1, backgroundColor: "#EBEBEB", margin: "32px 0 24px" }} />

              <div className="why-entrance" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {points.map((p, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "11px 14px 11px 12px", borderRadius: 8,
                      borderLeft: `3px solid ${isActive ? "#1A3D2B" : "transparent"}`,
                      backgroundColor: isActive ? "rgba(26,61,43,0.05)" : "transparent",
                      opacity: isActive ? 1 : 0.42,
                      transition: "all 380ms ease",
                    }}>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                        fontSize: 11, color: isActive ? "#1A3D2B" : "#9CA3AF",
                        letterSpacing: "0.08em", minWidth: 20, flexShrink: 0,
                        transition: "color 380ms ease",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#111410" : "#6B7280",
                        transition: "all 380ms ease", lineHeight: 1.3,
                      }}>
                        {p.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="why-entrance" style={{ marginTop: 28, paddingLeft: 12 }}>
                <div style={{ height: 2, backgroundColor: "#EBEBEB", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                  <div ref={progressBarRef} style={{ height: "100%", width: "0%", backgroundColor: "#1A3D2B", borderRadius: 2 }} />
                </div>
                <div ref={hintRef} style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  color: "#9CA3AF", fontSize: 11, fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.06em",
                }}>
                  <ArrowDown size={10} strokeWidth={2} />
                  Aşağı diyirin
                </div>
              </div>
            </div>

            {/* Man column — desktop only; too narrow on tablet */}
            {!isTablet && <div style={{
              flexShrink: 0, width: 245,
              alignSelf: "stretch", position: "relative",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
            }}>
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: 140, height: 18,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.13) 0%, transparent 72%)",
                pointerEvents: "none", zIndex: 0,
              }} />
              <img src="/WhyUsHuman.png" alt="" aria-hidden="true" style={{
                height: humanHeight, width: "auto", objectFit: "contain", display: "block",
                filter: "drop-shadow(-4px 0 18px rgba(0,0,0,0.13))",
                position: "relative", zIndex: 1,
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.35) 55%, transparent 100%)",
                pointerEvents: "none", zIndex: 2,
              }} />
            </div>}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          flex: 1, backgroundColor: "#1A3D2B",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          padding: rightPadding, position: "relative", overflow: "hidden",
        }}>
          {/* Glows */}
          <div style={{ position: "absolute", bottom: -100, right: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(82,183,136,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 68%)", pointerEvents: "none" }} />
          {/* Grid pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

          {/* Content */}
          <div ref={rightContentRef} style={{ maxWidth: isTablet ? 360 : 480, width: "100%", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 44 }}>
              <div style={{
                width: 62, height: 62, borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <PointIcon size={26} color="#FFFFFF" strokeWidth={1.6} />
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999, padding: "5px 14px",
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em" }}>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(points.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: isTablet ? "clamp(24px, 3vw, 36px)" : "clamp(28px, 3.2vw, 46px)",
              color: "#FFFFFF", margin: "0 0 18px 0", letterSpacing: "-0.04em", lineHeight: 1.05,
            }}>{point.title}</h3>

            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginBottom: 22 }} />

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.82, margin: "0 0 28px 0" }}>
              {point.description}
            </p>

            <div style={{ borderLeft: "3px solid rgba(82,183,136,0.65)", paddingLeft: 18, marginBottom: 44 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.52)", lineHeight: 1.68, margin: 0 }}>
                {point.detail}
              </p>
            </div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {points.map((_, i) => (
                <div key={i} style={{
                  height: 3, width: i === activeIndex ? 28 : 8, borderRadius: 2,
                  backgroundColor: i === activeIndex ? "#52B788" : i < activeIndex ? "rgba(82,183,136,0.35)" : "rgba(255,255,255,0.15)",
                  transition: "width 400ms ease, background-color 400ms ease",
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
