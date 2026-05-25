export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        gap: 16,
        backgroundColor: '#ffffff',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#1A3D2B',
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
          color: '#0F1117',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>
        Səhifə tapılmadı
      </p>
      <a
        href="/"
        style={{
          marginTop: 8,
          color: '#1A3D2B',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: 14,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 20px',
          border: '1px solid rgba(26,61,43,0.13)',
          borderRadius: 8,
          transition: 'all 200ms',
        }}
      >
        Əsas səhifəyə qayıt
      </a>
    </div>
  );
}
