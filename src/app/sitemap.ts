import type { MetadataRoute } from 'next';
import { servicesData, serviceSlugMap } from './services/servicesData';

import { SITE_URL as BASE } from './lib/site';


const BUILT_AT = new Date();

const DATES = {
  home:     BUILT_AT,
  about:    BUILT_AT,
  services: BUILT_AT,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [

    { url: BASE,              lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 1.0, images: [`${BASE}/HeroSlide1.avif`, `${BASE}/HeroSlide2.avif`] },
    { url: `${BASE}/about`,   lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.8, images: [`${BASE}/AboutPageTeamLandscape.avif`, `${BASE}/AboutPageTeamPortrait.avif`] },

    { url: `${BASE}/en`,        lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/en/about`,  lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.75 },

    { url: `${BASE}/ru`,        lastModified: DATES.home,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/ru/o-nas`,  lastModified: DATES.about, changeFrequency: 'monthly', priority: 0.75 },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.flatMap((service) => [

    { url: `${BASE}/services/${service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.9 },

    { url: `${BASE}/en/services/${serviceSlugMap[service.slug]?.en ?? service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.85 },

    { url: `${BASE}/ru/services/${serviceSlugMap[service.slug]?.ru ?? service.slug}`, lastModified: DATES.services, changeFrequency: 'monthly' as const, priority: 0.85 },
  ]);

  return [...staticPages, ...servicePages];
}
