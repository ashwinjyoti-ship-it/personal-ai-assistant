import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows login form on initial load', async ({ page }) => {
    await expect(page.locator('#loginUsername')).toBeVisible();
    await expect(page.locator('#loginPin')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();
  });

  test('pre-fills username from localStorage', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('karna_last_username', 'testuser');
    });
    await page.reload();
    await expect(page.locator('#loginUsername')).toHaveValue('testuser');
  });

  test('shows error on wrong credentials', async ({ page }) => {
    await page.locator('#loginUsername').fill('baduser');
    await page.locator('#loginPin').fill('0000');
    await page.locator('#loginBtn').click();
    await expect(page.locator('#loginError')).not.toBeEmpty();
  });

  test('submits login on Enter key in PIN field', async ({ page }) => {
    await page.locator('#loginUsername').fill('baduser');
    await page.locator('#loginPin').fill('0000');
    await page.locator('#loginPin').press('Enter');
    // Error should appear (bad creds), confirming form was submitted
    await expect(page.locator('#loginError')).not.toBeEmpty();
  });
});
