import type { MetadataRoute } from 'next';
import { servicesData } from './services/servicesData';

const BASE = 'https://profinancesolutions.az';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${BASE}/services/${service.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}
