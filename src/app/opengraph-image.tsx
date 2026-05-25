import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1A3D2B 0%, #0F2419 100%)',
          width: '100%',
          height: '100%',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 340,
            height: 340,
            background: 'radial-gradient(circle at top right, rgba(82,183,136,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              color: '#52B788',
              fontWeight: 800,
            }}
          >
            P
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            ProFinance Solutions
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span
            style={{
              color: 'white',
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Maliyyə Konsaltinqi
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 40,
                height: 3,
                background: '#52B788',
                borderRadius: 2,
                display: 'flex',
              }}
            />
            <span
              style={{
                color: '#52B788',
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Bakı, Azərbaycan
            </span>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 44,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>
            2019 · 50+ müştəri · 8 xidmət sahəsi
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>
            profinancesolutions.az
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
