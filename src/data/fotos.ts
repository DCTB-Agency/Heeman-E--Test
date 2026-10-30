// Foto's: eigen werf­foto's van Heeman Electrics (generiek bijgesneden, 29-10-2026) + rechtenvrije foto's (CC0/publiek domein,
// bron en licentie in assets-in/stock/bronnen.json). Verwerkt met scripts/fotos.mjs: metadata/GPS verwijderd.
// `focus` = object-position: welk deel van de foto zichtbaar blijft als hij wordt bijgesneden.
// `titel` = korte beschrijving voor realisatiekaarten; gemeente nog aan te vullen.
import type { ImageMetadata } from 'astro';
import bekabeling from '../assets/fotos/bekabeling-renovatie.jpg';
import laadpaal from '../assets/fotos/laadpaal-gevel-baksteen.jpg';
import verdeelkast from '../assets/fotos/verdeelkast.jpg';
import buitenpost from '../assets/fotos/videofoon-buitenpost.jpg';
import verdeelkastNieuw from '../assets/fotos/ai-verdeelkast-nieuw.jpg';
import oudeVerdeelkast from '../assets/fotos/ai-verdeelkast-oud.jpg';
import zonnepanelen from '../assets/fotos/ai-zonnepanelen-woning.jpg';
import omvormerBatterij from '../assets/fotos/ai-omvormer-thuisbatterij.jpg';
import laadpuntenParking from '../assets/fotos/ai-laadpunten-parking.jpg';
import domoticaKast from '../assets/fotos/ai-domotica-verdeelkast.jpg';
import binnenpost from '../assets/fotos/ai-binnenpost-videofoon.jpg';
import sfeerverlichting from '../assets/fotos/ai-sfeerverlichting-woonkamer.jpg';
import tuinverlichting from '../assets/fotos/ai-tuinverlichting.jpg';
import teamWerf from '../assets/fotos/ai-team-werf.jpg';
import vakmanLadder from '../assets/fotos/gen-vakman-ladder.jpg';
import testerSchema from '../assets/fotos/gen-tester-schema.jpg';
import dradenPlafond from '../assets/fotos/gen-draden-plafond.jpg';
import schroevendraaierKast from '../assets/fotos/gen-schroevendraaier-kast.jpg';
import kabeladers from '../assets/fotos/gen-kabeladers.jpg';
import stroomtang from '../assets/fotos/gen-stroomtang.jpg';
import kastBekabeling from '../assets/fotos/gen-verdeelkast-bekabeling.jpg';
import lichtpaalSpots from '../assets/fotos/lichtpaal-spots.jpg';
import lichtpaalOprit from '../assets/fotos/lichtpaal-oprit.jpg';
import stopcontactenAf from '../assets/fotos/stopcontacten-travertin-afgewerkt.jpg';
import stopcontactenPlaatsing from '../assets/fotos/stopcontacten-travertin-plaatsing.jpg';
import schakelaars from '../assets/fotos/schakelaars-inbouw.jpg';

/** `sfeer: true` = AI-beeld of generieke foto: nooit als realisatie of eigen werk tonen (label "Sfeerbeeld"). */
export type Foto = { src: ImageMetadata; alt: string; focus: string; titel: string; sfeer?: boolean };

