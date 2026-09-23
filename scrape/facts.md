# Fase 0 — Feiten op de huidige site vs. de brief

> Gecrawld op 23-09-2026 met `scrape/scrape.py`. Ruwe data per pagina: `scrape/pages/*.json`, samenvatting: `scrape/crawl-report.json`.
> **Voor DCTB:** graag eerst deze lijst doornemen (vooral § 3) vóór er content geschreven wordt.

## 1. Wat er nu online staat

| URL | Title | Meta description | H1 | Laatst gewijzigd |
|---|---|---|---|---|
| `/` | Heeman Electrics - Home - Uw betrouwbare **electricien** in regio Schilde *(typfout)* | Betrouwbare elektricien in regio Schilde. Snelle service, herstellingen, installaties en keuringen. Vraag vandaag nog een offerte! | Uw betrouwbare elektricien met meer dan 10 jaar ervaring in Schilde en omliggende regio. | 03-10-2025 |
| `/laadpaal-installatie-in-schilde/` | Laadpaal Installatie in Schilde - Heeman Electrics | Professionele laadpaal installatie in Schilde door erkend elektricien. … | Laadpaal Installatie in Schilde | 20-10-2025 |
| `/over/` | Over - Heeman Electrics | **ontbreekt** | Over Heeman Electrics | 23-01-2026 |
| `/contact/` | Contact - Heeman Electrics | **ontbreekt** | Neem contact op | 23-01-2026 |
| `/?page_id=1400` (menu "Diensten") | — | — | **404** | — |
| `/?page_id=1401` (menu "FAQ") | — | — | **404** | — |

Er zijn dus maar 4 echte pagina's. De Diensten- en FAQ-pagina bestaan wel als concept in WordPress, maar zijn niet gepubliceerd.

## 2. Feiten die op de site staan

| Feit | Op de site | Waar |
|---|---|---|
| Naam | Heeman Electrics | overal |
| Zaakvoerder | Bert Heeman | /over/ |
| Adres | Baron Delbekelaan 49, 2970 Schilde | footer, /over/, /contact/ |
| Telefoon | +32 485 19 00 27 (`tel:+32485190027`) | overal |
| E-mail | **info@heeman-electrics.be** | overal |
| Ervaring | "**meer dan 10 jaar ervaring**" / "een decennium aan expertise" | H1 home, /over/ |
| Bereikbaarheid | "**24/7 bereikbaar**", "dringende herstellingen … 24/7 indien nodig" | home, footer |
| Diensten (home) | Laadpalen · Domotica (Niko Home Control) · **Nieuwbouwprojecten** · Renovatieprojecten · **Video- & parlofonie** · **Verlichtingsadvies** · **Dringende herstellingen** · Keuringsklaar maken (AREI) | home |
| Laadpaal-details | gratis plaatsbezoek; woningen, bedrijven, appartementen; load balancing / energiebeheer; onderhoud en herstellingen; integratie met zonnepanelen; privé, semi-publiek en bedrijven; "bedrijfswagenpark" | /laadpaal-…/ |
| Laadpaalmerken | "**Gecertificeerde laadpalen (EVBox, Alfen, Easee, Zaptec, enz.)**", voertuigen "van Tesla tot Volkswagen" | /laadpaal-…/ |
| Kwalificatie | "**Erkend elektricien** met jarenlange ervaring", "Onze **erkende elektriciens**" | /laadpaal-…/ |
| Werkgebied | "Schilde en omliggende regio"; laadpaalpagina: 's-Gravenwezel, Zoersel, Brasschaat, Wijnegem | home, /laadpaal-…/ |
| USP's | Nauwkeurig en stipt · Transparante tarieven · Betrouwbare kwaliteit; "enkel de hoogstwaardige materialen" | home |
| Specialisaties | smart home, energiezuinige installaties, laadpalen | /over/ |
| Reviews | **geen** op de site | — |
| Certificaten | geen concrete vermeld (alleen "erkend") | — |
| Social media | **geen links** | — |
| Webbouwer | "Powered by webCactus" (footer) | — |

## 3. Tegenstrijdigheden met de brief (sectie 2–3), beslissing nodig

