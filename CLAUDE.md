# Heeman Electrics — Websitebrief voor Claude Code / Claude Design

> **Versie:** 1.0 — 22 september 2026 · **Opgesteld door:** DCTB Agency (dctb.be)
> **Doel:** heeman-electrics.be opnieuw bouwen: mooier, creatiever, sneller en vindbaar in Google (SEO), lokaal (Local SEO) én in AI-zoekmachines (GEO/AEO: ChatGPT, Perplexity, Gemini, Google AI Overviews). Met een **aparte jobpagina als communicatiefocus**: Heeman Electrics zoekt een **junior elektricien**.
> **Taal van de website:** Nederlands (Vlaanderen).

---

## 0. Zo gebruik je deze brief

**In Claude Code**
1. Maak een lege map `heeman-electrics-site/` en zet dit bestand erin als `CLAUDE.md` (of `docs/brief.md` en verwijs ernaar vanuit `CLAUDE.md`).
2. Zet het logo en de projectfoto's in `assets-in/` (originele bestanden, hoogste resolutie).
3. Start met: *"Lees CLAUDE.md volledig. Voer Fase 0 uit en toon me de resultaten voordat je verder bouwt."*
4. Werk daarna fase per fase (sectie 16). Laat Claude Code na elke fase de checklist (sectie 17) afvinken.

**In Claude Design**
Plak sectie 1–3, 5, 7 en 8 en de prompt uit sectie 16.B. Upload logo en 5–10 echte foto's. Laat eerst de homepage + jobpagina ontwerpen (desktop + mobiel), daarna de dienstpagina-template.

**Regels voor de AI die bouwt**
- Verzin **geen** feiten: geen jaartallen, aantallen projecten, certificaten, merken, reviews, premiebedragen of voordelen die niet in deze brief staan. Onbekend = placeholder `[AANVULLEN: …]` of `[TE BEVESTIGEN: …]`.
- Premies, fiscale voordelen en wettelijke regels (AREI) **nooit als feit** met bedrag/termijn. Altijd `[te controleren]` + link naar de officiële bron.
- Gebruik **geen stockfoto's van mensen** die zich voordoen als Bert of zijn klanten. Placeholder-kaders met label is beter.

## 0.1 Beslissingen na Fase 0 (23-09-2026) — gaan vóór op de rest van deze brief
- **E-mail:** info@heeman-electrics.be (overal: site, schema, formulieren, gidsen).
- **Ervaring:** "meer dan 10 jaar ervaring". De BV bestaat sinds mei 2018 (KBO, `foundingDate`), maar in de copy spreken we over de 10+ jaar ervaring.
- **Dringende herstellingen:** ook buiten de openingsuren bereikbaar voor dringende oproepen. Openingsuren ma–vr 08:00–17:30 blijven gelden voor gewone vragen. Geen "24/7" beloven zonder verdere bevestiging.
- **Erkend elektricien:** mag vermeld worden. Tone of voice blijft "ik" (Bert spreekt zelf), niet "onze elektriciens".
- **Laadpaalmerken:** EVBox, Alfen, Easee, Zaptec mogen vermeld worden.
- **Geen vaste prijzen** (beslist 23-09-2026): nergens "vaste prijs" beloven. Wel: gratis/vrijblijvende offerte, persoonlijk contact, vakkennis.
- **"Ik kom zelf" veralgemeend:** Bert doet zelf het eerste bezoek en de inschatting, de opstart en de oplevering van elk project, en de kwaliteitscontrole. Niet beloven dat Bert elk uur zelf op de werf staat (er komt een junior bij).
- **Hero-titel:** zonder "Schilde" en zonder "vaste prijs"; nadruk op persoonlijk contact en expertise. Schilde blijft in title-tag, eyebrow en subtekst (SEO).
- **Antwoordtermijn offertes:** binnen 5 werkdagen (bevestigd).
- **Formulieren:** offerte en contact via mailto naar info@; sollicitatie via Netlify Forms (hosting = Netlify).
- **Foto's:** echte foto's van Bert en zijn werk in `assets-in/bert/`; Bert is de enige persoon op de foto's.
- **Juridische naam:** AUGES BV (bevestigd). **WhatsApp** actief op 0485 19 00 27 (bevestigd).
- **"Een dag met Bert"** en de zin "Geen bedragen online: elke situatie is anders. Na het bezoek krijgt u een gratis offerte." bevestigd.
- **Geen "In het kort"-blokken** op de pagina's (wel de aparte kerngegevenspagina voor GEO). Hero-regel boven de titel: "Bert Heeman".
- **Realisaties en populaire diensten per gemeente:** ingevuld op vraag van DCTB (laadpaal in Oelegem en ronde inbouwstopcontacten in travertijn bevestigd; overige invulling goedgekeurd door DCTB).
- **Geen routelink/kaart:** klanten komen niet naar het adres.
- **Extra diensten:** nieuwbouw, video- & parlofonie, verlichtingsadvies, dringende herstellingen → eigen dienstpagina's (zie § 3, § 5, § 9).

---

## 1. Fase 0 — Eerst de huidige site scrapen (doe dit als eerste stap)

> DCTB kon de site niet automatisch uitlezen (robots.txt gaf een time-out). Claude Code draait lokaal en kan dat wél. **Die time-out is zelf een SEO-risico** — zie P0 in sectie 15.

Opdracht voor Claude Code:
1. Haal `https://www.heeman-electrics.be/robots.txt` en `/sitemap.xml` (of `/wp-sitemap.xml`, `/sitemap_index.xml`) op. Noteer statuscode + laadtijd. Time-out of 5xx? Meld het als **P0-probleem**.
2. Crawl alle interne pagina's. Minstens bekend:
   - `/` (home)
   - `/over/`
   - `/contact/`
   - `/laadpaal-installatie-in-schilde/`
3. Sla per pagina op in `scrape/`: URL, `<title>`, meta description, H1–H3, volledige tekst, afbeeldingen (src + alt), interne/externe links, bestaande structured data (JSON-LD), canonical, og-tags.
4. Download het **logo** (SVG indien mogelijk) en alle eigen projectfoto's naar `assets-in/scraped/`.
5. Haal de **merkkleuren** uit de CSS en het logo (hex-codes) en de gebruikte fonts. Schrijf ze naar `scrape/brand.json`.
6. Detecteer het CMS (WordPress? thema? page builder?) en tracking (GA4, GTM, pixel).
7. Maak `scrape/redirects.csv`: elke oude URL → nieuwe URL (301). **Geen enkele oude URL mag 404 geven.**
8. Maak `scrape/facts.md`: alle feiten over het bedrijf die op de site staan (jaartallen, diensten, merken, werkgebied, reviews, certificaten). **Vergelijk met sectie 2** en lijst tegenstrijdigheden op. Toon dit aan DCTB vóór je content schrijft.

---

## 2. Bedrijfsfeiten (NAP — Name, Address, Phone)

Deze gegevens moeten **letterlijk identiek** zijn op de site, in de structured data, op Google Bedrijfsprofiel en op alle gidsen.

