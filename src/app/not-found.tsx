import { getLocale, getTranslations } from 'next-intl/server';
import { NotFoundView } from './components/NotFoundView';

/**
 * Global 404 — the boundary for anything that never resolved into a locale
 * segment. Locale-prefixed misses are handled by `app/[locale]/not-found.tsx`.
 *
 * Copy is translated rather than hardcoded: requests still pass through the
 * i18n middleware, so `getLocale()` returns something sensible here, and this
 * page previously showed Azerbaijani to everyone regardless of language.
 */
export default async function NotFound() {
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
