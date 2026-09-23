// Regiopagina's — CLAUDE.md § 8: géén doorway pages. Unieke, lokale inhoud per gemeente: populaire diensten,
// realisaties uit de gemeente of deelgemeente, en (optioneel) een echte review. Pagina's met placeholders: noindex.
// Coördinaten = benaderend centrum van de gemeente, enkel om de afstand vanaf Schilde (in vogelvlucht) te tonen.
import { areas, areaUrl } from './site';

export type Regio = {
  slug: string;
  naam: string;
  deelgemeenten: string[];
  lat: number;
  lon: number;
  /** Welke diensten daar het meest gevraagd worden (tekst + dienst-slugs). Ingevuld op vraag van DCTB (23-09-2026). */
  populair: { tekst: string; diensten: string[] };
  /** Echte Google-review van een klant uit de gemeente (optioneel; enkel tonen als die er is). */
  review?: { tekst: string; naam: string };
  metaTitle: string;
  metaDescription: string;
};

const populair: Record<string, Regio['populair']> = {
  Schilde: {
    tekst: 'In Schilde werk ik veel in villa’s en ruime gezinswoningen. Laadpalen voor een (tweede) elektrische wagen, Niko Home Control bij renovaties en het keuringsklaar maken van de installatie bij de verkoop van een woning komen hier het vaakst voor.',
    diensten: ['laadpaal-installeren', 'domotica-niko-home-control', 'elektrische-keuring'],
  },
  "'s-Gravenwezel": {
    tekst: 'In ’s-Gravenwezel gaat het vaak om grotere woningen waar de elektriciteit bij een verbouwing volledig vernieuwd wordt, met aandacht voor strakke details zoals ronde inbouwstopcontacten in natuursteen. Ook verlichting en videofonie aan poort of oprit worden hier veel gevraagd.',
    diensten: ['renovatie-elektriciteit', 'verlichtingsadvies', 'video-parlofonie'],
  },
  Wijnegem: {
    tekst: 'In Wijnegem krijg ik veel vragen bij renovaties van rij- en halfopen woningen: een nieuwe verdeelkast, extra kringen voor keuken of badkamer, en een installatie die weer door de keuring raakt.',
    diensten: ['renovatie-elektriciteit', 'elektrische-keuring', 'laadpaal-installeren'],
  },
  Schoten: {
    tekst: 'In Schoten staan veel oudere woningen. Bij verkoop of verbouwing is het keuringsklaar maken van de installatie hier de meest gevraagde klus, vaak samen met een nieuwe verdeelkast met differentieelschakelaars.',
    diensten: ['elektrische-keuring', 'renovatie-elektriciteit', 'dringende-herstellingen'],
  },
  Brasschaat: {
    tekst: 'In Brasschaat en Maria-ter-Heide plaats ik vooral laadpalen bij woningen met een oprit of garage, vaak gekoppeld aan zonnepanelen om slim te laden met eigen stroom. Ook Niko Home Control bij nieuwbouw en renovatie komt hier geregeld voor.',
    diensten: ['laadpaal-installeren', 'zonnepanelen-thuisbatterij', 'domotica-niko-home-control'],
  },
  Zoersel: {
    tekst: 'In Zoersel, Halle en Sint-Antonius werk ik veel aan nieuwbouw en grondige renovaties: de volledige elektrische installatie van plan tot keuring, met meteen een voorbereiding voor laadpaal en zonnepanelen.',
    diensten: ['nieuwbouw', 'renovatie-elektriciteit', 'laadpaal-installeren'],
  },
  Zandhoven: {
    tekst: 'In Zandhoven, Pulderbos, Pulle, Massenhoven en Viersel gaat het vaak om vrijstaande woningen met zonnepanelen, waar een thuisbatterij of laadpaal slim aan de installatie wordt gekoppeld.',
    diensten: ['zonnepanelen-thuisbatterij', 'laadpaal-installeren', 'elektrische-keuring'],
  },
  Ranst: {
    tekst: 'In Ranst, Oelegem, Broechem en Emblem plaats ik vooral laadpalen, zoals onlangs aan een bakstenen gevel in Oelegem, en vernieuw ik de elektriciteit bij renovaties, vaak meteen met Niko Home Control.',
    diensten: ['laadpaal-installeren', 'renovatie-elektriciteit', 'domotica-niko-home-control'],
  },
};

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

export const regios: Regio[] = areas.map((a) => ({ slug: a.slug, naam: a.name, populair: populair[a.name], ...extra[a.name] }));
export const regioUrl = areaUrl;

/** Afstand in vogelvlucht (km, afgerond) vanaf het centrum van Schilde. */
export function afstandVanSchilde(r: Regio): number {
  const s = regios[0];
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(r.lat - s.lat), dLon = rad(r.lon - s.lon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(s.lat)) * Math.cos(rad(r.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
