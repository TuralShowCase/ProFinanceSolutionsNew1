"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { useTheme } from "../contexts/ThemeContext";
import { localizedSlug, azSlugFromLocalized, AZ_SLUGS } from "../services/servicesData";
import { DARK, MID, BRAND_SOLID, PLH_ACC, PLH_TEXT, mix } from "@/app/lib/brand";
import { useScrollLock } from "@/app/lib/smoothScroll";
import { ThemeToggle } from "./ThemeToggle";
// H4 sizes for the wordmark now live in the `.hdr-wordmark` media queries.
import { FS_LABEL, FS_BODY, FS_BODY_LG, FS_CHIP } from "@/app/lib/typography";



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
  const { resolvedTheme } = useTheme();
  const isHomeRoute = pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;

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

  // On the homepage, the header floats over the full-bleed hero photo until the
  // user scrolls — no bar, bigger mark — then solidifies to the normal bar once
  // scrolled. Every other page keeps the always-solid header (no hero to reveal).
  // Opening the mobile drawer also drops the overlay: the sheet frosts the page
  // behind it, so white-on-photo type would sit on a light surface and vanish.
  const heroOverlay = isHomeRoute && !scrolled && !menuOpen;
  // While floating over the hero photo, the logo borrows the same light variant
  // dark mode already uses on dark surfaces — no glow, no backdrop chip needed.
  const useLightMark = resolvedTheme === "dark" || heroOverlay;
  // 128px marks, not the 1024px originals: this renders at 26–44px, so the big
  // files were ~30x more pixels than any display can use. The 1024 versions stay
  // in public/ for the PWA manifest and the Organization schema logo.
  const logoSrc = useLightMark ? "/logo-mark-light.png" : "/logo-mark.png";
  const overlayText   = "#FFFFFF";
  const overlaySoft    = "rgba(255,255,255,0.82)";
  const overlayFaint  = "rgba(255,255,255,0.55)";
  const overlayAccent = "#5AD094";

  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef   = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { labelKey: "nav.home",     href: locale === "az" ? "#hero"     : `/${locale}#hero`,     dropdown: false },
    { labelKey: "nav.about",    href: locale === "az" ? "/about"    : locale === "ru" ? `/${locale}/o-nas` : `/${locale}/about`, dropdown: false },
    { labelKey: "nav.services", href: locale === "az" ? "#services" : `/${locale}#services`, dropdown: true  },
    { labelKey: "nav.practiceArea", href: locale === "az" ? "#industries" : `/${locale}#industries`, dropdown: false },
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
    if (!showServices) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setShowServices(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showServices]);

  // Freezes the page behind the sheet. Must go through Lenis — it drives
  // window.scrollTo itself and sails straight past `body { overflow: hidden }`.
  // The sheet keeps scrolling because it carries `data-lenis-prevent`.
  useScrollLock(menuOpen);

  // Reset the sheet each time it opens: back to the top, services collapsed.
  useEffect(() => {
    if (menuOpen) return;
    setMobileServicesOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    drawerRef.current.scrollTop = 0;
    const ctx = gsap.context(() => {
      gsap.fromTo(".drawer-item",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.42, ease: "expo.out", stagger: 0.045, delay: 0.06 }
      );
    }, drawerRef);
    return () => ctx.revert();
  }, [menuOpen]);

  // Esc closes the sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
    if (isDropdown) { e.preventDefault(); setShowServices(o => !o); return; }
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

  // Height/padding/logo sizing now come from CSS (`.hdr-*` in globals.css) so the
  // first paint is correct before hydration. `headerH` survives only for the
  // desktop mega-menu's offset, which never renders below 1024px anyway.
  const navGap  = isTablet ? 22 : 32;
  const headerH = 92;

  // The mobile sheet is frosted glass, not a wall: the page stays visible and
  // keeps its colour behind it, so the menu reads as a layer over the site
  // rather than a separate screen. Tint carries contrast, blur carries legibility.
  const SHEET_TINT = "color-mix(in srgb, var(--surface) 62%, transparent)";
  const SHEET_BLUR = "blur(30px) saturate(180%)";
  const sheetOpen  = menuOpen && (isMobile || isTablet);

  const navLinksList = navLinks.map((link) => {
    const isActive = hoveredLink === link.labelKey || (link.dropdown && showServices);
    const accent = heroOverlay ? overlayAccent : DARK;
    return (
      <div
        key={link.labelKey}
        style={{ position: "relative" }}
        onMouseEnter={() => { setHoveredLink(link.labelKey); if (link.dropdown) openDropdown(); }}
        onMouseLeave={() => { setHoveredLink(null); if (link.dropdown) closeDropdown(); }}
      >
        <a
          href={link.href}
          onClick={(e) => handleNavClick(e, link.href, link.dropdown)}
          onFocus={() => { setHoveredLink(link.labelKey); if (link.dropdown) openDropdown(); }}
          onBlur={() => { setHoveredLink(null); if (link.dropdown) closeDropdown(); }}
          aria-haspopup={link.dropdown ? "true" : undefined}
          aria-expanded={link.dropdown ? showServices : undefined}
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontWeight: 500, fontSize: FS_BODY,
            color: isActive ? accent : heroOverlay ? overlayText : "var(--text-strong)",
            textShadow: heroOverlay ? "0 1px 12px rgba(0,0,0,0.3)" : "none",
            textDecoration: "none", transition: "color 300ms ease", paddingBottom: 2, position: "relative",
            whiteSpace: "nowrap",
          }}
        >
          {t(link.labelKey as Parameters<typeof t>[0])}
          {link.dropdown && (
            <ChevronDown size={13} style={{ transform: showServices ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 220ms ease, color 300ms ease", color: showServices ? accent : heroOverlay ? overlayFaint : "var(--text-faint)" }} />
          )}
          <span style={{ position: "absolute", bottom: -2, left: 0, height: 1.5, width: "100%", backgroundColor: accent, borderRadius: 1, transformOrigin: "left center", transform: isActive ? "scaleX(1)" : "scaleX(0)", transition: "transform 280ms ease, background-color 300ms ease", display: "block" }} />
        </a>
      </div>
    );
  });

  const rightControls = (
    <>
      <ThemeToggle size={40} overlay={heroOverlay} />
      {/* Language switcher */}
      <div style={{
        position: "relative", display: "flex", alignItems: "center",
        backgroundColor: heroOverlay ? "rgba(255,255,255,0.14)" : "var(--surface-2)",
        border: heroOverlay ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
        borderRadius: 9, padding: 4, gap: 2, transition: "background-color 300ms ease, border-color 300ms ease",
      }}>
        <div style={{
          position: "absolute", top: 4, bottom: 4, left: 4, width: 40, borderRadius: 7, backgroundColor: BRAND_SOLID,
          transform: `translateX(${LOCALES.indexOf(selectedLang) * 42}px)`,
          transition: "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: "none", zIndex: 0,
        }} />
        {LOCALES.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLocale(lang)}
            disabled={selectedLang === lang}
            style={{
              position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: FS_LABEL,
              color: selectedLang === lang ? "#FFFFFF" : heroOverlay ? "rgba(255,255,255,0.75)" : "var(--text-muted)",
              backgroundColor: "transparent", border: "none", cursor: selectedLang === lang ? "default" : "pointer",
              width: 40, padding: "6px 0", borderRadius: 7, transition: "color 300ms ease",
              textAlign: "center",
            }}
          >{lang}</button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => openContact()}
        style={{ fontWeight: 600, fontSize: FS_BODY, color: "#FFFFFF", backgroundColor: BRAND_SOLID, border: "none", cursor: "pointer", padding: "13px 26px", borderRadius: 9, transition: "background-color 200ms, transform 200ms", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = MID; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BRAND_SOLID; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        {t("header.cta")}
      </button>
    </>
  );

  return (
    <header
      className={heroOverlay ? "hdr-overlay" : undefined}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "border-color 320ms, box-shadow 320ms",
        boxShadow: scrolled ? "var(--shadow-soft)" : "none",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      {/* Header backdrop. While the sheet is open it borrows the sheet's exact
          glass so the bar and the sheet read as one continuous surface instead
          of an opaque strip sitting on a translucent panel. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundColor: sheetOpen ? SHEET_TINT : heroOverlay ? "transparent" : scrolled ? "color-mix(in srgb, var(--surface) 90%, transparent)" : "var(--surface)", backdropFilter: sheetOpen ? SHEET_BLUR : heroOverlay ? "none" : scrolled ? "blur(16px) saturate(180%)" : "none", WebkitBackdropFilter: sheetOpen ? SHEET_BLUR : heroOverlay ? "none" : scrolled ? "blur(16px) saturate(180%)" : "none", transition: "background-color 380ms ease, backdrop-filter 380ms ease", pointerEvents: "none" }} />

      <div className="hdr-bar" style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>

        {/* Logo — bigger while floating over the hero, normal size once scrolled.
            No card, no glow — just the same light mark + white wordmark dark mode
            already uses on dark surfaces. */}
        <a href={locale === "az" ? "/" : `/${locale}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <img
              src={logoSrc}
              alt="ProFinance"
              className="hdr-logo"
              style={{
                objectFit: "contain", flexShrink: 0,
                transition: "width 380ms ease, height 380ms ease",
              }}
            />
            <div>
              <div className="hdr-wordmark" style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                color: heroOverlay ? overlayText : "var(--text-strong)",
                lineHeight: 1.15, letterSpacing: "-0.015em",
                transition: "font-size 380ms ease, color 380ms ease",
              }}>ProFinance</div>
              <div style={{
                fontSize: 16, color: heroOverlay ? overlaySoft : "var(--text-muted)",
                lineHeight: 1, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3,
              }}>Solutions</div>
            </div>
          </div>
        </a>

        {/* Desktop nav — always centered between logo (pinned left) and controls
            (pinned right), in both the floating and solid states */}
        {/* Both variants are rendered; `.hdr-desktop` / `.hdr-compact` decide which
            one shows. Gating these on useBreakpoint made phones paint the desktop
            nav first and reflow on hydration. No inline `display` here — it would
            override the media query. */}
        <nav className="hdr-desktop" style={{ alignItems: "center", gap: navGap, flex: 1, justifyContent: "center" }}>
          {navLinksList}
        </nav>
        <div className="hdr-desktop" style={{ alignItems: "center", gap: 14, flexShrink: 0 }}>
          {rightControls}
        </div>

        {/* Mobile hamburger */}
        <button
            className="hdr-compact"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t("header.close") : t("header.open")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ width: 44, height: 44, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, borderRadius: 2,
                backgroundColor: heroOverlay ? overlayText : "var(--text-strong)",
                transition: "transform 250ms ease, opacity 250ms ease, background-color 300ms ease",
                transform: menuOpen ? (i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none") : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
        </button>
      </div>

      {/* Desktop services dropdown */}
      {!isMobile && !isTablet && showServices && (
        <div ref={dropdownRef} onMouseEnter={openDropdown} onMouseLeave={closeDropdown} style={{ position: "absolute", top: headerH + 4, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", paddingBottom: 20 }}>
          <div style={{ width: "min(1120px, calc(100vw - 48px))", backgroundColor: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow-card-hover)", padding: 10, display: "flex", gap: 8 }}>

            {/* ProFinance panel */}
            <div style={{ flex: "0 0 680px", borderRadius: 10, backgroundColor: mix(DARK, 2), border: `1px solid ${mix(DARK, 6)}`, padding: "14px 14px 12px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <img src={logoSrc} alt="ProFinance" style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 6 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_BODY, color: DARK, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>ProFinance Solutions</p>
                  <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, letterSpacing: "0.03em" }}>{t("header.financeServices")}</p>
                </div>
              </div>
              <div style={{ height: 1, backgroundColor: mix(DARK, 6), marginBottom: 10 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, flex: 1 }}>
                {servicesMenu.map(s => (
                  <a key={s.slug} href={s.href} onMouseEnter={() => setHoveredService(s.slug)} onMouseLeave={() => setHoveredService(null)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, padding: "10px 10px", borderRadius: 8, textDecoration: "none", backgroundColor: hoveredService === s.slug ? mix(DARK, 3) : "transparent", transition: "background-color 160ms" }}
                  >
                    <div>
                      <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: FS_BODY, color: "var(--text)", margin: "0 0 1px", letterSpacing: "-0.01em" }}>{s.name}</p>
                      <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, lineHeight: 1.35 }}>{s.tagline}</p>
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
                    <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_BODY, color: PLH_TEXT, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>{t("partner.firmName")}</p>
                    <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, letterSpacing: "0.03em" }}>{t("header.legalServices")}</p>
                  </div>
                </div>
                <span style={{ fontSize: FS_CHIP, fontWeight: 700, color: PLH_ACC, backgroundColor: `${PLH_ACC}14`, border: `1px solid ${PLH_ACC}28`, borderRadius: 999, padding: "5px 11px", letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>{t("header.partner")}</span>
              </div>
              <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, marginBottom: 10 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                {plhMenu.map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredPlh(s.href)} onMouseLeave={() => setHoveredPlh(null)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "9px 10px", borderRadius: 8, textDecoration: "none", backgroundColor: hoveredPlh === s.href ? `${PLH_ACC}12` : "transparent", transition: "background-color 160ms" }}
                  >
                    <div>
                      <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: FS_BODY, color: PLH_TEXT, margin: "0 0 1px", letterSpacing: "-0.01em" }}>{s.name}</p>
                      <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, lineHeight: 1.35 }}>{s.tagline}</p>
                    </div>
                    <ArrowUpRight size={12} style={{ color: PLH_ACC, flexShrink: 0, opacity: hoveredPlh === s.href ? 1 : 0, transform: hoveredPlh === s.href ? "translate(0,0)" : "translate(-3px,3px)", transition: "opacity 160ms, transform 160ms" }} />
                  </a>
                ))}
              </div>
              <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, margin: "10px 0 9px" }} />
              <a href="https://plh.az/az/services/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: FS_BODY, fontWeight: 600, color: PLH_ACC, textDecoration: "none", opacity: 0.7, transition: "opacity 200ms" }}
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
        <div
          ref={drawerRef}
          /* Lenis owns wheel + touch on the window and would otherwise scroll the
             page behind this sheet instead of the sheet itself. `data-lenis-prevent`
             hands the gesture back to the browser for this subtree only. */
          data-lenis-prevent
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.services")}
          style={{
            // matches the CSS-driven bar height so the sheet always starts flush
            // under it, at every breakpoint
            position: "fixed", top: "var(--hdr-h)", left: 0, right: 0, bottom: 0, zIndex: 999,
            backgroundColor: SHEET_TINT,
            backdropFilter: SHEET_BLUR,
            WebkitBackdropFilter: SHEET_BLUR,
            display: "flex", flexDirection: "column",
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            // `visibility` keeps the closed sheet out of the tab order — opacity
            // alone leaves every link focusable behind the page.
            visibility: menuOpen ? "visible" : "hidden",
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 250ms ease, transform 250ms ease, visibility 250ms",
          }}
        >
          <nav style={{ flex: 1, padding: "8px 24px 24px" }}>
            {navLinks.map((link, i) => (
              <div key={link.labelKey} className="drawer-row">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(o => !o)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 20, color: "var(--text-strong)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "16px 0", borderBottom: !mobileServicesOpen ? "1px solid var(--border)" : "none" }}
                    >
                      {t("nav.services")}
                      <ChevronDown size={18} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 220ms", color: "var(--text-faint)" }} />
                    </button>

                    {mobileServicesOpen && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                        {/* ProFinance card */}
                        <div style={{ borderRadius: 12, backgroundColor: mix(DARK, 2), border: `1px solid ${mix(DARK, 6)}`, padding: "12px 12px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <img src={logoSrc} alt="ProFinance" style={{ width: 26, height: 26, objectFit: "contain", borderRadius: 6, flexShrink: 0 }} />
                            <div>
                              <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_BODY, color: DARK, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>ProFinance Solutions</p>
                              <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0 }}>{t("header.financeServices")}</p>
                            </div>
                          </div>
                          <div style={{ height: 1, backgroundColor: mix(DARK, 6), marginBottom: 8 }} />
                          {servicesMenu.map(s => (
                            <a key={s.slug} href={s.href} onClick={() => setMenuOpen(false)} style={{ display: "flex", flexDirection: "column", padding: "8px 10px", borderRadius: 8, textDecoration: "none" }}>
                              <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: FS_BODY, color: "var(--text)", lineHeight: 1.3 }}>{s.name}</span>
                              <span style={{ fontSize: 16, color: "var(--text-muted)", marginTop: 1 }}>{s.tagline}</span>
                            </a>
                          ))}
                        </div>
                        {/* PLH card */}
                        <div style={{ borderRadius: 12, backgroundColor: `${PLH_ACC}07`, border: `1px solid ${PLH_ACC}22`, padding: "12px 12px 10px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <img src="/PLH.avif" alt="PLH" style={{ width: 26, height: 26, objectFit: "contain", flexShrink: 0 }} />
                              <div>
                                <p style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: FS_BODY, color: PLH_TEXT, margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3 }}>{t("partner.firmName")}</p>
                                <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0 }}>{t("header.legalServices")}</p>
                              </div>
                            </div>
                            <span style={{ fontSize: FS_CHIP, fontWeight: 700, color: PLH_ACC, backgroundColor: `${PLH_ACC}14`, border: `1px solid ${PLH_ACC}28`, borderRadius: 999, padding: "5px 11px", letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>{t("header.partner")}</span>
                          </div>
                          <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, marginBottom: 8 }} />
                          {plhMenu.map(s => (
                            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "flex", flexDirection: "column", padding: "8px 10px", borderRadius: 8, textDecoration: "none" }}>
                              <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: FS_BODY, color: PLH_TEXT, lineHeight: 1.3 }}>{s.name}</span>
                              <span style={{ fontSize: 16, color: "var(--text-muted)", marginTop: 1 }}>{s.tagline}</span>
                            </a>
                          ))}
                          <div style={{ height: 1, backgroundColor: `${PLH_ACC}22`, margin: "8px 0 8px" }} />
                          <a href="https://plh.az/az/services/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "0 10px", fontSize: FS_BODY, fontWeight: 600, color: PLH_ACC, textDecoration: "none", opacity: 0.8 }}>
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
                    style={{ display: "block", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: 20, color: "var(--text-strong)", textDecoration: "none", padding: "16px 0", borderBottom: i < navLinks.length - 1 ? "1px solid var(--border)" : "none", transition: "color 200ms" }}
                    onMouseEnter={e => (e.currentTarget.style.color = DARK)}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-strong)")}
                  >{t(link.labelKey as Parameters<typeof t>[0])}</a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile bottom. Sticky so the CTA stays on screen even when the
              services accordion pushes the sheet past 1900px — otherwise the
              main conversion button is only reachable by scrolling to the end.
              Extra bottom pad clears the iOS home indicator. */}
          <div
            className="drawer-row"
            style={{
              position: "sticky", bottom: 0, marginTop: "auto",
              padding: "18px 24px calc(22px + env(safe-area-inset-bottom))",
              borderTop: "1px solid var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 90%, transparent)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            {/* Language switcher + theme toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 4, backgroundColor: "var(--surface-2)", borderRadius: 10, padding: 4, width: "fit-content" }}>
                <div style={{ position: "absolute", top: 4, bottom: 4, left: 4, width: 46, borderRadius: 7, backgroundColor: BRAND_SOLID, transform: `translateX(${LOCALES.indexOf(selectedLang) * 50}px)`, transition: "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)", pointerEvents: "none", zIndex: 0 }} />
                {LOCALES.map(lang => (
                  <button key={lang}
                    onClick={() => { setMenuOpen(false); switchLocale(lang); }}
                    disabled={selectedLang === lang}
                    style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 500, fontSize: FS_LABEL, color: selectedLang === lang ? "#FFFFFF" : "var(--text-muted)", backgroundColor: "transparent", border: "none", cursor: selectedLang === lang ? "default" : "pointer", width: 46, padding: "7px 0", borderRadius: 7, transition: "color 280ms ease", textAlign: "center" }}
                  >{lang}</button>
                ))}
              </div>
              <ThemeToggle size={42} />
            </div>
            <button
              onClick={() => { setMenuOpen(false); openContact(); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", fontFamily: "var(--font-inter), 'Inter', sans-serif", fontWeight: 600, fontSize: FS_BODY_LG, color: "#FFFFFF", backgroundColor: BRAND_SOLID, border: "none", cursor: "pointer", padding: "14px 20px", borderRadius: 10, boxShadow: "0 4px 20px var(--brand-ring)" }}
            >{t("header.cta")}</button>
          </div>
        </div>
      )}
    </header>
  );
}
