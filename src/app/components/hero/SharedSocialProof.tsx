"use client";

import { useBreakpoint } from "../../../hooks/useBreakpoint";

export function SharedSocialProof() {
  const isMobile = useBreakpoint() === "mobile";
  const avatarSize = isMobile ? 26 : 30;
  const avatarOverlap = isMobile ? -8 : -9;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            width: avatarSize, height: avatarSize, borderRadius: "50%",
            border: "2.5px solid #fff",
            backgroundColor: ["#1A3D2B", "#2D6A4F", "#40916C", "#52B788", "#74C69D"][i],
            marginLeft: i > 0 ? avatarOverlap : 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: isMobile ? 9 : 10, color: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}>{["A", "K", "M", "S", "R"][i]}</div>
        ))}
      </div>
      <p style={{ fontWeight: 400, fontSize: isMobile ? 12 : 13, color: "#4B5563", margin: 0 }}>
        <span style={{ fontWeight: 600, color: "#0F1117" }}>13 korporativ müştəri</span>
        {" "}· Bakı, Azərbaycan
      </p>
    </div>
  );
}
