// Vacatures (03-10-2026): twee aparte jobs — eerst een ervaren elektricien (min. 3 jaar), daarnaast een junior
// (net van de schoolbanken; ook stageplaatsen). Eén bron voor de zichtbare tekst én het JobPosting-schema,
// zodat die altijd identiek zijn (vereiste van Google for Jobs). Solliciteren: enkel via het formulier, cv verplicht.
// Placeholders [AANVULLEN] / [TE BEVESTIGEN] worden op de pagina geel gemarkeerd.
import type { Vraag } from '../lib/schema';
import type { FotoId } from './fotos';

export type Vacature = {
  slug: string;
  titel: string;
  kort: string;
  h1: [string, string];
  metaTitle: string;
  metaDescription: string;
  datePosted: string;
  validThrough: string;
  intro: string;
  taken: string[];
  profiel: string[];
  aanbod: string[];
  faq: Vraag[];
  /** Maanden ervaring voor JobPosting.experienceRequirements (0 = geen ervaring nodig). */
  ervaringMaanden: number;
  /** Beeld op de vacaturekaart (/jobs/): echte foto of placeholder. */
  kaart: FotoId | { placeholder: string };
};

// Tekst van Heeman Electrics (03-10-2026), licht aangepast.
export const jobsIntro = {
  titel: 'Klaar voor een nieuwe uitdaging?',
  ondertitel: 'Wij zijn op zoek naar jou!',
  tekst:
    'Op zoek naar een leuke job in een tof team van ervaren elektriciens? Of op zoek naar een geschikte stageplaats in de omgeving van Schilde? Dan zijn wij ook op zoek naar jou! We werken al jaren samen met scholen in de buurt en geven blijvend trainingen op de job zelf. Het delen van kennis is voor ons belangrijk. Om de groei van ons bedrijf te verzekeren, zijn we altijd op zoek naar een ervaren en gemotiveerde elektricien om ons team te vervoegen.',
};

const gemeenschappelijkProfiel = [
  'Je bent gemotiveerd en hebt een passie voor fijne afwerking.',
  'Je bent stipt, nauwkeurig, betrouwbaar en loyaal.',
  'Taalkennis: Nederlands, Frans en Engels.',
  'Rijbewijs B en eigen vervoer zijn een must.',
];

const aanbod = [
  'Een voltijds contract en een marktconform loon.',
  'Een uitdagende job in de buurt: al onze werven liggen in Schilde en de omliggende gemeenten.',
  'Gevarieerde jobinhoud: nieuwbouw, renovatie en domotica.',
  'Werkkledij.',
  'Opleiding op de job: kennis delen is voor ons belangrijk.',
];

const vragenCv: Vraag = { vraag: 'Moet ik een cv sturen?', antwoord: 'Ja, een cv is verplicht. Voeg het toe in het formulier, of stuur het via WhatsApp.' };
const vragenWaar: Vraag = { vraag: 'Waar werk ik?', antwoord: 'Altijd in de buurt: in Schilde en de omliggende gemeenten. Geen lange verplaatsingen.' };
const vragenVervoer: Vraag = { vraag: 'Heb ik rijbewijs B en eigen vervoer nodig?', antwoord: 'Ja, dat is een must.' };

