"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface Slide1GraphicProps {
  pw?: number;
  ph?: number;
  pr?: number;
  showBadges?: boolean;
}

export function Slide1Graphic({ pw = 380, ph = 560, pr = 190, showBadges = true }: Slide1GraphicProps) {
  const [hovered, setHovered] = useState(false);
  const t  = useTranslations("hero");
  const tr = "transform 550ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 550ms ease";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: pw + (showBadges ? 120 : 0), height: ph + 80, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Shadow layers */}
      <div style={{ position: "absolute", top: "50%", left: "50%", width: pw, height: ph, marginTop: -ph / 2, marginLeft: -pw / 2, borderRadius: pr, background: "linear-gradient(160deg,#0F2419,var(--brand))", opacity: hovered ? 0.38 : 0.25, transform: hovered ? "rotate(14deg) translate(52px,36px)" : "rotate(7deg) translate(26px,20px)", transition: tr, zIndex: 0 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: pw, height: ph, marginTop: -ph / 2, marginLeft: -pw / 2, borderRadius: pr, background: "linear-gradient(160deg,var(--brand),var(--brand-hover))", opacity: hovered ? 0.7 : 0.55, transform: hovered ? "rotate(8deg) translate(28px,20px)" : "rotate(3.5deg) translate(13px,10px)", transition: tr, zIndex: 1 }} />

      {/* Main pill */}
      <div style={{ position: "relative", zIndex: 2, width: pw, height: ph, borderRadius: pr, overflow: "hidden", border: "6px solid var(--surface)", flexShrink: 0, boxShadow: hovered ? "0 56px 110px color-mix(in srgb, var(--brand) 38%, transparent),0 24px 48px color-mix(in srgb, var(--brand) 22%, transparent)" : "0 40px 90px color-mix(in srgb, var(--brand) 30%, transparent),0 16px 36px color-mix(in srgb, var(--brand) 16%, transparent)", transform: hovered ? "scale(1.045)" : "scale(1)", transition: tr }}>
        <img src="/ProFinanceGirl.avif" alt="ProFinance Consultant" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 90, background: "linear-gradient(to top,color-mix(in srgb, var(--brand) 18%, transparent),transparent)", pointerEvents: "none" }} />
      </div>

      {/* Floating badges */}
      {showBadges && (
        <>
          {/* Revenue trend badge */}
          <div style={{ position: "absolute", top: 24, right: -8, zIndex: 5, transform: hovered ? "translate(10px,-6px)" : "translate(0,0)", transition: tr }}>
            <div style={{ backgroundColor: "var(--surface)", borderRadius: 18, padding: "14px 16px 12px", boxShadow: "0 16px 48px rgba(15,17,23,0.14)", border: "1px solid color-mix(in srgb, var(--brand) 7%, transparent)", minWidth: 168, animation: "heroFloat 3.6s ease-in-out infinite" }}>
              <div style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>{t("badgeRevenueTrend")}</div>
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 38, marginBottom: 10 }}>
                {[34, 50, 42, 66, 58, 80, 74].map((h, i, arr) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: i === arr.length - 1 ? "linear-gradient(180deg,var(--brand-hover),var(--brand))" : i === arr.length - 2 ? "color-mix(in srgb, var(--brand) 30%, transparent)" : "color-mix(in srgb, var(--brand) 10%, transparent)" }} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text-strong)", letterSpacing: "-0.025em" }}>+18.4%</span>
                <div style={{ backgroundColor: "var(--surface-3)", color: "var(--brand)", fontWeight: 700, fontSize: 10, padding: "3px 7px", borderRadius: 999 }}>{t("badgeGrowth")}</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>{t("badgePeriod")}</div>
            </div>
          </div>

          {/* Licensed badge */}
          <div style={{ position: "absolute", bottom: 28, right: -8, zIndex: 5, transform: hovered ? "translate(10px,6px)" : "translate(0,0)", transition: tr }}>
            <div style={{ backgroundColor: "var(--surface)", borderRadius: 16, padding: "13px 16px", boxShadow: "0 12px 36px rgba(15,17,23,0.12)", border: "1px solid color-mix(in srgb, var(--brand) 7%, transparent)", minWidth: 162, animation: "heroFloat 4.4s ease-in-out infinite 1.8s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--surface-3)", border: "1px solid color-mix(in srgb, var(--brand) 10%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldCheck size={19} color="var(--brand)" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text-strong)" }}>{t("badgeLicensed")}</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 3 }}>{t("badgeExperience")}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
