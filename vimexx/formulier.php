<?php
// Formulierverwerking voor hosting bij Vimexx (vervangt Netlify Forms + submission-created).
// Ontvangt offerte, contact en sollicitatie, controleert ze, stuurt een opgemaakte mail naar info@ en stuurt de
// bezoeker door naar de bedankpagina. Zelfde principe als SureForms op de oude WordPress-site: de mail vertrekt
// van de webserver van Vimexx met PHP mail() (de server staat in het SPF-record van heeman-electrics.be).
//
// Spam: honeypot (bot-field), minimale invultijd, max. 5 inzendingen per IP per 10 minuten, linkfilter.
// Mislukt de mail, dan wordt de inzending bewaard in ../formulier-archief/ (buiten de website, niet publiek).
declare(strict_types=1);

require __DIR__ . '/formulier/mail-sjabloon.php';

const HE_ONTVANGER = 'info@heeman-electrics.be';
const HE_AFZENDER = 'info@heeman-electrics.be';
const HE_SITE = 'https://www.heeman-electrics.be';
const HE_MAX_BESTAND = 8 * 1024 * 1024;
const HE_TOEGELATEN = ['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];

function he_fout(string $boodschap, int $code = 400): never
{
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    $b = he_esc($boodschap);
    echo <<<HTML
<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Formulier niet verzonden · Heeman Electrics</title></head>
<body style="margin:0;background:#f6f5f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1c0d0a;">
<div style="max-width:560px;margin:12vh auto;padding:32px;background:#fff;border-radius:18px;border-top:6px solid #be4516;">
<h1 style="margin:0 0 12px;font-size:26px;">Het formulier is niet verzonden</h1>
<p style="font-size:17px;line-height:1.5;">{$b}</p>
<p style="font-size:17px;line-height:1.5;">Liever meteen contact? Bel <a href="tel:+32485190027" style="color:#be4516;font-weight:700;">0485 19 00 27</a> of mail naar <a href="mailto:info@heeman-electrics.be" style="color:#be4516;font-weight:700;">info@heeman-electrics.be</a>.</p>
<p><a href="javascript:history.back()" style="display:inline-block;margin-top:8px;padding:12px 20px;border-radius:999px;background:#be4516;color:#fff;font-weight:700;text-decoration:none;">Terug naar het formulier</a></p>
</div></body></html>
HTML;
    exit;
}

/** Eén regel tekst: geen regeleinden (voorkomt header-injectie), max. lengte. */
function he_regel(string $s, int $max = 200): string
{
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $s) ?? ''), 0, $max);
}

function he_rate_limit(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'onbekend';
    $bestand = sys_get_temp_dir() . '/he-formulier-' . hash('sha256', $ip) . '.json';
    $nu = time();
    $tijden = @is_file($bestand) ? (json_decode((string) @file_get_contents($bestand), true) ?: []) : [];
    $tijden = array_values(array_filter($tijden, fn ($t) => $t > $nu - 600));
    if (count($tijden) >= 5) return false;
    $tijden[] = $nu;
    @file_put_contents($bestand, json_encode($tijden), LOCK_EX);
    return true;
}

/** Versturen met PHP mail(); in een test (HE_TEST_UITVOER) wordt de mail naar een bestand geschreven. */
function he_verstuur(string $aan, string $onderwerp, string $body, string $headers): bool
{
    $test = getenv('HE_TEST_UITVOER');
    if ($test) {
        return (bool) file_put_contents($test, "To: {$aan}\r\nSubject: {$onderwerp}\r\n{$headers}\r\n\r\n{$body}");
    }
    // Met envelope-afzender (beter voor SPF/bounces); lukt dat niet op de server, dan zonder.
    return @mail($aan, $onderwerp, $body, $headers, '-f' . HE_AFZENDER) || @mail($aan, $onderwerp, $body, $headers);
}

// ---------------------------------------------------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contact/', true, 303);
    exit;
}

$formulieren = he_formulieren();
$formulier = (string) ($_POST['form-name'] ?? '');
if (!isset($formulieren[$formulier])) he_fout('Onbekend formulier.');
$cfg = $formulieren[$formulier];

// Honeypot ingevuld of te snel verstuurd → stil doorsturen (een bot hoeft niet te weten dat hij geweigerd is).
$geladen = (int) ($_POST['geladen'] ?? 0);
$te_snel = $geladen > 0 && (int) (microtime(true) * 1000) - $geladen < 3000;
if (trim((string) ($_POST['bot-field'] ?? '')) !== '' || $te_snel) {
    header('Location: ' . $cfg['bedankt'], true, 303);
    exit;
}
if (!he_rate_limit()) he_fout('U heeft net al enkele berichten verstuurd. Probeer het binnen enkele minuten opnieuw.', 429);

// Velden ophalen: enkel gekende velden, als tekst.
$d = [];
foreach (array_keys($cfg['velden']) as $veld) {
    if (!isset($_POST[$veld]) || is_array($_POST[$veld])) continue;
    $waarde = (string) $_POST[$veld];
    $d[$veld] = in_array($veld, ['omschrijving', 'bericht', 'motivatie'], true) ? mb_substr(trim($waarde), 0, 5000) : he_regel($waarde);
}
$d['privacy'] = isset($_POST['privacy']) ? 'ja' : '';

