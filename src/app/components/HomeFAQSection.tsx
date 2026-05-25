"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useContactModal } from "../contexts/ContactModalContext";
import { FAQAccordion, type FAQItem } from "./FAQAccordion";

gsap.registerPlugin(ScrollTrigger);

const DARK   = "#1A3D2B";
const ACCENT = "#52B788";

const HOME_FAQS: FAQItem[] = [
  {
    question: "ProFinance Solutions hansı şirkətlərə xidmət göstərir?",
    answer:
      "Kiçik sahibkarlardan iri holdinqlərə qədər hər ölçüdə şirkətə xidmət göstəririk. Startaplar, yerli bizneslər, xarici şirkət filialları, istehsal müəssisələri, ticarət şirkətləri — hər sahədən müştərimiz var. Bizim üçün vacib olan şirkətin ölçüsü deyil, maliyyə sağlamlığına olan ciddi yanaşmadır.",
  },
  {
    question: "İlkin məsləhət niyə pulsuzdur?",
    answer:
      "Çünki biz ortaqlıq əsasında çalışırıq. İlkin görüşdə şirkətinizin vəziyyətini, ehtiyaclarını və məqsədlərini başa düşürük. Bu mərhələ bizə ən uyğun həll yolunu təklif etməyə, sizə isə heç bir öhdəlik almadan real dəyər qiymətləndirilməsi aparmağa imkan verir.",
  },
  {
    question: "Azərbaycan qanunvericiliyinə tam uyğun xidmət göstərirsinizmi?",
    answer:
      "Bəli. Bütün xidmətlərimiz Azərbaycan Respublikasının Vergi Məcəlləsi, Əmək Məcəlləsi, MHBS standartları və digər aktual qanunvericiliyə tam uyğun aparılır. Qanunvericilikdəki dəyişikliklər daim izlənilir və müştərilərimiz vaxtında məlumatlandırılır.",
  },
  {
    question: "Eyni anda bir neçə xidmətdən istifadə etmək mümkündürmü?",
    answer:
      "Bəli, bu hətta tövsiyə edilən yanaşmadır. Mühasibat, vergi, HR və maliyyə idarəçiliyi bir-biri ilə sıx bağlıdır. Kompleks xidmətlər daha ardıcıl, daha sürətli nəticə verir. Çox müştərimiz bir neçə xidməti eyni vaxtda alır.",
  },
  {
    question: "Məlumatlarımın məxfiliyi necə qorunur?",
    answer:
      "Hər müştəri ilə məxfilik müqaviləsi (NDA) bağlanır. Şirkət məlumatlarınız yalnız layihəyə aid komanda üzvlərinə açıqdır, üçüncü tərəflərə ötürülmür. Bütün sənədlər şifrəli mühitdə saxlanılır.",
  },
  {
    question: "Uzaqdan (remote) xidmət əlçatandır?",
    answer:
      "Bəli. Xidmətlərimizin böyük hissəsi onlayn olaraq tam şəkildə göstərilə bilər. Video görüşlər, buludda sənəd mübadiləsi və rəqəmsal kommunikasiya vasitəsilə Azərbaycanın istənilən şəhərindən, həmçinin xaricdən müştərilərimizlə əməkdaşlıq edirik.",
  },
  {
    question: "Nəticə nə zaman görünür?",
    answer:
      "İlk nəticələr adətən 2–4 həftə ərzində görünür: uçot sistemindəki problemlər aşkar edilir, vergi riskləri müəyyənləşdirilir, proseslər sənədləşdirilir. Strateji nəticələr — büdcə intizamı, vergi qənaəti, HR effektivliyi — 3–6 ay daxilində əldə edilir.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://profinancesolutions.az/#faqpage",
  url: "https://profinancesolutions.az",
  name: "Tez-Tez Verilən Suallar | ProFinance Solutions",
  isPartOf: { "@id": "https://profinancesolutions.az/#website" },
  about: { "@id": "https://profinancesolutions.az/#organization" },
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function HomeFAQSection() {
  const bp       = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContactModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hfaq-left",
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 22, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: ".hfaq-accordion", start: "top 82%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pad = isMobile ? "72px 20px 80px" : isTablet ? "88px 28px 96px" : "110px 48px 120px";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <section
        id="faq"
        ref={sectionRef}
        style={{
          background: "linear-gradient(160deg, #F0F7F3 0%, #F7F9F7 55%, #EEF5F1 100%)",
          padding: pad,
          fontFamily: "'Inter', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blurred green orb — top-left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Decorative blurred orb — bottom-right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -80,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${DARK}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile || isTablet ? "1fr" : "340px 1fr",
              gap: isMobile ? 44 : isTablet ? 52 : 88,
              alignItems: "start",
            }}
          >

            {/* ── LEFT PANEL ── */}
            <div
              className="hfaq-left"
              style={{
                opacity: 0,
                position: isMobile || isTablet ? "static" : "sticky",
                top: 120,
              }}
            >
              {/* Badge label */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  backgroundColor: `${DARK}10`,
                  border: `1px solid ${DARK}1A`,
                  borderRadius: 100,
                  padding: "5px 14px 5px 10px",
                  marginBottom: 24,
                }}
              >
                <MessageCircle size={13} color={DARK} strokeWidth={2} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: DARK,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Suallar & Cavablar
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile
                    ? "clamp(28px, 8vw, 38px)"
                    : isTablet
                    ? "clamp(34px, 5.5vw, 46px)"
                    : "clamp(36px, 3.4vw, 50px)",
                  color: "#111410",
                  margin: "0 0 16px",
                  letterSpacing: "-0.044em",
                  lineHeight: 1.06,
                }}
              >
                Ən çox{" "}
                <span
                  style={{
                    color: DARK,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  soruşulan
                </span>
                <br />
                suallar
              </h2>

              {/* Counter pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: DARK,
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                  }}
                >
                  {HOME_FAQS.length}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "#9CA3AF",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  ətraflı<br />cavab
                </span>
              </div>

              {/* Subtle divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: `linear-gradient(to right, ${DARK}20, transparent)`,
                  marginBottom: 20,
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontSize: 15,
                  color: "#6B7280",
                  lineHeight: 1.82,
                  margin: "0 0 32px",
                  maxWidth: isMobile || isTablet ? 520 : 290,
                }}
              >
                Müştərilərimizin ən çox soruşduğu suallara cavab topladıq.
                Sualınız cavablanmırsa, bizimlə birbaşa əlaqə saxlayın.
              </p>

              {/* CTA button */}
              <button
                onClick={openContact}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: DARK,
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "13px 22px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  transition: "box-shadow 240ms, transform 240ms",
                  boxShadow: `0 4px 20px ${DARK}30`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 8px 32px ${DARK}44`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 4px 20px ${DARK}30`;
                  el.style.transform = "translateY(0)";
                }}
              >
                Pulsuz məsləhət alın
                <ArrowUpRight size={15} strokeWidth={2} />
              </button>
            </div>

            {/* ── RIGHT PANEL — accordion ── */}
            <div className="hfaq-accordion">
              <FAQAccordion items={HOME_FAQS} isMobile={isMobile} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
