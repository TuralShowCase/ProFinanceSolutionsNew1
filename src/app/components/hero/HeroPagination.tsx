"use client";

import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACCENT, FAINT, HAIR } from "./heroStyle";
import { SLIDES } from "./heroStyle";

export function HeroPagination({
  activeSlide,
  goToSlide,
  setBarRef,
  paused,
  onTogglePause,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
  setBarRef: (i: number, el: HTMLSpanElement | null) => void;
  paused: boolean;
  onTogglePause: () => void;
}) {
  const t = useTranslations("hero");
  const tHeader = useTranslations("header");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {SLIDES.map((_, i) => {
        const active = i === activeSlide;
        return (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`${tHeader("slideAria")} ${i + 1}`}

            aria-current={active ? "true" : undefined}
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
              {}
              <span
                ref={(el) => setBarRef(i, el)}
                style={{ position: "absolute", inset: 0, display: "block", background: ACCENT, borderRadius: 2, transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </span>
          </button>
        );
      })}

      {}
      <button
        onClick={onTogglePause}
        aria-label={paused ? t("playSlides") : t("pauseSlides")}
        aria-pressed={paused}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          width: 26, height: 26, borderRadius: 999,
          background: "none",
          border: `1px solid ${HAIR}`,
          color: paused ? ACCENT : FAINT,
          cursor: "pointer",
          padding: 0,
          transition: "color 260ms ease, border-color 260ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = ACCENT; }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = paused ? ACCENT : FAINT;
          e.currentTarget.style.borderColor = HAIR;
        }}
      >
        {paused
          ? <Play size={11} strokeWidth={2.4} fill="currentColor" />
          : <Pause size={11} strokeWidth={2.4} fill="currentColor" />}
      </button>
    </div>
  );
}
