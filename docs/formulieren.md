# Formulieren → opgemaakte mail naar info@

## Hoe het op de oude site werkte (onderzocht 16-10-2026)
- WordPress op hosting van Vimexx (Apache, PHP 8.3, server 185.104.29.164).
- Formulieren met de plugin **SureForms 2.12.9**, met Google reCAPTCHA v3. Ze posten naar `/wp-json/sureforms/v1/submit-form`.
- WordPress zet de inzending om in een HTML-mail en verstuurt die via de mailserver van Vimexx (`mail.heeman-electrics.be`) naar info@.

## Hoe het op de nieuwe site werkt
1. **Netlify Forms** ontvangt de drie formulieren: `offerte`, `contact` en `sollicitatie`. Netlify filtert spam (honeypot + Akismet) en bewaart elke inzending in **Netlify → Forms**, als reserve.
2. Bij elke geldige inzending start Netlify automatisch **`netlify/functions/submission-created.mjs`**.
3. Die functie maakt een opgemaakte mail (`netlify/lib/mail-sjabloon.mjs`) en verstuurt ze via **de mailserver van Vimexx**, met de mailbox info@ zelf. De mail komt dus van het eigen adres, en SPF klopt (de server staat al in het SPF-record).
   - De mail bevat het logo, een titel, de datum en alle velden. Er zijn knoppen *Bel*, *WhatsApp* en *Antwoord per mail*.
   - Het cv of de foto zit erin als bijlage.
   - **Antwoorden** op de mail gaat rechtstreeks naar de bezoeker (Reply-To).
4. De bezoeker komt op een bedankpagina: `/offerte/bedankt/`, `/contact/bedankt/` of `/jobs/bedankt/`.

Voorbeelden van de mails bekijken: `node scripts/mail-voorbeeld.mjs` → `docs/mail-voorbeeld-*.html`.

## Instellen in Netlify (eenmalig)
**Site configuration → Environment variables → Add a variable**, met scope *Functions* (of *All*):

| Variabele | Waarde |
|---|---|
| `SMTP_HOST` | `mail.heeman-electrics.be` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@heeman-electrics.be` |
| `SMTP_PASS` | het wachtwoord van die mailbox (bij Vimexx) |
| `MAIL_TO` | *(optioneel)* ander ontvangstadres, standaard info@ |

Na het invullen: **Deploys → Trigger deploy → Deploy site**, zodat de functie de waarden kent.

**Controle:** vul het contactformulier zelf in. In Netlify → Logs → Functions → `submission-created` zie je "Verstuurd" of een foutmelding. Ontbreken de SMTP-gegevens, dan staat de inzending wel in Netlify → Forms.

**Optioneel als extra vangnet:** Netlify → Forms → Form notifications → *Email notification*. Netlify stuurt dan ook een eenvoudige melding. Dat geeft wel twee mails per inzending.

## Domein verhuizen naar Netlify zonder de mail te breken
- **De nameservers bij Vimexx laten staan.** Pas alleen de records voor de website aan:
  - `www` → CNAME naar het Netlify-adres;
  - het hoofddomein → het A-record dat Netlify opgeeft.
- **Niet wijzigen:** het MX-record (`mail.heeman-electrics.be`), het A-record van `mail` (185.104.29.164), het SPF-record (TXT) en eventuele DKIM- en DMARC-records. Anders werkt de mail niet meer, en ook het certificaat van de mailserver niet (`*.heeman-electrics.be`, wordt door Vimexx vernieuwd).

## Limieten (gratis plan van Netlify)
- 100 inzendingen per maand en 10 MB aan geüploade bestanden per maand. Met cv's en foto's kan dat krap worden; daarna is een betalend plan nodig.
