import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { servicesData, getServiceBySlug, serviceSlugMap } from '../servicesData';
import { ServicePage } from '../ServicePage';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profinancesolutions.az';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale: 'az', namespace: 'meta' });
  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  return {
    title: t('serviceTitle', { serviceName: service.name }),
    description: service.heroDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        az: pageUrl,
        en: `${SITE_URL}/en/services/${serviceSlugMap[service.slug]?.en ?? service.slug}`,
        ru: `${SITE_URL}/ru/services/${serviceSlugMap[service.slug]?.ru ?? service.slug}`,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      title: `${service.name} | ProFinance Solutions`,
      description: service.heroDescription,
      url: pageUrl,
      type: 'website',
      siteName: 'ProFinance Solutions',
      locale: 'az_AZ',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: service.name }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <ServicePage
      service={service}
      allServices={servicesData}
      locale="az"
    />
  );
}
