import { type Page, type Locator, expect } from '@playwright/test';
import { PASSWORD, STANDARD_USER } from '../../support/config';

/**
 * Page Object da tela de Login do Swag Labs.
 */
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBox: Locator;

  constructor(readonly page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorBox = page.locator('[data-test="error"]');
  }

  /** Navega até a tela de login com retry contra erros transitórios de rede
   *  (saucedemo ocasionalmente reseta conexões sob carga). */
  async open(): Promise<void> {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto('/');
        return;
      } catch (error) {
        if (attempt === maxAttempts) throw error;
        await this.page.waitForTimeout(2000 * attempt); // backoff progressivo
      }
    }
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /** Login completo e rápido. */
  async login(username: string = STANDARD_USER, password: string = PASSWORD): Promise<void> {
    await this.open();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /** Retorna o texto da mensagem de erro de autenticação. */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorBox).toBeVisible();
    return (await this.errorBox.textContent()) ?? '';
  }
}