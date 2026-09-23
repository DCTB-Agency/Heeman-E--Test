export type Punt = [number, number];

/** Zet knikpunten in procent om naar pixels voor een container van w × h. */
export function naarPx(pts: Punt[], w: number, h: number): Punt[] {
  return pts.map(([x, y]) => [(x / 100) * w, (y / 100) * h]);
}

/** Verwijder dubbele en rechtlijnige tussenpunten (anders krijg je lege of rare bochten). */
function opschonen(pts: Punt[]): Punt[] {
  const uniek = pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 0.5);
  return uniek.filter((p, i) => {
    if (i === 0 || i === uniek.length - 1) return true;
    const [a, b] = [uniek[i - 1], uniek[i + 1]];
    return Math.abs((p[0] - a[0]) * (b[1] - a[1]) - (p[1] - a[1]) * (b[0] - a[0])) > 0.5;
  });
}

/** SVG-pad met afgeronde bochten (straal r px) door knikpunten in pixels. */
export function kabelPad(punten: Punt[], r: number): string {
  const p = opschonen(punten);
  let d = `M ${p[0][0]} ${p[0][1]}`;
  for (let i = 1; i < p.length - 1; i++) {
    const [px, py] = p[i - 1], [cx, cy] = p[i], [nx, ny] = p[i + 1];
    const inLen = Math.hypot(cx - px, cy - py), outLen = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, inLen / 2, outLen / 2);
    const ax = cx - ((cx - px) / inLen) * rr, ay = cy - ((cy - py) / inLen) * rr;
    const bx = cx + ((nx - cx) / outLen) * rr, by = cy + ((ny - cy) / outLen) * rr;
    d += ` L ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
  }
  const last = p[p.length - 1];
  return d + ` L ${last[0]} ${last[1]}`;
}
