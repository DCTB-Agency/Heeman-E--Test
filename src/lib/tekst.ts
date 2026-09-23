/** Escape tekst voor gebruik in HTML. */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Placeholders uit de brief: [AANVULLEN: …], [TE BEVESTIGEN: …], [TE BEVESTIGEN], [te controleren]
const PLACEHOLDER = /\[(AANVULLEN|TE BEVESTIGEN|te controleren)(?::[^\]]*)?\]/g;

/** Escape tekst en markeer placeholders geel (class "todo"), zodat ze vóór livegang opvallen. */
export function metTodo(s: string): string {
  return esc(s).replace(PLACEHOLDER, (m) => `<mark class="todo">${m}</mark>`);
}

/** Bevat de tekst nog een placeholder? */
export function heeftTodo(s: string): boolean {
  return new RegExp(PLACEHOLDER.source).test(s);
}
