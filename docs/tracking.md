# Tracking — Google Analytics (GA4)

**Status:** ingebouwd in `src/components/Analytics.astro`, tag-ID in `src/data/site.ts` (`analytics.tagId`).

## Hoe het werkt
- **Geen tracking vóór toestemming.** gtag.js wordt pas geladen na "Aanvaarden" (Consent Mode v2, basisversie).
  Advertentiesignalen (`ad_storage`, `ad_user_data`, `ad_personalization`) blijven altijd geweigerd.
- **Cookiebanner** (NL): "Weigeren" en "Aanvaarden" even groot en even makkelijk. Keuze wordt 180 dagen onthouden
  en is te wijzigen via "Cookie-instellingen" in de footer of op `/cookies/`.
- **Tag-ID:** `G-SQRCYGBTYX` — eigen GA4-property van DCTB (sinds 03-11-2026). Daarvoor stond hier `GT-KDTJ593M`
  (Site Kit van de oude WordPress-site, gekoppeld aan een andere eigenaar); die oude gegevens blijven daar.

## Events (conversies)
| Event | Waar |
|---|---|
| `click_to_call` | alle bel-knoppen (header, hero, onderbalk, CTA's) |
| `whatsapp_click` | WhatsApp-knoppen |
| `mail_click` | mail-link op /contact/ |
| `offerte_click` | "Offerte" in de mobiele onderbalk |
| `offerte_submit` | offerteformulier verzonden (opent mail) |
| `contact_submit` | contactformulier verzonden (opent mail) |
| `job_apply_click` | "Solliciteer in 1 minuut" / onderbalk op jobs |
| `job_whatsapp_click`, `job_call_click` | WhatsApp/bel op jobpagina's |
| `job_apply_submit` | sollicitatieformulier verzonden |
| `snelcontact_submit` | mini-formulier in de hero van de homepage verzonden |
| `offerte_verzonden` | bedankpagina na het offerteformulier (enkel na geslaagde inzending, 1× per sessie) |
| `contact_verzonden` | bedankpagina na het contactformulier of het mini-formulier |
| `sollicitatie_verzonden` | bedankpagina na een sollicitatie |

Elk event krijgt `page_path` mee. Nieuwe knoppen: voeg `data-event="naam"` toe, meer is niet nodig.

## In GA4 zelf in te stellen (DCTB)
1. **Belangrijke gebeurtenissen** (key events): `offerte_verzonden`, `contact_verzonden`, `sollicitatie_verzonden`
   (betrouwbaarst), plus `click_to_call`, `whatsapp_click`, `job_whatsapp_click`. De `*_submit`-events tellen ook
   pogingen die mislukken; gebruik ze niet als conversie.
2. **Kanaalgroep "AI-assistenten"** (GEO-brief § 7): Beheer → Gegevensweergave → Kanaalgroepen → nieuwe groep,
   kanaal "AI-assistenten" **boven** "Referral", voorwaarde *Bron komt overeen met regex*:
   `chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai`
3. **Gegevensbewaring** op 14 maanden; **Google-signalen** uit laten.
4. **Search Console** koppelen aan de GA4-property; **Bing Webmaster Tools** apart (importeren uit Search Console).

## Let op
`*_submit` meet de klik op "Verzenden", niet of de inzending lukte. De `*_verzonden`-events op de bedankpagina's wel.
