// Inhoud homepage — CLAUDE.md § 8 (structuur), § 11.3 (In het kort / antwoord eerst), § 0.1 (beslissingen).
// Alleen bevestigde feiten; onbekend = [AANVULLEN] / [TE BEVESTIGEN].
import { business, areas } from './site';
import type { Vraag } from '../lib/schema';

export const usps = [
  { titel: 'Persoonlijk contact', tekst: 'Ik kom zelf langs voor het eerste bezoek en de inschatting, en ben erbij bij de opstart en de oplevering.' },
  { titel: 'Vakkennis', tekst: 'Erkend elektricien met meer dan 10 jaar ervaring, van laadpaal tot Niko Home Control.' },
  { titel: 'Netjes afgewerkt', tekst: 'De kwaliteitscontrole doe ik zelf: keuringsklaar volgens het AREI, met schema’s, en een opgeruimde werf.' },
];

// Korte uitleg per dienst (slug uit site.ts).
export const dienstTekst: Record<string, string> = {
  'laadpaal-installeren':
    'Thuis, voor uw bedrijf of in een gemeenschappelijke parking. Slim laden en koppeling met zonnepanelen. Ik plaats onder meer EVBox, Alfen, Easee en Zaptec.',
  'elektrische-keuring':
    'Woning verkopen of installatie afgekeurd? Ik breng uw installatie in orde volgens het AREI en maak de schema’s. De keuring zelf doet een erkend keuringsorganisme.',
  'domotica-niko-home-control':
    'Niko Home Control bij nieuwbouw of renovatie: installatie, uitbreiding en programmatie van verlichting, verwarming en toegang.',
  'renovatie-elektriciteit':
    'Nieuwe verdeelkast, bekabeling, aarding en differentieelschakelaars. Uw elektriciteit weer veilig en up-to-date.',
  'zonnepanelen-thuisbatterij':
    'Zonnepanelen en thuisbatterij aansluiten en slim integreren met uw installatie en laadpaal.',
  nieuwbouw: 'Volledige elektrische installatie voor uw nieuwbouw, van plan tot keuring.',
  'video-parlofonie': 'Zien wie er aanbelt en toegang eenvoudig beheren.',
  verlichtingsadvies: 'Verlichting die sfeer, functie en een laag verbruik combineert.',
  'dringende-herstellingen': 'Stroompanne of dringend probleem? Ook buiten de openingsuren bereikbaar.',
};

export const laadpaalMerken = ['EVBox', 'Alfen', 'Easee', 'Zaptec'];

// "In het kort"-blok: dezelfde feiten als in llms.txt en de JSON-LD (§ 11.3).
export const inHetKort = [
  { label: 'Wie', waarde: `${business.name}, de zaak van ${business.owner}, erkend elektricien` },
  { label: 'Ervaring', waarde: 'Meer dan 10 jaar, eigen zaak sinds 2018' },
  { label: 'Wat', waarde: 'Laadpalen, keuringsklare installaties (AREI), Niko Home Control, renovatie, zonnepanelen en thuisbatterij, nieuwbouw, video- en parlofonie, verlichting' },
  { label: 'Waar', waarde: `${areas.map((a) => a.name).join(', ')} (± 20 km rond Schilde)` },
  { label: 'Adres', waarde: `${business.address.street}, ${business.address.postalCode} ${business.address.locality}` },
  { label: 'Open', waarde: `${business.hours.label}. Dringend: ook buiten de openingsuren.` },
  { label: 'Contact', waarde: `${business.phone.display} · ${business.email}` },
  { label: 'Ondernemingsnr.', waarde: business.vat },
];

export const cijfers = [
  { getal: 10, suffix: '+', label: 'jaar ervaring' },
  { getal: 8, suffix: '', label: 'gemeenten in de regio' },
  { getal: 2018, suffix: '', label: 'eigen zaak in Schilde', van: 2000 },
];

// FAQ homepage (5 vragen, § 8) — antwoord eerst, 1–3 zinnen, zelfstandig leesbaar.
export const homeFaq: Vraag[] = [
  {
    vraag: 'In welke gemeenten werkt Heeman Electrics?',
    antwoord: `In ${areas.map((a) => a.name).slice(0, -1).join(', ')} en ${areas.at(-1)!.name}: ongeveer 20 km rond Schilde. Twijfelt u of u in mijn werkgebied ligt? Bel of stuur een WhatsApp.`,
  },
  {
    vraag: 'Hoe verloopt een opdracht?',
    antwoord: 'Ik kom eerst zelf langs om uw situatie te bekijken en in te schatten. Daarna krijgt u een gratis offerte. Bij de opstart en de oplevering ben ik erbij, en de kwaliteitscontrole doe ik zelf.',
  },
  {
    vraag: 'Welke laadpalen plaatst u?',
    antwoord: 'Ik plaats onder meer laadpalen van EVBox, Alfen, Easee en Zaptec, voor thuis, bedrijven en appartementsgebouwen. Ik help u kiezen op basis van uw aansluiting en of u zonnepanelen heeft.',
  },
  {
    vraag: 'Doet u zelf de elektrische keuring?',
    antwoord: 'Nee. De keuring gebeurt door een erkend keuringsorganisme. Ik maak uw installatie keuringsklaar volgens het AREI, zet fouten recht en maak de nodige schema’s.',
  },
  {
    vraag: 'Kan ik u bereiken bij een dringend probleem?',
    antwoord: `Ja. Ik ben open ${business.hours.label}, maar voor dringende problemen ben ik ook buiten de openingsuren bereikbaar op ${business.phone.display}.`,
  },
];
