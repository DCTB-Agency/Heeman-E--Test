# Hosting bij Vimexx

De site is statisch (Astro). Bij Vimexx draait ze op de bestaande hosting (Apache + PHP 8.3). Alleen de formulieren
gebruiken PHP: `formulier.php` verstuurt de opgemaakte mail naar info@, net zoals SureForms dat nu doet in WordPress.
**DNS en mail blijven ongewijzigd**: alles blijft bij Vimexx.

## Pakket maken
```bash
npm run build:vimexx            # test: noindex, voor een test-subdomein
npm run build:vimexx:live       # live: indexeerbaar, voor www.heeman-electrics.be
```
Resultaat: `vimexx-pakket/heeman-electrics-test-JJJJ-MM-DD.zip` (of `-live-`). Inhoud:
- de site (HTML, CSS, JS, afbeeldingen, sitemap, robots.txt, llms.txt);
- `.htaccess`: https + www, alle redirects van de oude WordPress-adressen, beveiligingsheaders, caching, 404-pagina;
- `formulier.php` + `formulier/mail-sjabloon.php`: verwerking van offerte, contact en sollicitatie.

Voor een test-subdomein: geef het adres mee voor de deelbeelden, bv.
`PREVIEW_URL=https://nieuw.heeman-electrics.be npm run build:vimexx`.

## Stap 1 — Testen zonder de huidige site te raken
1. Vimexx → Mijn producten → hosting → **DirectAdmin** → *Subdomein beheer* → maak `nieuw.heeman-electrics.be` aan.
2. Vraag via *SSL-certificaten* (Let's Encrypt) een certificaat aan, ook voor het subdomein.
3. Open in DirectAdmin *Bestandsbeheer* → `domains/heeman-electrics.be/public_html/nieuw/` (of de map die Vimexx voor het subdomein aanmaakt).
4. Upload de **test-zip** en pak hem uit in die map. Controleer dat `.htaccess` mee is uitgepakt.
5. Test op https://nieuw.heeman-electrics.be:
   - vul het **contactformulier** in → er komt een opgemaakte mail in **info@heeman-electrics.be**;
   - vul het **offerteformulier** in met een foto, en een **sollicitatie** met een cv → bijlage in de mail;
   - antwoord op zo'n mail → het antwoord gaat naar het adres van de bezoeker.
   - Het subdomein staat op noindex en komt dus niet in Google.

## Stap 2 — Overschakelen (pas na "go")
1. **Back-up van WordPress**: DirectAdmin → *Create/Restore Backups* (bestanden + database). Download die ook lokaal.
2. Bouw het live-pakket: `npm run build:vimexx:live`.
3. In `public_html`: verplaats alle WordPress-bestanden (wp-admin, wp-content, wp-includes, index.php, .htaccess, …)
   naar een map **buiten** `public_html`, bv. `~/oud-wordpress-JJJJMMDD/`. Zo staan ze offline, maar kan je meteen terug.
4. Upload de live-zip in `public_html` en pak hem uit.
5. Controleer:
   - https://www.heeman-electrics.be en https://heeman-electrics.be (→ www);
   - een paar oude adressen, bv. `/over/` → `/over-ons/` en `/laadpaal-installatie-in-schilde/` → `/diensten/laadpaal-installeren/`;
   - de drie formulieren (mail in info@).
6. Google Search Console: sitemap `https://www.heeman-electrics.be/sitemap-index.xml` indienen.
7. Na enkele weken zonder problemen: de WordPress-database en de map met de oude bestanden verwijderen.

**Terug naar de oude site** (als er iets misloopt): verwijder de nieuwe bestanden uit `public_html` en zet de
WordPress-bestanden uit `~/oud-wordpress-JJJJMMDD/` terug.

## Formulieren op Vimexx: hoe het werkt
- Het formulier post naar `/formulier.php`. Dat controleert:
  - de verplichte velden;
  - het e-mailadres;
  - de bestanden: pdf, docx of foto, max. 8 MB;
  - spam: een honeypot, een minimale invultijd van 3 seconden, max. 5 inzendingen per IP per 10 minuten en hoogstens 2 links.
- Daarna stuurt het een opgemaakte mail naar info@, met PHP `mail()` van de webserver van Vimexx. Die server staat
  in het SPF-record van heeman-electrics.be (`ip4:185.104.29.164`), dus de mail komt niet als spam binnen.
- Afzender: "Website Heeman Electrics" <info@heeman-electrics.be>. Reply-To: de bezoeker.
- Mislukt het versturen, dan wordt de inzending bewaard in `~/formulier-archief/`, buiten de website en niet publiek,
  en krijgt de bezoeker een nette melding met het telefoonnummer.
- Ontvanger aanpassen: bovenaan `vimexx/formulier.php` (`HE_ONTVANGER`).

## Netlify
Netlify blijft bruikbaar voor previews (`npm run build`, standaard). De formulieren gaan daar via Netlify Forms +
`netlify/functions/submission-created.mjs` (zie docs/formulieren.md). Beide gebruiken dezelfde opmaak voor de mail.
