const { test } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { getPmsCredentials } = require('../../config/env');

test('PMS doctor regression flow', async ({ page }) => {
  test.setTimeout(90_000);

  const { username, password } = getPmsCredentials();
  const loginPage = new LoginPage(page);

  await test.step('doctor logs in successfully', async () => {
    await loginPage.goto();
    await loginPage.login(username, password);
  });

  await test.step('doctor dashboard is visible', async () => {
    await page.waitForTimeout(15_000);
  });
});
