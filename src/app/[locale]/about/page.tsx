import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '../../../i18n/routing';
import AboutApp from '../../about/AboutApp';

import { SITE_URL } from '../../lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const aboutPath = locale === 'az' ? '/about' : locale === 'ru' ? '/ru/o-nas' : '/en/about';
  const canonical = `${SITE_URL}${aboutPath}`;
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical,
      languages: { az: `${SITE_URL}/about`, en: `${SITE_URL}/en/about`, ru: `${SITE_URL}/ru/o-nas`, 'x-default': `${SITE_URL}/about` },
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      url: canonical,
      type: 'website',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ProFinance Solutions' }],
    },
  };
}

export default function AboutPage() {
  return <AboutApp />;
}
