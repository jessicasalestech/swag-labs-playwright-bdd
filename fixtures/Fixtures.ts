import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

/**
 * Extended fixtures: inject the Page Objects into the test, keeping steps
 * concise and reusable. It is the single import point for the BDD steps.
 */
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  autoScreenshot: void;
}>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  // Evidence: takes a screenshot at the end of EACH scenario (success or failure),
  // saved in test-results/<scenario>/evidence.png
  autoScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();
      const shot = testInfo.outputPath('evidencia.png');
      await page.screenshot({ path: shot, fullPage: true }).catch(() => {});
    },
    { auto: true },
  ],
});

export const { Given, When, Then } = createBdd(test);
export { expect };