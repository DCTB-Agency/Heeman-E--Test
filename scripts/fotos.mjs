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

// Deelbeeld: Bert aan het werk, gezicht en handen in beeld.
await sharp(`${IN}/bert-aan-het-werk.jpg`).rotate()
  .extract({ left: 0, top: 40, width: 1080, height: 567 })
  .resize(1200, 630).jpeg({ quality: 85, mozjpeg: true }).toFile('public/og/home.jpg');
console.log('public/og/home.jpg 1200×630');
