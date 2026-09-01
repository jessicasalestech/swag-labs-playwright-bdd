import { Given, When, Then, expect } from '../fixtures/Fixtures';
import { STANDARD_USER, PASSWORD } from '../support/config';

// ---------------------------------------------------------------------------
// Catalog steps (features/inventory.feature)
// ---------------------------------------------------------------------------

Given('I am logged into the application', async ({ loginPage }) => {
  await loginPage.login(STANDARD_USER, PASSWORD);
});

When('I add the product {string} to the cart', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addToCart(productName);
});

Then('the cart count is {int}', async ({ inventoryPage }, count: number) => {
  expect(await inventoryPage.getCartCount()).toBe(count);
});

When('I sort the products by {string}', async ({ inventoryPage }, sortLabel: string) => {
  await inventoryPage.sortBy(sortLabel);
});

Then('the first product is {string}', async ({ inventoryPage }, name: string) => {
  const names = await inventoryPage.getProductNames();
  expect(names[0]).toBe(name);
});