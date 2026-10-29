<?php
// Opgemaakte HTML-mail voor een formulierinzending — PHP-versie van netlify/lib/mail-sjabloon.mjs (zelfde opmaak).
// Wordt enkel ingeladen door formulier.php; rechtstreeks openen wordt geweigerd (.htaccess).
declare(strict_types=1);

const HE_LOGO_CID = 'logo@heeman-electrics.be';
const HE_KLEUR = ['brand' => '#be4516', 'accent' => '#ff5a1f', 'ink' => '#1c0d0a', 'paper' => '#f6f5f1', 'muted' => '#5a4f4b', 'lijn' => '#e5d7d1'];

/** Per formulier: titel, intro en volgorde + labels van de velden. */
function he_formulieren(): array
{
    return [
        'offerte' => [
            'titel' => 'Nieuwe offerteaanvraag',
            'intro' => 'Er is een offerteaanvraag binnengekomen via de website.',
            'velden' => [
                'klanttype' => 'Aanvraag als', 'bedrijf' => 'Bedrijfsnaam', 'dienst' => 'Dienst', 'gemeente' => 'Gemeente',
                'omschrijving' => 'Omschrijving', 'naam' => 'Naam', 'gsm' => 'Gsm', 'email' => 'E-mail', 'voorkeur' => 'Contact via',
                'foto' => 'Foto',
            ],
            'verplicht' => ['klanttype', 'dienst', 'gemeente', 'omschrijving', 'naam', 'gsm', 'privacy'],
            'bedankt' => '/offerte/bedankt/',
        ],
        'snelcontact' => [
            'titel' => 'Nieuwe contactaanvraag',
            'intro' => 'Iemand vroeg via het korte formulier op de homepage om gecontacteerd te worden.',
            'velden' => ['onderwerp' => 'Onderwerp', 'naam' => 'Naam', 'contact' => 'Gsm of e-mail'],
            'verplicht' => ['onderwerp', 'naam', 'contact', 'privacy'],
            'bedankt' => '/contact/bedankt/',
        ],
        'contact' => [
            'titel' => 'Nieuw bericht',
            'intro' => 'Er is een bericht binnengekomen via het contactformulier.',
            'velden' => ['naam' => 'Naam', 'gsm' => 'Gsm', 'email' => 'E-mail', 'bericht' => 'Bericht'],
            'verplicht' => ['naam', 'gsm', 'bericht', 'privacy'],
            'bedankt' => '/contact/bedankt/',
        ],
        'sollicitatie' => [
            'titel' => 'Nieuwe sollicitatie',
            'intro' => 'Er is een sollicitatie binnengekomen via de jobpagina.',
            'velden' => [
                'functie' => 'Functie', 'naam' => 'Naam', 'gsm' => 'Gsm', 'email' => 'E-mail', 'woonplaats' => 'Woonplaats',
                'ervaring' => 'Ervaring', 'rijbewijs-b-en-vervoer' => 'Rijbewijs B + eigen vervoer', 'motivatie' => 'Motivatie', 'cv' => 'Cv',
            ],
            'verplicht' => ['functie', 'naam', 'gsm', 'email', 'woonplaats', 'ervaring', 'rijbewijs-b-en-vervoer', 'privacy', 'cv'],
            'bedankt' => '/jobs/bedankt/',
        ],
    ];
}

function he_onderwerp(string $formulier, array $d): string
{
    $n = $d['naam'] ?? '';
    switch ($formulier) {
        case 'offerte':
            $kt = !empty($d['klanttype']) ? " ({$d['klanttype']})" : '';
            return trim("Offerteaanvraag{$kt}: " . ($d['dienst'] ?? 'dienst') . ' – ' . ($d['gemeente'] ?? 'gemeente') . " · {$n}");
        case 'snelcontact':
            return trim('Contactaanvraag: ' . ($d['onderwerp'] ?? 'vraag') . " · {$n}");
        case 'sollicitatie':
            $f = !empty($d['functie']) ? mb_strtolower($d['functie']) . ' ' : '';
            return trim("Sollicitatie {$f}· {$n}");
        default:
            return trim("Bericht via de website · {$n}");
    }
}