| Veld | Waarde | Status |
|---|---|---|
| Handelsnaam | Heeman Electrics | bevestigd |
| Zaakvoerder | Bert Heeman | bevestigd |
| Rechtsvorm | BV | publiek (KBO) |
| Ondernemingsnummer / btw | BE 0696.715.762 | publiek (KBO) — juridische naam: **AUGES BV** (bevestigd) |
| Opgericht | mei 2018 | publiek (KBO) |
| Adres | Baron Delbekelaan 49, 2970 Schilde | bevestigd |
| Telefoon (hoofdnummer) | 0485 19 00 27 · internationaal `+32 485 19 00 27` · link `tel:+32485190027` | bevestigd |
| WhatsApp | `https://wa.me/32485190027` | `[TE BEVESTIGEN: WhatsApp actief op dit nummer]` |
| E-mail | info@heeman-electrics.be | **bevestigd 23-09-2026** (gidsen met bert@ rechtzetten) |
| Openingsuren | ma–vr 08:00–17:30 · **dringende oproepen ook buiten de openingsuren** | bevestigd 23-09-2026 — `[TE BEVESTIGEN: uren zelf]` |
| Werkgebied | Schilde, 's-Gravenwezel, Wijnegem, Schoten, Brasschaat, Zoersel, Zandhoven, Ranst (± 20 km rond Schilde) | bevestigd |
| Social media | `[AANVULLEN: Facebook, Instagram, LinkedIn URL's]` | onbekend |
| Google Bedrijfsprofiel | `[AANVULLEN: URL + aantal reviews + score]` | er zijn Google reviews |
| Ervaring | **meer dan 10 jaar ervaring** (eigen zaak sinds 2018) | bevestigd 23-09-2026 |
| Erkenning | **erkend elektricien** — mag vermeld worden | bevestigd 23-09-2026 — `[AANVULLEN: erkend door/waarvoor, voor de Over Bert-pagina]` |
| Laadpaalmerken | EVBox, Alfen, Easee, Zaptec | bevestigd 23-09-2026 |
| Overige certificaten | Niko-partner, RESCert — **niets vermelden** tot bevestiging | `[TE BEVESTIGEN]` |

**Tegenstrijdigheden gevonden op gidsen (buiten de website op te lossen, zie sectie 14):**
- Elektricien-gids en Homeproved vermelden *Swaenebeecklaan 8, 's-Gravenwezel* → moet *Baron Delbekelaan 49, Schilde* worden.
- Goudengids vermeldt *03 501 43 65* en *0494 18 89 39* → hoofdnummer moet *0485 19 00 27* zijn.

---

## 3. Positionering, doelgroepen en tone of voice

**Kernbelofte:** *Persoonlijk contact met Bert en vakkennis van een erkend elektricien, netjes afgewerkt.** Niet de goedkoopste — wel de betrouwbaarste in Schilde en de oostrand van Antwerpen.

**Doelgroepen (in volgorde):**
1. **Woningeigenaars** in Schilde en omgeving (villa's, renovaties, elektrische wagen gekocht, woning verkopen/kopen).
2. **Zakelijke klanten en syndici** (laadpalen voor bedrijven/appartementen, onderhoud, keuringsklaar maken).
3. **Kandidaten** voor de job junior elektricien (18–25 jaar typisch profiel, maar **nooit leeftijd vermelden** — anti-discriminatie).

**Prioriteit diensten:** 1) Laadpalen · 2) Installatie keuringsklaar maken (AREI) · 3) Domotica Niko Home Control · 4) Renovatie elektriciteit · 5) Zonnepanelen & thuisbatterij.
**Aanvullende diensten (toegevoegd 23-09-2026):** 6) Nieuwbouw · 7) Video- & parlofonie · 8) Verlichtingsadvies · 9) Dringende herstellingen (ook buiten de openingsuren). Deze krijgen een eigen dienstpagina, maar minder nadruk dan 1–5 op de homepage.

**Tone of voice**
- Bert spreekt zelf: **"ik"**, nooit "wij". Naar klanten: **"u"**.
- **Uitzondering jobpagina:** naar kandidaten **"je"** (natuurlijker voor starters). `[TE BEVESTIGEN door Bert — anders overal "u"]`
- Concreet en controleerbaar. Verboden: "wij passen ons voortdurend aan aan de nieuwste trends", "kwaliteit staat bij ons hoog in het vaandel", "uw one-stop-shop".
- Korte zinnen, Vlaams-Nederlands (niet Hollands: "offerte", "gsm", "keuring", "zekeringkast/verdeelkast", "camionette").

**CTA-hiërarchie (overal):** 1) **Bel Bert** · 2) **WhatsApp** · 3) **Gratis offerte**. Op de jobpagina: 1) **Solliciteer in 1 minuut** · 2) WhatsApp · 3) Bel.

---

## 4. Techniek — aanbevolen stack

