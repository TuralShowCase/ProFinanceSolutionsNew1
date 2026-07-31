"use client";

import { useTranslations } from "next-intl";

/**
 * Copy is translated, not hardcoded. This sits inside the root layout's
 * NextIntlClientProvider, so an English or Russian visitor no longer gets an
 * Azerbaijani error screen.
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        gap: 16,
        backgroundColor: "var(--page-bg)",
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--brand)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        ProFinance Solutions
      </div>
      <h1
        style={{
          fontSize: 80,
          fontWeight: 800,
          margin: 0,
          color: "var(--text-strong)",
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        500
      </h1>
      <p style={{ fontSize: 20, color: "var(--text-muted)", margin: 0 }}>
        {t("title")}
      </p>
      <p style={{ fontSize: 18, color: "var(--text-muted)", margin: 0, textAlign: "center", maxWidth: 320 }}>
        {t("detail")}
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          onClick={reset}
          style={{
            color: "#ffffff",
            backgroundColor: "var(--brand-solid)",
            fontWeight: 600,
            fontSize: 18,
            border: "none",
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: 8,
            transition: "opacity 200ms",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          {t("retry")}
        </button>
        <a
          href="/"
          style={{
            color: "var(--brand)",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 18,
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            border: "1px solid color-mix(in srgb, var(--brand) 13%, transparent)",
            borderRadius: 8,
            transition: "all 200ms",
          }}
        >
          {t("home")}
        </a>
      </div>
    </div>
  );
}
