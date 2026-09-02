
export function NotFoundView({
  message,
  backHome,
  homeHref,
}: {
  message: string;
  backHome: string;
  homeHref: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: "var(--font-inter), 'Inter', sans-serif",
        gap: 16,
        backgroundColor: 'var(--page-bg)',
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--brand)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
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
          color: 'var(--text-strong)',
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p style={{ fontSize: 20, color: 'var(--text-muted)', margin: 0 }}>{message}</p>
      <a
        href={homeHref}
        style={{
          marginTop: 8,
          color: 'var(--brand)',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: 18,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 20px',
          border: '1px solid color-mix(in srgb, var(--brand) 13%, transparent)',
          borderRadius: 8,
          transition: 'all 200ms',
        }}
      >
        {backHome}
      </a>
    </div>
  );
}