**Aanbeveling: Astro (statisch) + Tailwind CSS + Keystatic (of Decap) CMS, gehost op Netlify of Cloudflare Pages.**
- Waarom: statische HTML = snelste laadtijd en beste Core Web Vitals, weinig onderhoud, geen plugin-updates, veilig, goedkoop. AI-crawlers lezen pure HTML het best (geen content die pas via JavaScript verschijnt).
- Content (diensten, regio's, realisaties, blog, jobs) als Markdown/MDX in *content collections*, zodat DCTB of Bert via het CMS kan aanpassen.
- Formulieren: Netlify Forms of Formspree (met honeypot + tijdscheck, geen reCAPTCHA-v2-puzzel). Mail naar info@heeman-electrics.be.
- Afbeeldingen: `astro:assets` → AVIF/WebP, `srcset`, expliciete `width/height`, lazy loading behalve hero.
- Fonts self-hosted (geen Google Fonts-call → GDPR + snelheid), `font-display: swap`, max. 2 families.
- JavaScript alleen voor interactieve eilanden (configurator, voor/na-slider, formulier).

**Alternatief (als Bert zelf alles wil bewerken in een vertrouwde omgeving):** WordPress + GeneratePress of Kadence (geen zware page builder) + Rank Math, WP Rocket, eigen JSON-LD. Zelfde sitemap, zelfde content, zelfde eisen.

**Niet-onderhandelbare technische eisen**
- Lighthouse mobiel ≥ 95 op Performance, Accessibility, Best Practices, SEO.
- Core Web Vitals: LCP < 2,0 s, INP < 200 ms, CLS < 0,05.
- HTTPS, HSTS, `www` → één variant (kies `https://www.heeman-electrics.be`, 301 vanaf de rest), trailing slash consistent.
- WCAG 2.2 AA: contrast, focus-states, toetsenbordnavigatie, alt-teksten, labels op formulieren, `prefers-reduced-motion` respecteren.
- 301-redirects uit `scrape/redirects.csv`.
- Eigen 404-pagina met telefoon + links naar diensten en jobs.

---

## 5. Sitemap en URL-structuur

```
/                                        Home
/diensten/                               Overzicht diensten
/diensten/laadpaal-installeren/          Laadpaal laten plaatsen (nr. 1)
/diensten/elektrische-keuring/           Installatie keuringsklaar maken (AREI)
/diensten/domotica-niko-home-control/    Domotica / Niko Home Control
/diensten/renovatie-elektriciteit/       Elektriciteit vernieuwen bij renovatie
/diensten/zonnepanelen-thuisbatterij/    Zonnepanelen & thuisbatterij
/diensten/nieuwbouw/                     Elektriciteit bij nieuwbouw
/diensten/video-parlofonie/              Video- & parlofonie
/diensten/verlichtingsadvies/            Verlichtingsadvies
/diensten/dringende-herstellingen/       Dringende herstellingen (ook buiten de openingsuren)
/regio/elektricien-schilde/              Regiopagina's (8x, unieke content!)
/regio/elektricien-s-gravenwezel/
/regio/elektricien-wijnegem/
/regio/elektricien-schoten/
/regio/elektricien-brasschaat/
/regio/elektricien-zoersel/
/regio/elektricien-zandhoven/
/regio/elektricien-ranst/
/realisaties/                            Projecten (voor/na)
/realisaties/[slug]/                     Eén project per pagina
/over-bert/                              Over Bert (was /over/)
/jobs/                                   Werken bij Heeman Electrics  ← FOCUS
/jobs/junior-elektricien/                Vacature junior elektricien  ← FOCUS
/offerte/                                Gratis offerte (formulier)
/contact/                                Contact
/veelgestelde-vragen/                    FAQ (AEO)
/kennisbank/                             Blog/gidsen (AEO/GEO)
/kennisbank/[slug]/
/privacy/  /cookies/  /algemene-voorwaarden/
/llms.txt  /robots.txt  /sitemap-index.xml
```

**Redirects vanaf huidige site (minimum):**
- `/over/` → `/over-bert/`
- `/laadpaal-installatie-in-schilde/` → `/diensten/laadpaal-installeren/` (behoud "Schilde" in H1/title van die pagina — die URL rankt al)
- `/contact/` → `/contact/` (ongewijzigd)
- Alle andere gevonden URL's → dichtstbijzijnde nieuwe pagina.

**Navigatie (desktop):** Diensten ▾ · Realisaties · Over Bert · **Jobs** (met badge "We zoeken versterking") · Contact · [knop] **Bel 0485 19 00 27**
**Navigatie (mobiel):** hamburger + **sticky onderbalk** met 3 knoppen: 📞 Bel · WhatsApp · Offerte. Op `/jobs/*` wordt de onderbalk: Solliciteer · WhatsApp · Bel.

---

## 6. JOBS — de focus van de communicatie

### 6.1 Zichtbaarheid van de vacature op de hele site
- **Aankondigingsbalk** bovenaan elke pagina (wegklikbaar, onthouden via localStorage): *"Ik zoek een junior elektricien in de regio Schilde → Bekijk de job"*.
- **Nav-item "Jobs"** met opvallende badge (accentkleur, subtiele puls — uit bij `prefers-reduced-motion`).
- **Homepage-blok** (hoog, direct na diensten): groot visueel blok "Leer het vak van Bert".
- **Footer:** "Werken bij Heeman Electrics".
- **Elke dienstpagina** onderaan een kleine teaser: *"Zin om dit zelf te leren? Ik zoek een junior elektricien."*
- **404-pagina** linkt ook naar de job.

### 6.2 `/jobs/` — Werken bij Heeman Electrics
Korte overzichtspagina: waarom werken bij een kleine, lokale elektricien; lijst van open vacatures (nu één); spontane sollicitatie mogelijk.

### 6.3 `/jobs/junior-elektricien/` — vacaturepagina (conceptcopy)

**Meta title:** `Vacature junior elektricien Schilde | Heeman Electrics`
**Meta description:** `Junior elektricien gezocht in Schilde. Vast voltijds contract, leer het vak naast Bert: laadpalen, domotica, zonnepanelen. Solliciteer in 1 minuut.`
**H1:** Junior elektricien (m/v/x) in Schilde — leer het vak naast Bert

**Hero-intro:**
> Ik ben Bert, elektricien in Schilde met meer dan 10 jaar ervaring. Het werk groeit: laadpalen, Niko Home Control, zonnepanelen, renovaties. Daarom zoek ik een junior elektricien die met mij mee op de baan gaat en het vak écht wil leren. Geen groot bedrijf, geen callcenter: jij, ik en de klant.

*(Bevestigd 23-09-2026: meer dan 10 jaar ervaring, eigen zaak sinds 2018.)*

**In het kort (feitenblok — belangrijk voor Google for Jobs én AI):**
- Functie: junior elektricien (m/v/x)
- Plaats: Schilde + werven in Schilde, 's-Gravenwezel, Wijnegem, Schoten, Brasschaat, Zoersel, Zandhoven, Ranst
- Contract: vast, voltijds
- Start: `[AANVULLEN: zo snel mogelijk / datum]`
- Solliciteren: formulier (1 minuut), WhatsApp, bellen of mail met cv

**Wat ga je doen?**
- Samen met mij laadpalen plaatsen bij particulieren en bedrijven.
- Elektrische installaties vernieuwen en keuringsklaar maken volgens het AREI.
- Domotica installeren en programmeren (Niko Home Control).
- Zonnepanelen en thuisbatterijen aansluiten.
- Stap voor stap zelfstandig werken, met klantcontact.

**Wie zoek ik?**
- Je hebt een diploma elektriciteit (TSO/BSO of gelijkwaardig). Pas afgestudeerd? Perfect.
- Je hebt rijbewijs B.
- Je spreekt goed Nederlands — je staat dagelijks bij klanten thuis.
- Je woont in de buurt van Schilde (± 30 minuten rijden).
- Je werkt netjes, bent op tijd en wil bijleren.

**Wat bied ik?**
- Een vast, voltijds contract.
- Je leert het vak van A tot Z, rechtstreeks van mij — geen anoniem nummer in een groot team.
- Afwisselend werk in de eigen regio: geen uren in de file.
- `[AANVULLEN: bedrijfswagen? opleidingen/attesten (BA4/BA5, VCA)? maaltijdcheques? gsm? werkkledij? — alleen vermelden wat Bert bevestigt]`
- Loon: niet vermeld (bespreekbaar in gesprek).

**Een dag met Bert (visuele tijdlijn, creatief element):**
07:45 vertrek · 08:15 eerste klant in Schilde: laadpaal · 12:00 middag · 13:00 renovatie in Zoersel · 16:30 werf netjes achterlaten · 17:00 naar huis. `[TE BEVESTIGEN: realistische dag door Bert]`

**Zo verloopt het:** 1) Je stuurt je gegevens (1 minuut) → 2) Ik bel je binnen `[AANVULLEN: X]` werkdagen → 3) Kennismaking + meedraaien op een werf `[TE BEVESTIGEN]` → 4) Start.

**Solliciteer-formulier (kort, mobiel-first, boven de vouw herhaald onderaan):**
- Voornaam + naam* · gsm* · e-mail · woonplaats* · diploma (keuze: TSO elektriciteit / BSO elektriciteit / ander / nog bezig) · rijbewijs B (ja/nee)* · korte motivatie (optioneel) · cv uploaden (optioneel, pdf/docx, max 5 MB) · privacy-akkoord*
- Bedankpagina `/jobs/bedankt/` (voor conversietracking).
- **WhatsApp-knop** met vooraf ingevulde tekst: `https://wa.me/32485190027?text=Hallo%20Bert%2C%20ik%20heb%20interesse%20in%20de%20job%20als%20junior%20elektricien.`
- Bellen: `tel:+32485190027` · Mail: `mailto:info@heeman-electrics.be?subject=Sollicitatie%20junior%20elektricien`

**FAQ op de jobpagina (met FAQPage-schema):**
- Moet ik ervaring hebben? — Nee, een diploma elektriciteit en motivatie volstaan.
- Moet ik een cv sturen? — Niet verplicht; naam en gsm is genoeg om te starten.
- Waar werk ik? — In Schilde en omliggende gemeenten, binnen ± 20 km.
- Welk contract? — Vast, voltijds.
- Kan ik ook als leerling of stagiair starten? — `[TE BEVESTIGEN]`

