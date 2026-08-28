import { Given, When, Then, expect } from '../fixtures/Fixtures';
import { STANDARD_USER, PASSWORD } from '../support/config';

// ---------------------------------------------------------------------------
// Steps de Catálogo (features/inventory.feature)
// ---------------------------------------------------------------------------

Given('que estou logado na aplicação', async ({ loginPage }) => {
  await loginPage.login(STANDARD_USER, PASSWORD);
});

When('adiciono o produto {string} ao carrinho', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addToCart(productName);
});

Then('a contagem do carrinho é {int}', async ({ inventoryPage }, count: number) => {
  expect(await inventoryPage.getCartCount()).toBe(count);
});

When('ordeno os produtos por {string}', async ({ inventoryPage }, sortLabel: string) => {
  await inventoryPage.sortBy(sortLabel);
});

Then('o primeiro produto é {string}', async ({ inventoryPage }, name: string) => {
  const names = await inventoryPage.getProductNames();
  expect(names[0]).toBe(name);
});