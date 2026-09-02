import { test, expect } from '@playwright/test';
import { open, useTheme, stillHidden } from './settle';



const PAGES = [
  { name: 'az', path: '/' },
 
 
  { name: 'ru', path: '/ru' },
  { name: 'about', path: '/about' },
] as const;

for (const { name, path } of PAGES) {
  test(`no section is left invisible after scrolling (${name})`, async ({ page }) => {
    await useTheme(page, 'light');
    await open(page, path);

    const hidden = await stillHidden(page);

    expect(
      hidden,
      `Content stayed hidden behind its reveal animation: ${JSON.stringify(hidden)}`,
    ).toEqual({});
  });
}
