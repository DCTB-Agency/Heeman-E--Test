// Voorbeeld van de formuliermails bekijken zonder iets te versturen: node scripts/mail-voorbeeld.mjs
// Schrijft docs/mail-voorbeeld-{offerte,snelcontact,contact,sollicitatie}.html.
import { writeFile, mkdir } from 'node:fs/promises';
import { bouwMail } from '../netlify/lib/mail-sjabloon.mjs';
import { LOGO_PNG_BASE64 } from '../netlify/lib/logo-mail.mjs';

// In het voorbeeld staat het logo als data-URI in de HTML (in de echte mail: ingesloten bijlage met cid:).
const logo = `data:image/png;base64,${LOGO_PNG_BASE64}`;

const voorbeelden = {
  offerte: {
    klanttype: 'Particulier', dienst: 'Algemene elektriciteitswerken & renovatie', gemeente: 'Schilde',
    omschrijving: 'We verbouwen de keuken en willen extra stopcontacten en een nieuwe verdeelkast.\nDe huidige kast heeft nog smeltzekeringen.',
    naam: 'Voorbeeld Klant', gsm: '0470 12 34 56', email: 'klant@voorbeeld.be', voorkeur: 'Bellen',
    foto: { url: 'https://example.com/verdeelkast.jpg', filename: 'verdeelkast.jpg' }, privacy: 'on',
  },
  snelcontact: { onderwerp: 'Domotica', naam: 'Voorbeeld Klant', contact: '0470 12 34 56', privacy: 'on' },
  contact: { naam: 'Voorbeeld Klant', gsm: '0470 12 34 56', email: 'klant@voorbeeld.be', bericht: 'Komen jullie ook in Malle voor een herstelling?' },
  sollicitatie: {
    functie: 'Ervaren elektricien', naam: 'Voorbeeld Kandidaat', gsm: '0470 65 43 21', email: 'kandidaat@voorbeeld.be',
    woonplaats: 'Zoersel', ervaring: '3 tot 5 jaar', 'rijbewijs-b-en-vervoer': 'ja', motivatie: 'Ik zoek een job dicht bij huis.',
    cv: { url: 'https://example.com/cv.pdf', filename: 'cv-voorbeeld.pdf' },
  },
};

await mkdir('docs', { recursive: true });
for (const [formulier, data] of Object.entries(voorbeelden)) {
  const m = bouwMail({ formulier, data, logoUrl: logo, siteUrl: 'https://www.heeman-electrics.be' });
  await writeFile(`docs/mail-voorbeeld-${formulier}.html`, m.html);
  console.log(`docs/mail-voorbeeld-${formulier}.html — onderwerp: ${m.onderwerp}`);
}
