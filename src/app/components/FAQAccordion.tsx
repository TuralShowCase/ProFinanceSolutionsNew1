"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

const DARK = "#1A3D2B";

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

  const cardBg = isOpen ? "#ffffff" : hovered ? "#ffffff" : "#ffffff";
  const cardShadow = isOpen
    ? "0 16px 48px rgba(26,61,43,0.11), 0 4px 16px rgba(26,61,43,0.07)"
    : hovered
    ? "0 6px 24px rgba(26,61,43,0.07), 0 2px 8px rgba(0,0,0,0.04)"
    : "0 1px 4px rgba(0,0,0,0.05)";

  return (
    <div
      className="faq-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: cardBg,
        borderRadius: 14,
        border: `1px solid ${isOpen ? `${DARK}22` : hovered ? `${DARK}14` : "#EDECEA"}`,
        boxShadow: cardShadow,
        overflow: "hidden",
        transition:
          "box-shadow 320ms ease, border-color 280ms ease, transform 280ms ease",
        transform: hovered && !isOpen ? "translateY(-2px)" : "translateY(0)",
        /* Left accent bar */
        borderLeft: isOpen ? `3px solid ${DARK}` : `3px solid transparent`,
      }}
    >
      {/* Question row */}
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
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Number + question */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          {/* Number badge */}
          <div
            style={{
              minWidth: isMobile ? 26 : 30,
              height: isMobile ? 26 : 30,
              borderRadius: 7,
              backgroundColor: isOpen ? DARK : `${DARK}0E`,
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
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                color: isOpen ? "#ffffff" : `${DARK}80`,
                letterSpacing: "0.06em",
                transition: "color 280ms",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? 14 : 16,
              color: isOpen ? DARK : "#111410",
              letterSpacing: "-0.022em",
              lineHeight: 1.42,
              transition: "color 280ms",
              paddingTop: 4,
            }}
          >
            {item.question}
          </span>
        </div>

        {/* Toggle — chevron style */}
        <div
          style={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            borderRadius: "50%",
            backgroundColor: isOpen ? DARK : hovered ? `${DARK}0E` : `${DARK}08`,
            border: `1.5px solid ${isOpen ? DARK : hovered ? `${DARK}22` : "transparent"}`,
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
              stroke={isOpen ? "#ffffff" : hovered ? DARK : "#9CA3AF"}
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      {/* Answer — grid-template-rows trick for butter-smooth animation */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          {/* Thin separator inside the card */}
          <div
            style={{
              height: 1,
              backgroundColor: `${DARK}0C`,
              marginLeft: isMobile ? 20 : 24,
              marginRight: isMobile ? 20 : 24,
            }}
          />
          <p
            style={{
              fontSize: isMobile ? 14 : 15,
              color: "#6B7280",
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
