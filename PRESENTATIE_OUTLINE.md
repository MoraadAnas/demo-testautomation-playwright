# Presentatie: Test Automation met Playwright + Agents
## Outline voor PowerPoint — Dinsdag 25 augustus

---

## 📌 Demo-log — wat is er gebouwd en wat laat je zien

Wordt bijgewerkt zodra we iets bouwen dat presentatie-waardig is. Niet elke
technische stap, alleen wat je op een slide of in de live demo kan tonen.

### Playwright's officiële agents opgezet (vr 21 aug)

- `npx playwright init-agents --loop=claude` gedraaid
- Drie agents nu beschikbaar: **Planner**, **Generator**, **Healer**
- Relevant voor slide 5 (agents-uitleg) en slide 7 (live demo):
  - **Planner**: verkent je Mendix-app live, schrijft een leesbaar testplan
    (Markdown) in `specs/`
  - **Generator**: leest dat plan, voert de stappen *echt* uit in de browser
    terwijl hij typeert, en schrijft daarna de uiteindelijke `tests/*.spec.ts`
  - **Healer**: als een test later faalt (UI veranderd), analyseert en
    repareert 'm automatisch
- **Demo-idee voor slide 7:** in plaats van los prompten, laat zien hoe de
  Planner een testplan schrijft ("kijk, dit heeft de agent zelf bedacht na
  het verkennen van de app"), en de Generator dat omzet naar echte code —
  dat is visueel sterker dan alleen "test slaagt"
- **Voor deelnemers:** dit is nu ook als losse optie vermeld in README.md en
  ONBOARDING.md op `main` (`npx playwright init-agents --loop=claude`), zodat
  ze het na de demo zelf kunnen uitproberen
- **Technisch detail (mogelijk voor Q&A):** Agents zijn **subagents**, niet
  skills. Ze hebben een eigen, geïsoleerde conversatie-context en beperkte
  toolset (alleen wat ze nodig hebben). De Planner kan bijvoorbeeld niet
  zomaar bestanden schrijven — alleen plannen opslaan via `planner_save_plan`.
  Dit is veiliger en schoner dan loosely gekoppelde tools.
- **Nog te doen:** Planner/Generator live testen tegen de Mendix-app,
  screenshot/voorbeeld toevoegen

---

## SLIDE 1: Opening / Title Slide
**Titel:** Test Automation Reimagined
**Subtitel:** Playwright + AI Agents

**Visuals:** 
- Clean achtergrond (donkerbluw of wit)
- Logo/icoon van Playwright (logo-symbool)
- Je naam

**Speaker notes:**
"Stel je voor: het is vrijdagmiddag, je Mendix-app gaat naar productie, en iemand vergeet een edge case handmatig te testen. Maandag staat er een bug-ticket klaar. 

Wie van jullie test hier weleens handmatig, stap voor stap, dezelfde flow na elke release? [pause for hands]

Precies dat gaan we vandaag anders doen. Aan het eind van deze sessie schrijf ik live een test — niet met code die elke klik hardcoded, maar door gewoon te zeggen wát ik wil testen. En jullie zien 'm slagen."

**Timing:** ~2 min (opening hook)

---

## SLIDE 2: Het probleem — handmatig testen
**Titel:** Handmatig Testen = Risico

**Bullet points:**
- ❌ Herhaalzaam, foutgevoelig
- ❌ Menselijke fouten slip door naar productie
- ❌ Tijd-verspilling (dezelfde stappen steeds opnieuw)
- ❌ Moeilijk te schalen (release-dag = veel werk)

**Visuals:** 
- Afbeelding/icoon van iemand die met muis klikt
- Rode waarschuwing-strepen

**Speaker notes:**
"Dit herkennen jullie vast. Elke keer een release testen we dezelfde flows handmatig. Het werkt, maar is traag, foutgevoelig, en niet reproduceerbaar."

**Timing:** ~1 min

---

## SLIDE 3: De oplossing — Testautomatisering
**Titel:** Automation: Sneller, Betrouwbaarder

**Bullet points:**
- ✅ Dezelfde test, miljoen keer, altijd hetzelfde resultaat
- ✅ Runs in CI/CD — feedback vóór release
- ✅ Schaalt makkelijk (meer tests, geen extra tijd)
- ✅ Maar... traditioneel: veel hardcoding

**Visuals:**
- Groene checkmarks
- CI/CD pipeline diagram (eenvoudig: test → pass/fail)

**Speaker notes:**
"Automation lost het probleem op — maar traditioneel moet je veel code schrijven. Elke klik, elke assertion, moet je vooraf hardcoden. Zodra de UI verandert, breekt je test."

**Timing:** ~1.5 min

---

## SLIDE 4: Wat is Playwright?
**Titel:** Playwright: het Automation Framework

**Bullet points:**
- Framework voor browser-automation (cross-browser: Chromium, Firefox, Safari)
- Modern, snel, betrouwbaar
- Kan klikken, typen, wachten, elementen vinden, asserts maken
- Werkt perfect met Mendix apps

**Visuals:**
- Playwright logo
- Browser-iconen (Chrome, Firefox, Safari)
- Code snippet voorbeeld (niet te groot, ~3 lijnen):
  ```
  await page.goto('https://...');
  await page.click('button:has-text("Login")');
  await expect(page).toHaveTitle(/Dashboard/);
  ```

**Speaker notes:**
"Playwright is het tool waarmee we automatiseren. Het is niet Mendix-specifiek, maar werkt er perfect mee. Je kunt ermee navigeren, elementen vinden, klikken, typen — alles wat een gebruiker zou doen."

**Timing:** ~2 min

---

## SLIDE 5: Agents — De Gamechanger
**Titel:** Agents: Je zegt het DOEL, niet de STAPPEN

**Twee kolommen / side-by-side:**

**Traditioneel (links):**
- Jij: "Klik op de login-knop"
- Jij: "Vul email in"
- Jij: "Klik submit"
- Jij: "Verifieer dashboard"
- → Veel code, alle stappen hardcoded

**Met Agents (rechts):**
- Jij: "Log in als admin, ga naar dashboard, verifieer data"
- Agent: Begrijpt wat je wilt → figureert de stappen uit
- → Geen hardcoding, agent adapteert aan UI-veranderingen

**Hoe kan de agent dat — MCP (kort, 1 bullet-blok):**
- De agent "raadt" niet — hij **ziet de echte pagina live**, via de
  **Playwright MCP server** (Model Context Protocol)
- MCP is de verbinding die de AI daadwerkelijk toegang geeft tot een browser:
  navigeren, klikken, typen, een snapshot van de pagina lezen
- **Zonder die verbinding** zou de agent alleen tekst typen die *op* Playwright-
  code lijkt, zonder ooit te checken of een knop, veld of label echt bestaat —
  puur gokwerk
- **Met** die verbinding verifieert de agent elke stap tegen de echte app
  vóórdat hij 'm vastlegt — dat is het verschil tussen giswerk en een
  betrouwbare test

**Visuals:**
- Twee pijlen: één "prescriptief" (stap-voor-stap), één "intentie-based"
- Brein-icoon voor de agent
- Simpel diagram: Agent ←→ MCP server ←→ Browser (laat zien dat MCP de
  brug is, niet de agent zelf die "magisch" de browser bestuurt)

**Speaker notes:**
"Dit is de grote verandering. Traditioneel zeg je Playwright stap voor stap wat te doen — 'klik hier, vul dit in, wacht op dat element'. 

Met agents werk je anders: jij zegt WAAR je heen wilt ('log in en ga naar het dashboard'), en de agent figureert zelfstandig de stappen uit. 

Waarom is dat handig? UI verandert — agent past zich aan. Je hoeft je test niet herschrijven.

En hoe kán de agent dat eigenlijk? Via iets dat MCP heet — Model Context Protocol. Dat is de verbinding die de AI daadwerkelijk laat kijken naar en klikken in een echte browser. Zonder die verbinding zou de agent alleen tekst typen die op een test lijkt, zonder ooit te checken of dat veld of die knop echt bestaat. Met MCP verifieert hij elke stap live, tegen de echte app — dat is het verschil tussen giswerk en een betrouwbare test."

**Timing:** ~2.5 min

---

## SLIDE 6: Live Demo — Setup
**Titel:** Live Demo: Agent in Actie

**Bullet points:**
- ✅ Mendix-app draait lokaal (`http://localhost:8080`)
- ✅ Playwright + MCP server: klaar
- ✅ Claude Code: connected
- **Scenario:** [NOG TE BEPALEN — laat de Planner de app verkennen en kies een
  echt bestaande flow; "rapportenpagina" was een verzonnen placeholder, geen
  bevestigde pagina in de app]

**Visuals:**
- Screenshot van VS Code + browser (side-by-side mockup)
- Pijl: "Agent beztuurt dit"

**Speaker notes:**
"Dit is live. Ik ga hier in VS Code een instructie intypen — geen Playwright-code, gewoon Nederlands. De agent gaat de browser openen, inloggen, klikken, en verifiëren — allemaal zonder dat ik vooraf de stappen heb hardcoded."

**Timing:** ~1 min (intro tot demo)

---

## SLIDE 7: [LIVE DEMO]
**Titel:** Watch the Agent Work

**Live opzet:**
1. Open VS Code / Claude Code chat
2. Type: [NOG TE BEPALEN — exacte scenario volgt zodra de Planner de echte app
   heeft verkend, zie PROJECT_STATUS.md]
3. Agent voert uit in echte browser
4. Toon screenshots/stappen

**Fallback (Plan B):**
- Draai `npx playwright test dashboard --headed`
- Toon dezelfde flow in een vaste test

**Visuals:**
- Live browser window + Claude Code console
- Highlight: agent maakt keuzes zelfstandig (geen hardcoding)

**Speaker notes:**
"[Terwijl demo draait] Let op: ik beschrijf het doel, niet de stappen. De agent ziet de loginpagina, figureert uit waar username en password gaan, klikt de knop... Alles live, adaptief."

**[Plan B note]** "Als de live agent stroeft (netwerk, timing), toon ik dezelfde test als vaste Playwright-test. Zelfde result, andere uitvoering."

**Timing:** ~8-10 min (live demo)

---

## SLIDE 8: Praktijk — Hoe wij het inzetten
**Titel:** In Productie: CI/CD + Dashboard

**Bullet points:**
- Tests runnen in CI/CD bij elke commit
- Dashboard toont resultaten (groen = slaag, rood = fail)
- Feedback vóór merge naar main
- Bugs worden *niet* release naar prod

**Visuals:**
- Flowdiagram:
  - Dev commits code
  - → CI/CD pipeline triggers
  - → Tests runnen (Playwright)
  - → Dashboard updated
  - → Pass = merge, Fail = stop

**Speaker notes:**
"Dit is hoe je het in productie zet. Je ziet test-resultaten meteen in je dashboard — rechtstreeks vanuit je Mendix deployment pipeline. Geen bugs in productie, omdat ze worden gecatcht vóór release."

**Timing:** ~2 min

---

## SLIDE 9: Volgende Stap — Workshop / Training
**Titel:** Volgende Stap: Workshop

**Bullet points:**
- Jullie willen dit doen? → Workshop beschikbaar
- Setup per team (eigen Mendix-app)
- Hands-on: eigen tests schrijven met agents
- Q&A moment nu

**Visuals:**
- Afbeelding/icoon van groep aan het werk
- Call-to-action knop (QR-code naar contact-form, of email)

**Speaker notes:**
"Dit was een intro. Wie hier meer in ziet: we kunnen een workshop doen waarbij jullie dit zelf instellen op jullie eigen app. Volledig hands-on."

**Timing:** ~1.5 min

---

## SLIDE 10: Q&A
**Titel:** Vragen?

**Visuals:**
- Schoon, minimaal design
- "Questions?" groot in beeld

**Speaker notes:**
"Vragen? Open discussie."

**Timing:** Afhankelijk van vragen (min. 5-10 min)

---

## Design Tips voor PowerPoint

**Kleur:**
- Donkerbluw (#1E3A5F) of donkergrijs (#2D2D2D) voor accent
- Wit/lichtgrijs (#F5F5F5) achtergrond
- Groen (#4CAF50) voor ✅ checks
- Rood (#E74C3C) voor ❌ problemen

**Fonts:**
- Titel: **sans-serif, vet** (bv. Segoe UI Bold, Calibri Bold)
- Body: **sans-serif, normaal** (Segoe UI, Calibri)
- Code/tech: **monospace** (Consolas, Courier New)

**Layout:**
- Titels linksboven of gecentreerd
- Bullets: 3-5 per slide max
- Veel whitespace (niet vol tekst)
- Afbeeldingen/screenshots: 50% van slide

**Per slide:**
- Nummering onderaan (niet nodig, maar netjes)
- Timing linksboven (voor jezelf, niet tonen)

---

## Voorbereiding Checklist

- [ ] Agent-scenario 3x oefenen (timing opmeten)
- [ ] Plan B test (`npx playwright test dashboard`) werkend
- [ ] VS Code + browser setup testen (live demo omgeving)
- [ ] Mendix-app draait op localhost:8080
- [ ] `.env` ingevuld (admin user/pass)
- [ ] Claude Code + Playwright MCP connected
- [ ] Screenshots van slides gemaakt (voor backup)
- [ ] Openingszin ingestudeerd (30 sec, letterlijk uit je hoofd)

---

## Timing Totaal

| Slide | Onderdeel | Minuten |
|---|---|---|
| 1 | Opening | 2 |
| 2 | Probleem | 1 |
| 3 | Oplossing | 1.5 |
| 4 | Playwright | 2 |
| 5 | Agents | 2.5 |
| 6 | Demo setup | 1 |
| 7 | **LIVE DEMO** | **8-10** |
| 8 | Praktijk | 2 |
| 9 | CTA | 1.5 |
| 10 | Q&A | 5-10 |
| | **TOTAAL** | **~27-32 min** |

(Dus voor max 45 min, je hebt nog buffer voor vragen en timing-issues)
