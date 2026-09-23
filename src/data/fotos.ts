// Echte foto's van Bert en zijn werk (aangeleverd 23-09-2026, verwerkt met scripts/fotos.mjs: metadata/GPS verwijderd).
// `focus` = object-position: welk deel van de foto zichtbaar blijft als hij wordt bijgesneden.
// `titel` = korte beschrijving voor realisatiekaarten; gemeente nog aan te vullen.
import type { ImageMetadata } from 'astro';
import bert from '../assets/fotos/bert-aan-het-werk.jpg';
import laadpaal from '../assets/fotos/laadpaal-gevel-baksteen.jpg';
import verdeelkast from '../assets/fotos/verdeelkast-hager.jpg';
import stopcontactenAf from '../assets/fotos/stopcontacten-travertin-afgewerkt.jpg';
import stopcontactenPlaatsing from '../assets/fotos/stopcontacten-travertin-plaatsing.jpg';
import schakelaars from '../assets/fotos/schakelaars-inbouw.jpg';

export type Foto = { src: ImageMetadata; alt: string; focus: string; titel: string };

export const fotos = {
  bert: {
    src: bert,
    alt: 'Bert Heeman trekt nieuwe kabels door een opengekapte muur tijdens een renovatie',
    focus: '50% 22%',
    titel: 'Nieuwe bekabeling tijdens een renovatie',
  },
  laadpaal: {
    src: laadpaal,
    alt: 'Zwarte laadpaal aan een bakstenen gevel, geplaatst door Heeman Electrics',
    focus: '50% 62%',
    titel: 'Laadpaal aan een bakstenen gevel',
  },
  verdeelkast: {
    src: verdeelkast,
    alt: 'Nieuwe verdeelkast met automaten en differentieelschakelaars, netjes gelabeld',
    focus: '38% 50%',
    titel: 'Nieuwe verdeelkast met differentieelschakelaars',
  },
  stopcontactenAf: {
    src: stopcontactenAf,
    alt: 'Twee ronde inbouwstopcontacten strak afgewerkt in een wand van travertin',
    focus: '50% 42%',
    titel: 'Inbouwstopcontacten in travertin',
  },
  stopcontactenPlaatsing: {
    src: stopcontactenPlaatsing,
    alt: 'Inbouwstopcontact in travertin tijdens de plaatsing, met zichtbare bedrading',
    focus: '45% 52%',
    titel: 'Stopcontacten tijdens de plaatsing',
  },
  schakelaars: {
    src: schakelaars,
    alt: 'Inbouwmechanismen voor schakelaars in de muur, klaar voor de afwerking',
    focus: '52% 42%',
    titel: 'Schakelaars klaar voor de afwerking',
  },
} satisfies Record<string, Foto>;

export type FotoId = keyof typeof fotos;
