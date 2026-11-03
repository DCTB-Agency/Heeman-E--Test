// Merkbeelden uit het logo (04-10-2026): deelbeeld voor links (Open Graph, 1200 × 630) en de favicons.
// Vervangt de gloeilamp-favicon van de oude site en het deelbeeld met de foto van Bert.
// Gebruik: node scripts/merkbeelden.mjs
import sharp from 'sharp';

const LOGO = 'src/assets/logo-heeman-electrics.png'; // 1536 × 484, transparant
const PAPER = { r: 246, g: 245, b: 241, alpha: 1 }; // --color-paper
const BRAND = '#be4516';

// 1. Deelbeeld: logo gecentreerd op papierkleur, met een oranje lijn onderaan (huisstijl).
const logoBreed = await sharp(LOGO).resize({ width: 860 }).png().toBuffer();
const { height: lh } = await sharp(logoBreed).metadata();
const lijn = Buffer.from(`<svg width="1200" height="14"><rect width="1200" height="14" fill="${BRAND}"/></svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: PAPER } })
  .composite([
    { input: logoBreed, left: 170, top: Math.round((616 - lh) / 2) },
    { input: lijn, left: 0, top: 616 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile('public/og/home.jpg');
console.log('public/og/home.jpg 1200×630 (logo)');

// 2. Favicons (03-11-2026, variant D): een zware H waarvan de dwarslijn de oranje kabel met stekker is, zoals in het logo.
//    Vervangt het nagetekende beeldmerk van 04-10-2026. Voorstel: docs/favicon-voorstel/.
const INK = '#1c0d0a';
const merkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#f6f5f1"/>
  <rect x="14" y="16" width="15" height="68" fill="${INK}"/>
  <rect x="46" y="16" width="15" height="68" fill="${INK}"/>
  <rect x="14" y="45" width="58" height="10" fill="${BRAND}"/>
  <path d="M70 36 h10 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-10 z" fill="${BRAND}"/>
  <rect x="86" y="40" width="8" height="6" fill="${BRAND}"/>
  <rect x="86" y="54" width="8" height="6" fill="${BRAND}"/>
</svg>`;
import { writeFile } from 'node:fs/promises';
await writeFile('public/favicon.svg', merkSvg);
console.log('public/favicon.svg');
const png = (maat) => sharp(Buffer.from(merkSvg), { density: 600 }).resize(maat, maat).png().toBuffer();
for (const [maat, bestand] of [[48, 'public/favicon.png'], [192, 'public/icon-192.png'], [180, 'public/apple-touch-icon.png']]) {
  await writeFile(bestand, await png(maat));
  console.log(bestand, `${maat}×${maat}`);
}

// 3. favicon.ico (16, 32, 48) voor oudere browsers en crawlers die /favicon.ico opvragen. ICO met PNG-afbeeldingen erin.
const maten = [16, 32, 48];
const beelden = await Promise.all(maten.map(png));
const kop = Buffer.alloc(6 + 16 * maten.length);
kop.writeUInt16LE(0, 0); kop.writeUInt16LE(1, 2); kop.writeUInt16LE(maten.length, 4);
let offset = kop.length;
maten.forEach((m, i) => {
  const o = 6 + 16 * i;
  kop.writeUInt8(m, o); kop.writeUInt8(m, o + 1); kop.writeUInt16LE(1, o + 4); kop.writeUInt16LE(32, o + 6);
  kop.writeUInt32LE(beelden[i].length, o + 8); kop.writeUInt32LE(offset, o + 12);
  offset += beelden[i].length;
});
await writeFile('public/favicon.ico', Buffer.concat([kop, ...beelden]));
console.log('public/favicon.ico 16/32/48');
