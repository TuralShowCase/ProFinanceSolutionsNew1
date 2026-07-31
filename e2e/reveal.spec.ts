import { test, expect } from '@playwright/test';
import { open, useTheme, stillHidden } from './settle';

/**
 * Guards the site's biggest structural fragility.
 *
 * Roughly 60 elements across the site ship with an inline `opacity: 0` and are
 * made visible only by a GSAP ScrollTrigger. If a trigger doesn't fire, that
 * content is invisible — not degraded, gone. It has happened in practice: lazy
 * images arriving late change the page height, ScrollTrigger's cached start
 * positions go stale, and whole bands stay blank.
 *
 * `open()` already retries the sweep and throws if anything is still hidden, so
 * in practice this spec fails at that point with the offending selectors named.
 * It stays as an explicit assertion because that keeps the guarantee visible in
 * the test report rather than buried in a helper.
 *
 * Selector list lives in settle.ts so the helper and this spec can't drift.
 */

const PAGES = [
  { name: 'az', path: '/' },
  // RU earns its own case: longest page on the site, and the one that actually
  // got captured blank and written in as a baseline.
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
