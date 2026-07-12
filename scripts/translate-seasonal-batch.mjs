/**
 * Batch translate seasonal data for remaining languages: de, ja, ko, es, pt, nl, ru, hi, ar
 * Uses compact translation format
 */
import fs from 'fs';

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const langs = ['de', 'ja', 'ko', 'es', 'pt', 'nl', 'ru', 'hi', 'ar'];

// Helper: deep clone English seasonal as base, then overlay translations
function applyTranslations(lang, translations) {
  const data = JSON.parse(fs.readFileSync(`messages/${lang}.json`, 'utf8'));
  const enSeasonal = JSON.parse(JSON.stringify(en.seasonal));
  
  // Deep merge translations into enSeasonal
  for (const [slug, entry] of Object.entries(translations)) {
    if (!enSeasonal[slug]) continue;
    const target = enSeasonal[slug];
    for (const [key, value] of Object.entries(entry)) {
      if (Array.isArray(value)) {
        if (typeof value[0] === 'string') {
          target[key] = value;
        } else if (typeof value[0] === 'object') {
          target[key] = target[key].map((item, i) => value[i] ? { ...item, ...value[i] } : item);
        }
      } else {
        target[key] = value;
      }
    }
  }
  
  data.seasonal = enSeasonal;
  fs.writeFileSync(`messages/${lang}.json`, JSON.stringify(data, null, 2));
  console.log(`${lang}.json updated`);
}

