import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object da vitrine de produtos (Inventory).
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

  /** Espera a vitrine carregar e valida o título. */
  async expectVisible(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  /** Retorna a lista de nomes de produtos exibidos (preservando a ordem). */
  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  /** Adiciona ao carrinho um produto pelo seu nome. */
  async addToCart(productName: string): Promise<void> {
    const card = this.productCards.filter({ hasText: productName });
    await expect(card).toBeVisible();
    await card.locator('button.btn_primary').click();
  }

  /** Ordena a lista pelo valor do select de ordenação. */
  async sortBy(value: string): Promise<void> {
    await this.sortSelect.selectOption({ label: value });
  }

  /** Retorna o total de itens exibido no badge do carrinho (vazio = 0). */
  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number((await this.cartBadge.textContent()) ?? '0');
  }

  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }
}