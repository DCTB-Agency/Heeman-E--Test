// Dienstpagina's — CLAUDE.md § 8 (template + aandachtspunten), § 9 (metadata), § 11.3 (antwoord eerst), § 0.1.
// Regels: geen vaste prijzen, geen bedragen; premies/regels met datum van controle + officiële bron,
// "wij"-vorm (de firma; Bert enkel op /over-ons/), keuring gebeurt door een erkend keuringsorganisme. Onbekend = [AANVULLEN] / [TE BEVESTIGEN].
import type { Vraag } from '../lib/schema';
import type { FotoId } from './fotos';

export type Stap = { titel: string; tekst: string };
export type Bron = { naam: string; url: string };

export type Dienst = {
  slug: string;
  naam: string;
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  antwoord: string; // antwoord-eerst-alinea, 40–60 woorden
  voorWie: string[];
  stappen?: Stap[]; // standaard: STANDAARD_STAPPEN
  inOfferte: string[];
  /** Kader met premies, fiscale voordelen of regels, met officiële bron (§ 8.6). Gecontroleerd: zie PREMIES_GECONTROLEERD. */
  premies?: { titel: string; tekst: string; bronnen: Bron[] };
  faq: Vraag[];
  /** Twee beelden: een echte foto (FotoId) of, zolang die ontbreekt, een omschrijving voor een placeholder. */
  fotos: [FotoId | { placeholder: string }, FotoId | { placeholder: string }];
  bijgewerkt: string;
};

export const STANDAARD_STAPPEN: Stap[] = [
  { titel: 'Bezoek en inschatting', tekst: 'We komen langs, bekijken uw situatie en bespreken wat u wil.' },
  { titel: 'Gratis offerte', tekst: 'U krijgt een duidelijke offerte met wat er gebeurt en welk materiaal we gebruiken.' },
  { titel: 'Uitvoering', tekst: 'Het werk gebeurt netjes, volgens het AREI, met één vast aanspreekpunt.' },
  { titel: 'Oplevering en controle', tekst: 'We doen een kwaliteitscontrole en leggen u uit hoe alles werkt.' },
];

const BIJGEWERKT = '2026-09-23';

// Regels en premies online nagekeken op 12-10-2026 (FOD Financiën, Vlaanderen.be/Mijn VerbouwPremie, FOD Economie,
// Fluvius en vakbronnen). Jaarlijks opnieuw controleren: premies veranderen geregeld.
export const PREMIES_GECONTROLEERD = 'oktober 2026';
const BRON = {
  vlaanderen: { naam: 'Vlaanderen.be — premies voor renovatie', url: 'https://www.vlaanderen.be/premies-voor-renovatie' },
  verbouwpremie: { naam: 'Mijn VerbouwPremie (Vlaanderen.be)', url: 'https://www.vlaanderen.be/bouwen-wonen-en-energie/bouwen-en-verbouwen/premies-voor-renovatie/mijn-verbouwpremie' },
  energiesparen: { naam: 'Vlaams Energie- en Klimaatagentschap (VEKA)', url: 'https://www.vlaanderen.be/veka' },
  financien: { naam: 'FOD Financiën', url: 'https://financien.belgium.be/' },
  economie: { naam: 'FOD Economie — AREI', url: 'https://economie.fgov.be/nl' },
  fluvius: { naam: 'Fluvius', url: 'https://www.fluvius.be/nl' },
} satisfies Record<string, Bron>;

