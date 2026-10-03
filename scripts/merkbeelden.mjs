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

// 2. Favicons: het beeldmerk links in het logo (kabel, stekkerpin en schuine streep), nagetekend met dikkere lijnen
//    zodat het ook op 16–48 px leesbaar blijft. Coördinaten volgen het logo (1536 × 484).
const merkSvg = (dik) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-80 20 460 460">
  <rect x="-80" y="20" width="460" height="460" rx="84" fill="#f6f5f1"/>
  <g fill="none" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M14 70 V 440 L 108 236 H 330" stroke="${BRAND}" stroke-width="${dik}"/>
    <path d="M272 70 V 420" stroke="${BRAND}" stroke-width="${dik}"/>
    <path d="M182 262 L 108 422" stroke="#1c0d0a" stroke-width="${dik}"/>
  </g>
</svg>`;
import { writeFile } from 'node:fs/promises';
await writeFile('public/favicon.svg', merkSvg(40));
console.log('public/favicon.svg');
for (const [maat, bestand, dik] of [[48, 'public/favicon.png', 46], [192, 'public/icon-192.png', 34], [180, 'public/apple-touch-icon.png', 34]]) {
  await sharp(Buffer.from(merkSvg(dik)), { density: 300 }).resize(maat, maat).png().toFile(bestand);
  console.log(bestand, `${maat}×${maat}`);
}
