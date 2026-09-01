import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for the shopping cart.
 */
export class CartPage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(readonly page: Page) {
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.removeButtons = page.locator('.cart_button');
  }

  async expectVisible(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }

  /** Returns the names of the items in the cart. */
  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  /** Returns the number of items in the cart. */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}