### 6.4 Google for Jobs — JobPosting structured data (verplicht)
Eén vacature per URL. JSON-LD op `/jobs/junior-elektricien/`:

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Junior elektricien (m/v/x)",
  "description": "<p>[Volledige vacaturetekst als HTML — identiek aan de zichtbare tekst]</p>",
  "datePosted": "2026-09-[AANVULLEN]",
  "validThrough": "2026-12-31T23:59",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "@id": "https://www.heeman-electrics.be/#organization",
    "name": "Heeman Electrics",
    "sameAs": "https://www.heeman-electrics.be",
    "logo": "https://www.heeman-electrics.be/logo.png"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Baron Delbekelaan 49",
      "addressLocality": "Schilde",
      "postalCode": "2970",
      "addressRegion": "Antwerpen",
      "addressCountry": "BE"
    }
  },
  "educationRequirements": { "@type": "EducationalOccupationalCredential", "credentialCategory": "high school" },
  "experienceRequirements": "no requirements",
  "directApply": true,
  "industry": "Elektrotechnische installatiewerken",
  "occupationalCategory": "47-2111.00 Electricians",
  "inLanguage": "nl-BE"
}
```
Regels:
- `baseSalary` weglaten (bewuste keuze) — Google toont de vacature wel, maar met minder rijke weergave.
- Vacature ingevuld? → pagina op `noindex` of verwijderen **en** `validThrough` in het verleden zetten. Nooit een verlopen vacature laten staan.
- Test met Google Rich Results Test. Dien de URL in via Search Console (URL-inspectie → Indexering aanvragen).

### 6.5 Verspreiding van de vacature (buiten de site — DCTB-taken)
- **VDAB:** gratis vacature plaatsen via VDAB Werkgevers; link naar de jobpagina. Wordt breed overgenomen door jobsites.
- **Google Bedrijfsprofiel:** post "Ik zoek een junior elektricien" met foto van Bert op de werf + link.
- **Social (Facebook, Instagram, LinkedIn):** reeks van 4 posts over 4 weken: (1) aankondiging, (2) "een dag met Bert" reel/carrousel, (3) voor/na-project "dit leer je bij mij", (4) laatste oproep. Optioneel lokale boost (straal 25 km rond Schilde). **Niet op leeftijd targeten** (discriminatierisico; Meta beperkt targeting bij vacature-advertenties) → gebruik locatie + interesses (bv. elektriciteit, technisch onderwijs).
- **Scholen:** mail + affiche (A4/A3 met QR-code naar `/jobs/junior-elektricien/?utm_source=school`) naar technische scholen met richting elektriciteit in de regio Schilde–Brasschaat–Zoersel–Antwerpen-oost. `[AANVULLEN: lijst scholen door DCTB]`
- **Wagen/werf:** QR-sticker "Ik zoek een collega" op de camionette. `[TE BEVESTIGEN]`
- **UTM-tags** op elke link zodat we zien welk kanaal kandidaten oplevert.

---

## 7. Design — bold & modern, logo en merkkleuren behouden

**Uitgangspunt:** logo en merkkleuren blijven (uit Fase 0 → `scrape/brand.json`). We maken het merk **krachtiger**, niet anders.

**Kleursysteem (design tokens)**
- `--brand-primary`: hoofdkleur uit het logo.
- `--brand-secondary`: tweede logokleur (indien aanwezig).
- `--ink`: bijna-zwart (bv. `#0F1215`) voor donkere secties en grote koppen.
- `--paper`: gebroken wit (bv. `#F6F5F1`).
- `--accent`: één felle "stroom"-accentkleur **afgeleid van de merkkleur** (hogere verzadiging/lichtheid) voor CTA's en de jobs-badge. Test contrast ≥ 4.5:1.
- Afwisseling donkere (ink) en lichte (paper) secties voor een moedig ritme.
- Donkere modus niet nodig; wel kleurcontrast AA overal.

**Typografie:** één karaktervolle display-font voor koppen (bv. Space Grotesk, Archivo of Clash Display — self-hosted) + één rustige tekstfont (bv. Inter). Grote koppen (clamp 2.5–5rem), strakke letterafstand.

