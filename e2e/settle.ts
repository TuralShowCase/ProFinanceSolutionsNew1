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

const STEP_MS = 200;

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

/**
 * Forces every lazy image to load and waits for all of them to decode.
 *
 * This has to happen BEFORE the sweep, not during it. Sections are revealed by
 * ScrollTrigger, which caches each trigger's start/end position. Lazy images
 * that arrive mid-sweep change the page height underneath those cached values,
 * and triggers whose positions have moved may then never fire — leaving content
 * stuck at its inline `opacity: 0`. That produced intermittently blank bands on
 * the longest page (ru-home).
 *
 * Worth noting this is a real fragility, not only a test artifact: the same
 * stale-position failure can strand a real visitor on a slow connection with an
 * invisible section.
 */
async function loadAllImages(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
      // Nudge the fetch for images the browser has already skipped.
      if (!img.complete && img.src) img.src = img.src;
    });
  });

  /**
   * Two waits, in this order — they are not interchangeable.
   *
   * 1. `complete`: the bytes have arrived. Note it is also true for images that
   *    failed, so it is a floor, not a guarantee.
   * 2. `decode()`: the frame is actually ready to paint.
   *
   * Doing only (2) is a trap: `decode()` can settle immediately for an image
   * that hasn't started fetching, and swallowing its rejection then lets the
   * run continue with nothing loaded. That produced a deterministic
   * half-rendered capture — right page height, half the file size.
   */
  await page
    .waitForFunction(
      () => Array.from(document.images).every((img) => img.complete),
      undefined,
      { timeout: 30_000 },
    )
    .catch(() => {
      /* A stubborn image shouldn't fail the run; the diff will show it. */
    });

  await page
    .evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
    })
    .catch(() => {});

  // Layout is final now — let ScrollTrigger recompute against it. It listens for
  // resize, which is the supported way to do this without a handle on the instance.
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.waitForTimeout(300);
}

/**
 * Every class that starts at `opacity: 0` and depends on a GSAP ScrollTrigger
 * to become visible.
 *
 * This list is derived from the source (elements declaring `opacity: 0`, plus
 * every class named in a `gsap.fromTo/from/set` call) — not written by hand.
 * Hand-listing is what let the original miss `.svc-cell`: the guard was
 * checking `.svc-card`, which is a child that sits at opacity 1, while the
 * actual hidden wrapper went unchecked. A whole blank Services section then
 * passed the guard and was captured.
 *
 * Regenerate with scratchpad/revealscan.mjs if components are added.
 */
const ALWAYS_TRANSPARENT = [
  // Ghost numerals sit at opacity 0.055 by design.
  'val-ghost',
  // Mobile drawer items — only visible while the menu is open.
  'drawer-item',
  // The hero is masked in captures, and its inactive slide is meant to be at 0.
  'hero-photo', 'hero-anim', 'hero-reveal',
  /**
   * WhyUs is a scroll-scrubbed console: exactly one pane is visible at a time
   * and the other four are transparent on purpose. Their opacity is tied to
   * scroll progress, not to a one-shot reveal, so they are never all visible
   * and must not be treated as a failed animation.
   */
  'why-pane',
];

export const REVEAL_SELECTOR = [
  'acta-card', 'acta-figure', 'clients-anim', 'clients-foot', 'clients-marquee',
  'feat-card', 'ftr-bottom', 'ftr-brand', 'ftr-col', 'ftr-partner',
  'ind-card', 'ind-hdr', 'ind-panel', 'ind-row', 'intro-anim',
  'msn-anim', 'msn-card', 'partner-card', 'partner-feat', 'partner-hdr',
  'partner-photo', 'proc-header', 'proc-step', 'svc-cell', 'svc-crumb',
  'svc-cta-anim', 'svc-heading-anim', 'target-pill',
  'svc-cta', 'targets-row', 'team-anim', 'team-trait', 'val-hdr',
  'whatget-anim', 'why-in', 'why-pane', 'word-inner', 'wwa-anim', 'wwa-cta',
  'wwa-head', 'wwa-mission', 'cta-item',
]
  .filter((c) => !ALWAYS_TRANSPARENT.includes(c))
  .map((c) => '.' + c)
  .join(',');

/** Reveal-animated elements still sitting invisible. */
export async function stillHidden(page: Page): Promise<Record<string, number>> {
  return page.evaluate((sel) => {
    const out: Record<string, number> = {};
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(sel))) {
      if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
        const key = el.className.split(' ').filter(Boolean)[0] ?? '?';
        out[key] = (out[key] ?? 0) + 1;
      }
    }
    return out;
  }, REVEAL_SELECTOR);
}

/**
 * Navigate and settle a page for capture.
 *
 * The sweep is retried rather than assumed to work. Under parallel workers the
 * browsers compete for CPU, GSAP's rAF loop runs late, and a trigger near the
 * end of a long page can be left unfired — which bakes a blank band into a
 * screenshot, or worse, into a baseline. Checking the reveal state and sweeping
 * again makes that self-correcting instead of a timing gamble.
 */
export async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await loadAllImages(page);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await sweep(page);
    await waitForAnimationsIdle(page);

    const hidden = await stillHidden(page);
    if (Object.keys(hidden).length === 0) return;

    if (attempt === 2) {
      throw new Error(
        `Sections never revealed after 3 sweeps: ${JSON.stringify(hidden)}. ` +
          'Capturing now would bake a blank band into the screenshot.',
      );
    }
    await page.waitForTimeout(500);
  }
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
