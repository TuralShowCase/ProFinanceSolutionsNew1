import type { MetadataRoute } from 'next';
import { servicesData, serviceSlugMap } from './services/servicesData';

import { SITE_URL as BASE } from './lib/site';

/**
 * `lastModified` is derived from the build, not hand-written.
 *
 * The previous hardcoded '2026-05-31' kept advertising a date months in the
 * past on every page, which is worse than omitting the field: crawlers use it
 * to prioritise recrawls, and a stale-but-confident date tells them not to
 * bother. Tying it to build time means it's accurate whenever content ships.
 *
 * If per-page accuracy matters later, source these from the CMS/content
 * timestamps rather than reintroducing constants.
 */
const BUILT_AT = new Date();

const DATES = {
  home:     BUILT_AT,
  about:    BUILT_AT,
  services: BUILT_AT,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // AZ (default — no prefix)
    { url: BASE,              lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 1.0, images: [`${BASE}/HeroSlide1.avif`, `${BASE}/HeroSlide2.avif`] },
    { url: `${BASE}/about`,   lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.8, images: [`${BASE}/AboutPageTeamLandscape.avif`, `${BASE}/AboutPageTeamPortrait.avif`] },
    // EN
    { url: `${BASE}/en`,        lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/en/about`,  lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.75 },
    // RU
    { url: `${BASE}/ru`,        lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/ru/o-nas`,  lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.75 },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.flatMap((service) => [
    // AZ
    { url: `${BASE}/services/${service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.9 },
    // EN
    { url: `${BASE}/en/services/${serviceSlugMap[service.slug]?.en ?? service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.85 },
    // RU
    { url: `${BASE}/ru/services/${serviceSlugMap[service.slug]?.ru ?? service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.85 },
  ]);

  return [...staticPages, ...servicePages];
}
