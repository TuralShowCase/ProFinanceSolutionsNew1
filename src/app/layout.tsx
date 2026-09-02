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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
        {}
        <meta name="geo.region" content="AZ-BA" />
        <meta name="geo.placename" content="Baku, Azerbaijan" />
        <meta name="geo.position" content="40.3777;49.843" />
        <meta name="ICBM" content="40.3777, 49.843" />
        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body style={{ margin: 0, height: '100%' }}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            {}
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
