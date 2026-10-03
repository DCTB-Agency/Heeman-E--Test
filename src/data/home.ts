// Inhoud homepage — CLAUDE.md § 8 (structuur), § 11.3 (In het kort / antwoord eerst), § 0.1 (beslissingen).
// Alleen bevestigde feiten; onbekend = [AANVULLEN] / [TE BEVESTIGEN].
import { business, areas } from './site';
import type { Vraag } from '../lib/schema';

export const usps = [
  { titel: 'Eén vast aanspreekpunt', tekst: 'U heeft één vast aanspreekpunt. We komen eerst langs voor een verkennend gesprek.' },
  { titel: 'Vakkennis', tekst: '10+ jaar ervaring als erkend elektricien, van nieuwbouw en renovatie tot Niko Home Control.' },
  { titel: 'Meedenken met de klant', tekst: 'We nemen de tijd om mee te denken. Geen snelle oplossing, maar een installatie die ook op lange termijn positief uitdraait voor u.' },
]

// Korte uitleg per dienst (slug uit site.ts).
export const dienstTekst: Record<string, string> = {
  'laadpaal-installeren':
    'Thuis, voor uw bedrijf of in een gemeenschappelijke parking. Slim laden en koppeling met zonnepanelen. We plaatsen onder meer Alfen en Easee.',
  'elektrische-keuring':
    'Woning verkopen of installatie afgekeurd? We brengen uw installatie in orde volgens het AREI en maken de schema’s. De keuring zelf doet een erkend keuringsorganisme.',
  'domotica-niko-home-control':
    'Vooral Niko Home Control, bij nieuwbouw of renovatie: installatie, uitbreiding en programmatie van verlichting, verwarming en toegang.',
  'renovatie-elektriciteit':
    'Bij renovaties brengen wij uw elektriciteit volledig up-to-date en conform de huidige normen, inclusief modern comfort en slimme oplossingen.',
  'zonnepanelen-thuisbatterij':
    'Zonnepanelen en thuisbatterij aansluiten en slim integreren met uw installatie en laadpaal.',
  nieuwbouw: 'De volledige elektrische installatie voor uw nieuwbouw, van plan tot keuring, met oog voor later.',
  'video-parlofonie': 'Zien wie er aanbelt en toegang eenvoudig beheren.',
  verlichtingsadvies: 'Verlichting die sfeer, functie en een laag verbruik combineert.',
  'dringende-herstellingen': 'Stroompanne of dringend probleem? 24/7 bereikbaar voor herstellingen.',
};

export const laadpaalMerken = ['Alfen', 'Easee']; // 03-10-2026: EVBox en Zaptec eruit

export const cijfers = [
  { getal: 10, suffix: '+', label: 'jaar ervaring' },
  { getal: areas.length, suffix: '', label: 'gemeenten in de regio' },
  { getal: 2018, suffix: '', label: 'eigen zaak in Schilde', van: 2000 },
];

// FAQ homepage (5 vragen, § 8) — antwoord eerst, 1–3 zinnen, zelfstandig leesbaar.
export const homeFaq: Vraag[] = [
  {
    vraag: 'In welke gemeenten werkt Heeman Electrics?',
    antwoord: `In ${areas.map((a) => a.name).slice(0, -1).join(', ')} en ${areas.at(-1)!.name}: ongeveer 20 km rond Schilde. Twijfelt u of u in ons werkgebied ligt? Bel of stuur een WhatsApp.`,
  },
  {
    vraag: 'Hoe verloopt een opdracht?',
    antwoord: 'We komen eerst langs voor een verkennend gesprek en bekijken uw situatie. Daarna krijgt u een vrijblijvende offerte. U heeft één vast aanspreekpunt van de opstart tot de oplevering, en elke installatie krijgt een kwaliteitscontrole.',
  },
  {
    vraag: 'Welke laadpalen plaatst u?',
    antwoord: 'We plaatsen onder meer laadpalen van Alfen en Easee, voor thuis, bedrijven en appartementsgebouwen. We helpen u kiezen op basis van uw aansluiting en of u zonnepanelen heeft.',
  },
  {
    vraag: 'Doet u zelf de elektrische keuring?',
    antwoord: 'Nee. De keuring gebeurt door een erkend keuringsorganisme. We maken uw installatie keuringsklaar volgens het AREI, zetten fouten recht en maken de nodige schema’s.',
  },
  {
    vraag: 'Kan ik u bereiken bij een dringend probleem?',
    antwoord: `Ja. We zijn open ${business.hours.label}. Voor dringende herstellingen zijn we 24/7 bereikbaar op ${business.phone.display}.`,
  },
];
