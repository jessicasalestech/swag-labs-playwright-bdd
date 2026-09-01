import { Given, When, Then, expect } from '../fixtures/Fixtures';
import { LOCKED_USER, STANDARD_USER, PASSWORD } from '../support/config';

// ---------------------------------------------------------------------------
// Login steps (features/login.feature)
// ---------------------------------------------------------------------------

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('I fill in the valid credentials', async ({ loginPage }) => {
  await loginPage.login(STANDARD_USER, PASSWORD);
});

Then('I am redirected to the products page', async ({ inventoryPage }) => {
  await inventoryPage.expectVisible();
});

When('I fill in the blocked user', async ({ loginPage }) => {
  await loginPage.login(LOCKED_USER, PASSWORD);
});

Then('I see the locked out error message', async ({ loginPage }) => {
  const message = await loginPage.getErrorMessage();
  expect(message).toContain('locked out');
});

When('I fill in an invalid user', async ({ loginPage }) => {
  await loginPage.login('usuario_invalido', PASSWORD);
});

Then('I see the invalid credentials error message', async ({ loginPage }) => {
  const message = await loginPage.getErrorMessage();
  expect(message).toContain('do not match');
});