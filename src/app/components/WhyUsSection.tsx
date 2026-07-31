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

/* How much of the pinned travel is spent stepping through the five reasons.
   The remaining 14% is a hold on the last one — without it the fifth reason
   appears and the section releases in the same breath, so it never reads. */
const STEP_SPAN = 0.86;

/* The two measurements the ScrollTrigger window is built from. Both are painted
   by CSS (`.why-console` in responsive.css) because they differ per breakpoint,
   so they are read back from the element rather than duplicated here — a second
   copy in JS would silently disagree with the layout the first time either one
   is retuned. Read inside start/end so a resize re-measures. */
const consoleMetrics = (section: HTMLElement) => {
  const cs = getComputedStyle(section);
  return {
    stickyTop: parseFloat(cs.getPropertyValue("--why-sticky-top")),
    padTop: parseFloat(cs.getPropertyValue("--why-pad-top")),
  };
};

/* The step dashes. Each one is a button that jumps to its reason, so the panel
   carries its own control instead of only reporting position — the 3px bar is
   just the visible part, the button around it supplies a ~22px hit target. */
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
                /* Hover thickens rather than widens: widening would shove the
                   remaining dashes sideways under the cursor. */
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

/**
 * Sizes and spacing live in responsive.css (`WhyUsSection` there); the two
 * `useBreakpoint()` reads left below are structural, not stylistic.
 *
 * `isMobile` picks between two different trees — the console and the stacked
 * fallback — and `isDesktop` decides whether the figure column exists at all.
 * Both change the markup, which is the one case the migration keeps in JS.
 */
export function WhyUsSection() {
  const t = useTranslations("whyUs");
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isDesktop = bp === "desktop";

  /* Reduced motion gets the plain stacked read — a scroll-driven console that
     only reveals one reason at a time is exactly the pattern that setting is
     asking us to drop. The figure needs real width beside two text columns, so
     it only appears once the card is wide enough to give it its own lane. */
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

  /* ---- Entrance: header + card, once ---- */
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

  /* ---- The console: scroll position drives which reason is on screen ----
     One ScrollTrigger, no pin plugin — the card is a plain CSS sticky, so the
     browser owns the sticking and GSAP only reads progress. start/end are
     functions so they re-measure on resize (invalidateOnRefresh), and they map
     the trigger's 0→1 onto exactly the window where the card is stuck:
     it locks when the card's own top edge — the section top plus `padTop` —
     hits `stickyTop`, and lets go when the section bottom catches the card's
     bottom edge. Both numbers come from `consoleMetrics`, i.e. from the CSS that
     painted them. The section's height carries `padTop` on top of the scroll
     budget (`.why-console` in responsive.css), so that spacing costs no travel. */
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

  /* ---- Pane swap ----
     All five panes live in the DOM stacked on top of each other, so a change is
     a true crossfade (outgoing pane animates out) instead of the flash you get
     re-rendering one node. React deliberately never writes opacity/visibility
     on these — GSAP owns them from mount, and the style prop stays constant so
     React's diff never fights it. */
  useEffect(() => {
    const wrap = paneWrapRef.current;
    if (!wrap) return;

    const panes = Array.from(wrap.querySelectorAll<HTMLElement>(".why-pane"));
    if (!panes.length) return;

    const prev = prevRef.current;
    prevRef.current = active;

    /* Show-don't-animate paths: first run, a mid-page reload that lands with
       reason 3 already active, and any re-run where the index hasn't actually
       moved — crossing the mobile/reduced-motion boundary rebuilds these nodes,
       and there `incoming === outgoing` would have the pane fade itself out. */
    if (prev === -1 || prev === active || reduced || !isConsole) {
      gsap.set(panes, { autoAlpha: 0, zIndex: 1 });
      gsap.set(panes[active], { autoAlpha: 1, zIndex: 2 });
      /* Nothing else to reset: the pane's children have never been animated on
         this path, so they're already at their authored values. (`clearProps`
         here would strip the React-authored inline styles too — GSAP can't tell
         which inline properties it put there — leaving the chip and rules
         unstyled until the first swap.) */
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

  /* Clicking a reason scrolls the page to the point in the pinned window where
     that reason is centred — the list stays a real control rather than a
     read-only legend, and it works from the keyboard. Lenis owns the scroll
     position, so it has to be told; window.scrollTo would be overridden. */
  const goTo = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const p = ((i + 0.5) / TOTAL) * STEP_SPAN;
    const y = st.start + (st.end - st.start) * p;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 0.9 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ---------------------------------------------------------------- header */
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

  /* ------------------------------------------------------- stacked fallback */
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

  /* ---------------------------------------------------------- the console */
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

          {/* ---- Card ---- */}
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
            {/* ---- Index rail ---- */}
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
                      {/* Active marker — scales rather than toggling a border so
                          the bar grows out of the row instead of popping in */}
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

              {/* Scroll affordance — sits with the progress track rather than
                  off in the header, and retires the moment you've moved past
                  the first reason and proved you didn't need telling. */}
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

              {/* Progress — one continuous read of where you are in the section */}
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

            {/* ---- Figure ----
                 Own lane between the rail and the panel: floor-anchored, full
                 body, so he never collides with either column's text — only his
                 shoulder crosses the seam, which is what sells the depth. The
                 cut-out already fades out at the legs, so there's no crop to
                 mask at the card floor. */}
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
                    /* Dissolves his legs into the card floor instead of
                       letting the card's overflow slice them off. Masking the
                       image itself — rather than laying a gradient over it —
                       keeps the fade from painting across the panel edge that
                       his shoulder overlaps. */
                    WebkitMaskImage: "linear-gradient(to bottom, #000 74%, transparent 97%)",
                    maskImage: "linear-gradient(to bottom, #000 74%, transparent 97%)",
                  }}
                />
              </div>
            )}

            {/* ---- Active panel ---- */}
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
              {/* Grid texture, faded from the top-right — the one cue carried
                  straight over from the old dark panel */}
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
                  {/* Top: icon + counter */}
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

                  {/* Middle: the reason */}
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

                  {/* Bottom: step dashes — also the panel's own jump control */}
                  <Dashes current={i} labels={items.map((it) => it.title)} onPick={goTo} />

                  {/* Ghost numeral — the old design's oversized index, moved
                      into the panel and cropped by the card corner */}
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
