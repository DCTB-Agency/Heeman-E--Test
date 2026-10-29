# Later aanvullen (weggehaald op 29-10-2026 omdat de info nog ontbreekt)

Deze blokken stonden in het geel op de site en zijn voorlopig verwijderd. Zodra de info er is, komen ze terug.

| Wat | Waar het stond | Wat er nodig is | Hoe terugzetten |
|---|---|---|---|
| **Google-reviews** | Homepage, boven "Recent werk in de regio" | Score, aantal reviews, 3–5 echte reviews + link naar het Google Bedrijfsprofiel | Blok "Google-reviews" opnieuw toevoegen in `src/pages/index.astro` (zie git-commit van 29-10-2026) |
| **Link Google Bedrijfsprofiel** | Kerngegevens (rij verschijnt automatisch) + JSON-LD `sameAs` | De URL van het profiel | Invullen in `src/data/site.ts` → `sameAs: ['https://…']` |
| **Opleiding en ervaring van de oprichter vóór 2018** | Wie we zijn → blok "Opgericht in 2018" | Opleiding, vorige werkgevers/ervaring (samen 10+ jaar) | Alinea toevoegen in `src/pages/over-ons/index.astro` |
| **Erkenning ("erkend door / waarvoor")** | Wie we zijn | Door wie erkend en waarvoor (bv. keuringsorganisme, installateursattest) | Pas dan "erkend elektricien" opnieuw gebruiken (29-10-2026 overal verwijderd) |
| **Juridisch nazicht privacy & cookies** | Onderaan /privacy/ en /cookies/ (interne notitie) | Nazicht door DCTB of een jurist | Geen tekst terugzetten; enkel nakijken |
| **4 foto's** | Dienstpagina's (laadpaal, domotica, zonnepanelen, video-parlofonie) | Zie docs/beelden-briefing.md | Bestanden in `assets-in/ai/`, daarna `npm run fotos` |

Nog niet ingevuld, maar niet zichtbaar op de site:
- GA4: bewaartermijn op 14 maanden zetten in Google Analytics (staat zo in de privacyverklaring).
- Search Console: domein verifiëren via DNS (TXT bij Vimexx) vóór de overstap.