export const diensten: Dienst[] = [
  {
    slug: 'laadpaal-installeren',
    naam: 'Laadpaal installeren',
    serviceType: 'Installatie van laadpalen voor elektrische wagens',
    metaTitle: 'Laadpaal laten plaatsen in Schilde · Heeman Electrics',
    metaDescription:
      'Laadpaal thuis of voor uw bedrijf in Schilde en omgeving. Persoonlijk contact, vakkundig en netjes geplaatst. Gratis offerte of bel 0485 19 00 27.',
    h1: 'Laadpaal laten plaatsen',
    antwoord:
      'Een laadpaal thuis of voor uw bedrijf laat u plaatsen door een erkend elektricien. We komen langs om uw aansluiting en verdeelkast te bekijken en u krijgt een gratis offerte. Daarna plaatsen we de laadpaal, onder meer van Alfen of Easee, stellen hem in en maken alles klaar voor de keuring.',
    voorWie: [
      'Thuisladen: u heeft (binnenkort) een elektrische of plug-in hybride wagen.',
      'Bedrijven: laadpunten voor uw eigen wagens, personeel of bezoekers.',
      'Appartementsgebouwen en syndici: laadpunten in een gemeenschappelijke parking.',
      'Zonnepanelen: u wil slim laden met uw eigen zonnestroom.',
    ],
    inOfferte: [
      'De laadpaal zelf (onder meer Alfen of Easee)',
      'De kabel van uw verdeelkast naar de laadpaal',
      'De beveiliging in de verdeelkast',
      'Plaatsing, aansluiting en instellen (ook slim laden of load balancing waar nodig)',
      'Voorbereiding op de keuring',
    ],
    premies: {
      titel: 'Premies en fiscaal voordeel',
      tekst:
        'Particulieren: sinds 1 september 2024 is er geen federale belastingvermindering meer voor een thuislaadpaal. Wel geldt in een woning van minstens 10 jaar oud meestal 6% btw in plaats van 21%. Bedrijven en zelfstandigen: de verhoogde aftrek is afgeschaft; voor een publiek toegankelijke laadpaal geldt onder voorwaarden nog 100% aftrek. Sommige gemeenten geven een lokale premie.',
      bronnen: [BRON.financien, BRON.vlaanderen, BRON.energiesparen],
    },
    faq: [
      {
        vraag: 'Welke laadpaal past bij mij?',
        antwoord:
          'Dat hangt af van uw aansluiting (1- of 3-fasig), hoeveel u rijdt en of u zonnepanelen heeft. Bij het bezoek bekijken we dat en raden we een model aan. We plaatsen onder meer Alfen en Easee.',
      },
      {
        vraag: 'Kan ik laden met mijn eigen zonnestroom?',
        antwoord:
          'Ja, met een laadpaal die slim laden ondersteunt. De laadpaal past het laadvermogen dan aan aan wat uw zonnepanelen op dat moment opwekken.',
      },
      {
        vraag: 'Plaatst u ook laadpalen voor bedrijven en appartementen?',
        antwoord:
          'Ja. Voor bedrijven plaatsen we laadpunten voor eigen wagens, personeel of bezoekers. In appartementsgebouwen werken we samen met de syndicus voor laadpunten in de gemeenschappelijke parking.',
      },
      {
        vraag: 'Moet een laadpaal gekeurd worden?',
        antwoord:
          'Een laadpaal is een uitbreiding van uw elektrische installatie en moet volgens het AREI in orde zijn. De keuring gebeurt door een erkend keuringsorganisme; wij maken alles daarvoor klaar.',
      },
      {
        vraag: 'Is er een premie of fiscaal voordeel voor een laadpaal?',
        antwoord:
          'Voor particulieren is de belastingvermindering voor een thuislaadpaal gestopt op 1 september 2024. In een woning van minstens 10 jaar oud betaalt u wel meestal 6% btw. Voor bedrijven geldt onder voorwaarden nog een fiscale aftrek voor publiek toegankelijke laadpalen. Vraag ook na bij uw gemeente of er een lokale premie is.',
      },
    ],
    fotos: ['laadpaal', { placeholder: 'laadpunten in een bedrijfsparking of gemeenschappelijke parking' }],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'elektrische-keuring',
    naam: 'Installatie keuringsklaar maken',
    serviceType: 'Elektrische installatie keuringsklaar maken volgens het AREI',
    metaTitle: 'Installatie keuringsklaar maken · Elektricien Schilde',
    metaDescription:
      'Woning verkopen of installatie afgekeurd? Wij brengen uw elektrische installatie in orde volgens het AREI, in Schilde en omgeving. Gratis offerte.',
    h1: 'Elektrische installatie keuringsklaar maken',
    antwoord:
      'Wil u uw woning verkopen of is uw elektrische installatie afgekeurd? Dan moet ze in orde gebracht worden volgens het AREI. We bekijken uw installatie, zetten de inbreuken recht en maken de verplichte schema’s. De keuring zelf gebeurt daarna door een erkend keuringsorganisme; wij zorgen dat uw installatie daar klaar voor is.',
    voorWie: [
      'U verkoopt uw woning en de installatie moet gekeurd worden.',
      'Uw installatie is afgekeurd en de inbreuken moeten worden rechtgezet.',
      'U heeft uw installatie uitgebreid of gewijzigd.',
      'U wil vooraf weten of uw installatie in orde is.',
    ],
    stappen: [
      { titel: 'Nazicht', tekst: 'We komen langs en bekijken uw installatie, en het keuringsverslag als u er al een heeft.' },
      { titel: 'Gratis offerte', tekst: 'U krijgt een offerte met wat er rechtgezet moet worden.' },
      { titel: 'Herstellingen en schema’s', tekst: 'We zetten de inbreuken recht en maken het eendraadschema en situatieschema.' },
      { titel: 'Keuring', tekst: 'Een erkend keuringsorganisme keurt de installatie. Wij doen vooraf de controle.' },
    ],
    inOfferte: [
      'Nazicht van uw installatie en eventueel keuringsverslag',
      'Rechtzetten van de inbreuken (bv. aarding, differentieel, beveiliging, verdeelkast)',
      'Het eendraadschema en situatieschema',
      'Voorbereiding op de (her)keuring',
    ],
    premies: {
      titel: 'Wanneer is een keuring verplicht?',
      tekst:
        'Een keuring door een erkend keuringsorganisme is verplicht bij een nieuwe installatie (vóór ingebruikname), na een belangrijke wijziging of uitbreiding, en bij de verkoop van een woning zonder geldig keuringsverslag. Wordt de installatie bij een verkoop afgekeurd, dan heeft de koper 18 maanden na de notariële akte om de inbreuken te laten herstellen en de installatie opnieuw te laten keuren. Een positief keuringsverslag blijft 25 jaar geldig.',
      bronnen: [BRON.economie],
    },
    faq: [
      {
        vraag: 'Doet u zelf de elektrische keuring?',
        antwoord:
          'Nee. De keuring gebeurt door een erkend keuringsorganisme. We maken uw installatie keuringsklaar volgens het AREI, zetten fouten recht en maken de nodige schema’s.',
      },
      {
        vraag: 'Wanneer is een elektrische keuring verplicht?',
        antwoord:
          'Bij een nieuwe installatie, na een belangrijke wijziging of uitbreiding, en bij de verkoop van een woning zonder geldig keuringsverslag. Een positief verslag blijft 25 jaar geldig.',
      },
      {
        vraag: 'Mijn installatie is afgekeurd. Wat nu?',
        antwoord:
          'In het keuringsverslag staan de inbreuken. Bij een verkoop heeft de koper 18 maanden na de notariële akte om ze te laten herstellen en de installatie opnieuw te laten keuren. We komen kijken, herstellen wat nodig is en daarna volgt de herkeuring door het keuringsorganisme.',
      },
      {
        vraag: 'Maakt u ook de schema’s?',
        antwoord: 'Ja. We maken het eendraadschema en het situatieschema die nodig zijn voor de keuring.',
      },
      {
        vraag: 'Kan ik vooraf laten nakijken of mijn installatie in orde is?',
        antwoord:
          'Ja. We komen langs, bekijken uw installatie en zeggen u wat er moet gebeuren voordat u de keuring aanvraagt. Zo voorkomt u verrassingen.',
      },
    ],
    fotos: ['oudeVerdeelkast', 'verdeelkast'],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'domotica-niko-home-control',
    naam: 'Domotica',
    serviceType: 'Installatie en programmatie van Niko Home Control',
    metaTitle: 'Niko Home Control installeren in Schilde · Heeman',
    metaDescription:
      'Domotica met Niko Home Control bij nieuwbouw of renovatie in Schilde en omgeving. Installatie, uitbreiding en programmatie. Vraag een offerte.',
    h1: 'Niko Home Control installeren',
    antwoord:
      'Met Niko Home Control stuurt u verlichting, verwarming en toegang centraal en slim aan. We installeren het bij nieuwbouw en renovatie, breiden bestaande installaties uit en programmeren alles op maat van hoe u woont of werkt. U krijgt eerst een bezoek, advies en een gratis offerte.',
    voorWie: [
      'Nieuwbouw: u wil van bij de start een slimme installatie.',
      'Renovatie: u vernieuwt uw elektriciteit en wil meteen domotica.',
      'Uitbreiding: u heeft al Niko Home Control en wil meer sturen.',
      'Bedrijven: centrale sturing van verlichting en toegang.',
    ],
    inOfferte: [
      'Advies over wat u wil sturen (verlichting, verwarming, toegang)',
      'Het Niko Home Control-materiaal en de bekabeling',
      'Installatie en aansluiting',
      'Programmatie op maat en uitleg bij de oplevering',
    ],
    faq: [
      {
        vraag: 'Kan Niko Home Control ook in een bestaande woning?',
        antwoord:
          'Ja. Bij een renovatie kunnen we Niko Home Control installeren. Hoeveel werk dat is, hangt af van uw huidige bekabeling; dat bekijken we bij het bezoek.',
      },
      {
        vraag: 'Kan ik mijn bestaande Niko-installatie uitbreiden?',
        antwoord:
          'Vaak wel, maar dat hangt af van uw huidige installatie. We komen kijken wat er mogelijk is en welke stappen nodig zijn.',
      },
      {
        vraag: 'Wat kan ik met Niko Home Control sturen?',
        antwoord:
          'Onder meer verlichting, verwarming en toegangscontrole, centraal vanuit één systeem. Wat u precies wil sturen, bespreken we vooraf.',
      },
      {
        vraag: 'Programmeert u de installatie ook?',
        antwoord: 'Ja. We programmeren alles op maat en leggen u bij de oplevering uit hoe het werkt.',
      },
      {
        vraag: 'Kan ik later nog aanpassingen laten doen?',
        antwoord: 'Ja. Een Niko Home Control-installatie kan later worden aangepast of uitgebreid. Bel of stuur een WhatsApp.',
      },
    ],
    fotos: ['schakelaars', { placeholder: 'verdeelkast met domotica-modules' }],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'renovatie-elektriciteit',
    naam: 'Algemene elektriciteitswerken & renovatie',
    serviceType: 'Algemene elektriciteitswerken en renovatie van elektrische installaties',
    metaTitle: 'Elektriciteitswerken & renovatie Schilde · Heeman',
    metaDescription:
      'Algemene elektriciteitswerken en renovatieprojecten in Schilde en omgeving: verdeelkast, bekabeling, stopcontacten en verlichting. Conform de normen.',
    h1: 'Algemene elektriciteitswerken en renovatieprojecten',
    antwoord:
      'Bij renovaties brengen wij uw elektriciteit volledig up-to-date en conform de huidige normen, inclusief modern comfort en slimme oplossingen. Van een extra stopcontact of lichtpunt tot een volledig vernieuwde installatie met nieuwe verdeelkast, bekabeling, aarding en differentieelschakelaars, met de nodige schema’s voor de keuring.',
    voorWie: [
      'U verbouwt en de oude installatie moet mee vernieuwd worden.',
      'U wil extra stopcontacten, lichtpunten of kringen laten bijplaatsen.',
      'Uw verdeelkast is verouderd of heeft nog smeltzekeringen.',
      'Uw installatie is afgekeurd of heeft geen goede aarding.',
      'U wil uw installatie klaarmaken voor een laadpaal, warmtepomp of zonnepanelen.',
    ],
    inOfferte: [
      'Nieuwe verdeelkast met automaten en differentieelschakelaars',
      'Nieuwe of aangepaste bekabeling, stopcontacten en lichtpunten',
      'Aarding en de nodige beveiligingen',
      'Eendraadschema en situatieschema, klaar voor de keuring',
    ],
    premies: {
      titel: 'Premies bij renovatie',
      tekst: 'Via Mijn VerbouwPremie kunnen elektriciteitswerken in een woning van minstens 15 jaar oud in aanmerking komen, als voorbereidende werken binnen een bredere renovatie. Sinds 1 maart 2026 geldt dat enkel nog voor de lagere inkomenscategorieën. Voor renovatie van een woning van minstens 10 jaar oud geldt bovendien meestal 6% btw in plaats van 21%.',
      bronnen: [BRON.verbouwpremie, BRON.financien],
    },
    faq: [
      {
        vraag: 'Wanneer is het tijd om mijn verdeelkast te vervangen?',
        antwoord:
          'Bijvoorbeeld als er nog smeltzekeringen in zitten, als er geen of te weinig differentieelschakelaars zijn, als uw installatie is afgekeurd of als u grote toestellen zoals een laadpaal wil bijplaatsen. We komen het graag bekijken.',
      },
      {
        vraag: 'Is mijn installatie na de renovatie keuringsklaar?',
        antwoord:
          'Ja, we werken volgens het AREI en maken de nodige schema’s. De keuring zelf gebeurt door een erkend keuringsorganisme.',
      },
      {
        vraag: 'Moet alles in één keer vernieuwd worden?',
        antwoord: 'Niet altijd. Wat nodig is en in welke volgorde, bespreken we bij het bezoek, rekening houdend met uw verbouwing.',
      },
      {
        vraag: 'Houdt u rekening met een laadpaal of zonnepanelen later?',
        antwoord:
          'Ja. Bij een renovatie plannen we de verdeelkast en bekabeling zo dat een laadpaal, zonnepanelen of Niko Home Control later eenvoudig kunnen worden toegevoegd.',
      },
      {
        vraag: 'Maakt u ook de schema’s?',
        antwoord: 'Ja. Na de renovatie maken we het eendraadschema en het situatieschema die nodig zijn voor de keuring.',
      },
    ],
    fotos: ['bekabeling', 'verdeelkast'],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'zonnepanelen-thuisbatterij',
    naam: 'Zonnepanelen & thuisbatterij',
    serviceType: 'Plaatsen, aansluiten en integreren van zonnepanelen en thuisbatterijen',
    metaTitle: 'Zonnepanelen & thuisbatterij plaatsen · Schilde',
    metaDescription:
      'Zonnepanelen en thuisbatterij plaatsen, aansluiten en slim koppelen aan uw installatie en laadpaal, in Schilde en omgeving. Vrijblijvende offerte.',
    h1: 'Zonnepanelen en thuisbatterij plaatsen en aansluiten',
    antwoord:
      'Zonnepanelen en een thuisbatterij halen het meeste uit uw stroom als ze goed samenwerken met de rest van uw installatie. We plaatsen de panelen, sluiten alles aan en integreren het met uw verdeelkast en laadpaal, zodat u bijvoorbeeld uw wagen kan laden met eigen zonnestroom. U krijgt eerst advies en een gratis offerte.',
    voorWie: [
      'U heeft zonnepanelen en wil ze slim koppelen aan uw laadpaal.',
      'U overweegt een thuisbatterij bij uw bestaande zonnepanelen.',
      'U wil zonnepanelen laten plaatsen en aansluiten door één partij.',
    ],
    inOfferte: [
      'Plaatsing van de zonnepanelen en de omvormer',
      'Aansluiting op uw verdeelkast met de nodige beveiliging',
      'Integratie met laadpaal en (eventueel) energiebeheer',
      'Aansluiting van de thuisbatterij',
      'Controle en uitleg bij de oplevering',
    ],
    premies: {
      titel: 'Premies en regels',
      tekst:
        'In Vlaanderen is er geen premie meer voor zonnepanelen of een thuisbatterij. Wel betaalt u voor zonnepanelen op een woning van minstens 10 jaar oud 6% btw in plaats van 21%. Sinds de invoering van het capaciteitstarief betaalt u een deel van uw nettarief op uw hoogste verbruikspiek per maand; slim laden en een thuisbatterij kunnen die piek verlagen.',
      bronnen: [BRON.energiesparen, BRON.fluvius, BRON.vlaanderen],
    },
    faq: [
      {
        vraag: 'Plaatst u ook de zonnepanelen zelf?',
        antwoord: 'Ja. We plaatsen de zonnepanelen en sluiten ze aan op uw installatie, zodat u één aanspreekpunt heeft.',
      },
      {
        vraag: 'Kan ik mijn laadpaal koppelen aan mijn zonnepanelen?',
        antwoord:
          'Ja, met een laadpaal die slim laden ondersteunt. Dan laadt uw wagen zoveel mogelijk met uw eigen zonnestroom.',
      },
      {
        vraag: 'Is een thuisbatterij zinvol voor mij?',
        antwoord:
          'Dat hangt af van uw verbruik, uw zonnepanelen en uw verbruikspieken (capaciteitstarief). We bekijken het met u bij het bezoek.',
      },
      {
        vraag: 'Is er een premie voor een thuisbatterij?',
        antwoord: 'Nee. De Vlaamse premie voor een thuisbatterij is stopgezet en er is op dit moment geen nieuwe premie. Een batterij kan wel uw verbruikspieken en dus uw capaciteitstarief verlagen.',
      },
      {
        vraag: 'Moet mijn verdeelkast aangepast worden voor een thuisbatterij?',
        antwoord: 'Soms wel. Dat hangt af van uw huidige verdeelkast en beveiliging. We bekijken het bij het bezoek en nemen het mee in de offerte.',
      },
    ],
    fotos: ['zonnepanelen', { placeholder: 'omvormer en thuisbatterij netjes aangesloten' }],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'nieuwbouw',
    naam: 'Nieuwbouw',
    serviceType: 'Elektrische installatie voor nieuwbouw',
    metaTitle: 'Elektriciteit nieuwbouw in Schilde · Heeman Electrics',
    metaDescription:
      'Volledige elektrische installatie voor uw nieuwbouw in Schilde en omgeving, van plan tot keuring. Erkend elektricien, gratis offerte.',
    h1: 'Elektrische installatie voor nieuwbouw',
    antwoord:
      'Bouwt u nieuw in Schilde of omgeving? Dan zorgen wij voor de volledige elektrische installatie: van het plan met stopcontacten en lichtpunten tot de verdeelkast, bekabeling en afwerking. We denken meteen aan later: een laadpaal, zonnepanelen of Niko Home Control. Na afloop is uw installatie klaar voor de keuring door een erkend organisme.',
    voorWie: [
      'Particulieren die een woning bouwen.',
      'Bouwheren en aannemers die een elektricien zoeken voor een project.',
      'Wie van bij de start een laadpaal, zonnepanelen of domotica wil voorzien.',
    ],
    inOfferte: [
      'Elektrisch plan: stopcontacten, lichtpunten, schakelaars',
      'Verdeelkast, bekabeling en aarding',
      'Voorbereiding voor laadpaal, zonnepanelen of domotica',
      'Eendraadschema, situatieschema en voorbereiding op de keuring',
    ],
    faq: [
      {
        vraag: 'Wanneer moet ik u contacteren bij een nieuwbouw?',
        antwoord: 'Zo vroeg mogelijk, liefst als de plannen er zijn. Dan kunnen we het elektrisch plan samen uitwerken.',
      },
      {
        vraag: 'Kan ik meteen een laadpaal of domotica voorzien?',
        antwoord: 'Ja. Dat is net het moment om leidingen en de verdeelkast daarop af te stemmen, ook als u het pas later plaatst.',
      },
      {
        vraag: 'Zorgt u voor de keuring?',
        antwoord: 'We maken de installatie en de schema’s klaar voor de keuring. De keuring zelf gebeurt door een erkend keuringsorganisme.',
      },
      {
        vraag: 'Werkt u samen met mijn aannemer?',
        antwoord: 'Ja. We stemmen de planning af met de andere partijen op de werf.',
      },
      {
        vraag: 'Maakt u ook de schema’s?',
        antwoord: 'Ja. We maken het eendraadschema en het situatieschema die nodig zijn voor de keuring.',
      },
    ],
    fotos: ['schakelaars', 'stopcontactenAf'],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'video-parlofonie',
    naam: 'Video- & parlofonie',
    serviceType: 'Plaatsing van videofonie en parlofonie',
    metaTitle: 'Video- & parlofonie plaatsen in Schilde · Heeman',
    metaDescription:
      'Videofoon of parlofoon laten plaatsen in Schilde en omgeving. Zien wie er aanbelt en toegang eenvoudig beheren. Vraag een offerte.',
    h1: 'Video- en parlofonie plaatsen',
    antwoord:
      'Met een videofoon of parlofoon ziet of hoort u wie er aanbelt en opent u de deur of poort eenvoudig. We plaatsen nieuwe systemen en vervangen verouderde bellen of parlofoons, in woningen en bedrijven in Schilde en omgeving. U krijgt eerst advies over wat bij uw situatie past, en een gratis offerte.',
    voorWie: [
      'Woningen met een voordeur of poort op afstand van de woonruimte.',
      'Bedrijven die bezoekers willen zien voor ze binnenkomen.',
      'Wie een oude bel of parlofoon wil vervangen.',
    ],
    inOfferte: [
      'Buitenpost en binnenpost(en)',
      'Bekabeling en aansluiting',
      'Koppeling met deur- of poortopener waar mogelijk',
      'Instellen en uitleg',
    ],
    faq: [
      {
        vraag: 'Wat is het verschil tussen parlofonie en videofonie?',
        antwoord: 'Met parlofonie hoort en spreekt u de bezoeker. Met videofonie ziet u de bezoeker ook op een scherm.',
      },
      {
        vraag: 'Kan de videofoon mijn poort of deur openen?',
        antwoord: 'Vaak wel, als uw deur of poort een elektrische opener heeft of krijgt. Dat bekijken we bij het bezoek.',
      },
      {
        vraag: 'Kan mijn oude bel of parlofoon vervangen worden?',
        antwoord: 'Ja. Soms kan de bestaande bekabeling blijven, soms is nieuwe nodig. Dat zien we ter plaatse.',
      },
      {
        vraag: 'Plaatst u ook video- of parlofonie voor bedrijven?',
        antwoord: 'Ja, zowel in woningen als in bedrijven in Schilde en omgeving.',
      },
      {
        vraag: 'Kan ik later een extra binnenpost bijplaatsen?',
        antwoord: 'Dat hangt af van het systeem. Als u dat al weet, houden we er bij de keuze van het systeem rekening mee.',
      },
    ],
    fotos: ['buitenpost', { placeholder: 'binnenpost met scherm' }],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'verlichtingsadvies',
    naam: 'Verlichtingsadvies',
    serviceType: 'Verlichtingsadvies en installatie van verlichting',
    metaTitle: 'Verlichtingsadvies en -installatie · Schilde · Heeman',
    metaDescription:
      'Verlichting die sfeer, functie en een laag verbruik combineert. Advies en plaatsing in Schilde en omgeving. Vraag vrijblijvend advies.',
    h1: 'Verlichtingsadvies en -installatie',
    antwoord:
      'Goede verlichting combineert sfeer, functie en een laag verbruik. We geven verlichtingsadvies over waar u welk licht nodig heeft, van keuken en werkplek tot tuin, bestellen de armaturen en plaatsen ze, samen met de schakelaars en dimmers. Wil u later slim sturen? Dan houden we meteen rekening met Niko Home Control.',
    voorWie: [
      'U verbouwt of richt een ruimte opnieuw in.',
      'U wil besparen dankzij ledverlichting.',
      'U wil sfeerverlichting, buitenverlichting of slimme sturing.',
    ],
    inOfferte: [
      'Advies per ruimte: functie- en sfeerverlichting',
      'Bestelling en levering van de armaturen, schakelaars en dimmers',
      'Plaatsing en aansluiting',
      'Voorbereiding voor slimme sturing waar gewenst',
    ],
    faq: [
      {
        vraag: 'Levert u ook de armaturen?',
        antwoord: 'Ja. We geven verlichtingsadvies, bestellen de armaturen en plaatsen ze. Heeft u zelf al armaturen gekozen, dan plaatsen we die ook.',
      },
      {
        vraag: 'Kan ik mijn verlichting later slim sturen?',
        antwoord: 'Ja. Als we daar bij de plaatsing rekening mee houden, kan dat later met Niko Home Control.',
      },
      {
        vraag: 'Plaatst u ook buitenverlichting?',
        antwoord: 'Ja, voor tuin, oprit of gevel, met de juiste beveiliging voor buiten.',
      },
      {
        vraag: 'Kan ik mijn bestaande verlichting vervangen door led?',
        antwoord: 'Ja. We bekijken welke armaturen of lampen u kan vervangen en of schakelaars of dimmers mee moeten worden aangepast.',
      },
      {
        vraag: 'Plaatst u ook dimmers?',
        antwoord: 'Ja, we plaatsen schakelaars en dimmers die passen bij uw verlichting.',
      },
    ],
    fotos: ['sfeerverlichting', { placeholder: 'buitenverlichting in de tuin' }],
    bijgewerkt: BIJGEWERKT,
  },
  {
    slug: 'dringende-herstellingen',
    naam: 'Dringende herstellingen',
    serviceType: 'Dringende elektrische herstellingen en pannes',
    metaTitle: 'Herstelling elektriciteit Schilde · 24/7 · Heeman',
    metaDescription:
      'Stroompanne of dringende herstelling in Schilde en omgeving? 24/7 bereikbaar voor dringende elektrische problemen. Bel 0485 19 00 27.',
    h1: 'Dringende herstellingen en elektriciteitspannes',
    antwoord:
      'Stroompanne, een differentieel dat blijft uitvallen of een stopcontact dat warm wordt? Bel ons op 0485 19 00 27. Voor dringende herstellingen zijn we 24/7 bereikbaar in Schilde en omgeving. Ruikt u een brandgeur of ziet u vonken? Schakel dan eerst de hoofdschakelaar uit en bel bij gevaar 112.',
    voorWie: [
      'Stroompanne in (een deel van) uw woning of bedrijf.',
      'Een differentieel of automaat die telkens opnieuw uitvalt.',
      'Een warm, beschadigd of vonkend stopcontact of toestel.',
    ],
    stappen: [
      { titel: 'Bel of stuur een WhatsApp', tekst: 'Zeg kort wat er aan de hand is. Een foto helpt.' },
      { titel: 'Veilig maken', tekst: 'We zeggen u wat u meteen kan doen om het veilig te houden.' },
      { titel: 'Herstelling', tekst: 'We komen langs, zoeken de oorzaak en herstellen wat dringend is.' },
      { titel: 'Nazorg', tekst: 'Is er meer nodig? Dan krijgt u achteraf een offerte.' },
    ],
    inOfferte: [
      'Opsporen van de oorzaak',
      'Dringende herstelling en veilig maken',
      'Advies of offerte voor verdere werken',
    ],
    faq: [
      {
        vraag: 'Wat doe ik eerst bij een stroompanne?',
        antwoord:
          'Kijk of een automaat of differentieelschakelaar in uw verdeelkast is uitgevallen. Valt hij meteen opnieuw uit, zet hem dan niet telkens terug op, maar bel een elektricien.',
      },
      {
        vraag: 'Bent u ook buiten de openingsuren bereikbaar?',
        antwoord: 'Ja, voor dringende herstellingen zijn we 24/7 bereikbaar op 0485 19 00 27.',
      },
      {
        vraag: 'Wat als ik een brandgeur ruik of vonken zie?',
        antwoord: 'Schakel de hoofdschakelaar uit als dat veilig kan en bel bij gevaar meteen 112. Bel daarna een elektricien.',
      },
      {
        vraag: 'In welke gemeenten komt u voor dringende herstellingen?',
        antwoord: 'In Schilde, ’s-Gravenwezel, Wijnegem, Schoten, Brasschaat, Zoersel, Zandhoven, Ranst, Malle en Deurne.',
      },
      {
        vraag: 'Kan ik een foto van het probleem sturen?',
        antwoord: 'Ja, stuur gerust een foto via WhatsApp naar 0485 19 00 27. Zo kunnen we sneller inschatten wat er aan de hand is.',
      },
    ],
    fotos: ['verdeelkast', 'oudeVerdeelkast'],
    bijgewerkt: BIJGEWERKT,
  },
];

export const dienstBySlug = (slug: string) => diensten.find((d) => d.slug === slug);
