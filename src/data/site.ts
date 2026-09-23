// Eén bron voor alle bedrijfsfeiten (NAP). Zie CLAUDE.md § 0.1 en § 2.
// Wijzig hier — header, footer, onderbalk en JSON-LD lezen allemaal uit dit bestand.

export const SITE_URL = 'https://www.heeman-electrics.be';

export const business = {
  name: 'Heeman Electrics',
  legalName: 'AUGES BV', // bevestigd 23-09-2026
  legalForm: 'BV',
  vat: 'BE 0696.715.762',
  vatId: 'BE0696715762',
  foundingDate: '2018-05',
  owner: 'Bert Heeman',
  ownerTitle: 'Erkend elektricien en zaakvoerder',
  experience: 'meer dan 10 jaar ervaring',
  email: 'info@heeman-electrics.be',
  phone: {
    display: '0485 19 00 27',
    international: '+32 485 19 00 27',
    e164: '+32485190027',
    href: 'tel:+32485190027',
  },
  whatsapp: {
    href: 'https://wa.me/32485190027',
    jobHref:
      'https://wa.me/32485190027?text=Hallo%20Bert%2C%20ik%20heb%20interesse%20in%20de%20job%20als%20junior%20elektricien.',
  },
  address: {
    street: 'Baron Delbekelaan 49',
    postalCode: '2970',
    locality: 'Schilde',
    region: 'Antwerpen',
    country: 'BE',
  },
  hours: {
    label: 'ma–vr 08:00–17:30',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:30',
    urgent: 'Dringend? Ook buiten de openingsuren bereikbaar.',
  },
  sameAs: [] as string[], // [AANVULLEN: Google Bedrijfsprofiel, Facebook, Instagram, LinkedIn]
} as const;

// Google Analytics (CLAUDE.md § 13): Google-tag uit de huidige site (Site Kit), stuurt door naar GA4.
// Laadt pas na toestemming (Consent Mode v2, basisversie). [TE BEVESTIGEN: GA4-property + eventueel G-meet-ID]
export const analytics = {
  tagId: 'GT-KDTJ593M',
  toestemmingGeldigDagen: 180, // daarna opnieuw vragen
} as const;

// Antwoordtermijn op offertes en berichten (§ 8, § 18.14).
export const antwoordTermijn = '5 werkdagen'; // bevestigd 23-09-2026

export const areas = [
  { name: 'Schilde', slug: 'elektricien-schilde' },
  { name: "'s-Gravenwezel", slug: 'elektricien-s-gravenwezel' },
  { name: 'Wijnegem', slug: 'elektricien-wijnegem' },
  { name: 'Schoten', slug: 'elektricien-schoten' },
  { name: 'Brasschaat', slug: 'elektricien-brasschaat' },
  { name: 'Zoersel', slug: 'elektricien-zoersel' },
  { name: 'Zandhoven', slug: 'elektricien-zandhoven' },
  { name: 'Ranst', slug: 'elektricien-ranst' },
] as const;

// Prioriteit 1–5 = kerndiensten (groot op home), 6–9 = aanvullend (CLAUDE.md § 3).
export const services = [
  { slug: 'laadpaal-installeren', name: 'Laadpaal installeren', priority: 1 },
  { slug: 'elektrische-keuring', name: 'Installatie keuringsklaar maken', priority: 2 },
  { slug: 'domotica-niko-home-control', name: 'Domotica · Niko Home Control', priority: 3 },
  { slug: 'renovatie-elektriciteit', name: 'Renovatie elektriciteit', priority: 4 },
  { slug: 'zonnepanelen-thuisbatterij', name: 'Zonnepanelen & thuisbatterij', priority: 5 },
  { slug: 'nieuwbouw', name: 'Nieuwbouw', priority: 6 },
  { slug: 'video-parlofonie', name: 'Video- & parlofonie', priority: 7 },
  { slug: 'verlichtingsadvies', name: 'Verlichtingsadvies', priority: 8 },
  { slug: 'dringende-herstellingen', name: 'Dringende herstellingen', priority: 9 },
] as const;

// Groepering van de diensten in het mobiele menu (23-09-2026).
export const dienstGroepen = [
  { titel: 'Laden & energie', slugs: ['laadpaal-installeren', 'zonnepanelen-thuisbatterij'] },
  { titel: 'Installatie & keuring', slugs: ['elektrische-keuring', 'renovatie-elektriciteit', 'nieuwbouw', 'dringende-herstellingen'] },
  { titel: 'Comfort & slim wonen', slugs: ['domotica-niko-home-control', 'video-parlofonie', 'verlichtingsadvies'] },
] as const;

export const serviceUrl = (slug: string) => `/diensten/${slug}/`;
export const areaUrl = (slug: string) => `/regio/${slug}/`;

export const job = {
  url: '/jobs/junior-elektricien/',
  title: 'Junior elektricien (m/v/x)',
  announcement: 'Ik zoek een junior elektricien in de regio Schilde',
  announcementCta: 'Bekijk de job',
  mailto:
    'mailto:info@heeman-electrics.be?subject=Sollicitatie%20junior%20elektricien',
} as const;

export const nav = [
  { label: 'Realisaties', href: '/realisaties/' },
  { label: 'Over Bert', href: '/over-bert/' },
  { label: 'Jobs', href: '/jobs/', badge: 'We zoeken versterking' },
  { label: 'Contact', href: '/contact/' },
] as const;
