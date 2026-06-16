"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          fontSize: 11,
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
      <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0 }}>
        Xəta baş verdi
      </p>
      <p style={{ fontSize: 13, color: "var(--text-faint)", margin: 0, textAlign: "center", maxWidth: 320 }}>
        Texniki problem yarandı. Xahiş edirik bir az sonra yenidən cəhd edin.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          onClick={reset}
          style={{
            color: "#ffffff",
            backgroundColor: "var(--brand-solid)",
            fontWeight: 600,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: 8,
            transition: "opacity 200ms",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Yenidən cəhd et
        </button>
        <a
          href="/"
          style={{
            color: "var(--brand)",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            border: "1px solid color-mix(in srgb, var(--brand) 13%, transparent)",
            borderRadius: 8,
            transition: "all 200ms",
          }}
        >
          Əsas səhifə
        </a>
      </div>
    </div>
  );
}
