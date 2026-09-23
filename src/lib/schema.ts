import { SITE_URL } from '../data/site';

export type Kruimel = { naam: string; url: string };

/** BreadcrumbList-schema (CLAUDE.md § 10). */
export function breadcrumbSchema(kruimels: Kruimel[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: kruimels.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.naam,
      item: new URL(k.url, SITE_URL).href,
    })),
  };
}

export type Vraag = { vraag: string; antwoord: string };

/** FAQPage-schema: exact dezelfde vragen en antwoorden als zichtbaar op de pagina. */
export function faqSchema(vragen: Vraag[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: vragen.map((v) => ({
      '@type': 'Question',
      name: v.vraag,
      acceptedAnswer: { '@type': 'Answer', text: v.antwoord },
    })),
  };
}
