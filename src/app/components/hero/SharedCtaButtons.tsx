"use client";

import { useBreakpoint } from "../../../hooks/useBreakpoint";

export function SharedCtaButtons() {
  const isMobile = useBreakpoint() === "mobile";

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "stretch" : "center",
      gap: 14,
      marginBottom: 40,
    }}>
      <a
        href="#services"
        onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
        style={{
          fontWeight: 500, fontSize: isMobile ? 14 : 15, color: "#FFFFFF",
          backgroundColor: "#1A3D2B", textDecoration: "none",
          padding: isMobile ? "13px 24px" : "14px 30px", borderRadius: 8,
          display: "block", textAlign: "center",
          boxShadow: "0 4px 20px rgba(26,61,43,0.32)",
          transition: "background-color 200ms, transform 200ms",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2D6A4F"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1A3D2B"; e.currentTarget.style.transform = "translateY(0)"; }}
      >Xidmətlər</a>
      <a
        href="#contact"
        onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
        style={{
          fontWeight: 500, fontSize: isMobile ? 14 : 15, color: "#1A3D2B",
          backgroundColor: "rgba(255,255,255,0.7)", textDecoration: "none",
          padding: isMobile ? "12px 24px" : "13px 28px", borderRadius: 8,
          border: "1.5px solid rgba(26,61,43,0.35)",
          display: "block", textAlign: "center", backdropFilter: "blur(4px)",
          transition: "background-color 200ms, transform 200ms",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >Bizimlə əlaqə</a>
    </div>
  );
}
