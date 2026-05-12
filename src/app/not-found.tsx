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
      }}
    >
      <h1 style={{ fontSize: 48, fontWeight: 800, margin: 0 }}>404</h1>
      <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>Page not found</p>
      <a
        href="/"
        style={{
          marginTop: 8,
          color: '#1A3D2B',
          fontWeight: 500,
          textDecoration: 'underline',
        }}
      >
        Go home
      </a>
    </div>
  );
}
