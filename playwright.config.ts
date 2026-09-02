import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './e2e',
  
  workers: 1,

  
  timeout: 120_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'e2e/.report' }]],

  expect: {
    toHaveScreenshot: {
     
     
     
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      
      maxDiffPixelRatio: 0.002,
      threshold: 0.2,
    },
  },

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3100',
   
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
   
   
   
   
    locale: 'en-US',
    timezoneId: 'Asia/Baku',

    
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
