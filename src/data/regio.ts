// Regiopagina's — CLAUDE.md § 8: géén doorway pages. Minstens 50 % unieke, lokale inhoud (populaire diensten,
// echte realisaties en een review uit de gemeente). Zolang die ontbreekt: noindex + niet in de sitemap (data/noindex.ts).
// Coördinaten = benaderend centrum van de gemeente, enkel om de afstand vanaf Schilde (in vogelvlucht) te tonen.
import { areas, areaUrl } from './site';

export type Regio = {
  slug: string;
  naam: string;
  deelgemeenten: string[];
  lat: number;
  lon: number;
  populair: string; // welke diensten daar het meest gevraagd worden (door Bert)
  review: string; // echte review van een klant uit de gemeente
  metaTitle: string;
  metaDescription: string;
};

const LOKAAL = '[AANVULLEN door Bert: welke diensten hier het meest gevraagd worden en typische woningen]';
const REVIEW = '[AANVULLEN: echte Google-review van een klant uit deze gemeente (met toestemming)]';

const extra: Record<string, Omit<Regio, 'slug' | 'naam' | 'populair' | 'review'>> = {
  Schilde: { deelgemeenten: ["'s-Gravenwezel"], lat: 51.241, lon: 4.585, metaTitle: 'Elektricien in Schilde · Heeman Electrics', metaDescription: 'Uw elektricien in Schilde: laadpalen, keuringsklaar maken, Niko Home Control en renovatie. Persoonlijk contact. Bel 0485 19 00 27.' },
  "'s-Gravenwezel": { deelgemeenten: [], lat: 51.264, lon: 4.557, metaTitle: "Elektricien in 's-Gravenwezel · Heeman Electrics", metaDescription: "Elektricien in 's-Gravenwezel voor laadpalen, domotica, renovatie en keuringsklare installaties. Om de hoek, persoonlijk contact. Bel 0485 19 00 27." },
  Wijnegem: { deelgemeenten: [], lat: 51.228, lon: 4.517, metaTitle: 'Elektricien in Wijnegem · Heeman Electrics', metaDescription: 'Elektricien in Wijnegem voor laadpalen, Niko Home Control en renovatie. Persoonlijk contact en vakkundig werk. Vraag uw gratis offerte.' },
  Schoten: { deelgemeenten: [], lat: 51.252, lon: 4.502, metaTitle: 'Elektricien in Schoten · Heeman Electrics', metaDescription: 'Elektricien in Schoten: laadpaal plaatsen, installatie keuringsklaar maken of domotica. Netjes werk, gratis offerte. Bel 0485 19 00 27.' },
  Brasschaat: { deelgemeenten: ['Maria-ter-Heide'], lat: 51.291, lon: 4.492, metaTitle: 'Elektricien in Brasschaat · Heeman Electrics', metaDescription: 'Elektricien in Brasschaat voor laadpalen, Niko Home Control, renovatie en zonnepanelen. Persoonlijk contact. Vraag een gratis offerte.' },
  Zoersel: { deelgemeenten: ['Halle', 'Sint-Antonius'], lat: 51.268, lon: 4.712, metaTitle: 'Elektricien in Zoersel · Heeman Electrics', metaDescription: 'Elektricien in Zoersel, Halle en Sint-Antonius: laadpalen, domotica en renovatie. Vraag een offerte. Bel 0485 19 00 27.' },
  Zandhoven: { deelgemeenten: ['Pulderbos', 'Pulle', 'Massenhoven', 'Viersel'], lat: 51.215, lon: 4.662, metaTitle: 'Elektricien in Zandhoven · Heeman Electrics', metaDescription: 'Elektricien in Zandhoven en deelgemeenten: laadpalen, keuringsklare installaties en Niko Home Control. Gratis offerte. Vraag een offerte.' },
  Ranst: { deelgemeenten: ['Broechem', 'Emblem', 'Oelegem'], lat: 51.19, lon: 4.561, metaTitle: 'Elektricien in Ranst en Oelegem · Heeman Electrics', metaDescription: 'Elektricien in Ranst, Oelegem, Broechem en Emblem voor laadpalen, domotica en renovatie. Persoonlijk contact. Bel 0485 19 00 27.' },
};

export const regios: Regio[] = areas.map((a) => ({ slug: a.slug, naam: a.name, populair: LOKAAL, review: REVIEW, ...extra[a.name] }));
export const regioUrl = areaUrl;

/** Afstand in vogelvlucht (km, afgerond) vanaf het centrum van Schilde. */
export function afstandVanSchilde(r: Regio): number {
  const s = regios[0];
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(r.lat - s.lat), dLon = rad(r.lon - s.lon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(s.lat)) * Math.cos(rad(r.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
