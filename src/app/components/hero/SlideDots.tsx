"use client";

const TOTAL_SLIDES = 2;

export function SlideDots({
  activeSlide,
  goToSlide,
  light,
}: {
  activeSlide: number;
  goToSlide: (n: number) => void;
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <button
          key={i}
          onClick={() => goToSlide(i)}
          aria-label={`Slide ${i + 1}`}
          style={{
            height: 3,
            width: i === activeSlide ? 32 : 8,
            borderRadius: 2,
            backgroundColor: light
              ? (i === activeSlide ? "#FFFFFF" : "rgba(255,255,255,0.38)")
              : (i === activeSlide ? "#1A3D2B" : "rgba(26,61,43,0.22)"),
            border: "none", padding: 0, cursor: "pointer",
            transition: "width 400ms ease, background-color 400ms ease",
          }}
        />
      ))}
      <span style={{
        fontSize: 11, marginLeft: 6, fontWeight: 500, letterSpacing: "0.04em",
        color: light ? "rgba(255,255,255,0.45)" : "#9CA3AF",
      }}>
        {String(activeSlide + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
      </span>
    </div>
  );
}
