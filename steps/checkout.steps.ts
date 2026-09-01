import { Given, When, Then } from '../fixtures/Fixtures';
import { FIRST_NAME, LAST_NAME, POSTAL_CODE } from '../support/config';

// ---------------------------------------------------------------------------
// Checkout steps (features/checkout.feature)
// ---------------------------------------------------------------------------

Given('I accessed the shopping cart', async ({ inventoryPage }) => {
  await inventoryPage.openCart();
});

When('I start the checkout', async ({ cartPage }) => {
  await cartPage.goToCheckout();
});

When('I fill in the customer data', async ({ checkoutPage }) => {
  await checkoutPage.fillCustomerData(FIRST_NAME, LAST_NAME, POSTAL_CODE);
});

When('I finalize the purchase', async ({ checkoutPage }) => {
  await checkoutPage.finishPurchase();
});

Then('I see the order confirmed message', async ({ checkoutPage }) => {
  await checkoutPage.expectSuccessMessage();
});