// /llms.txt — Markdown-samenvatting voor AI-assistenten (CLAUDE.md § 11.2), gegenereerd uit dezelfde data als de site.
import type { APIRoute } from 'astro';
import { SITE_URL, business, areas, services, serviceUrl, job } from '../data/site';
import { artikels, artikelUrl } from '../data/kennisbank';

export const GET: APIRoute = () => {
  const u = (p: string) => `${SITE_URL}${p}`;
  const tekst = `# ${business.name}

> Erkend elektricien in Schilde (provincie Antwerpen, België). ${business.experience}; opgericht in 2018. Specialisaties: algemene elektriciteitswerken en renovatie, nieuwbouw, domotica (Niko Home Control). Werkgebied: ${areas.map((a) => a.name).join(', ')}.

Contact: ${business.phone.international} · ${business.email} · ${business.address.street}, ${business.address.postalCode} ${business.address.locality}
Openingsuren: ${business.hours.label}; 24/7 bereikbaar voor dringende herstellingen.
Werkwijze: bezoek en inschatting vooraf, één vast aanspreekpunt van opstart tot oplevering, kwaliteitscontrole bij elke installatie. Klanten: particulieren, bedrijven, syndici en aannemers. Gratis offerte; geen vaste prijzen online.

## Diensten
${services.map((s) => `- [${s.name}](${u(serviceUrl(s.slug))})`).join('\n')}

## Jobs
- [Jobs: ervaren elektricien en junior elektricien](${u(job.url)})

## Kennisbank
${artikels.map((a) => `- [${a.titel}](${u(artikelUrl(a.slug))})`).join('\n')}

## Meer
- [Kerngegevens](${u('/over-ons/kerngegevens/')})
- [Veelgestelde vragen](${u('/veelgestelde-vragen/')})
- [Over ons](${u('/over-ons/')})
- [Realisaties](${u('/realisaties/')})
- [Contact](${u('/contact/')})
`;
  return new Response(tekst, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
