// Realisaties — CLAUDE.md § 8: titel met gemeente, voor/na, situatie → oplossing → resultaat, dienst- en gemeente-tag.
// Geen beeldimports hier (alleen FotoId's), zodat astro.config dit bestand kan lezen voor de sitemap.
import type { FotoId } from './fotos';

export type Realisatie = {
  slug: string;
  titel: string;
  dienst: string; // slug uit site.ts → services
  gemeente: string;
  fotos: { hoofd: FotoId; voor?: FotoId; extra?: FotoId[] };
  situatie: string;
  oplossing: string;
  resultaat: string;
};

const GEMEENTE = '[AANVULLEN: gemeente]';

export const realisaties: Realisatie[] = [
  {
    slug: 'laadpaal-bakstenen-gevel',
    titel: 'Laadpaal aan een bakstenen gevel',
    dienst: 'laadpaal-installeren',
    gemeente: GEMEENTE,
    fotos: { hoofd: 'laadpaal' },
    situatie: '[AANVULLEN: situatie — bv. type woning, wagen, aansluiting]',
    oplossing: '[AANVULLEN: welke laadpaal (EVBox, Alfen, Easee of Zaptec), kabeltraject, beveiliging]',
    resultaat: '[AANVULLEN: resultaat — bv. slim laden, keuring in orde]',
  },
  {
    slug: 'inbouwstopcontacten-travertin',
    titel: 'Inbouwstopcontacten in travertin',
    dienst: 'renovatie-elektriciteit', // [TE BEVESTIGEN: renovatie of nieuwbouw?]
    gemeente: GEMEENTE,
    fotos: { hoofd: 'stopcontactenAf', voor: 'stopcontactenPlaatsing' },
    situatie: '[AANVULLEN: situatie]',
    oplossing: 'Ronde inbouwstopcontacten, strak uitgelijnd in een wand van natuursteen. [AANVULLEN: details]',
    resultaat: '[AANVULLEN: resultaat]',
  },
  {
    slug: 'nieuwe-verdeelkast',
    titel: 'Nieuwe verdeelkast met differentieelschakelaars',
    dienst: 'renovatie-elektriciteit',
    gemeente: GEMEENTE,
    fotos: { hoofd: 'verdeelkast' },
    situatie: '[AANVULLEN: situatie — bv. oude kast, afkeuring, uitbreiding]',
    oplossing: 'Een nieuwe verdeelkast met automaten en differentieelschakelaars, per kring gelabeld. [AANVULLEN: details]',
    resultaat: '[AANVULLEN: resultaat — bv. keuringsklaar, schema’s opgemaakt]',
  },
  {
    slug: 'nieuwe-bekabeling-renovatie',
    titel: 'Nieuwe bekabeling tijdens een renovatie',
    dienst: 'renovatie-elektriciteit',
    gemeente: GEMEENTE,
    fotos: { hoofd: 'bert' },
    situatie: '[AANVULLEN: situatie]',
    oplossing: 'Nieuwe leidingen en kabels in de muur, weggewerkt in buizen. [AANVULLEN: details]',
    resultaat: '[AANVULLEN: resultaat]',
  },
  {
    slug: 'schakelaars-inbouw',
    titel: 'Schakelaars klaar voor de afwerking',
    dienst: 'nieuwbouw', // [TE BEVESTIGEN: nieuwbouw of renovatie?]
    gemeente: GEMEENTE,
    fotos: { hoofd: 'schakelaars' },
    situatie: '[AANVULLEN: situatie]',
    oplossing: 'Inbouwmechanismen voor schakelaars, geplaatst en aangesloten vóór de afwerking van de wand. [AANVULLEN: details]',
    resultaat: '[AANVULLEN: resultaat]',
  },
];

export const realisatieUrl = (slug: string) => `/realisaties/${slug}/`;
