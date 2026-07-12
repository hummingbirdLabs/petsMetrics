/**
 * Final i18n fix v2 - translates remaining English values for de, nl
 * Includes full compare section translations
 */
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

function readJson(filePath) {
  let raw = fs.readFileSync(filePath, 'utf-8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  return JSON.parse(raw);
}

function getNestedValue(obj, dottedKey) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function setNestedValue(obj, dottedKey, value) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current) || typeof current[parts[i]] !== 'object' || Array.isArray(current[parts[i]])) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

const en = readJson(path.join(messagesDir, 'en.json'));

// Full compare section translations for German
const deCompare = {
  harnessVsCollar: {
    title: "Hundegeschirr vs Halsband: Was ist richtig?",
    subtitle: "Wissenschaftlich fundierter Vergleich von Geschirren und flachen Halsbändern: Halssicherheit, Zugkontrolle, Fluchtrisiko und rassespezifische Empfehlungen. AAHA- und veterinärmedizinische Verhaltensrichtlinien zitiert.",
    topicAName: "Rückenclip-Geschirr",
    topicBName: "Flaches Halsband",
    topicA: {
      pros: [
        { title: "Halssicherheit", body: "Verteilt den Druck auf Brust und Schultern und eliminiert die Kompression von Schilddrüse und Luftröhre durch Ziehen an der Leine. Entscheidend für brachyzephale Rassen." },
        { title: "Leinenkontrolle", body: "Rückenclip-Geschirre lenken Hunde beim Ziehen seitlich um und reduzieren den Zugtrieb. Frontclip-Modelle bieten stärkere Lenkkontrolle." },
        { title: "Fluchtverhinderung", body: "Ein richtig sitzendes Geschirr ist für Hunde schwerer abzustreifen als ein lockeres Halsband und reduziert das Risiko verlorener Haustiere." },
        { title: "Brachyzephalen-sicher", body: "Bulldoggen, Möpse, Französische Bulldoggen und andere brachyzephale Rassen haben bereits beeinträchtigte Atemwege — das Gehen am Halsband ist riskant." }
      ],
      cons: [
        "Kann Ziehen fördern, wenn es nicht mit Training kombiniert wird",
        "Komplexer anzulegen — viele Besitzer verwenden falsch dimensionierte oder eingestellte Geschirre",
        "Kann bei schlechter Passform unter den Achseln scheuern",
        "Einige Hunde benötigen eine Eingewöhnungszeit für das erste Tragen eines Geschirrs",
        "Nicht geeignet für das dauerhafte Tragen von ID-Marken"
      ],
      bestFor: "Brachyzephale Rassen, Welpen, Hunde mit Luftröhren- oder Schilddrüsenproblemen, stark ziehende Hunde und Hunde, die sich von Nackenverletzungen erholen."
    },
    topicB: {
      pros: [
        { title: "Einfach & schnell", body: "Leicht an- und auszuziehen — keine Eingewöhnungszeit nötig. Ideal für kurze Gassirunden." },
        { title: "ID-Marken-Träger", body: "Halsbänder sind der natürliche Ort für ID-Marken, Tollwutmarken und Kontaktinformationen." },
        { title: "Geringere Kosten", body: "Qualitäts-Flachhalsbänder kosten 10–30 €, während gute Geschirre 25–55 € kosten." },
        { title: "Kein Scheuerrisiko", body: "Ein richtig sitzendes Flachhalsband reibt nicht an der Haut oder schränkt die Schulterbewegung ein." }
      ],
      cons: [
        "Leinendruck konzentriert sich auf Schilddrüse und Halswirbelsäule",
        "Brachyzephale Rassen können selbst bei leichtem Ziehen gefährliche Atemwegseinschränkungen erleiden",
        "Einige Hunde können aus lockeren Halsbändern schlüpfen (Windhunde, Whippets und schmalköpfige Rassen)",
        "Kein mechanischer Vorteil für starke Zieher",
        "Würge- und Stachelhalsbänder werden von AVSAB abgelehnt"
      ],
      bestFor: "Ruhige Spaziergänger, gut trainierte Hunde, die nicht ziehen, und für das dauerhafte Tragen von ID-Marken."
    },
    rows: [
      { dimension: "Halssicherheit", topicA: "Ausgezeichnet (kein Halsdruck)", topicB: "Risiko der Luftröhrenkompression beim Ziehen" },
      { dimension: "Zugkontrolle", topicA: "Gut (besonders Frontclip)", topicB: "Keine" },
      { dimension: "Fluchtrisiko", topicA: "Gering (richtig angepasst)", topicB: "Mittel (kann herausschlüpfen)" },
      { dimension: "Komfort", topicA: "Gut (Y-Front-Design)", topicB: "Gut (richtig angepasst)" },
      { dimension: "Brachyzephalen-Sicherheit", topicA: "Empfohlen", topicB: "Mit Vorsicht verwenden" },
      { dimension: "Anschaffungskosten", topicA: "25–55 €", topicB: "10–30 €" },
      { dimension: "ID-Marken-Tragen", topicA: "Nicht geeignet", topicB: "Ideal" },
      { dimension: "Tierärztliche Empfehlung", topicA: "Für Spaziergänge empfohlen", topicB: "Nur für ID-Zwecke" }
    ],
    verdict: "<strong>Für die meisten Hunde — insbesondere brachyzephale Rassen, Welpen und stark ziehende Hunde — ist ein gut sitzendes Y-Front-Geschirr die sicherere Wahl für Spaziergänge.</strong> Flache Halsbänder bleiben nützlich für ID-Marken und kurze Gassirunden, sollten aber nicht bei Hunden verwendet werden, die ständig ziehen. AVSAB und AAHA raten beide von Würgehalsbändern ab und empfehlen Geschirre für Hunde mit Atemwegs- oder Nackenproblemen. Die meisten Tierärzte empfehlen beides: ein Geschirr für Spaziergänge und ein separates Flachhalsband mit ID-Marken.",
    faq: [
      { question: "Ist ein Geschirr besser als ein Halsband für einen ziehenden Hund?", answer: "Ja. Ein Frontclip-Geschirr lenkt den Hund beim Ziehen seitlich um und eliminiert den Oppositionsreflex, den Halsbänder erzeugen. Rückenclip-Geschirre können Ziehen ohne Training weiterhin ermöglichen. Bester Ansatz: Frontclip-Geschirr plus Leinenführigkeitstraining." },
      { question: "Welches Geschirr ist am besten für eine Französische Bulldogge?", answer: "Ein Y-Front-Geschirr, das die Schulterbewegung nicht einschränkt oder den Hals komprimiert. Brachyzephale Rassen benötigen volle Schulterfreiheit, um offene Atemwege zu erhalten." },
      { question: "Kann ein Hund sowohl Geschirr als auch Halsband tragen?", answer: "Ja — dies ist der empfohlene Ansatz. Behalten Sie ein flaches Halsband mit ID-Marken immer am Hund (für den Fall eines Entkommens) und verwenden Sie ein Geschirr für Spaziergänge (für Kontrolle und Sicherheit)." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Tierkrankenversicherung vs Notfallfonds: Was ist besser?",
    subtitle: "Umfassender finanzieller Vergleich von Tierkrankenversicherung und selbstfinanzierten Notfallreserven: monatliche Kosten, Deckungslücken, Schadensprozesse, rassespezifische Erkrankungen und Break-Even-Analyse. NAPHIA-Daten zitiert.",
    topicAName: "Tierkrankenversicherung",
    topicBName: "Selbstfinanzierte Notfallreserve",
    topicA: {
      pros: [
        { title: "Katastrophenschutz", body: "Krebsbehandlung kostet 5.000–15.000 €+ — Versicherung verhindert finanzielle Euthanasie-Entscheidungen." },
        { title: "Planbare monatliche Kosten", body: "Feste monatliche Prämien (30–150 €) verteilen die Kosten und vermeiden das Risiko einer einzelnen Rechnung von 5.000 €+." },
        { title: "Mehr-Haustier-Rabatte", body: "Die meisten Versicherer bieten 5–10 % Rabatt für mehrere Haustiere." },
        { title: "Vorsorge-Zusatzoptionen", body: "Vorsorge-Zusätze decken Routinepflege (Impfungen, Zahnreinigungen) für zusätzliche 10–30 €/Monat." }
      ],
      cons: [
        "Deckt keine Vorerkrankungen ab — Wartezeiten schließen Ausschlüsse ein",
        "Erstattungsmodell: Sie zahlen zuerst den Tierarzt, dann reichen Sie einen Antrag ein (30–60 Tage Bearbeitung)",
        "Jahres- und Lebenszeitlimits: die meisten Policen decken maximal 5.000–15.000 €/Jahr",
        "Rassespezifische Ausschlüsse können im ersten Jahr gelten",
        "Prämien steigen mit dem Alter: ein 8-jähriger Hund kostet 2–4× mehr als ein 2-jähriger"
      ],
      bestFor: "Junge gesunde Haustiere, Besitzer, die Kostenplanbarkeit wünschen, Rassen mit Prädisposition für teure Erkrankungen und Haushalte, die keine plötzliche große Rechnung verkraften können."
    },
    topicB: {
      pros: [
        { title: "Keine Prämien", body: "Keine monatlichen Zahlungen — jeder Euro geht direkt in die Versorgung Ihres eigenen Haustieres." },
        { title: "Volle Kontrolle", body: "Keine Deckungslimits, keine Wartezeiten, keine abgelehnten Ansprüche." },
        { title: "Erwirtschaftet Zinsen", body: "Tagesgeldkonten (3–4 % p.a.) lassen die Reserve wachsen." },
        { title: "Keine Erstattungsverzögerung", body: "Bezahlen Sie die Behandlung direkt — kein Warten auf die Schadensbearbeitung." }
      ],
      cons: [
        "Muss vor einem Notfall ausreichend sein — ein 5.000 €-Notfall im ersten Jahr macht die Strategie zunichte",
        "Erfordert Disziplin: 100–200 €/Monat konsequent über 5+ Jahre gespart",
        "Kann katastrophale Kosten erst decken, wenn die Reserve eine ausreichende Größe erreicht hat",
        "Mehr-Haustier-Haushalte benötigen separate 5.000–10.000 €-Reserven pro Haustier",
        "Inflation kann den realen Wert der Reserve langfristig schmälern"
      ],
      bestFor: "Besitzer mit starker finanzieller Disziplin, ältere Haustiere mit Vorerkrankungen und als Ergänzung zu einer Versicherung mit hohem Selbstbehalt."
    },
    rows: [
      { dimension: "Monatliche Kosten", topicA: "30–150 €/Monat", topicB: "0 € (sparen Sie 100–200 €/Monat zum Aufbau der Reserve)" },
      { dimension: "Vorerkrankungen", topicA: "Nicht gedeckt", topicB: "Vollständig gedeckt (keine Einschränkungen)" },
      { dimension: "Notfallabdeckung", topicA: "Nach Selbstbehalt gedeckt", topicB: "Erst nach ausreichender Reserve (5+ Jahre)" },
      { dimension: "Schadensbearbeitungszeit", topicA: "30–60 Tage", topicB: "Keine (direkte Zahlung)" },
      { dimension: "Katastrophale Erkrankung", topicA: "Gedeckt (vorbehaltlich Obergrenzen)", topicB: "Muss genug gespart haben" },
      { dimension: "Startzeitpunkt", topicA: "Welpen-/Kittenphase (keine Ausschlüsse)", topicB: "Sofort (aber Aufbau dauert Jahre)" }
    ],
    verdict: "<strong>Tierkrankenversicherung existiert, um finanzielle Euthanasie in katastrophalen Szenarien zu verhindern — eine selbstfinanzierte Notfallreserve kann eine 15.000 €-Krebsbehandlung im ersten Jahr nicht decken.</strong> Die optimale Strategie kombiniert beides: Schließen Sie eine Unfall- und Krankenversicherung ab, solange das Haustier jung ist, und bauen Sie gleichzeitig eine Reserve in Höhe des Selbstbehalts plus Notfallpuffer auf. Aus Sicht des Risikomanagements gewinnt die Versicherung. NAPHIA-Daten zeigen, dass 1 von 3 Haustieren tierärztliche Notfallversorgung benötigt — ein enormer Nutzen der Versicherung.",
    faq: [
      { question: "Lohnt sich eine Tierkrankenversicherung finanziell?", answer: "Im Durchschnitt zahlen Besitzer gesunder Haustiere mathematisch mehr an Prämien als sie an Leistungen erhalten. Aber Versicherung existiert für das Katastrophenrisiko: Wenn Ihr Haustier Krebs bekommt, sind 15.000–25.000 € an Behandlungen nach Selbstbehalt gedeckt. Reine Kosten-Nutzen-Rechnung: Wenn Sie sich keine 5.000 €-Überraschungstierarztrechnung leisten können, lohnt es sich." },
      { question: "Wie viel sollte ich in einem Haustier-Notfallfonds sparen?", answer: "Tierärztliche Finanzberater empfehlen 3.000–5.000 € pro Haustier — genug für eine Standard-Notoperation. Bewahren Sie es auf einem separaten Tagesgeldkonto auf. Investieren Sie niemals in Aktien — Liquidität ist entscheidend." },
      { question: "Ist es besser, eine Versicherung abzuschließen oder Geld zu sparen?", answer: "Die optimale Strategie ist beides. Schließen Sie eine Versicherung ab, wenn das Haustier ein Welpe/Kitten ist (um Ausschlüsse für Vorerkrankungen zu vermeiden), und bauen Sie gleichzeitig eine Reserve von 3.000 €+ für Selbstbehalte und nicht gedeckte Posten auf." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Getreidefrei vs Vollkorn-Hundefutter: Was ist gesünder?",
    subtitle: "Evidenzbasierter Vergleich von getreidefreiem und Vollkorn-Trockenfutter: DCM-Bedenken, Inhaltsstoffqualität, glykämische Reaktion, Allergien und veterinärmedizinischer Konsens. AAFCO-, FDA- und WSAVA-Ernährungsrichtlinien zitiert.",
    topicAName: "Getreidefreie Ernährung",
    topicBName: "Vollkorn-Ernährung",
    topicA: {
      pros: [
        { title: "Niedrigere glykämische Last", body: "Verwendet Hülsenfrüchte und Kartoffeln statt Getreide — die Glukosefreisetzung ist langsamer als bei Mais und Weizen." },
        { title: "Hypoallergene Behauptungen", body: "Kann Hunden mit echten Getreideallergien helfen (obwohl diese selten sind — weniger als 1 % der Hunde)." },
        { title: "Höherer Proteingehalt", body: "Getreidefreie Formeln haben typischerweise 2–5 % mehr Protein auf Trockenmassebasis." }
      ],
      cons: [
        "FDA-Untersuchung (2018–2023): starke Korrelation zwischen getreidefreien Diäten und ernährungsbedingter dilatativer Kardiomyopathie (DCM)",
        "Hülsenfrüchte (Erbsen, Linsen, Kichererbsen) und Kartoffeln als Ersatzzutaten können die Taurinaufnahme beeinträchtigen",
        "Die meisten Hunde haben keine Getreideallergien — kein Nutzen für 99 % der Hunde",
        "Teurer als Vollkorn-Diäten ohne nachgewiesenen Nutzen für die meisten Hunde",
        "AAFCO hat keine sicheren Mindestwerte für Hülsenfrüchte in Hundenahrung festgelegt"
      ],
      bestFor: "Hunde mit diagnostizierten Getreideallergien (selten — nur durch Eliminationsdiätversuch unter tierärztlicher Aufsicht bestätigt)."
    },
    topicB: {
      pros: [
        { title: "Umfassend erforscht", body: "Vollkorn hat 50+ Jahre dokumentierte Sicherheit in der Hundeernährung. Kein DCM-Risiko." },
        { title: "Vollständige Ernährung", body: "Vollkorn liefert natürlicherweise B-Vitamine, Ballaststoffe, Eisen, Magnesium und essentielle Fettsäuren." },
        { title: "Geringere Kosten", body: "Vollkorn-Diäten vergleichbarer Qualität kosten 1,00–2,00 €/500g vs 1,50–3,00 €/500g für getreidefrei." },
        { title: "AAFCO-konform", body: "Vollkorn-Diäten von großen Marken erfüllen die AAFCO-Ernährungsstandards." },
        { title: "Verdauungsfördernde Ballaststoffe", body: "Hafer- und Gerstenballaststoffe fördern die Diversität des Darmmikrobioms." }
      ],
      cons: [
        "Etwas höhere glykämische Last (für gesunde Hunde nicht klinisch signifikant)",
        "Geringerer Proteingehalt auf Trockenmassebasis"
      ],
      bestFor: "Die überwiegende Mehrheit der Hunde — Vollkorn-Diäten sind die empfohlene Standardwahl von WSAVA und den meisten veterinärmedizinischen Ernährungswissenschaftlern."
    },
    rows: [
      { dimension: "DCM-Risiko (FDA)", topicA: "Wird untersucht (Hülsenfrucht-Zusammenhang)", topicB: "Kein Zusammenhang" },
      { dimension: "Proteingehalt", topicA: "Typischerweise 26–34 %", topicB: "Typischerweise 22–28 %" },
      { dimension: "Kosten pro 500g", topicA: "1,50–3,00 €", topicB: "1,00–2,00 €" },
      { dimension: "Glykämische Last", topicA: "Niedriger (Hülsenfrüchte/Kartoffeln)", topicB: "Mittel (komplexe Kohlenhydrate)" },
      { dimension: "Forschungsgeschichte", topicA: "Begrenzt (Trend nach 2010)", topicB: "50+ Jahre" },
      { dimension: "Allergienutzen", topicA: "Selten (echte Getreideallergie <1 %)", topicB: "Standard (Getreide selten allergen)" },
      { dimension: "Veterinärkonsens", topicA: "Vorsicht empfohlen (FDA + WSAVA)", topicB: "Empfohlener Standard" }
    ],
    verdict: "<strong>Für die meisten Hunde ist eine AAFCO-konforme Vollkorn-Diät von einem Hersteller, der veterinärmedizinische Ernährungswissenschaftler beschäftigt, die sicherste und am besten erforschte Wahl.</strong> Getreidefreie Diäten sollten nur bei bestätigter Getreideallergie verwendet werden (diagnostiziert durch Eliminationsdiät). Die laufende FDA-DCM-Untersuchung hat getreidefreie Diäten mit einer schweren Herzerkrankung in Verbindung gebracht, und das Vorsorgeprinzip spricht für Vollkorn.",
    faq: [
      { question: "Ist getreidefreies Hundefutter schlecht für Hunde?", answer: "Die FDA hat einen möglichen Zusammenhang zwischen getreidefreien Diäten und dilatativer Kardiomyopathie (DCM) identifiziert. Während die Forschung noch läuft, empfehlen veterinärmedizinische Kardiologen Vorsicht. Sofern Ihr Hund keine bestätigte Getreideallergie hat (vom Tierarzt diagnostiziert), sind Vollkorn-Diäten sicherer." },
      { question: "Welche Getreidesorten sind am besten für Hunde?", answer: "Vollkornhafer, Naturreis, Gerste und Quinoa sind ausgezeichnet. Sie liefern Ballaststoffe, B-Vitamine und Mineralien. Vermeiden Sie Mais und Weizen bei empfindlichen Hunden, aber diese sind für die meisten Hunde sicher." },
      { question: "Sollte ich von getreidefrei auf Vollkorn umstellen?", answer: "Konsultieren Sie Ihren Tierarzt. Wenn Ihr Hund langfristig getreidefrei ernährt wurde, kann Ihr Tierarzt ein Echokardiogramm zur Überprüfung der Herzfunktion vor der Umstellung empfehlen. Stellen Sie schrittweise über 7–10 Tage um." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Kratzbaum vs Katzenbaum: Was braucht Ihre Katze?",
    subtitle: "Detaillierter Vergleich von Kratzbäumen und Katzenbäumen: Platzbedarf, Kratzverhalten, vertikales Revier, Mehrkatzenhaushalte und Kosten. AAFP- und ISFM-Richtlinien zitiert.",
    topicAName: "Kratzbaum (einzeln)",
    topicBName: "Katzenbaum (mehrstöckig)",
    topicA: {
      pros: [
        { title: "Platzsparend", body: "Ein einzelner Kratzbaum benötigt nur 0,1–0,2 m² Bodenfläche — ideal für Wohnungen und kleine Räume." },
        { title: "Geringere Kosten", body: "Qualitäts-Kratzbäume kosten 15–40 €, während Katzenbäume 50–200 €+ kosten." },
        { title: "Gezieltes Kratzen", body: "Eine dedizierte Kratzfläche lenkt das Krallenpflegeverhalten auf einen Ort." },
        { title: "Leicht zu bewegen", body: "Leicht und tragbar — bei Bedarf umpositionieren, um Möbel zu schützen." }
      ],
      cons: [
        "Kein vertikales Revier — Katzen brauchen Höhe, um sich sicher zu fühlen",
        "Begrenzte Beschäftigung — keine Kletter-, Sitz- oder Versteckmöglichkeiten",
        "Kann umkippen, wenn nicht stabil genug für kräftiges Kratzen",
        "Keine Mehrkatzen-Funktionalität — einzelne Kratzfläche"
      ],
      bestFor: "Einzelkatzen-Haushalte mit begrenztem Platz, preisbewusste Besitzer oder als Ergänzung zu einem bestehenden Katzenbaum mit zusätzlichen Kratzflächen."
    },
    topicB: {
      pros: [
        { title: "Vertikales Revier", body: "Mehrstöckige Plattformen befriedigen den Instinkt der Katze zu klettern, zu sitzen und ihr Revier aus der Höhe zu überblicken." },
        { title: "Mehrkatzen-geeignet", body: "Mehrere Ebenen und Sitzplätze reduzieren Konflikte, indem sie jeder Katze separate Ruheplätze bieten." },
        { title: "Beschäftigungszentrum", body: "Kombiniert Kratzen, Klettern, Sitzen, Verstecken und Spielen in einer Struktur." },
        { title: "Möbelschutz", body: "Ein gut platzierter Katzenbaum mit Sisalpfosten lenkt das Kratzen von Sofas und Teppichen um." }
      ],
      cons: [
        "Große Stellfläche — benötigt 0,4–0,8 m² Bodenfläche",
        "Höhere Kosten — Qualitäts-Katzenbäume beginnen bei 50 € und gehen bis 200 €+",
        "Ästhetische Bedenken — einige Designs passen nicht zur Wohnungseinrichtung",
        "Stabilitätsprobleme — billige Modelle können wackeln oder umkippen und die Nutzung verhindern"
      ],
      bestFor: "Mehrkatzen-Haushalte, Einzelkatzen-Haushalte mit ausreichend Platz und Katzen, die vertikale Präferenz zeigen (an Vorhängen klettern, auf Schränken sitzen)."
    },
    rows: [
      { dimension: "Bodenfläche", topicA: "0,1–0,2 m²", topicB: "0,4–0,8 m²" },
      { dimension: "Kosten", topicA: "15–40 €", topicB: "50–200 €+" },
      { dimension: "Vertikales Revier", topicA: "Keines", topicB: "1–2 m Höhe" },
      { dimension: "Mehrkatzen-Nutzung", topicA: "Einzelkatze", topicB: "2–4 Katzen" },
      { dimension: "Kratzfläche", topicA: "Eine Fläche", topicB: "2–4 Flächen" },
      { dimension: "Beschäftigungsvielfalt", topicA: "Minimal", topicB: "Hoch (klettern, sitzen, verstecken, spielen)" },
      { dimension: "Tragbarkeit", topicA: "Einfach", topicB: "Schwierig" }
    ],
    verdict: "<strong>Beginnen Sie mit einem stabilen Kratzbaum für jede Katze und fügen Sie dann einen Katzenbaum hinzu, wenn Sie Platz und Budget haben.</strong> Katzen brauchen sowohl horizontale als auch vertikale Kratzoptionen. Ein Kratzbaum ist die Mindestausstattung — ein Katzenbaum bietet zusätzliche Beschäftigung, Revier und Stressreduktion, die das Wohlbefinden der Katze erheblich verbessern. AAFP-Richtlinien empfehlen mindestens einen erhöhten Ruheplatz pro Katze.",
    faq: [
      { question: "Braucht meine Katze einen Katzenbaum, wenn ich einen Kratzbaum habe?", answer: "Ein Kratzbaum erfüllt das Kratzbedürfnis, aber Katzen brauchen auch vertikales Revier für Sicherheit. Wenn Ihre Katze auf Möbel klettert oder auf hohen Regalen sitzt, bietet ein Katzenbaum Beschäftigung. In Mehrkatzen-Haushalten reduziert ein Katzenbaum Konflikte." },
      { question: "Welche Höhe sollte ein Kratzbaum für meine Katze haben?", answer: "Mindestens 76 cm hoch — Katzen müssen ihren Körper beim Kratzen vollständig strecken können. Für große Rassen wie Maine Coons werden 91+ cm empfohlen." },
      { question: "Wo sollte ich einen Katzenbaum platzieren?", answer: "In der Nähe eines Fensters (zum Vogelbeobachten), in einem sozial bedeutsamen Raum (Wohnzimmer) und nicht in isolierten Ecken. Katzen wollen dort sein, wo die Familie ist, während sie einen sicheren erhöhten Sitzplatz haben." }
    ]
  }
};

// Full compare section translations for Dutch
const nlCompare = {
  harnessVsCollar: {
    title: "Hondentuig vs Halsband: Wat is juist?",
    subtitle: "Wetenschappelijk onderbouwde vergelijking van tuigen en platte halsbanden: nekveiligheid, trekcontrole, ontsnappingsrisico en rasspecifieke aanbevelingen. AAHA- en diergeneeskundige gedragsrichtlijnen geciteerd.",
    topicAName: "Rugclip-tuig",
    topicBName: "Plat halsband",
    topicA: {
      pros: [
        { title: "Nekveiligheid", body: "Verdeelt de druk over borst en schouders, waardoor compressie van schildklier en luchtpijp door trekken aan de lijn wordt geëlimineerd. Cruciaal voor brachycefale rassen." },
        { title: "Lijncontrole", body: "Rugclip-tuigen leiden honden zijwaarts wanneer ze trekken, waardoor de trekdrang wordt verminderd. Frontclip-modellen bieden sterkere stuurcontrole." },
        { title: "Ontsnappingspreventie", body: "Een goed passend tuig is moeilijker voor honden om uit te glippen dan een losse halsband, waardoor het risico op verloren huisdieren wordt verminderd." },
        { title: "Brachycefalen-veilig", body: "Bulldogs, Mopshonden, Franse Bulldogs en andere brachycefale rassen hebben al aangetaste luchtwegen — lopen aan een halsband is riskant." }
      ],
      cons: [
        "Kan trekken aanmoedigen als het niet met training wordt gecombineerd",
        "Complexer om aan te doen — veel eigenaren gebruiken verkeerd gedimensioneerde of afgestelde tuigen",
        "Kan schuren onder de oksels bij slechte pasvorm",
        "Sommige honden hebben een gewenningsperiode nodig voor het eerst dragen van een tuig",
        "Niet geschikt voor permanent dragen van ID-tags"
      ],
      bestFor: "Brachycefale rassen, puppy's, honden met luchtpijp- of schildklierproblemen, sterke trekkers en honden die herstellen van nekletsel."
    },
    topicB: {
      pros: [
        { title: "Eenvoudig & snel", body: "Gemakkelijk aan en uit te doen — geen gewenningsperiode nodig. Ideaal voor snelle plaswandelingen." },
        { title: "ID-tag drager", body: "Halsbanden zijn de natuurlijke plaats voor ID-tags, rabiës-tags en contactinformatie." },
        { title: "Lagere kosten", body: "Kwaliteit platte halsbanden kosten €10–30, terwijl goede tuigen €25–55 kosten." },
        { title: "Geen schuurrisico", body: "Een goed passende platte halsband schuurt niet op de huid of beperkt de schouderbeweging." }
      ],
      cons: [
        "Lijndruk concentreert zich op schildklier en cervicale wervelkolom",
        "Brachycefale rassen kunnen gevaarlijke ademhalingsbeperking ervaren, zelfs bij licht trekken",
        "Sommige honden kunnen uit losse halsbanden glippen (Greyhounds, Whippets en smalkoppige rassen)",
        "Geen mechanisch voordeel voor sterke trekkers",
        "Wurgkettingen en prikbanden worden afgeraden door AVSAB"
      ],
      bestFor: "Rustige wandelaars, goed getrainde honden die niet trekken, en voor permanent dragen van ID-tags."
    },
    rows: [
      { dimension: "Nekveiligheid", topicA: "Uitstekend (geen nek druk)", topicB: "Risico op luchtpijpcompressie bij trekken" },
      { dimension: "Trekcontrole", topicA: "Goed (vooral frontclip)", topicB: "Geen" },
      { dimension: "Ontsnappingsrisico", topicA: "Laag (goed passend)", topicB: "Matig (kan eruit glippen)" },
      { dimension: "Comfort", topicA: "Goed (Y-front ontwerp)", topicB: "Goed (goed passend)" },
      { dimension: "Brachycefalen veiligheid", topicA: "Aanbevolen", topicB: "Met voorzichtigheid gebruiken" },
      { dimension: "Aanschafkosten", topicA: "€25–55", topicB: "€10–30" },
      { dimension: "ID-tag dragen", topicA: "Niet geschikt", topicB: "Ideaal" },
      { dimension: "Dierenarts aanbeveling", topicA: "Aanbevolen voor wandelingen", topicB: "Alleen voor ID-doeleinden" }
    ],
    verdict: "<strong>Voor de meeste honden — vooral brachycefale rassen, puppy's en trekkers — is een goed passend Y-front tuig de veiligere keuze voor wandelingen.</strong> Platte halsbanden blijven nuttig voor ID-tags en snelle plaswandelingen, maar moeten niet worden gebruikt bij honden die constant trekken. AVSAB en AAHA raden beide wurgachtige halsbanden af en bevelen tuigen aan voor honden met luchtweg- of nekproblemen. De meeste dierenartsen bevelen beide aan: een tuig voor wandelingen en een aparte platte halsband met ID-tags.",
    faq: [
      { question: "Is een tuig beter dan een halsband voor een trekkende hond?", answer: "Ja. Een frontclip-tuig leidt de hond zijwaarts bij het trekken, waardoor de oppositie-reflex die halsbanden creëren wordt geëlimineerd. Rugclip-tuigen kunnen trekken nog steeds toestaan zonder training. Beste aanpak: frontclip-tuig plus losse-lijn training." },
      { question: "Welk tuig is het beste voor een Franse Bulldog?", answer: "Een Y-front tuig dat de schouderbeweging niet beperkt of de nek samendrukt. Brachycefale rassen hebben volledige schoudervrijheid nodig om open luchtwegen te behouden." },
      { question: "Kan een hond zowel een tuig als een halsband dragen?", answer: "Ja — dit is de aanbevolen aanpak. Houd een platte halsband met ID-tags te allen tijde om (in geval van ontsnapping) en gebruik een tuig voor wandelingen (voor controle en veiligheid)." }
    ]
  },
  petInsuranceVsEmergencyFund: {
    title: "Huisdierenverzekering vs Noodfonds: Wat is beter?",
    subtitle: "Uitgebreide financiële vergelijking van huisdierenverzekering en zelfgefinancierde noodreserves: maandelijkse kosten, dekkingshiaten, claimprocessen, rasspecifieke aandoeningen en break-even analyse. NAPHIA-gegevens geciteerd.",
    topicAName: "Huisdierenverzekering",
    topicBName: "Zelfgefinancierde noodreserve",
    topicA: {
      pros: [
        { title: "Catastrofale dekking", body: "Kankerbehandeling kost €5.000–15.000+ — verzekering voorkomt financiële euthanasiebeslissingen." },
        { title: "Voorspelbare maandelijkse kosten", body: "Vaste maandelijkse premies (€30–150) spreiden de kosten en vermijden het risico van een enkele rekening van €5.000+." },
        { title: "Multi-huisdier kortingen", body: "De meeste verzekeraars bieden 5–10% korting voor meerdere huisdieren." },
        { title: "Welzijns-add-on opties", body: "Welzijns-uitbreidingen dekken routinezorg (vaccinaties, gebitsreinigingen) voor extra €10–30/maand." }
      ],
      cons: [
        "Dekt geen bestaande aandoeningen — wachttijden sluiten uitsluitingen in",
        "Vergoedingsmodel: u betaalt eerst de dierenarts, dient dan een claim in (30–60 dagen verwerking)",
        "Jaarlijkse en levenslange limieten: de meeste polissen dekken maximaal €5.000–15.000/jaar",
        "Rasspecifieke uitsluitingen kunnen in het eerste jaar van toepassing zijn",
        "Premies stijgen met leeftijd: een 8-jarige hond kost 2–4× meer dan een 2-jarige"
      ],
      bestFor: "Jonge gezonde huisdieren, eigenaren die kostenvoorspelbaarheid willen, rassen met aanleg voor dure aandoeningen en huishoudens die geen plotselinge grote rekening kunnen absorberen."
    },
    topicB: {
      pros: [
        { title: "Geen premies", body: "Geen maandelijkse betalingen — elke euro gaat naar de zorg van uw eigen huisdier." },
        { title: "Volledige controle", body: "Geen dekkingslimieten, geen wachttijden, geen afgewezen claims." },
        { title: "Verdient rente", body: "Hoogrentende spaarrekeningen (3–4% per jaar) laten de reserve groeien." },
        { title: "Geen vergoedingsvertraging", body: "Betaal direct voor behandeling — geen wachten op claimverwerking." }
      ],
      cons: [
        "Moet voldoende zijn vóór een noodgeval — een €5.000 noodgeval in jaar één verslaat de strategie",
        "Vereist discipline: €100–200/maand consequent gespaard gedurende 5+ jaar",
        "Kan catastrofale kosten pas dekken wanneer de reserve voldoende grootte heeft bereikt",
        "Multi-huisdier huishoudens hebben aparte €5.000–10.000 reserves per huisdier nodig",
        "Inflatie kan de reële waarde van de reserve op lange termijn uithollen"
      ],
      bestFor: "Eigenaren met sterke financiële discipline, oudere huisdieren met bestaande aandoeningen en als aanvulling op een verzekering met hoog eigen risico."
    },
    rows: [
      { dimension: "Maandelijkse kosten", topicA: "€30–150/maand", topicB: "€0 (spaar €100–200/maand om reserve op te bouwen)" },
      { dimension: "Bestaande aandoeningen", topicA: "Niet gedekt", topicB: "Volledig gedekt (geen beperkingen)" },
      { dimension: "Nooddekking", topicA: "Gedekt na eigen risico", topicB: "Pas na voldoende reserve (5+ jaar)" },
      { dimension: "Claimtijd", topicA: "30–60 dagen", topicB: "Geen (direct betalen)" },
      { dimension: "Catastrofale ziekte", topicA: "Gedekt (onder voorbehoud van limieten)", topicB: "Moet genoeg gespaard hebben" },
      { dimension: "Starttijd", topicA: "Puppy/kitten fase (geen uitsluitingen)", topicB: "Onmiddellijk (maar opbouw duurt jaren)" }
    ],
    verdict: "<strong>Huisdierenverzekering bestaat om financiële euthanasie in catastrofale scenario's te voorkomen — een zelfgefinancierde noodreserve kan een €15.000 kankerbehandeling in jaar één niet dekken.</strong> De optimale strategie combineert beide: sluit een ongevallen- en ziekteverzekering af terwijl het huisdier jong is, terwijl u tegelijkertijd een reserve opbouwt ter grootte van het eigen risico plus noodbuffer. Vanuit risicomanagementperspectief wint verzekering. NAPHIA-gegevens tonen dat 1 op de 3 huisdieren spoedeisende diergeneeskundige zorg nodig heeft — een enorm voordeel van verzekering.",
    faq: [
      { question: "Is huisdierenverzekering financieel de moeite waard?", answer: "Gemiddeld betalen eigenaren van gezonde huisdieren wiskundig meer aan premies dan ze aan claims ontvangen. Maar verzekering bestaat voor catastrofaal risico: als uw huisdier kanker krijgt, zijn €15.000–25.000 aan behandelingen gedekt na eigen risico. Pure kosten-baten: als u geen €5.000 verrassingsdierenartsrekening kunt betalen, is het de moeite waard." },
      { question: "Hoeveel moet ik sparen in een huisdiernoodfonds?", answer: "Diergeneeskundige financiële adviseurs bevelen €3.000–5.000 per huisdier aan — genoeg voor een standaard spoedoperatie. Bewaar het op een aparte hoogrentende spaarrekening. Nooit beleggen in aandelen — liquiditeit is essentieel." },
      { question: "Is het beter om een verzekering af te sluiten of geld te sparen?", answer: "De optimale strategie is beide. Sluit een verzekering af wanneer het huisdier een puppy/kitten is (om uitsluitingen voor bestaande aandoeningen te voorkomen), terwijl u een reserve van €3.000+ opbouwt voor eigen risico's en niet-gedekte items." }
    ]
  },
  grainFreeVsWholeGrain: {
    title: "Graanvrij vs Volkoren Hondenvoer: Wat is gezonder?",
    subtitle: "Evidence-based vergelijking van graanvrije en volkoren brokken: DCM-zorgen, ingrediëntkwaliteit, glycemische respons, allergieën en veterinaire consensus. AAFCO-, FDA- en WSAVA-voedingsrichtlijnen geciteerd.",
    topicAName: "Graanvrij dieet",
    topicBName: "Volkoren dieet",
    topicA: {
      pros: [
        { title: "Lagere glycemische belasting", body: "Gebruikt peulvruchten en aardappelen in plaats van granen — glucoseafgifte is langzamer dan bij maïs en tarwe." },
        { title: "Hypoallergene claims", body: "Kan honden met echte graanallergieën helpen (hoewel deze zeldzaam zijn — minder dan 1% van de honden)." },
        { title: "Hoger eiwitgehalte", body: "Graanvrije formules hebben typisch 2–5% meer eiwit op drogestofbasis." }
      ],
      cons: [
        "FDA-onderzoek (2018–2023): sterke correlatie tussen graanvrije diëten en dieet-geassocieerde gedilateerde cardiomyopathie (DCM)",
        "Peulvruchten (erwten, linzen, kikkererwten) en aardappelen als vervangende ingrediënten kunnen de taurine-opname verstoren",
        "De meeste honden hebben geen graanallergieën — geen voordeel voor 99% van de honden",
        "Duurder dan volkoren diëten zonder bewezen voordeel voor de meeste honden",
        "AAFCO heeft geen veilige minimumniveaus voor peulvruchten in hondenvoeding vastgesteld"
      ],
      bestFor: "Honden met gediagnosticeerde graanallergieën (zeldzaam — alleen bevestigd via eliminatiedieetproef onder veterinair toezicht)."
    },
    topicB: {
      pros: [
        { title: "Uitgebreid onderzocht", body: "Volkoren granen hebben 50+ jaar gedocumenteerde veiligheid in hondenvoeding. Geen DCM-risico." },
        { title: "Volledige voeding", body: "Volkoren granen leveren van nature B-vitaminen, vezels, ijzer, magnesium en essentiële vetzuren." },
        { title: "Lagere kosten", body: "Volkoren diëten van vergelijkbare kwaliteit kosten €1,00–2,00/500g vs €1,50–3,00/500g voor graanvrij." },
        { title: "AAFCO-conform", body: "Volkoren diëten van grote merken voldoen aan de AAFCO-voedingsnormen." },
        { title: "Spijsverteringsvezels", body: "Haver- en gerstvezels bevorderen de diversiteit van het darmmicrobioom." }
      ],
      cons: [
        "Iets hogere glycemische belasting (niet klinisch significant voor gezonde honden)",
        "Lager eiwitgehalte op drogestofbasis"
      ],
      bestFor: "De overgrote meerderheid van de honden — volkoren diëten zijn de aanbevolen standaard door WSAVA en de meeste veterinaire voedingsdeskundigen."
    },
    rows: [
      { dimension: "DCM-risico (FDA)", topicA: "Wordt onderzocht (peulvruchtverband)", topicB: "Geen verband" },
      { dimension: "Eiwitgehalte", topicA: "Typisch 26–34%", topicB: "Typisch 22–28%" },
      { dimension: "Kosten per 500g", topicA: "€1,50–3,00", topicB: "€1,00–2,00" },
      { dimension: "Glycemische belasting", topicA: "Lager (peulvruchten/aardappelen)", topicB: "Matig (complexe koolhydraten)" },
      { dimension: "Onderzoeksgeschiedenis", topicA: "Beperkt (trend na 2010)", topicB: "50+ jaar" },
      { dimension: "Allergievoordeel", topicA: "Zeldzaam (echte graanallergie <1%)", topicB: "Standaard (granen zelden allergeen)" },
      { dimension: "Veterinaire consensus", topicA: "Voorzichtigheid geboden (FDA + WSAVA)", topicB: "Aanbevolen standaard" }
    ],
    verdict: "<strong>Voor de meeste honden is een AAFCO-conform volkoren dieet van een fabrikant die veterinaire voedingsdeskundigen in dienst heeft, de veiligste en best onderzochte keuze.</strong> Graanvrije diëten mogen alleen worden gebruikt bij een bevestigde graanallergie (gediagnosticeerd via eliminatiedieet). Het lopende FDA-DCM-onderzoek heeft graanvrije diëten in verband gebracht met een ernstige hartaandoening, en het voorzorgsprincipe pleit voor volkoren.",
    faq: [
      { question: "Is graanvrij hondenvoer slecht voor honden?", answer: "De FDA heeft een mogelijk verband geïdentificeerd tussen graanvrije diëten en gedilateerde cardiomyopathie (DCM). Hoewel het onderzoek nog loopt, bevelen veterinaire cardiologen voorzichtigheid aan. Tenzij uw hond een bevestigde graanallergie heeft (gediagnosticeerd door een dierenarts), zijn volkoren diëten veiliger." },
      { question: "Welke granen zijn het beste voor honden?", answer: "Volkoren haver, zilvervliesrijst, gerst en quinoa zijn uitstekend. Ze leveren vezels, B-vitaminen en mineralen. Vermijd maïs en tarwe als uw hond gevoeligheden heeft, maar deze zijn veilig voor de meeste honden." },
      { question: "Moet ik overschakelen van graanvrij naar volkoren?", answer: "Raadpleeg uw dierenarts. Als uw hond langdurig graanvrij heeft gegeten, kan uw dierenarts een echocardiogram aanbevelen om de hartfunctie te controleren vóór de overgang. Schakel geleidelijk over gedurende 7–10 dagen." }
    ]
  },
  scratchingPostVsCatTree: {
    title: "Krabpaal vs Kattenboom: Wat heeft je kat nodig?",
    subtitle: "Gedetailleerde vergelijking van krabpalen en kattenbomen: ruimtevereisten, krabgedrag, verticaal territorium, multi-kat huishoudens en kosten. AAFP- en ISFM-richtlijnen geciteerd.",
    topicAName: "Krabpaal (zelfstandig)",
    topicBName: "Kattenboom (meerdere niveaus)",
    topicA: {
      pros: [
        { title: "Ruimtebesparend", body: "Een enkele krabpaal neemt slechts 0,1–0,2 m² vloeroppervlak in beslag — ideaal voor appartementen en kleine kamers." },
        { title: "Lagere kosten", body: "Kwaliteit krabpalen kosten €15–40, terwijl kattenbomen €50–200+ kosten." },
        { title: "Gericht krabben", body: "Een toegewijd krabvlak leidt het nagelonderhoudsgedrag naar één locatie." },
        { title: "Gemakkelijk te verplaatsen", body: "Lichtgewicht en draagbaar — verplaats indien nodig om meubels te beschermen." }
      ],
      cons: [
        "Geen verticaal territorium — katten hebben hoogte nodig om zich veilig te voelen",
        "Beperkte verrijking — geen klim-, zit- of verstopplekken",
        "Kan omvallen als niet stevig genoeg voor krachtig krabben",
        "Geen multi-kat functionaliteit — enkel krabvlak"
      ],
      bestFor: "Eenkat-huishoudens met beperkte ruimte, prijsbewuste eigenaren of als aanvulling op een bestaande kattenboom met extra krabvlakken."
    },
    topicB: {
      pros: [
        { title: "Verticaal territorium", body: "Meerdere niveaus bevredigen het instinct van de kat om te klimmen, zitten en hun territorium vanaf hoogte te overzien." },
        { title: "Multi-kat vriendelijk", body: "Meerdere niveaus en zitplekken verminderen conflicten door elke kat aparte rustplekken te bieden." },
        { title: "Verrijkingshub", body: "Combineert krabben, klimmen, zitten, verstoppen en spelen in één structuur." },
        { title: "Meubelbescherming", body: "Een goed geplaatste kattenboom met sisalpalen leidt het krabben weg van banken en tapijten." }
      ],
      cons: [
        "Grote voetafdruk — vereist 0,4–0,8 m² vloeroppervlak",
        "Hogere kosten — kwaliteit kattenbomen beginnen bij €50 en gaan tot €200+",
        "Esthetische zorgen — sommige ontwerpen passen niet bij het interieur",
        "Stabiliteitsproblemen — goedkope modellen kunnen wiebelen of omvallen, waardoor gebruik wordt ontmoedigd"
      ],
      bestFor: "Multi-kat huishoudens, eenkat-huishoudens met voldoende ruimte en katten die verticale voorkeur tonen (klimmen in gordijnen, zitten op kasten)."
    },
    rows: [
      { dimension: "Vloeroppervlak", topicA: "0,1–0,2 m²", topicB: "0,4–0,8 m²" },
      { dimension: "Kosten", topicA: "€15–40", topicB: "€50–200+" },
      { dimension: "Verticaal territorium", topicA: "Geen", topicB: "1–2 m hoogte" },
      { dimension: "Multi-kat gebruik", topicA: "Enkele kat", topicB: "2–4 katten" },
      { dimension: "Krabvlak", topicA: "Eén vlak", topicB: "2–4 vlakken" },
      { dimension: "Verrijkingsvariëteit", topicA: "Minimaal", topicB: "Hoog (klimmen, zitten, verstoppen, spelen)" },
      { dimension: "Draagbaarheid", topicA: "Gemakkelijk", topicB: "Moeilijk" }
    ],
    verdict: "<strong>Begin met een stevige krabpaal voor elke kat en voeg dan een kattenboom toe als je ruimte en budget hebt.</strong> Katten hebben zowel horizontale als verticale krabopties nodig. Een krabpaal is de minimale basis — een kattenboom voegt verrijking, territorium en stressvermindering toe die het welzijn van de kat aanzienlijk verbeteren. AAFP-richtlijnen bevelen minstens één verhoogde rustplek per kat aan.",
    faq: [
      { question: "Heeft mijn kat een kattenboom nodig als ik een krabpaal heb?", answer: "Een krabpaal voldoet aan de krabbehoefte, maar katten hebben ook verticaal territorium nodig voor veiligheid. Als uw kat op meubels klimt of op hoge planken zit, biedt een kattenboom verrijking. In multi-kat huizen vermindert een kattenboom conflicten." },
      { question: "Hoe hoog moet een krabpaal voor mijn kat zijn?", answer: "Minstens 76 cm hoog — katten moeten hun lichaam volledig kunnen strekken tijdens het krabben. Voor grote rassen zoals Maine Coons wordt 91+ cm aanbevolen." },
      { question: "Waar moet ik een kattenboom plaatsen?", answer: "Bij een raam (voor vogels kijken), in een sociaal belangrijke ruimte (woonkamer) en niet in geïsoleerde hoeken. Katten willen zijn waar het gezin is, terwijl ze een veilige verhoogde zitplek hebben." }
    ]
  }
};

// Apply translations
function applyCompareTranslations(locale, compareData) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const obj = readJson(filePath);
  let applied = 0;

  if (!obj.compare) {
    console.log(`  ERROR: ${locale}.json has no compare section`);
    return 0;
  }

  for (const [sectionKey, sectionData] of Object.entries(compareData)) {
    if (obj.compare[sectionKey]) {
      // Deep merge the section data
      obj.compare[sectionKey] = sectionData;
      applied++;
    }
  }

  if (applied > 0) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
  }
  return applied;
}

// Also apply simple label translations for de and nl
const simpleTrans = {
  de: {
    'common.optional': 'Optional',
    'common.senior': 'Senior',
    'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
    'compare.dimension': 'Dimension',
    'dog.breedContent.breeds.germanShepherd.name': 'Deutscher Schäferhund',
    'dog.breedContent.breeds.frenchBulldog.name': 'Französische Bulldogge',
    'dogAge.form.monthsOptional': 'plus (optional):',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'dogAge.scienceSection.aaGuidelines': 'AAHA Lebensphasen-Richtlinien',
    'catAge.scienceSection.aafpGuidelines': 'AAHA/AAFP Lebensphasen-Richtlinien für Katzen',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'vaccination.result.tableStatus': 'Status',
    'catBcs.bcsOptions.5': 'Ideal',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    'emergency.shared.riskLevel.high': 'Hoch',
    'emergency.shared.riskLevel.critical': 'KRITISCH',
    'emergency.shared.riskLevel.moderate': 'Mittel',
    'emergency.shared.riskLevel.low': 'Niedrig',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'Theobromin-Gehalt',
  },
  nl: {
    'common.optional': 'Optioneel',
    'common.senior': 'Senior',
    'common.sidebar.catBcs.ideal': 'Ideaal: 4-5/9',
    'compare.dimension': 'Dimensie',
    'dog.breedContent.breeds.germanShepherd.name': 'Duitse Herder',
    'dog.breedContent.breeds.frenchBulldog.name': 'Franse Bulldog',
    'dogAge.form.monthsOptional': 'plus (optioneel):',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'dogAge.scienceSection.aaGuidelines': 'AAHA Levensfase Richtlijnen',
    'catAge.scienceSection.aafpGuidelines': 'AAHA/AAFP Levensfase Richtlijnen voor Katten',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'vaccination.result.tableStatus': 'Status',
    'catBcs.bcsOptions.5': 'Ideaal',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    'emergency.shared.riskLevel.high': 'Hoog',
    'emergency.shared.riskLevel.critical': 'KRITIEK',
    'emergency.shared.riskLevel.moderate': 'Matig',
    'emergency.shared.riskLevel.low': 'Laag',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'Theobromine-niveau',
    'common.breadcrumb.home': 'Home',
    'nav.home': 'Home',
    'profile.breadcrumb.home': 'Home',
    'home.featuredTool.recentSearches': 'Recent:',
    'footer.disclaimer': 'Disclaimer',
    'footer.contact': 'Contact',
    'dogAge.breadcrumbHome': 'Home',
    'dogCalorie.breadcrumbHome': 'Home',
    'puppyGrowth.breadcrumbHome': 'Home',
    'gestation.breadcrumbHome': 'Home',
    'vaccination.breadcrumbHome': 'Home',
    'catHydration.breadcrumbHome': 'Home',
    'emergency.shared.breadcrumb.home': 'Home',
    'catEmergency.shared.breadcrumb.home': 'Home',
    'about.contact': 'Contact',
    'terms.contact': 'Contact',
    'privacy.analytics': 'Analytics',
    'guide.checklist.proTip': 'Pro Tip',
    'toxicChecker.result.emergencyNumbers': 'ASPCA Poison Control: (888) 426-4435 · Pet Poison Helpline: (855) 764-7661',
    'emergency.shared.aspcaHotline': 'ASPCA Poison Control: (888) 426-4435',
    'compare.microchipVsTattoo.topicBName': 'Tattoo',
  },
};

function applySimpleTrans(locale, transMap) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const obj = readJson(filePath);
  let applied = 0;

  for (const [key, value] of Object.entries(transMap)) {
    const currentVal = getNestedValue(obj, key);
    const enVal = getNestedValue(en, key);
    if (currentVal !== undefined && currentVal === enVal) {
      setNestedValue(obj, key, value);
      applied++;
    }
  }

  if (applied > 0) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
  }
  return applied;
}

// Main
console.log('=== Applying full compare translations ===');
const deApplied = applyCompareTranslations('de', deCompare);
const nlApplied = applyCompareTranslations('nl', nlCompare);
console.log(`de: ${deApplied} compare sections translated`);
console.log(`nl: ${nlApplied} compare sections translated`);

console.log('\n=== Applying simple label translations ===');
const deSimple = applySimpleTrans('de', simpleTrans.de);
const nlSimple = applySimpleTrans('nl', simpleTrans.nl);
console.log(`de: ${deSimple} simple labels translated`);
console.log(`nl: ${nlSimple} simple labels translated`);

// Count remaining English values
const universalKeys = new Set([
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber', 'emergency.shared.aspcaLink',
  'common.unit.kcal', 'common.notFound.title',
]);

console.log('\n=== Remaining English values ===');
for (const locale of ['de', 'nl', 'fr', 'hi']) {
  const obj = readJson(path.join(messagesDir, `${locale}.json`));
  const allKeys = new Set();
  function collectKeys(o, prefix = '') {
    for (const [key, value] of Object.entries(o)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        collectKeys(value, fullKey);
      } else {
        allKeys.add(fullKey);
      }
    }
  }
  collectKeys(obj);
  
  let count = 0;
  for (const k of allKeys) {
    const enVal = getNestedValue(en, k);
    const locVal = getNestedValue(obj, k);
    if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2 && !universalKeys.has(k)) {
      count++;
    }
  }
  console.log(`  ${locale}: ${count} English values`);
}

console.log('\nDone!');