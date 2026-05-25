import type { Metadata } from 'next';
import App from './App';

const SITE_URL = 'https://profinancesolutions.az';

export const metadata: Metadata = {
  title: 'ProFinance Solutions — Bakıda Maliyyə Konsaltinqi',
  description:
    'ProFinance Solutions Azərbaycanın aparıcı korporasiyaları üçün maliyyə konsaltinqi, vergi planlaması, mühasibat uçotu, audit və HR xidmətləri göstərən Bakı şirkətidir. 2019-dan 50+ müştəri.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'ProFinance Solutions — Bakıda Maliyyə Konsaltinqi',
    description:
      'Bakıda maliyyə konsaltinqi, vergi planlaması, mühasibat, audit. 2019-dan 50+ korporasiyaya etibarlı maliyyə tərəfdaşı.',
    url: SITE_URL,
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'ProFinance Solutions',
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/logo-icon.png`,
  url: SITE_URL,
  telephone: '+994125550011',
  email: 'info@profinance.az',
  description:
    'Azərbaycanın aparıcı korporasiyaları üçün maliyyə konsaltinqi, vergi planlaması, mühasibat uçotu, audit və HR xidmətləri.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nizami küçəsi 95',
    addressLocality: 'Bakı',
    addressRegion: 'Bakı',
    addressCountry: 'AZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.3777,
    longitude: 49.843,
  },
  hasMap: 'https://maps.google.com/?q=Nizami+street+95+Baku+Azerbaijan',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'AZN',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Baku',
    sameAs: 'https://www.wikidata.org/wiki/Q9248',
  },
  foundingDate: '2019',
  knowsLanguage: ['az', 'ru', 'en'],
  sameAs: { '@id': `${SITE_URL}/#organization` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Maliyyə Konsaltinqi Xidmətləri',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Uçotun Diaqnostikası və Bərpası',   url: `${SITE_URL}/services/ucotun-diaqnostikasi-ve-berpasi` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mühasibat Konsaltinqi',              url: `${SITE_URL}/services/muhasibat-konsaltinqi` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vergi Konsaltinqi',                  url: `${SITE_URL}/services/vergi-konsaltinqi` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maliyyə və İdarəetmə Konsaltinqi',   url: `${SITE_URL}/services/maliyye-ve-idareetme-konsaltinqi` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Əməliyyat və Rəqəmsal Konsaltinq',  url: `${SITE_URL}/services/emeliyyat-ve-reqemsal-konsaltinq` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HR və Kadrlar üzrə Konsaltinq',     url: `${SITE_URL}/services/hr-ve-kadrlar-konsaltinqi` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Təlim və İnkişaf',                  url: `${SITE_URL}/services/telim-ve-inkisaf` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auditor Xidmətləri',                url: `${SITE_URL}/services/auditor-xidmetleri` } },
    ],
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#services-list`,
  name: 'ProFinance Solutions Xidmətləri',
  description: 'Bakıda maliyyə konsaltinqi, vergi, mühasibat, audit və HR xidmətləri',
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Uçotun Diaqnostikası və Bərpası',  url: `${SITE_URL}/services/ucotun-diaqnostikasi-ve-berpasi` },
    { '@type': 'ListItem', position: 2, name: 'Mühasibat Konsaltinqi',             url: `${SITE_URL}/services/muhasibat-konsaltinqi` },
    { '@type': 'ListItem', position: 3, name: 'Vergi Konsaltinqi',                 url: `${SITE_URL}/services/vergi-konsaltinqi` },
    { '@type': 'ListItem', position: 4, name: 'Maliyyə və İdarəetmə Konsaltinqi',  url: `${SITE_URL}/services/maliyye-ve-idareetme-konsaltinqi` },
    { '@type': 'ListItem', position: 5, name: 'Əməliyyat və Rəqəmsal Konsaltinq', url: `${SITE_URL}/services/emeliyyat-ve-reqemsal-konsaltinq` },
    { '@type': 'ListItem', position: 6, name: 'HR və Kadrlar üzrə Konsaltinq',    url: `${SITE_URL}/services/hr-ve-kadrlar-konsaltinqi` },
    { '@type': 'ListItem', position: 7, name: 'Təlim və İnkişaf',                 url: `${SITE_URL}/services/telim-ve-inkisaf` },
    { '@type': 'ListItem', position: 8, name: 'Auditor Xidmətləri',               url: `${SITE_URL}/services/auditor-xidmetleri` },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <App />
    </>
  );
}
