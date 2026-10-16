// Opgemaakte HTML-mail voor een formulierinzending (offerte, contact, sollicitatie).
// Zelfde idee als de SureForms-mails van de oude WordPress-site, maar in de huisstijl van Heeman Electrics.
// Puur sjabloon (geen netwerk), zodat het ook lokaal te bekijken is: node scripts/mail-voorbeeld.mjs

const KLEUR = { brand: '#be4516', accent: '#ff5a1f', ink: '#1c0d0a', paper: '#f6f5f1', muted: '#5a4f4b', lijn: '#e5d7d1' };

/** Per formulier: titel, intro en de volgorde + labels van de velden. Onbekende velden komen achteraan. */
export const FORMULIEREN = {
  offerte: {
    titel: 'Nieuwe offerteaanvraag',
    intro: 'Er is een offerteaanvraag binnengekomen via de website.',
    velden: {
      klanttype: 'Aanvraag als',
      bedrijf: 'Bedrijfsnaam',
      dienst: 'Dienst',
      gemeente: 'Gemeente',
      omschrijving: 'Omschrijving',
      naam: 'Naam',
      gsm: 'Gsm',
      email: 'E-mail',
      voorkeur: 'Contact via',
      foto: 'Foto',
    },
    onderwerp: (d) => `Offerteaanvraag${d.klanttype ? ` (${d.klanttype})` : ''}: ${d.dienst || 'dienst'} – ${d.gemeente || 'gemeente'} · ${d.naam || ''}`.trim(),
  },
  contact: {
    titel: 'Nieuw bericht',
    intro: 'Er is een bericht binnengekomen via het contactformulier.',
    velden: { naam: 'Naam', gsm: 'Gsm', email: 'E-mail', bericht: 'Bericht' },
    onderwerp: (d) => `Bericht via de website · ${d.naam || ''}`.trim(),
  },
  sollicitatie: {
    titel: 'Nieuwe sollicitatie',
    intro: 'Er is een sollicitatie binnengekomen via de jobpagina.',
    velden: {
      functie: 'Functie',
      naam: 'Naam',
      gsm: 'Gsm',
      email: 'E-mail',
      woonplaats: 'Woonplaats',
      ervaring: 'Ervaring',
      'rijbewijs-b-en-vervoer': 'Rijbewijs B + eigen vervoer',
      motivatie: 'Motivatie',
      cv: 'Cv',
    },
    onderwerp: (d) => `Sollicitatie ${d.functie ? `${d.functie.toLowerCase()} ` : ''}· ${d.naam || ''}`.trim(),
  },
};

// Velden die nooit in de mail horen (Netlify, honeypot, akkoord-vinkjes).
const VERBORGEN = new Set(['form-name', 'bot-field', 'privacy', 'ip', 'user_agent', 'referrer']);

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Waarde van een veld als tekst (bestanden: bestandsnaam). */
export function tekst(waarde) {
  if (waarde == null) return '';
  if (typeof waarde === 'object') return waarde.filename || waarde.name || waarde.url || '';
  return String(waarde).trim();
}

/** Belgisch gsm-nummer → internationaal formaat zonder spaties (voor tel: en WhatsApp). */
export function internationaal(gsm) {
  let n = String(gsm || '').replace(/[^\d+]/g, '');
  if (n.startsWith('00')) n = `+${n.slice(2)}`;
  else if (n.startsWith('0')) n = `+32${n.slice(1)}`;
  return n;
}

function knop(href, label, primair = false) {
  const bg = primair ? KLEUR.brand : '#ffffff';
  const kleur = primair ? '#ffffff' : KLEUR.ink;
  const rand = primair ? KLEUR.brand : KLEUR.lijn;
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;border:2px solid ${rand};background:${bg};color:${kleur};font-weight:700;font-size:15px;text-decoration:none;">${esc(label)}</a>`;
}

/**
 * @param {{ formulier: string, data: Record<string, unknown>, ontvangen?: Date, logoUrl: string, siteUrl: string }} o
 * @returns {{ onderwerp: string, html: string, tekst: string }}
 */
