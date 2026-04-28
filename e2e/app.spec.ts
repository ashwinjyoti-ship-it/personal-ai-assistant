import { test, expect } from '@playwright/test';

test.describe('App shell', () => {
  test('page title is Karna', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Karna');
  });

  test('app root element is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#app')).toBeAttached();
  });

  test('toast container is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#toasts')).toBeAttached();
  });

  test('manifest.json is served', async ({ page }) => {
    const response = await page.request.get('/manifest.json');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('name');
  });
});
