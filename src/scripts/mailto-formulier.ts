// Formulieren zonder server: bij verzenden opent het mailprogramma van de bezoeker met een ingevulde mail
// naar info@. Gebruik: <form data-mailto="info@…" data-onderwerp="Offerte: {dienst} – {gemeente}">.
// Zonder JavaScript valt het formulier terug op action="mailto:…" (enctype text/plain).
// Na verzenden verschijnt [data-mailto-bevestiging] binnen hetzelfde blok.

function labelVoor(form: HTMLFormElement, veld: Element): string {
  const id = veld.getAttribute('id');
  const label = id ? form.querySelector(`label[for="${id}"]`) : veld.closest('fieldset')?.querySelector('legend');
  return (label?.textContent ?? veld.getAttribute('name') ?? '')
    .replace(/\*|\(optioneel\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function vulIn(sjabloon: string, data: FormData): string {
  return sjabloon.replace(/\{(\w[\w-]*)\}/g, (_, naam) => String(data.get(naam) ?? '').trim() || '—');
}

/** Bouw de mailto-URL (onderwerp + alle ingevulde velden met hun label) voor een formulier. */
export function bouwMailto(form: HTMLFormElement): string {
  const data = new FormData(form);
  const regels: string[] = [];
  const gezien = new Set<string>();

  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]').forEach((veld) => {
    const naam = veld.name;
    if (gezien.has(naam) || veld.type === 'hidden' || veld.dataset.nietInMail !== undefined) return;
    gezien.add(naam);
    const waarden = data.getAll(naam).map((w) => String(w).trim()).filter(Boolean);
    if (!waarden.length) return;
    const label = labelVoor(form, veld);
    const waarde = waarden.join(', ');
    regels.push(veld.tagName === 'TEXTAREA' ? `${label}:\n${waarde}\n` : `${label}: ${waarde}`);
  });

  const onderwerp = vulIn(form.dataset.onderwerp ?? 'Bericht via de website', data);
  const body = `${regels.join('\n')}\n\n—\nVerzonden via ${location.hostname}${location.pathname}`;
  return `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll<HTMLFormElement>('form[data-mailto]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    location.href = bouwMailto(form);

    const blok = form.closest('[data-mailto-blok]') ?? form.parentElement;
    const bevestiging = blok?.querySelector<HTMLElement>('[data-mailto-bevestiging]');
    if (bevestiging) {
      bevestiging.hidden = false;
      bevestiging.focus();
    }
  });
});
