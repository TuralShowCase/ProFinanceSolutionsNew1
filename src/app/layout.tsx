import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { WhatsAppButton } from './components/WhatsAppButton';

const GA_ID = 'G-33DDETT8MX';

const SITE_URL = 'https://profinancesolutions.az';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'ProFinance Solutions',
  title: {
    default: 'ProFinance Solutions — Maliyyə Konsaltinqi Bakı, Azərbaycan',
    template: '%s | ProFinance Solutions',
  },
  description:
    'ProFinance Solutions — Bakıda maliyyə konsaltinqi, vergi planlaması, mühasibat və audit xidmətləri. 2019-dan 50+ korporasiyaya etibarlı maliyyə tərəfdaşı.',
  keywords: [
    'maliyyə konsaltinqi',
    'vergi konsaltinqi',
    'mühasibat konsaltinqi',
    'audit xidmətləri',
    'maliyyə məsləhəti',
    'Bakı maliyyə şirkəti',
    'Azərbaycan maliyyə konsultantı',
    'ProFinance Solutions',
    'IFRS hesabatı',
    'vergi planlaması Azərbaycan',
    'HR konsaltinq Bakı',
  ],
  authors: [{ name: 'ProFinance Solutions', url: SITE_URL }],
  creator: 'ProFinance Solutions',
  publisher: 'ProFinance Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'ProFinance Solutions',
    locale: 'az_AZ',
    url: SITE_URL,
    title: 'ProFinance Solutions — Maliyyə Konsaltinqi Bakı',
    description:
      'Bakıda maliyyə konsaltinqi, vergi planlaması, mühasibat və audit. 2019-dan etibarlı maliyyə tərəfdaşı.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ProFinance Solutions — Maliyyə Konsaltinqi Bakı, Azərbaycan',
        type: 'image/png',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  category: 'finance',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A3D2B',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'ProFinance Solutions',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-icon.png`,
    width: 500,
    height: 500,
  },
  description:
    'Azərbaycanın aparıcı korporasiyaları üçün maliyyə konsaltinqi, vergi planlaması, mühasibat, audit və HR xidmətləri göstərən peşəkar şirkət.',
  foundingDate: '2019',
  areaServed: {
    '@type': 'Country',
    name: 'Azerbaijan',
    sameAs: 'https://www.wikidata.org/wiki/Q227',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nizami küçəsi 95',
    addressLocality: 'Bakı',
    addressCountry: 'AZ',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+994-12-555-00-11',
      contactType: 'customer service',
      availableLanguage: ['Azerbaijani', 'Russian', 'English'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+994-50-555-00-11',
      contactType: 'customer support',
    },
  ],
  email: 'info@profinance.az',
  sameAs: [],
  knowsAbout: [
    'Financial Consulting',
    'Tax Planning',
    'Accounting',
    'Audit Services',
    'HR Consulting',
    'Business Process Automation',
    'IFRS Reporting',
    'Management Consulting',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'ProFinance Solutions',
  description: 'Bakıda maliyyə konsaltinqi xidmətləri',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'az',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/logo-icon.png" as="image" type="image/png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
        />
        <meta name="geo.region" content="AZ-BA" />
        <meta name="geo.placename" content="Baku, Azerbaijan" />
        <meta name="geo.position" content="40.3777;49.843" />
        <meta name="ICBM" content="40.3777, 49.843" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body style={{ margin: 0, height: '100%' }}>
        {children}
        <WhatsAppButton />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
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
