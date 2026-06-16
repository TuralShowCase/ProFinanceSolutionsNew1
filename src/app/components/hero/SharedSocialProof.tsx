"use client";

import { useTranslations } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

const proofLogos = [
  { img: "/conco.avif",    name: "Conco" },
  { img: "/BIMD.avif",     name: "BIMD" },
  { img: "/CityPark.avif", name: "City Park" },
  { img: "/Dekoriko.avif", name: "Dekoriko" },
];

const CLIENT_COUNT = 13;

export function SharedSocialProof() {
  const t       = useTranslations("hero");
  const isMobile = useBreakpoint() === "mobile";
  const chipW = isMobile ? 40 : 48;
  const chipH = isMobile ? 26 : 30;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {proofLogos.map((logo, i) => (
          <div key={i} style={{ width: chipW, height: chipH, backgroundColor: "#ffffff", border: "1.5px solid var(--border)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i > 0 ? (isMobile ? -11 : -13) : 0, padding: "4px 6px", boxShadow: "0 1px 5px rgba(0,0,0,0.10)", position: "relative", zIndex: proofLogos.length - i, flexShrink: 0 }}>
            <img src={logo.img} alt={logo.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
          </div>
        ))}
      </div>
      <p style={{ fontWeight: 400, fontSize: isMobile ? 12 : 13, color: "var(--text-soft)", margin: 0 }}>
        <span style={{ fontWeight: 600, color: "var(--text-strong)" }}>
          {t("socialProof", { count: CLIENT_COUNT })}
        </span>
        {" "}{t("socialProofSuffix")}
      </p>
    </div>
  );
}
