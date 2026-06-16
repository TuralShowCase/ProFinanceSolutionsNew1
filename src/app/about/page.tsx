import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutApp from './AboutApp';

const SITE_URL = 'https://profinancesolutions.az';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'az', namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: `${SITE_URL}/about`,
      languages: { az: `${SITE_URL}/about`, en: `${SITE_URL}/en/about`, ru: `${SITE_URL}/ru/o-nas`, 'x-default': `${SITE_URL}/about` },
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      url: `${SITE_URL}/about`,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ProFinance Solutions' }],
    },
  };
}

export default function AboutPage() {
  return <AboutApp />;
}
