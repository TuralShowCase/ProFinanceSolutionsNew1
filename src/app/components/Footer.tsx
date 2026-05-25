"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight, MessageCircle } from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const DARK    = "#1A3D2B";
const ACCENT  = "#52B788";
const PLH_ACC = "#29a9bd";

const services = [
  { name: "Uçotun Diaqnostikası",  slug: "ucotun-diaqnostikasi-ve-berpasi" },
  { name: "Mühasibat Konsaltinqi", slug: "muhasibat-konsaltinqi" },
  { name: "Vergi Konsaltinqi",     slug: "vergi-konsaltinqi" },
  { name: "Maliyyə Konsaltinqi",   slug: "maliyye-ve-idareetme-konsaltinqi" },
  { name: "Rəqəmsal Konsaltinq",   slug: "emeliyyat-ve-reqemsal-konsaltinq" },
  { name: "HR Konsaltinqi",        slug: "hr-ve-kadrlar-konsaltinqi" },
  { name: "Təlim və İnkişaf",      slug: "telim-ve-inkisaf" },
  { name: "Auditor Xidmətləri",    slug: "auditor-xidmetleri" },
];

const contacts = [
  { Icon: Phone,         text: "+994 12 555 00 11",      href: "tel:+994125550011" },
  { Icon: MessageCircle, text: "+994 50 555 00 11",      href: "https://wa.me/994505550011" },
  { Icon: Mail,          text: "info@profinance.az",     href: "mailto:info@profinance.az" },
  { Icon: MapPin,        text: "Bakı, Nizami küçəsi 95", href: "https://maps.google.com/?q=Nizami+street+95+Baku+Azerbaijan" },
];

export function Footer() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ftr-brand",  { clipPath: "inset(100% 0 0 0)", duration: 0.85, ease: "expo.inOut", scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-partner",{ opacity: 0, y: 16, duration: 0.6, ease: "power2.out", delay: 0.25, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-col",    { opacity: 0, y: 24, duration: 0.55, ease: "power2.out", stagger: 0.1, delay: 0.4, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-bottom", { opacity: 0, duration: 0.5, delay: 0.7, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
    }, footerRef);
    return () => ctx.revert();
  }, [isMobile, isTablet]);

  const p = isMobile ? "0 20px" : isTablet ? "0 28px" : "0 48px";

  return (
    <footer id="contact" ref={footerRef} style={{ backgroundColor: "#0F1117", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: p }}>

        {/* ── Brand bar ── */}
        <div
          className="ftr-brand"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
            alignItems: "center",
            gap: isMobile ? 20 : 32,
            paddingTop: isMobile ? 44 : 60,
            paddingBottom: isMobile ? 28 : 36,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo-icon.png" alt="ProFinance" style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 17, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>ProFinance</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions</div>
            </div>
          </div>

          {/* Tagline — centered on desktop */}
          {!isMobile && (
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
              Azərbaycanın aparıcı korporasiyaları üçün etibarlı maliyyə tərəfdaşı
            </p>
          )}

          {/* Social icons */}
          <div style={{ display: "flex", gap: 9, justifyContent: isMobile ? "flex-start" : "flex-end" }}>
            {[{ Icon: Instagram, href: "#" }, { Icon: Facebook, href: "#" }, { Icon: Linkedin, href: "#" }].map(({ Icon, href }, i) => (
              <a key={i} href={href} style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "all 200ms" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "rgba(255,255,255,0.11)"; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "rgba(255,255,255,0.06)"; el.style.color = "rgba(255,255,255,0.38)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Partner strip ── */}
        <div
          className="ftr-partner"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 14 : 20,
            padding: isMobile ? "16px 0" : "20px 0",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.16em", textTransform: "uppercase", flexShrink: 0 }}>
            Hüquqi Tərəfdaş
          </span>
          <div style={{ width: 1, height: 14, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <img src="/PLHLogo.png" alt="PLH" style={{ height: 28, width: "auto", objectFit: "contain", flexShrink: 0, opacity: 0.85 }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>
            PLH Hüquq Bürosu
          </span>
          <div style={{ flex: 1 }} />
          <a
            href="https://plh.az"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: PLH_ACC, textDecoration: "none", fontWeight: 500, transition: "opacity 200ms", opacity: 0.75, flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
          >
            plh.az <ArrowUpRight size={12} />
          </a>
        </div>

        {/* ── Link columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr 1fr" : "1.2fr 0.9fr 1fr",
          gap: isMobile ? "36px 24px" : isTablet ? 40 : 52,
          paddingTop: isMobile ? 36 : 48,
          paddingBottom: isMobile ? 40 : 56,
        }}>

          {/* Xidmətlər */}
          <div className="ftr-col">
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>Xidmətlər</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {services.map(s => (
                <a key={s.slug} href={`/services/${s.slug}`}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 200ms", width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{s.name}</a>
              ))}
            </nav>
          </div>

          {/* Şirkət */}
          <div className="ftr-col">
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>Şirkət</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Haqqımızda",   href: "/about" },
                { label: "Komandamız",   href: "/about#team" },
                { label: "Dəyərlərimiz", href: "/about#values" },
                { label: "Tərəfdaşlıq",  href: "/#partner" },
                { label: "Müştərilər",   href: "/#clients" },
              ].map(link => (
                <a key={link.label} href={link.href}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 200ms", width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{link.label}</a>
              ))}
            </nav>
          </div>

          {/* Əlaqə */}
          <div className="ftr-col">
            <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.28)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>Əlaqə</p>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 13 }}>
              {contacts.map(({ Icon, text, href }, i) => (
                <a key={i} href={href}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none", color: "rgba(255,255,255,0.45)", transition: "color 200ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  <Icon size={13} style={{ flexShrink: 0, marginTop: 2, color: ACCENT }} />
                  <span style={{ fontSize: 13, lineHeight: 1.55 }}>{text}</span>
                </a>
              ))}
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="ftr-bottom"
          style={{
            borderTop:      "1px solid rgba(255,255,255,0.06)",
            paddingTop:     isMobile ? 20 : 24,
            paddingBottom:  isMobile ? 32 : 36,
            display:        "flex",
            flexDirection:  isMobile ? "column" : "row",
            alignItems:     isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap:            isMobile ? 14 : 0,
          }}
        >
          {/* Left — copyright */}
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", margin: 0 }}>
            © {new Date().getFullYear()} ProFinance Solutions. Bütün hüquqlar qorunur.
          </p>

          {/* Right — nav links + Kronex credit */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 22, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.18)" }}>Bakı, Azərbaycan</span>

            <a
              href="/about"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.18)", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.18)")}
            >
              Haqqımızda <ArrowUpRight size={11} />
            </a>

            {/* Divider */}
            <div style={{ width: 1, height: 12, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

            {/* Designed by Kronex */}
            <a
              href="https://wa.me/994553280818"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            7,
                opacity:        0.55,
                transition:     "opacity 220ms",
                textDecoration: "none",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 500, textTransform: "uppercase" }}>
                Designed by
              </span>
              <img
                src="/Kronex.avif"
                alt="Kronex"
                style={{
                  height:     18,
                  width:      "auto",
                  objectFit:  "contain",
                  flexShrink: 0,
                  filter:     "brightness(0) invert(1)",
                }}
              />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
