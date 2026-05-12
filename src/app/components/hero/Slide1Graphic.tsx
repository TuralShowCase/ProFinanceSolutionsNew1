"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface Slide1GraphicProps {
  pw?: number;
  ph?: number;
  pr?: number;
  showBadges?: boolean;
}

export function Slide1Graphic({ pw = 380, ph = 560, pr = 190, showBadges = true }: Slide1GraphicProps) {
  const [hovered, setHovered] = useState(false);
  const tr = "transform 550ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 550ms ease";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: pw + (showBadges ? 120 : 0),
        height: ph + 80,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Shadow layer 1 */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: pw, height: ph, marginTop: -ph / 2, marginLeft: -pw / 2,
        borderRadius: pr, background: "linear-gradient(160deg,#0F2419,#1A3D2B)",
        opacity: hovered ? 0.38 : 0.25,
        transform: hovered ? "rotate(14deg) translate(52px,36px)" : "rotate(7deg) translate(26px,20px)",
        transition: tr, zIndex: 0,
      }} />
      {/* Shadow layer 2 */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: pw, height: ph, marginTop: -ph / 2, marginLeft: -pw / 2,
        borderRadius: pr, background: "linear-gradient(160deg,#1A3D2B,#2D6A4F)",
        opacity: hovered ? 0.7 : 0.55,
        transform: hovered ? "rotate(8deg) translate(28px,20px)" : "rotate(3.5deg) translate(13px,10px)",
        transition: tr, zIndex: 1,
      }} />
      {/* Main pill */}
      <div style={{
        position: "relative", zIndex: 2, width: pw, height: ph, borderRadius: pr,
        overflow: "hidden", border: "6px solid #FFFFFF", flexShrink: 0,
        boxShadow: hovered
          ? "0 56px 110px rgba(26,61,43,0.38),0 24px 48px rgba(26,61,43,0.22)"
          : "0 40px 90px rgba(26,61,43,0.30),0 16px 36px rgba(26,61,43,0.16)",
        transform: hovered ? "scale(1.045)" : "scale(1)",
        transition: tr,
      }}>
        <img src="/ProFinanceGirl.png" alt="ProFinance Konsultant"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
          background: "linear-gradient(to top,rgba(26,61,43,0.18),transparent)", pointerEvents: "none",
        }} />
      </div>

      {/* Floating badges — hidden on mobile */}
      {showBadges && (
        <>
          {/* Badge 1 — income trend */}
          <div style={{
            position: "absolute", top: 24, right: -8, zIndex: 5,
            transform: hovered ? "translate(10px,-6px)" : "translate(0,0)", transition: tr,
          }}>
            <div style={{
              backgroundColor: "#FFFFFF", borderRadius: 18, padding: "14px 16px 12px",
              boxShadow: "0 16px 48px rgba(15,17,23,0.14)", border: "1px solid rgba(26,61,43,0.07)",
              minWidth: 168, animation: "heroFloat 3.6s ease-in-out infinite",
            }}>
              <div style={{ fontSize: 10, color: "#A3ACA3", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Gəlir Trendi</div>
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 38, marginBottom: 10 }}>
                {[34, 50, 42, 66, 58, 80, 74].map((h, i, arr) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0",
                    background: i === arr.length - 1 ? "linear-gradient(180deg,#2D6A4F,#1A3D2B)" : i === arr.length - 2 ? "rgba(26,61,43,0.3)" : "rgba(26,61,43,0.1)",
                  }} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: "#0F1117", letterSpacing: "-0.025em" }}>+18.4%</span>
                <div style={{ backgroundColor: "#EDFAF2", color: "#1A6B3A", fontWeight: 700, fontSize: 10, padding: "3px 7px", borderRadius: 999 }}>↑ Artım</div>
              </div>
              <div style={{ fontSize: 11, color: "#B8BFB8", marginTop: 4 }}>Son 6 ay · Aylıq</div>
            </div>
          </div>

          {/* Badge 2 — licensed */}
          <div style={{
            position: "absolute", bottom: 28, right: -8, zIndex: 5,
            transform: hovered ? "translate(10px,6px)" : "translate(0,0)", transition: tr,
          }}>
            <div style={{
              backgroundColor: "#FFFFFF", borderRadius: 16, padding: "13px 16px",
              boxShadow: "0 12px 36px rgba(15,17,23,0.12)", border: "1px solid rgba(26,61,43,0.07)",
              minWidth: 162, animation: "heroFloat 4.4s ease-in-out infinite 1.8s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#EBF5F0,#D4EDDE)",
                  border: "1px solid rgba(26,61,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <ShieldCheck size={19} color="#1A3D2B" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "#0F1117" }}>Lisenziyalı</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>5+ il peşəkar</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
