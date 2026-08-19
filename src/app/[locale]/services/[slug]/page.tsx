import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '../../../../i18n/routing';
import {
  servicesData,
  getServiceByLocalizedSlug,
  localizedSlug,
  serviceSlugMap,
} from '../../../services/servicesData';
import { getServiceEnBySlug } from '../../../services/servicesData.en';
import { getServiceRuBySlug } from '../../../services/servicesData.ru';
import { ServicePage } from '../../../services/ServicePage';

import { SITE_URL } from '../../../lib/site';

// Lead-in for the JSON-LD Service.description's feature list (see serviceSchema
// below) — keeps that sentence readable instead of a bare comma dump.
const INCLUDES_LABEL: Record<Locale, string> = {
  az: 'Xidmətə daxildir',
  en: 'This service includes',
  ru: 'В услугу входит',
};

function getLocalizedServiceData(azSlug: string, locale: Locale) {
  if (locale === 'en') return getServiceEnBySlug(azSlug);
  if (locale === 'ru') return getServiceRuBySlug(azSlug);
  return servicesData.find(s => s.slug === azSlug);
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const service of servicesData) {
    params.push({ locale: 'az', slug: service.slug });
    params.push({ locale: 'en', slug: serviceSlugMap[service.slug]?.en ?? service.slug });
    params.push({ locale: 'ru', slug: serviceSlugMap[service.slug]?.ru ?? service.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const service = getServiceByLocalizedSlug(slug, locale);
  if (!service) return {};

  const localizedData = getLocalizedServiceData(service.slug, locale);
  const serviceName = localizedData?.name ?? service.name;

  const serviceSlug = localizedSlug(service.slug, locale);
  const serviceBasePath = locale === 'az' ? '/services' : `/${locale}/services`;
  const pageUrl = `${SITE_URL}${serviceBasePath}/${serviceSlug}`;

  return {
    title: t('serviceTitle', { serviceName }),
    description: localizedData?.heroDescription ?? service.heroDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        az: `${SITE_URL}/services/${service.slug}`,
        en: `${SITE_URL}/en/services/${serviceSlugMap[service.slug]?.en ?? service.slug}`,
        ru: `${SITE_URL}/ru/services/${serviceSlugMap[service.slug]?.ru ?? service.slug}`,
        'x-default': `${SITE_URL}/services/${service.slug}`,
      },
    },
    openGraph: {
      title: `${serviceName} | ProFinance Solutions`,
      description: localizedData?.heroDescription ?? service.heroDescription,
      url: pageUrl,
      type: 'website',
      siteName: 'ProFinance Solutions',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: serviceName }],
    },
  };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const service = getServiceByLocalizedSlug(slug, locale);
  if (!service) notFound();

  const localizedService = getLocalizedServiceData(service.slug, locale) ?? service;

  // Build localized allServices list for related cards
  const allLocalizedServices = servicesData.map(
    (s) => getLocalizedServiceData(s.slug, locale) ?? s
  );

  const serviceSlugLoc = localizedSlug(service.slug, locale);
  const serviceBasePath = locale === 'az' ? '/services' : `/${locale}/services`;
  const pageUrl = `${SITE_URL}${serviceBasePath}/${serviceSlugLoc}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: localizedService.name,
    // Overview + the T3 service components (feature titles) — the visible page
    // shows the components as cards, but search engines still get the full list,
    // phrased as a sentence rather than a semicolon-separated dump.
    description: `${localizedService.overview} ${INCLUDES_LABEL[locale]}: ${localizedService.features.map((f) => f.title).join(', ')}.`,
    url: pageUrl,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'City',    name: 'Baku',       sameAs: 'https://www.wikidata.org/wiki/Q9248' },
      { '@type': 'Country', name: 'Azerbaijan', sameAs: 'https://www.wikidata.org/wiki/Q227' },
    ],
    serviceType: localizedService.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: localizedService.targets.join(', '),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}${locale === 'az' ? '' : '/' + locale}/services` },
      { '@type': 'ListItem', position: 3, name: localizedService.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePage
        service={localizedService}
        allServices={allLocalizedServices}
        locale={locale}
      />
    </>
  );
}
