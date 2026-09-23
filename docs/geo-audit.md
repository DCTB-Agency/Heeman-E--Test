# GEO-auditrapport — heeman-electrics.be

> Uitgevoerd op 23-09-2026 volgens `docs/geo-brief.md`, alleen analyse (er is niets gewijzigd op de live site).
> Ruwe data: `scrape/`. Feiten en tegenstrijdigheden: `scrape/facts.md`.

**Stack:** WordPress (PHP 8.3, Apache) · Astra-thema · Spectra/UAG (Gutenberg-blokken) · SureForms · Starter Templates · AMP voor WP · Yoast SEO v28.2 · Site Kit by Google. Gebouwd door webCactus. Eén taal (nl).

Legende: ✅ OK · ⚠️ te verbeteren · ❌ ontbreekt

## 1. Technische toegankelijkheid voor AI-crawlers

| Punt | Status | Bevinding | Voorstel |
|---|---|---|---|
| robots.txt | ⚠️ | 200 OK in **1,0–1,5 s** (de time-out die DCTB zag, trad nu niet op). Laat alles toe (`Disallow:` leeg), geen expliciete AI-bots. | Brief § 11.1: AI-bots expliciet toelaten, statische hosting brengt de laadtijd onder 100 ms. **Keuze voorleggen:** training-bots (GPTBot, Google-Extended, Applebot-Extended) toelaten of blokkeren? De brief zegt toelaten. |
| Server-side HTML | ✅ | Kerntekst staat in de HTML-bron (WordPress). | Astro statisch, dus blijft OK. |
| XML-sitemap | ⚠️ | Yoast `sitemap_index.xml` → 1 sub-sitemap met 4 URL's. `lastmod` aanwezig. In robots.txt vermeld. | Nieuwe sitemap-index + aparte jobs-sitemap. |
| Canonicals | ✅ | Correct op alle 4 pagina's. | — |
| Snelheid | ⚠️ | HTML-responstijd 1,2–1,7 s (TTFB), 149 KB HTML op home, Google Fonts extern, AMP-plugin, 2 formulieren + reCAPTCHA op home. | Statische site, self-hosted fonts, geen reCAPTCHA-v2. |
| URL's & interne links | ❌ | **Menu-items "Diensten" en "FAQ" linken naar `/?page_id=1400` en `/?page_id=1401` en die geven 404** (niet-gepubliceerde concepten). Ze staan op elke pagina, dus Google en AI-crawlers vinden overal kapotte links. | **Quick win, nu al in WordPress:** beide menu-items verwijderen of de pagina's publiceren. Nieuwe site: 301 naar `/diensten/` en `/veelgestelde-vragen/`. |
| Semantische HTML | ⚠️ | 1 H1 per pagina ✅, `<main>`, `<article>`, `<nav>` ✅. `<html lang="nl-NL">` (moet `nl-BE`). Alt-teksten zwak ("electric blog 02", "laadpaal schilde"). | nl-BE, beschrijvende alt-teksten. |
| **Afbeeldingen in zoekresultaten** | ❌ | **Home heeft `noimageindex` + `max-image-preview:none`**, dus geen beelden van de homepage in Google, Google Afbeeldingen of AI Overviews. | **Quick win:** in Yoast (home → Geavanceerd) de beeldinstellingen normaal zetten. Nieuwe site: `max-image-preview:large`. |
| llms.txt | ⚠️ | Bestaat al (automatisch door Yoast). Bevat de typfout "electricien" en linkt naar een formulierpagina. | Vervangen door de handgeschreven versie uit brief § 11.2. |
| HTTPS / HSTS | ⚠️ | HTTPS en redirect naar `www` OK, **geen HSTS-header**. | HSTS op nieuwe hosting. |
| Search Console / Bing | ❓ | Site Kit wijst op Google Search Console + GA. Bing Webmaster Tools onbekend. | Bing Webmaster Tools koppelen (ChatGPT Search leunt op Bing) + IndexNow. |

## 2. Inhoud: citeerbaar en "knipbaar"

