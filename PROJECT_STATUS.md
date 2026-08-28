# Project Status — Presentatie + Playwright Agents

**Doel:** Voorbereiding live demo (Playwright agents) voor presentatie dinsdag 25 augustus 2026

**Bijgewerkt:** vrijdag 21 augustus 2026

---

## ✅ Voltooid

- [x] Template opgebouwd en gepusht naar GitHub
  - ONBOARDING.md, README.md, Playwright setup
  - tests/smoke.spec.ts, tests/dashboard.spec.ts
  - .mcp.json, playwright.config.ts
  - Deelnemers kunnen clonen en zelfstandig oefenen

- [x] Presentatie-outline gemaakt (10 slides)
  - Timing: ~27-32 minuten totaal
  - Speaker notes per slide
  - Design hints (kleuren, fonts, layout)

- [x] MCP-concept expliciet uitgelegd
  - In PRESENTATIE_OUTLINE.md (slide 5: agents gamechanger)
  - In ONBOARDING.md (sectie 0: wat is MCP en waarom essentieel)
  - Kernboodschap: "zonder MCP = giswerk, met MCP = geverifieerd"

- [x] Playwright's officiële agents setup
  - `npx playwright init-agents --loop=claude` gedraaid
  - Drie agents geconfigureerd: Planner, Generator, Healer
  - `.claude/agents/`: planner, generator, healer agent-definities
  - `specs/`: directory voor gegenereerde testplannen
  - `tests/seed.spec.ts`: omgeving voor tests
  - Orphaned `@playwright/mcp` dependency opgeruimd
  - Alles gecommit op feature-branch

- [x] Skill/Subagent-onderscheid gedocumenteerd
  - Agents zijn subagents, niet skills
  - Hebben eigen geïsoleerde context, eigen toolset
  - *(nog toe te voegen aan PRESENTATIE_OUTLINE.md demo-log)*

---

## ⏳ In Progress / Nog Te Doen

### Deze week (vr 21 - ma 24 augustus)

- [ ] **Planner live testen** tegen Mendix-app op localhost:8080
  - Input: log in als reguliere gebruiker (`MENDIX_APP_USER`), laat de app
    verkennen — géén vooraf verzonnen pagina-naam ("rapportenpagina" was een
    placeholder die nooit tegen de echte app is geverifieerd, verwijderd)
  - Controleren: timing, output-kwaliteit, determinisme
  - Opgeslagen plan moet in `specs/` verschijnen

- [ ] **Planner-output evalueren**
  - Is het plan bruikbaar voor de Generator?
  - Moet het scenario aangepast worden?
  - Is timing handig voor live demo, of opnemen?

- [ ] **Generator live testen**
  - Zet Planner-plan om naar echte `.spec.ts` test
  - Voert stappen live uit tegen Mendix-app terwijl hij code genereert
  - Output moet in `tests/` verschijnen

- [ ] **Gegenereerde test uitvoeren**
  - `npx playwright test` op de gegenereerde test
  - Check: slaagt of faalt? Waarom?
  - Plan B: zo nodig aanpassen of een handgeschreven versie gebruiken

- [ ] **Demo-scenario minstens 2-3x oefenen**
  - Timing per stap noteren
  - Ruw scenario vastleggen ("dit zeggen we dinsdag")
  - Identificeren waar het kan stroeven (fallback-punten)

- [ ] **Slides afmaken in PowerPoint**
  - Content uit PRESENTATIE_OUTLINE.md copypaste in 10 slides
  - Afbeeldingen/screenshots toevoegen waar relevant
  - Font/kleur/layout ingesteld naar smaak

- [ ] **Openingszin instuderen**
  - 30 seconden, letterlijk uit het hoofd spreken
  - (Zie PRESENTATIE_OUTLINE.md slide 1 speaker notes)

- [ ] **Volledige dry run**
  - Maandag 24 augustus
  - Opening → agent-demo → fallback test → Q&A
  - Met klok: totale timing checken (max 45 min)
  - Alle techniek testen (VS Code, browser, MCP-server, etc.)

### Dinsdag 25 augustus

- [ ] **Live presentatie**
  - Locatie: [vul in]
  - Tijd: [vul in]
  - Checklist: laptop opgeladen, internet werkend, Mendix-app draait, .env ingevuld

---

## 📝 Demo-log — Wat laat je zien

### Playwright's officiële agents opgezet (vr 21 aug)

- ✅ Drie agents beschikbaar: **Planner**, **Generator**, **Healer**
- 📌 **Slide 5 (agents):** MCP-concept uitgelegd (agent ziet echte pagina live via MCP, geen giswerk)
- 📌 **Slide 7 (live demo idee):** In plaats van "test slaagt", laat zien HOE:
  - Planner verkent app → schrijft testplan (Markdown)
  - Generator leest plan → voert stappen uit → schrijft code
  - Dit is visueel sterker dan alleen "test slaagt"
- 🧪 **Nog uit te testen:** timing, output-kwaliteit, of live handig of opgenomen beter
- 📢 **Voor deelnemers:** `npx playwright init-agents --loop=claude` in README/ONBOARDING vermeld, zodat ze het na de demo zelf kunnen proberen

---

## 🎯 Branch Strategy

- **`main`** (schoon deelnemers-template): ongewijzigd, klaar voor clone-and-go
- **`feature/playwright-agents-and-presentatie`** (huidige): jouw demo-voorbereiding
  - Agents setup
  - PRESENTATIE_OUTLINE.md
  - Project-specifieke testen en notities
  - Merge naar main enkel als alles stabiel is (waarschijnlijk niet voor dinsdag)

---

## 📋 Checklist voor dinsdag 25 augustus

- [ ] Laptop volledig opgeladen + stroomkabel mee
- [ ] Internet getest op locatie (of mobile hotspot als backup)
- [ ] `.env` aanwezig met correcte MENDIX_ADMIN_USER/PASS
- [ ] Mendix-app draait op localhost:8080
- [ ] VS Code + Claude Code + MCP server werkend
- [ ] Agent-scenario minstens 1x vandaag geoefend (als je tijd hebt)
- [ ] Slides afgemaakt en formaat getest op beamer/projector
- [ ] Plan B test (`npx playwright test dashboard`) werkt
- [ ] Notificaties/updates in Windows/VS Code uitgeschakeld
- [ ] Schermresolutie/font-grootte vergroot voor zichtbaarheid