function he_esc(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/** Belgisch gsm-nummer → internationaal formaat zonder spaties (voor tel: en WhatsApp). */
function he_internationaal(string $gsm): string
{
    $n = preg_replace('/[^\d+]/', '', $gsm) ?? '';
    if (str_starts_with($n, '00')) return '+' . substr($n, 2);
    if (str_starts_with($n, '0')) return '+32' . substr($n, 1);
    return $n;
}

function he_knop(string $href, string $label, bool $primair = false): string
{
    $k = HE_KLEUR;
    $bg = $primair ? $k['brand'] : '#ffffff';
    $kleur = $primair ? '#ffffff' : $k['ink'];
    $rand = $primair ? $k['brand'] : $k['lijn'];
    return '<a href="' . he_esc($href) . "\" style=\"display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;border:2px solid {$rand};background:{$bg};color:{$kleur};font-weight:700;font-size:15px;text-decoration:none;\">" . he_esc($label) . '</a>';
}

/**
 * @param array<string,string> $d       ingevulde velden (tekst)
 * @param array<string,string> $bestanden veldnaam => bestandsnaam (meegestuurd als bijlage)
 * @return array{onderwerp:string, html:string, tekst:string}
 */
function he_bouw_mail(string $formulier, array $d, array $bestanden, string $siteUrl, ?DateTimeInterface $ontvangen = null): array
{
    $k = HE_KLEUR;
    $f = he_formulieren()[$formulier];
    // Snelcontact: één veld "gsm of e-mail" → als gsm of e-mail tonen (met de juiste knoppen).
    if (!empty($d['contact'])) {
        if (str_contains($d['contact'], '@')) $d['email'] = $d['email'] ?? $d['contact'];
        else $d['gsm'] = $d['gsm'] ?? $d['contact'];
        unset($d['contact']);
        $f['velden'] += ['gsm' => 'Gsm', 'email' => 'E-mail'];
    }
    $verborgen = ['form-name', 'bot-field', 'privacy', 'geladen'];
    $alle = $d + $bestanden;
    $sleutels = array_values(array_filter(
        array_unique(array_merge(array_keys($f['velden']), array_keys($alle))),
        fn ($s) => !in_array($s, $verborgen, true) && isset($alle[$s]) && $alle[$s] !== ''
    ));
    $label = fn ($s) => $f['velden'][$s] ?? ucfirst(str_replace(['-', '_'], ' ', $s));

    $rijen = '';
    foreach ($sleutels as $s) {
        if (isset($bestanden[$s])) {
            $waarde = '<strong>' . he_esc($bestanden[$s]) . "</strong> <span style=\"color:{$k['muted']};\">(in bijlage)</span>";
        } elseif ($s === 'gsm') {
            $waarde = '<a href="tel:' . he_esc(he_internationaal($d[$s])) . "\" style=\"color:{$k['brand']};font-weight:700;text-decoration:none;\">" . he_esc($d[$s]) . '</a>';
        } elseif ($s === 'email') {
            $waarde = '<a href="mailto:' . he_esc($d[$s]) . "\" style=\"color:{$k['brand']};font-weight:700;text-decoration:none;\">" . he_esc($d[$s]) . '</a>';
        } else {
            $waarde = nl2br(he_esc($d[$s]));
        }
        $rijen .= "<tr><td style=\"padding:12px 16px 12px 0;border-bottom:1px solid {$k['lijn']};color:{$k['muted']};font-size:14px;vertical-align:top;white-space:nowrap;width:38%;\">" . he_esc($label($s)) . "</td><td style=\"padding:12px 0;border-bottom:1px solid {$k['lijn']};color:{$k['ink']};font-size:15px;vertical-align:top;\">{$waarde}</td></tr>";
    }

    $ontvangen ??= new DateTimeImmutable('now', new DateTimeZone('Europe/Brussels'));
    $datum = class_exists('IntlDateFormatter')
        ? (new IntlDateFormatter('nl_BE', IntlDateFormatter::FULL, IntlDateFormatter::SHORT, 'Europe/Brussels'))->format($ontvangen)
        : $ontvangen->format('d/m/Y \o\m H:i');

    $naam = $d['naam'] ?? '';
    $voornaam = explode(' ', trim($naam))[0] ?? '';
    $gsm = !empty($d['gsm']) ? he_internationaal($d['gsm']) : '';
    $knoppen = '';
    if ($gsm) {
        $knoppen .= he_knop("tel:{$gsm}", 'Bel ' . ($voornaam ?: 'terug'), true);
        $knoppen .= he_knop('https://wa.me/' . ltrim($gsm, '+'), 'WhatsApp');
    }
    if (!empty($d['email'])) {
        $knoppen .= he_knop('mailto:' . $d['email'] . '?subject=' . rawurlencode('Re: ' . mb_strtolower($f['titel']) . ' via heeman-electrics.be'), 'Antwoord per mail');
    }

    $titel = he_esc($f['titel']) . ($naam !== '' ? ' van ' . he_esc($naam) : '');
    // Logo ingesloten in de mail (multipart/related, Content-ID), zodat het altijd zichtbaar is.
    $logo = 'cid:' . HE_LOGO_CID;
    $siteKort = he_esc(preg_replace('#^https?://#', '', $siteUrl) ?? $siteUrl);
    $antwoord = !empty($d['email']) ? he_esc($naam ?: 'de afzender') : 'Heeman Electrics (de bezoeker gaf geen e-mailadres)';

    $html = <<<HTML
<!doctype html>
<html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>{$titel}</title></head>
<body style="margin:0;padding:0;background:{$k['paper']};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{$k['paper']};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid {$k['lijn']};">
        <tr><td style="height:6px;background:{$k['brand']};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 32px 8px;"><img src="{$logo}" width="170" alt="Heeman Electrics" style="display:block;width:170px;max-width:60%;height:auto;border:0;"></td></tr>
        <tr><td style="padding:16px 32px 0;">
          <p style="margin:0;color:{$k['brand']};font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">{$datum}</p>
          <h1 style="margin:8px 0 6px;color:{$k['ink']};font-size:26px;line-height:1.2;">{$titel}</h1>
          <p style="margin:0;color:{$k['muted']};font-size:15px;">{$f['intro']}</p>
        </td></tr>
        <tr><td style="padding:20px 32px 4px;">{$knoppen}</td></tr>
        <tr><td style="padding:12px 32px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">{$rijen}</table></td></tr>
        <tr><td style="padding:18px 32px;background:{$k['ink']};color:#cbbfba;font-size:12px;line-height:1.6;">
          Verzonden via het formulier op <a href="{$siteUrl}" style="color:{$k['accent']};text-decoration:none;">{$siteKort}</a>.
          Antwoorden op deze mail gaat rechtstreeks naar {$antwoord}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>
HTML;

    $tekst = $f['titel'] . ($naam !== '' ? " van {$naam}" : '') . "\n{$datum}\n\n";
    foreach ($sleutels as $s) {
        $tekst .= $label($s) . ': ' . ($bestanden[$s] ?? $d[$s]) . "\n";
    }
    $tekst .= "\nVerzonden via {$siteUrl}";

    return ['onderwerp' => he_onderwerp($formulier, $d), 'html' => $html, 'tekst' => $tekst];
}
