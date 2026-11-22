// Google Ads-visuals voor de vacatures (employer branding, 21-11-2026).
// Rendert HTML-sjablonen in de huisstijl van de site (paper/ink/brand, Outfit + Inter, de oranje "kabel" uit het logo)
// naar PNG met headless Chrome. Uitvoer: docs/google-ads/visuals/.
//   node scripts/ads-visuals.mjs
// Twee soorten beelden:
//   - "tekst": met titel, voordelen en logo (Demand Gen / Display / Google Bedrijfsprofiel / social).
//   - "foto": zonder tekst of logo, voor afbeeldingsitems bij Search-advertenties (Google weigert daar tekst op het beeld).
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'docs/google-ads/visuals');
const tmp = resolve(out, '.tmp');
mkdirSync(tmp, { recursive: true });

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const f = (p) => 'file://' + resolve(root, p);
const fonts = {
  outfit: f('node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2'),
  inter: f('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
};
const logo = f('src/assets/logo-heeman-electrics.png');

const jobs = {
  ervaren: {
    foto: 'src/assets/fotos/gen-draden-plafond.jpg',
    focus: '60% 45%',
    eyebrow: 'Vacature · Regio Schilde',
    titel: ['Ervaren', 'elektricien?'],
    sub: 'Een uitdagende job in de buurt: nieuwbouw, renovatie en domotica.',
    punten: ['Min. 3 jaar ervaring', 'Voltijds, marktconform loon', 'Al onze werven in de regio'],
  },
  junior: {
    foto: 'src/assets/fotos/gen-vakman-ladder.jpg',
    focus: '30% 40%',
    eyebrow: 'Vacature · Regio Schilde',
    titel: ['Net afgestudeerd', 'in elektriciteit?'],
    sub: 'Leer het vak op de werf, in een team van ervaren elektriciens. Ook stageplaatsen.',
    punten: ['Opleiding op de job', 'Voltijds, marktconform loon', 'Werken in de buurt'],
  },
};

const formaten = {
  liggend: { w: 1200, h: 628 },
  vierkant: { w: 1200, h: 1200 },
  staand: { w: 960, h: 1200 },
};

const css = (w, h) => `
@font-face { font-family: Outfit; src: url(${fonts.outfit}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: Inter; src: url(${fonts.inter}) format('woff2'); font-weight: 100 900; }
:root { --brand:#be4516; --accent:#ff5a1f; --ink:#1c0d0a; --paper:#f6f5f1; --sand:#e5d7d1; --muted:#5a4f4b; }
* { box-sizing:border-box; margin:0; padding:0; }
html,body { width:${w}px; height:${h}px; overflow:hidden; background:var(--paper); }
body { font-family:Inter, sans-serif; color:var(--ink); position:relative; }
.foto { position:absolute; background-size:cover; }
.paneel { position:absolute; display:flex; flex-direction:column; }
.eyebrow { font-family:Outfit; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--brand); }
h1 { font-family:Outfit; font-weight:650; letter-spacing:-.03em; line-height:1.0; }
h1 span { display:block; }
h1 .accent { color:var(--brand); }
.sub { color:var(--muted); line-height:1.35; }
ul { list-style:none; display:flex; flex-direction:column; }
li { display:flex; align-items:center; font-weight:600; }
li::before { content:''; flex:none; border-radius:50%; background:var(--accent); }
.cta { display:inline-flex; align-items:center; align-self:flex-start; border-radius:999px; background:var(--brand); color:#fff;
       font-family:Outfit; font-weight:650; }
.cta svg { margin-left:.5em; }
.voet { display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:24px; }
.voet img { display:block; }
.url { font-family:Outfit; font-weight:600; color:var(--ink); }
.kabel { position:absolute; }
`;

// De oranje kabel met stekker uit het logo, als scheiding tussen foto en tekst.
const kabel = (x, y, lengte, dikte) => `
<svg class="kabel" style="left:${x}px;top:${y - dikte * 6}px" width="${lengte + dikte * 14}" height="${dikte * 12}" viewBox="0 0 ${lengte + dikte * 14} ${dikte * 12}">
  <line x1="0" y1="${dikte * 6}" x2="${lengte}" y2="${dikte * 6}" stroke="#be4516" stroke-width="${dikte}"/>
  <path d="M ${lengte} ${dikte * 6} m 0 0 c 0 -${dikte * 4} ${dikte * 3} -${dikte * 4.5} ${dikte * 7} -${dikte * 4.5} l 0 ${dikte * 9} c -${dikte * 4} 0 -${dikte * 7} -${dikte * 0.5} -${dikte * 7} -${dikte * 4.5} z"
        fill="none" stroke="#be4516" stroke-width="${dikte}"/>
  <line x1="${lengte + dikte * 7}" y1="${dikte * 3.5}" x2="${lengte + dikte * 12}" y2="${dikte * 3.5}" stroke="#be4516" stroke-width="${dikte}"/>
  <line x1="${lengte + dikte * 7}" y1="${dikte * 8.5}" x2="${lengte + dikte * 12}" y2="${dikte * 8.5}" stroke="#be4516" stroke-width="${dikte}"/>
</svg>`;

const pijl = (s) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

function tekstblok(j, s) {
  return `
    <div class="eyebrow" style="font-size:${s.eyebrow}px;margin-bottom:${s.gap * 0.7}px">${j.eyebrow}</div>
    <h1 style="font-size:${s.titel}px;margin-bottom:${s.gap}px"><span>${j.titel[0]}</span><span class="accent">${j.titel[1]}</span></h1>
    <p class="sub" style="font-size:${s.sub}px;margin-bottom:${s.gap}px;max-width:${s.subMax}px">${j.sub}</p>
    <ul style="gap:${s.li * 0.55}px;margin-bottom:${s.gap * 1.2}px">
      ${j.punten.map((p) => `<li style="font-size:${s.li}px;gap:${s.li * 0.6}px"><style>li::before{width:${s.li * 0.45}px;height:${s.li * 0.45}px}</style>${p}</li>`).join('')}
    </ul>
    <div class="cta" style="font-size:${s.cta}px;padding:${s.cta * 0.62}px ${s.cta * 1.3}px">Solliciteer online ${pijl(s.cta)}</div>`;
}

function voet(s) {
  return `<div class="voet"><img src="${logo}" style="height:${s.logo}px"><span class="url" style="font-size:${s.url}px">heeman-electrics.be/jobs</span></div>`;
}

function html(job, formaat) {
  const j = jobs[job];
  const { w, h } = formaten[formaat];
  const foto = `background-image:url(${f(j.foto)});background-position:${j.focus}`;
  let body;
  if (formaat === 'liggend') {
    const pw = 640;
    const s = { eyebrow: 15, titel: 58, sub: 19, subMax: 520, li: 18, cta: 20, gap: 18, logo: 46, url: 15 };
    body = `
      <div class="foto" style="left:${pw}px;top:0;width:${w - pw}px;height:${h}px;${foto}"></div>
      <div class="paneel" style="left:0;top:0;width:${pw}px;height:${h}px;padding:44px 48px 32px 52px">
        ${tekstblok(j, s)}${voet(s)}
      </div>
      ${kabel(0, 22, pw - 70, 5)}`;
  } else {
    const ph = formaat === 'vierkant' ? 420 : 410;
    const s =
      formaat === 'vierkant'
        ? { eyebrow: 21, titel: 86, sub: 28, subMax: 980, li: 26, cta: 28, gap: 20, logo: 60, url: 23 }
        : { eyebrow: 19, titel: 76, sub: 26, subMax: 820, li: 25, cta: 26, gap: 18, logo: 54, url: 20 };
    body = `
      <div class="foto" style="left:0;top:0;width:${w}px;height:${ph}px;${foto}"></div>
      ${kabel(0, ph, w - 150, 7)}
      <div class="paneel" style="left:0;top:${ph + 26}px;width:${w}px;height:${h - ph - 26}px;padding:34px 72px 48px 72px">
        ${tekstblok(j, s)}${voet(s)}
      </div>`;
  }
  return `<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><style>${css(w, h)}</style></head><body>${body}</body></html>`;
}

function render(naam, inhoud, w, h) {
  const bestand = resolve(tmp, naam + '.html');
  writeFileSync(bestand, inhoud);
  const png = resolve(out, naam + '.png');
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', '--virtual-time-budget=3000',
    `--window-size=${w},${h}`, `--screenshot=${png}`, 'file://' + bestand,
  ], { stdio: 'ignore' });
  console.log('✓', naam + '.png', `${w}×${h}`);
}

