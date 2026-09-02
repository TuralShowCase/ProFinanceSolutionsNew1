import { test, expect } from '@playwright/test';
import { open, openHeroOnly, useTheme, heroMask } from './settle';



const AZ_SERVICE = '/services/ucotun-diaqnostikasi-ve-berpasi';

const CORE = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'service', path: AZ_SERVICE },
] as const;

for (const theme of ['light', 'dark'] as const) {
  for (const route of CORE) {
    test(`${route.name}-${theme}`, async ({ page }) => {
      await useTheme(page, theme);
      await open(page, route.path);

      await expect(page).toHaveScreenshot(`${route.name}-${theme}.png`, {
        fullPage: true,
        mask: heroMask(page),
      });
    });
  }

  test(`hero-${theme}`, async ({ page }) => {
    await useTheme(page, theme);
    await openHeroOnly(page, '/');


    await expect(page.locator('#hero')).toHaveScreenshot(`hero-${theme}.png`);
  });
}


const LOCALES = [
  { name: 'en-home', path: '/en' },
  { name: 'en-about', path: '/en/about' },
  { name: 'en-service', path: '/en/services/accounting-diagnostics' },
  { name: 'ru-home', path: '/ru' },
  { name: 'ru-about', path: '/ru/o-nas' },
  { name: 'ru-service', path: '/ru/services/diagnostika-ucheta' },
] as const;

for (const route of LOCALES) {
  test(`${route.name}`, async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop', 'locale routes: desktop only');

    await useTheme(page, 'light');
    await open(page, route.path);

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      mask: heroMask(page),
    });
  });
}

test('not-found', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', '404: desktop only');

  await useTheme(page, 'light');
  await page.goto('/definitely-not-a-real-page', { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  await expect(page).toHaveScreenshot('not-found.png', { fullPage: true });
});
