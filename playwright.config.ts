import { defineConfig, devices } from '@playwright/test';

/**
 * Visual-regression baseline harness.
 *
 * Purpose: prove that infrastructure work (preloads, static rendering, route
 * dedup, the eventual responsive refactor) does NOT change rendered pixels.
 * Baselines are committed; CI/local runs diff against them.
 *
 * Runs against a PRODUCTION build, not `next dev` — dev ships an error overlay
 * and skips optimizations, so its pixels aren't the ones users get.
 */
export default defineConfig({
  testDir: './e2e',
  // Screenshot comparison is inherently serial-ish and animation-sensitive;
  // workers are capped so GSAP timers aren't starved by CPU contention.
  workers: 2,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'e2e/.report' }]],

  expect: {
    toHaveScreenshot: {
      // CSS animations (clients marquee, WhatsApp pulse) are reset to their
      // initial frame; finite ones are fast-forwarded. This is what makes the
      // infinite marquee comparable at all.
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      // Font antialiasing and AVIF decode differ by a hair between runs.
      // Tight enough to catch a 1px layout shift, loose enough not to flake.
      maxDiffPixelRatio: 0.008,
      threshold: 0.2,
    },
  },

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3100',
    // Deterministic text rendering across runs.
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
    // Pinned so baselines don't depend on the host browser's default. Routing no
    // longer reads Accept-Language (see routing.ts localeDetection), but leaving
    // this implicit is how the first baseline run silently captured EN content
    // for the unprefixed AZ routes.
    locale: 'en-US',
    timezoneId: 'Asia/Baku',
  },

  projects: [
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 } },
    },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],

  /**
   * Port 3100, never 3000, and never reused.
   *
   * `next dev` usually holds 3000 during development. With reuseExistingServer
   * on, Playwright silently attaches to it — baselines then capture dev-mode
   * output (unminified, HMR client attached) and shift under you as you edit.
   * A dedicated port with reuse off guarantees these pixels come from a real
   * production build.
   */
  // Setting BASE_URL points the suite at a server you're already running and
  // skips the managed one — used to diff a working tree against baselines
  // captured from the same server.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- --port 3100',
        url: 'http://localhost:3100',
        reuseExistingServer: false,
        timeout: 240_000,
        stdout: 'ignore',
        stderr: 'pipe',
      },
});