for (const job of Object.keys(jobs)) {
  for (const [formaat, { w, h }] of Object.entries(formaten)) {
    render(`${job}-${formaat}`, html(job, formaat), w, h);
  }
}

// Foto's zonder tekst voor afbeeldingsitems bij Search-advertenties (1,91:1 en 1:1).
const fotoSets = [
  ['foto-draden-plafond', 'src/assets/fotos/gen-draden-plafond.jpg', 'attention'],
  ['foto-vakman-ladder', 'src/assets/fotos/gen-vakman-ladder.jpg', 'attention'],
  ['foto-verdeelkast-bekabeling', 'src/assets/fotos/gen-verdeelkast-bekabeling.jpg', 'attention'],
  ['foto-kabeladers', 'src/assets/fotos/gen-kabeladers.jpg', 'centre'],
];
for (const [naam, bron, positie] of fotoSets) {
  for (const [suffix, w, h] of [['liggend', 1200, 628], ['vierkant', 1200, 1200]]) {
    await sharp(resolve(root, bron)).resize(w, h, { fit: 'cover', position: positie }).jpeg({ quality: 86 }).toFile(resolve(out, `${naam}-${suffix}.jpg`));
    console.log('✓', `${naam}-${suffix}.jpg`, `${w}×${h}`);
  }
}

// Logo's voor Google Ads: vierkant (1:1) en liggend (4:1), op een lichte achtergrond.
const logoBuf = await sharp(resolve(root, 'src/assets/logo-heeman-electrics.png')).resize(1000).png().toBuffer();
await sharp({ create: { width: 1200, height: 1200, channels: 3, background: '#f6f5f1' } })
  .composite([{ input: logoBuf, gravity: 'center' }]).png().toFile(resolve(out, 'logo-vierkant.png'));
const logoBuf2 = await sharp(resolve(root, 'src/assets/logo-heeman-electrics.png')).resize({ height: 250 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 300, channels: 3, background: '#f6f5f1' } })
  .composite([{ input: logoBuf2, gravity: 'center' }]).png().toFile(resolve(out, 'logo-liggend.png'));
console.log('✓ logo-vierkant.png 1200×1200, logo-liggend.png 1200×300');

rmSync(tmp, { recursive: true, force: true });
