import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for the product showcase (Inventory).
 */
export class InventoryPage {
  readonly title: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly cartBadge: Locator;
  readonly sortSelect: Locator;

  constructor(readonly page: Page) {
    this.title = page.locator('.title');
    this.productCards = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  /** Waits for the showcase to load and validates the title. */
  async expectVisible(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  /** Returns the list of displayed product names (preserving their order). */
  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  /** Adds a product to the cart by its name. */
  async addToCart(productName: string): Promise<void> {
    const card = this.productCards.filter({ hasText: productName });
    await expect(card).toBeVisible();
    await card.locator('button.btn_primary').click();
  }

  /** Sorts the list using the sort selector's value. */
  async sortBy(value: string): Promise<void> {
    await this.sortSelect.selectOption({ label: value });
  }

  /** Returns the total of items shown in the cart badge (empty = 0). */
  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number((await this.cartBadge.textContent()) ?? '0');
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }
}