// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { loadEnv } = require('./config/load-env');

loadEnv();

const baseURL = process.env.PMS_BASE_URL || 'https://pms.ethnomet.com/admin/';
const isHeaded = process.env.HEADED === '1';
const slowMo = Number(process.env.PMS_SLOW_MO || (isHeaded ? 800 : 0));

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ['list'],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    headless: !isHeaded,
    launchOptions: {
      slowMo,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  outputDir: 'test-results',
});
