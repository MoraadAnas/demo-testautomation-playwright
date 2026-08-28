# demo-testautomation-playwright

Oefen-template voor testautomatisering op je eigen Mendix-app met **Playwright**
en een **AI-agent** (Claude Code) die via de Playwright MCP-server je browser
bestuurt op basis van natuurlijke taal — in plaats van dat jij elke klik
hardcoded voorschrijft.

Clone deze repo, vul je eigen Mendix-gegevens in, en probeer het zelf uit.

## Vereisten

- [Node.js](https://nodejs.org) 18 of hoger
- [VS Code](https://code.visualstudio.com) met de Claude Code extensie
- Een Mendix-omgeving (lokaal of test/acceptatie) met een testaccount

## Aan de slag

1. **Clone en installeer**
   ```bash
   git clone https://github.com/MoraadAnas/demo-testautomation-playwright.git
   cd demo-testautomation-playwright
   npm install
   npx playwright install chromium
   ```

2. **Vul je eigen gegevens in**
   ```bash
   cp .env.example .env
   ```
   Open `.env` en vul in:
   - `MENDIX_APP_URL` — bv. `http://localhost:8080`
   - `MENDIX_ADMIN_USER` / `MENDIX_ADMIN_PASS` — je testaccount

   `.env` wordt nooit gecommit (staat in `.gitignore`) — deel dit bestand niet.

3. **Check dat je setup werkt**
   ```bash
   npx playwright test smoke
   ```
   Slaagt deze test? Dan is je `.env` correct en is de app bereikbaar.

4. **Herstart VS Code / Claude Code**, zodat de Playwright MCP-server (zie
   `.mcp.json`) actief wordt. Je herkent dit doordat Claude Code nu browser-tools
   tot zijn beschikking heeft (navigeren, klikken, snapshotten).

5. **Probeer het agent-scenario live.** Typ in de chat tegen Claude Code
   bijvoorbeeld:
   > "Log in op de Mendix-app als admin met de gegevens uit .env, navigeer naar
   > de rapportenpagina, en verifieer dat de data geladen is."

   De agent voert dit zelfstandig uit in een echte browser — jij beschrijft
   het doel, niet de stappen.

6. **Plan B: vaste test.** [`tests/dashboard.spec.ts`](tests/dashboard.spec.ts)
   bevat dezelfde flow als een gewone Playwright-test, met vaste stappen. Pas
   de selectors aan op jouw eigen app (gebruik `npx playwright codegen` tegen
   je app om de juiste selectors te vinden) en draai 'm met:
   ```bash
   npx playwright test dashboard --headed
   ```

## Projectstructuur

```
.env.example        # template voor je eigen .env (nooit committen)
.mcp.json            # koppelt Claude Code aan de Playwright MCP-server
playwright.config.ts # Playwright-configuratie, leest MENDIX_APP_URL uit .env
tests/
  smoke.spec.ts       # sanity check: is de app bereikbaar?
  dashboard.spec.ts    # plan-B test: login + verificatie, vaste stappen
```

## Verder experimenteren

Playwright heeft ook eigen ingebouwde agents (Planner, Generator, Healer) die
een testplan verkennen, er code uit genereren, en falende tests repareren:

```bash
npx playwright init-agents --loop=claude
```

Zie [`ONBOARDING.md`](ONBOARDING.md#verder-experimenteren-playwrights-eigen-agents)
voor meer uitleg, of de [officiële Playwright docs](https://playwright.dev/docs/test-agents).

## Meer weten

Zie [`ONBOARDING.md`](ONBOARDING.md) voor een uitgebreidere toelichting op wat
Playwright, de MCP-server en de agent-aanpak precies doen.