// ============================================================
// GERMAN (de)
// ============================================================
applyTranslations('de', {
  'summer-heat': {
    title: 'So halten Sie Ihren Hund im Sommer kühl: Hitzeschutz-Ratgeber',
    description: 'Vollständiger Leitfaden zur Vorbeugung von Hitzschlag bei Hunden — frühe Symptome erkennen, Kühltechniken, Sicherheit drinnen und draußen. Basierend auf veterinärmedizinischer Wissenschaft.',
    bodyParagraphs: [
      'Ein Hitzschlag ist eine der gefährlichsten sommerlichen Bedrohungen für Hunde. Anders als Menschen haben Hunde Schweißdrüsen hauptsächlich an den Pfotenballen, was ihre Kühlung deutlich weniger effizient macht. Sie kühlen sich hauptsächlich durch Hecheln, aber dieser Mechanismus kann bei hoher Temperatur und Luftfeuchtigkeit versagen. Wenn die Körpertemperatur eines Hundes 39,4 °C übersteigt, befindet er sich in einem gefährlichen Bereich; über 41,1 °C kann Multiorganversagen auftreten.',
      'Bestimmte Rassen haben ein höheres Risiko. Brachyzephale Rassen (Französische Bulldogge, Mops, Boston Terrier) haben aufgrund ihrer eingeschränkten Nasenwege besondere Schwierigkeiten bei der Kühlung. Ältere Hunde, übergewichtige Hunde und solche mit Herz- oder Atemwegserkrankungen sind ebenfalls gefährdeter. Selbst gesunde, aktive Hunde können bei intensiver Bewegung an heißen Tagen einen Hitzschlag entwickeln.',
      'Vorbeugung ist viel einfacher als Behandlung. Zu den wichtigsten Strategien gehören: Spaziergänge in den kühlen Stunden (früher Morgen oder später Abend), stets frisches Wasser bereitstellen, Hunde niemals in einem geparkten Auto lassen (auch mit geöffneten Fenstern kann die Temperatur in 10 Minuten tödliche Werte erreichen) und Kühlmatten, flache Wasserbecken und Ventilatoren verwenden.',
    ],
    knowledgeCards: [
      { title: 'Physiologie des Hitzschlags', body: 'Hunde kühlen sich hauptsächlich durch Hecheln und begrenztes Schwitzen über Pfotenballen und Nase. Wenn die Umgebungstemperatur 29 °C bei hoher Luftfeuchtigkeit übersteigt, wird die Verdunstungskühlung ineffektiv, die Körpertemperatur steigt schnell an, was zu Zelldenaturierung und Organversagen führt.' },
      { title: 'Hitzschlag vs. Hitzeerschöpfung', body: 'Hitzeerschöpfung ist das Vorstadium: übermäßiges Hecheln, Lethargie und Speicheln. Hitzschlag ist das fortgeschrittene Stadium: Temperatur > 40 °C, Erbrechen, Durchfall, Ataxie (unsicherer Gang) und Verwirrung. Ein Hitzschlag erfordert sofortige tierärztliche Intervention.' },
      { title: 'Sicheres Abkühlen eines überhitzten Hundes', body: 'Verwenden Sie niemals Eiswasser oder Eiswürfel — dies führt zu peripherer Vasokonstriktion, die die Wärme im Körper einschließt. Verwenden Sie kühles (nicht kaltes) Wasser auf Handtüchern an Achseln, Leisten und Hals. Nutzen Sie einen Ventilator für schnellere Verdunstungskühlung. Bieten Sie kleine Mengen Wasser häufig an.' },
      { title: 'Gefahr der Asphalttemperatur', body: 'Bei einer Lufttemperatur von 30 °C kann Asphalt 60 °C erreichen — genug, um Pfotenballen in 60 Sekunden zu verbrennen. Einfacher Test: Legen Sie den Handrücken auf den Boden. Wenn Sie es 5 Sekunden nicht aushalten, ist es zu heiß für Ihren Hund.' },
    ],
    prevention: [
      'Spaziergänge früh morgens (5–8 Uhr) oder spät abends (nach 19 Uhr), Mittagshitze meiden',
      'Immer eine tragbare Wasserschale und ausreichend frisches Wasser mitführen',
      'Hunde niemals in einem geparkten Auto lassen — selbst mit geöffneten Fenstern steigt die Temperatur in 10 Minuten um 10–15 °C',
      'Zu Hause Kühlmatten, flache Wasserbecken und Ventilatoren bereitstellen',
      'Intensive Bewegung bei Hitze reduzieren, durch mentale Indoor-Spiele ersetzen',
      'Vor Spaziergängen Bodentemperatur mit dem Handrücken testen — die 5-Sekunden-Regel',
      'Rassenrisiko kennen: Brachyzephale, ältere und übergewichtige Hunde benötigen besondere Aufmerksamkeit',
    ],
    symptoms: [
      'Übermäßiges Hecheln, schnelle und flache Atmung',
      'Hell- oder dunkelrotes Zahnfleisch und Zunge (rosa ist normal)',
      'Starker Speichelfluss, dicker Speichel',
      'Lethargie, Schwäche oder unsicherer Stand (Ataxie)',
      'Erbrechen oder Durchfall (möglicherweise blutig)',
      'Erhöhte Herzfrequenz (Tachykardie)',
      'Verwirrung, Reaktionslosigkeit oder Krampfanfälle',
    ],
    firstAid: [
      { title: 'Sofort in den Schatten bringen', content: 'Bringen Sie den Hund in den Schatten oder einen klimatisierten Raum. Zwingen Sie ihn nicht zum Stehen oder Gehen — lassen Sie ihn liegen und ruhen.' },
      { title: 'Mit kühlem Wasser kühlen (nicht eiskalt)', content: 'Legen Sie mit kühlem Wasser (ca. 15–20 °C) getränkte Handtücher auf Achseln, Leisten, Hals und Pfotenballen. Nutzen Sie einen Ventilator. Bieten Sie kleine Mengen kühles Wasser an — nicht zum Trinken zwingen.' },
      { title: 'Temperatur überwachen', content: 'Falls ein Rektalthermometer verfügbar ist, messen Sie die Temperatur alle 5 Minuten. Kühlung bei 39,4 °C beenden, um Unterkühlung zu vermeiden.' },
      { title: 'Sofort tierärztliche Hilfe suchen', content: 'Auch wenn der Hund sich zu erholen scheint, ist sofortige tierärztliche Versorgung notwendig. Komplikationen eines Hitzschlags (DIC, Nierenversagen, Hirnödem) können Stunden später auftreten.' },
    ],
    faqs: [
      { question: 'Welche Temperatur ist zu heiß für Hunde?', answer: 'Generell Vorsicht ab 29 °C. Für brachyzephale Rassen (Mops, Französische Bulldogge) können bereits 24 °C gefährlich sein. Berücksichtigen Sie immer die Luftfeuchtigkeit — Hitze + hohe Luftfeuchtigkeit ist die gefährlichste Kombination.' },
      { question: 'Kann ich meinem Hund Eiswürfel zur Abkühlung geben?', answer: 'Bei einem Hitzschlag-Notfall nicht empfohlen, da Eiswürfel Vasokonstriktion verursachen. Verwenden Sie kühles (nicht eiskaltes) Wasser. Für gesunde Hunde an heißen Tagen sind kleine Eiswürfel als Leckerli meist sicher, aber auf Zahnrisiken achten.' },
      { question: 'Welche Hunderassen sind am meisten gefährdet?', answer: 'Brachyzephale Rassen (Französische Bulldogge, Mops, Englische Bulldogge, Boston Terrier, Boxer) sind die höchste Risikogruppe. Weitere Risikohunde: ältere Hunde, übergewichtige Hunde, dicht behaarte Rassen (Husky, Malamute) und Hunde mit Herzerkrankungen oder Kehlkopflähmung.' },
      { question: 'Wie lange dauert die Erholung nach einem Hitzschlag?', answer: 'Ein leichter Hitzschlag kann bei schneller Behandlung in 24–48 Stunden abklingen. Mittelschwere bis schwere Hitzschläge können Tage bis Wochen Krankenhausaufenthalt erfordern, mit möglichen bleibenden Organschäden. Deshalb sind Vorbeugung und sofortige tierärztliche Versorgung entscheidend.' },
    ],
    relatedTools: [
      { name: 'Hunde-Kalorienrechner', href: 'dog/dog-calorie-calculator', description: 'Berechnen Sie die ideale tägliche Kalorienzufuhr für ein gesundes Gewicht.' },
      { name: 'Welpen-Wachstumsverfolgung', href: 'dog/puppy-growth-tracker', description: 'Verfolgen Sie die Wachstumsmeilensteine und das erwartete Gewicht Ihres Welpen.' },
    ],
  },
  'winter-paw-care': {
    title: 'Pfotenschutz für Hunde im Winter: Sicherheit bei Kälte, Eis und Streusalz',
    description: 'Expertenratgeber zum Schutz von Hundepfoten im Winter — Vorbeugung von Erfrierungen, Eisverbrennungen und chemischen Verätzungen durch Streusalz. Pfotenpflege-Routine, Schutzschuhe und sichere Streumittel-Alternativen.',
    bodyParagraphs: [
      'Der Winter stellt einzigartige Herausforderungen an Hundepfoten. Streusalz (Natriumchlorid, Calciumchlorid) verursacht chemische Verätzungen und Risse, während Eis Schnittwunden verursacht. Wiederholte Frost-Tau-Zyklen schädigen das Ballengewebe. Noch gefährlicher: Hunde können Streusalz von ihren Pfoten lecken, was zu Magen-Darm-Beschwerden oder sogar Natriumvergiftung führt.',
      'Manche Rassen brauchen im Winter mehr Pfotenschutz als andere. Kleine Hunde und kurzhaarige Rassen (Chihuahua, Windhund) sind näher am kalten Boden und anfälliger für Erfrierungen. Langhaarige Rassen (Golden Retriever) können Eisklumpen zwischen den Zehen bekommen, die Schmerzen und Lahmheit verursachen. Ältere Hunde mit Arthritis können bei kaltem Wetter mehr Beschwerden haben.',
      'Eine Winter-Pfotenpflegeroutine ist entscheidend. Nach jedem Ausgang die Pfoten mit warmem Wasser und einem weichen Tuch abwischen, um Streusalz und Eispartikel zu entfernen. Haare zwischen den Zehen kürzen, um Eisklumpenbildung zu reduzieren. Vor Spaziergängen tierfreundlichen Pfotenbalsam oder Vaseline als Schutzbarriere auftragen. Für extreme Bedingungen Schutzschuhe in Betracht ziehen.',
    ],
    knowledgeCards: [
      { title: 'Wie Streusalz Hundepfoten schädigt', body: 'Streusalz (Natriumchlorid, Calciumchlorid, Magnesiumchlorid) schädigt Ballenzellen durch Osmose — es entzieht dem Gewebe Feuchtigkeit und verursacht Trockenheit, Risse und chemische Verätzungen. Calciumchlorid ist besonders gefährlich, da es exotherm mit Schnee reagiert und zusätzliche Wärme erzeugt.' },
      { title: 'Erscheinungsbild von Erfrierungen an Pfoten', body: 'Frühe Erfrierungen erscheinen als blasse oder bläuliche Haut, die sich kalt anfühlt. Beim Aufwärmen wird der Bereich rot, geschwollen und schmerzhaft mit Blasen. Schwere Erfrierungen führen zu Gewebsnekrose (Schwarzfärbung), die chirurgisches Débridement erfordert. Ballen, Zehenzwischenräume und Ohrspitzen sind am stärksten betroffen.' },
      { title: 'Wie Pfotenbalsam funktioniert', body: 'Tierfreundlicher Pfotenbalsam (mit Bienenwachs, Sheabutter, Kokosöl) bildet einen okklusiven Schutzfilm auf den Ballen, der Streusalzkontakt verhindert und Feuchtigkeit einschließt. Vor dem Spaziergang aufgetragen schützt er, danach aufgetragen unterstützt er die Reparatur. Vaseline ist eine Notfallalternative, enthält aber keine pflegenden Nährstoffe.' },
      { title: 'Eisklumpen-Prävention und -Behandlung', body: 'Eisklumpen zwischen den Zehen spreizen die Zehen auseinander und verursachen Schmerzen, Lahmheit und sogar Risse. Vorbeugung umfasst das Kürzen der Zwischenzehenhaare und die Verwendung von Pfotenbalsam. Falls sie sich gebildet haben, Pfoten in warmem (nicht heißem) Wasser einweichen, bis sie sich lösen — nicht an den Eisklumpen ziehen, das würde die Haut einreißen.' },
    ],
    prevention: [
      'Pfoten nach jedem Ausgang mit warmem Wasser abwischen, um Streusalz und Schmutz zu entfernen',
      'Vor Winterspaziergängen tierfreundlichen Pfotenbalsam oder Vaseline auftragen',
      'Haare zwischen den Zehen kürzen, um Eisklumpenbildung zu reduzieren',
      'Für extreme Bedingungen in gut sitzende Schutzschuhe investieren',
      'Zu Hause tierfreundliches Streumittel (auf Harnstoff- oder CMA-Basis) verwenden',
      'Saugfähige Matten im Eingangsbereich platzieren, um Pfoten beim Hereinkommen zu trocknen',
      'Pfotenbehaarung im Winter kurz halten, um Schnee- und Matschansammlung zu reduzieren',
    ],
    symptoms: [
      'Rötung, Entzündung oder Schwellung der Pfoten',
      'Sichtbare Risse, Spalten oder Blutungen an den Ballen',
      'Lahmheit, Gehverweigerung oder häufiges Pfotenlecken',
      'Verfärbung der Ballen (blass oder bläulich deutet auf Erfrierungen, hellrot auf chemische Verätzung)',
      'Blasen oder Geschwüre an den Ballen',
      'Eisklumpen zwischen den Zehen, die Lahmheit verursachen',
      'Übermäßiges Lecken führt zur oralen Aufnahme von Streusalz',
    ],
    firstAid: [
      { title: 'Pfoten mit warmem Wasser waschen', content: 'Verwenden Sie warmes Wasser (ca. 37 °C) und ein weiches Tuch. Entfernen Sie sanft alles sichtbare Streusalz, Eis und Schmutz. Achten Sie besonders auf die Zehenzwischenräume. Gründlich, aber sanft trocknen.' },
      { title: 'Auf Schnitte oder Verätzungen untersuchen', content: 'Untersuchen Sie jeden Ballen, Zehenzwischenraum und das Nagelbett sorgfältig. Achten Sie auf Risse, Rötungen, Blasen oder Blutungen. Bei chemischen Verätzungen mindestens 5 Minuten mit reichlich warmem Wasser spülen.' },
      { title: 'Reparierenden Balsam auftragen', content: 'Nach dem Waschen und Trocknen eine Schicht reparierenden Pfotenbalsam oder Vaseline auftragen. Bei offenen Wunden zuerst ein tierfreundliches antiseptisches Spray auftragen, dann locker verbinden.' },
      { title: 'Überwachen und tierärztliche Hilfe suchen', content: 'Die Heilung in den nächsten 24 Stunden überwachen. Bei anhaltender Lahmheit, zunehmender Schwellung, Eiter oder Geruch sofort tierärztliche Hilfe suchen. Bei Verdacht auf Erfrierungen nicht reiben — in warmem Wasser einweichen und sofort tierärztliche Hilfe suchen.' },
    ],
    faqs: [
      { question: 'Braucht mein Hund wirklich Schuhe?', answer: 'Hängt von Ihrer Situation ab. Bei extremer Kälte (unter -12 °C), langen Spaziergängen auf gestreuten Straßen oder bestehenden Pfotenverletzungen sind Schuhe sehr zu empfehlen. Viele Hunde gewöhnen sich mit geduldigem Training daran. Für kurze Spaziergänge reicht Pfotenbalsam meist aus.' },
      { question: 'Was ist das sicherste tierfreundliche Streumittel?', answer: 'Produkte mit Harnstoff (Carbamid) oder CMA (Calcium-Magnesium-Acetat) sind sicherer für Pfoten und Umwelt. Vermeiden Sie Natriumchlorid (Steinsalz), Calciumchlorid und Magnesiumchlorid. Etiketten prüfen — viele Produkte behaupten "tierfreundlich", fügen aber nur einen Bitterstoff hinzu.' },
      { question: 'Wie oft sollte ich Pfotenbalsam auftragen?', answer: 'Im Winter vor jedem Spaziergang und nach der Reinigung danach. Bei besonders trockenen oder rissigen Pfoten 2–3 Mal täglich auftragen. Die Anwendung vor dem Schlafengehen ermöglicht optimale Absorption über Nacht.' },
      { question: 'Wie sehen Erfrierungen bei Hunden aus?', answer: 'Frühe Erfrierungen erscheinen als blasse, bläuliche oder graue Haut, die sich ungewöhnlich kalt anfühlt. Nach dem Aufwärmen wird der Bereich rot, geschwollen und schmerzhaft. Schwere Erfrierungen verursachen Blasen und schließlich Gewebsnekrose (Schwarzfärbung). Am häufigsten an Ballen, Zehenzwischenräumen, Ohrspitzen und Schwanzspitze betroffen.' },
    ],
    relatedTools: [
      { name: 'Hundealter-Rechner', href: 'dog/dog-age-calculator', description: 'Rechnen Sie das Alter Ihres Hundes in Menschenjahre um.' },
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Hundenotfälle.' },
    ],
  },
  'christmas-foods': {
    title: 'Für Hunde giftige Weihnachtslebensmittel: Sicherheitsratgeber für die Feiertage',
    description: 'Vollständiger Ratgeber zu gefährlichen Weihnachtslebensmitteln für Hunde — Schokolade, Xylit-gesüßte Desserts, Rosinenpudding, Mince Pies, Zwiebelfüllung. Erfahren Sie mehr über Toxizität, Symptome und Notfallmaßnahmen.',
    bodyParagraphs: [
      'Weihnachten bringt eine Fülle von Lebensmitteln — vieles davon gefährlich für Hunde. Von Schokoladenschachteln bis zu Rosinenweihnachtspudding verzeichnet die Feiertagssaison einen Höhepunkt an Lebensmittelvergiftungen bei Hunden. Studien zeigen einen Anstieg der tierärztlichen Notfallbesuche um 75 % während der Weihnachtszeit. Häufigste Ursachen: Schokolade, zuckerfreie Desserts mit Xylit, Rosinen, Zwiebelfüllung und Alkohol.',
      'Jedes giftige Lebensmittel hat einen anderen Vergiftungsmechanismus. Schokolade enthält Theobromin und Koffein, die Herz und Zentralnervensystem beeinflussen. Rosinen können akutes Nierenversagen verursachen, dessen Mechanismus noch nicht vollständig verstanden ist. Xylit löst eine massive Insulinausschüttung aus, die zu lebensbedrohlicher Hypoglykämie und Leberversagen führt. Zwiebeln und Knoblauch verursachen oxidative Schäden an roten Blutkörperchen (hämolytische Anämie).',
      'Vorbeugung ist die einzige Garantie. Lebensmittel außer Reichweite aufbewahren, Mülleimer mit Deckel verwenden und Gäste informieren, den Hund nicht zu füttern. Bereiten Sie sichere Leckerlis als Alternative vor. Bei versehentlicher Aufnahme kann das Wissen, was zu tun ist, Leben retten — kontaktieren Sie sofort einen Tierarzt oder eine Tiergift-Hotline.',
    ],
    knowledgeCards: [
      { title: 'Schokoladentoxizität: Die Gefahr von Theobromin', body: 'Theobromin und Koffein in Schokolade sind Methylxanthine, die Hunde schwer abbauen können. Dunkle Schokolade enthält 15–20 mg Theobromin pro Gramm, Milchschokolade etwa 2 mg/g. Ein 10 kg schwerer Hund erreicht eine toxische Dosis mit 30 g dunkler Schokolade. Symptome: Erbrechen, Durchfall, Hyperaktivität, Tachykardie und Krampfanfälle.' },
      { title: 'Xylit: Die versteckte tödliche Gefahr', body: 'Xylit ist ein zuckerfreier Süßstoff in zuckerfreien Kaugummis, Bonbons, Erdnussbutter, Backwaren und Zahnpasta. Bei Hunden löst es eine massive Insulinausschüttung aus, die innerhalb von 30 Minuten zu schwerer Hypoglykämie führt. Hohe Dosen können akute Lebernekrose verursachen. Weniger als 1 g Xylit kann für einen 10 kg schweren Hund toxisch sein — das entspricht ein bis zwei Kaugummis.' },
      { title: 'Das Rosinen-Toxizitätsparadoxon', body: 'Der Mechanismus der Toxizität von Trauben, Rosinen und Johannisbeeren bei Hunden ist noch nicht vollständig geklärt, kann aber akutes Nierenversagen verursachen. Die individuelle Empfindlichkeit variiert stark — manche Hunde nehmen große Mengen ohne Symptome auf, andere entwickeln Nierenversagen nach nur wenigen Rosinen. Symptome: Erbrechen, Durchfall, Lethargie und verminderte Urinproduktion innerhalb von 24–72 Stunden.' },
      { title: 'Zwiebeln und Knoblauch: Kumulative Toxizität', body: 'Zwiebeln, Knoblauch, Lauch und Schalotten (Gattung Allium) enthalten Thiosulfate, die oxidative Schäden an roten Blutkörperchen verursachen (Heinz-Körper-Anämie). Anders als akute Toxine ist die Zwiebeltoxizität kumulativ — wiederholte kleine Mengen sind ebenso gefährlich. Symptome nach 1–5 Tagen: blasses Zahnfleisch, Schwäche, schnelle Atmung und portweinfarbener Urin.' },
    ],
    prevention: [
      'Schokoladenschachteln, Adventskalender und Süßigkeiten hoch oben außer Reichweite aufbewahren',
      'Erdnussbutter-Etiketten prüfen — sicherstellen, dass sie kein Xylit enthalten',
      'Weihnachtspudding, Mince Pies und Früchtekuchen von Hunden fernhalten — sie enthalten Rosinen',
      'Sicherstellen, dass Zwiebelfüllung, Soße und Knoblauchgerichte unzugänglich sind',
      'Alkoholische Getränke niemals in Reichweite des Hundes lassen — einschließlich Eierlikör und Rumkuchen',
      'Gäste informieren: "Füttern Sie den Hund nicht" — Absperrgitter oder Leine verwenden',
      'Sichere Feiertagsleckerlis vorbereiten (kleine Stücke naturbelassenen Truthahn, Karotten oder grüne Bohnen)',
    ],
    symptoms: [
      'Erbrechen und Durchfall (möglicherweise blutig)',
      'Lethargie, Schwäche oder Zusammenbruch',
      'Blasses oder gelbliches Zahnfleisch (Zwiebeltoxizität)',
      'Zittern, Krampfanfälle oder Übererregung (Schokolade/Xylit)',
      'Erhöhte Herzfrequenz oder Arrhythmie',
      'Verminderte oder keine Urinproduktion (Rosinentoxizität)',
      'Koordinationsverlust oder schwankender Gang (Alkoholtoxizität)',
    ],
    firstAid: [
      { title: 'Aufgenommenes und Menge identifizieren', content: 'Bestimmen Sie, was Ihr Hund gefressen hat, wie viel und wann. Bewahren Sie Verpackungen oder Essensreste auf. Dies hilft dem Tierarzt, die toxische Dosis zu berechnen.' },
      { title: 'Tierarzt oder Giftnotruf kontaktieren', content: 'Kontaktieren Sie sofort Ihren Tierarzt, die örtliche Tierklinik oder eine Tiergift-Hotline (ASPCA: 888-426-4435). Geben Sie Details zur Aufnahme an. Kein Erbrechen ohne tierärztliche Anweisung auslösen — manche Substanzen (wie Xylit) sind beim Erbrechen gefährlicher.' },
      { title: 'Kein Erbrechen auslösen (außer auf tierärztliche Anweisung)', content: 'Erbrechen auszulösen ist nicht immer sicher oder empfohlen. Manche Substanzen (Xylit-Produkte) können beim Erbrechen in die Lunge gelangen. Ätzende Substanzen verursachen beim Erbrechen zusätzliche Schäden. Warten Sie immer auf tierärztliche Anweisungen.' },
      { title: 'Zur tierärztlichen Notaufnahme fahren', content: 'Auch wenn Ihr Hund symptomfrei erscheint, verursachen viele Toxine (Rosinen, Xylit) Schäden vor dem Auftreten von Symptomen. Fahren Sie sofort zur nächstgelegenen tierärztlichen Notaufnahme. Bringen Sie Verpackungen oder Essensreste mit.' },
    ],
    faqs: [
      { question: 'Wie viel Schokolade ist für einen Hund tödlich?', answer: 'Hängt von Schokoladentyp und Hundegewicht ab. Grobe Richtlinie: Ein 10 kg schwerer Hund erreicht eine toxische Dosis mit 30 g dunkler Schokolade oder 140 g Milchschokolade. Weiße Schokolade enthält fast kein Theobromin, kann aber Verdauungsprobleme verursachen. Verwenden Sie einen Online-Schokoladentoxizitätsrechner oder kontaktieren Sie einen Tierarzt.' },
      { question: 'Welche sicheren Weihnachtsleckerlis kann ich meinem Hund geben?', answer: 'Sichere Optionen: kleine Stücke naturbelassene Putenbrust (ohne Haut, ohne Knochen, ohne Gewürze), rohe Karotten, grüne Bohnen, gekochtes Kürbispüree (ohne Gewürze), Heidelbeeren und Apfelscheiben (ohne Kerne). Vermeiden Sie alles mit Gewürzen, Butter, Knoblauch oder Zwiebeln.' },
      { question: 'Wie schnell treten nach dem Verzehr von Rosinen Symptome auf?', answer: 'Erste Symptome (Erbrechen, Durchfall) treten typischerweise innerhalb von 6–12 Stunden auf. Anzeichen von Nierenversagen (verminderte Urinproduktion, Lethargie, Appetitlosigkeit) können innerhalb von 24–72 Stunden auftreten. Warten Sie niemals auf Symptome — Rosinentoxizität erfordert sofortige tierärztliche Intervention.' },
      { question: 'Was passiert, wenn mein Hund einen Schluck Alkohol trinkt?', answer: 'Hunde sind viel empfindlicher gegenüber Alkohol als Menschen. Selbst kleine Mengen können Erbrechen, Ataxie, ZNS-Depression, Atemprobleme und metabolische Azidose verursachen. Kontaktieren Sie sofort einen Tierarzt. Alkoholische Feiertagsgetränke (Eierlikör, Rumkuchen) sind für Hunde ebenso gefährlich.' },
    ],
    relatedTools: [
      { name: 'Giftige-Lebensmittel-Prüfer', href: 'shared/toxic-checker', description: 'Prüfen Sie, ob ein Lebensmittel für Ihren Hund sicher ist.' },
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Notfälle.' },
      { name: 'Kalorienrechner', href: 'dog/dog-calorie-calculator', description: 'Berechnen Sie die ideale tägliche Kalorienzufuhr.' },
    ],
  },
  'halloween-candy': {
    title: 'Mein Hund hat Halloween-Süßigkeiten gefressen: Notfall-Aktionsplan',
    description: 'Notfallratgeber für Hunde, die Halloween-Süßigkeiten gefressen haben — Erkennen von Toxizitätsanzeichen, Vorgehen nach Süßigkeitentyp. Wann Erbrechen auslösen und wann direkt in die Notaufnahme.',
    bodyParagraphs: [
      'Halloween ist einer der gefährlichsten Feiertage für Hunde. Süßigkeitenschalen sind überall, Dekorationen können verschluckt werden, und häufiges Türklingeln kann Hunde entkommen lassen. Schokolade, zuckerfreie Bonbons mit Xylit und Rosinen sind die drei häufigsten toxischen Expositionen für Hunde an Halloween. Das ASPCA meldet einen Anstieg der Anrufe zu Hundevergiftungen um 40 % in den Tagen nach Halloween.',
      'Die Vielfalt der Halloween-Süßigkeiten bedeutet auch unterschiedliche Toxizitätsrisiken. Schokoriegel sind eine offensichtliche Bedrohung, aber "zuckerfreie" Bonbons können Xylit enthalten, das giftiger als Schokolade ist. Süßigkeitenverpackungen bergen ebenfalls Erstickungs- und Darmverschlussrisiken. Lutscherstiele und Plastikverpackungen sind besonders gefährlich — sie können den Darm perforieren oder tödliche Verschlüsse verursachen.',
      'Vorbeugung ist einfach, aber entscheidend: Süßigkeitenschalen hoch oben, in Schränken und verschlossenen Behältern aufbewahren. Nach der Rückkehr der Kinder sofort heruntergefallene Süßigkeiten aufsammeln. Sicherstellen, dass Hunde beim Türöffnen einen sicheren Bereich haben — Absperrgitter oder Leine verwenden. Kinder dazu erziehen, niemals Süßigkeiten mit Hunden zu teilen, auch nicht "nur ein kleines bisschen".',
    ],
    knowledgeCards: [
      { title: 'Verstecktes Xylit in Halloween-Süßigkeiten', body: 'Viele "zuckerfreie" oder "zuckerreduzierte" Halloween-Süßigkeiten enthalten Xylit — einen Süßstoff, der für Hunde 100-mal giftiger als Schokolade ist. Xylit findet sich in zuckerfreien Kaugummis, Minzbonbons, Hartbonbons und manchen Erdnussbutter-Süßigkeiten. Bei Hunden verursacht es innerhalb von 30 Minuten schwere Hypoglykämie und bei hohen Dosen Leberversagen.' },
      { title: 'Schokoladentypen und Toxizität', body: 'Je höher der Kakaoanteil, desto stärker die Toxizität. Backschokolade (Kakaopulver) ist am giftigsten, gefolgt von dunkler Schokolade (70 %+ Kakao), halbsüßer Schokolade, dann Milchschokolade. Weiße Schokolade enthält fast kein Theobromin, aber der hohe Fettgehalt kann Pankreatitis verursachen. Halloween-"Mini"-Schokoriegel enthalten jeweils 2–4 g Kakao — einige wenige reichen aus, um einen kleinen Hund zu bedrohen.' },
      { title: 'Darmverschluss durch Verpackungen', body: 'Süßigkeitenverpackungen, Lutscherstiele und Plastikfolien werden im Hundemagen nicht verdaut und können teilweisen oder vollständigen Darmverschluss verursachen. Symptome: wiederholtes Erbrechen, Appetitlosigkeit, Verstopfung und Bauchschmerzen. Ein Verschluss kann eine Operation erfordern. Wenn Ihr Hund Verpackungen verschluckt hat, sofort Tierarzt kontaktieren.' },
      { title: 'Toxizität von Rosinenboxen', body: 'Manchmal als "gesunde" Alternative an Halloween verteilt, sind kleine Rosinenboxen extrem gefährlich für Hunde. Rosinen können akutes Nierenversagen verursachen, mit stark variierender individueller Empfindlichkeit. Selbst eine kleine Box kann für einen großen Hund tödlich sein. Lassen Sie Hunde niemals an Rosinen oder Trauben heran.' },
    ],
    prevention: [
      'Süßigkeitenschalen auf hohen Regalen, in Schränken oder verschlossenen Behältern aufbewahren',
      'Nach der Rückkehr der Kinder sofort alle heruntergefallenen Süßigkeiten und Verpackungen aufsammeln',
      'Absperrgitter oder Leine verwenden, um Hunde am Entkommen beim Türöffnen zu hindern',
      'Kinder dazu erziehen, niemals Süßigkeiten mit Hunden zu teilen',
      'Garten auf heruntergefallene Süßigkeiten von Nachbarskindern überprüfen',
      'Sichere Halloween-Leckerlis für Hunde vorbereiten (Kürbispüree oder spezielle Hundeleckerlis)',
      'Tierärztliche Notfallnummern griffbereit halten — im Voraus vorbereiten',
    ],
    symptoms: [
      'Erbrechen und Durchfall (möglicherweise blutig oder mit Verpackungsfragmenten)',
      'Lethargie, Schwäche oder Zusammenbruch',
      'Zittern, Muskelzuckungen oder Krampfanfälle',
      'Blasses oder gelbliches Zahnfleisch',
      'Erhöhte Herzfrequenz oder Arrhythmie',
      'Bauchschmerzen, Aufblähung oder gekrümmter Rücken',
      'Koordinationsverlust oder schwankender Gang',
    ],
    firstAid: [
      { title: 'Aufgenommenes und Menge identifizieren', content: 'Bestimmen Sie schnell, welche Süßigkeiten Ihr Hund gefressen hat, wie viel und wann. Sammeln Sie alle Verpackungen und übrigen Süßigkeiten. Berechnen Sie den Kakaoanteil, falls Schokolade aufgenommen wurde. Dies hilft dem Tierarzt bei der Risikobewertung.' },
      { title: 'Tierarzt oder Giftnotruf kontaktieren', content: 'Kontaktieren Sie sofort Ihren Tierarzt oder eine 24-Stunden-Tiergift-Hotline. Geben Sie Hundegewicht, Aufgenommenes und geschätzte Menge an. Falls Erbrechen erforderlich ist, muss es innerhalb von 2 Stunden durch einen Tierarzt erfolgen — nicht zu Hause durchführen.' },
      { title: 'Kein Erbrechen zu Hause auslösen', content: 'Hausmittel zum Erbrechen (Wasserstoffperoxid) können gefährlich sein, besonders bei bestimmten Süßigkeitentypen. Xylit-Aufnahme gefolgt von Erbrechen erhöht das Aspirationsrisiko. Spitze Gegenstände (Lutscherstiele) können beim Erbrechen Verletzungen verursachen. Lassen Sie Erbrechen immer durch einen Tierarzt auslösen.' },
      { title: 'Sofort zur tierärztlichen Notaufnahme', content: 'Sammeln Sie alle Verpackungen und übrigen Süßigkeitenproben und fahren Sie sofort zur nächstgelegenen 24-Stunden-Tierklinik. Warten Sie nicht auf Symptome — Schokolade, Xylit und Rosinen verursachen Schäden vor dem Auftreten von Symptomen.' },
    ],
    faqs: [
      { question: 'Ist ein einziger Halloween-Schokoriegel für einen Hund gefährlich?', answer: 'Hängt vom Schokoladentyp und Hundegewicht ab. Ein 5 kg schwerer Chihuahua erreicht eine toxische Dosis mit einem 5 g schweren Riegel dunkler Schokolade (70 % Kakao), während ein 30 kg schwerer Labrador mit einem Milchschokoladenriegel nur leichte Verdauungsprobleme haben kann. Immer einen Tierarzt kontaktieren — nicht raten.' },
      { question: 'Was tun, wenn mein Hund Süßigkeitenverpackungen verschluckt hat?', answer: 'Auf Anzeichen eines Darmverschlusses achten: wiederholtes Erbrechen, Appetitlosigkeit, Schwierigkeiten beim Stuhlgang, Bauchschmerzen. Kleine weiche Verpackungen können durchgehen, aber Alufolie, Plastik und Lutscherstiele erfordern dringende tierärztliche Beurteilung. Im Zweifelsfall Tierarzt konsultieren.' },
      { question: 'Warum sind zuckerfreie Süßigkeiten gefährlicher für Hunde?', answer: 'Zuckerfreie Süßigkeiten enthalten oft Xylit, einen Süßstoff, der für Hunde weitaus giftiger als Schokolade ist. Er verursacht einen drastischen Blutzuckerabfall innerhalb von 30 Minuten, der zu Krampfanfällen, Koma und Leberversagen führen kann. Selbst winzige Mengen Xylit können tödlich sein.' },
      { question: 'Wie schnell treten nach dem Verzehr von Süßigkeiten Symptome auf?', answer: 'Schokoladentoxizitätssymptome treten typischerweise innerhalb von 6–12 Stunden auf. Xylit-Vergiftung kann innerhalb von 30 Minuten Hypoglykämie verursachen. Rosinentoxizitätssymptome können nach 6–24 Stunden auftreten. Verpackungsverschlusssymptome können 24–72 Stunden dauern. Mit oder ohne Symptome — sofort Tierarzt kontaktieren.' },
    ],
    relatedTools: [
      { name: 'Giftige-Lebensmittel-Prüfer', href: 'shared/toxic-checker', description: 'Prüfen Sie, ob ein Lebensmittel für Ihren Hund sicher ist.' },
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Notfälle.' },
      { name: 'Schokoladentoxizitätsrechner', href: 'shared/toxic-checker', description: 'Bewerten Sie das Vergiftungsrisiko nach Gewicht und Schokoladentyp.' },
    ],
  },
  'fireworks-anxiety': {
    title: 'Wie man einen Hund bei Feuerwerk beruhigt: Angstmanagement-Ratgeber',
    description: 'Vollständiger Ratgeber zum Management von Feuerwerksangst bei Hunden — von Präventionsstrategien und Geräuschdesensibilisierung bis zu Beruhigungsprodukten, sicheren Räumen und Medikamentenoptionen.',
    bodyParagraphs: [
      'Feuerwerkslärm ist einer der häufigsten Angstauslöser bei Hunden. Studien zeigen, dass bis zu 45 % der Hunde ein gewisses Maß an Feuerwerksangst zeigen. Das Gehör von Hunden ist etwa 4-mal empfindlicher als unseres — wir hören bis etwa 20 kHz, Hunde bis etwa 45 kHz. Feuerwerk ist nicht nur laut, sondern auch unvorhersehbar und erzeugt einen breiten Frequenzbereich, einschließlich hochfrequenter Knistergeräusche, die wir nicht hören können.',
      'Feuerwerksangst ist nicht nur "Angst haben" — sie kann schwerwiegende körperliche und psychische Folgen haben. Panische Hunde können weglaufen (sehr hohes Verlustrisiko), sich beim Verstecken verletzen, Möbel und Türen zerstören oder sogar Stressdurchfall und -erbrechen entwickeln. Chronischer Stress schwächt das Immunsystem. Der 4. Juli ist der Tag mit den meisten Fundtieren in US-Tierheimen.',
      'Effektives Angstmanagement erfordert eine mehrstufige Strategie: vorherige Vorbereitung (Geräuschdesensibilisierung), Umgebungsmanagement (Schaffung eines sicheren Raums) und bei Bedarf Beruhigungshilfen (Pheromone, Nahrungsergänzungsmittel, Medikamente). Beginnen Sie die Intervention vor dem Beginn des Feuerwerks — zu warten, bis der Hund bereits in Panik ist, macht die Intervention viel weniger effektiv.',
    ],
    knowledgeCards: [
      { title: 'Warum Hunde Angst vor Feuerwerk haben', body: 'Drei Faktoren erklären diese Angst: Lautstärke (4-mal lauter als vom Menschen wahrgenommen), Unvorhersehbarkeit (zufällige Explosionen sind nicht vorhersehbar) und Kontrollverlust (der Hund kann dem Lärm nicht "entkommen"). Diese Faktoren lösen eine evolutionäre Kampf-oder-Flucht-Reaktion aus. Bestimmte Rassen (Border Collie, Australian Shepherd) sind aufgrund ihrer erhöhten Empfindlichkeit gegenüber Umweltreizen anfälliger für Lärmphobien.' },
      { title: 'Geräuschdesensibilisierungstraining', body: 'Das Training beinhaltet das Abspielen von Feuerwerksaufnahmen bei sehr niedriger Lautstärke, die schrittweise erhöht wird, während positive Erfahrungen (Leckerlis, Spiel) gepaart werden. Beginnen Sie bei kaum hörbarer Lautstärke — der Hund muss ruhig bleiben. Erhöhen Sie über mehrere Wochen schrittweise. Schlüsselprinzip: Überschreiten Sie niemals die Komfortschwelle des Hundes. Zeigt er Stressanzeichen, kehren Sie zu einer niedrigeren Lautstärke zurück.' },
      { title: 'Die Rolle des sicheren Raums', body: 'Bereiten Sie einen "sicheren Raum" vor — einen schallisolierten, dunklen und komfortablen Bereich (mit Decken abgedeckte Box, Schrank oder Badezimmer). Verwenden Sie Decken, um Fenster abzudecken und Blitze und Geräusche zu dämpfen. Spielen Sie weißes Rauschen, braunes Rauschen oder klassische Musik, um das Feuerwerk zu übertönen. Gewöhnen Sie den Hund mehrere Wochen vor der Saison an diesen Raum, um positive Assoziationen aufzubauen.' },
      { title: 'Beruhigungsprodukte: Was funktioniert?', body: 'Hunde-Pheromone (DAP/Adaptil) ahmen die von Mutterhündinnen produzierten Beruhigungspheromone nach und wirken bei manchen Hunden. Druckwickel (ThunderShirt) erzeugen eine beruhigende Wirkung durch sanften, konstanten Druck. L-Theanin- und Melatonin-Ergänzungen können unter tierärztlicher Aufsicht verwendet werden. Für schwere Fälle sind verschreibungspflichtige Angstmedikamente (Trazodon, Gabapentin) am wirksamsten.' },
    ],
    prevention: [
      'Beginnen Sie das Geräuschdesensibilisierungstraining mehrere Wochen vor der Feuerwerkssaison',
      'Schaffen Sie einen sicheren "Zufluchtsort" in einem ruhigen Bereich des Hauses',
      'Gehen Sie vor dem Feuerwerk spazieren und füttern Sie — ermüden und sättigen Sie den Hund',
      'Fenster schließen, Vorhänge zuziehen und ein weißes Rauschgerät verwenden',
      'Erwägen Sie einen Druckwickel (ThunderShirt) oder einen Pheromondiffusor',
      'Stellen Sie sicher, dass der Hund ein Halsband mit ID-Anhänger trägt, und überprüfen Sie den Mikrochip',
      'Besprechen Sie Angstmedikamente mit Ihrem Tierarzt vor der Saison',
    ],
    symptoms: [
      'Zittern, Schütteln oder Zusammenkauern',
      'Übermäßiges Hecheln und Speicheln',
      'Verstecken, Fluchtversuche oder Graben',
      'Destruktives Verhalten (Türen kratzen, Möbel beißen)',
      'Bellen, Winseln oder Heulen',
      'Urin- oder Kotinkontinenz',
      'Umherwandern, Unfähigkeit zur Ruhe',
      'Futter- oder Leckerliverweigerung',
    ],
    firstAid: [
      { title: 'Ruhig bleiben — Angst nicht verstärken', content: 'Verhalten Sie sich ruhig und normal. Übermäßiges Trösten kann das Angstverhalten verstärken. Bleiben Sie ruhig, Ihr Hund orientiert sich an Ihrem Verhalten. Verwenden Sie eine ruhige, tiefe Stimme.' },
      { title: 'Zum sicheren Raum führen', content: 'Führen Sie den Hund zum vorbereiteten sicheren Raum. Zwingen Sie ihn nicht — lassen Sie ihn selbst entscheiden, ob er hineingeht. Wenn er sich woanders versteckt (Badezimmer, unter dem Bett), lassen Sie ihn, solange es sicher ist.' },
      { title: 'Beruhigungstechniken anwenden', content: 'Wenn der Hund an das ThunderShirt gewöhnt ist, ziehen Sie es sofort an. Schalten Sie das weiße Rauschgerät ein oder spielen Sie klassische Musik. Bieten Sie einen Kausnack oder ein mit Futter gefülltes Spielzeug an — Kauen ist ein natürliches Stressabbauverhalten bei Hunden.' },
      { title: 'Überwachen und Tierarzt kontaktieren', content: 'Zeigt der Hund extreme Panik (Selbstverletzung, destruktive Flucht, Stressdurchfall), kontaktieren Sie einen Tierarzt. Für zukünftige Ereignisse besprechen Sie verschreibungspflichtige Angstmedikamente — diese sind am wirksamsten, wenn sie vor Beginn der Panik verabreicht werden.' },
    ],
    faqs: [
      { question: 'Kann ich meinem Hund menschliche Beruhigungsmittel geben?', answer: 'Auf keinen Fall. Menschliche Medikamente (Benadryl, Schlaftabletten) haben völlig andere Dosierungen und Wirkungen bei Hunden und können giftig sein. Nur vom Tierarzt verschriebene Medikamente sind sicher. Bei schwerer Feuerwerksangst besprechen Sie Medikamentenoptionen mehrere Wochen im Voraus mit Ihrem Tierarzt.' },
      { question: 'Funktioniert das ThunderShirt wirklich?', answer: 'Studien zeigen, dass etwa 60 % der Hunde mit einem Druckwickel eine Verringerung der Angstsymptome zeigen. Die Wirksamkeit variiert je nach Hund — manche reagieren bemerkenswert gut, andere gar nicht. Der sanfte, konstante Druck aktiviert das parasympathische Nervensystem und erzeugt eine beruhigende Wirkung. Am besten als Teil einer umfassenden Strategie zu verwenden.' },
      { question: 'Sollte ich meinen Hund sich während des Feuerwerks verstecken lassen?', answer: 'Ja, lassen Sie ihn sich verstecken, wenn er möchte. Verstecken ist ein natürlicher Bewältigungsmechanismus. Stellen Sie sicher, dass das Versteck sicher und komfortabel ist — Decken und Wasser bereitstellen. Zwingen Sie niemals einen Hund aus seinem Versteck — das erhöht nur den Stress.' },
      { question: 'Wie lange dauert es, bis ein Hund seine Feuerwerksangst überwindet?', answer: 'Ohne Intervention neigt die Feuerwerksangst dazu, mit dem Alter schlimmer zu werden (Sensibilisierung). Mit angemessenem Desensibilisierungstraining und Verhaltensmodifikation zeigen viele Hunde innerhalb von 4–8 Wochen deutliche Verbesserung. Vollständige "Heilung" ist möglicherweise nicht realistisch — das Ziel ist, die Angst auf ein akzeptables Niveau zu managen.' },
    ],
    relatedTools: [
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Hundenotfälle.' },
    ],
  },
  'spring-allergies': {
    title: 'Frühlingsallergien beim Hund: Symptome, Behandlung und Vorbeugung',
    description: 'Vollständiger Ratgeber zu Frühlingsallergien bei Hunden — Pollen, Gras, Schimmel. Lernen Sie, Symptome zu erkennen, Umweltallergien von Futtermittelallergien zu unterscheiden und Behandlungsoptionen zu kennen.',
    bodyParagraphs: [
      'Frühlingsallergien (atopische Dermatitis) sind eine der häufigsten chronischen Hauterkrankungen bei Hunden und betreffen etwa 10–15 % der Hundepopulation. Anders als beim Menschen äußern sich Allergiesymptome bei Hunden hauptsächlich als Hautprobleme und nicht als Atemwegssymptome. Wenn Umweltallergene (Pollen, Grassamen, Schimmelsporen) mit der Haut des Hundes in Kontakt kommen oder eingeatmet werden, lösen sie eine Immunreaktion aus, die zu starkem Juckreiz, Entzündungen und sekundären Hautinfektionen führt.',
      'Es ist wichtig, saisonale Allergien von ganzjährigen Allergien zu unterscheiden. Wenn Ihr Hund nur im Frühjahr (März–Mai) Symptome zeigt, handelt es sich wahrscheinlich um eine Pollen- oder Grasallergie. Bei ganzjährigen Symptomen können Hausstaubmilben, Schimmel oder Futtermittelallergien die Ursache sein. Häufige Allergene: Baumpollen (Eiche, Birke, Zeder), Gräserpollen (Bermudagras, Wiesenlieschgras), Schimmelsporen und Außeninsekten (Flöhe sind auch im Frühjahr aktiver).',
      'Die Behandlung von Frühlingsallergien erfordert einen mehrgleisigen Ansatz. Erstens: Allergenexposition reduzieren — Aktivitäten im Freien bei hohem Pollenflug einschränken, Hund nach Spaziergängen mit feuchtem Tuch abwischen, Bettwäsche regelmäßig waschen. Zweitens: tierärztlich empfohlene Medikamente — Antihistaminika, Kortikosteroide, Apoquel (Oclacitinib) oder Cytopoint (Lokivetmab)-Injektionen. Drittens: langfristige Strategien — Immuntherapie (Allergieimpfungen) und Supplementierung mit essentiellen Fettsäuren.',
    ],
    knowledgeCards: [
      { title: 'Warum Hundeallergien sich als Hautprobleme zeigen', body: 'Die Hundehaut enthält eine große Anzahl von Mastzellen — diese Immunzellen setzen bei Kontakt mit Allergenen Histamin frei. Anders als beim Menschen (dessen Mastzellen in den Atemwegen konzentriert sind) sind die Mastzellen des Hundes in der gesamten Haut verteilt, was Juckreiz, Rötung und Entzündung statt Niesen und laufender Nase verursacht.' },
      { title: 'Futtermittelallergie vs. Umweltallergie', body: 'Futtermittelallergien sind ganzjährig konstant, während Umweltallergien typischerweise ein saisonales Muster haben. Häufigste Symptome von Futtermittelallergien: chronische Ohrenentzündungen, Analjucken und Magen-Darm-Probleme. Umweltallergien zeigen sich hauptsächlich durch Juckreiz an Gesicht, Pfoten, Bauch und Achseln. Beide können gleichzeitig auftreten — etwa 30 % der atopischen Hunde haben auch eine Futtermittelallergie.' },
      { title: 'Wirkmechanismus von Apoquel und Cytopoint', body: 'Apoquel (Oclacitinib) ist ein Januskinase-Hemmer, der die Juckreiz-Signalübertragung in den Zellen blockiert. Es wirkt innerhalb von 4 Stunden, ideal zur kurzfristigen Kontrolle von Allergieschüben. Cytopoint (Lokivetmab) ist ein monoklonaler Antikörper, der IL-31 (Juckreiz-Zytokin) neutralisiert, eine Injektion hält 4–8 Wochen. Beide sind sicherer als langfristige Kortikosteroidanwendung.' },
      { title: 'Funktionsweise der Immuntherapie', body: 'Die Immuntherapie (Allergieimpfungen) trainiert das Immunsystem des Hundes, Allergene durch schrittweise Exposition gegenüber Allergenextrakten zu tolerieren. Allergietests (Intrakutantest oder Serumtest) sind erforderlich, um spezifische Allergene zu identifizieren. Die Anfangsphase erfordert häufige Injektionen, dann einmal monatlich. Etwa 60–80 % der Hunde zeigen signifikante Verbesserung, typischerweise nach 6–12 Monaten.' },
    ],
    prevention: [
      'Aktivitäten im Freien bei hohem Pollenflug reduzieren (früher Morgen und Abend haben höchste Pollenbelastung)',
      'Pfoten und Körper des Hundes nach jedem Spaziergang mit feuchtem Tuch abwischen',
      'Hundebettwäsche wöchentlich mit heißem Wasser waschen, um Allergene zu entfernen',
      'Luftreiniger mit HEPA-Filter verwenden, um Innenraumallergene zu reduzieren',
      'Rasen kurz halten, Kontakt mit hohem Gras und Unkraut vermeiden',
      'Regelmäßig Flohprävention anwenden — Frühling ist Flohsaison',
      'Omega-3-Fettsäuren zur Ernährung hinzufügen, um die Hautbarriere zu unterstützen',
    ],
    symptoms: [
      'Starker Juckreiz, besonders an Gesicht, Pfoten, Bauch und Achseln',
      'Häufiges Pfotenlecken, das zu rostfarbener Verfärbung führt (Speichelverfärbung)',
      'Hautrötung, Entzündung oder Hautausschlag',
      'Wiederkehrende Ohrenentzündungen oder Ohrenjucken (Kopfschütteln, Ohrenkratzen)',
      'Haarausfall (Alopezie) oder Hautverdickung (Lichenifikation)',
      'Übermäßiges Kratzen führt zu Hautläsionen und Krusten',
      'Sekundäre bakterielle oder Hefepilz-Hautinfektionen (Geruch, fettige Haut)',
      'Rote, tränende Augen oder Augenausfluss',
    ],
    firstAid: [
      { title: 'Mit beruhigendem Shampoo baden', content: 'Verwenden Sie ein mildes, beruhigendes Shampoo mit Hafer, Aloe Vera oder Ceramiden. Mit warmem (nicht heißem) Wasser baden, Shampoo 5–10 Minuten einwirken lassen. Gründlich ausspülen. 1–2 Mal wöchentlich baden kann helfen, Allergene zu entfernen.' },
      { title: 'Schutzkragen verwenden', content: 'Wenn der Hund sich übermäßig kratzt und Hautverletzungen verursacht, einen Schutzkragen oder weichen Halskragen verwenden, um weitere Schäden zu verhindern. Keine engen Kleidungsstücke oder Bandagen verwenden — dies erhöht das Infektionsrisiko.' },
      { title: 'Tierarzt kontaktieren', content: 'Kontaktieren Sie Ihren Tierarzt, um Behandlungsoptionen zu besprechen: Antihistaminika, Apoquel oder Cytopoint-Injektionen. Der Tierarzt wird die richtige Dosierung bestimmen und andere Hautprobleme (Räude, Pilzinfektion) ausschließen.' },
      { title: 'Symptomtagebuch führen', content: 'Notieren Sie, wann Symptome auftreten, deren Schweregrad und mögliche Auslöser (hoher Pollenflug, bestimmte Spaziergebiete). Diese Informationen helfen dem Tierarzt, Allergene zu identifizieren und einen effektiveren Behandlungsplan zu erstellen.' },
    ],
    faqs: [
      { question: 'Kann ich meinem Hund menschliche Antihistaminika geben?', answer: 'Ja, aber nur unter tierärztlicher Aufsicht. Diphenhydramin (Benadryl) wird häufig bei Hunden verwendet, Dosierung 1 mg/lb (2,2 mg/kg), 2–3 Mal täglich. Antihistaminika sind jedoch nur bei etwa 30 % der Hunde wirksam. Verwenden Sie niemals Kombinationsprodukte mit abschwellenden Mitteln oder Paracetamol — diese sind für Hunde giftig.' },
      { question: 'Werden Hundeallergien mit dem Alter schlimmer?', answer: 'Ja, atopische Dermatitis ist typischerweise eine fortschreitende Erkrankung. Die meisten Hunde zeigen erste Symptome zwischen 1–3 Jahren, und die Symptome neigen dazu, mit dem Alter schlimmer zu werden (Sensibilisierung). Frühe Intervention und kontinuierliches Management sind entscheidend, um das Fortschreiten zu verlangsamen und sekundäre Hautinfektionen zu verhindern.' },
      { question: 'Wie unterscheide ich Allergien von Flöhen?', answer: 'Flohallergie konzentriert sich typischerweise auf die hintere Rückenpartie (Rute, Hinterbeine, Bauch). Umweltallergien betreffen eher Gesicht, Pfoten und Bauch. Auf Flohkot (schwarze Krümel, die bei Befeuchtung rot werden) oder lebende Flöhe prüfen. Ein Hund kann beide Allergietypen gleichzeitig haben.' },
      { question: 'Funktionieren Allergiespritzen wirklich?', answer: 'Immuntherapie ist bei etwa 60–80 % der Hunde wirksam, mit signifikanter Verbesserung typischerweise nach 6–12 Monaten sichtbar. Sie zielt auf die Grundursache (das Immunsystem) ab, anstatt nur Symptome zu unterdrücken. Für mittelschwere bis schwere atopische Dermatitis ist es die sicherste und effektivste Langzeitmanagementstrategie. Nicht alle Hunde sind geeignet — vorherige Allergietests sind erforderlich.' },
    ],
    relatedTools: [
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Notfälle.' },
    ],
  },
  'thanksgiving': {
    title: 'Welche Thanksgiving-Lebensmittel Hunde essen dürfen: Sicher-vs-Gefährlich-Ratgeber',
    description: 'Vollständiger Thanksgiving-Lebensmittelsicherheitsratgeber für Hunde — sichere Lebensmittel (naturbelassener Truthahn, Kürbis, grüne Bohnen), gefährliche Lebensmittel (Zwiebelfüllung, Soße, Xylit-Desserts, Knochen).',
    bodyParagraphs: [
      'Thanksgiving ist einer der Tage mit den meisten tierärztlichen Notfallbesuchen in den USA. Manche Tischlebensmittel sind für Hunde sicher, andere tödlich. Truthahn selbst (weißes Fleisch, ohne Haut und Knochen) ist eine ausgezeichnete Proteinquelle, aber Truthahnhaut, Knochen, Zwiebelfüllung, Soße, Knoblauch-Kartoffelpüree und Xylit-Desserts sind gefährlich. Der Schlüssel liegt darin, Sicher von Gefährlich zu unterscheiden.',
      'Die gefährlichsten Thanksgiving-Lebensmittel sind Zwiebeln, Knoblauch, Truthahnknochen, Soße (fettreich + Zwiebeln), Rosinen und Xylit-Desserts. Zwiebeln und Knoblauch enthalten Thiosulfate, die hämolytische Anämie verursachen. Truthahnknochen (besonders gekochte) splittern und können Speiseröhre, Magen oder Darm perforieren. Fettreiche Lebensmittel (Soße, Truthahnhaut) können Pankreatitis auslösen — eine schmerzhafte und potenziell lebensbedrohliche Entzündung.',
      'Sichere Optionen: kleine Stücke naturbelassene Truthahnbrust (ohne Haut, ohne Knochen, ohne Gewürze), gedämpfte grüne Bohnen, gekochtes Kürbispüree (ohne Gewürze, ohne Zucker), naturbelassene Cranberries (kleine Menge), Apfelscheiben (ohne Kerne) und rohe Karotten. Vermeiden Sie immer alles mit Gewürzen, Butter, Knoblauch, Zwiebeln oder Xylit. Selbst sichere Lebensmittel sollten in Maßen gegeben werden — Überfütterung kann Verdauungsprobleme verursachen.',
    ],
    knowledgeCards: [
      { title: 'Truthahn: Sichere und gefährliche Teile', body: 'Sicher: naturbelassene Truthahnbrust (ohne Haut, ohne Knochen, ohne Gewürze). Gefährlich: Truthahnhaut (fettreich → Pankreatitisrisiko), Truthahnknochen (gekocht splittern sie und können den Darm perforieren), dunkles Fleisch (fettreicher als weißes), Truthahnsaft und Füllung (enthalten Zwiebeln, Knoblauch, Fett). Sicherstellen, dass der Truthahn vollständig gekocht ist — rohes Geflügel kann Salmonellen enthalten.' },
      { title: 'Zwiebel- und Knoblauchtoxizität', body: 'Zwiebeln, Knoblauch, Lauch, Schalotten und Schnittlauch (Gattung Allium) enthalten Thiosulfate, die oxidative Schäden an roten Blutkörperchen verursachen. Alle Formen sind giftig: gekocht, roh, getrocknet und pulverisiert. Zwiebelpulver ist besonders konzentriert und gefährlich. Symptome nach 1–5 Tagen: blasses Zahnfleisch, Schwäche, schnelle Atmung, portweinfarbener Urin. Die Toxizität ist kumulativ.' },
      { title: 'Pankreatitisrisiko', body: 'Fettreiche Lebensmittel (Truthahnhaut, Soße, Butter-Kartoffelpüree) können Pankreatitis auslösen — akute Entzündung der Bauchspeicheldrüse. Symptome: starke Bauchschmerzen (gekrümmter Rücken, Gebetsstellung), Erbrechen, Durchfall, Lethargie und Appetitlosigkeit. Pankreatitis kann lebensbedrohlich sein und erfordert Krankenhausaufenthalt. Bestimmte Rassen (Zwergschnauzer, Yorkshire Terrier, Cocker Spaniel) haben eine genetische Veranlagung.' },
      { title: 'Xylit in Thanksgiving-Desserts', body: 'Viele "zuckerfreie" oder "zuckerreduzierte" Thanksgiving-Desserts enthalten Xylit — einen für Hunde extrem giftigen Süßstoff. Er findet sich in zuckerfreien Kuchen, Eiscreme, Backwaren und mancher Erdnussbutter. Er verursacht innerhalb von 30 Minuten schwere Hypoglykämie und bei hohen Dosen Leberversagen. Weniger als 1 g Xylit kann für einen 10 kg schweren Hund toxisch sein.' },
    ],
    prevention: [
      'Lebensmittel in der Tischmitte und auf Arbeitsflächen außer Reichweite des Hundes aufbewahren',
      'Mülleimer mit Deckel verwenden — das Truthahngerippe ist für Hunde unwiderstehlich',
      'Gäste informieren: "Füttern Sie den Hund nicht"',
      'Einen speziellen sicheren Thanksgiving-Teller für Ihren Hund vorbereiten (naturbelassener Truthahn + grüne Bohnen + Kürbispüree)',
      'Absperrgitter oder Leine während des Kochens und Essens verwenden, um Küchendiebstahl zu verhindern',
      'Alles, was auf den Boden fällt, sofort aufheben — Zwiebeln, Rosinen, Schokoladenkrümel',
      'Desserts hoch oben aufbewahren — zuckerfreie Desserts mit Xylit sind für Hunde tödlich',
    ],
    symptoms: [
      'Erbrechen und Durchfall (möglicherweise blutig)',
      'Lethargie, Schwäche oder Zusammenbruch',
      'Blasses oder gelbliches Zahnfleisch (Zwiebeltoxizität)',
      'Bauchschmerzen (gekrümmter Rücken, Gebetsstellung, Berührungsverweigerung)',
      'Appetitlosigkeit oder Futterverweigerung',
      'Zittern, Krampfanfälle oder erhöhte Herzfrequenz',
      'Dunkler Urin (portweinfarben, deutet auf Zerstörung roter Blutkörperchen hin)',
    ],
    firstAid: [
      { title: 'Aufgenommenes und Menge identifizieren', content: 'Bestimmen Sie, was Ihr Hund gefressen hat, wie viel und wann. Bewahren Sie Lebensmittelproben auf. Besondere Aufmerksamkeit auf Aufnahme von Zwiebeln, Knoblauch, Rosinen, Schokolade, Xylit und Truthahnknochen.' },
      { title: 'Tierarzt oder Giftnotruf kontaktieren', content: 'Kontaktieren Sie sofort einen Tierarzt oder eine Tiergift-Hotline. Geben Sie Hundegewicht und Aufnahmedetails an. Wenn Zwiebeln, Rosinen, Xylit oder große Mengen Schokolade aufgenommen wurden, informieren Sie den Tierarzt — dies erfordert sofortige Behandlung.' },
      { title: 'Kein Erbrechen auslösen (außer auf tierärztliche Anweisung)', content: 'Wenn der Hund Truthahnknochen oder scharfe Gegenstände verschluckt hat, würde Erbrechen die Verletzungen verschlimmern. Bei Xylit-Aufnahme erhöht Erbrechen das Aspirationsrisiko. Warten Sie immer auf tierärztliche Anweisungen.' },
      { title: 'Zur tierärztlichen Notaufnahme fahren', content: 'Sammeln Sie alle übrigen Lebensmittelproben und Verpackungen und fahren Sie sofort zur nächstgelegenen 24-Stunden-Tierklinik. Warten Sie nicht auf Symptome — viele Toxine (Zwiebeln, Rosinen) verursachen Schäden vor dem Auftreten von Symptomen.' },
    ],
    faqs: [
      { question: 'Kann ich meinem Hund Truthahn geben?', answer: 'Ja, aber nur naturbelassene Truthahnbrust — ohne Haut, ohne Knochen, ohne Gewürze und ohne Soße. Die Haut ist fettreich und kann Pankreatitis verursachen. Knochen (besonders gekochte) splittern und können den Darm perforieren. Dunkles Fleisch ist fettreicher als weißes. Eine kleine Menge (etwa 30–60 g) ist als Leckerli sicher.' },
      { question: 'Ist Kartoffelpüree für Hunde sicher?', answer: 'In der Regel nicht. Thanksgiving-Kartoffelpüree enthält oft Butter, Sahne, Knoblauch oder Zwiebeln — alles schädlich für Hunde. Naturbelassene gekochte Kartoffeln (ohne Gewürze) sind sicher, aber wenig nahrhaft. Kartoffelpüree mit Knoblauch oder Zwiebeln kann hämolytische Anämie verursachen.' },
      { question: 'Dürfen Hunde Kürbiskuchen essen?', answer: 'Nein. Kürbiskuchen enthält Zucker, Gewürze (wie Muskatnuss, giftig für Hunde), Butter und möglicherweise zuckerfreie Süßstoffe mit Xylit. Naturbelassenes Kürbispüree (ohne Gewürze, ohne Zucker) ist sicher, aber nicht der Kuchen selbst.' },
      { question: 'Was tun, wenn mein Hund Zwiebelfüllung gefressen hat?', answer: 'Sofort Tierarzt kontaktieren. Zwiebelfüllung enthält konzentrierte Zwiebeln und Knoblauch, die hochgiftig sind. Symptome können erst nach 1–5 Tagen auftreten, aber die Schäden beginnen sofort. Der Tierarzt muss möglicherweise Erbrechen auslösen (innerhalb von 2 Stunden), Aktivkohle verabreichen und intravenöse Flüssigkeiten geben.' },
    ],
    relatedTools: [
      { name: 'Giftige-Lebensmittel-Prüfer', href: 'shared/toxic-checker', description: 'Prüfen Sie, ob ein Lebensmittel für Ihren Hund sicher ist.' },
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Notfälle.' },
      { name: 'Kalorienrechner', href: 'dog/dog-calorie-calculator', description: 'Berechnen Sie die ideale tägliche Kalorienzufuhr.' },
    ],
  },
  'easter-chocolate': {
    title: 'Osterschokolade und Hunde: Sicherheit bei der Ostereiersuche',
    description: 'Ratgeber zur Osterschokoladentoxizität für Hundehalter — Theobromin-Vergiftungsschwellen, Toxizitätsstufen nach Schokoladentyp, Symptome und Notfallmaßnahmen.',
    bodyParagraphs: [
      'Ostern ist eine der Hauptzeiten für Schokoladenvergiftungen bei Hunden. Ostereier, Schokoladenhasen und Süßigkeiten sind überall, oft in Reichweite von Hunden. Ostereier sind meist aus Milchschokolade, aber dunkle Schokoladeneier und "Premium"-Schokoladenhasen haben einen höheren Kakaoanteil und sind giftiger. Die Ostereiersuche ist besonders gefährlich — versteckte Schokoladeneier können von Hunden gefunden und gefressen werden.',
      'Die Schokoladentoxizität hängt von drei Faktoren ab: Schokoladentyp (Kakaoanteil), Hundegewicht und aufgenommene Menge. Theobromin und Koffein sind die giftigen Bestandteile. Milchschokolade enthält etwa 2 mg Theobromin pro Gramm, während dunkle Schokolade (70 % Kakao) 15–20 mg pro Gramm enthält. Ein 10 kg schwerer Hund erreicht eine toxische Dosis mit 14 g dunkler Schokolade oder 100 g Milchschokolade. Mini-Ostereier wiegen jeweils etwa 5–10 g.',
      'Vorbeugung ist die einzige Garantie. Am Ostermorgen sicherstellen, dass alle Schokoladeneier eingesammelt wurden, bevor der Hund den Raum betritt. Schokoladenhasen hoch oben in Schränken aufbewahren. Hund während der Eiersuche drinnen oder an der Leine halten. Kinder erziehen: Schokolade ist kein Hundeleckerli. Bei versehentlicher Aufnahme sofort handeln — Tierarzt oder Tiergift-Hotline kontaktieren.',
    ],
    knowledgeCards: [
      { title: 'Mechanismus der Schokoladentoxizität', body: 'Theobromin und Koffein in Schokolade sind Methylxanthine, die das Zentralnervensystem und das Herz-Kreislauf-System stimulieren. Hunde können diese Verbindungen schwer abbauen — die Halbwertszeit beträgt beim Menschen 2–3 Stunden, beim Hund 17 Stunden. Dies führt zu toxischer Akkumulation, kontinuierlicher Stimulation von Herz und Nervensystem, was zu Arrhythmie, Krampfanfällen und Tod führen kann.' },
      { title: 'Toxizität nach Schokoladentyp', body: 'Kakaopulver (Backschokolade) ist am giftigsten: 20–26 mg Theobromin pro Gramm. Dunkle Schokolade (70–85 % Kakao): 15–20 mg/g. Halbsüße Schokolade: 5–10 mg/g. Milchschokolade: 1,5–2 mg/g. Weiße Schokolade enthält fast kein Theobromin, aber der hohe Fettgehalt kann Pankreatitis verursachen. Ostereier sind meist Milchschokolade, aber "Premium"-Eier können dunkle Schokolade sein.' },
      { title: 'Toxische Dosen', body: 'Leichte toxische Dosis (Erbrechen, Durchfall): 20 mg Theobromin/kg. Mittelschwere Dosis (Tachykardie): 40 mg/kg. Schwere Dosis (Krampfanfälle): 60 mg/kg. Für einen 10 kg schweren Hund bedeutet dies: leichte Toxizität = 100 g Milchschokolade oder 14 g dunkle Schokolade; schwere Toxizität = 300 g Milchschokolade oder 40 g dunkle Schokolade.' },
      { title: 'Warum Ostern für Hunde besonders gefährlich ist', body: 'Ostern kombiniert mehrere Risikofaktoren: große Mengen Schokolade in der ganzen Wohnung verteilt, Eier auf Bodenhöhe versteckt, Kinder, die möglicherweise unbeabsichtigt Süßigkeiten teilen, und Frühlingsaktivitäten im Freien, die Hunde versteckten Schokoladen aussetzen. Die Eiersuche ist besonders gefährlich — Hunde finden Schokoladeneier mit ihrer Nase viel schneller als Menschen.' },
    ],
    prevention: [
      'Am Ostermorgen sicherstellen, dass alle Schokoladeneier eingesammelt wurden, bevor der Hund den Raum betritt',
      'Schokoladenhasen und Süßigkeiten hoch oben aufbewahren — nicht auf Couchtischen oder Fensterbänken',
      'Hund während der Ostereiersuche drinnen oder an der Leine halten',
      'Garten nach der Eiersuche gründlich inspizieren — keine Schokoladeneier dürfen zurückbleiben',
      'Kinder erziehen: Schokolade ist nicht für Hunde — auch nicht "ein kleines bisschen"',
      'Sichere Osterleckerlis für Hunde vorbereiten (Karottensticks oder spezielle Hundeleckerlis)',
      'Tierärztliche Notfall- und Giftnotrufnummern griffbereit halten',
    ],
    symptoms: [
      'Erbrechen und Durchfall (möglicherweise mit Schokoladenresten)',
      'Übererregung, Hyperaktivität oder Ruhelosigkeit',
      'Erhöhte Herzfrequenz oder Arrhythmie',
      'Muskelzittern oder -zuckungen',
      'Übermäßiges Hecheln und schnelle Atmung',
      'Erhöhte Körpertemperatur (Hyperthermie)',
      'Krampfanfälle oder Zusammenbruch',
    ],
    firstAid: [
      { title: 'Aufgenommenen Typ und Menge identifizieren', content: 'Bestimmen Sie, welche Art von Schokolade Ihr Hund gefressen hat, wie viel und wann. Bewahren Sie Verpackungen auf, um den Kakaoanteil zu prüfen. Berechnen Sie die mögliche Theobromindosis (mg/kg). Wenn mehrere Eier gefressen wurden, schätzen Sie die Gesamtmenge.' },
      { title: 'Tierarzt oder Giftnotruf kontaktieren', content: 'Kontaktieren Sie sofort einen Tierarzt oder eine Tiergift-Hotline (ASPCA: 888-426-4435). Geben Sie Hundegewicht, Schokoladentyp und geschätzte Menge an. Der Tierarzt berechnet das Risiko und empfiehlt das weitere Vorgehen.' },
      { title: 'Anweisungen des Tierarztes zum Erbrechen befolgen', content: 'Wenn der Tierarzt Erbrechen empfiehlt, muss dies innerhalb von 2 Stunden nach der Aufnahme erfolgen. Der Tierarzt verwendet ein sicheres Medikament (Apomorphin). Kein Erbrechen zu Hause mit Wasserstoffperoxid auslösen — falsche Dosierung kann gefährlich sein.' },
      { title: 'Überwachen und tierärztliche Hilfe suchen', content: 'Auch wenn der Hund normal erscheint, können Schokoladenvergiftungssymptome 6–12 Stunden später auftreten. Wenn der Tierarzt häusliche Beobachtung empfiehlt, genau überwachen. Bei Auftreten von Symptomen (Erbrechen, Hyperaktivität, Zittern, Tachykardie) sofort zur tierärztlichen Notaufnahme.' },
    ],
    faqs: [
      { question: 'Ist ein einziges Osterei für einen Hund gefährlich?', answer: 'Hängt von der Eigröße, dem Schokoladentyp und dem Hundegewicht ab. Ein 5 g schweres Milchschokoladenei ist für einen 30 kg schweren Hund wahrscheinlich harmlos, kann aber für einen 3 kg schweren Chihuahua toxisch sein. Dunkle Schokoladeneier stellen ein höheres Risiko für alle Größen dar. Immer einen Tierarzt konsultieren.' },
      { question: 'Wie schnell treten nach dem Verzehr von Schokolade Symptome auf?', answer: 'Frühe Symptome (Erbrechen, Durchfall) treten typischerweise innerhalb von 2–4 Stunden auf. Neurologische Symptome (Zittern, Hyperaktivität, Krampfanfälle) können nach 6–12 Stunden auftreten. Aufgrund des langsamen Theobrominabbaus (Halbwertszeit 17 Stunden) können Symptome 24–72 Stunden anhalten.' },
      { question: 'Ist weiße Schokolade für Hunde sicher?', answer: 'Weiße Schokolade enthält fast kein Theobromin und verursacht daher keine klassische Schokoladenvergiftung. Ihr hoher Fettgehalt kann jedoch Pankreatitis auslösen — eine schmerzhafte und potenziell lebensbedrohliche Erkrankung. Zudem wird weiße Schokolade oft mit xylithaltigen Süßstoffen gemischt. Es wird empfohlen, jegliche Schokolade zu vermeiden.' },
      { question: 'Sollte ich meinen Hund zum Erbrechen bringen?', answer: 'Nur auf ausdrückliche Anweisung des Tierarztes. Der Tierarzt bewertet die Situation und entscheidet, ob Erbrechen sicher ist. Wenn der Hund bereits Symptome zeigt (Krampfanfälle), erhöht Erbrechen das Aspirationsrisiko. Hausgemachtes Erbrechen (Wasserstoffperoxid) kann gefährlich sein — lassen Sie dies immer vom Tierarzt durchführen.' },
    ],
    relatedTools: [
      { name: 'Giftige-Lebensmittel-Prüfer', href: 'shared/toxic-checker', description: 'Prüfen Sie, ob ein Lebensmittel für Ihren Hund sicher ist.' },
      { name: 'Hunde-Notfallratgeber', href: 'dog/emergency', description: 'Schritt-für-Schritt-Anleitung für häufige Notfälle.' },
    ],
  },
});
console.log('German translations applied');