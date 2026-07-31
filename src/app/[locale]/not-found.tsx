import { getLocale, getTranslations } from 'next-intl/server';
import { NotFoundView } from '../components/NotFoundView';

/**
 * 404 for a page missing inside a known locale (/en/nope, /ru/nope).
 *
 * Without this boundary Next fell back to the root not-found, which had the
 * Azerbaijani copy hardcoded — so an English or Russian visitor hitting a bad
 * URL got an Azerbaijani error page.
 */
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
