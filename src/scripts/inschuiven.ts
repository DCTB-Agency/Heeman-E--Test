// Fase per fase inschuiven (13-10-2026). Elk blok (.reveal) en elk kind van een .reveal-stagger schuift in zodra het
// in beeld komt. Wat in dezelfde "scrollstap" verschijnt, krijgt een oplopende vertraging in leesvolgorde
// (boven → onder, links → rechts), zodat een rij kaarten na elkaar binnenkomt, ook op mobiel in één kolom.
// Eén keer per element; daarna wordt het niet meer gevolgd. Bij "beperkte beweging" toont de CSS alles meteen.

const STAP = 90; // ms tussen elementen
const MAX = 450; // nooit langer wachten dan dit

const doelen = [
  ...document.querySelectorAll<HTMLElement>('.reveal'),
  ...[...document.querySelectorAll<HTMLElement>('.reveal-stagger')].flatMap((s) => [...s.children] as HTMLElement[]),
];

function toon(el: HTMLElement, vertraging = 0) {
  el.style.setProperty('--vertraging', `${Math.min(vertraging, MAX)}ms`);
  el.classList.add('is-in');
}

if (!('IntersectionObserver' in window)) {
  doelen.forEach((el) => toon(el));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      const nu = entries
        .filter((e) => e.isIntersecting || e.boundingClientRect.top < 0) // ook wat al boven het scherm staat (anker, terugkeren)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      let i = 0;
      nu.forEach((e) => {
        const el = e.target as HTMLElement;
        const erboven = e.boundingClientRect.top < 0; // al voorbij gescrold: meteen tonen, zonder wachttijd
        toon(el, erboven ? 0 : i++ * STAP);
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  doelen.forEach((el) => io.observe(el));
}

// Lazy foto's: zacht infaden zodra ze geladen zijn.
document.querySelectorAll<HTMLImageElement>('.foto img[loading="lazy"]').forEach((img) => {
  const klaar = () => img.classList.add('geladen');
  if (img.complete && img.naturalWidth) klaar();
  else {
    img.addEventListener('load', klaar, { once: true });
    img.addEventListener('error', klaar, { once: true });
  }
});
