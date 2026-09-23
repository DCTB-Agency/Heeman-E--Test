// /llms.txt — Markdown-samenvatting voor AI-assistenten (CLAUDE.md § 11.2), gegenereerd uit dezelfde data als de site.
import type { APIRoute } from 'astro';
import { SITE_URL, business, areas, services, serviceUrl, job } from '../data/site';
import { artikels, artikelUrl } from '../data/kennisbank';

export const GET: APIRoute = () => {
  const u = (p: string) => `${SITE_URL}${p}`;
  const tekst = `# ${business.name}

> Erkend elektricien in Schilde (provincie Antwerpen, België). Zaakvoerder: ${business.owner}, ${business.experience}; eigen zaak sinds 2018. Werkgebied: ${areas.map((a) => a.name).join(', ')}.

Contact: ${business.phone.international} · ${business.email} · ${business.address.street}, ${business.address.postalCode} ${business.address.locality}
Openingsuren: ${business.hours.label}; dringende oproepen ook buiten de openingsuren.
Werkwijze: Bert doet zelf het eerste bezoek en de inschatting, de opstart, de oplevering en de kwaliteitscontrole. Gratis offerte; geen vaste prijzen online.

## Diensten
${services.map((s) => `- [${s.name}](${u(serviceUrl(s.slug))})`).join('\n')}

## Jobs
- [Vacature junior elektricien (vast, voltijds)](${u(job.url)})

## Kennisbank
${artikels.map((a) => `- [${a.titel}](${u(artikelUrl(a.slug))})`).join('\n')}

## Meer
- [Kerngegevens](${u('/over-bert/kerngegevens/')})
- [Veelgestelde vragen](${u('/veelgestelde-vragen/')})
- [Over Bert](${u('/over-bert/')})
- [Realisaties](${u('/realisaties/')})
- [Contact](${u('/contact/')})
`;
  return new Response(tekst, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
