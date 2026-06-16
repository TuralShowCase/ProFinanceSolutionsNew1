import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import App from './App';

const SITE_URL = 'https://profinancesolutions.az';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'az', namespace: 'meta' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: SITE_URL,
      languages: { az: SITE_URL, en: `${SITE_URL}/en`, ru: `${SITE_URL}/ru`, 'x-default': SITE_URL },
    },
    openGraph: { title: t('homeTitle'), description: t('homeDescription'), url: SITE_URL, type: 'website' },
  };
}

export default function Home() {
  return <App />;
}
