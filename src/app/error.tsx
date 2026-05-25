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
        fontFamily: "'Inter', sans-serif",
        gap: 16,
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#1A3D2B",
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
          color: "#0F1117",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        500
      </h1>
      <p style={{ fontSize: 16, color: "#6B7280", margin: 0 }}>
        Xəta baş verdi
      </p>
      <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, textAlign: "center", maxWidth: 320 }}>
        Texniki problem yarandı. Xahiş edirik bir az sonra yenidən cəhd edin.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          onClick={reset}
          style={{
            color: "#ffffff",
            backgroundColor: "#1A3D2B",
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
            color: "#1A3D2B",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            border: "1px solid rgba(26,61,43,0.13)",
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
