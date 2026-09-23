// Controleer alle interne links in dist/: elke href moet naar een bestaande pagina/bestand of een redirect wijzen.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const alle = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? alle(join(d, f)) : [join(d, f)]));
const redirects = readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l.startsWith('/')).map((l) => l.split(/\s+/)[0]);
const kapot = new Map();

for (const bestand of alle(DIST).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(bestand, 'utf8');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pad = decodeURIComponent(href.split(/[?#]/)[0]);
    const doel = join(DIST, pad);
    const ok = existsSync(doel) && (statSync(doel).isFile() || existsSync(join(doel, 'index.html')));
    if (!ok && !redirects.includes(pad)) kapot.set(pad, [...(kapot.get(pad) ?? []), bestand.replace(`${DIST}/`, '')]);
  }
}
if (kapot.size) {
  for (const [pad, bron] of kapot) console.log(`KAPOT ${pad}  ← ${[...new Set(bron)].slice(0, 3).join(', ')}${bron.length > 3 ? ' …' : ''}`);
  process.exit(1);
}
console.log('Alle interne links OK');
