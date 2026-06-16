import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '../../i18n/routing';
import App from '../App';

const SITE_URL = 'https://profinancesolutions.az';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = locale === 'az' ? SITE_URL : `${SITE_URL}/${locale}`;
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: base,
      languages: { az: SITE_URL, en: `${SITE_URL}/en`, ru: `${SITE_URL}/ru`, 'x-default': SITE_URL },
    },
    openGraph: { title: t('homeTitle'), description: t('homeDescription'), url: base, type: 'website' },
  };
}

export default function HomePage() {
  // App renders all home sections. Components read locale from next-intl context
  // (provided by the root layout which detected the locale via middleware).
  return <App />;
}
