// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { noindexUrls } from './src/data/noindex.ts';

const SITE = 'https://www.heeman-electrics.be';
const vandaag = new Date();

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Geen pagina's die (nog) noindex zijn: placeholders, bedankpagina's.
      filter: (page) => !noindexUrls.has(new URL(page).pathname),
      serialize: (item) => ({ ...item, lastmod: vandaag.toISOString() }),
      // Aparte sitemap voor de vacature(s), zodat die snel opnieuw gecrawld wordt (CLAUDE.md § 12).
      chunks: {
        jobs: (item) => (new URL(item.url).pathname.startsWith('/jobs/') ? item : undefined),
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
