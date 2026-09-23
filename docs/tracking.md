# Tracking — Google Analytics (GA4)

**Status:** ingebouwd in `src/components/Analytics.astro`, tag-ID in `src/data/site.ts` (`analytics.tagId`).

## Hoe het werkt
- **Geen tracking vóór toestemming.** gtag.js wordt pas geladen na "Aanvaarden" (Consent Mode v2, basisversie).
  Advertentiesignalen (`ad_storage`, `ad_user_data`, `ad_personalization`) blijven altijd geweigerd.
- **Cookiebanner** (NL): "Weigeren" en "Aanvaarden" even groot en even makkelijk. Keuze wordt 180 dagen onthouden
  en is te wijzigen via "Cookie-instellingen" in de footer of op `/cookies/`.
- **Tag-ID:** `GT-KDTJ593M` — de Google-tag die de huidige site (Site Kit) al gebruikt; die stuurt door naar de
  gekoppelde GA4-property. `[TE BEVESTIGEN]` in GA4 welke property eraan hangt. Een apart GA4-meet-ID (`G-…`)
  kan ook: vervang dan `analytics.tagId`.

## Events (conversies)
| Event | Waar |
|---|---|
| `click_to_call` | alle bel-knoppen (header, hero, onderbalk, CTA's) |
| `whatsapp_click` | WhatsApp-knoppen |
| `mail_click` | mail-link op /contact/ |
| `route_click` | "Route plannen" op /contact/ |
| `offerte_click` | "Offerte" in de mobiele onderbalk |
| `offerte_submit` | offerteformulier verzonden (opent mail) |
| `contact_submit` | contactformulier verzonden (opent mail) |
| `job_apply_click` | "Solliciteer in 1 minuut" / onderbalk op jobs |
| `job_whatsapp_click`, `job_call_click` | WhatsApp/bel op jobpagina's |
| `job_apply_submit` | sollicitatieformulier verzonden |

Elk event krijgt `page_path` mee. Nieuwe knoppen: voeg `data-event="naam"` toe, meer is niet nodig.

## In GA4 zelf in te stellen (DCTB)
1. **Belangrijke gebeurtenissen** (key events): `click_to_call`, `whatsapp_click`, `offerte_submit`, `contact_submit`,
   `job_apply_submit`, `job_whatsapp_click`, `job_call_click`.
2. **Kanaalgroep "AI-assistenten"** (GEO-brief § 7): Beheer → Gegevensweergave → Kanaalgroepen → nieuwe groep,
   kanaal "AI-assistenten" **boven** "Referral", voorwaarde *Bron komt overeen met regex*:
   `chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai`
3. **Gegevensbewaring** op 14 maanden; **Google-signalen** uit laten.
4. **Search Console** koppelen aan de GA4-property; **Bing Webmaster Tools** apart (importeren uit Search Console).

## Let op bij mailto-formulieren
`offerte_submit` en `contact_submit` meten dat het mailprogramma geopend werd, niet dat de mail echt verzonden is.
