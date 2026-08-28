import { Given, When, Then, expect } from '../fixtures/Fixtures';
import { LOCKED_USER, STANDARD_USER, PASSWORD } from '../support/config';

// ---------------------------------------------------------------------------
// Steps de Login (features/login.feature)
// ---------------------------------------------------------------------------

Given('que estou na página de login', async ({ loginPage }) => {
  await loginPage.open();
});

When('informo as credenciais válidas', async ({ loginPage }) => {
  await loginPage.login(STANDARD_USER, PASSWORD);
});

Then('sou direcionado para a página de produtos', async ({ inventoryPage }) => {
  await inventoryPage.expectVisible();
});

When('informo o usuário bloqueado', async ({ loginPage }) => {
  await loginPage.login(LOCKED_USER, PASSWORD);
});

Then('vejo a mensagem de erro de bloqueio', async ({ loginPage }) => {
  const message = await loginPage.getErrorMessage();
  expect(message).toContain('locked out');
});

When('informo um usuário inválido', async ({ loginPage }) => {
  await loginPage.login('usuario_invalido', PASSWORD);
});

Then('vejo a mensagem de credenciais inválidas', async ({ loginPage }) => {
  const message = await loginPage.getErrorMessage();
  expect(message).toContain('do not match');
});