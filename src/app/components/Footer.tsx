"use client";

import { Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export function Footer() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const mainPadding   = isMobile ? "48px 20px 32px" : isTablet ? "56px 24px 40px" : "72px 40px 48px";
  const bottomPadding = isMobile ? "20px 20px" : isTablet ? "20px 24px" : "20px 40px";
  const gridCols      = isMobile ? "1fr" : "1.2fr 1fr 1.2fr";
  const gridGap       = isMobile ? 40 : isTablet ? 32 : 64;

  return (
    <footer id="contact" style={{ backgroundColor: "#0F1117", fontFamily: "'Inter', sans-serif" }}>

      {/* Main content */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: mainPadding,
        display: "grid", gridTemplateColumns: gridCols, gap: gridGap,
      }}>

        {/* Left: Logo + mission */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, backgroundColor: "#1A3D2B", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 14L7 8L10.5 11.5L13.5 6L16 9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 4V14H16" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#FFFFFF", lineHeight: 1.2 }}>ProFinance</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Solutions</div>
            </div>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>
            Azərbaycanın iri korporasiyaları üçün etibarlı maliyyə tərəfdaşı. Mühasibat, audit, vergi və strateji konsaltinq.
          </p>
        </div>

        {/* Center: Navigation */}
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Naviqasiya
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Əsas", href: "#hero" },
              { label: "Haqqımızda", href: "#about" },
              { label: "Xidmətlər", href: "#services" },
              { label: "Müştərilər", href: "#clients" },
              { label: "Əlaqə", href: "#contact" },
            ].map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 200ms", width: "fit-content" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >{link.label}</a>
            ))}
          </nav>
        </div>

        {/* Right: Contact info */}
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            Əlaqə
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { Icon: Phone, text: "+994 12 555 00 11", href: "tel:+994125550011" },
              { Icon: MessageCircle, text: "+994 50 555 00 11 (WhatsApp)", href: "https://wa.me/994505550011" },
              { Icon: Mail, text: "info@profinance.az", href: "mailto:info@profinance.az" },
              { Icon: MapPin, text: "Bakı, Nizami küçəsi 95, AZ1010", href: "#" },
            ].map(({ Icon, text, href }, i) => (
              <a key={i} href={href}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none", color: "rgba(255,255,255,0.6)", transition: "color 200ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                <Icon size={14} style={{ flexShrink: 0, marginTop: 2, color: "#52B788" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.5 }}>{text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: bottomPadding,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 16 : 0,
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
          © 2024 ProFinance Solutions. Bütün hüquqlar qorunur.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {[Instagram, Facebook, Linkedin].map((Icon, i) => (
            <a key={i} href="#"
              style={{
                color: "rgba(255,255,255,0.4)", transition: "color 200ms", display: "flex",
                padding: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
