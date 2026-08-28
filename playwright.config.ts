import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { BASE_URL } from './support/config';

/**
 * Gera os testes a partir das features Gherkin (features/*.feature)
 * + step definitions (steps/*.ts) e salva em .features-gen/ (ignorado no git).
 */
const testDir = defineBddConfig({
  features: ['features/*.feature'],
  steps: ['steps/*.ts', 'fixtures/Fixtures.ts'],
  outputDir: '.features-gen',
  language: 'pt', // features escritas em Gherkin pt-BR
  missingSteps: 'fail-on-gen', // trava cedo se faltar step definition
  arityCheck: false,           // desligado p/ permitir steps por regex (singular/plural)
  verbose: false,
});

export default defineConfig({
  testDir,
  // Config BDD determinística: sem IA em runtime, healing por texto exato quando necessário.
  timeout: 40_000,
  expect: { timeout: 12_000 },
  fullyParallel: false,
  // workers baixo evita rate-limit do app demo (saucedemo reseta conexões quando
  // recebe muitos requests simultâneos). Mesma lição de sessão única do ITS+.
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