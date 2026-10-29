// Foto's: eigen werf­foto's van Heeman Electrics (generiek bijgesneden, 29-10-2026) + rechtenvrije foto's (CC0/publiek domein,
// bron en licentie in assets-in/stock/bronnen.json). Verwerkt met scripts/fotos.mjs: metadata/GPS verwijderd.
// `focus` = object-position: welk deel van de foto zichtbaar blijft als hij wordt bijgesneden.
// `titel` = korte beschrijving voor realisatiekaarten; gemeente nog aan te vullen.
import type { ImageMetadata } from 'astro';
import bekabeling from '../assets/fotos/bekabeling-renovatie.jpg';
import laadpaal from '../assets/fotos/laadpaal-gevel-baksteen.jpg';
import verdeelkast from '../assets/fotos/verdeelkast.jpg';
import buitenpost from '../assets/fotos/videofoon-buitenpost.jpg';
import sfeerverlichting from '../assets/fotos/sfeerverlichting.jpg';
import zonnepanelen from '../assets/fotos/zonnepanelen-dak.jpg';
import oudeVerdeelkast from '../assets/fotos/oude-verdeelkast.jpg';
import stopcontactenAf from '../assets/fotos/stopcontacten-travertin-afgewerkt.jpg';
import stopcontactenPlaatsing from '../assets/fotos/stopcontacten-travertin-plaatsing.jpg';
import schakelaars from '../assets/fotos/schakelaars-inbouw.jpg';

export type Foto = { src: ImageMetadata; alt: string; focus: string; titel: string };

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
  // Rechtenvrij (zie assets-in/stock/bronnen.json)
  buitenpost: {
    src: buitenpost,
    alt: 'Buitenpost van een videofoon met camera en drukknoppen aan een bakstenen gevel',
    focus: '50% 45%',
    titel: 'Videofoon aan de voordeur',
  },
  sfeerverlichting: {
    src: sfeerverlichting,
    alt: 'Hanglampen met warm licht boven een eettafel',
    focus: '45% 40%',
    titel: 'Sfeerverlichting met warm licht',
  },
  zonnepanelen: {
    src: zonnepanelen,
    alt: 'Zonnepanelen op het dak van een woning',
    focus: '60% 45%',
    titel: 'Zonnepanelen op een dak',
  },
  oudeVerdeelkast: {
    src: oudeVerdeelkast,
    alt: 'Verouderde verdeelkast met losse zekeringkasten en opbouwleidingen tegen een muur',
    focus: '22% 50%',
    titel: 'Verouderde verdeelkast',
  },
} satisfies Record<string, Foto>;

export type FotoId = keyof typeof fotos;
