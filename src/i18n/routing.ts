import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['az', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'az',
  localePrefix: 'as-needed',
  
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

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