export const fotos = {
  bekabeling: {
    src: bekabeling,
    alt: 'Handen van een elektricien die nieuwe kabels door een opengekapte muur trekken tijdens een renovatie',
    focus: '55% 40%',
    titel: 'Nieuwe bekabeling tijdens een renovatie',
  },
  laadpaal: {
    src: laadpaal,
    alt: 'Zwarte laadpaal aan een bakstenen gevel, geplaatst door Heeman Electrics',
    focus: '46% 60%', // midden van de laadpaal
    titel: 'Laadpaal aan een bakstenen gevel',
  },
  verdeelkast: {
    src: verdeelkast,
    alt: 'Nieuwe verdeelkast met automaten en differentieelschakelaars, netjes gelabeld',
    focus: '50% 45%',
    titel: 'Nieuwe verdeelkast met differentieelschakelaars',
  },
  stopcontactenAf: {
    src: stopcontactenAf,
    alt: 'Twee ronde inbouwstopcontacten strak afgewerkt in een wand van travertijn',
    focus: '50% 42%',
    titel: 'Ronde inbouwstopcontacten in travertijn',
  },
  stopcontactenPlaatsing: {
    src: stopcontactenPlaatsing,
    alt: 'Rond inbouwstopcontact in travertijn tijdens de plaatsing, met zichtbare bedrading',
    focus: '45% 52%',
    titel: 'Stopcontacten tijdens de plaatsing',
  },
  schakelaars: {
    src: schakelaars,
    alt: 'Inbouwmechanismen voor schakelaars in de muur, klaar voor de afwerking',
    focus: '52% 42%',
    titel: 'Schakelaars klaar voor de afwerking',
  },
  lichtpaalSpots: {
    src: lichtpaalSpots,
    alt: 'Zwarte lichtpaal met drie richtbare spots langs een tuinpad, tussen een beukenhaag en een den',
    focus: '30% 35%',
    titel: 'Lichtpaal met spots langs een tuinpad',
  },
  lichtpaalOprit: {
    src: lichtpaalOprit,
    alt: 'Nieuwe grijze lichtpaal met ledarmatuur aan een oprit, tegen een beukenhaag',
    focus: '45% 40%',
    titel: 'Lichtpaal aan een oprit',
  },
  // Rechtenvrij (zie assets-in/stock/bronnen.json)
  buitenpost: {
    src: buitenpost,
    alt: 'Buitenpost van een videofoon met camera en drukknoppen aan een bakstenen gevel',
    focus: '50% 45%',
    titel: 'Videofoon aan de voordeur',
  },
  // AI-sfeerbeelden (30-10-2026)
  verdeelkastNieuw: { src: verdeelkastNieuw, sfeer: true, alt: 'Nieuwe, netjes gelabelde verdeelkast met automaten en differentieelschakelaars', focus: '50% 50%', titel: 'Nieuwe verdeelkast' },
  oudeVerdeelkast: { src: oudeVerdeelkast, sfeer: true, alt: 'Verouderde zekeringkast met porseleinen smeltzekeringen op een kelder­muur', focus: '45% 45%', titel: 'Verouderde zekeringkast' },
  zonnepanelen: { src: zonnepanelen, sfeer: true, alt: 'Zwarte zonnepanelen op het pannendak van een bakstenen woning', focus: '55% 40%', titel: 'Zonnepanelen op een woning' },
  omvormerBatterij: { src: omvormerBatterij, sfeer: true, alt: 'Omvormer en thuisbatterij naast elkaar aan de muur van een garage', focus: '50% 50%', titel: 'Omvormer en thuisbatterij' },
  laadpuntenParking: { src: laadpuntenParking, sfeer: true, alt: 'Drie laadpalen aan de muur van een ondergrondse parking, één wagen aan het laden', focus: '35% 50%', titel: 'Laadpunten in een gemeenschappelijke parking' },
  domoticaKast: { src: domoticaKast, sfeer: true, alt: 'Verdeelkast met domotica-modules en automaten', focus: '50% 50%', titel: 'Verdeelkast met domotica' },
  binnenpost: { src: binnenpost, sfeer: true, alt: 'Binnenpost van een videofoon met scherm in een hal', focus: '30% 50%', titel: 'Binnenpost met scherm' },
  sfeerverlichting: { src: sfeerverlichting, sfeer: true, alt: 'Woonkamer met hanglamp boven de eettafel, inbouwspots en indirecte ledverlichting', focus: '35% 40%', titel: 'Sfeerverlichting in de woonkamer' },
  tuinverlichting: { src: tuinverlichting, sfeer: true, alt: 'Tuinverlichting met paaltjes langs een grindpad, aangelichte bomen en wandlampen', focus: '40% 55%', titel: 'Tuinverlichting' },
  teamWerf: { src: teamWerf, sfeer: true, alt: 'Twee elektriciens trekken buizen en kabels tijdens een renovatie', focus: '55% 35%', titel: 'Aan het werk op de werf' },
  // Generieke foto's (DCTB, 30-10-2026)
  vakmanLadder: { src: vakmanLadder, sfeer: true, alt: 'Elektricien op een ladder in een ruimte met hanglampen', focus: '35% 45%', titel: 'Aan het werk' },
  testerSchema: { src: testerSchema, sfeer: true, alt: 'Spanningstester, tang en schroevendraaier op een elektrisch schema', focus: '45% 55%', titel: 'Schema\u2019s en metingen voor de keuring' },
  dradenPlafond: { src: dradenPlafond, sfeer: true, alt: 'Elektricien met tang bij nieuwe draden uit het plafond', focus: '55% 45%', titel: 'Nieuwe aansluitpunten in het plafond' },
  schroevendraaierKast: { src: schroevendraaierKast, sfeer: true, alt: 'Handen met een schroevendraaier aan een verdeelkast', focus: '40% 50%', titel: 'Herstelling aan de verdeelkast' },
  kabeladers: { src: kabeladers, sfeer: true, alt: 'Close-up van gestripte kabeladers in de kleuren van een elektrische installatie', focus: '50% 50%', titel: 'Kabels en aders' },
  kastBekabeling: { src: kastBekabeling, sfeer: true, alt: 'Verdeelkast met automaten en netjes gebundelde, gekleurde bedrading', focus: '40% 72%', titel: 'Bedrading in de verdeelkast' },
  stroomtang: { src: stroomtang, sfeer: true, alt: 'Stroomtang, tangen en kabels op een tegelvloer', focus: '40% 45%', titel: 'Opsporen van de oorzaak' },
} satisfies Record<string, Foto>;

export type FotoId = keyof typeof fotos;
