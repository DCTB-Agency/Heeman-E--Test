# Google Ads — vacatures Heeman Electrics (employer branding)

> Opgesteld 21-11-2026 door DCTB. Status (22-11-2026): **concept in Google Ads, niet gepubliceerd, niets live.**
>
> **Stand in het account (22-11-2026):**
> - Bert heeft de uitnodiging nog niet aanvaard → nog geen facturatie.
> - Campagne `Vacatures · Search · Schilde 10 km` staat als **concept** (draft) in het account: Search-netwerk, 10 km rond Schilde (aanwezigheid), Klikken maximaliseren (max. CPC € 1,50), € 3,90/dag, AI Max / tekstaanpassing / URL-uitbreiding uit, UTM-achtervoegsel, advertentiegroep 1 (Ervaren) met 15 zoekwoorden + advertentie (15 koppen, 4 beschrijvingen), 5 sitelinks en 6 highlights.
> - Klaargezet in het account (22-11-2026): alle 16 beelden + logo's in de **Asset Library**; uitsluitingslijst **"Vacatures · geen klantzoekopdrachten"** (41 woorden) in Gedeelde bibliotheek → Uitsluitingslijsten; GA4-property **heeman-electrics.be (562140490)** gekoppeld (enkel metrics, geen doelgroepen).
> - ⚠️ **Conversies kunnen nog niet geïmporteerd worden:** de live site stuurt nog naar de oude tag `GT-KDTJ593M`; de overstap naar `G-SQRCYGBTYX` (commit 9df6b5c) is nooit gepubliceerd omdat de Vimexx-toegang ontbreekt. GA4 ontvangt dus niets. Eerst de site publiceren (na de Vimexx-gegevens van Bert), dan in GA4 de events uit § 3b als belangrijke gebeurtenis markeren (ster) en daarna importeren.
> - Nog te doen **na publicatie** van de campagne (kan niet in het concept): advertentiegroep 1 hernoemen naar "Ervaren elektricien", advertentiegroep 2 (Junior) toevoegen, uitsluitingslijst koppelen, gestructureerd fragment, afbeeldingen + logo koppelen uit de Asset Library, einddatum.
> - Sitelink "Stageplaats" verwijst naar `/jobs/junior-elektricien/#stage`: het anker staat in de code (src/pages/jobs/[slug].astro), maar is pas live na de volgende publicatie van de site.
> - Publiceren gebeurt **pas na go van DCTB** en bij voorkeur ná de facturatie van Bert; meteen daarna eerst op "Gepauzeerd" zetten tot alles af is.
> - **Update 22-11-2026 (middag):** Search-dagbudget verlaagd naar **€ 2/dag**. Tweede concept toegevoegd: **`Vacatures · Demand Gen · Schilde 10 km`** — Klikken maximaliseren, **€ 70 totaalbudget over 2 weken** (Google-minimum € 5/dag), locaties = postcodes/gemeenten van het werkgebied (2970, 2520, 2240, 2930, 2100, Wijnegem, Schoten, Zoersel, Malle; Demand Gen kent geen straal), Nederlands, merkkleuren #be4516/#1c0d0a, UTM `utm_medium=paid-social&utm_campaign=vacatures-demandgen`, twee advertenties (Ervaren / Junior) met elk 7 beelden (3 visuals "Vacature · Regio Schilde" + 4 foto's), 5 koppen, 1 lange kop, 3 beschrijvingen, knop "Apply now". Totaal ± € 182 over ± 2 maanden.
> - Validatie-PDF met alle advertenties: `Heeman-Electrics-Google-Ads-vacatures.pdf` (bron: `overzicht.html`).
> Account: Heeman Electrics · klant-ID **661-608-1384** · onder beheerder DCTB Agency (330-801-0043).
> Doel: sollicitaties voor **ervaren elektricien** (prioriteit) en **junior elektricien / stageplaats**.

## 1. Waarom (enkel) Search

Met ± € 200 voor 2 maanden is Search het enige kanaal dat genoeg klikken oplevert: we bereiken mensen die zelf
op "vacature elektricien" zoeken in de regio. Display, YouTube of Demand Gen vragen meer budget om te leren.
De beeldvisuals (map `visuals/`) dienen nu voor:
- afbeeldingsitems bij de Search-advertenties (enkel de **foto-** bestanden: Google weigert tekst/logo op die beelden);
- een vacature-post op het Google Bedrijfsprofiel en eventueel social;
- een latere Demand Gen-campagne als er meer budget komt (de **ervaren-** en **junior-** bestanden).

