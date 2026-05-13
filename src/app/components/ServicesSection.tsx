"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScanSearch, Calculator, FileText, BarChart3,
  Monitor, Users, GraduationCap, ShieldCheck, ArrowUpRight,
} from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { index: "01", name: "Uçotun Diaqnostikası və Bərpası", description: "Mühasibat uçotunun hərtərəfli yoxlanılması, mövcud xətaların müəyyən edilməsi və qeydiyyatın standartlara uyğunlaşdırılması.", Icon: ScanSearch },
  { index: "02", name: "Mühasibat Konsaltinqi", description: "Maliyyə hesabatlarının hazırlanması, mühasibat siyasətinin qurulması və gündəlik uçot proseslərinin dəstəklənməsi.", Icon: Calculator },
  { index: "03", name: "Vergi Konsaltinqi", description: "Vergi planlaması, bəyannamələrin hazırlanması, yoxlamalara hazırlıq və qanunvericiliyə tam uyğunluq.", Icon: FileText },
  { index: "04", name: "Maliyyə və İdarəetmə Konsaltinqi", description: "Büdcə planlaması, maliyyə modelləşdirməsi, KPI sistemləri və korporativ maliyyə strategiyasının işlənib hazırlanması.", Icon: BarChart3 },
  { index: "05", name: "Əməliyyat və Rəqəmsal Konsaltinq", description: "Biznes proseslərinin avtomatlaşdırılması, ERP tətbiqi, rəqəmsal iş axınlarının qurulması.", Icon: Monitor },
  { index: "06", name: "HR və Kadrlar üzrə Konsaltinq", description: "Əmək münasibətlərinin tənzimlənməsi, əmək haqqı siyasəti, HR proseslərinin qurulması və işçi motivasiya sistemləri.", Icon: Users },
  { index: "07", name: "Təlim və İnkişaf", description: "Mühasibat, vergi, maliyyə idarəçiliyi üzrə fərdi və qrup təlimləri, sertifikasiya proqramları.", Icon: GraduationCap },
  { index: "08", name: "Auditor Xidmətləri", description: "Daxili və xarici audit, maliyyə hesabatlarının müstəqil yoxlanılması, risk qiymətləndirilməsi və IFRS hesabatı.", Icon: ShieldCheck },
];

