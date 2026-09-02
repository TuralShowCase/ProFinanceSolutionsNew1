import { getLocale, getTranslations } from 'next-intl/server';
import { NotFoundView } from '../components/NotFoundView';


export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations('notFound');

  return (
    <NotFoundView
      message={t('message')}
      backHome={t('backHome')}
      homeHref={locale === 'az' ? '/' : `/${locale}`}
    />
  );
}