**Creatieve concepten (kies en combineer):**
1. **"De stroomlijn"** — een dunne lijn in accentkleur die als een kabel door de pagina loopt en secties verbindt; tekent zich subtiel bij scrollen (SVG stroke-dashoffset). Uit bij reduced motion.
2. **Echte mensen, echte werven** — foto's van Bert en projecten groot, licht korrelig, geen stock. Duotone-behandeling in merkkleur voor sfeerbeelden.
3. **Voor/na-slider** op realisaties (verdeelkast vóór en ná, laadpaal-plaatsing).
4. **Laadpaal-keuzehulp** (3–4 vragen: woning/bedrijf · 1- of 3-fasig aansluiting · zonnepanelen ja/nee · slim laden gewenst) → uitkomst + "Vraag uw gratis offerte aan" (vult offerteformulier voor). Geen prijzen tonen tenzij Bert ze aanlevert.
5. **Werkgebied-kaart** als eigen SVG (8 gemeenten, klikbaar naar regiopagina's) — geen zware Google Maps-embed op de home.
6. **Grote feitencijfers** in display-font — **alleen met echte cijfers** `[AANVULLEN: aantal laadpalen geplaatst, jaren ervaring, Google-score]`.
7. **Jobs-blok** in contrasterende accentkleur, met portret van Bert en de tijdlijn "een dag met Bert".
8. Micro-interacties: knoppen met korte "vonk"-hover, geen gimmicks die laadtijd kosten.

**Componentenlijst:** header + aankondigingsbalk, hero, dienstkaarten, USP-rij (persoonlijk contact · vakkennis · netjes), review-slider (Google reviews, met link naar profiel), realisatiekaarten, voor/na-slider, keuzehulp, werkgebied-kaart, FAQ-accordeon, CTA-band, jobs-blok, formulier, sticky mobiele onderbalk, footer met NAP + KBO.

---

## 8. Paginacontent (structuur + kernboodschap)

### Home `/`
- **H1:** Elektricien met 10+ jaar vakkennis in uw regio. (Schilde staat in eyebrow, sub en title-tag)
- Sub: Laadpalen, keuringsklare installaties, Niko Home Control en renovatie in Schilde, 's-Gravenwezel, Wijnegem, Schoten, Brasschaat, Zoersel, Zandhoven en Ranst.
- CTA's: Bel 0485 19 00 27 · WhatsApp · Gratis offerte
- USP-rij: **Persoonlijk contact** (Bert doet bezoek, inschatting, opstart, oplevering en kwaliteitscontrole) · **Vakkennis** · **Netjes afgewerkt**
- Diensten (laadpaal groot uitgelicht, dan de rest)
- Blok "In het kort" (entiteitsfeiten voor AI — zie 11.3)
- Reviews (Google)
- Realisaties (3 laatste)
- **Jobs-blok**
- Werkgebied-kaart
- FAQ (5 vragen)
- CTA-band

### Dienstpagina's — vaste template
1. H1 met dienst + Schilde (bv. "Laadpaal laten plaatsen in Schilde en omgeving")
2. **Antwoord-eerst-alinea** (40–60 woorden die de hoofdvraag direct beantwoordt — AEO)
3. Voor wie / wanneer
4. Werkwijze in stappen (bezoek → offerte → plaatsing → oplevering/keuring)
5. Wat zit er in de prijs (zonder bedragen tenzij aangeleverd)
6. Premies/fiscaal: kader met `[te controleren]` + link naar officiële bron
7. Realisaties van deze dienst
8. FAQ (5–8 vragen, FAQPage-schema)
9. CTA + jobs-teaser

**Specifieke aandachtspunten:**
- **Laadpaal:** thuisladen, bedrijven/syndici (laadpunten in gemeenschappelijke parking), slim laden met zonnepanelen, keuring van de laadpaal. Merken: EVBox, Alfen, Easee, Zaptec (bevestigd). Fiscale aftrek voor bedrijven → `[te controleren]`, bron: FOD Financiën. Premies → `[te controleren]`, bron: Vlaanderen.be / Energiesparen.
- **Elektrische keuring:** eerlijk zijn — **de keuring zelf gebeurt door een erkend keuringsorganisme**; Bert maakt de installatie keuringsklaar, zet niet-conformiteiten recht en maakt schema's. Wanneer keuring verplicht is (verkoop woning, nieuwe installatie, grote wijziging) → `[te controleren]`, bron: FOD Economie (AREI).
- **Niko Home Control:** nieuwbouw én renovatie, uitbreiden van bestaande installatie, programmeren. Geen "officieel partner" tenzij bevestigd.
- **Renovatie:** verdeelkast vernieuwen, bekabeling, aarding, differentieelschakelaars, schema's.
- **Zonnepanelen & thuisbatterij:** `[TE BEVESTIGEN: plaatst Bert zelf of enkel elektrische aansluiting? RESCert?]` — tot bevestiging formuleren als "aansluiten en integreren met uw installatie en laadpaal".

### Regiopagina's (8x) — géén doorway pages
Elke pagina **minstens 50% unieke inhoud**: 
- H1 "Elektricien in [gemeente]"
- Welke diensten daar het meest gevraagd worden `[AANVULLEN door Bert]`
- 1–3 echte realisaties in die gemeente (foto + korte case) `[AANVULLEN]`
- Een review van een klant uit die gemeente (indien beschikbaar)
- Praktisch: afstand/reistijd vanaf Schilde, deelgemeenten (bv. Zoersel: Halle, Sint-Antonius; Zandhoven: Pulderbos, Pulle, Massenhoven, Viersel; Ranst: Broechem, Emblem, Oelegem; Brasschaat: Maria-ter-Heide; Schilde: 's-Gravenwezel)
- Interne links naar de 5 dienstpagina's en naar de jobpagina
- Alleen publiceren als er echte lokale content is; anders eerst Schilde, 's-Gravenwezel, Wijnegem, Schoten.

### Over Bert `/over-bert/`
Echte foto, persoonlijk verhaal in "ik", opleiding/ervaring `[AANVULLEN]`, werkwijze, waarom zelfstandig, link naar jobs ("Ik zoek iemand die dit vak met dezelfde zorg wil doen"). Person-schema.

### Realisaties
Per project: titel met gemeente ("Laadpaal met slim laden in Brasschaat"), voor/na-foto's, korte beschrijving (situatie → oplossing → resultaat), dienst-tag, gemeente-tag. Min. 6 bij lancering `[AANVULLEN]`.

### Offerte `/offerte/`
Formulier: dienst (keuze) · gemeente (keuze uit 8 + andere) · korte omschrijving · foto's uploaden (bv. verdeelkast) · naam · gsm · e-mail · voorkeur contact (bellen/WhatsApp/mail). Belofte: "Ik antwoord binnen `[AANVULLEN]` werkdag(en)".

---

## 9. Metadata per pagina (titles ≤ 60 tekens, descriptions ≤ 155 tekens)

| URL | Title | Meta description |
|---|---|---|
| `/` | Elektricien Schilde · Laadpalen & domotica · Heeman | Erkend elektricien in Schilde: laadpalen, Niko Home Control en keuringsklare installaties. Persoonlijk contact, gratis offerte. Bel 0485 19 00 27. |
| `/diensten/` | Diensten elektricien Schilde en omgeving · Heeman | Laadpalen, keuringsklare installaties, domotica, renovatie en zonnepanelen in Schilde, Brasschaat, Zoersel en omgeving. Vraag een gratis offerte. |
| `/diensten/laadpaal-installeren/` | Laadpaal laten plaatsen in Schilde · Heeman Electrics | Laadpaal thuis of voor uw bedrijf in Schilde en omgeving. Persoonlijk contact, vakkundig en netjes geplaatst. Gratis offerte of bel 0485 19 00 27. |
| `/diensten/elektrische-keuring/` | Installatie keuringsklaar maken · Elektricien Schilde | Woning verkopen of installatie afgekeurd? Ik breng uw elektrische installatie in orde volgens het AREI, in Schilde en omgeving. Gratis offerte. |
| `/diensten/domotica-niko-home-control/` | Niko Home Control installeren in Schilde · Heeman | Domotica met Niko Home Control bij nieuwbouw of renovatie in Schilde en omgeving. Installatie, uitbreiding en programmatie. Vraag een offerte. |
| `/diensten/renovatie-elektriciteit/` | Elektriciteit vernieuwen bij renovatie · Schilde | Nieuwe verdeelkast, bekabeling of volledige renovatie van uw elektriciteit in Schilde en omgeving. Netjes en keuringsklaar afgewerkt. |
| `/diensten/zonnepanelen-thuisbatterij/` | Zonnepanelen & thuisbatterij aansluiten · Schilde | Zonnepanelen en thuisbatterij slim koppelen aan uw installatie en laadpaal, in Schilde en omgeving. Vraag vrijblijvend advies en een offerte. |
| `/diensten/nieuwbouw/` | Elektriciteit nieuwbouw in Schilde · Heeman Electrics | Volledige elektrische installatie voor uw nieuwbouw in Schilde en omgeving, van plan tot keuring. Erkend elektricien, gratis offerte. |
| `/diensten/video-parlofonie/` | Video- & parlofonie plaatsen in Schilde · Heeman | Videofoon of parlofoon laten plaatsen in Schilde en omgeving. Zien wie er aanbelt en toegang eenvoudig beheren. Vraag een offerte. |
| `/diensten/verlichtingsadvies/` | Verlichtingsadvies en -installatie · Schilde · Heeman | Verlichting die sfeer, functie en een laag verbruik combineert. Advies en plaatsing in Schilde en omgeving. Vraag vrijblijvend advies. |
| `/diensten/dringende-herstellingen/` | Dringende elektriciteitspanne Schilde · Heeman | Stroompanne of dringend elektrisch probleem in Schilde en omgeving? Ook buiten de openingsuren bereikbaar. Bel 0485 19 00 27. |
| `/regio/elektricien-schilde/` | Elektricien in Schilde · Heeman Electrics | Uw elektricien in Schilde: laadpalen, keuringsklaar maken, Niko Home Control en renovatie. Persoonlijk contact. Bel 0485 19 00 27. |
| `/regio/elektricien-s-gravenwezel/` | Elektricien in 's-Gravenwezel · Heeman Electrics | Elektricien in 's-Gravenwezel voor laadpalen, domotica, renovatie en keuringsklare installaties. Om de hoek, persoonlijk contact. Bel 0485 19 00 27. |
| `/regio/elektricien-wijnegem/` | Elektricien in Wijnegem · Heeman Electrics | Elektricien in Wijnegem voor laadpalen, Niko Home Control en renovatie. Persoonlijk contact en vakkundig werk. Vraag uw gratis offerte. |
| `/regio/elektricien-schoten/` | Elektricien in Schoten · Heeman Electrics | Elektricien in Schoten: laadpaal plaatsen, installatie keuringsklaar maken of domotica. Netjes werk, gratis offerte. Bel 0485 19 00 27. |
| `/regio/elektricien-brasschaat/` | Elektricien in Brasschaat · Heeman Electrics | Elektricien in Brasschaat voor laadpalen, Niko Home Control, renovatie en zonnepanelen. Persoonlijk contact. Vraag een gratis offerte. |
| `/regio/elektricien-zoersel/` | Elektricien in Zoersel · Heeman Electrics | Elektricien in Zoersel, Halle en Sint-Antonius: laadpalen, domotica en renovatie. Vraag een offerte. Bel 0485 19 00 27. |
| `/regio/elektricien-zandhoven/` | Elektricien in Zandhoven · Heeman Electrics | Elektricien in Zandhoven en deelgemeenten: laadpalen, keuringsklare installaties en Niko Home Control. Gratis offerte. Vraag een offerte. |
| `/regio/elektricien-ranst/` | Elektricien in Ranst en Oelegem · Heeman Electrics | Elektricien in Ranst, Oelegem, Broechem en Emblem voor laadpalen, domotica en renovatie. Persoonlijk contact. Bel 0485 19 00 27. |
| `/realisaties/` | Realisaties elektricien Schilde · Heeman Electrics | Bekijk laadpalen, verdeelkasten en domotica-projecten die ik plaatste in Schilde en omgeving. Echte foto's, voor en na. |
| `/over-bert/` | Over Bert Heeman · Elektricien in Schilde | Ik ben Bert Heeman, erkend elektricien in Schilde met meer dan 10 jaar ervaring. Persoonlijk contact, net werk. Maak kennis. |
| `/jobs/` | Jobs bij Heeman Electrics · Elektricien Schilde | Werken bij een lokale elektricien in Schilde? Ik zoek een junior elektricien met een vast voltijds contract. Bekijk de vacature. |
| `/jobs/junior-elektricien/` | Vacature junior elektricien Schilde · Heeman | Junior elektricien gezocht in Schilde. Vast voltijds contract, leer het vak naast Bert: laadpalen, domotica, zonnepanelen. Solliciteer in 1 minuut. |
| `/offerte/` | Gratis offerte elektricien Schilde · Heeman Electrics | Vraag gratis een offerte aan voor uw laadpaal, renovatie, domotica of keuringsklare installatie in Schilde en omgeving. |
| `/contact/` | Contact · Heeman Electrics, elektricien Schilde | Bel 0485 19 00 27, stuur een WhatsApp of mail info@heeman-electrics.be. Baron Delbekelaan 49, 2970 Schilde. |
| `/veelgestelde-vragen/` | Veelgestelde vragen elektricien · Heeman Electrics | Antwoorden op vragen over laadpalen, keuring, domotica en renovatie van uw elektrische installatie in Schilde en omgeving. |
| `/kennisbank/` | Kennisbank elektriciteit · Heeman Electrics Schilde | Heldere uitleg over laadpalen, de elektrische keuring, Niko Home Control en renovatie. Geschreven door Bert, elektricien in Schilde. |

**Extra metadata op elke pagina:**
- `<html lang="nl-BE">`, `<link rel="canonical">` (absolute URL), `<meta name="robots" content="index,follow,max-image-preview:large">`
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630, per pagina eigen beeld met logo), `og:type`, `og:url`, `og:locale=nl_BE`, `og:site_name=Heeman Electrics`
- Twitter card `summary_large_image`
- `<meta name="theme-color">` = merkkleur, favicon-set (SVG + 180px apple-touch + manifest)
- `<meta name="geo.region" content="BE-VAN">`, `<meta name="geo.placename" content="Schilde">` (klein voordeel, kost niets)
- Geen `hreflang` nodig (enkel nl-BE).
- Titels en descriptions in het CMS **per pagina bewerkbaar** met teller.

---

## 10. Structured data (JSON-LD) — één samenhangende graaf

Op **elke** pagina (in `<head>`), met vaste `@id`'s zodat alles aan elkaar hangt:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.heeman-electrics.be/#organization",
      "name": "Heeman Electrics",
      "url": "https://www.heeman-electrics.be/",
      "logo": "https://www.heeman-electrics.be/logo.png",
      "image": "https://www.heeman-electrics.be/og/home.jpg",
      "telephone": "+32485190027",
      "email": "info@heeman-electrics.be",
      "vatID": "BE0696715762",
      "foundingDate": "2018-05",
      "founder": { "@id": "https://www.heeman-electrics.be/over-bert/#bert" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Baron Delbekelaan 49",
        "postalCode": "2970",
        "addressLocality": "Schilde",
        "addressRegion": "Antwerpen",
        "addressCountry": "BE"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "[AANVULLEN]", "longitude": "[AANVULLEN]" },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00", "closes": "17:30"
      }],
      "areaServed": ["Schilde","'s-Gravenwezel","Wijnegem","Schoten","Brasschaat","Zoersel","Zandhoven","Ranst"].map(n => ({"@type":"City","name":n})),
      "sameAs": ["[Google Bedrijfsprofiel URL]","[Facebook]","[Instagram]","[LinkedIn]"],
      "knowsAbout": ["laadpaal installatie","EVBox","Alfen","Easee","Zaptec","nieuwbouw elektriciteit","videofonie","parlofonie","verlichting","dringende herstellingen","AREI","elektrische keuring","Niko Home Control","domotica","zonnepanelen","thuisbatterij","renovatie elektriciteit"],
      "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Diensten", "itemListElement": [ "…één Offer/Service per dienstpagina…" ] }
    },
    { "@type": "WebSite", "@id": "https://www.heeman-electrics.be/#website", "url": "https://www.heeman-electrics.be/", "name": "Heeman Electrics", "inLanguage": "nl-BE", "publisher": { "@id": "https://www.heeman-electrics.be/#organization" } },
    { "@type": "Person", "@id": "https://www.heeman-electrics.be/over-bert/#bert", "name": "Bert Heeman", "jobTitle": "Elektricien en zaakvoerder", "worksFor": { "@id": "https://www.heeman-electrics.be/#organization" } }
  ]
}
```
(`areaServed` uitschrijven als echte JSON-array — de `.map` is enkel notatie.)

**Per paginatype extra:**
- Dienstpagina: `Service` (`serviceType`, `provider` → #organization, `areaServed`) + `FAQPage` + `BreadcrumbList`.
- Regiopagina: `Service` met `areaServed` = die gemeente + `BreadcrumbList`.
- Realisatie: `CreativeWork` of `Article` met `image`, `locationCreated`.
- Kennisbank: `Article` met `author` → #bert, `datePublished`, `dateModified`.
- Jobpagina: `JobPosting` (sectie 6.4) + `FAQPage` + `BreadcrumbList`.

**Let op:**
- **Geen `AggregateRating`/`Review`-markup van eigen Google reviews** op de eigen site — Google beschouwt dat als "self-serving" en toont er geen sterren voor; risico op handmatige actie. Reviews wel zichtbaar tonen + linken naar het Google-profiel.
- FAQ-rich results toont Google nog nauwelijks, maar FAQPage-markup blijft nuttig voor AI-antwoordmachines.
- Valideer alles met Google Rich Results Test en validator.schema.org.

---

## 11. GEO & AEO — vindbaar in AI-zoekmachines

### 11.1 Toegang voor crawlers — `robots.txt`
```
User-agent: *
Allow: /
Disallow: /jobs/bedankt/
Disallow: /offerte/bedankt/