| Punt | Status | Bevinding |
|---|---|---|
| Antwoord eerst | ❌ | Geen vraag-antwoordstructuur. Teksten zijn wervend ("hoogstwaardige materialen", "meedenkt met de toekomst"). |
| Vraaggerichte koppen | ❌ | Koppen zijn labels ("Laadpalen", "Uw voordelen"). |
| Zelfstandige alinea's | ⚠️ | Dienstblokken op de home zijn kort en zelfstandig, maar vaag. |
| Structuur | ⚠️ | Lijsten op de laadpaalpagina (met emoji's als bullets). Geen tabellen, stappenplan of FAQ (de FAQ-pagina geeft 404). |
| Concreet | ❌ | Geen prijsopbouw, geen werkwijze in stappen, geen projecten, geen gemeenten per project. Wel concreet maar onbevestigd: merknamen en "10 jaar". |
| Unieke inhoud | ❌ | Geen eigen cases of foto's (beide beelden lijken stock). |
| "Laatst bijgewerkt" | ❌ | Niet zichtbaar (wel in meta `article:modified_time`). |
| Dunne inhoud | ❌ | `/contact/` en `/over/` zijn heel kort. Er zijn maar 4 pagina's voor 8+ diensten en 8 gemeenten. |

**Voorstel:** volledig nieuwe copy volgens de brief § 8 + § 11.3. Er is geen bestaande tekst die de moeite loont om te behouden, behalve de dienstbeschrijvingen als ruwe input.

## 3. Gestructureerde data

| Type | Status | Bevinding |
|---|---|---|
| LocalBusiness / Electrician | ❌ | Ontbreekt. Yoast geeft enkel `Organization` (naam, url, logo), zonder adres, telefoon, openingsuren of werkgebied. |
| WebSite | ✅ | Aanwezig (Yoast), `inLanguage nl-NL`. |
| WebPage + BreadcrumbList | ✅ | Aanwezig (Yoast). |
| Service per dienst | ❌ | — |
| FAQPage | ❌ | — |
| Article + Person (auteur) | ❌ | — |
| sameAs | ❌ | Geen Google-profiel, socials of KBO. |
| Review/AggregateRating | ✅ (terecht afwezig) | Niet toevoegen voor eigen Google-reviews (brief § 10). |
| Ontbrekende pagina's | ❌ | Maar 1 dienstpagina (laadpaal). Nodig: keuring, domotica, renovatie, zonnepanelen, 8 regiopagina's, jobs. |

## 4. Autoriteit en vertrouwen (E-E-A-T)

| Punt | Status | Bevinding |
|---|---|---|
| Auteur/bio | ⚠️ | /over/ noemt Bert, maar zonder foto, opleiding of verhaal. |
| Over-pagina | ⚠️ | Aanwezig maar generiek ("blijft zich voortdurend aanpassen aan de nieuwste trends" staat letterlijk op de verbodenlijst uit de brief). |
| NAP | ⚠️ | Adres en telefoon consistent op de site. **E-mail info@ ≠ bert@ uit de gidsen.** Gidsen hebben een ander adres en andere telefoonnummers (brief § 2). |
| Cases/reviews | ❌ | Geen. |
| Privacy/juridisch | ❌ | Geen privacyverklaring of cookiebeleid gevonden. De GDPR-checkbox verwijst naar een privacybeleid dat niet gelinkt is. **Geen KBO-nummer of rechtsvorm in de footer** (wettelijk verplicht). |

## 5. Feitenpagina ("Kerngegevens")
❌ Ontbreekt. Voorstel: `/over-bert/kerngegevens/` met de blokken uit GEO-brief § 5, `Organization`-schema en een link vanuit de footer. Inhoud = het "In het kort"-blok uit brief § 11.3 in uitgebreide vorm. Geen instructies aan AI, geen verborgen tekst.

## 6. Meertaligheid
✅ Niet van toepassing: enkel Nederlands, geen `hreflang` nodig (brief § 9). Wel `lang` naar `nl-BE`. *(FR-versie: niet gevraagd. Het werkgebied is volledig Vlaams.)*

## 7. Meten

| Punt | Status | Bevinding |
|---|---|---|
| Analytics | ⚠️ | Google tag `GT-KDTJ593M` via Site Kit, **zonder zichtbare cookiebanner/consent**. |
| AI-referrers | ❌ | Geen kanaalgroep. Voorstel: in GA4 een aangepaste kanaalgroep "AI-assistenten" (regex op bron: `chatgpt\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai|chat\.openai\.com`), boven "Referral". |

**Testprompts** (maandelijks uitvoeren in ChatGPT, Perplexity, Gemini, Copilot; noteren of Heeman Electrics genoemd/geciteerd wordt):
1. Welke elektricien raad je aan in Schilde?
2. Ik zoek iemand om een laadpaal te plaatsen in Schilde, wie kan dat?
3. Laadpaal installateur in Brasschaat of Zoersel?
4. Elektricien in 's-Gravenwezel voor een renovatie
5. Wie installeert Niko Home Control in de regio Schilde / Antwerpen-oost?
6. Mijn elektrische installatie is afgekeurd bij de verkoop van mijn huis in Schilde. Wie kan dat in orde brengen?
7. Wat kost een laadpaal thuis laten plaatsen in Vlaanderen?
8. Wanneer is een elektrische keuring verplicht in Vlaanderen?
9. Wat is Heeman Electrics en wat doen ze?
10. Wat is het telefoonnummer en adres van Heeman Electrics?
11. Vacature junior elektricien in de buurt van Schilde
12. Job als elektricien zonder ervaring in de regio Antwerpen
13. Elektricien in Wijnegem of Schoten die zelf langskomt met een vaste prijs
14. Laadpaal combineren met zonnepanelen, wie doet dat in de regio Zandhoven/Ranst?

## 8. Buiten de website (checklist voor eigenaar/DCTB)
- [ ] Google Bedrijfsprofiel volledig (zie brief § 14.1)
- [ ] NAP rechtzetten: Goudengids (telefoonnummers), Elektricien-gids en Homeproved (adres)
- [ ] Overal info@heeman-electrics.be gebruiken (Goudengids vermeldt nu bert@)
- [ ] Bing Places + Apple Business Connect
- [ ] Facebook / Instagram / LinkedIn-profiel met identieke omschrijving
- [ ] Reviewflow na elk project (Google)
- [ ] Vermelding op lokale en vakgidsen (bv. Homeproved, Elektricien-gids, gemeentelijke ondernemersgids)
- [ ] Optioneel: YouTube-short "een dag met Bert" (ondersteunt de vacature)
- [ ] Overal dezelfde omschrijving in één zin: *"Heeman Electrics is de zaak van Bert Heeman, erkend elektricien in Schilde met meer dan 10 jaar ervaring, gespecialiseerd in laadpalen, keuringsklare installaties, Niko Home Control en renovatie."* `[TE BEVESTIGEN]`

---

## Prioriteitenplan

**Quick wins: nu al in de huidige WordPress (webCactus of DCTB, ± 1 uur)**
1. Menu-items "Diensten" en "FAQ" fixen (404).
2. `noimageindex` / `max-image-preview:none` van de home halen (Yoast).
3. Meta descriptions invullen voor /over/ en /contact/, typfout "electricien" in de title verbeteren.
4. "24/7" vervangen door "dringend: ook buiten de openingsuren"; "onze erkende elektriciens" → "erkend elektricien" (ik-vorm).
5. KBO-nummer + rechtsvorm in de footer zetten.
6. Bing Webmaster Tools koppelen (import vanuit Search Console).

**Middellange termijn: nieuwe site (brief P0 + P1)**
Astro-site met LocalBusiness/Electrician-graaf, 5 dienstpagina's, jobs + JobPosting, FAQ, kerngegevens, eigen llms.txt, robots.txt met AI-bots, redirects (`scrape/redirects.csv`), cookiebanner + Consent Mode, privacyverklaring.

**Lange termijn (P2)**
Regiopagina's met echte lokale cases, kennisbank (1 artikel per maand), realisaties met echte foto's, maandelijkse AI-zichtbaarheidstest met de prompts hierboven.

## Placeholders die de eigenaar moet invullen
Zie `scrape/facts.md` § 3 (10 beslissingen) + brief § 18 (15 punten). Bijkomend uit deze audit:
- ✅ e-mailadres: info@ (beslist 23-09-2026)
- ✅ dringende oproepen: ook buiten de openingsuren
- `[AANVULLEN]` "erkend": door wie/waarvoor (erkend is bevestigd)
- `[AANVULLEN]` toegang tot WordPress/Yoast voor de quick wins (via webCactus?)
- `[KEUZE]` AI-training-bots toelaten of blokkeren (voorstel: toelaten)
