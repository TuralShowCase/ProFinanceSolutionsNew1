import type { MetadataRoute } from 'next';
import { servicesData, serviceSlugMap } from './services/servicesData';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profinancesolutions.az';

const DATES = {
  home:     '2026-05-31',
  about:    '2026-05-31',
  services: '2026-05-31',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // AZ (default — no prefix)
    { url: BASE,              lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 1.0, images: [`${BASE}/ProFinanceGirl.avif`, `${BASE}/Slide2Human.avif`, `${BASE}/handshake.avif`] },
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
