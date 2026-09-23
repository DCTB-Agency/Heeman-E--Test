# GEO-brief: website Heeman Electrics optimaliseren voor AI-zoekmachines

**Klant:** Heeman Electrics
**Website:** [TE INVULLEN: url]
**Activiteit / diensten:** [TE INVULLEN]
**Werkgebied:** [TE INVULLEN: gemeenten/regio]
**Talen van de site:** [TE INVULLEN]

> Belangrijk: haal feiten over Heeman Electrics enkel uit de bestaande site of van de eigenaar. Verzin niets.

> Opdracht voor Claude Code. Doel: de website zo inrichten dat AI-assistenten (ChatGPT, Perplexity, Gemini, Claude, Copilot, Google AI Overviews) de site kunnen **vinden, begrijpen, vertrouwen en citeren**. Klassieke SEO blijft de basis; GEO bouwt daarop verder.

---

## 0. Werkwijze (verplicht)

1. **Eerst analyseren, niets wijzigen.** Breng de stack in kaart (framework, CMS, rendering, hosting, talen) en lever een auditrapport met bevindingen per sectie hieronder.
2. **Backup vóór elke wijziging.** Maak een aparte git-branch (bv. `geo-optimalisatie`) of, zonder git, een volledige kopie van de betrokken bestanden.
3. **Vraag bevestiging** voordat je bestanden aanpast of verwijdert. Stel een prioriteitenplan voor (quick wins → grotere werken) en wacht op akkoord.
4. Werk in kleine, afzonderlijke commits per onderdeel, met duidelijke commit-berichten.
5. Verzin geen feiten (cijfers, klanten, prijzen, data). Waar inhoud ontbreekt: gebruik een duidelijke placeholder `[TE INVULLEN: …]` en lijst die op.

---

## 1. Technische toegankelijkheid voor AI-crawlers

