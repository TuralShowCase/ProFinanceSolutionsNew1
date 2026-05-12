"use client";

import { useEffect, useState } from "react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const navLinks = [
  { label: "Əsas", href: "#hero" },
  { label: "Haqqımızda", href: "#about" },
  { label: "Xidmətlər", href: "#services" },
  { label: "Müştərilər", href: "#clients" },
  { label: "Əlaqə", href: "#contact" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const [scrolled, setScrolled]   = useState(false);
  const [activeLang, setActiveLang] = useState("AZ");
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing above mobile
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const hPadding = isMobile ? "0 20px" : isTablet ? "0 24px" : "0 40px";
  const navGap   = isTablet ? 20 : 32;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isMobile) setMenuOpen(false);
    setTimeout(() => scrollTo(href), isMobile ? 200 : 0);
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: "#FFFFFF",
        transition: "box-shadow 300ms ease",
        boxShadow: scrolled ? "0 1px 16px 0 rgba(15,17,23,0.08)" : "none",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Main bar ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: hPadding,
        height: 72, display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 32,
      }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-icon.png" alt="ProFinance"
              style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: 15, color: "#0F1117", lineHeight: 1.2, letterSpacing: "-0.01em",
              }}>ProFinance</div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 10,
                color: "#6B7280", lineHeight: 1, letterSpacing: "0.04em", textTransform: "uppercase",
              }}>Solutions</div>
            </div>
          </div>
        </a>

        {/* Desktop / Tablet nav */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: navGap, flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link-hover"
                style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14,
                  color: "#0F1117", textDecoration: "none", paddingBottom: 2,
                }}
              >{link.label}</a>
            ))}
          </nav>
        )}

        {/* Desktop / Tablet right controls */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["AZ", "EN", "RU"].map((lang, i) => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13,
                    color: activeLang === lang ? "#1A3D2B" : "#6B7280",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "2px 6px", borderRadius: 4, transition: "color 200ms",
                  }}
                >
                  {lang}{i < 2 && <span style={{ marginLeft: 4, color: "#E5E7EB" }}>/</span>}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14,
                color: "#FFFFFF", backgroundColor: "#1A3D2B", textDecoration: "none",
                padding: "10px 20px", borderRadius: 6, transition: "background-color 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A3D2B")}
            >Əlaqə</a>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"}
            style={{
              width: 44, height: 44, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 5,
              background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
            }}
          >
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2, backgroundColor: "#0F1117",
              transition: "transform 250ms ease, opacity 250ms ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2, backgroundColor: "#0F1117",
              transition: "opacity 250ms ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 22, height: 2, borderRadius: 2, backgroundColor: "#0F1117",
              transition: "transform 250ms ease, opacity 250ms ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        )}
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 99,
          display: "flex", flexDirection: "column",
          overflowY: "auto",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}>
          {/* Nav links */}
          <nav style={{ flex: 1, padding: "8px 24px 32px" }}>
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  display: "block", fontFamily: "'Inter', sans-serif",
                  fontWeight: 500, fontSize: 18, color: "#0F1117",
                  textDecoration: "none", padding: "16px 0",
                  borderBottom: i < navLinks.length - 1 ? "1px solid #F3F4F6" : "none",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1A3D2B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0F1117")}
              >{link.label}</a>
            ))}
          </nav>

          {/* Bottom controls */}
          <div style={{ padding: "24px", borderTop: "1px solid #F3F4F6" }}>
            {/* Language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>Dil:</span>
              {["AZ", "EN", "RU"].map((lang) => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14,
                    color: activeLang === lang ? "#FFFFFF" : "#6B7280",
                    backgroundColor: activeLang === lang ? "#1A3D2B" : "transparent",
                    border: `1px solid ${activeLang === lang ? "#1A3D2B" : "#E5E7EB"}`,
                    cursor: "pointer", padding: "6px 14px", borderRadius: 6,
                    transition: "all 200ms",
                  }}
                >{lang}</button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              style={{
                display: "block", textAlign: "center", fontFamily: "'Inter', sans-serif",
                fontWeight: 500, fontSize: 16, color: "#FFFFFF",
                backgroundColor: "#1A3D2B", textDecoration: "none",
                padding: "14px 20px", borderRadius: 8,
                boxShadow: "0 4px 20px rgba(26,61,43,0.28)",
              }}
            >Bizimlə əlaqə</a>
          </div>
        </div>
      )}
    </header>
  );
}
