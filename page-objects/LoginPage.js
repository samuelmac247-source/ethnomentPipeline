class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username_field');
    this.passwordInput = page.locator('#password_field');
    this.loginButton = page.locator('#button_login');
    this.continueLink = page.getByRole('link', { name: /continue/i });
  }

  async goto() {
    const loginEntries = ['/', '/admin/'];

    for (const entry of loginEntries) {
      await this.page.goto(entry);
      await this.clickContinueIfPresent();

      if (await this.usernameInput.isVisible().catch(() => false)) {
        return;
      }
    }

    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fillCredentials(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async clickContinueIfPresent() {
    if (await this.continueLink.count()) {
      await this.continueLink.first().click();
    }
  }

  async isOnLoginForm() {
    await this.clickContinueIfPresent();
    return await this.usernameInput.isVisible();
  }

  async getValidationMessage(locator) {
    return locator.evaluate((element) => element.validationMessage);
  }
}

module.exports = { LoginPage };
