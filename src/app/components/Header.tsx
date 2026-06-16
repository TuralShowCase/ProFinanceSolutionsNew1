"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { localizedSlug, azSlugFromLocalized, AZ_SLUGS } from "../services/servicesData";
import { DARK, MID, BRAND_SOLID, PLH_ACC, PLH_TEXT, mix } from "@/app/lib/brand";
import { ThemeToggle } from "./ThemeToggle";



const PLH_LINKS = [
  { key: "contractLaw",          href: "https://plh.az/az/services/muqavile-huququ/" },
  { key: "corporateLaw",         href: "https://plh.az/az/services/korporativ-huquq/" },
  { key: "businessLaw",          href: "https://plh.az/az/services/biznes-huququ/" },
  { key: "intellectualProperty", href: "https://plh.az/az/services/eqli-mulkiyyet/" },
];

const LOCALES = ["AZ", "EN", "RU"] as const;
type LocaleCode = typeof LOCALES[number];

const ABOUT_SLUGS: Record<string, string> = { az: "/about", en: "/about", ru: "/o-nas" };

// Computes the equivalent URL for any page in the target locale.
// Handles: home, about (with RU /o-nas variant), service pages (with localized slugs).
function getTargetUrl(targetLocale: string, currentLocale: string, fullPathname: string): string {
  // Strip existing locale prefix so we always work with the bare path
  const bare = fullPathname.replace(/^\/(en|ru)(\/|$)/, "/");

  // Home
  if (bare === "/") {
    return targetLocale === "az" ? "/" : `/${targetLocale}`;
  }

  // About (bare = "/about" for az/en, "/o-nas" for ru)
  if (bare === "/about" || bare === "/o-nas") {
    const aboutPath = ABOUT_SLUGS[targetLocale] ?? "/about";
    return targetLocale === "az" ? aboutPath : `/${targetLocale}${aboutPath}`;
  }

  // Service page — slug must be mapped to the target locale's equivalent
  const serviceMatch = bare.match(/^\/services\/([^/]+)/);
  if (serviceMatch) {
    const currentSlug = serviceMatch[1];
    const azSlug = azSlugFromLocalized(currentSlug, currentLocale);
    if (azSlug) {
      const slug = localizedSlug(azSlug, targetLocale);
      const base = targetLocale === "az" ? "/services" : `/${targetLocale}/services`;
      return `${base}/${slug}`;
    }
  }

  // Fallback: go to the home of the target locale
  return targetLocale === "az" ? "/" : `/${targetLocale}`;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const t        = useTranslations();
  const locale   = useLocale();
  const pathname = usePathname();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  // `selectedLang` drives the pill position immediately on click (optimistic UI).
  // After the slide animation finishes, we navigate so the full page gets the new locale.
  const [selectedLang, setSelectedLang] = useState<LocaleCode>(locale.toUpperCase() as LocaleCode);

  const switchLocale = (lang: LocaleCode) => {
    if (lang === selectedLang) return;

    // Slide the pill immediately for instant visual feedback
    setSelectedLang(lang);

    // Navigate after the CSS transition finishes (360ms)
    setTimeout(() => {
      const lower = lang.toLowerCase();
      document.cookie = `NEXT_LOCALE=${lower}; path=/; max-age=31536000; SameSite=Lax`;
      window.location.href = getTargetUrl(lower, locale, pathname);
    }, 380);
  };

  const [scrolled,           setScrolled]           = useState(false);
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [showServices,       setShowServices]       = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveredLink,        setHoveredLink]        = useState<string | null>(null);
  const [hoveredService,     setHoveredService]     = useState<string | null>(null);
  const [hoveredPlh,         setHoveredPlh]         = useState<string | null>(null);
  const { openContact } = useContactModal();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { labelKey: "nav.home",     href: locale === "az" ? "#hero"     : `/${locale}#hero`,     dropdown: false },
    { labelKey: "nav.about",    href: locale === "az" ? "/about"    : locale === "ru" ? `/${locale}/o-nas` : `/${locale}/about`, dropdown: false },
    { labelKey: "nav.services", href: locale === "az" ? "#services" : `/${locale}#services`, dropdown: true  },
    { labelKey: "nav.clients",  href: locale === "az" ? "#clients"  : `/${locale}#clients`,  dropdown: false },
    { labelKey: "nav.contact",  href: "#contact",                                            dropdown: false },
  ];

  const servicesBasePath = locale === "az" ? "/services" : `/${locale}/services`;
  const servicesMenu = AZ_SLUGS.map(azSlug => ({
    name:    t(`services.names.${azSlug}` as Parameters<typeof t>[0]),
    tagline: t(`services.taglines.${azSlug}` as Parameters<typeof t>[0]),
    slug:    localizedSlug(azSlug, locale),
    href:    `${servicesBasePath}/${localizedSlug(azSlug, locale)}`,
  }));

  const plhMenu = PLH_LINKS.map(({ key, href }) => ({
    name:    t(`meta.plhMenu.${key}` as Parameters<typeof t>[0]),
    tagline: t(`meta.plhMenu.${key}Tagline` as Parameters<typeof t>[0]),
    href,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (!isMobile && !isTablet) setMenuOpen(false); }, [isMobile, isTablet]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (showServices && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0,   scale: 1,    duration: 0.28, ease: "power2.out" }
      );
    }
  }, [showServices]);

  const openDropdown  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setShowServices(true); };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setShowServices(false), 180); };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDropdown?: boolean) => {
    if (isDropdown) { e.preventDefault(); return; }
    if (!href.startsWith("#")) {
      if (isMobile || isTablet) setMenuOpen(false);
      return;
    }
    const isHome = typeof window !== "undefined" && (
      window.location.pathname === "/" ||
      window.location.pathname === `/${locale}` ||
      window.location.pathname === `/${locale}/`
    );
    if (!isHome && href !== "#contact") {
      if (isMobile || isTablet) setMenuOpen(false);
      const base = locale === "az" ? "" : `/${locale}`;
      window.location.href = href === "#hero" ? `${base}/` : `${base}/${href}`;
      return;
    }
    if (href === "#contact") {
      e.preventDefault();
      if (isMobile || isTablet) setMenuOpen(false);
      openContact();
      return;
    }
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
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "border-color 320ms, box-shadow 320ms",
        boxShadow: scrolled ? "var(--shadow-soft)" : "none",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundColor: scrolled ? "color-mix(in srgb, var(--surface) 90%, transparent)" : "var(--surface)", backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none", transition: "background-color 320ms", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: hPad, height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>

        {/* Logo */}
        <a href={locale === "az" ? "/" : `/${locale}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo-icon.png" alt="ProFinance" style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", lineHeight: 1.2, letterSpacing: "-0.01em" }}>ProFinance</div>
              <div style={{ fontSize: 10, color: "var(--text-faint)", lineHeight: 1, letterSpacing: "0.06em", textTransform: "uppercase" }}>Solutions</div>
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        {!isMobile && !isTablet && (
          <nav style={{ display: "flex", alignItems: "center", gap: navGap, flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => (
              <div
                key={link.labelKey}
                style={{ position: "relative" }}
                onMouseEnter={() => { setHoveredLink(link.labelKey); if (link.dropdown) openDropdown(); }}
                onMouseLeave={() => { setHoveredLink(null); if (link.dropdown) closeDropdown(); }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.dropdown)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontWeight: 500, fontSize: 14,
                    color: hoveredLink === link.labelKey || (link.dropdown && showServices) ? DARK : "var(--text-strong)",
                    textDecoration: "none", transition: "color 200ms", paddingBottom: 2, position: "relative",
                  }}
                >
                  {t(link.labelKey as Parameters<typeof t>[0])}
                  {link.dropdown && (
                    <ChevronDown size={13} style={{ transform: showServices ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 220ms ease", color: showServices ? DARK : "var(--text-faint)" }} />
                  )}
                  <span style={{ position: "absolute", bottom: -2, left: 0, height: 1.5, width: "100%", backgroundColor: DARK, borderRadius: 1, transformOrigin: "left center", transform: hoveredLink === link.labelKey || (link.dropdown && showServices) ? "scaleX(1)" : "scaleX(0)", transition: "transform 280ms ease", display: "block" }} />
                </a>
              </div>
            ))}
          </nav>
        )}

        {/* Desktop right */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <ThemeToggle />
            {/* Language switcher */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", backgroundColor: "var(--surface-2)", borderRadius: 8, padding: 3, gap: 2 }}>
              <div style={{
                position: "absolute", top: 3, bottom: 3, left: 3, width: 36, borderRadius: 6, backgroundColor: BRAND_SOLID,
                transform: `translateX(${LOCALES.indexOf(selectedLang) * 38}px)`,
                transition: "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: "none", zIndex: 0,
              }} />
              {LOCALES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLocale(lang)}
                  disabled={selectedLang === lang}
                  style={{
                    position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 12,
                    color: selectedLang === lang ? "#FFFFFF" : "var(--text-muted)",
                    backgroundColor: "transparent", border: "none", cursor: selectedLang === lang ? "default" : "pointer",
                    width: 36, padding: "5px 0", borderRadius: 6, transition: "color 280ms ease",
                    textAlign: "center",
                  }}
                >{lang}</button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => openContact()}
              style={{ fontWeight: 600, fontSize: 14, color: "#FFFFFF", backgroundColor: BRAND_SOLID, border: "none", cursor: "pointer", padding: "10px 20px", borderRadius: 8, transition: "background-color 200ms, transform 200ms", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = MID; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BRAND_SOLID; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {t("header.cta")}
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {(isMobile || isTablet) && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t("header.close") : t("header.open")}
            style={{ width: 44, height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, borderRadius: 2, backgroundColor: "var(--text-strong)",
                transition: "transform 250ms ease, opacity 250ms ease",
                transform: menuOpen ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none") : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </div>

      {/* Desktop services dropdown */}
      {!isMobile && !isTablet && showServices && (
        <div ref={dropdownRef} onMouseEnter={openDropdown} onMouseLeave={closeDropdown} style={{ position: "absolute", top: 76, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", paddingBottom: 20 }}>
          <div style={{ width: 880, backgroundColor: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow-card-hover)", padding: 10, display: "flex", gap: 8 }}>

            {/* ProFinance panel */}
            <div style={{ flex: "0 0 530px", borderRadius: 10, backgroundColor: mix(DARK, 2), border: `1px solid ${mix(DARK, 6)}`, padding: "14px 14px 12px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <img src="/logo-icon.png" alt="ProFinance" style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 6 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12.5, color: DARK, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>ProFinance Solutions</p>
                  <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0, letterSpacing: "0.03em" }}>{t("header.financeServices")}</p>
                </div>
              </div>
              <div style={{ height: 1, backgroundColor: mix(DARK, 6), marginBottom: 10 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, flex: 1 }}>
                {servicesMenu.map(s => (
                  <a key={s.slug} href={s.href} onMouseEnter={() => setHoveredService(s.slug)} onMouseLeave={() => setHoveredService(null)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "8px 10px", borderRadius: 8, textDecoration: "none", backgroundColor: hoveredService === s.slug ? mix(DARK, 3) : "transparent", transition: "background-color 160ms" }}
                  >
                    <div>
                      <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12.5, color: "var(--text)", margin: "0 0 1px", letterSpacing: "-0.01em" }}>{s.name}</p>
                      <p style={{ fontSize: 10.5, color: "var(--text-faint)", margin: 0, lineHeight: 1.35 }}>{s.tagline}</p>
                    </div>
                    <ArrowUpRight size={12} style={{ color: DARK, flexShrink: 0, opacity: hoveredService === s.slug ? 1 : 0, transform: hoveredService === s.slug ? "translate(0,0)" : "translate(-3px,3px)", transition: "opacity 160ms, transform 160ms" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* PLH panel */}
            <div style={{ flex: 1, borderRadius: 10, backgroundColor: `${PLH_ACC}07`, border: `1px solid ${PLH_ACC}22`, padding: "14px 14px 12px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src="/PLH.avif" alt="PLH" style={{ width: 30, height: 30, objectFit: "contain", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12.5, color: PLH_TEXT, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>{t("partner.firmName")}</p>
                    <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0, letterSpacing: "0.03em" }}>{t("header.legalServices")}</p>
                  </div>
                </div>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: PLH_ACC, backgroundColor: `${PLH_ACC}14`, border: `1px solid ${PLH_ACC}28`, borderRadius: 999, padding: "3px 8px", letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>{t("header.partner")}</span>
              </div>
              <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, marginBottom: 10 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                {plhMenu.map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredPlh(s.href)} onMouseLeave={() => setHoveredPlh(null)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "9px 10px", borderRadius: 8, textDecoration: "none", backgroundColor: hoveredPlh === s.href ? `${PLH_ACC}12` : "transparent", transition: "background-color 160ms" }}
                  >
                    <div>
                      <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12.5, color: PLH_TEXT, margin: "0 0 1px", letterSpacing: "-0.01em" }}>{s.name}</p>
                      <p style={{ fontSize: 10.5, color: "var(--text-faint)", margin: 0, lineHeight: 1.35 }}>{s.tagline}</p>
                    </div>
                    <ArrowUpRight size={12} style={{ color: PLH_ACC, flexShrink: 0, opacity: hoveredPlh === s.href ? 1 : 0, transform: hoveredPlh === s.href ? "translate(0,0)" : "translate(-3px,3px)", transition: "opacity 160ms, transform 160ms" }} />
                  </a>
                ))}
              </div>
              <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, margin: "10px 0 9px" }} />
              <a href="https://plh.az/az/services/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: PLH_ACC, textDecoration: "none", opacity: 0.7, transition: "opacity 200ms" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
              >
                {t("header.allPlhServices")} <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {(isMobile || isTablet) && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, bottom: 0, backgroundColor: "color-mix(in srgb, var(--surface) 97%, transparent)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 999, display: "flex", flexDirection: "column", overflowY: "auto", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: menuOpen ? "translateY(0)" : "translateY(-8px)", transition: "opacity 250ms ease, transform 250ms ease" }}>
          <nav style={{ flex: 1, padding: "8px 24px 24px" }}>
            {navLinks.map((link, i) => (
              <div key={link.labelKey}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(o => !o)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 18, color: "var(--text-strong)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "16px 0", borderBottom: !mobileServicesOpen ? "1px solid var(--border)" : "none" }}
                    >
                      {t("nav.services")}
                      <ChevronDown size={18} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 220ms", color: "var(--text-faint)" }} />
                    </button>

                    {mobileServicesOpen && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                        {/* ProFinance card */}
                        <div style={{ borderRadius: 12, backgroundColor: mix(DARK, 2), border: `1px solid ${mix(DARK, 6)}`, padding: "12px 12px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <img src="/logo-icon.png" alt="ProFinance" style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />
                            <div>
                              <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12.5, color: DARK, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>ProFinance Solutions</p>
                              <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0 }}>{t("header.financeServices")}</p>
                            </div>
                          </div>
                          <div style={{ height: 1, backgroundColor: mix(DARK, 6), marginBottom: 8 }} />
                          {servicesMenu.map(s => (
                            <a key={s.slug} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "flex", flexDirection: "column", padding: "8px 10px", borderRadius: 8, textDecoration: "none" }}>
                              <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13.5, color: "var(--text)", lineHeight: 1.3 }}>{s.name}</span>
                              <span style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 1 }}>{s.tagline}</span>
                            </a>
                          ))}
                        </div>
                        {/* PLH card */}
                        <div style={{ borderRadius: 12, backgroundColor: `${PLH_ACC}07`, border: `1px solid ${PLH_ACC}22`, padding: "12px 12px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <img src="/PLH.avif" alt="PLH" style={{ width: 26, height: 26, objectFit: "contain", flexShrink: 0 }} />
                              <div>
                                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 12.5, color: PLH_TEXT, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>{t("partner.firmName")}</p>
                                <p style={{ fontSize: 10, color: "var(--text-faint)", margin: 0 }}>{t("header.legalServices")}</p>
                              </div>
                            </div>
                            <span style={{ fontSize: 9.5, fontWeight: 700, color: PLH_ACC, backgroundColor: `${PLH_ACC}14`, border: `1px solid ${PLH_ACC}28`, borderRadius: 999, padding: "3px 8px", letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>{t("header.partner")}</span>
                          </div>
                          <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, marginBottom: 8 }} />
                          {plhMenu.map(s => (
                            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "flex", flexDirection: "column", padding: "8px 10px", borderRadius: 8, textDecoration: "none" }}>
                              <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13.5, color: PLH_TEXT, lineHeight: 1.3 }}>{s.name}</span>
                              <span style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 1 }}>{s.tagline}</span>
                            </a>
                          ))}
                          <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, margin: "8px 0 8px" }} />
                          <a href="https://plh.az/az/services/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0 10px", fontSize: 12, fontWeight: 600, color: PLH_ACC, textDecoration: "none", opacity: 0.8 }}>
                            {t("header.allPlhServices")} <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ display: "block", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 18, color: "var(--text-strong)", textDecoration: "none", padding: "16px 0", borderBottom: i < navLinks.length - 1 ? "1px solid var(--border)" : "none", transition: "color 200ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = DARK)}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-strong)")}
                  >{t(link.labelKey as Parameters<typeof t>[0])}</a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile bottom */}
          <div style={{ padding: "20px 24px 32px", borderTop: "1px solid var(--border)" }}>
            {/* Language switcher + theme toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 4, backgroundColor: "var(--surface-2)", borderRadius: 10, padding: 4, width: "fit-content" }}>
                <div style={{ position: "absolute", top: 4, bottom: 4, left: 4, width: 46, borderRadius: 7, backgroundColor: BRAND_SOLID, transform: `translateX(${LOCALES.indexOf(selectedLang) * 50}px)`, transition: "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: "none", zIndex: 0 }} />
                {LOCALES.map(lang => (
                  <button key={lang}
                    onClick={() => { setMenuOpen(false); switchLocale(lang); }}
                    disabled={selectedLang === lang}
                    style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: selectedLang === lang ? "#FFFFFF" : "var(--text-muted)", backgroundColor: "transparent", border: "none", cursor: selectedLang === lang ? "default" : "pointer", width: 46, padding: "7px 0", borderRadius: 7, transition: "color 280ms ease", textAlign: "center" }}
                  >{lang}</button>
                ))}
              </div>
              <ThemeToggle size={42} />
            </div>
            <button
              onClick={() => { setMenuOpen(false); openContact(); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#FFFFFF", backgroundColor: BRAND_SOLID, border: "none", cursor: "pointer", padding: "14px 20px", borderRadius: 10, boxShadow: "0 4px 20px var(--brand-ring)" }}
            >{t("header.cta")}</button>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
