// Pakket voor hosting bij Vimexx (Apache + PHP). Draait na `HOSTING=vimexx astro build` (npm run build:vimexx).
// - .htaccess: https + www, redirects uit scrape/redirects.csv, beveiligingsheaders, caching, 404-pagina
// - formulier.php + formulier/mail-sjabloon.php (vervangt Netlify Forms)
// - verwijdert Netlify-bestanden (_redirects)
// - maakt vimexx-pakket/heeman-electrics-<datum>.zip om in public_html te uploaden
import { readFile, writeFile, cp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const DIST = 'dist';
if (!existsSync(`${DIST}/index.html`)) throw new Error('Eerst bouwen: HOSTING=vimexx astro build');
const publiek = process.env.PUBLIEK === 'true';

// Redirects uit de CSV (zelfde bron als public/_redirects voor Netlify).
const csv = (await readFile('scrape/redirects.csv', 'utf8')).trim().split('\n').slice(1);
const rx = (s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
const regels = [];
for (const lijn of csv) {
  const [oud, nieuw, status] = lijn.split(',');
  if (status !== '301' || oud === nieuw) continue;
  const q = oud.match(/^\/\?(\w+)=(.+)$/);
  if (q) {
    regels.push(`RewriteCond %{QUERY_STRING} (^|&)${q[1]}=${rx(q[2])}(&|$)`, `RewriteRule ^$ ${nieuw}? [L,R=301]`);
  } else if (oud.endsWith('/*')) {
    regels.push(`RewriteRule ^${rx(oud.slice(1, -2))}(/.*)?$ ${nieuw} [L,R=301]`);
  } else {
    const pad = rx(oud.slice(1).replace(/\/$/, ''));
    regels.push(`RewriteRule ^${pad}/?$ ${nieuw} [L,R=301]`);
  }
}

const htaccess = `# Gegenereerd door scripts/vimexx-pakket.mjs — niet met de hand wijzigen (pas scrape/redirects.csv aan).
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset UTF-8

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Eén domeinvariant: https://www.heeman-electrics.be (enkel voor het echte domein; een test-subdomein blijft zoals het is)
  RewriteCond %{HTTP_HOST} ^heeman-electrics\\.be$ [NC]
  RewriteRule ^ https://www.heeman-electrics.be%{REQUEST_URI} [L,R=301]
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Oude WordPress-adressen en verhuisde pagina's (scrape/redirects.csv)
  ${regels.join('\n  ')}

  # Mappen altijd met slash (zoals de rest van de site)
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.*[^/])$ /$1/ [L,R=301]
</IfModule>

# Interne bestanden van het formulier niet rechtstreeks bereikbaar
<FilesMatch "^(mail-sjabloon\\.php|bronnen\\.json)$">
  Require all denied
</FilesMatch>

<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  Header always set X-Frame-Options "SAMEORIGIN"
${publiek ? '' : '  # Vóór livegang / testomgeving: niet indexeren\n  Header always set X-Robots-Tag "noindex, nofollow"\n'}</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>
`;
await writeFile(`${DIST}/.htaccess`, htaccess);
// Bestanden met een hash in de naam: een jaar cachen.
await writeFile(`${DIST}/_astro/.htaccess`, '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n');

// Formulierverwerking
await cp('vimexx/formulier.php', `${DIST}/formulier.php`);
await mkdir(`${DIST}/formulier`, { recursive: true });
await cp('vimexx/formulier/mail-sjabloon.php', `${DIST}/formulier/mail-sjabloon.php`);
await cp('vimexx/formulier/logo-mail.png', `${DIST}/formulier/logo-mail.png`);
await writeFile(`${DIST}/formulier/.htaccess`, 'Require all denied\n');

// Netlify-specifiek weg
await rm(`${DIST}/_redirects`, { force: true });

// Zip
await mkdir('vimexx-pakket', { recursive: true });
const datum = new Date().toISOString().slice(0, 10);
const zip = `vimexx-pakket/heeman-electrics-${publiek ? 'live' : 'test'}-${datum}.zip`;
await rm(zip, { force: true });
execFileSync('zip', ['-qr', `../${zip}`, '.', '-x', '.DS_Store'], { cwd: DIST });
console.log(`Klaar: ${zip} (${publiek ? 'LIVE: indexeerbaar' : 'TEST: noindex'})`);
