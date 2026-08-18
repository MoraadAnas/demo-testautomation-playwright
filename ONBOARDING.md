# Onboarding: Playwright + Claude Code (MCP) project opzetten

Dit document beschrijft stap voor stap hoe je een testautomatiseringsproject opzet
waarbij een AI-agent (Claude Code) de browser bestuurt via de **Playwright MCP
server**, op basis van natuurlijke taal-instructies in plaats van hardcoded
selectors/clicks.

Doel: een werkend scenario tegen je eigen Mendix-app opzetten
("log in als admin, ga naar rapportenpagina, verifieer dat data geladen is"),
zodat je zelf ervaart hoe agent-gestuurde testautomatisering werkt.

---

## 0. Wat is wat (kort)

- **Playwright** — het automation framework dat de browser daadwerkelijk bestuurt
  (klikken, typen, wachten, assert maken). Cross-browser: Chromium, Firefox, WebKit.
- **Playwright MCP server** — een los pakket (`@playwright/mcp`) dat Playwright's
  mogelijkheden beschikbaar maakt als _tools_ voor een AI-agent, via het
  Model Context Protocol (MCP).
- **Claude Code** — de AI-agent (deze tool) die, zodra hij verbonden is met de
  Playwright MCP server, een instructie als "log in als admin en verifieer het
  dashboard" kan omzetten in echte browseracties — live, zonder dat jij die
  stappen van tevoren in code hebt vastgelegd.
- **Traditionele Playwright test** — een gewoon `.spec.ts` bestand met vaste
  stappen. Dit blijft je **plan B** voor het geval de live agent-demo faalt.

---

## 1. Vereisten (eenmalig, check dit als eerste)

- [ ] Node.js LTS geïnstalleerd (`node --version` — 18+ is prima)
- [ ] npm werkt (`npm --version`)
- [ ] VS Code met Claude Code (deze extensie) — al aanwezig
- [ ] URL van de Mendix test/acceptatie-omgeving
- [ ] Een testaccount (bijv. admin) met gebruikersnaam/wachtwoord voor die omgeving
- [ ] Git (optioneel, maar handig om je opzet te kunnen terugdraaien)

> Geen wachtwoorden in chat, slides, of git plakken. Die gaan in een lokaal
> `.env` bestand (zie stap 4) dat nooit wordt gecommit.

---

## 2. Project initialiseren

In de projectmap (`demo-testautomation-playwright`):

```bash
npm init playwright@latest
```

Kies bij de prompts:

- TypeScript: **ja**
- Map voor tests: `tests` (default)
- GitHub Actions workflow: mag je overslaan voor de demo, is niet nodig
- Browsers installeren: **ja** (download Chromium/Firefox/WebKit)

Dit genereert o.a. `playwright.config.ts`, een `tests/` map met een voorbeeldtest,
en `package.json`.

**Check dat het werkt:**

```bash
npx playwright test
```

Als de voorbeeldtest slaagt, is de basis goed.

---

## 3. Playwright MCP server installeren

Dit is het los pakket dat Playwright-tools beschikbaar maakt voor de agent:

```bash
npm install -D @playwright/mcp
```

---

## 4. Environment variabelen voor de Mendix-app

Maak een `.env` bestand (nooit committen) en een `.env.example` (wel committen,
zonder echte waarden):

**`.env`** (echte waarden, lokaal):

```
MENDIX_APP_URL=https://jouw-mendix-omgeving.mendixcloud.com
MENDIX_ADMIN_USER=jouw-testaccount
MENDIX_ADMIN_PASS=jouw-wachtwoord
```

**`.env.example`** (template, wel in git):

```
MENDIX_APP_URL=
MENDIX_ADMIN_USER=
MENDIX_ADMIN_PASS=
```

**`.gitignore`** — zorg dat deze regel erin staat:

```
.env
```

---

## 5. Claude Code verbinden met de Playwright MCP server

Maak (of vul aan) een `.mcp.json` in de root van het project:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Herstart Claude Code (of herlaad het venster) zodat de MCP-server actief wordt.
Je herkent dat het werkt doordat Claude Code nu browser-tools tot zijn
beschikking heeft (navigeren, klikken, typen, snapshot maken van de pagina).

**Testen:** typ in een gewone chat tegen Claude Code iets als:

> "Open https://playwright.dev en zoek de 'Get started' knop, klik erop."

Als de browser daadwerkelijk opent en de actie uitvoert, is de koppeling goed.

---

## 6. Het scenario uitproberen

Doel-zin (typ dit letterlijk in de chat tegen Claude Code):

> "Log in op de Mendix-app als admin met de gegevens uit .env, navigeer naar de
> rapportenpagina, en verifieer dat de data-tabel gevuld is."

**Tips:**

1. Oefen het scenario een paar keer — de eerste poging loopt vaak ergens vast
   op een afwijkend label of veldnaam.
2. Als de agent om inloggegevens vraagt: verwijs naar de env-variabelen in
   plaats van ze letterlijk in de chat te typen.
3. Let op welke stappen de agent zelfstandig neemt zonder dat jij die had
   voorgeschreven — dat is precies het verschil met een traditionele test.

---

## 7. Plan B: een vaste Playwright test als vangnet

Schrijf **daarnaast** een gewone test die hetzelfde scenario hardcoded aftest,
zodat je iets hebt om te tonen als de live agent-demo op het moment zelf faalt
(netwerk, demo-goden, etc.):

```ts
// tests/dashboard.spec.ts
import { test, expect } from "@playwright/test";

test("admin ziet rapportendata na login", async ({ page }) => {
  await page.goto(process.env.MENDIX_APP_URL!);
  await page.getByLabel("Gebruikersnaam").fill(process.env.MENDIX_ADMIN_USER!);
  await page.getByLabel("Wachtwoord").fill(process.env.MENDIX_ADMIN_PASS!);
  await page.getByRole("button", { name: "Inloggen" }).click();

  await page.getByRole("link", { name: "Rapporten" }).click();
  await expect(page.getByRole("table")).toBeVisible();
});
```

(Pas selectors aan zodra je de echte Mendix-pagina ziet — labels/rollen kunnen
afwijken.)

Draai 'm met:

```bash
npx playwright test tests/dashboard.spec.ts --headed
```

`--headed` toont de browser zichtbaar — fijn als vangnet-demo als de live
agent-flow niet lukt: "en dit is exact hetzelfde scenario, nu met een vaste
test — zo zetten we dit in productie/CI."

## Troubleshooting

- **MCP server start niet / Claude Code ziet geen browser-tools**: check dat
  `.mcp.json` in de projectroot staat en herstart het VS Code venster volledig.
- **Login lukt niet via agent**: geef de agent een preciezere beschrijving van
  het loginformulier (bijv. "het veld heet 'Gebruikersnaam', niet 'Email'").
- **Mendix-app reageert traag / timeouts**: verhoog de timeout in
  `playwright.config.ts` (`use: { actionTimeout: 15000 }`) voor de demo-omgeving.