## 2. Budget (max. € 200, gespreid over ± 2 maanden)

| Periode | Dagbudget | Maximum per maand* |
|---|---|---|
| Maand 1 | € 3,90 | € 118,56 |
| Maand 2 | € 2,50 | € 76,00 |
| **Totaal** | | **± € 195** |

\* Google mag op één dag tot 2× het dagbudget uitgeven, maar rekent per kalendermaand nooit meer dan 30,4 × het dagbudget aan.

- Eén gedeeld campagnebudget voor beide advertentiegroepen (bij zo'n klein budget beter dan 2 campagnes).
- **Einddatum** instellen op 2 maanden na de start, zodat het totaal nooit boven € 200 komt.
- Na maand 1 het dagbudget verlagen naar € 2,50 (herinnering in de agenda). Werkt de ervaren-groep slecht en de junior-groep goed (of omgekeerd), schuiven we budget door te pauzeren.
- Plan B van Bert (handmatige betalingen, € 200 vooraf): dan stoppen de advertenties vanzelf als het bedrag op is; de dagbudgetten blijven hetzelfde.

## 3. Campagne-instellingen

| Instelling | Waarde |
|---|---|
| Naam | `Vacatures · Search · Schilde 10 km` |
| Doel | Leads (sollicitaties) — of "zonder doel" als de wizard anders te veel stuurt |
| Netwerken | **Enkel Google Zoeken.** Zoekpartners uit, Display-netwerk uit |
| Locatie | Straal **10 km rond Schilde** (2970): enkel kandidaten uit de buurt (beslissing 22-11-2026) |
| Locatie-optie | **Aanwezigheid**: mensen die zich in of regelmatig in de locatie bevinden (niet "interesse in") |
| Talen | Nederlands |
| Biedstrategie | **Klikken maximaliseren**, max. CPC-limiet € 1,50. Na ± 15 sollicitaties: overstappen naar "Conversies maximaliseren" |
| Conversies | Zie § 3b: formulier, bellen en WhatsApp |
| Advertentieplanning | Alle dagen, de hele dag (budget is te klein om op te splitsen) |
| Automatisch aangemaakte assets | Uit (geen automatisch gegenereerde koppen of beelden: alle tekst blijft feitelijk) |
| Status bij aanmaak | **Gepauzeerd** tot Bert de facturatie heeft ingevuld en DCTB groen licht geeft |

Achtervoegsel eind-URL (ingesteld): `utm_source=google&utm_medium=cpc&utm_campaign=vacatures&utm_term={keyword}`

## 3b. Wat telt als resultaat (formulier én telefoon)

Kandidaten solliciteren via het formulier, maar sommigen zullen bellen of een WhatsApp sturen via het nummer op de
site. De site meet die klikken al (GA4, zie docs/tracking.md). In Google Ads importeren we uit GA4 (Doelen → Conversies → Importeren → Google Analytics 4):

| GA4-event | Wat | In Google Ads |
|---|---|---|
| `sollicitatie_verzonden` | Sollicitatieformulier verzonden (bedankpagina) | **Primair** (dit stuurt het bieden) |
| `job_call_click` | Klik op het telefoonnummer op een vacaturepagina | **Primair** |
| `click_to_call` | Klik op het telefoonnummer elders (footer, contactpagina) | Secundair (kan ook een klant zijn) |
| `job_whatsapp_click` | WhatsApp-knop op een vacaturepagina (sollicitatie optie B) | **Primair** |

- **Geen oproep-asset** in de advertentie (geen belknop in Google): beslissing 29-10-2026, solliciteren via het formulier, Bert neemt onbekende nummers liever niet op. Wie toch belt via de site, wordt wel geteld.
- Een klik op het nummer is nog geen gesprek: bespreek maandelijks met Bert hoeveel kandidaten effectief belden.
- Beperking: de site meet pas na toestemming via de cookiebanner, en advertentiesignalen staan altijd uit. Een deel van de sollicitaties zal dus niet aan de advertentie gekoppeld worden; vergelijk daarom ook met het aantal sollicitaties dat binnenkomt in de mailbox.
- Na de import: in de campagne-instellingen "Doelen" controleren dat enkel de primaire acties hierboven meetellen.

## 4. Advertentiegroep 1 — Ervaren elektricien

> Beslissing 22-11-2026: de eerste kop toont altijd dat het om een job gaat. Daarom staan de koppen die dat zeggen ("vacature", "gezocht", "job") vast op positie 1; Google wisselt enkel tussen die koppen.

**Landingspagina:** `https://www.heeman-electrics.be/jobs/ervaren-elektricien/` · weergavepad: `jobs` / `ervaren`

**Zoekwoorden** (woordgroep = "…", exact = […]):
```
"vacature elektricien"
"job elektricien"
"elektricien gezocht"
"werk als elektricien"
"ervaren elektricien"
"elektricien vacature antwerpen"
"elektricien job antwerpen"
"vacature elektricien nieuwbouw"
"vacature elektricien renovatie"
"elektrotechnisch installateur vacature"
[vacature elektricien schilde]
[elektricien job schilde]
[vacature elektricien brasschaat]
[vacature elektricien schoten]
[vacature elektricien zoersel]
```

**Responsive zoekadvertentie — koppen (max. 30 tekens)**
1. Vacature elektricien Schilde *(vastgezet op positie 1)*
2. Ervaren elektricien gezocht *(vastgezet op positie 1)*
3. Job als elektricien *(vastgezet op positie 1)*
4. Elektricien in Schilde
5. Min. 3 jaar ervaring
6. Voltijds, marktconform loon
7. Werven in de buurt
8. Nieuwbouw en renovatie
9. Ook domotica
10. Geen lange verplaatsingen
11. Werkkledij voorzien
12. Solliciteer online
13. Reactie binnen 5 werkdagen
14. Heeman Electrics
15. Kom ons team versterken

**Beschrijvingen (max. 90 tekens)**
1. Uitdagende job als elektricien in Schilde en omgeving. Nieuwbouw, renovatie en domotica.
2. Min. 3 jaar ervaring? Voltijds contract, marktconform loon en werkkledij. Solliciteer nu.
3. Al onze werven liggen in Schilde en de omliggende gemeenten. Geen uren in de file.
4. Solliciteer online met je cv. We nemen binnen 5 werkdagen contact met je op.

## 5. Advertentiegroep 2 — Junior elektricien & stage

**Landingspagina:** `https://www.heeman-electrics.be/jobs/junior-elektricien/` · weergavepad: `jobs` / `junior`

**Zoekwoorden:**
```
"junior elektricien"
"elektricien zonder ervaring"
"eerste job elektricien"
"pas afgestudeerd elektricien"
"job elektriciteit schoolverlater"
"stage elektricien"
"stageplaats elektriciteit"
"stage elektriciteit antwerpen"
"leerling elektricien"
[junior elektricien schilde]
[stage elektricien schilde]
```

**Koppen (max. 30 tekens)**
1. Junior elektricien gezocht *(vastzetten op positie 1)*
2. Vacature elektricien Schilde *(vastzetten op positie 1)*
3. Net afgestudeerd?
4. Leer het vak op de werf
5. Opleiding op de job
6. Ook stageplaatsen
7. Diploma elektriciteit?
8. Voltijds, marktconform loon
9. Werken in de buurt
10. Ervaren collega’s helpen je
11. Nieuwbouw, renovatie, domotica
12. Werkkledij voorzien
13. Solliciteer online
14. Reactie binnen 5 werkdagen
15. Heeman Electrics

**Beschrijvingen (max. 90 tekens)**
1. Net afgestudeerd in elektriciteit? Leer het vak op de werf, in de buurt van Schilde.
2. Opleiding op de job, met begeleiding van ervaren collega’s. Ook stageplaatsen mogelijk.
3. Voltijds contract, marktconform loon en werkkledij. Werven in Schilde en omgeving.
4. Solliciteer online met je cv. We nemen binnen 5 werkdagen contact met je op.

## 6. Uitsluitingszoekwoorden (campagneniveau)

Om klanten die een elektricien *nodig hebben* (en dus geen job zoeken) niet te betalen:
```
prijs, prijzen, kost, kosten, offerte, goedkoop, tarief, uurloon elektricien,
nodig, dringend, panne, storing, kortsluiting, herstelling, herstellen, nacht, weekend,
laadpaal, zonnepanelen, thuisbatterij, keuring, keuringsklaar, aansluiten, plaatsen,
bij mij, telefoonnummer,
cursus, avondschool, examen, boek, test, theorie,
nederland, gent, brussel, limburg, oost-vlaanderen, west-vlaanderen,
zelfstandig worden, erkenning, interim
```
(Woorden als "vdab", "salaris" en "loon" bewust **niet** uitgesloten: dat zijn werkzoekenden.)
Na 1 week de zoektermen nakijken en de lijst aanvullen.

## 7. Assets (campagneniveau)

**Sitelinks** (tekst max. 25, beschrijving max. 35):
| Tekst | Beschrijving 1 | Beschrijving 2 | URL |
|---|---|---|---|
| Ervaren elektricien | Min. 3 jaar ervaring | Nieuwbouw en renovatie | /jobs/ervaren-elektricien/ |
| Junior elektricien | Net van school? Welkom | Leer het vak op de werf | /jobs/junior-elektricien/ |
| Stageplaats | Stage in elektriciteit | In de buurt van Schilde | /jobs/junior-elektricien/ |
| Werken bij ons | Een job in de buurt | Bekijk alle vacatures | /jobs/ |
| Wie we zijn | Elektricien in Schilde | 10+ jaar ervaring | /over-ons/ |

**Highlights (callouts, max. 25):** Voltijds contract · Marktconform loon · Werkkledij voorzien · Werven in de buurt · Opleiding op de job · Reactie in 5 werkdagen
("Ook stageplaatsen" enkel op advertentiegroep Junior.)

**Gestructureerd fragment:** kop *Diensten*: Nieuwbouw · Renovatie · Domotica · Laadpalen · Zonnepanelen

**Bedrijfsnaam + logo:** "Heeman Electrics" · `visuals/logo-vierkant.png` (1:1) en `visuals/logo-liggend.png` (4:1)

**Afbeeldingen (zonder tekst):** `visuals/foto-*-liggend.jpg` (1,91:1) en `visuals/foto-*-vierkant.jpg` (1:1)
— ervaren: draden-plafond, verdeelkast-bekabeling · junior: vakman-ladder, kabeladers.
Let op: Google toont afbeeldingen bij Search pas als het account een tijd zonder problemen loopt; ze kunnen eerst "niet in aanmerking" staan.

**Geen** oproep-asset (solliciteren enkel via het formulier, beslissing 03-10-2026).

## 8. Visuals met tekst (voor later / Bedrijfsprofiel / social)

| Bestand | Formaat | Gebruik |
|---|---|---|
| `ervaren-liggend.png`, `junior-liggend.png` | 1200×628 (1,91:1) | Demand Gen/Display liggend, Facebook/LinkedIn |
| `ervaren-vierkant.png`, `junior-vierkant.png` | 1200×1200 (1:1) | Demand Gen vierkant, Instagram, Google Bedrijfsprofiel-post |
| `ervaren-staand.png`, `junior-staand.png` | 960×1200 (4:5) | Demand Gen staand, Instagram feed |

Opnieuw maken (bv. andere tekst): `node scripts/ads-visuals.mjs`.
Foto's: generieke beelden (geen gezichten), niet voorgesteld als eigen werk.

## 9. Voor de start (checklist)

- [ ] Bert heeft de uitnodiging aanvaard (Beheerder → Toegang en beveiliging → Gebruikers: actief)
- [ ] Facturatie ingevuld op naam van AUGES BV (automatisch of handmatig)
- [ ] Adverteerdersverificatie (Google vraagt dit na enkele dagen/weken)
- [ ] GA4 gekoppeld, `sollicitatie_verzonden` als primaire conversie
- [ ] Startdatum + einddatum ingesteld; dagbudget € 3,90
- [ ] Campagne van "Gepauzeerd" naar "Ingeschakeld" — **pas na go van DCTB**
- [ ] Na 1 week: zoektermen nakijken, uitsluitingen aanvullen
- [ ] Na maand 1: dagbudget naar € 2,50

## 10. Opvolging & rapportering aan Bert

Kort maandoverzicht: uitgegeven bedrag · vertoningen · klikken · aantal sollicitaties (formulier) · kost per sollicitatie · welke vacature het best loopt.
