"use client";

import { useState } from "react";
import { DARK, mix } from "@/app/lib/brand";

export interface FAQItem {
  question: string;
  answer: string;
}


function FAQCard({
  item,
  index,
  isOpen,
  onToggle,
  isMobile,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const cardBg = isOpen || hovered ? "var(--surface)" : "var(--surface-2)";
  const cardShadow = isOpen
    ? "0 16px 48px color-mix(in srgb, var(--brand) 11%, transparent), 0 4px 16px color-mix(in srgb, var(--brand) 7%, transparent)"
    : hovered
    ? "0 6px 24px color-mix(in srgb, var(--brand) 7%, transparent), 0 2px 8px rgba(0,0,0,0.04)"
    : "0 1px 4px rgba(0,0,0,0.05)";

  return (
    <div
      className="faq-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: cardBg,
        borderRadius: 14,
        border: `1px solid ${isOpen ? `${mix(DARK, 13)}` : hovered ? `${mix(DARK, 8)}` : "var(--border)"}`,
        boxShadow: cardShadow,
        overflow: "hidden",
        transition:
          "box-shadow 320ms ease, border-color 280ms ease, transform 280ms ease",
        transform: hovered && !isOpen ? "translateY(-2px)" : "translateY(0)",
        borderLeft: isOpen ? `3px solid ${DARK}` : `3px solid transparent`,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: isMobile ? "18px 20px 18px 20px" : "22px 24px 22px 24px",
          textAlign: "left",
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              minWidth: isMobile ? 26 : 30,
              height: isMobile ? 26 : 30,
              borderRadius: 7,
              backgroundColor: isOpen ? DARK : `${mix(DARK, 5)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 280ms",
              marginTop: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                color: isOpen ? "#ffffff" : `${mix(DARK, 50)}`,
                letterSpacing: "0.06em",
                transition: "color 280ms",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 14 : 16,
              color: isOpen ? DARK : "var(--text)",
              letterSpacing: "-0.022em",
              lineHeight: 1.42,
              transition: "color 280ms",
              paddingTop: 4,
            }}
          >
            {item.question}
          </span>
        </div>

        <div
          style={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            borderRadius: "50%",
            backgroundColor: isOpen ? DARK : hovered ? `${mix(DARK, 5)}` : `${mix(DARK, 3)}`,
            border: `1.5px solid ${isOpen ? DARK : hovered ? `${mix(DARK, 13)}` : "transparent"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition:
              "background-color 280ms, border-color 280ms, transform 280ms",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            style={{
              transition: "transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <path
              d="M5 1V9M1 5H9"
              stroke={isOpen ? "#ffffff" : hovered ? DARK : "var(--text-faint)"}
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              height: 1,
              backgroundColor: `${mix(DARK, 5)}`,
              marginLeft: isMobile ? 20 : 24,
              marginRight: isMobile ? 20 : 24,
            }}
          />
          <p
            style={{
              fontSize: isMobile ? 14 : 15,
              color: "var(--text-muted)",
              lineHeight: 1.88,
              margin: 0,
              padding: isMobile
                ? "18px 20px 22px 60px"
                : "20px 24px 26px 68px",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({
  items,
  isMobile,
}: {
  items: FAQItem[];
  isMobile: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <FAQCard
          key={i}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