// Bestanden (foto bij offerte, cv bij sollicitatie).
$bijlagen = [];
$bestanden = [];
foreach (['foto', 'cv'] as $veld) {
    if (!isset($cfg['velden'][$veld]) || empty($_FILES[$veld]) || ($_FILES[$veld]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
    $f = $_FILES[$veld];
    if ($f['error'] !== UPLOAD_ERR_OK) he_fout('Het bestand kon niet worden opgeladen. Probeer een kleiner bestand (max. 8 MB).');
    if ($f['size'] > HE_MAX_BESTAND) he_fout('Het bestand is te groot (max. 8 MB).');
    $ext = strtolower(pathinfo((string) $f['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, HE_TOEGELATEN, true)) he_fout('Dit bestandstype wordt niet aanvaard. Gebruik pdf, docx of een foto (jpg, png, heic).');
    $naam = preg_replace('/[^\w.\- ]+/u', '_', basename((string) $f['name'])) ?: "bijlage.{$ext}";
    $bijlagen[] = ['naam' => $naam, 'inhoud' => (string) file_get_contents($f['tmp_name']), 'type' => (function_exists('mime_content_type') ? mime_content_type($f['tmp_name']) : '') ?: 'application/octet-stream'];
    $bestanden[$veld] = $naam;
}

// Verplichte velden en e-mailadres.
foreach ($cfg['verplicht'] as $veld) {
    $ingevuld = $veld === 'cv' || $veld === 'foto' ? isset($bestanden[$veld]) : (($d[$veld] ?? '') !== '');
    if (!$ingevuld) he_fout('Niet alle verplichte velden zijn ingevuld.');
}
// Snelcontact: één veld "gsm of e-mail".
if (($d['contact'] ?? '') !== '') {
    if (str_contains($d['contact'], '@')) {
        if (!filter_var($d['contact'], FILTER_VALIDATE_EMAIL)) he_fout('Het e-mailadres lijkt niet te kloppen.');
        $d['email'] = $d['contact'];
    } elseif (strlen(preg_replace('/\D/', '', $d['contact']) ?? '') < 8) {
        he_fout('Het gsm-nummer lijkt niet te kloppen.');
    }
}
if (($d['email'] ?? '') !== '' && !filter_var($d['email'], FILTER_VALIDATE_EMAIL)) he_fout('Het e-mailadres lijkt niet te kloppen.');
$tekst_alles = implode(' ', $d);
if (preg_match_all('#https?://#i', $tekst_alles) > 2) he_fout('Uw bericht bevat te veel links.');

// Mail opbouwen.
$mail = he_bouw_mail($formulier, $d, $bestanden, HE_SITE);
$grens = 'he-' . bin2hex(random_bytes(12));
$alt = 'he-alt-' . bin2hex(random_bytes(8));
$naam_bezoeker = he_regel($d['naam'] ?? '', 80);
$headers = [
    'From: =?UTF-8?B?' . base64_encode('Website Heeman Electrics') . '?= <' . HE_AFZENDER . '>',
    'MIME-Version: 1.0',
    "Content-Type: multipart/mixed; boundary=\"{$grens}\"",
    'X-Mailer: heeman-electrics.be',
];
if (($d['email'] ?? '') !== '') {
    $headers[] = 'Reply-To: =?UTF-8?B?' . base64_encode($naam_bezoeker ?: $d['email']) . '?= <' . $d['email'] . '>';
}
// Structuur: mixed { related { alternative { tekst, html }, logo (cid) }, bijlagen }
$rel = 'he-rel-' . bin2hex(random_bytes(8));
$logo = (string) @file_get_contents(__DIR__ . '/formulier/logo-mail.png');
$body = "--{$grens}\r\nContent-Type: multipart/related; boundary=\"{$rel}\"\r\n\r\n"
    . "--{$rel}\r\nContent-Type: multipart/alternative; boundary=\"{$alt}\"\r\n\r\n"
    . "--{$alt}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($mail['tekst']))
    . "--{$alt}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($mail['html']))
    . "--{$alt}--\r\n";
if ($logo !== '') {
    $body .= "--{$rel}\r\nContent-Type: image/png; name=\"logo.png\"\r\nContent-Transfer-Encoding: base64\r\nContent-ID: <" . HE_LOGO_CID . ">\r\nContent-Disposition: inline; filename=\"logo.png\"\r\n\r\n" . chunk_split(base64_encode($logo));
}
$body .= "--{$rel}--\r\n";
foreach ($bijlagen as $b) {
    $bn = '=?UTF-8?B?' . base64_encode($b['naam']) . '?=';
    $body .= "--{$grens}\r\nContent-Type: {$b['type']}; name=\"{$bn}\"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"{$bn}\"\r\n\r\n" . chunk_split(base64_encode($b['inhoud']));
}
$body .= "--{$grens}--\r\n";

$onderwerp = '=?UTF-8?B?' . base64_encode($mail['onderwerp']) . '?=';
$ok = he_verstuur(HE_ONTVANGER, $onderwerp, $body, implode("\r\n", $headers));

if (!$ok) {
    // Niets verliezen: bewaar buiten de webroot en toon een nette melding.
    $map = dirname(__DIR__) . '/formulier-archief';
    if (!is_dir($map)) @mkdir($map, 0700, true);
    @file_put_contents($map . '/' . date('Ymd-His') . "-{$formulier}-" . bin2hex(random_bytes(3)) . '.json', json_encode(['formulier' => $formulier, 'velden' => $d, 'bestanden' => array_values($bestanden)], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    error_log("[formulier] mail() mislukt voor {$formulier}");
    he_fout('Er liep iets mis bij het versturen. Uw gegevens zijn bewaard, maar neem voor de zekerheid ook even contact op.', 500);
}

header('Location: ' . $cfg['bedankt'], true, 303);
exit;
