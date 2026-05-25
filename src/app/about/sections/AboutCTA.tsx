"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone } from "lucide-react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useContactModal } from "../../contexts/ContactModalContext";

gsap.registerPlugin(ScrollTrigger);

const DARK = "#1A3D2B";
const ACCENT = "#52B788";

function CTAButton({
  children,
  href,
  onClick,
  primary,
  icon,
  fullWidth,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontWeight: primary ? 700 : 500,
    fontSize: 15,
    padding: "14px 30px",
    borderRadius: 9,
    textDecoration: "none",
    whiteSpace: "nowrap",
    width: fullWidth ? "100%" : undefined,
    transition: "background-color 220ms, transform 200ms, border-color 220ms",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    ...(primary
      ? { backgroundColor: hovered ? "#F0F0F0" : "#FFFFFF", color: DARK }
      : {
          backgroundColor: hovered ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.06)",
          color: "#FFFFFF",
          border: hovered ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.18)",
        }),
  };

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...sharedStyle, border: primary ? "none" : sharedStyle.border as string, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
      >
        {icon}{children}
      </button>
    );
  }

  return (
    <a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={sharedStyle}>
      {icon}{children}
    </a>
  );
}

export function AboutCTA() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const sectionRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 44, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" }
      )
        .fromTo(
          ".cta-item",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          humanRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
          "-=0.55"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#F5F4F1",
        fontFamily: "'Inter', sans-serif",
        paddingTop: isMobile ? 48 : isTablet ? 160 : 200,
        paddingBottom: isMobile ? 64 : isTablet ? 80 : 100,
        paddingLeft: isMobile ? 20 : isTablet ? 28 : 48,
        paddingRight: isMobile ? 20 : isTablet ? 28 : 48,
      }}
    >
      <div style={{ maxWidth: isMobile ? "100%" : isTablet ? 820 : 960, margin: "0 auto" }}>

        {/* Card */}
        <div
          ref={cardRef}
          style={{
            backgroundColor: DARK,
            borderRadius: 24,
            padding: isMobile
              ? "48px 28px 280px"
              : isTablet
              ? "52px 48px"
              : "64px 64px",
            position: "relative",
            overflow: "visible",
            opacity: 0,
          }}
        >
          {/* Accent line */}
          <div style={{ position: "absolute", top: 0, left: 60, right: 60, height: 2, backgroundColor: ACCENT, borderRadius: "0 0 2px 2px", opacity: 0.4 }} />

          {/* Human — inside card; desktop/tablet bleeds above, mobile sits at bottom */}
          <img
            ref={humanRef}
            src="/AboutCTAHumans.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              userSelect: "none",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom",
              zIndex: 0,
              ...(isMobile
                ? { bottom: 0, left: 0, right: 0, margin: "0 auto", height: 260 }
                : { bottom: 0, right: isTablet ? "4%" : "5%", height: isTablet ? 440 : 560 }
              ),
            }}
          />

          {/* Content — constrained to left so it never overlaps the human on desktop */}
          <div style={{
            position: "relative",
            zIndex: 1,
            maxWidth: isMobile ? "100%" : isTablet ? "56%" : "52%",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 28 : 36,
            width: "100%",
          }}>
            {/* Text */}
            <div>
              <h2
                className="cta-item"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 26 : isTablet ? 30 : "clamp(30px, 2.8vw, 42px)",
                  color: "#ffffff",
                  margin: "0 0 16px",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                }}
              >
                Maliyyə hədəflərinizə<br />
                <span style={{ color: ACCENT }}>birlikdə çataq</span>
              </h2>

              <div className="cta-item" style={{ width: 40, height: 2, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 18, opacity: 0.6 }} />

              <p
                className="cta-item"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.52)", lineHeight: 1.8, margin: 0 }}
              >
                Biznesinizin maliyyə sağlamlığı üçün ilk addımı bu gün atın.
                Pulsuz ilkin konsultasiya ilə hər şey başlayır.
              </p>
            </div>

            {/* Buttons */}
            <div
              className="cta-item"
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: isMobile ? 12 : 10,
                width: isMobile ? "100%" : "auto",
              }}
            >
              <CTAButton primary onClick={openContact} icon={<Phone size={15} strokeWidth={1.8} />} fullWidth={isMobile}>
                Pulsuz konsultasiya
              </CTAButton>
              <CTAButton href="/#services" icon={<ArrowUpRight size={16} />} fullWidth={isMobile}>
                Xidmətlərə bax
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
