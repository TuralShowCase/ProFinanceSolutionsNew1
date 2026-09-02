"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Layers, Zap, ShieldCheck, TrendingUp, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { getLenis } from "@/app/lib/smoothScroll";
import { DARK, mix } from "@/app/lib/brand";
import { FS_BODY, FS_CHIP, FS_H2, FS_H3, FS_H4_MOBILE, FS_LABEL } from "@/app/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Lightbulb, Layers, Zap, ShieldCheck, TrendingUp];
const TOTAL = ICONS.length;


const STEP_SPAN = 0.86;


const consoleMetrics = (section: HTMLElement) => {
  const cs = getComputedStyle(section);
  return {
    stickyTop: parseFloat(cs.getPropertyValue("--why-sticky-top")),
    padTop: parseFloat(cs.getPropertyValue("--why-pad-top")),
  };
};


function Dashes({
  current,
  labels,
  onPick,
}: {
  current: number;
  labels: string[];
  onPick: (i: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="why-fade" style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: -5 }}>
      {labels.map((label, d) => {
        const on = d === current;
        const lit = !on && hovered === d;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onPick(d)}
            onMouseEnter={() => setHovered(d)}
            onMouseLeave={() => setHovered(null)}
            aria-label={label}
            aria-current={on ? "true" : undefined}
            style={{
              display: "block",
              padding: "10px 5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 6,
            }}
          >
            <span
              style={{
                display: "block",
                height: 3,
                borderRadius: 2,
                width: on ? 30 : 14,
                
                transform: lit ? "scaleY(2)" : "scaleY(1)",
                backgroundColor: on ? DARK : lit ? mix(DARK, 60) : d < current ? mix(DARK, 38) : mix(DARK, 15),
                transition:
                  "width 420ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms ease, transform 260ms ease",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function useMediaQuery(query: string, initial: boolean) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}


export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isDesktop = bp === "desktop";

  
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const wide = useMediaQuery("(min-width: 1180px)", true);
  const isConsole = !isMobile && !reduced;
  const showFigure = isConsole && isDesktop && wide;

  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const paneWrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const prevRef = useRef(-1);

  const [active, setActive] = useState(0);

  const items = Array.from({ length: TOTAL }, (_, i) => ({
    title: t(`items.${i}.title` as Parameters<typeof t>[0]),
    description: t(`items.${i}.description` as Parameters<typeof t>[0]),
    Icon: ICONS[i],
  }));

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".why-in", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".why-in",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced, bp]);

  
  useEffect(() => {
    if (!isConsole) return;
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const ctx = gsap.context(() => {
      const fill = fillRef.current;
      if (fill) gsap.set(fill, { scaleX: 0 });

      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: () => {
          const { stickyTop, padTop } = consoleMetrics(section);
          return `top top+=${stickyTop - padTop}`;
        },
        end: () => `bottom top+=${consoleMetrics(section).stickyTop + inner.offsetHeight}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.min(self.progress / STEP_SPAN, 1);
          if (fill) gsap.set(fill, { scaleX: p });
          const next = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActive(next);
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
      triggerRef.current = null;
    };
  }, [isConsole, bp]);

  
  useEffect(() => {
    const wrap = paneWrapRef.current;
    if (!wrap) return;

    const panes = Array.from(wrap.querySelectorAll<HTMLElement>(".why-pane"));
    if (!panes.length) return;

    const prev = prevRef.current;
    prevRef.current = active;

    
    if (prev === -1 || prev === active || reduced || !isConsole) {
      gsap.set(panes, { autoAlpha: 0, zIndex: 1 });
      gsap.set(panes[active], { autoAlpha: 1, zIndex: 2 });
      
      return;
    }

    const dir = active > prev ? 1 : -1;
    const incoming = panes[active];
    const outgoing = panes[prev];

    gsap.killTweensOf([incoming, outgoing]);
    gsap.set(outgoing, { zIndex: 1 });
    gsap.set(incoming, { zIndex: 2 });

    gsap.to(outgoing, { autoAlpha: 0, y: -16 * dir, duration: 0.34, ease: "power2.in" });

    gsap
      .timeline()
      .fromTo(incoming, { autoAlpha: 0, y: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
      .fromTo(
        incoming.querySelectorAll(".why-roll"),
        { yPercent: 118 * dir },
        { yPercent: 0, duration: 0.75, ease: "expo.out", stagger: 0.06 },
        0,
      )
      .fromTo(
        incoming.querySelectorAll(".why-fade"),
        { opacity: 0, y: 14 * dir },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.07 },
        0.06,
      );
  }, [active, reduced, isConsole]);

  
  const goTo = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const p = ((i + 0.5) / TOTAL) * STEP_SPAN;
    const y = st.start + (st.end - st.start) * p;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 0.9 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  
  const header = (
    <div className="why-head">
      <p
        className="why-in"
        style={{
          margin: "0 0 14px",
          fontSize: FS_LABEL,
          fontWeight: 600,
          color: DARK,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {t("sectionLabel")}
      </p>
      <h2
        className="why-in"
        style={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: FS_H2,
          color: "var(--text)",
          margin: 0,
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
        }}
      >
        {t("heading")} <span style={{ color: DARK }}>{t("headingAccent")}</span>
      </h2>
    </div>
  );

  
  if (!isConsole) {
    return (
      <section
        id="whyus"
        ref={sectionRef}
        className="why-stack"
        style={{
          backgroundColor: "var(--page-bg-alt)",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {header}
          <div style={{ display: "grid", gap: 12 }}>
            {items.map(({ title, description, Icon }, i) => (
              <div
                key={i}
                className="why-in why-stack-row"
                style={{
                  display: "flex",
                  gap: 16,
                  borderRadius: 18,
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: mix(DARK, 9),
                    border: `1px solid ${mix(DARK, 14)}`,
                  }}
                >
                  <Icon size={19} color={DARK} strokeWidth={1.9} />
                </span>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontSize: FS_CHIP,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: mix(DARK, 55),
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontSize: FS_H4_MOBILE,
                        fontWeight: 700,
                        color: "var(--text)",
                        margin: 0,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: FS_BODY, lineHeight: 1.6, color: "var(--text-muted)" }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  
  return (
    <section
      id="whyus"
      ref={sectionRef}
      className="why-console"
      style={{
        position: "relative",
        backgroundColor: "var(--page-bg-alt)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      <div className="why-sticky" style={{ position: "sticky" }}>
        <div ref={innerRef} style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 28 }}>
          {header}

          {}
          <div
            className={`why-in why-card ${showFigure ? "why-card-figure" : "why-card-plain"}`}
            style={{
              position: "relative",
              display: "grid",
              borderRadius: 26,
              overflow: "hidden",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {}
            <div
              className="why-rail"
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
                {items.map(({ title }, i) => {
                  const on = i === active;
                  const past = i < active;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on ? "true" : undefined}
                      aria-controls={`why-pane-${i}`}
                      className="why-row"
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        width: "100%",
                        textAlign: "left",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        backgroundColor: on ? mix(DARK, 7) : "transparent",
                        transition: "background-color 380ms ease",
                      }}
                    >
                      {}
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          bottom: 8,
                          width: 3,
                          borderRadius: 3,
                          backgroundColor: DARK,
                          transformOrigin: "center",
                          transform: on ? "scaleY(1)" : "scaleY(0)",
                          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                      <span
                        style={{
                          flexShrink: 0,
                          width: 22,
                          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                          fontSize: FS_CHIP,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          fontVariantNumeric: "tabular-nums",
                          color: on ? DARK : past ? mix(DARK, 45) : "var(--text-faint)",
                          transition: "color 380ms ease",
                        }}
                      >
                        {`0${i + 1}`}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                          fontSize: FS_BODY,
                          fontWeight: on ? 700 : 500,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.35,
                          color: on ? "var(--text-strong)" : "var(--text-soft)",
                          opacity: on ? 1 : 0.72,
                          transition: "color 380ms ease, opacity 380ms ease, font-weight 380ms ease",
                        }}
                      >
                        {title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {}
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  paddingLeft: 2,
                  color: "var(--text-faint)",
                  fontSize: FS_CHIP,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: active === 0 ? 1 : 0,
                  transform: active === 0 ? "translateY(0)" : "translateY(5px)",
                  transition: "opacity 420ms ease, transform 420ms ease",
                }}
              >
                <ArrowDown size={13} strokeWidth={2.2} />
                {t("scrollHint")}
              </div>

              {}
              <div
                aria-hidden="true"
                style={{
                  height: 3,
                  borderRadius: 3,
                  backgroundColor: mix(DARK, 9),
                  overflow: "hidden",
                }}
              >
                <div
                  ref={fillRef}
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: DARK,
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>

            {}
            {showFigure && (
              <div className="why-in" style={{ position: "relative", zIndex: 2 }}>
                <img
                  src="/WhyUsHuman.avif"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width={544}
                  height={972}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "88%",
                    width: "auto",
                    maxWidth: "none",
                    display: "block",
                    filter: "drop-shadow(0 18px 26px rgba(15,32,22,0.16))",
                    
                    WebkitMaskImage: "linear-gradient(to bottom, #000 74%, transparent 97%)",
                    maskImage: "linear-gradient(to bottom, #000 74%, transparent 97%)",
                  }}
                />
              </div>
            )}

            {}
            <div
              ref={paneWrapRef}
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                background: `linear-gradient(158deg, var(--surface-3) 0%, ${mix(DARK, 4)} 100%)`,
                borderLeft: "1px solid var(--border)",
              }}
            >
              {}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${mix(DARK, 6)} 1px, transparent 1px), linear-gradient(90deg, ${mix(DARK, 6)} 1px, transparent 1px)`,
                  backgroundSize: "46px 46px",
                  WebkitMaskImage: "radial-gradient(130% 105% at 100% 0%, #000 8%, transparent 70%)",
                  maskImage: "radial-gradient(130% 105% at 100% 0%, #000 8%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {items.map(({ title, description, Icon }, i) => (
                <div
                  key={i}
                  id={`why-pane-${i}`}
                  className="why-pane"
                  role="group"
                  aria-hidden={i !== active}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <span
                      className="why-fade"
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 13,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "var(--surface)",
                        border: `1px solid ${mix(DARK, 14)}`,
                        boxShadow: `0 6px 18px ${mix(DARK, 8)}`,
                      }}
                    >
                      <Icon size={20} color={DARK} strokeWidth={1.9} />
                    </span>
                    <span
                      className="why-fade"
                      style={{
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontSize: FS_CHIP,
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: DARK,
                        fontVariantNumeric: "tabular-nums",
                        padding: "6px 12px",
                        borderRadius: 999,
                        backgroundColor: "var(--surface)",
                        border: `1px solid ${mix(DARK, 12)}`,
                      }}
                    >
                      {`0${i + 1} / 0${TOTAL}`}
                    </span>
                  </div>

                  {}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h3
                      style={{
                        margin: 0,
                        overflow: "hidden",
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontSize: FS_H3,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.14,
                        color: "var(--text-strong)",
                      }}
                    >
                      <span className="why-roll" style={{ display: "block" }}>
                        {title}
                      </span>
                    </h3>
                    <div
                      className="why-fade"
                      aria-hidden="true"
                      style={{ width: 54, height: 2, borderRadius: 2, backgroundColor: mix(DARK, 40), margin: "18px 0" }}
                    />
                    <p
                      className="why-fade"
                      style={{
                        margin: 0,
                        maxWidth: 440,
                        fontSize: FS_BODY,
                        lineHeight: 1.65,
                        color: "var(--text-muted)",
                      }}
                    >
                      {description}
                    </p>
                  </div>

                  {}
                  <Dashes current={i} labels={items.map((it) => it.title)} onPick={goTo} />

                  {}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: -14,
                      bottom: -62,
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: 196,
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.07em",
                      color: mix(DARK, 6),
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
