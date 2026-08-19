import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProFinance Solutions',
    short_name: 'ProFinance',
    description:
      'Bakıda maliyyə konsaltinqi, vergi planlaması, mühasibat, audit və HR xidmətləri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1A3D2B',
    orientation: 'portrait',
    categories: ['finance', 'business'],
    lang: 'az',
    icons: [
      {
        src: '/logo-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