export const vacatures: Vacature[] = [
  {
    slug: 'ervaren-elektricien',
    titel: 'Ervaren elektricien',
    kort: 'Min. 3 jaar ervaring, bij voorkeur in nieuwbouw en renovatie.',
    h1: ['Ervaren elektricien:', 'een uitdagende job in de buurt'],
    metaTitle: 'Vacature ervaren elektricien Schilde · Heeman Electrics',
    metaDescription:
      'Ben je op zoek naar een uitdagende job als elektricien in de buurt van Schilde? Min. 3 jaar ervaring, voltijds, marktconform loon. Solliciteer online.',
    datePosted: '2026-10-03', // [TE BEVESTIGEN: publicatiedatum = dag van livegang]
    validThrough: '2027-03-31T23:59',
    intro:
      'Ben je op zoek naar een uitdagende job in de buurt als elektricien? Om de groei van ons bedrijf te verzekeren, zijn we op zoek naar een ervaren en gemotiveerde elektricien om ons team te vervoegen. Je hebt ervaring in elektriciteit, bij voorkeur in nieuwbouw en renovatie, en een passie voor fijne afwerking.',
    taken: [
      'Elektrische installaties plaatsen in nieuwbouw en bij renovaties.',
      'Verdeelkasten, bekabeling, stopcontacten en verlichting plaatsen en aansluiten.',
      'Domotica installeren en programmeren.',
      'Installaties keuringsklaar afwerken volgens het AREI.',
      'Zelfstandig werken op de werf en je kennis delen met jongere collega’s en stagiairs.',
    ],
    profiel: [
      'Je hebt minstens 3 jaar ervaring als elektricien, bij voorkeur in nieuwbouw en renovatie.',
      ...gemeenschappelijkProfiel,
    ],
    aanbod,
    faq: [
      { vraag: 'Hoeveel ervaring moet ik hebben?', antwoord: 'Minstens 3 jaar als elektricien, bij voorkeur in nieuwbouw en renovatie.' },
      vragenCv,
      vragenWaar,
      { vraag: 'Welk contract krijg ik?', antwoord: 'Een voltijds contract met een marktconform loon.' },
      vragenVervoer,
    ],
    ervaringMaanden: 36,
    kaart: 'stopcontactenPlaatsing',
  },
  {
    slug: 'junior-elektricien',
    titel: 'Junior elektricien',
    kort: 'Net van de schoolbanken en klaar om het vak te leren. Ook stageplaatsen.',
    h1: ['Junior elektricien:', 'leer het vak in de buurt'],
    metaTitle: 'Vacature junior elektricien Schilde · Heeman Electrics',
    metaDescription:
      'Net afgestudeerd in elektriciteit? Leer het vak in een tof team van ervaren elektriciens, in de buurt van Schilde. Ook stageplaatsen. Solliciteer online.',
    datePosted: '2026-09-23', // [TE BEVESTIGEN: publicatiedatum = dag van livegang]
    validThrough: '2027-03-31T23:59',
    intro:
      'Kom je net van de schoolbanken en wil je het vak écht leren? Bij ons leer je het op de werf, in een tof team van ervaren elektriciens. We werken al jaren samen met scholen in de buurt en geven blijvend trainingen op de job zelf. Ook voor een stageplaats kan je bij ons terecht.',
    taken: [
      'Mee elektrische installaties plaatsen in nieuwbouw en bij renovaties.',
      'Verdeelkasten, bekabeling, stopcontacten en verlichting leren plaatsen en aansluiten.',
      'Domotica leren installeren.',
      'Stap voor stap zelfstandiger werken, met begeleiding van ervaren collega’s.',
    ],
    profiel: [
      'Je hebt een diploma elektriciteit (of je studeert binnenkort af) en wil het vak leren.',
      ...gemeenschappelijkProfiel,
    ],
    aanbod: [...aanbod.slice(0, 2), 'Je leert het vak op de werf, met begeleiding van ervaren collega’s.', ...aanbod.slice(2)],
    faq: [
      { vraag: 'Moet ik ervaring hebben?', antwoord: 'Nee. Een diploma elektriciteit en de motivatie om het vak te leren volstaan.' },
      { vraag: 'Kan ik ook stage lopen?', antwoord: 'Ja. We werken al jaren samen met scholen in de buurt en bieden stageplaatsen aan. Kies "Stageplaats" in het formulier.' },
      vragenCv,
      vragenWaar,
      vragenVervoer,
    ],
    ervaringMaanden: 0,
    kaart: { placeholder: 'team aan het werk op een werf' },
  },
];

export const vacatureUrl = (slug: string) => `/jobs/${slug}/`;


export const stappen = [
  { titel: 'Je solliciteert', tekst: 'Via het formulier of via WhatsApp, met je cv.' },
  { titel: 'We nemen contact op', tekst: 'Binnen [AANVULLEN: X] werkdagen.' },
  { titel: 'Kennismaking', tekst: 'Een gesprek waarin we elkaar leren kennen en de job overlopen.' },
  { titel: 'Start', tekst: 'Je begint in het team, met de nodige begeleiding.' },
];

/** Alle job-FAQ's (zonder dubbels) voor /veelgestelde-vragen/. */
export const jobsFaq: Vraag[] = [...new Map(vacatures.flatMap((v) => v.faq).map((q) => [q.vraag, q])).values()];

/** Vacaturetekst als HTML voor JobPosting.description — gebouwd uit exact dezelfde data als de pagina. */
export function vacatureHtml(v: Vacature): string {
  const lijst = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  return [
    `<p>${v.intro}</p>`,
    `<h2>Wat ga je bijvoorbeeld doen?</h2>${lijst(v.taken)}`,
    `<h2>Wie zoeken we?</h2>${lijst(v.profiel)}`,
    `<h2>Wat bieden we?</h2>${lijst(v.aanbod)}`,
  ].join('');
}
