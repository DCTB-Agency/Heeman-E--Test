// Kennisbank — CLAUDE.md § 11.3–11.4: vraaggerichte koppen, antwoord eerst, auteur + datum, bronnen.
// Regels en premies altijd [te controleren] met officiële bron.
export type Artikel = {
  slug: string;
  titel: string;
  beschrijving: string;
  gepubliceerd: string;
  bijgewerkt: string;
  intro: string;
  secties: { vraag: string; antwoord: string; meer?: string[] }[];
  bronnen: { naam: string; url: string }[];
  cta: { tekst: string; href: string; knop: string };
};

export const artikels: Artikel[] = [
  {
    slug: 'elektricien-worden-wat-leer-je-als-junior',
    titel: 'Elektricien worden: wat leer je als junior?',
    beschrijving: 'Wat doet een junior elektricien, welk diploma heb je nodig en wat leer je op de werf? Uitleg van Bert Heeman, elektricien in Schilde.',
    gepubliceerd: '2026-09-23',
    bijgewerkt: '2026-09-23',
    intro:
      'Pas afgestudeerd in elektriciteit en benieuwd hoe het er op de werf aan toegaat? Hieronder vertel ik wat je als junior elektricien doet, wat je nodig hebt en wat je bij mij leert.',
    secties: [
      {
        vraag: 'Wat doet een junior elektricien?',
        antwoord:
          'Een junior elektricien werkt mee aan elektrische installaties, samen met een ervaren elektricien. Bij mij plaats je laadpalen, vernieuw je installaties en maak je ze keuringsklaar, installeer je Niko Home Control en sluit je zonnepanelen en thuisbatterijen aan. Stap voor stap werk je zelfstandiger, ook in contact met klanten.',
      },
      {
        vraag: 'Welk diploma heb je nodig?',
        antwoord:
          'Een diploma elektriciteit (TSO, BSO of gelijkwaardig) volstaat. Ervaring is niet nodig: pas afgestudeerd is perfect. Belangrijker zijn motivatie, stiptheid en netjes werken.',
        meer: ['Rijbewijs B is nodig, want we rijden naar werven in de regio.', 'Je spreekt goed Nederlands: je staat dagelijks bij klanten thuis.'],
      },
      {
        vraag: 'Wat leer je op de werf?',
        antwoord:
          'Op school leer je de theorie; op de werf leer je hoe je een installatie in de praktijk netjes en veilig uitvoert. Denk aan kabels trekken en wegwerken, verdeelkasten aansluiten, laadpalen plaatsen en instellen, domotica programmeren en de schema’s die bij een keuring horen.',
      },
      {
        vraag: 'Wat is het AREI?',
        antwoord:
          'Het AREI is het Algemeen Reglement op de Elektrische Installaties: de Belgische regels waaraan een elektrische installatie moet voldoen. Als elektricien werk je er elke dag mee, bijvoorbeeld wanneer je een installatie keuringsklaar maakt. [te controleren]',
      },
      {
        vraag: 'Wat zijn BA4 en BA5?',
        antwoord:
          'Dat zijn bevoegdheidsniveaus uit het AREI: BA4 staat voor een gewaarschuwd persoon, BA5 voor een vakbekwaam persoon. Ze bepalen welke elektrische werken je zelfstandig mag uitvoeren. [te controleren] Of je deze attesten bij mij kan behalen: [AANVULLEN]',
      },
      {
        vraag: 'Hoe ziet een werkdag eruit?',
        antwoord:
          'We vertrekken ’s ochtends naar een eerste klant in de regio, bijvoorbeeld voor een laadpaal, en werken ’s namiddag verder aan een renovatie. Aan het eind van de dag laten we de werf netjes achter. Werven liggen binnen ± 20 km rond Schilde, dus weinig file.',
      },
    ],
    bronnen: [{ naam: 'FOD Economie — AREI', url: 'https://economie.fgov.be/nl' }],
    cta: { tekst: 'Ik zoek een junior elektricien in de regio Schilde.', href: '/jobs/junior-elektricien/', knop: 'Bekijk de vacature' },
  },
];

// Gepland (brief § 11.4) — nog te schrijven, 1 per maand.
export const gepland = [
  'Hoeveel kost een laadpaal thuis laten plaatsen?',
  'Laadpaal en zonnepanelen combineren: hoe werkt slim laden?',
  'Laadpaal voor een appartementsgebouw: wat moet de syndicus weten?',
  'Wanneer is een elektrische keuring verplicht in Vlaanderen?',
  'Installatie afgekeurd bij verkoop van uw woning: wat nu?',
  'Wat kost Niko Home Control en wat kan het?',
  'Bestaande Niko-installatie uitbreiden naar Home Control: kan dat?',
  'Verdeelkast vernieuwen: wanneer is het tijd?',
  'Thuisbatterij: wanneer is het zinvol?',
];

export const artikelUrl = (slug: string) => `/kennisbank/${slug}/`;
