import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object do fluxo de Checkout (informações -> revisão -> confirmação).
 */
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly summaryTotal: Locator;

  constructor(readonly page: Page) {
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.summaryTotal = page.locator('.summary_total_label');
  }

  /** Preenche os dados do cliente e continua. */
  async fillCustomerData(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /** Finaliza a compra. */
  async finishPurchase(): Promise<void> {
    await this.finishButton.click();
  }

  /** Valida a mensagem de sucesso do pedido. */
  async expectSuccessMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  /** Retorna o total a pagar (ex.: "Total: $43.18"). */
  async getTotalLabel(): Promise<string> {
    return (await this.summaryTotal.textContent()) ?? '';
  }
}