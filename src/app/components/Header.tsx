"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";

const DARK = "#1A3D2B";

const navLinks = [
  { label: "Əsas",        href: "#hero",     dropdown: false },
  { label: "Haqqımızda",  href: "/about",    dropdown: false },
  { label: "Xidmətlər",   href: "#services", dropdown: true  },
  { label: "Müştərilər",  href: "#clients",  dropdown: false },
  { label: "Əlaqə",       href: "#contact",  dropdown: false },
];

const servicesMenu = [
  { name: "Uçotun Diaqnostikası",  slug: "ucotun-diaqnostikasi-ve-berpasi",      tagline: "Maliyyə sağlamlığının ilk addımı" },
  { name: "Mühasibat Konsaltinqi", slug: "muhasibat-konsaltinqi",                tagline: "Rəqəmlər arxasında etibarlı dəstək" },
  { name: "Vergi Konsaltinqi",     slug: "vergi-konsaltinqi",                    tagline: "Qanuni optimizasiya, maksimum qənaət" },
  { name: "Maliyyə Konsaltinqi",   slug: "maliyye-ve-idareetme-konsaltinqi",     tagline: "Strategiyadan nəticəyə doğru" },
  { name: "Rəqəmsal Konsaltinq",   slug: "emeliyyat-ve-reqemsal-konsaltinq",     tagline: "Biznesinizi rəqəmsallaşdırırıq" },
  { name: "HR Konsaltinqi",        slug: "hr-ve-kadrlar-konsaltinqi",            tagline: "İnsanı mərkəzə qoyuruq" },
  { name: "Təlim və İnkişaf",      slug: "telim-ve-inkisaf",                     tagline: "Bilik gücə çevrilir" },
  { name: "Auditor Xidmətləri",    slug: "auditor-xidmetleri",                   tagline: "Müstəqil baxış, dəqiq nəticə" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const [scrolled,           setScrolled]           = useState(false);
  const [activeLang,         setActiveLang]         = useState("AZ");
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [showServices,       setShowServices]       = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveredLink,        setHoveredLink]        = useState<string | null>(null);
  const [hoveredService,     setHoveredService]     = useState<string | null>(null);
  const { openContact } = useContactModal();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll state ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu on resize ──────────────────────────────────
  useEffect(() => { if (!isMobile && !isTablet) setMenuOpen(false); }, [isMobile, isTablet]);

  // ── Lock body scroll ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Dropdown GSAP animate in ──────────────────────────────
  useEffect(() => {
    if (showServices && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0,   scale: 1,    duration: 0.28, ease: "power2.out" }
      );
    }
  }, [showServices]);

  // ── Dropdown hover helpers (with delay to allow moving to dropdown) ──
  const openDropdown  = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShowServices(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setShowServices(false), 180);
  };

  // ── Nav click ─────────────────────────────────────────────
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDropdown?: boolean) => {
    if (isDropdown) { e.preventDefault(); return; }

    // Non-hash links (e.g. /about) — let browser navigate
    if (!href.startsWith("#")) {
      if (isMobile || isTablet) setMenuOpen(false);
      return;
    }

    const isHome = typeof window !== "undefined" && window.location.pathname === "/";

    if (!isHome && href !== "#contact") {
      // On subpages: navigate to homepage carrying the hash
      // #hero → /  (scroll to top),  #services → /#services, etc.
      if (isMobile || isTablet) setMenuOpen(false);
      window.location.href = href === "#hero" ? "/" : `/${href}`;
      return;
    }

    // #contact → open modal on any page
    if (href === "#contact") {
      e.preventDefault();
      if (isMobile || isTablet) setMenuOpen(false);
      openContact();
      return;
    }

    // On homepage: smooth scroll
    e.preventDefault();
    if (isMobile || isTablet) setMenuOpen(false);
    setTimeout(() => scrollTo(href), isMobile || isTablet ? 200 : 0);
  };

  const hPad   = isMobile ? "0 20px" : isTablet ? "0 24px" : "0 40px";
  const navGap = isTablet ? 22 : 32;

  return (
    <>
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        transition: "border-color 320ms, box-shadow 320ms",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Blur backdrop — separate element so backdrop-filter never sits on the
          clickable header, fixing iOS Safari's fixed+backdrop-filter touch bug */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "#FFFFFF",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        transition: "background-color 320ms",
        pointerEvents: "none",
      }} />

      {/* ── Main bar ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: hPad, height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>

        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, "#hero")} style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-icon.png" alt="ProFinance" style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F1117", lineHeight: 1.2, letterSpacing: "-0.01em" }}>ProFinance</div>
              <div style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1, letterSpacing: "0.06em", textTransform: "uppercase" }}>Solutions</div>
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        {!isMobile && !isTablet && (
          <nav style={{ display: "flex", alignItems: "center", gap: navGap, flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => { setHoveredLink(link.label); if (link.dropdown) openDropdown(); }}
                onMouseLeave={() => { setHoveredLink(null); if (link.dropdown) closeDropdown(); }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.dropdown)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontWeight: 500, fontSize: 14,
                    color: hoveredLink === link.label || (link.dropdown && showServices) ? DARK : "#0F1117",
                    textDecoration: "none",
                    transition: "color 200ms",
                    paddingBottom: 2,
                    position: "relative",
                  }}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={13}
                      style={{
                        transform: showServices ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 220ms ease",
                        color: showServices ? DARK : "#9CA3AF",
                      }}
                    />
                  )}
                  {/* Hover underline */}
                  <span style={{
                    position: "absolute",
                    bottom: -2, left: 0,
                    height: 1.5,
                    width: "100%",
                    backgroundColor: DARK,
                    borderRadius: 1,
                    transformOrigin: "left center",
                    transform: hoveredLink === link.label || (link.dropdown && showServices) ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 240ms ease",
                    display: "block",
                  }} />
                </a>
              </div>
            ))}
          </nav>
        )}

        {/* Desktop right controls */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            {/* Language switcher — compact pill group */}
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#F5F4F1", borderRadius: 8, padding: 3, gap: 2 }}>
              {["AZ", "EN", "RU"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12,
                    color: activeLang === lang ? "#FFFFFF" : "#6B7280",
                    backgroundColor: activeLang === lang ? DARK : "transparent",
                    border: "none", cursor: "pointer",
                    padding: "5px 10px", borderRadius: 6,
                    transition: "all 200ms",
                  }}
                >{lang}</button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openContact()}
              style={{
                fontWeight: 600, fontSize: 14,
                color: "#FFFFFF", backgroundColor: DARK,
                border: "none", cursor: "pointer",
                padding: "10px 20px", borderRadius: 8,
                transition: "background-color 200ms, transform 200ms",
                whiteSpace: "nowrap",
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#2D6A4F"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = DARK; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Müraciət et
            </button>
          </div>
        )}

        {/* Mobile + Tablet hamburger */}
        {(isMobile || isTablet) && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Bağla" : "Aç"}
            style={{ width: 44, height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, borderRadius: 2, backgroundColor: "#0F1117",
                transition: "transform 250ms ease, opacity 250ms ease",
                transform: menuOpen ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none") : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </div>

      {/* ── Services dropdown panel ── */}
      {!isMobile && !isTablet && showServices && (
        <div
          ref={dropdownRef}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
          style={{
            position: "absolute",
            top: 76,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            paddingBottom: 20,
          }}
        >
          <div style={{
            width: 720,
            backgroundColor: "#ffffff",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "20px 20px 16px",
            overflow: "hidden",
          }}>
            {/* Services grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 12 }}>
              {servicesMenu.map(s => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setHoveredService(s.slug)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "10px 12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    backgroundColor: hoveredService === s.slug ? "#F5F4F1" : "transparent",
                    transition: "background-color 180ms",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#111410", margin: "0 0 2px", letterSpacing: "-0.01em" }}>{s.name}</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0, lineHeight: 1.4 }}>{s.tagline}</p>
                  </div>
                  <ArrowUpRight
                    size={13}
                    style={{
                      color: "#9CA3AF",
                      flexShrink: 0,
                      opacity: hoveredService === s.slug ? 1 : 0,
                      transform: hoveredService === s.slug ? "translate(0, 0)" : "translate(-4px, 4px)",
                      transition: "opacity 180ms, transform 180ms",
                    }}
                  />
                </a>
              ))}
            </div>

            {/* Footer link */}
            <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 12, display: "flex", justifyContent: "flex-end" }}>
              <a
                href="/#services"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: DARK, textDecoration: "none", opacity: 0.7, transition: "opacity 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
              >
                Bütün xidmətlər <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile + Tablet drawer ── */}
      {(isMobile || isTablet) && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 999,
          display: "flex", flexDirection: "column",
          overflowY: "auto",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}>
          <nav style={{ flex: 1, padding: "8px 24px 24px" }}>
            {navLinks.map((link, i) => (
              <div key={link.label}>
                {link.dropdown ? (
                  /* Xidmətlər — expandable */
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(o => !o)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 18, color: "#0F1117",
                        background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        padding: "16px 0",
                        borderBottom: !mobileServicesOpen ? "1px solid #F3F4F6" : "none",
                      }}
                    >
                      Xidmətlər
                      <ChevronDown size={18} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 220ms", color: "#9CA3AF" }} />
                    </button>

                    {mobileServicesOpen && (
                      <div style={{ paddingBottom: 8, borderBottom: "1px solid #F3F4F6" }}>
                        {servicesMenu.map(s => (
                          <a
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setMenuOpen(false)}
                            style={{ display: "block", padding: "10px 12px", fontSize: 15, fontWeight: 500, color: "#374151", textDecoration: "none", borderRadius: 8 }}
                          >
                            {s.name}
                          </a>
                        ))}
                        <a
                          href="/#services"
                          onClick={() => setMenuOpen(false)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, margin: "8px 12px 4px", fontSize: 13, fontWeight: 600, color: DARK, textDecoration: "none" }}
                        >
                          Hamısını gör <ArrowUpRight size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      display: "block", fontFamily: "'Inter', sans-serif",
                      fontWeight: 500, fontSize: 18, color: "#0F1117",
                      textDecoration: "none", padding: "16px 0",
                      borderBottom: i < navLinks.length - 1 ? "1px solid #F3F4F6" : "none",
                      transition: "color 200ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = DARK)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#0F1117")}
                  >{link.label}</a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile bottom */}
          <div style={{ padding: "20px 24px 32px", borderTop: "1px solid #F3F4F6" }}>
            {/* Language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16, backgroundColor: "#F5F4F1", borderRadius: 10, padding: 4, width: "fit-content" }}>
              {["AZ", "EN", "RU"].map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13,
                    color: activeLang === lang ? "#FFFFFF" : "#6B7280",
                    backgroundColor: activeLang === lang ? DARK : "transparent",
                    border: "none", cursor: "pointer",
                    padding: "7px 14px", borderRadius: 7,
                    transition: "all 200ms",
                  }}
                >{lang}</button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => { setMenuOpen(false); openContact(); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%",
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16,
                color: "#FFFFFF", backgroundColor: DARK,
                border: "none", cursor: "pointer",
                padding: "14px 20px", borderRadius: 10,
                boxShadow: "0 4px 20px rgba(26,61,43,0.25)",
              }}
            >Müraciət et</button>
          </div>
        </div>
      )}
    </header>

    </>
  );
}
