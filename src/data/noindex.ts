// Pagina's die (nog) niet in Google horen: ze bevatten nog placeholders ([AANVULLEN] / [TE BEVESTIGEN]).
// Gebruikt door de pagina's zelf (meta robots) én door astro.config (sitemap-filter), dus geen beeldimports hier.
import { heeftTodo } from '../lib/tekst';
import { realisaties, realisatieUrl } from './realisaties';
import { regios, regioUrl } from './regio';

const todoIn = (o: unknown) => heeftTodo(JSON.stringify(o));

export const noindexUrls = new Set<string>([
  ...realisaties.filter(todoIn).map((r) => realisatieUrl(r.slug)),
  ...regios.filter(todoIn).map((r) => regioUrl(r.slug)),
  '/jobs/bedankt/',
  '/404/',
]);
