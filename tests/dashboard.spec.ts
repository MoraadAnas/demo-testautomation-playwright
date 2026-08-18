import { test, expect } from '@playwright/test';

/**
 * Plan B / vangnet: dezelfde flow als het live agent-scenario, maar met vaste
 * stappen. Handig als referentie of als de agent-demo een keer niet lukt.
 *
 * TODO: pas de selectors hieronder aan op jouw eigen Mendix-app — labels en
 * rolnamen wijken af per project. Gebruik `npx playwright codegen` tegen je
 * eigen app om de juiste selectors te vinden.
 */
test('admin ziet data na login', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel(/gebruikersnaam|username/i).fill(process.env.MENDIX_ADMIN_USER!);
  await page.getByLabel(/wachtwoord|password/i).fill(process.env.MENDIX_ADMIN_PASS!);
  await page.getByRole('button', { name: /inloggen|log in|sign in/i }).click();

  // TODO: vervang door de link/knop naar jouw dashboard of rapportenpagina
  await page.getByRole('link', { name: /rapporten|reports|dashboard/i }).click();

  // TODO: vervang door een assert die past bij jouw pagina (tabel, kaart, lijst...)
  await expect(page.getByRole('table')).toBeVisible();
});
