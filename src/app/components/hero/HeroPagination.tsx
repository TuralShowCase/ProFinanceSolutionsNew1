"use client";

import { ACCENT, FAINT, HAIR } from "./heroStyle";
import { SLIDES } from "./heroStyle";

export function HeroPagination({
  activeSlide,
  goToSlide,
  setBarRef,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
  setBarRef: (i: number, el: HTMLSpanElement | null) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {SLIDES.map((_, i) => {
        const active = i === activeSlide;
        return (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={active}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "none", border: "none", padding: 0, cursor: "pointer",
              flex: active ? 1.7 : 1, minWidth: 0,
              transition: "flex 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "0.04em", color: active ? ACCENT : FAINT, transition: "color 300ms ease", flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ position: "relative", display: "block", height: 2, flex: 1, background: HAIR, borderRadius: 2, overflow: "hidden" }}>
              {/* Fill is driven by the GSAP timer tween in HeroSection */}
              <span
                ref={(el) => setBarRef(i, el)}
                style={{ position: "absolute", inset: 0, display: "block", background: ACCENT, borderRadius: 2, transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
