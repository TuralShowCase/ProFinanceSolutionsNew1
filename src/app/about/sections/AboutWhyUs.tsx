"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Layers, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { Icon: Lightbulb, title: "Ekspert yanaşması",     desc: "Dərin peşəkar bilik və dəqiq həllər — hər qərar illərin təcrübəsinə əsaslanır." },
  { Icon: Layers,    title: "Biznesə sistemli baxış", desc: "Davamlı nəticə üçün bütün proseslərin hərtərəfli təhlili aparılır." },
  { Icon: Zap,       title: "Praktik həllər",         desc: "Nəzəriyyə deyil, real biznes nəticələrini təmin edən tətbiqedilə bilən strategiyalar." },
  { Icon: ShieldCheck, title: "Şəffaflıq və məxfilik", desc: "Açıq əməkdaşlıq prinsipləri, qanunvericiliyə tam uyğunluq və məlumatların qorunması." },
  { Icon: TrendingUp, title: "Davamlı inkişafa fokus", desc: "Uzunmüddətli böyüməni təmin edən strategiyalar, qısamüddətli nəticələrlə yanaşı." },
];

export function AboutWhyUs() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const outerRef   = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  /* ── Mobile / Tablet: simple clip-path reveals ── */
  useEffect(() => {
    if (!isMobile && !isTablet) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".whu-left",
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: outerRef.current, start: "top 80%", once: true } });
      gsap.utils.toArray<HTMLElement>(".whu-item").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0% 0% 0%)", y: 16 },
          { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    }, outerRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  /* ── Desktop: scroll-driven sticky section ── */
  useEffect(() => {
    if (isMobile || isTablet) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".whu-scroll-item");
      if (items.length === 0) return;

      /* Initial state: first item visible, rest hidden below */
      items.forEach((el, i) => {
        gsap.set(el, { y: i === 0 ? 0 : 64, opacity: i === 0 ? 1 : 0 });
      });

      /* Left column entrance on first scroll into section */
      gsap.fromTo(".whu-left",
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: outerRef.current, start: "top 80%", once: true } });

      /* Main scroll-driven timeline
         Section is reasons.length × 100vh tall.
         scrub:1 ties each GSAP unit to equal scroll distance. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate(self) {
            /* Update counter text */
            const idx = Math.min(
              Math.floor(self.progress * reasons.length),
              reasons.length - 1
            );
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
            /* Update progress dots */
            gsap.utils.toArray<HTMLElement>(".whu-dot").forEach((dot, di) => {
              gsap.set(dot, {
                backgroundColor: di <= idx ? "#1A3D2B" : "rgba(26,61,43,0.14)",
                width: di === idx ? 24 : 8,
              });
            });
          },
        },
      });

      /* One transition per item pair, evenly spaced across total duration */
      items.forEach((el, i) => {
        if (i === 0) return;
        const pos = (i - 1);        // 0, 1, 2, 3
        tl.to(items[i - 1], { opacity: 0, y: -56, duration: 0.5, ease: "power2.in" },  pos)
          .to(el,            { opacity: 1, y: 0,   duration: 0.5, ease: "power2.out" }, pos + 0.22);
      });

    }, outerRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section ref={outerRef} style={{ backgroundColor: "#FFFFFF", padding: "56px 20px 64px", fontFamily: "'Inter', sans-serif" }}>
        <div className="whu-left" style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 14px" }}>Fərqimiz</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 7vw, 34px)", color: "#111410", margin: "0 0 12px", letterSpacing: "-0.035em", lineHeight: 1.08 }}>
            Niyə bizi <span style={{ color: "#1A3D2B" }}>seçirlər</span>
          </h2>
          <div style={{ height: 2, width: 28, backgroundColor: "#1A3D2B", borderRadius: 1, marginBottom: 12 }} />
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.72, margin: 0 }}>Hər layihəmizdə fərdi yanaşma, sübut edilmiş metodologiya.</p>
        </div>
        <div style={{ position: "relative", height: 240, borderBottom: "1px solid #EBEBEB", marginBottom: 8, overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 160, height: 16, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)", filter: "blur(8px)", pointerEvents: "none" }} />
          <img src="/ThinkingGirl.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: 230, width: "auto", objectFit: "contain", objectPosition: "bottom center", filter: "drop-shadow(-2px 0 14px rgba(0,0,0,0.08))", userSelect: "none", pointerEvents: "none" }} />
        </div>
        <div style={{ paddingTop: 24 }}>
          {reasons.map(({ Icon, title, desc }, i) => (
            <div key={i} className="whu-item" style={{ borderTop: "1px solid #EBEBEB", padding: "22px 0", display: "flex", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, backgroundColor: "rgba(26,61,43,0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <Icon size={18} color="#1A3D2B" strokeWidth={1.7} />
              </div>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#111410", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.68, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── TABLET ── */
  if (isTablet) {
    return (
      <section ref={outerRef} style={{ backgroundColor: "#FFFFFF", padding: "72px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header row: text left, image right */}
          <div className="whu-left" style={{ display: "flex", gap: 40, alignItems: "flex-end", marginBottom: 48 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 16px" }}>Fərqimiz</p>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#111410", margin: "0 0 14px", letterSpacing: "-0.035em", lineHeight: 1.08 }}>
                Niyə bizi <span style={{ color: "#1A3D2B" }}>seçirlər</span>
              </h2>
              <div style={{ height: 2, width: 32, backgroundColor: "#1A3D2B", borderRadius: 1, marginBottom: 14 }} />
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.72, margin: 0, maxWidth: 360 }}>Hər layihəmizdə fərdi yanaşma, sübut edilmiş metodologiya və tam şəffaflıq.</p>
            </div>
            {/* Contained image */}
            <div style={{ flexShrink: 0, width: 180, height: 260, position: "relative", borderBottom: "1px solid #EBEBEB", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 120, height: 12, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)", filter: "blur(6px)", pointerEvents: "none" }} />
              <img src="/ThinkingGirl.png" alt="" aria-hidden="true" style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: 248, width: "auto", objectFit: "contain", objectPosition: "bottom center", filter: "drop-shadow(-2px 0 14px rgba(0,0,0,0.08))", userSelect: "none", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Items — vertical listing, same style as desktop right column */}
          <div>
            {reasons.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="whu-item"
                style={{
                  borderTop: "1px solid #E4E2DE",
                  padding: "36px 0",
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Ghost number */}
                <span style={{
                  position: "absolute", top: 24, right: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: 72,
                  color: "rgba(26,61,43,0.04)",
                  letterSpacing: "-0.06em", lineHeight: 1,
                  userSelect: "none", pointerEvents: "none",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  backgroundColor: "rgba(26,61,43,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 2,
                }}>
                  <Icon size={20} color="#1A3D2B" strokeWidth={1.6} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(18px, 2.2vw, 22px)", color: "#111410", margin: 0, letterSpacing: "-0.025em" }}>{title}</h3>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(26,61,43,0.25)", letterSpacing: "0.08em" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, margin: 0, maxWidth: 500 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP: scroll-driven sticky section ─────────────────────
     Section is reasons.length × 100vh tall.
     The inner sticky div stays pinned at top: 0 for the full scroll.
     GSAP transitions items on the right as the user scrolls.
  ─────────────────────────────────────────────────────────────── */
  return (
    <div ref={outerRef} style={{ height: `${reasons.length * 100}vh` }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}>
        {/* Right panel background tint */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "58%", height: "100%",
          backgroundColor: "#FAFAF8",
          borderLeft: "1px solid #EBEBEB",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 1240, margin: "0 auto", padding: "72px 48px 0",
          display: "flex", width: "100%",
          position: "relative", zIndex: 1,
        }}>

          {/* ── LEFT: stays completely still ── */}
          <div
            className="whu-left"
            style={{
              flex: "0 0 38%",
              paddingRight: 56,
              display: "flex",
              flexDirection: "column",
              paddingTop: 40,
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 20px" }}>Fərqimiz</p>

            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 3.2vw, 46px)",
              color: "#111410", margin: "0 0 16px",
              letterSpacing: "-0.04em", lineHeight: 1.06,
            }}>
              Niyə bizi{" "}
              <span style={{ color: "#1A3D2B" }}>seçirlər</span>
            </h2>

            <div style={{ height: 2, width: 36, backgroundColor: "#1A3D2B", borderRadius: 1, marginBottom: 18 }} />

            <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, margin: "0 0 32px", maxWidth: 300 }}>
              Hər layihəmizdə fərdi yanaşma, sübut edilmiş metodologiya və tam şəffaflıq.
            </p>

            {/* Step counter */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
              <span
                ref={counterRef}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: 44,
                  color: "#1A3D2B", letterSpacing: "-0.05em", lineHeight: 1,
                }}
              >01</span>
              <span style={{ fontSize: 14, color: "#9CA3AF", fontWeight: 500 }}>
                / {String(reasons.length).padStart(2, "0")}
              </span>
            </div>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 32 }}>
              {reasons.map((_, i) => (
                <div
                  key={i}
                  className="whu-dot"
                  style={{
                    height: 3, width: i === 0 ? 24 : 8,
                    borderRadius: 2,
                    backgroundColor: i === 0 ? "#1A3D2B" : "rgba(26,61,43,0.14)",
                    transition: "width 300ms ease, background-color 300ms ease",
                  }}
                />
              ))}
            </div>

            {/* Image — grounded on a line */}
            <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
              {/* Line */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, backgroundColor: "#EBEBEB" }} />
              {/* Ground shadow */}
              <div style={{ position: "absolute", bottom: 2, left: "40%", transform: "translateX(-50%)", width: 160, height: 16, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.09) 0%, transparent 70%)", filter: "blur(8px)", pointerEvents: "none" }} />
              <img
                src="/ThinkingGirl.png"
                alt="" aria-hidden="true"
                style={{
                  position: "absolute", bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  height: "min(300px, 70%)", width: "auto",
                  objectFit: "contain", objectPosition: "bottom center",
                  filter: "drop-shadow(-4px 0 20px rgba(0,0,0,0.10))",
                  userSelect: "none", pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* ── RIGHT: items transition on scroll ── */}
          <div style={{
            flex: 1,
            paddingLeft: 64,
            paddingTop: 40,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}>
            {reasons.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="whu-scroll-item"
                style={{
                  position: "absolute",
                  left: 64, right: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 48px 0 0",
                }}
              >
                {/* Ghost number */}
                <span style={{
                  position: "absolute", top: -40, right: 48,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900, fontSize: 120,
                  color: "rgba(26,61,43,0.04)",
                  letterSpacing: "-0.07em", lineHeight: 1,
                  userSelect: "none", pointerEvents: "none",
                  whiteSpace: "nowrap",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon + number */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    backgroundColor: "rgba(26,61,43,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color="#1A3D2B" strokeWidth={1.6} />
                  </div>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700, fontSize: 12,
                    color: "rgba(26,61,43,0.28)", letterSpacing: "0.08em",
                  }}>{String(i + 1).padStart(2, "0")}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 2.8vw, 38px)",
                  color: "#111410", margin: "0 0 16px",
                  letterSpacing: "-0.035em", lineHeight: 1.1,
                  maxWidth: 440,
                }}>{title}</h3>

                {/* Description */}
                <p style={{
                  fontSize: 16, color: "#6B7280",
                  lineHeight: 1.8, margin: 0, maxWidth: 440,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
