import type { Metadata } from 'next';
import AboutApp from './AboutApp';

const SITE_URL = 'https://profinancesolutions.az';

export const metadata: Metadata = {
  title: 'Haqqımızda — Bakı Maliyyə Şirkəti',
  description:
    'ProFinance Solutions 2019-cu ildən Azərbaycanda fəaliyyət göstərən maliyyə konsaltinq şirketidir. 50+ müştəri, 8 xidmət sahəsi, Nizami küçəsi 95, Bakı.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'Haqqımızda | ProFinance Solutions',
    description:
      '2019-dan Bakıda maliyyə konsaltinqi. 50+ korporasiya müştərisi, 8 xidmət sahəsi.',
    url: `${SITE_URL}/about`,
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ProFinance Solutions komandası — Bakı, Azərbaycan',
      },
    ],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Əsas səhifə', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Haqqımızda',  item: `${SITE_URL}/about` },
  ],
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'Haqqımızda | ProFinance Solutions',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.about-mission-text', '.about-tagline'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <AboutApp />
    </>
  );
}
