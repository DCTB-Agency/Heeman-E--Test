// Vacature junior elektricien — CLAUDE.md § 6.3. Eén bron voor de zichtbare tekst én het JobPosting-schema,
// zodat die altijd identiek zijn (vereiste van Google for Jobs).
// Placeholders [AANVULLEN] / [TE BEVESTIGEN] worden op de pagina geel gemarkeerd.
import { areas } from './site';
import type { Vraag } from '../lib/schema';

export const vacature = {
  slug: 'junior-elektricien',
  titel: 'Junior elektricien (m/v/x)',
  h1: 'Junior elektricien (m/v/x) in Schilde — leer het vak naast Bert',
  metaTitle: 'Vacature junior elektricien Schilde · Heeman',
  metaDescription:
    'Junior elektricien gezocht in Schilde. Vast voltijds contract, leer het vak naast Bert: laadpalen, domotica, zonnepanelen. Solliciteer in 1 minuut.',
  datePosted: '2026-09-23', // [TE BEVESTIGEN: publicatiedatum = dag van livegang]
  validThrough: '2026-12-31T23:59',
  intro:
    'Ik ben Bert, elektricien in Schilde met meer dan 10 jaar ervaring. Het werk groeit: laadpalen, Niko Home Control, zonnepanelen, renovaties. Daarom zoek ik een junior elektricien die met mij mee op de baan gaat en het vak écht wil leren. Geen groot bedrijf, geen callcenter: jij, ik en de klant.',

  taken: [
    'Samen met mij laadpalen plaatsen bij particulieren en bedrijven.',
    'Elektrische installaties vernieuwen en keuringsklaar maken volgens het AREI.',
    'Domotica installeren en programmeren (Niko Home Control).',
    'Zonnepanelen en thuisbatterijen aansluiten.',
    'Stap voor stap zelfstandig werken, met klantcontact.',
  ],

  profiel: [
    'Je hebt een diploma elektriciteit (TSO/BSO of gelijkwaardig). Pas afgestudeerd? Perfect.',
    'Je hebt rijbewijs B.',
    'Je spreekt goed Nederlands — je staat dagelijks bij klanten thuis.',
    'Je woont in de buurt van Schilde (± 30 minuten rijden).',
    'Je werkt netjes, bent op tijd en wil bijleren.',
  ],

  aanbod: [
    'Een vast, voltijds contract.',
    'Je leert het vak van A tot Z, rechtstreeks van mij — geen anoniem nummer in een groot team.',
    'Afwisselend werk in de eigen regio: geen uren in de file.',
    '[AANVULLEN: bedrijfswagen? opleidingen/attesten (BA4/BA5, VCA)? maaltijdcheques? gsm? werkkledij? — alleen wat Bert bevestigt]',
    'Loon: bespreekbaar in het gesprek.',
  ],

  // Realistische dag: bevestigd door Bert (23-09-2026).
  dag: [
    { uur: '07:45', wat: 'Vertrek' },
    { uur: '08:15', wat: 'Eerste klant in Schilde: laadpaal' },
    { uur: '12:00', wat: 'Middagpauze' },
    { uur: '13:00', wat: 'Renovatie in Zoersel' },
    { uur: '16:30', wat: 'Werf netjes achterlaten' },
    { uur: '17:00', wat: 'Naar huis' },
  ],

  stappen: [
    { titel: 'Je stuurt je gegevens', tekst: 'Via het formulier (1 minuut), WhatsApp, telefoon of mail.' },
    { titel: 'Ik bel je terug', tekst: 'Binnen [AANVULLEN: X] werkdagen.' },
    { titel: 'Kennismaking', tekst: 'We praten en je draait een dag mee op een werf. [TE BEVESTIGEN]' },
    { titel: 'Start', tekst: 'Je begint naast mij op de baan.' },
  ],

  faq: [
    { vraag: 'Moet ik ervaring hebben?', antwoord: 'Nee, een diploma elektriciteit en motivatie volstaan.' },
    { vraag: 'Moet ik een cv sturen?', antwoord: 'Niet verplicht; naam en gsm is genoeg om te starten.' },
    { vraag: 'Waar werk ik?', antwoord: 'In Schilde en omliggende gemeenten, binnen ± 20 km.' },
    { vraag: 'Welk contract krijg ik?', antwoord: 'Een vast, voltijds contract.' },
    { vraag: 'Kan ik ook als leerling of stagiair starten?', antwoord: '[TE BEVESTIGEN]' },
  ] satisfies Vraag[],
};

/** Vacaturetekst als HTML voor JobPosting.description — gebouwd uit exact dezelfde data als de pagina. */
export function vacatureHtml(): string {
  const lijst = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  return [
    `<p>${vacature.intro}</p>`,
    `<h2>Wat ga je doen?</h2>${lijst(vacature.taken)}`,
    `<h2>Wie zoek ik?</h2>${lijst(vacature.profiel)}`,
    `<h2>Wat bied ik?</h2>${lijst(vacature.aanbod)}`,
  ].join('');
}
