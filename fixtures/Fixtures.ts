import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

/**
 * Fixtures estendidas: injeta os Page Objects no test, tornando os steps
 * concisos e reutilizáveis. É o ponto único de importação dos steps BDD.
 */
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export const { Given, When, Then } = createBdd(test);
export { expect };