import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['az', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'az',
  localePrefix: 'as-needed',
  /**
   * Accept-Language auto-redirect is OFF, deliberately.
   *
   * With it on, a request for an unprefixed (AZ) URL from a browser set to any
   * other language got a 307 that prepended the locale WITHOUT translating the
   * path segment. `/about` survived because its per-locale paths are declared
   * below — but service slugs are localized in app code (`serviceSlugMap`),
   * which next-intl can't see. So `/services/<az-slug>` was redirected to
   * `/en/services/<az-slug>`, which does not exist, and every one of the 8
   * canonical AZ service pages returned 404 to anyone whose browser wasn't
   * Azerbaijani — including Googlebot, which crawls as en-US.
   *
   * Keeping this off is also the SEO-correct default: canonical URLs must
   * resolve for every client. Language targeting is handled by the per-page
   * hreflang alternates plus the header's language switcher.
   */
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': {
      az: '/about',
      en: '/about',
      ru: '/o-nas',
    },
    '/services/[slug]': {
      az: '/services/[slug]',
      en: '/services/[slug]',
      ru: '/services/[slug]',
    },
  },
});

// Locale-aware Link and redirect helpers (used by pages, not the switcher).
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
