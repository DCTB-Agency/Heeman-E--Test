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

// Gegevens aangevuld op vraag van DCTB (23-09-2026); de laadpaal in Oelegem en de ronde inbouwstopcontacten
// in travertijn zijn bevestigd, de overige gemeenten en beschrijvingen zijn door DCTB goedgekeurde invulling.
export const realisaties: Realisatie[] = [
  {
    slug: 'laadpaal-oelegem',
    titel: 'Laadpaal aan een bakstenen gevel',
    dienst: 'laadpaal-installeren',
    gemeente: 'Oelegem',
    fotos: { hoofd: 'laadpaal' },
    situatie: 'De klant kocht een elektrische wagen en wilde thuis laden, zonder kabel over de oprit en zonder dat de rest van de woning te weinig stroom zou krijgen.',
    oplossing: 'Een wandlaadpaal op de bakstenen gevel naast de oprit, met een nieuwe voedingskabel vanaf de verdeelkast en een eigen beveiliging. Slim laden zorgt ervoor dat de laadpaal het huis nooit overbelast.',
    resultaat: 'De wagen laadt ’s nachts vanzelf vol, de kabels zijn netjes weggewerkt en de installatie is klaar voor de keuring.',
  },
  {
    slug: 'ronde-inbouwstopcontacten-travertijn',
    titel: 'Ronde inbouwstopcontacten in travertijn',
    dienst: 'renovatie-elektriciteit',
    gemeente: "'s-Gravenwezel",
    fotos: { hoofd: 'stopcontactenAf', voor: 'stopcontactenPlaatsing' },
    situatie: 'Een badkamer met wanden in travertijn. Gewone stopcontacten met een afdekplaat zouden de strakke natuursteen onderbreken.',
    oplossing: 'Ronde inbouwstopcontacten, exact uitgelijnd in de steen. De inbouwdozen werden vooraf afgestemd met de steenplaatser; de bedrading werd pas afgewerkt na de plaatsing van de stenen.',
    resultaat: 'Twee strak afgewerkte stopcontacten die opgaan in de wand, zonder zichtbare afdekplaat.',
  },
  {
    slug: 'nieuwe-verdeelkast-schoten',
    titel: 'Nieuwe verdeelkast met differentieelschakelaars',
    dienst: 'renovatie-elektriciteit',
    gemeente: 'Schoten',
    fotos: { hoofd: 'verdeelkast' },
    situatie: 'Een oude verdeelkast in de kelder met verouderde beveiligingen. De woning werd verkocht en de installatie moest door de keuring.',
    oplossing: 'Een nieuwe verdeelkast met automaten en twee differentieelschakelaars (algemeen en voor natte ruimtes). Elke kring kreeg een label, en het eendraadschema en situatieschema werden opgemaakt.',
    resultaat: 'Een overzichtelijke, keuringsklare installatie. De keuring door het erkend keuringsorganisme verliep zonder opmerkingen.',
  },
  {
    slug: 'nieuwe-bekabeling-wijnegem',
    titel: 'Nieuwe bekabeling tijdens een renovatie',
    dienst: 'renovatie-elektriciteit',
    gemeente: 'Wijnegem',
    fotos: { hoofd: 'bert' },
    situatie: 'Bij de renovatie van een woonkamer bleek de oude bedrading zonder buizen in de muur te liggen, met te weinig stopcontacten.',
    oplossing: 'Muren opgekapt, nieuwe buizen en kabels getrokken voor extra stopcontacten en lichtpunten, alles klaar voor de pleisterwerken.',
    resultaat: 'Veilige, nieuwe bekabeling volgens het AREI, met stopcontacten op de plaatsen waar de klant ze echt nodig heeft.',
  },
  {
    slug: 'schakelaars-nieuwbouw-zoersel',
    titel: 'Schakelaars klaar voor de afwerking',
    dienst: 'nieuwbouw',
    gemeente: 'Zoersel',
    fotos: { hoofd: 'schakelaars' },
    situatie: 'Een nieuwbouwwoning waarvan de wanden klaar waren voor de afwerking.',
    oplossing: 'Inbouwmechanismen voor enkele en dubbele schakelaars, per ruimte geplaatst en aangesloten volgens het elektrisch plan.',
    resultaat: 'Na het schilderwerk moesten enkel nog de afdekplaten erop. Alles werd getest en opgeleverd.',
  },
];

export const realisatieUrl = (slug: string) => `/realisaties/${slug}/`;

/** Realisatie waar deze foto de hoofdfoto of voor-foto van is (voor bijschriften en links). */
export const realisatieVoorFoto = (id: FotoId) => realisaties.find((r) => r.fotos.hoofd === id || r.fotos.voor === id);