| # | Onderwerp | Huidige site | Brief | Voorstel |
|---|---|---|---|---|
| 1 | **E-mail** | info@heeman-electrics.be | bert@heeman-electrics.be (Goudengids, `[TE BEVESTIGEN]`) | Bert laten kiezen. Daarna overal (site, schema, Google, gidsen) hetzelfde adres gebruiken. Formulieren mogen naar beide adressen. |
| 2 | **Ervaring** | "meer dan 10 jaar ervaring" | "sinds 2018" `[TE BEVESTIGEN]` | Beide kunnen kloppen: de BV bestaat sinds 2018, Bert heeft 10+ jaar ervaring. Bevestigen en dan zo formuleren: "elektricien met meer dan 10 jaar ervaring, eigen zaak sinds 2018". |
| 3 | **24/7 & dringende herstellingen** | "24/7 bereikbaar" | ma–vr 08:00–17:30; kleine klusjes niet pushen | Schrappen, tenzij Bert echt 24/7 dringende oproepen wil. Zo ja: openingsuren en schema aanpassen. |
| 4 | **"Wij / onze erkende elektriciens"** | meervoud, "erkend" | "ik", één persoon, geen certificaten bevestigd | "Ik" gebruiken. "Erkend" niet overnemen tot duidelijk is wat erkend betekent (bv. RESCert, BA5?). Werkt Bert met onderaannemers? Dat bepaalt of "Ik kom zelf" mag. |
| 5 | **Laadpaalmerken** | EVBox, Alfen, Easee, Zaptec | alleen noemen als Bert ze bevestigt | Bert vragen welke merken hij écht plaatst. Tot dan geen merknamen. |
| 6 | **Extra diensten** | nieuwbouw, video-/parlofonie, verlichtingsadvies, dringende herstellingen | 5 prioriteitsdiensten | Voorstel: nieuwbouw onder "Renovatie & nieuwbouw"; parlofonie en verlichting als korte vermelding op de dienstenpagina, zonder eigen pagina. Dringende herstellingen: zie #3. |
| 7 | **Aanspreekvorm** | /over/ = "je", rest = "u" | "u" (jobs: "je") | Volgens de brief. |
| 8 | **Taal/locale** | `og:locale nl_NL`, schema `inLanguage nl-NL` | nl-BE | Naar nl-BE / nl_BE. |
| 9 | **Foto's** | 2 foto's, beide ogen als **stockbeelden** (laadpaal aan parking, verdeelkast met Hager-modules) | alleen echte foto's | Niet hergebruiken. Echte foto's opvragen (brief § 18.2). |
| 10 | **Zonnepanelen** | "integratie met zonnepanelen" | plaatst Bert zelf? `[TE BEVESTIGEN]` | Past bij de voorlopige formulering "aansluiten en integreren". |

## 3b. Beslissingen (23-09-2026)
| # | Beslissing |
|---|---|
| 1 | ✅ **info@heeman-electrics.be** |
| 2 | ✅ **meer dan 10 jaar ervaring** (BV sinds 2018 blijft in KBO/schema) |
| 3 | ✅ Dringende oproepen **ook buiten de openingsuren**, geen letterlijke "24/7"-belofte |
| 4 | ✅ **Erkend elektricien** mag vermeld worden. Tone of voice blijft "ik". |
| 5 | ✅ Merken **EVBox, Alfen, Easee, Zaptec** mogen vermeld worden |
| 6 | ✅ **Nieuwbouw, video- & parlofonie, verlichtingsadvies, dringende herstellingen** worden eigen dienstpagina's |
| 7–10 | Volgens voorstel (u, nl-BE, geen stockfoto's, zonnepanelen = "aansluiten en integreren") |

Verwerkt in `CLAUDE.md` § 0.1 en de secties 2, 3, 5, 6, 9, 10, 11 en 18.

## 4. Nieuwe antwoorden op open vragen uit de brief (§ 18)
- **§ 18.9 Jaren ervaring:** ✅ meer dan 10 jaar (bevestigd).
- **§ 18.6 Laadpaalmerken:** ✅ EVBox, Alfen, Easee, Zaptec (bevestigd).
- **§ 18.1 Logo:** alleen PNG online (max. 1536×484). SVG nog opvragen.
- **§ 18.15 Toegang:** de site is gebouwd door webCactus (WordPress). Voor DNS en export is misschien hun medewerking nodig.
