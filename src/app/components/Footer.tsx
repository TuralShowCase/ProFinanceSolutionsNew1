"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight, MessageCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { localizedSlug, AZ_SLUGS } from "../services/servicesData";
import { ACCENT, PLH_ACC } from "@/app/lib/brand";

gsap.registerPlugin(ScrollTrigger);


export function Footer() {
  const t      = useTranslations();
  const locale = useLocale();
  const footerRef = useRef<HTMLElement>(null);

  const base = locale === "az" ? "" : `/${locale}`;
  const servicesBasePath = `${base}/services`;
  const aboutPath = locale === "ru" ? `${base}/o-nas` : `${base}/about`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ftr-brand",   { clipPath: "inset(100% 0 0 0)", duration: 0.85, ease: "expo.inOut", scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-partner", { opacity: 0, y: 16, duration: 0.6, ease: "power2.out", delay: 0.25, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-col",     { opacity: 0, y: 24, duration: 0.55, ease: "power2.out", stagger: 0.1, delay: 0.4, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
      gsap.from(".ftr-bottom",  { opacity: 0, duration: 0.5, delay: 0.7, scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true } });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const contacts = [
    { Icon: Phone,         text: "+994 10 505 71 71",      href: "tel:+994105057171" },
    { Icon: MessageCircle, text: "+994 10 505 71 71",      href: "https://wa.me/994105057171" },
    { Icon: Mail,          text: "info@profinance.az",     href: "mailto:info@profinance.az" },
    { Icon: MapPin,        text: t("footer.address"),      href: "https://maps.google.com/?q=Ahmad+Rajabli+2+Baku+Azerbaijan" },
  ];

  const companyLinks = [
    { label: t("footer.about"),       href: aboutPath },
    { label: t("footer.team"),        href: `${aboutPath}#team` },
    { label: t("footer.values"),      href: `${aboutPath}#values` },
    { label: t("footer.partnership"), href: `${base || "/"}#partner` },
    { label: t("footer.clients"),     href: `${base || "/"}#clients` },
  ];

  return (
    <footer id="contact" ref={footerRef} style={{ backgroundColor: "var(--ink)", fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
      <div className="ftr-wrap" style={{ maxWidth: 1200, margin: "0 auto" }}>

        {}
        <div className="ftr-brand" style={{ display: "grid", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo-mark-light.png" alt="ProFinance" width={38} height={38} loading="lazy" style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>ProFinance</div>
              <div style={{ fontSize: 16, color: "var(--invert-text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions</div>
            </div>
          </div>
          <p className="ftr-tagline" style={{ fontSize: 18, color: "var(--invert-text-muted)", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
            {t("footer.tagline")}
          </p>
          <div className="ftr-social" style={{ display: "flex", gap: 9 }}>
            {[{ Icon: Instagram, href: "#" }, { Icon: Facebook, href: "#" }, { Icon: Linkedin, href: "#" }].map(({ Icon, href }, i) => (
              <a key={i} href={href} style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "all 300ms ease" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "rgba(255,255,255,0.11)"; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.18)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "rgba(255,255,255,0.06)"; el.style.color = "rgba(255,255,255,0.38)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = "translateY(0)"; }}
              ><Icon size={18} /></a>
            ))}
          </div>
        </div>

        {}
        <div className="ftr-partner" style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--invert-text-faint)", letterSpacing: "0.16em", textTransform: "uppercase", flexShrink: 0 }}>{t("footer.legalPartner")}</span>
          <div style={{ width: 1, height: 16, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
          <img src="/PLHLogo.avif" alt="PLH" loading="lazy" style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0, opacity: 0.85 }} />
          <span style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 18, color: "var(--invert-text-muted)", flexShrink: 0 }}>{t("partner.firmName")}</span>
          <div style={{ flex: 1 }} />
          <a href="https://plh.az" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 16, color: PLH_ACC, textDecoration: "none", fontWeight: 500, transition: "opacity 200ms", opacity: 0.75, flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
          >plh.az <ArrowUpRight size={14} /></a>
        </div>

        {}
        <div className="ftr-cols" style={{ display: "grid" }}>

          {}
          <div className="ftr-col">
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--invert-text-faint)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>{t("footer.services")}</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {AZ_SLUGS.map(azSlug => (
                <a key={azSlug} href={`${servicesBasePath}/${localizedSlug(azSlug, locale)}`}
                  style={{ fontSize: 18, color: "var(--invert-text-muted)", textDecoration: "none", transition: "color 200ms", width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--invert-text-muted)")}
                >{t(`services.names.${azSlug}` as Parameters<typeof t>[0])}</a>
              ))}
            </nav>
          </div>

          {}
          <div className="ftr-col">
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--invert-text-faint)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>{t("footer.company")}</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {companyLinks.map(link => (
                <a key={link.label} href={link.href}
                  style={{ fontSize: 18, color: "var(--invert-text-muted)", textDecoration: "none", transition: "color 200ms", width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--invert-text-muted)")}
                >{link.label}</a>
              ))}
            </nav>
          </div>

          {}
          <div className="ftr-col">
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--invert-text-faint)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 18px" }}>{t("footer.contact")}</p>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 13 }}>
              {contacts.map(({ Icon, text, href }, i) => (
                <a key={i} href={href} style={{ display: "flex", alignItems: "flex-start", gap: 11, textDecoration: "none", color: "var(--invert-text-muted)", transition: "color 200ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--invert-text-muted)")}
                >
                  <Icon size={18} style={{ flexShrink: 0, marginTop: 5, color: ACCENT }} />
                  <span style={{ fontSize: 18, lineHeight: 1.55 }}>{text}</span>
                </a>
              ))}
            </address>
          </div>
        </div>

        {}
        <div className="ftr-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 16, color: "var(--invert-text-faint)", margin: 0 }}>
            © {new Date().getFullYear()} ProFinance Solutions. {t("footer.copyright")}
          </p>
          <div className="ftr-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 16, color: "var(--invert-text-faint)" }}>{t("footer.city")}</span>
            <a href={aboutPath} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 16, color: "var(--invert-text-faint)", textDecoration: "none", transition: "color 200ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--invert-text-faint)")}
            >{t("footer.about")} <ArrowUpRight size={13} /></a>
            <div style={{ width: 1, height: 14, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
            <a href="https://wa.me/994553280818" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, opacity: 0.55, transition: "opacity 220ms", textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
            >
              <span style={{ fontSize: 16, color: "var(--invert-text-faint)", letterSpacing: "0.06em", fontWeight: 500, textTransform: "uppercase" }}>{t("footer.designedBy")}</span>
              <img src="/Kronex.avif" alt="Kronex" loading="lazy" style={{ height: 20, width: "auto", objectFit: "contain", flexShrink: 0, filter: "brightness(0) invert(1)" }} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