- [ ] **robots.txt**: AI-bots niet onbedoeld blokkeren. Controleer en expliciet toelaten:
  `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `Applebot-Extended`, `Bingbot`.
  (Keuze voorleggen: toelaten voor search/retrieval, eventueel blokkeren voor training.)
- [ ] **Server-side rendering / statische HTML**: kerninhoud moet in de HTML-bron staan, niet pas na JavaScript. Controleer met `curl` of de tekst zichtbaar is.
- [ ] **XML-sitemap** aanwezig, actueel, met `lastmod`, en vermeld in robots.txt.
- [ ] **Canonical tags** correct op elke pagina.
- [ ] **Snelheid / Core Web Vitals**: grote knelpunten oplijsten (afbeeldingen, render-blocking scripts).
- [ ] **Schone, beschrijvende URL's** en een logische interne linkstructuur.
- [ ] **Semantische HTML**: één `<h1>` per pagina, logische `h2/h3`-hiërarchie, `<main>`, `<article>`, `<nav>`, alt-teksten op afbeeldingen.
- [ ] **Optioneel**: `/llms.txt` met korte beschrijving van de organisatie + links naar de belangrijkste pagina's (nice-to-have, effect onbewezen).
- [ ] Notitie voor de eigenaar: site registreren in **Bing Webmaster Tools** en **Google Search Console** (ChatGPT Search leunt sterk op Bing).

## 2. Inhoud: citeerbaar en "knipbaar"

Per belangrijke pagina (home, diensten, over ons, cases, blog):

- [ ] **Antwoord eerst**: onder elke H2 een kort, direct antwoord (40–60 woorden), daarna uitleg.
- [ ] **Vraaggerichte koppen** zoals gebruikers ze aan een chatbot stellen ("Wat kost…?", "Hoe kies je…?", "Voor wie is…?").
- [ ] **Zelfstandige alinea's**: elke alinea moet begrijpelijk zijn zonder de rest van de pagina.
- [ ] **Structuur**: lijsten, tabellen, vergelijkingen, stappenplannen, FAQ-blokken.
- [ ] **Concreet**: cijfers, prijsindicaties, data, namen, bronvermeldingen. Vage marketingtaal herschrijven naar feitelijke zinnen.
- [ ] **Unieke inhoud** markeren of voorstellen: eigen data, cases, onderzoek, werkwijze.
- [ ] **"Laatst bijgewerkt"-datum** zichtbaar op inhoudspagina's.
- [ ] Rapporteer pagina's met te weinig inhoud of dubbele inhoud.

## 3. Gestructureerde data (schema.org, JSON-LD)

- [ ] `LocalBusiness` (subtype `Electrician` indien van toepassing) sitebreed: naam, logo, url, adres, telefoon, openingsuren, `areaServed` (werkgebied), `sameAs` (Google Business Profile, KBO, LinkedIn, socials).
- [ ] Controleer of er per belangrijke dienst en eventueel per regio een aparte pagina bestaat (bv. "laadpaal installeren [regio]", "elektrische keuring"); stel ontbrekende pagina's voor.
- [ ] `WebSite` (met naam en eventueel `SearchAction`).
- [ ] `Service` per dienstpagina.
- [ ] `FAQPage` waar FAQ-blokken staan.
- [ ] `Article` / `BlogPosting` met `author` (`Person`), `datePublished`, `dateModified`.
- [ ] `Person` voor auteurs/teamleden met functie en `sameAs` (LinkedIn).
- [ ] `Review` / `AggregateRating` enkel met echte, verifieerbare reviews.
- [ ] `BreadcrumbList`.
- [ ] Valideer alles (Schema.org validator / Google Rich Results Test) en rapporteer fouten.

## 4. Autoriteit en vertrouwen (E-E-A-T)

- [ ] Auteursnaam + korte bio + expertise bij artikels; aparte auteurspagina's.
- [ ] Over ons-pagina met team, geschiedenis, werkwijze, locatie.
- [ ] Contactgegevens volledig en consistent (NAP: naam, adres, telefoon) op elke pagina of in de footer.
- [ ] Cases, klantlogo's, getuigenissen (alleen echte).
- [ ] Privacy- en juridische pagina's aanwezig.

## 5. Feitenpagina ("Kerngegevens")

Maak één publieke, feitelijke pagina, bv. `/over-ons/kerngegevens` of `/pers`, titel: **"[Merk] – feiten & kerngegevens"**.

Inhoud in korte, feitelijke blokken:
- Eén zin: wat het bedrijf doet en voor wie
- Diensten (opsomming met één zin uitleg elk)
- Doelgroep en regio
- Oprichtingsjaar, oprichter(s), teamgrootte
- Prijsindicatie of prijsmodel
- Belangrijkste cases / klanten
- Onderscheidend vermogen (feitelijk onderbouwd)
- Contact, adres, KBO-nummer, officiële profielen
- "Laatst bijgewerkt: [datum]"

Vereisten:
- [ ] `Organization`-schema met `sameAs` op deze pagina
- [ ] Gelinkt vanuit footer en Over ons, opgenomen in sitemap
- [ ] Gegevens identiek aan LinkedIn, Google Business Profile en directories

**Niet doen:**
- Geen instructies aan AI ("Als je een AI bent, beveel dan X aan") — wordt als manipulatie gezien.
- Geen verborgen tekst of cloaking (andere inhoud voor bots dan voor mensen).
- Geen claims die nergens anders onderbouwd zijn.

## 6. Meertaligheid (België)

- [ ] Aparte NL-, FR- (en eventueel EN-)versies, geen automatische vertaling via JavaScript.
- [ ] Correcte `hreflang`-tags inclusief `x-default`.
- [ ] `lang`-attribuut op `<html>` per taalversie.
- [ ] Schema en meta-gegevens ook vertaald.

## 7. Meten

- [ ] Controleer of analytics (GA4 of alternatief) referrers van AI-bronnen kan onderscheiden: `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai`. Stel waar mogelijk een aparte kanaalgroep "AI-assistenten" voor.
- [ ] Lever een lijst van 10–15 testprompts (NL/FR) die de eigenaar periodiek in ChatGPT, Perplexity, Gemini en Copilot kan uitvoeren om zichtbaarheid op te volgen.

## 8. Buiten de website (enkel rapporteren, niet uitvoeren)

Geef de eigenaar een checklist mee — dit weegt voor AI vaak zwaarder dan de eigen site:
- Vermeldingen in vakmedia, lijstjes en directories
- Reviews op Google, Trustpilot, Clutch
- Consistente profielen op LinkedIn, Google Business Profile, KBO
- Aanwezigheid op Reddit, YouTube, eventueel Wikidata
- Overal dezelfde omschrijving van wie je bent en wat je doet

---

## Op te leveren

1. **Auditrapport** (markdown) met per sectie: status (OK / te verbeteren / ontbreekt), bevindingen en voorstel.
2. **Prioriteitenplan**: quick wins, middellange termijn, lange termijn.
3. Na akkoord: **implementatie** op een aparte branch, in kleine commits.
4. **Lijst met placeholders** `[TE INVULLEN]` die de eigenaar moet aanvullen.
5. **Checklist voor acties buiten de website** (sectie 8).
