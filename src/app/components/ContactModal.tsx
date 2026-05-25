"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X, Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

const DARK   = "#1A3D2B";
const ACCENT = "#52B788";

const contacts = [
  { Icon: Phone,         label: "Telefon",    value: "+994 12 555 00 11", href: "tel:+994125550011" },
  { Icon: MessageCircle, label: "WhatsApp",   value: "+994 50 555 00 11", href: "https://wa.me/994505550011" },
  { Icon: Mail,          label: "E-poçt",     value: "info@profinance.az", href: "mailto:info@profinance.az" },
  { Icon: MapPin,        label: "Ünvan",      value: "Bakı, Nizami küçəsi 95", href: "https://maps.google.com/?q=Nizami+street+95+Baku" },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook,  label: "Facebook",  href: "#" },
  { Icon: Linkedin,  label: "LinkedIn",  href: "#" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: Props) {
  const backdropRef  = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Animate in / out
  useEffect(() => {
    if (!backdropRef.current || !cardRef.current) return;

    if (open) {
      // Prevent bg scroll
      document.body.style.overflow = "hidden";

      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1,    y: 0,  duration: 0.35, ease: "expo.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleClose = () => {
    if (!backdropRef.current || !cardRef.current) { onClose(); return; }
    gsap.to(cardRef.current,     { opacity: 0, scale: 0.96, y: 12, duration: 0.22, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onMouseDown={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.48)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        ref={cardRef}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 24px 20px",
          borderBottom: "1px solid #F0F0F0",
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: DARK, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>
              ProFinance Solutions
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "#111410", margin: 0, letterSpacing: "-0.03em" }}>
              Bizimlə əlaqə
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: "#F5F4F1",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background-color 200ms",
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#EBEBEB")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#F5F4F1")}
          >
            <X size={16} color="#6B7280" strokeWidth={2} />
          </button>
        </div>

        {/* Contact items */}
        <div style={{ padding: "20px 24px 0" }}>
          {contacts.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 14px",
                borderRadius: 12,
                textDecoration: "none",
                marginBottom: 6,
                transition: "background-color 180ms",
                backgroundColor: "transparent",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F5F4F1")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                backgroundColor: `${DARK}0D`,
                border: `1px solid ${DARK}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={17} color={DARK} strokeWidth={1.7} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", margin: "0 0 2px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#111410", margin: 0, lineHeight: 1.4 }}>{value}</p>
              </div>
              <ArrowUpRight size={14} color="#9CA3AF" style={{ flexShrink: 0, marginLeft: "auto" }} />
            </a>
          ))}
        </div>

        {/* Divider + Social */}
        <div style={{ padding: "16px 24px 20px", marginTop: 4, borderTop: "1px solid #F0F0F0", marginInline: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Sosial şəbəkələr
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  backgroundColor: "#F5F4F1",
                  border: "1px solid #EBEBEB",
                  borderRadius: 10,
                  padding: "9px 14px",
                  textDecoration: "none",
                  fontSize: 13, fontWeight: 500, color: "#374151",
                  transition: "all 200ms",
                  flex: 1, justifyContent: "center",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = `${DARK}0D`; (e.currentTarget as HTMLElement).style.borderColor = `${DARK}20`; (e.currentTarget as HTMLElement).style.color = DARK; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F5F4F1"; (e.currentTarget as HTMLElement).style.borderColor = "#EBEBEB"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
              >
                <Icon size={16} strokeWidth={1.7} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "0 24px 24px" }}>
          <a
            href="https://wa.me/994505550011"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              backgroundColor: DARK, color: "#ffffff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 15,
              padding: "14px 24px", borderRadius: 12,
              textDecoration: "none", width: "100%",
              transition: "opacity 200ms, transform 200ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <MessageCircle size={16} strokeWidth={1.8} />
            WhatsApp ilə yazın
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
