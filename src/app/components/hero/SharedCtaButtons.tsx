"use client";

import { useTranslations, useLocale } from "next-intl";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useContactModal } from "../../contexts/ContactModalContext";

export function SharedCtaButtons() {
  const t       = useTranslations("hero");
  const locale  = useLocale();
  const bp      = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const { openContact } = useContactModal();

  const isStacked   = isMobile || isTablet;
  const servicesHref = locale === "az" ? "#services" : `/${locale}#services`;

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center", gap: 14, marginBottom: 40 }}>
      <a
        href={servicesHref}
        onClick={(e) => { e.preventDefault(); const el = document.querySelector("#services"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
        style={{ fontWeight: 500, fontSize: isStacked ? 14 : 15, color: "#FFFFFF", backgroundColor: "var(--brand-solid)", textDecoration: "none", padding: isStacked ? "13px 24px" : "14px 30px", borderRadius: 8, display: "block", textAlign: "center", boxShadow: "0 4px 20px color-mix(in srgb, var(--brand) 32%, transparent)", transition: "background-color 300ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)", flex: isTablet ? 1 : undefined }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-solid)"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {t("ctaServices")}
      </a>

      <button
        onClick={openContact}
        style={{ fontWeight: 500, fontSize: isStacked ? 14 : 15, color: "var(--brand-solid)", backgroundColor: "rgba(255,255,255,0.7)", padding: isStacked ? "12px 24px" : "13px 28px", borderRadius: 8, border: "1.5px solid color-mix(in srgb, var(--brand) 35%, transparent)", display: "block", textAlign: "center", backdropFilter: "blur(4px)", transition: "background-color 300ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)", flex: isTablet ? 1 : undefined, cursor: "pointer", fontFamily: "var(--font-inter), 'Inter', sans-serif", width: isMobile ? "100%" : undefined }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.9)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.7)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        {t("ctaContact")}
      </button>
    </div>
  );
}
