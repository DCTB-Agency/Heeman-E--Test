// Verwerk aangeleverde foto's (assets-in/bert/) → src/assets/fotos/: juiste oriëntatie, max. 1800 px,
// ALLE metadata (EXIF/GPS) verwijderd. Plus een deelbeeld 1200 × 630 voor Open Graph.
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

const IN = 'assets-in/bert', OUT = 'src/assets/fotos';
for (const f of (await readdir(IN)).filter((f) => f.endsWith('.jpg'))) {
  const info = await sharp(`${IN}/${f}`).rotate().resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/${f}`);
  console.log(f, `${info.width}×${info.height}`, `${Math.round(info.size / 1024)} kB`);
}

// Deelbeelden 1200 × 630 per foto (public/og/<id>.jpg), bijgesneden rond het brandpunt (verticaal, in %).
const OG = {
  laadpaal: ['laadpaal-gevel-baksteen.jpg', 50],
  verdeelkast: ['verdeelkast-hager.jpg', 45],
  stopcontactenAf: ['stopcontacten-travertin-afgewerkt.jpg', 42],
  stopcontactenPlaatsing: ['stopcontacten-travertin-plaatsing.jpg', 50],
  schakelaars: ['schakelaars-inbouw.jpg', 40],
  bert: ['bert-aan-het-werk.jpg', 12],
};
for (const [id, [f, focusY]] of Object.entries(OG)) {
  const img = sharp(`${OUT}/${f}`);
  const { width, height } = await img.metadata();
  const h = Math.round(width * 630 / 1200);
  const top = Math.max(0, Math.min(height - h, Math.round(height * focusY / 100 - h / 2)));
  await sharp(`${OUT}/${f}`).extract({ left: 0, top, width, height: h }).resize(1200, 630)
    .jpeg({ quality: 82, mozjpeg: true }).toFile(`public/og/${id}.jpg`);
  console.log(`public/og/${id}.jpg`);
}

// Deelbeeld homepage: Bert aan het werk, gezicht en handen in beeld.
await sharp(`${IN}/bert-aan-het-werk.jpg`).rotate()
  .extract({ left: 0, top: 40, width: 1080, height: 567 })
  .resize(1200, 630).jpeg({ quality: 85, mozjpeg: true }).toFile('public/og/home.jpg');
console.log('public/og/home.jpg 1200×630');
