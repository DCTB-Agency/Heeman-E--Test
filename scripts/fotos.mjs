// Verwerk foto's → src/assets/fotos/: juiste oriëntatie, optioneel bijgesneden, max. 1800 px,
// ALLE metadata (EXIF/GPS) verwijderd. Plus een deelbeeld 1200 × 630 per foto voor Open Graph.
// 29-10-2026: foto's generieker gemaakt — de werffoto toont enkel nog handen en kabels (geen gezicht, geen
// bestelwagen met logo); de verdeelkast is bijgesneden tot de kast zelf. Rechtenvrije foto's: assets-in/stock/.
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const OUT = 'src/assets/fotos';
// crop in pixels van het origineel (na rotatie): { left, top, width, height }
const FOTOS = [
  { id: 'bekabeling', in: 'assets-in/bert/bert-aan-het-werk.jpg', out: 'bekabeling-renovatie.jpg', crop: { left: 380, top: 720, width: 700, height: 900 }, ogY: 45 },
  { id: 'laadpaal', in: 'assets-in/bert/laadpaal-gevel-baksteen.jpg', out: 'laadpaal-gevel-baksteen.jpg', ogY: 50 },
  { id: 'verdeelkast', in: 'assets-in/bert/verdeelkast-hager.jpg', out: 'verdeelkast.jpg', crop: { left: 240, top: 865, width: 1700, height: 2300 }, ogY: 40 },
  { id: 'stopcontactenAf', in: 'assets-in/bert/stopcontacten-travertin-afgewerkt.jpg', out: 'stopcontacten-travertin-afgewerkt.jpg', ogY: 42 },
  { id: 'stopcontactenPlaatsing', in: 'assets-in/bert/stopcontacten-travertin-plaatsing.jpg', out: 'stopcontacten-travertin-plaatsing.jpg', ogY: 50 },
  { id: 'schakelaars', in: 'assets-in/bert/schakelaars-inbouw.jpg', out: 'schakelaars-inbouw.jpg', ogY: 40 },
  // Rechtenvrije foto's (CC0 / publiek domein / Pexels- of Unsplash-licentie): bron en licentie in assets-in/stock/bronnen.json.
  { id: 'buitenpost', in: 'assets-in/stock/videofoon-buitenpost.jpg', out: 'videofoon-buitenpost.jpg', ogY: 45 },
  { id: 'sfeerverlichting', in: 'assets-in/stock/sfeerverlichting.jpg', out: 'sfeerverlichting.jpg', ogY: 40 },
  { id: 'zonnepanelen', in: 'assets-in/stock/zonnepanelen-dak.jpg', out: 'zonnepanelen-dak.jpg', ogY: 50 },
  { id: 'oudeVerdeelkast', in: 'assets-in/stock/oude-verdeelkast.jpg', out: 'oude-verdeelkast.jpg', ogY: 50 },
];

for (const f of FOTOS) {
  if (!existsSync(f.in)) { console.log('overgeslagen (ontbreekt):', f.in); continue; }
  let img = sharp(f.in).rotate();
  if (f.crop) img = sharp(await img.toBuffer()).extract(f.crop);
  const info = await img.resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/${f.out}`); // sharp schrijft zonder metadata
  console.log(f.out, `${info.width}×${info.height}`, `${Math.round(info.size / 1024)} kB`);

  // Deelbeeld 1200 × 630, bijgesneden rond het brandpunt (verticaal, in %).
  const { width, height } = await sharp(`${OUT}/${f.out}`).metadata();
  const h = Math.min(height, Math.round(width * 630 / 1200));
  const w = Math.min(width, Math.round(h * 1200 / 630));
  const top = Math.max(0, Math.min(height - h, Math.round(height * f.ogY / 100 - h / 2)));
  await sharp(`${OUT}/${f.out}`).extract({ left: Math.round((width - w) / 2), top, width: w, height: h }).resize(1200, 630)
    .jpeg({ quality: 82, mozjpeg: true }).toFile(`public/og/${f.id}.jpg`);
}

// Deelbeeld homepage (logo) en favicons: zie scripts/merkbeelden.mjs.
