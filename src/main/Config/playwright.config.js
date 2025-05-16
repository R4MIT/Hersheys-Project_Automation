// @ts-check
import { defineConfig, devices } from '@playwright/test';

// Uncommented dotenv import and configuration
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Enabled parallel execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Added retry logic for local and CI
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright'], // Added Allure reporting
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000', // Using environment variable for base URL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Added screenshot capture for failed tests
    video: 'retain-on-failure', // Added video recording for failed tests
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: process.env.BASE_URL || 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
});

