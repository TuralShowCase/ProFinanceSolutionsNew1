import { type Page, type Locator } from '@playwright/test';



const STEP_MS = 200;


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


async function sweep(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = await page.evaluate(() => window.innerHeight);

  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' as ScrollBehavior }), y);
    await page.waitForTimeout(STEP_MS);
  }


  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' as ScrollBehavior }));
  await waitForAnimationsIdle(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  await page.waitForTimeout(400);
}


export async function useTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((t) => {
    localStorage.setItem('pfs-theme', t);
  }, theme);
  await page.emulateMedia({ colorScheme: theme });
}


async function loadAllImages(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';

      if (!img.complete && img.src) img.src = img.src;
    });
  });


  await page
    .waitForFunction(
      () => Array.from(document.images).every((img) => img.complete),
      undefined,
      { timeout: 30_000 },
    )
    .catch(() => {

    });

  await page
    .evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      );
    })
    .catch(() => {});



  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.waitForTimeout(300);
}


const ALWAYS_TRANSPARENT = [

  'val-ghost',

  'drawer-item',

  'hero-photo', 'hero-anim', 'hero-reveal',

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


export function heroMask(page: Page): Locator[] {
  return [page.locator('#hero')];
}


export async function openHeroOnly(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2600);
}
