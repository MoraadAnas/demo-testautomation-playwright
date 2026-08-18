import { test, expect } from '@playwright/test';

/**
 * Sanity check: bevestigt dat MENDIX_APP_URL in .env klopt en de app bereikbaar is.
 * Draai dit als eerste na het invullen van je .env: npx playwright test smoke
 */
test('Mendix-app is bereikbaar', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
});
