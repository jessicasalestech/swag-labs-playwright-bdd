import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for the Checkout flow (information -> review -> confirmation).
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

  /** Fills in the customer data and continues. */
  async fillCustomerData(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /** Finalizes the purchase. */
  async finishPurchase(): Promise<void> {
    await this.finishButton.click();
  }

  /** Validates the order success message. */
  async expectSuccessMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  /** Returns the total amount to pay (e.g. "Total: $43.18"). */
  async getTotalLabel(): Promise<string> {
    return (await this.summaryTotal.textContent()) ?? '';
  }
}