// Formulierattributen per hosting (29-10-2026). Bouw met HOSTING=vimexx → formulieren posten naar /formulier.php
// (vimexx/formulier.php). Anders (standaard) → Netlify Forms. Zelfde velden en bedankpagina's in beide gevallen.
export const hosting = (process.env.HOSTING ?? 'netlify') === 'vimexx' ? 'vimexx' : 'netlify';

export function formAttrs(naam: string, bedankt: string, metBestand = false): Record<string, string> {
  const basis: Record<string, string> = { name: naam, method: 'POST' };
  if (metBestand) basis.enctype = 'multipart/form-data';
  return hosting === 'vimexx'
    ? { ...basis, action: '/formulier.php' }
    : { ...basis, action: bedankt, 'data-netlify': 'true', 'netlify-honeypot': 'bot-field' };
}