export function bouwMail({ formulier, data, ontvangen = new Date(), logoUrl, siteUrl }) {
  const f = FORMULIEREN[formulier] ?? { titel: 'Nieuwe inzending', intro: `Formulier: ${formulier}`, velden: {}, onderwerp: () => `Formulier ${formulier}` };
  const d = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, tekst(v)]));

  const sleutels = [...Object.keys(f.velden), ...Object.keys(d).filter((k) => !(k in f.velden))].filter(
    (k) => !VERBORGEN.has(k) && d[k],
  );
  const label = (k) => f.velden[k] ?? k.charAt(0).toUpperCase() + k.slice(1).replace(/[-_]/g, ' ');

  const waardeHtml = (k) => {
    const v = d[k];
    const bestand = data[k] && typeof data[k] === 'object' && data[k].url;
    if (bestand) return `<a href="${esc(data[k].url)}" style="color:${KLEUR.brand};font-weight:700;">${esc(v)}</a> <span style="color:${KLEUR.muted};">(ook als bijlage)</span>`;
    if (k === 'gsm') return `<a href="tel:${esc(internationaal(v))}" style="color:${KLEUR.brand};font-weight:700;text-decoration:none;">${esc(v)}</a>`;
    if (k === 'email') return `<a href="mailto:${esc(v)}" style="color:${KLEUR.brand};font-weight:700;text-decoration:none;">${esc(v)}</a>`;
    return esc(v).replace(/\n/g, '<br>');
  };

  const rijen = sleutels
    .map(
      (k) => `<tr>
        <td style="padding:12px 16px 12px 0;border-bottom:1px solid ${KLEUR.lijn};color:${KLEUR.muted};font-size:14px;vertical-align:top;white-space:nowrap;width:38%;">${esc(label(k))}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${KLEUR.lijn};color:${KLEUR.ink};font-size:15px;vertical-align:top;">${waardeHtml(k)}</td>
      </tr>`,
    )
    .join('');

  const datum = new Intl.DateTimeFormat('nl-BE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Brussels' }).format(ontvangen);
  const gsm = d.gsm ? internationaal(d.gsm) : '';
  const voornaam = (d.naam || '').split(' ')[0];
  const knoppen = [
    gsm && knop(`tel:${gsm}`, `Bel ${voornaam || 'terug'}`, true),
    gsm && knop(`https://wa.me/${gsm.replace('+', '')}`, 'WhatsApp'),
    d.email && knop(`mailto:${d.email}?subject=${encodeURIComponent(`Re: ${f.titel.toLowerCase()} via heeman-electrics.be`)}`, 'Antwoord per mail'),
  ]
    .filter(Boolean)
    .join('');

  const html = `<!doctype html>
<html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(f.titel)}</title></head>
<body style="margin:0;padding:0;background:${KLEUR.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${KLEUR.paper};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${KLEUR.lijn};">
        <tr><td style="height:6px;background:${KLEUR.brand};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <img src="${esc(logoUrl)}" width="170" alt="Heeman Electrics" style="display:block;width:170px;max-width:60%;height:auto;border:0;">
        </td></tr>
        <tr><td style="padding:16px 32px 0;">
          <p style="margin:0;color:${KLEUR.brand};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">${esc(datum)}</p>
          <h1 style="margin:8px 0 6px;color:${KLEUR.ink};font-size:26px;line-height:1.2;">${esc(f.titel)}${d.naam ? ` van ${esc(d.naam)}` : ''}</h1>
          <p style="margin:0;color:${KLEUR.muted};font-size:15px;">${esc(f.intro)}</p>
        </td></tr>
        ${knoppen ? `<tr><td style="padding:20px 32px 4px;">${knoppen}</td></tr>` : ''}
        <tr><td style="padding:12px 32px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rijen}</table>
        </td></tr>
        <tr><td style="padding:18px 32px;background:${KLEUR.ink};color:#cbbfba;font-size:12px;line-height:1.6;">
          Verzonden via het formulier op <a href="${esc(siteUrl)}" style="color:${KLEUR.accent};text-decoration:none;">${esc(siteUrl.replace(/^https?:\/\//, ''))}</a>.
          Antwoorden op deze mail gaat rechtstreeks naar ${d.email ? esc(d.naam || 'de afzender') : 'Heeman Electrics (de bezoeker gaf geen e-mailadres)'}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const platteTekst = [
    `${f.titel}${d.naam ? ` van ${d.naam}` : ''}`,
    datum,
    '',
    ...sleutels.map((k) => `${label(k)}: ${d[k]}`),
    '',
    `Verzonden via ${siteUrl}`,
  ].join('\n');

  return { onderwerp: f.onderwerp(d), html, tekst: platteTekst };
}
