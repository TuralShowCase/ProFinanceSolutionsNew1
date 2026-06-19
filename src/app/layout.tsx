import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profinancesolutions.az';

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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'ProFinance Solutions',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-icon.png`, width: 500, height: 500 },
  description: 'Professional financial consulting, tax planning, accounting, audit and HR services for Azerbaijan\'s leading corporations.',
  foundingDate: '2019',
  areaServed: { '@type': 'Country', name: 'Azerbaijan', sameAs: 'https://www.wikidata.org/wiki/Q227' },
  address: { '@type': 'PostalAddress', streetAddress: 'Nizami küçəsi 95', addressLocality: 'Bakı', addressCountry: 'AZ' },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+994-12-555-00-11', contactType: 'customer service', availableLanguage: ['Azerbaijani', 'Russian', 'English'] },
  ],
  email: 'info@profinance.az',
  sameAs: [],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeNoFlashScript }} />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/logo-icon.png" as="image" type="image/png" />
        <link rel="preload" href="/ChatGPT_Image_May_9__2026__05_25_40_PM.avif" as="image" type="image/avif" fetchPriority="high" />
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
          </NextIntlClientProvider>
          <WhatsAppButton />
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
