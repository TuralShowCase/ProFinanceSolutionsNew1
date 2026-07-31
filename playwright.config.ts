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
  /**
   * One worker. These pages drive GSAP timers and decode a lot of AVIF, and the
   * captures are 9,000–11,000px tall; contention made settling unreliable.
   *
   * A baseline harness that sometimes writes a half-rendered reference is worse
   * than no harness — that happened here once — so this trades wall-clock time
   * for determinism. (The blank-band failures had a separate cause; see the
   * occlusion flags under `use.launchOptions`.)
   */
  workers: 1,

  /**
   * Well above Playwright's 30s default, on purpose.
   *
   * Settling a page here is not instant: every image is forced to load, then the
   * document is swept top-to-bottom to fire each ScrollTrigger, then we wait for
   * the reveals to finish. The homepage is over 10,000px tall on mobile, so that
   * legitimately runs into the tens of seconds. At 30s the longest pages were
   * timing out mid-sweep — which is far worse than slow, because a partial
   * capture can get written in as a baseline.
   */
  timeout: 120_000,
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
      /**
       * Tolerance covers font antialiasing and AVIF decode jitter between runs
       * — not real changes.
       *
       * This was 0.008 (0.8%), which turned out to be too slack: adding a 26px
       * control to the hero was only ~0.05% of a 1440x900 viewport, so the
       * desktop tests passed while their baselines no longer matched the UI.
       * 0.002 still absorbs antialiasing but won't wave through a new element.
       */
      maxDiffPixelRatio: 0.002,
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

    /**
     * `CalculateNativeWinOcclusion` is the culprit behind blank bands in
     * full-page captures on Windows.
     *
     * Chromium tracks whether its window is covered by another and stops
     * painting when it thinks so. Later in a run — once other windows have been
     * up — a page can be marked occluded while still being screenshotted, so the
     * capture comes back with whole sections unpainted: correct page height,
     * about half the file size, content present in the DOM at opacity 1.
     *
     * That matched the symptom exactly: ru-home passed every time it ran alone
     * and failed every time it ran after ~10 other captures.
     * `--disable-dev-shm-usage` is the usual companion for large captures.
     */
    launchOptions: {
      args: [
        '--disable-features=CalculateNativeWinOcclusion',
        '--disable-dev-shm-usage',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
      ],
    },
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
