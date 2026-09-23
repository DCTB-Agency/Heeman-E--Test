/** Bouw een SVG-pad met afgeronde bochten door knikpunten in procent van een container van w × h px. */
export function kabelPad(pts: [number, number][], w: number, h: number, r: number): string {
  const p = pts.map(([x, y]) => [(x / 100) * w, (y / 100) * h]);
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
