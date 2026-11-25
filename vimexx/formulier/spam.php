<?php
// Spamscore voor de websiteformulieren (gebruikt door ../formulier.php, getest in tests/formulier-spam.php).
declare(strict_types=1);

/**
 * Spamscore op basis van de inhoud (toegevoegd 25-11-2026 na voorbeelden van Bert: "JamesSweet", "Robertboign").
 * Kenmerken van die bots: geen JavaScript (veld "geladen" leeg), html-links in het bericht, een gsm-nummer dat
 * geen Belgisch of internationaal nummer is (bv. 84716855434) en tekst zonder één Nederlands of Frans woord.
 * Geeft [score, redenen]. 3 of meer = spam (niet mailen, wel bewaren); 1–2 = mailen met "[Mogelijk spam]".
 */
function he_spamscore(array $d, int $geladen): array
{
    $score = 0;
    $redenen = [];
    if ($geladen <= 0) { $score += 2; $redenen[] = 'formulier zonder JavaScript verstuurd'; }

    $tekst = trim(implode(' ', array_intersect_key($d, array_flip(['bericht', 'omschrijving', 'motivatie', 'onderwerp']))));
    if (preg_match('#<\s*a\s|</\s*a\s*>|\[url[=\]]|\[link[=\]]#i', $tekst)) { $score += 3; $redenen[] = 'html- of bbcode-link in het bericht'; }
    elseif (preg_match('#https?://|www\.#i', $tekst)) { $score += 1; $redenen[] = 'link in het bericht'; }
    if (preg_match('/[\p{Cyrillic}\p{Han}\p{Hangul}\p{Thai}\p{Arabic}]/u', $tekst)) { $score += 2; $redenen[] = 'tekst in een vreemd schrift'; }

    // Taal: minstens één veelgebruikt Nederlands of Frans woord in een bericht van 4+ woorden.
    $woorden = preg_split('/[^\p{L}\']+/u', mb_strtolower($tekst), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    if (count($woorden) >= 4) {
        $nl_fr = ['de','het','een','en','ik','wij','we','je','u','uw','is','van','voor','met','op','te','in','niet','dat','die','graag','offerte','vraag','mijn','ons','onze','zijn','hebben','heb','kan','kunnen','bij','aan','om','er','ook','nog','dag','hallo','goedendag','dank','bedankt','elektricien','laadpaal','stopcontact','huis','woning',
                  'le','la','les','un','une','et','je','vous','nous','pour','avec','est','pas','bonjour','merci','devis','électricien','maison'];
        if (!array_intersect($woorden, $nl_fr)) { $score += 1; $redenen[] = 'geen Nederlands of Frans in het bericht'; }
    }

    // Gsm: Belgisch (0…, 32…, 4xx zonder 0) of internationaal met + / 00. Anders verdacht.
    $gsm = (string) ($d['gsm'] ?? (str_contains((string) ($d['contact'] ?? ''), '@') ? '' : ($d['contact'] ?? '')));
    if (trim($gsm) !== '') {
        $cijfers = preg_replace('/\D/', '', $gsm) ?? '';
        $plausibel = str_starts_with(ltrim($gsm), '+')
            || preg_match('/^(0\d{8,9}|32\d{8,9}|00\d{8,13}|4\d{8})$/', $cijfers);
        if (!$plausibel) { $score += 2; $redenen[] = 'gsm-nummer is geen Belgisch of internationaal nummer'; }
    }
    return [$score, $redenen];
}
