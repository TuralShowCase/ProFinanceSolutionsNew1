import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Script from 'next/script';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ThemeProvider, themeNoFlashScript } from './contexts/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-33DDETT8MX';
import { SITE_URL } from './lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1A3D2B' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0F0C' },
  ],
};

// `description` is filled in per-locale below (reuses meta.homeDescription so
// there's one source of truth) — this schema block sits in the root layout,
// outside the [locale] segment, so it can't be statically pre-filled.
function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'ProFinance Solutions',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-icon.png`, width: 500, height: 500 },
    description,
    areaServed: { '@type': 'Country', name: 'Azerbaijan', sameAs: 'https://www.wikidata.org/wiki/Q227' },
    address: { '@type': 'PostalAddress', streetAddress: 'Əhməd Rəcəbli-2 küçəsi', addressLocality: 'Bakı', addressCountry: 'AZ' },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+994-10-505-71-71', contactType: 'customer service', availableLanguage: ['Azerbaijani', 'Russian', 'English'] },
    ],
    email: 'info@profinance.az',
    sameAs: [],
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const organizationSchema = buildOrganizationSchema(tMeta('homeDescription'));

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeNoFlashScript }} />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* No image preloads here on purpose.
            This layout wraps every route, so anything preloaded is fetched at
            high priority on pages that never render it. The header mark is a 3KB
            file already in the initial HTML (the preload scanner finds it with no
            help), and each page preloads its own LCP image instead — see
            `preloadHeroImage()` in app/page.tsx. */}
        <meta name="geo.region" content="AZ-BA" />
        <meta name="geo.placename" content="Baku, Azerbaijan" />
        <meta name="geo.position" content="40.3777;49.843" />
        <meta name="ICBM" content="40.3777, 49.843" />
        {/* hreflang is emitted per-page via the Metadata API (alternates.languages),
            so each route advertises its own correct language alternates. Do not add a
            global hreflang block here — it would conflict with the per-page tags. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body style={{ margin: 0, height: '100%' }}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            {/* Inside the provider, not beside it: the button's label and its
                prefilled WhatsApp message are translated, and useTranslations
                throws outside this boundary. */}
            <WhatsAppButton />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
