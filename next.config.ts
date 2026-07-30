import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * React's development build uses eval() for debugging features (reconstructing
 * cross-environment callstacks, the error overlay). Its production build never
 * does. So 'unsafe-eval' is granted in dev only — dropping it outright breaks
 * `next dev` with "eval() is not supported in this environment".
 */
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-inline' is still required: the theme no-flash script and the GA
      // bootstrap are both inline, and GA injects more at runtime. Removing it
      // means plumbing a per-request nonce through the layout — worth doing, but
      // it can't be done from static config alone.
      // 'unsafe-eval' is dev-only (see isDev above) — production drops it.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      // Blocks <base> injection re-pointing every relative URL on the page.
      "base-uri 'self'",
      // No plugins; nothing here should ever embed Flash/Java/PDF objects.
      "object-src 'none'",
      // Forms can only post back to this origin.
      "form-action 'self'",
      "frame-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      /**
       * Pages render per-request (next-intl reads the locale from the request,
       * which opts the tree out of static generation). The output is still
       * identical for everyone hitting a given URL — no cookies, no user data,
       * and locale is decided by the path alone now that Accept-Language
       * detection is off. So let the CDN serve it and keep origin renders rare.
       *
       * Deploys purge the edge cache, so a publish is still immediately live.
       * Excludes /_next/* — Next sets its own immutable headers on those.
       */
      {
        source: '/((?!_next/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default withNextIntl(nextConfig);