export function ServicesSection() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-heading-anim", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
      gsap.fromTo(".svc-card-anim", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.065,
        scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sectionPadding = isMobile ? "64px 20px" : isTablet ? "80px 24px" : "120px 40px";
  const gridCols       = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ backgroundColor: "#F5F4F1", padding: sectionPadding, fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div
          className="svc-heading-anim"
          style={{
            opacity: 0, display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? 16 : 40, marginBottom: 60, flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: "#1A3D2B", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px 0" }}>
              Xidmətlər
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3.8vw, 50px)", color: "#111410", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Biznesiniz üçün{" "}
              <span style={{ color: "#1A3D2B" }}>kompleks</span> maliyyə həlləri
            </h2>
          </div>
          <div style={{ maxWidth: 340 }}>
            <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: "0 0 22px 0" }}>
              8 ixtisaslaşmış istiqamət üzrə maliyyə, vergi, kadr və rəqəmsal ehtiyaclarınızı tam əhatə edirik.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1A3D2B", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "gap 200ms" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "10px")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "6px")}
            >
              Ətraflı məlumat <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "#E0DDD8", marginBottom: 48 }} />

        {/* Grid */}
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: gridCols, gap: 14 }}>
          {services.map((svc) => (
            <ServiceCard key={svc.index} {...svc} />
          ))}
        </div>

        {/* Bottom CTA */}
        {isMobile ? (
          /* Mobile CTA — matches desktop pattern:
             paddingTop creates empty space ABOVE the card,
             figure is absolutely positioned in that space (top: 0),
             so man sits ON TOP of the card, not inside it */
          <div style={{
            marginTop: 20, position: "relative",
            paddingTop: 110,
          }}>
            {/* Figure on the LEFT */}
            <img
              src="/CtaSitting.png"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -3,
                left: 12,
                height: 220,
                width: "auto",
                filter: "drop-shadow(8px 0 20px rgba(0,0,0,0.22))",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Green card */}
            <div style={{
              backgroundColor: "#1A3D2B", borderRadius: 16,
              overflow: "hidden", position: "relative", zIndex: 1,
            }}>
              {/* Text — paddingLeft clears the figure on the left */}
              <div style={{ padding: "22px 24px 16px 148px" }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                  fontSize: 17, color: "#FFFFFF", margin: "0 0 8px", letterSpacing: "-0.02em",
                }}>
                  Hansı xidmət sizə lazımdır?
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>
                  Pulsuz ilkin məsləhət üçün bu gün bizimlə əlaqə saxlayın.
                </p>
              </div>

              {/* Button — full card width, outside the left-padded text area */}
              <div style={{ padding: "0 24px 24px 24px" }}>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    backgroundColor: "#FFFFFF", color: "#1A3D2B", fontWeight: 700, fontSize: 14,
                    padding: "13px 20px", borderRadius: 8, textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Əlaqə saxlayın <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Tablet / Desktop CTA — with CtaSitting image */
          <div style={{ marginTop: 52, position: "relative", paddingTop: isTablet ? 140 : 190 }}>
            <img src="/CtaSitting.png" alt="" aria-hidden="true" style={{
              position: "absolute", top: 2,
              left: isTablet ? 32 : 48,
              height: isTablet ? 280 : 360,
              width: "auto", zIndex: 10, pointerEvents: "none", display: "block",
              filter: "drop-shadow(8px 12px 24px rgba(0,0,0,0.22))",
            }} />
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 24, flexWrap: "wrap",
              padding: isTablet ? "28px 32px 28px 200px" : "36px 44px 36px 260px",
              backgroundColor: "#1A3D2B", borderRadius: 16, overflow: "hidden", position: "relative",
            }}>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 20, color: "#FFFFFF", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                  Hansı xidmət sizə lazımdır?
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  Pulsuz ilkin məsləhət üçün bu gün bizimlə əlaqə saxlayın.
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  backgroundColor: "#FFFFFF", color: "#1A3D2B", fontWeight: 700, fontSize: 14,
                  padding: "13px 28px", borderRadius: 8, textDecoration: "none",
                  whiteSpace: "nowrap", flexShrink: 0, transition: "transform 200ms, background-color 200ms",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#EFF7F2"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                Əlaqə saxlayın <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── CARD ── */
function ServiceCard({ index, name, description, Icon }: { index: string; name: string; description: string; Icon: React.ElementType }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="svc-card-anim"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0, position: "relative",
        backgroundColor: hovered ? "#FFFFFF" : "#EFEDE9",
        borderRadius: 14, padding: "28px 24px 24px", cursor: "default",
        transition: "background-color 260ms, transform 260ms, box-shadow 260ms",
        transform: hovered ? "translateY(-10px) scale(1.018)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 28px 64px rgba(26,61,43,0.14), 0 8px 20px rgba(26,61,43,0.08), 0 2px 6px rgba(0,0,0,0.05)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, backgroundColor: hovered ? "#1A3D2B" : "transparent", borderRadius: "14px 0 0 14px", transition: "background-color 280ms" }} />
      <span style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 30, color: hovered ? "rgba(26,61,43,0.07)" : "rgba(0,0,0,0.05)", letterSpacing: "-0.04em", lineHeight: 1, userSelect: "none", transition: "color 280ms", pointerEvents: "none" }}>{index}</span>
      <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: hovered ? "#EBF4EE" : "rgba(26,61,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, flexShrink: 0, transition: "background-color 280ms" }}>
        <Icon size={20} color={hovered ? "#1A3D2B" : "#4A7A5C"} strokeWidth={1.7} />
      </div>
      <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: hovered ? "#111410" : "#2C2F2C", margin: "0 0 10px 0", letterSpacing: "-0.015em", lineHeight: 1.3, transition: "color 280ms", paddingRight: 8 }}>{name}</h4>
      <p style={{ fontSize: 13, color: hovered ? "#6B7280" : "#8C9490", lineHeight: 1.7, margin: "0 0 20px 0", flex: 1, transition: "color 280ms" }}>{description}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: hovered ? "#1A3D2B" : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 280ms" }}>
          <ArrowUpRight size={13} color={hovered ? "#FFFFFF" : "#9CA3AF"} />
        </div>
      </div>
    </div>
  );
}
