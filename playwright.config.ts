import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { BASE_URL } from './support/config';

/**
 * Generates tests from the Gherkin features (features/*.feature)
 * + step definitions (steps/*.ts) and saves them in .features-gen/ (git-ignored).
 */
const testDir = defineBddConfig({
  features: ['features/*.feature'],
  steps: ['steps/*.ts', 'fixtures/Fixtures.ts'],
  outputDir: '.features-gen',
  language: 'en', // features written in English Gherkin
  missingSteps: 'fail-on-gen', // fails early if a step definition is missing
  arityCheck: false,           // disabled to allow regex-based steps (singular/plural)
  verbose: false,
});

export default defineConfig({
  testDir,
  // Deterministic BDD config: no runtime AI, exact-text healing when needed.
  timeout: 40_000,
  expect: { timeout: 12_000 },
  fullyParallel: false,
  // Low worker count avoids rate-limiting on the demo app (saucedemo resets
  // connections when it receives many simultaneous requests). Same lesson as
  // the single-session ITS+ run.
  workers: 1,
  retries: process.env.CI ? 2 : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: BASE_URL,
    headless: true,
    viewport: { width: 1440, height: 900 },
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
  ],
});