# Onboarding: Playwright + Claude Code (MCP) project opzetten

Dit document beschrijft hoe je dit template gebruikt — stap voor stap.

Het project is al voorgeïnitialiseerd. Je hoeft NIET zelf `npm init playwright` te draaien;
je installeert alleen de dependencies en voert het in.

**Doel:** een werkend agent-scenario tegen jouw Mendix-app (log in, navigeer, verifieer data),
zodat je zelf ervaart hoe AI-gestuurde testautomatisering werkt.

---

## 0. Wat is wat (kort)

- **Playwright** — automation framework dat de browser bestuurt (klikken, typen, wachten).
- **Playwright MCP server** (`@playwright/mcp`) — maakt Playwright-tools beschikbaar voor een AI-agent.
- **Claude Code** — AI-agent die, eenmaal gekoppeld via MCP, browseracties uitvoert op basis van jouw instructies in natuurlijke taal — geen hardcoded stappen.
- **Plan B: vaste test** (`tests/dashboard.spec.ts`) — fallback voor als de live agent-demo stroeft.

---

## 1. Vereisten (check dit eerst)

- [ ] Node.js 18+ (`node --version`)
- [ ] npm werkt (`npm --version`)
- [ ] VS Code met Claude Code extensie
- [ ] URL van jouw Mendix-omgeving (bv. `http://localhost:8080`)
- [ ] Testaccount (gebruikersnaam + wachtwoord) voor die omgeving

> **Geen wachtwoorden in chat, slides of git.** Die gaan in `.env` (lokaal, nooit gecommit).

---

## 2. Clone & installeer dependencies

```bash
git clone https://github.com/MoraadAnas/demo-testautomation-playwright.git
cd demo-testautomation-playwright
npm install
```

Dit installeert `@playwright/test`, `@playwright/mcp`, `dotenv`, etc.

---

## 3. Download de Chromium browser

```bash
npx playwright install chromium
```

Dit downloadt ~200 MB naar `~/.ms-playwright/` (je lokale machine, niet in git).

**Controleer dat het werkt:**

```bash
npx playwright test smoke
```

Slaagt de test? Mooi — je setup is werkend.

---

## 4. Configureer jouw Mendix-omgeving

Kopieer `.env.example` naar `.env` (deze wordt nooit gecommit):

```bash
cp .env.example .env
```

Open `.env` en vul in:

```
MENDIX_APP_URL=http://localhost:8080
MENDIX_ADMIN_USER=jouw-gebruikersnaam
MENDIX_ADMIN_PASS=jouw-wachtwoord
```

Opslaan. `.env` staat al in `.gitignore`, dus het wordt nooit online gezet.

---

## 5. Herstart VS Code zodat Claude Code de MCP server ziet

Sluit VS Code volledig (Cmd+Q / Ctrl+Q) en open het project opnieuw.

**Hoe je weet dat het werkt:** 
In een chat met Claude Code kun je nu zeggen:
> "Open http://localhost:8080 en maak een screenshot."

De browser opent daadwerkelijk en je krijgt een screenshot terug.

---

## 6. Probeer het agent-scenario

Dit is wat je live in de presentatie gaat doen. Oefen het een paar keer:

**Typ in de chat tegen Claude Code:**

> "Log in op de Mendix-app als admin met de gegevens uit .env, navigeer naar de rapportenpagina, en verifieer dat de data geladen is."

**Wat je ziet:**
- Claude Code opent de browser
- Voert login-stappen uit (zonder dat je die hardcoded hebt)
- Adapteert zich aan het echte UI (velden heten misschien anders dan verwacht)
- Verifieerd het resultaat

**Opmerkingen:**
- Eerste keer kan wat stroef gaan (layout aanpassingen, stappen herproeven) — dat's normaal
- Dit laat precies het verschil zien: je beschrijft het *doel*, Claude Code doet de *stappen*

---

## 7. Plan B: vaste test (als de agent-demo faalt)

`tests/dashboard.spec.ts` bevat dezelfde flow, maar met hardcoded stappen:

```bash
npx playwright test dashboard --headed
```

`--headed` toont de browser. Pas eerst de selectors aan op jouw Mendix-app:

- Open `tests/dashboard.spec.ts`
- Kijk naar de `getByLabel`, `getByRole` calls
- Test-voorbereiding: draai `npx playwright codegen http://localhost:8080` om de echte selectors uit jouw app te vinden
- Pas de test aan

Zodra dit werkt, heb je een fallback voor dinsdag.

---

## Troubleshooting

| Probleem | Oplossing |
|---|---|
| `npm install` faalt | Zorg dat je Node 18+ hebt (`node --version`) |
| `npx playwright install chromium` stuk | Internet okay? Probeer opnieuw of gebruik `--with-deps` |
| Claude Code ziet browser-tools niet | Herstart VS Code volledig; check dat `.mcp.json` in de projectroot staat |
| Login lukt niet via agent | Beschrijf het loginformulier preciezer: "de velden heten 'Inlognaam' en 'Wachtwoord'" |
| Test times out | Verhoog timeout in `playwright.config.ts`: `use: { actionTimeout: 15000 }` |

---

## Verder experimenteren: Playwright's eigen agents

Playwright heeft naast de aanpak hierboven ook een eigen ingebouwde set agents
(Planner, Generator, Healer) die een testplan verkennen, er testcode uit
genereren, en falende tests automatisch repareren. Los proberen kan met:

```bash
npx playwright init-agents --loop=claude
```

Dit voegt agent-definities toe (`.claude/agents/`) en mappen voor testplannen
(`specs/`) en gegenereerde tests. Zie de
[officiële Playwright docs](https://playwright.dev/docs/test-agents) voor hoe
je Planner, Generator en Healer aanstuurt.
