import { type Page, type Locator } from '@playwright/test';

/**
 * Getting this site into a screenshot-stable state is non-trivial, because most
 * sections ship with inline `opacity: 0` and are revealed by GSAP ScrollTrigger.
 * A naive `goto` + screenshot captures a mostly-blank page.
 *
 * So: drive the page all the way down (firing every `once: true` trigger),
 * wait for the reveals to finish, then come back to the top. Triggers stay
 * revealed once fired, so the top-of-page state is fully settled.
 */

const STEP_MS = 260;

/** Number of elements still mid-reveal (0 < opacity < 0.99). */
async function inFlight(page: Page): Promise<number> {
  return page.evaluate(() => {
    let n = 0;
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const o = parseFloat(getComputedStyle(el).opacity);
      if (o > 0.001 && o < 0.99) n += 1;
    }
    return n;
  });
}

/** Waits until nothing is mid-animation for two consecutive samples. */
async function waitForAnimationsIdle(page: Page, tries = 24) {
  let quiet = 0;
  for (let i = 0; i < tries; i += 1) {
    if ((await inFlight(page)) === 0) {
      quiet += 1;
      if (quiet >= 2) return;
    } else {
      quiet = 0;
    }
    await page.waitForTimeout(STEP_MS);
  }
}

/**
 * Scrolls the full document in viewport-sized steps so every ScrollTrigger
 * fires, then returns to the top.
 *
 * Lenis drives scrolling itself, but it observes real scroll position rather
 * than blocking programmatic jumps — so setting scrollTop and pausing for it to
 * reconcile is both reliable and much faster than synthesizing wheel events
 * down a 10,000px page.
 */
async function sweep(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = await page.evaluate(() => window.innerHeight);

  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' as ScrollBehavior }), y);
    await page.waitForTimeout(STEP_MS);
  }

  // Bottom, then back to top.
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }));
  await waitForAnimationsIdle(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  await page.waitForTimeout(400);
}

/** Sets the theme before any script runs, so the no-flash inline script picks it up. */
export async function useTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((t) => {
    localStorage.setItem('pfs-theme', t);
  }, theme);
  await page.emulateMedia({ colorScheme: theme });
}

/** Navigate + fully settle a page for full-page capture. */
export async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await sweep(page);
  await waitForAnimationsIdle(page);
}

/**
 * The hero carousel auto-advances every 8s with no way to pause it (audit #18),
 * so it can never be part of a slow full-page capture — by the time the sweep
 * finishes it's on an arbitrary slide. Full-page shots mask it; this returns the
 * locator for that mask.
 */
export function heroMask(page: Page): Locator[] {
  return [page.locator('#hero')];
}

/**
 * Captures the hero on its own, early enough to be deterministic: entrance
 * animations finish around 1.5s, the first slide flip lands at 8s. 2.6s sits
 * safely between the two.
 */
export async function openHeroOnly(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2600);
}
