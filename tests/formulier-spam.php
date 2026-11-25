<?php
// Test van de spamscore met echte voorbeelden (php tests/formulier-spam.php; draait in GitHub Actions vóór publicatie).
declare(strict_types=1);
require __DIR__ . '/../vimexx/formulier/spam.php';

$gevallen = [
    // [omschrijving, velden, geladen, verwacht: 'spam' (>=3) | 'markeren' (1-2) | 'ok' (0)]
    ['JamesSweet (html-link, raar nummer)', ['naam' => 'JamesSweet', 'gsm' => '84716855434', 'email' => 'xrumer23Roarf@gmail.com', 'bericht' => 'No need to hunt INAV firmware mirrors. <a href=https://inavflight.net>inavflight.net</a> has the 9.1 download, the Configurator and the real documentation. That is enough for a first wing or quad.'], 1764000000000, 'spam'],
    ['Robertboign (Iers, raar nummer)', ['naam' => 'Robertboign', 'gsm' => '84878762375', 'email' => 'aveyekoha655@gmail.com', 'bericht' => 'Dia duit, theastaigh uaim do phraghas a fháil.'], 1764000000000, 'spam'],
    ['Robertboign zonder JavaScript', ['naam' => 'Robertboign', 'gsm' => '84878762375', 'bericht' => 'Dia duit, theastaigh uaim do phraghas a fháil.'], 0, 'spam'],
    ['Echte klant', ['naam' => 'Jan Peeters', 'gsm' => '0485 12 34 56', 'email' => 'jan@example.be', 'bericht' => 'Goedendag, ik zou graag een offerte krijgen voor een laadpaal aan mijn woning in Schilde.'], 1764000000000, 'ok'],
    ['Klant zonder 0 in gsm', ['naam' => 'An', 'gsm' => '485 12 34 56', 'bericht' => 'Hallo, kan u eens langskomen voor een stopcontact?'], 1764000000000, 'ok'],
    ['Nederlandse klant (+31)', ['naam' => 'Piet', 'gsm' => '+31 6 12345678', 'bericht' => 'Wij hebben een vraag over een verdeelkast.'], 1764000000000, 'ok'],
    ['Franstalige klant', ['naam' => 'Marie', 'gsm' => '0476 11 22 33', 'bericht' => 'Bonjour, je voudrais un devis pour la maison.'], 1764000000000, 'ok'],
    ['Engelstalige expat', ['naam' => 'John Smith', 'gsm' => '0470 11 22 33', 'bericht' => 'Hi, could you install a charging station at our house?'], 1764000000000, 'markeren'],
    ['Klant zonder JavaScript', ['naam' => 'Els', 'gsm' => '0470 11 22 33', 'bericht' => 'Graag een offerte voor nieuwe verlichting.'], 0, 'markeren'],
    ['Snelcontact', ['onderwerp' => 'Laadpaal', 'naam' => 'Tom', 'contact' => '0470112233'], 1764000000000, 'ok'],
    ['Sollicitatie', ['naam' => 'Lars', 'gsm' => '0499 12 34 56', 'email' => 'lars@example.be', 'motivatie' => 'Ik ben net afgestudeerd en wil graag bij jullie werken.'], 1764000000000, 'ok'],
];

$fouten = 0;
foreach ($gevallen as [$naam, $d, $geladen, $verwacht]) {
    [$score, $redenen] = he_spamscore($d, $geladen);
    $uitkomst = $score >= 3 ? 'spam' : ($score > 0 ? 'markeren' : 'ok');
    $ok = $uitkomst === $verwacht;
    if (!$ok) $fouten++;
    printf("%s %-36s score %d → %s%s\n", $ok ? '✓' : '✗', $naam, $score, $uitkomst, $redenen ? ' (' . implode('; ', $redenen) . ')' : '');
}
exit($fouten ? 1 : 0);