# AI-zoekmachines expliciet toelaten
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: https://www.heeman-electrics.be/sitemap-index.xml
```
**robots.txt moet binnen 1 s laden met status 200.** (Nu time-out → sommige crawlers slaan de hele site over.)

### 11.2 `/llms.txt`
Markdown-samenvatting voor AI-agents:
```
# Heeman Electrics
> Zelfstandig elektricien in Schilde (provincie Antwerpen, België). Zaakvoerder: Bert Heeman, erkend elektricien met meer dan 10 jaar ervaring; eigen zaak sinds 2018. Werkgebied: Schilde, 's-Gravenwezel, Wijnegem, Schoten, Brasschaat, Zoersel, Zandhoven, Ranst.

Contact: +32 485 19 00 27 · info@heeman-electrics.be · Baron Delbekelaan 49, 2970 Schilde

## Diensten
- [Laadpaal installeren](https://www.heeman-electrics.be/diensten/laadpaal-installeren/)
- [Installatie keuringsklaar maken (AREI)](https://www.heeman-electrics.be/diensten/elektrische-keuring/)
- [Domotica Niko Home Control](https://www.heeman-electrics.be/diensten/domotica-niko-home-control/)
- [Renovatie elektriciteit](https://www.heeman-electrics.be/diensten/renovatie-elektriciteit/)
- [Zonnepanelen en thuisbatterij](https://www.heeman-electrics.be/diensten/zonnepanelen-thuisbatterij/)
- [Nieuwbouw](https://www.heeman-electrics.be/diensten/nieuwbouw/)
- [Video- & parlofonie](https://www.heeman-electrics.be/diensten/video-parlofonie/)
- [Verlichtingsadvies](https://www.heeman-electrics.be/diensten/verlichtingsadvies/)
- [Dringende herstellingen (ook buiten de openingsuren)](https://www.heeman-electrics.be/diensten/dringende-herstellingen/)

## Jobs
- [Vacature junior elektricien (vast, voltijds)](https://www.heeman-electrics.be/jobs/junior-elektricien/)

## Meer
- [Veelgestelde vragen](https://www.heeman-electrics.be/veelgestelde-vragen/)
- [Over Bert](https://www.heeman-electrics.be/over-bert/)
```

### 11.3 Content die AI graag citeert
- **"In het kort"-blok** op home, over-bert en jobs: 5–7 feitelijke bullets (wie, wat, waar, sinds wanneer, hoe contacteren). Zelfde feiten, overal identiek.
- **Antwoord eerst:** elke H2 als vraag ("Hoeveel kost een laadpaal plaatsen?", "Wanneer is een elektrische keuring verplicht?"), direct gevolgd door een antwoord van 40–60 woorden, daarna detail.
- **Eigen, controleerbare info** die concurrenten niet hebben: werkwijze in stappen, wat er in een offerte zit, echte projecten per gemeente, foto's met beschrijvende bestandsnamen (`laadpaal-garage-brasschaat.jpg`) en alt-teksten.
- **Bronvermelding** naar officiële sites (FOD Economie, Vlaanderen.be, Fluvius, FOD Financiën) bij regels en premies.
- **Auteur + datum:** "Geschreven door Bert Heeman, elektricien in Schilde · bijgewerkt op [datum]" op elke kennisbankpagina en dienstpagina.
- **Tabellen en lijsten** (AI extraheert die makkelijk), geen tekst in afbeeldingen.
- **Consistente entiteit:** exact dezelfde naam, adres, telefoon, beschrijving op site, Google, Bing Places, Apple Business Connect, Facebook, Goudengids, Homeproved, Elektricien-gids.

### 11.4 Kennisbank — eerste 10 artikels (AEO-vragen)
1. Hoeveel kost een laadpaal thuis laten plaatsen? (opbouw van de prijs, geen vaste bedragen tenzij Bert ze geeft)
2. Laadpaal en zonnepanelen combineren: hoe werkt slim laden?
3. Laadpaal voor een appartementsgebouw: wat moet de syndicus weten?
4. Wanneer is een elektrische keuring verplicht in Vlaanderen? `[te controleren]`
5. Installatie afgekeurd bij verkoop van uw woning: wat nu? `[te controleren]`
6. Wat kost Niko Home Control en wat kan het?
7. Bestaande Niko-installatie uitbreiden naar Home Control: kan dat?
8. Verdeelkast vernieuwen: wanneer is het tijd?
9. Thuisbatterij: wanneer is het zinvol? `[te controleren]`
10. Elektricien worden: wat leer je als junior? (ondersteunt de vacature)

---

## 12. Lokale SEO — zoekwoorden per pagina

| Pagina | Hoofdzoekwoord | Secundair |
|---|---|---|
| Home | elektricien schilde | elektricien 's-gravenwezel, elektricien oostrand antwerpen |
| Laadpaal | laadpaal plaatsen schilde | laadpaal installateur schilde, laadpaal thuis, laadpaal bedrijf, laadpaal appartement, laadpaal brasschaat/zoersel/schoten |
| Keuring | elektrische keuring woning | installatie keuringsklaar maken, AREI keuring verkoop woning, elektrische installatie afgekeurd |
| Domotica | niko home control installateur | domotica elektricien schilde, niko home control renovatie |
| Renovatie | elektriciteit vernieuwen | verdeelkast vervangen, elektrische installatie renovatie |
| Zonnepanelen | thuisbatterij plaatsen | zonnepanelen aansluiten, laadpaal zonnepanelen |
| Regio's | elektricien [gemeente] | laadpaal [gemeente], elektricien in de buurt |
| Jobs | vacature elektricien schilde | junior elektricien job, elektricien job antwerpen, job elektricien zonder ervaring, elektricien vacature brasschaat/zoersel |

**On-page regels:** hoofdzoekwoord in title, H1, eerste 100 woorden, URL, één alt-tekst. Natuurlijk schrijven; geen keyword stuffing. Interne links met beschrijvende ankertekst (niet "klik hier").

**XML-sitemap:** automatisch, met `lastmod`. Aparte sitemap voor jobs zodat die snel opnieuw gecrawld wordt. Indienen in Google Search Console én Bing Webmaster Tools. **IndexNow** activeren (Bing/ChatGPT-zoekopdrachten pikken wijzigingen sneller op).

---

## 13. Tracking, privacy en wettelijke vermeldingen

- **GA4 via Google Tag Manager** met **Consent Mode v2** en een Nederlandstalige cookiebanner (weigeren even makkelijk als aanvaarden — Belgische GBA-richtlijnen).
- **Conversies (events):** `click_to_call`, `whatsapp_click`, `offerte_submit`, `job_apply_submit`, `job_whatsapp_click`, `job_call_click`, `configurator_complete`. Bedankpagina's voor formulieren.
- Search Console + Bing Webmaster Tools koppelen. Optioneel Microsoft Clarity (alleen na consent).
- **Footer (wettelijk verplicht in België):** handelsnaam + juridische naam, rechtsvorm, adres, ondernemingsnummer BE 0696.715.762, e-mail, telefoon.
- **Privacyverklaring** vermeldt ook sollicitatiegegevens: doel, bewaartermijn `[AANVULLEN: bv. 6 maanden na afloop procedure]`, recht op verwijdering.
- Uploads (cv, foto's) niet publiek bereikbaar; enkel per mail doorsturen.

---

## 14. Buiten de website (DCTB-actielijst — zelfde prioriteit als de bouw)

1. **Google Bedrijfsprofiel:** categorie "Elektricien" (primair) + "Laadpaalinstallateur" e.a. (secundair); alle diensten; werkgebied 8 gemeenten; openingsuren; 20+ echte foto's; wekelijkse post; vacature-post; reviews beantwoorden.
2. **NAP rechtzetten:** Goudengids (telefoonnummers), Elektricien-gids en Homeproved (adres Swaenebeecklaan → Baron Delbekelaan 49, Schilde).
3. **Bing Places** en **Apple Business Connect** aanmaken (voedt ChatGPT/Copilot resp. Apple Maps/Siri).
4. **Reviewflow:** na elk project WhatsApp-bericht met directe reviewlink.
5. **VDAB-vacature** + scholenmailing + social reeks (sectie 6.5).
6. Facebook/Instagram/LinkedIn-profielen met dezelfde beschrijving en link naar site.

---

## 15. Prioriteiten

**P0 — vóór/bij lancering**
- robots.txt time-out oplossen (of verdwijnt met nieuwe hosting)
- 301-redirects, NAP overal gelijk, footer met KBO
- Home, laadpaal, keuring, contact/offerte, **jobs + vacature met JobPosting**
- Structured data, sitemap, Search Console, Bing, GA4 + consent
- Sticky mobiele belbalk, aankondigingsbalk vacature

**P1 — binnen 30 dagen**
- Domotica, renovatie, zonnepanelen
- Regiopagina's Schilde, 's-Gravenwezel, Wijnegem, Schoten
- Realisaties (min. 6), FAQ, llms.txt, Google Bedrijfsprofiel-optimalisatie, NAP-cleanup gidsen

**P2 — 30–90 dagen**
- Regiopagina's Brasschaat, Zoersel, Zandhoven, Ranst
- Laadpaal-keuzehulp, voor/na-slider
- 1 kennisbankartikel per maand (lijst 11.4)

---

## 16. Bouwprompts

### 16.A Claude Code — fase per fase
1. *"Voer Fase 0 uit (sectie 1). Toon me `scrape/facts.md`, `scrape/brand.json` en `scrape/redirects.csv` en de lijst tegenstrijdigheden. Bouw nog niets."*
2. *"Zet een Astro + Tailwind-project op volgens sectie 4. Maak design tokens uit `scrape/brand.json` volgens sectie 7. Bouw de layout: header met aankondigingsbalk voor de vacature, footer met NAP en KBO, sticky mobiele onderbalk. Toon me een preview."*
3. *"Bouw de homepage (sectie 8) met alle componenten uit sectie 7. Gebruik placeholders voor wat ontbreekt. Creatief: de stroomlijn en het jobs-blok."*
4. *"Bouw `/jobs/` en `/jobs/junior-elektricien/` volledig volgens sectie 6, inclusief formulier, WhatsApp-link, FAQ en JobPosting-JSON-LD. Valideer de JSON-LD."*
5. *"Bouw de dienstpagina-template en de 5 dienstpagina's (sectie 8), met metadata uit sectie 9 en schema uit sectie 10."*
6. *"Bouw regio-, realisatie-, over-bert-, offerte-, contact-, FAQ- en kennisbanktemplates. Regiopagina's alleen publiceren met echte lokale content."*
7. *"Implementeer SEO/GEO: metadata (sectie 9), JSON-LD-graaf (sectie 10), robots.txt en llms.txt (sectie 11), sitemaps, redirects, OG-afbeeldingen per pagina, 404."*
8. *"Implementeer tracking en consent (sectie 13). Voer daarna de volledige checklist van sectie 17 uit en rapporteer wat groen/rood is."*

### 16.B Claude Design — één prompt
> Ontwerp een bold en moderne website voor Heeman Electrics, een zelfstandige elektricien in Schilde (België). Behoud het bestaande logo en de merkkleuren (bijgevoegd); maak het merk krachtiger met donkere 'ink'-secties, grote display-typografie en één felle accentkleur afgeleid van de merkkleur. Toon: persoonlijk ("ik", Bert spreekt zelf), no-nonsense, lokaal. Visueel concept: "de stroomlijn" — een dunne kabellijn die secties verbindt. Gebruik echte foto's (bijgevoegd), geen stock. Ontwerp eerst (1) de homepage en (2) de vacaturepagina "Junior elektricien in Schilde — leer het vak naast Bert", desktop én mobiel, met sticky mobiele onderbalk (Bel · WhatsApp · Offerte / Solliciteer). De vacature moet overal op de site opvallen (aankondigingsbalk, nav-badge "Jobs", groot homepage-blok). Volg de structuur en teksten uit de brief (secties 5–8). Alles in het Nederlands (Vlaanderen).

---

## 17. Acceptatiechecklist (Claude Code vinkt af vóór livegang)

**Content & feiten**
- [ ] Geen verzonnen feiten; alle `[AANVULLEN]`/`[TE BEVESTIGEN]` opgelijst voor DCTB
- [ ] "ik"/"u" overal (jobs: "je" — bevestigd door Bert?)
- [ ] Premies/AREI als `[te controleren]` met officiële bron
- [ ] NAP identiek op elke pagina, in schema en footer

**SEO**
- [ ] Unieke title (≤ 60) en description (≤ 155) op elke pagina
- [ ] Eén H1 per pagina met zoekwoord + gemeente
- [ ] Canonicals, OG, sitemap, robots.txt (200, < 1 s), llms.txt
- [ ] Alle oude URL's 301 → nieuwe, geen 404's, geen redirect-ketens
- [ ] Alt-teksten beschrijvend, bestandsnamen met zoekwoord
- [ ] Interne links: elke dienst ↔ regio's ↔ realisaties ↔ jobs

**Structured data**
- [ ] Electrician/LocalBusiness-graaf zonder fouten
- [ ] JobPosting geldig in Rich Results Test
- [ ] Geen self-serving AggregateRating

**Jobs**
- [ ] Aankondigingsbalk, nav-badge, homepage-blok, footer-link, teasers op dienstpagina's
- [ ] Formulier werkt op mobiel, mail komt aan bij Bert, bedankpagina + event
- [ ] WhatsApp-link met vooringevulde tekst werkt
- [ ] Vacature ingediend in Search Console; VDAB-vacature linkt naar de pagina

**Kwaliteit**
- [ ] Lighthouse mobiel ≥ 95 (4x), CWV binnen norm
- [ ] WCAG 2.2 AA (axe zonder kritieke fouten), reduced motion gerespecteerd
- [ ] Getest op iPhone Safari, Android Chrome, desktop Chrome/Edge/Safari
- [ ] Consent Mode v2 werkt; geen tracking vóór toestemming
- [ ] Privacy-, cookie-pagina en footer met KBO online

---

## 18. Nog aan te leveren / te bevestigen door Bert

1. Logo in origineel formaat (SVG/AI/EPS) + eventuele huisstijlgids
2. 10–30 eigen projectfoto's (liefst voor/na, met gemeente) + 3–5 foto's van Bert aan het werk + portret
3. Google Bedrijfsprofiel-link, aantal reviews en score; 3–5 reviews om te tonen
4. Social media-links
5. Certificaten/partnerschappen (Niko, RESCert) — tot dan niets vermelden · erkend: ✅ (door wie? `[AANVULLEN]`)
6. ~~Welke laadpaalmerken plaatst Bert?~~ ✅ EVBox, Alfen, Easee, Zaptec
7. Zonnepanelen: zelf plaatsen of enkel aansluiten?
8. ~~Werkt Bert met onderaannemers?~~ ✅ "Ik kom zelf" veralgemeend: Bert doet bezoek, inschatting, opstart, oplevering en kwaliteitscontrole
9. ~~Jaren ervaring~~ ✅ meer dan 10 jaar · opleiding `[AANVULLEN]`
10. Aantal geplaatste laadpalen/projecten (voor feitencijfers)
11. Openingsuren bevestigen (dringend: ook erbuiten ✅); WhatsApp actief op 0485 19 00 27?
12. **Vacature:** startdatum, extra voordelen (wagen, opleidingen, maaltijdcheques, werkkledij, gsm), antwoordtermijn, meedraaidag, leerling/stage mogelijk?, "je" of "u" op de jobpagina
13. ~~Juridische naam van de BV~~ ✅ AUGES BV
14. ~~Antwoordtermijn voor offertes~~ ✅ binnen 5 werkdagen
15. Toegang tot huidige hosting/domein (DNS), Google Search Console, GA4, Google Bedrijfsprofiel

---

*Bronnen voor de bedrijfsgegevens: KBO-gegevens via Companyweb, Goudengids, Elektricien-gids, Homeproved (geraadpleegd 22-09-2026); antwoorden van DCTB. De huidige website zelf kon DCTB niet automatisch uitlezen — daarom Fase 0.*
