import { Given, When, Then } from '../fixtures/Fixtures';
import { FIRST_NAME, LAST_NAME, POSTAL_CODE } from '../support/config';

// ---------------------------------------------------------------------------
// Steps de Checkout (features/checkout.feature)
// ---------------------------------------------------------------------------

Given('acessei o carrinho de compras', async ({ inventoryPage }) => {
  await inventoryPage.openCart();
});

When('inicio o checkout', async ({ cartPage }) => {
  await cartPage.goToCheckout();
});

When('informo os dados do cliente', async ({ checkoutPage }) => {
  await checkoutPage.fillCustomerData(FIRST_NAME, LAST_NAME, POSTAL_CODE);
});

When('finalizo a compra', async ({ checkoutPage }) => {
  await checkoutPage.finishPurchase();
});

Then('vejo a mensagem de pedido confirmado', async ({ checkoutPage }) => {
  await checkoutPage.expectSuccessMessage();
});