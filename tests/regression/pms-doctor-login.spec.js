const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { getPmsCredentials } = require('../../config/env');

test('PMS doctor regression flow', async ({ page }) => {
  const { username, password } = getPmsCredentials();
  const loginPage = new LoginPage(page);

  await test.step('doctor logs in successfully', async () => {
    await loginPage.goto();
    await loginPage.login(username, password);

    await page.waitForURL(/dashboard_emr_provider\.php/i, { timeout: 30_000 });
    await expect(page).toHaveURL(/dashboard_emr_provider\.php/i);
    await expect(page.locator('body')).toContainText(/Hello,\s*Samuel/i);
    await expect(page.locator('body')).toContainText(/HEALTHCARE-PROVIDER|Provider Workspace/i);
  });

  await test.step('doctor dashboard is visible', async () => {
    await expect(page.locator('body')).toContainText(/Samuel|Provider Workspace|Dashboard/i);
    await page.waitForTimeout(15_000);
  });
});
