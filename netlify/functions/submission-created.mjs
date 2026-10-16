// Netlify roept deze functie automatisch aan bij elke geverifieerde formulierinzending (event "submission-created";
// spam die Netlify/Akismet tegenhoudt, komt hier niet). We sturen een opgemaakte mail naar info@ via de mailserver
// van Vimexx, zoals de SureForms-mails op de oude WordPress-site.
//
// Omgevingsvariabelen (Netlify → Site configuration → Environment variables, scope "Functions"):
//   SMTP_HOST  bv. mail.heeman-electrics.be (zie Vimexx → E-mail → instellingen)
//   SMTP_PORT  465 (SSL) of 587 (STARTTLS)
//   SMTP_USER  info@heeman-electrics.be
//   SMTP_PASS  wachtwoord van die mailbox — enkel hier invullen, nooit in de code
//   MAIL_TO    (optioneel) ontvanger, standaard info@heeman-electrics.be
//   MAIL_FROM  (optioneel) afzender, standaard SMTP_USER
import nodemailer from 'nodemailer';
import { bouwMail, tekst } from '../lib/mail-sjabloon.mjs';

const MAX_BIJLAGE = 8 * 1024 * 1024;

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  if (!payload) return { statusCode: 400, body: 'Geen payload' };

  const { form_name: formulier, data = {}, created_at } = payload;
  const env = process.env;
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.error('[mail] SMTP-gegevens ontbreken; inzending staat wel in Netlify → Forms.', formulier);
    return { statusCode: 200, body: 'SMTP niet ingesteld' };
  }

  const siteUrl = env.URL || 'https://www.heeman-electrics.be';
  const mail = bouwMail({
    formulier,
    data,
    ontvangen: created_at ? new Date(created_at) : new Date(),
    logoUrl: `${siteUrl}/logo.png`,
    siteUrl,
  });

  // Geüploade bestanden (cv, foto) als bijlage meesturen; lukt dat niet, dan staat de link in de mail.
  const bijlagen = [];
  for (const waarde of Object.values(data)) {
    if (!waarde || typeof waarde !== 'object' || !waarde.url) continue;
    try {
      const res = await fetch(waarde.url);
      const buf = Buffer.from(await res.arrayBuffer());
      if (res.ok && buf.length <= MAX_BIJLAGE) bijlagen.push({ filename: waarde.filename || 'bijlage', content: buf, contentType: waarde.type });
    } catch (e) {
      console.warn('[mail] bijlage niet opgehaald:', e.message);
    }
  }

  const poort = Number(env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: poort,
    secure: poort === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  const bezoekerMail = tekst(data.email);
  try {
    await transport.sendMail({
      from: { name: 'Website Heeman Electrics', address: env.MAIL_FROM || env.SMTP_USER },
      to: env.MAIL_TO || 'info@heeman-electrics.be',
      replyTo: bezoekerMail ? { name: tekst(data.naam) || bezoekerMail, address: bezoekerMail } : undefined,
      subject: mail.onderwerp,
      html: mail.html,
      text: mail.tekst,
      attachments: bijlagen,
    });
    return { statusCode: 200, body: 'Verstuurd' };
  } catch (e) {
    // Niet opnieuw gooien: de inzending blijft bewaard in Netlify → Forms.
    console.error('[mail] versturen mislukt:', e.message);
    return { statusCode: 500, body: 'Mail niet verstuurd' };
  }
};
