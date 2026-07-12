/**
 * Final i18n fix - translates remaining English values for de, nl, fr, hi
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

// Translation maps for remaining English keys
const translations = {
  de: {
    // Common labels
    'common.optional': 'Optional',
    'common.senior': 'Senior',
    'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
    'compare.dimension': 'Dimension',
    // 4 new compare sections
    'compare.harnessVsCollar.title': 'Hundegeschirr vs Halsband: Was ist richtig?',
    'compare.harnessVsCollar.topicAName': 'Rückenschnallengeschirr',
    'compare.harnessVsCollar.topicBName': 'Flaches Halsband',
    'compare.harnessVsCollar.topicB.bestFor': 'Ruhige Spaziergänger, gut trainierte Hunde, die nicht ziehen, und für das dauerhafte Tragen von ID-Marken.',
    'compare.petInsuranceVsEmergencyFund.title': 'Tierkrankenversicherung vs Notfallfonds: Was ist besser?',
    'compare.petInsuranceVsEmergencyFund.topicAName': 'Tierkrankenversicherung',
    'compare.petInsuranceVsEmergencyFund.topicBName': 'Selbstfinanzierte Notfallreserve',
    'compare.petInsuranceVsEmergencyFund.topicB.bestFor': 'Besitzer mit starker finanzieller Disziplin, ältere Haustiere mit Vorerkrankungen und als Ergänzung zu einer Versicherung mit hohem Selbstbehalt.',
    'compare.grainFreeVsWholeGrain.title': 'Getreidefrei vs Vollkorn-Hundefutter: Was ist gesünder?',
    'compare.grainFreeVsWholeGrain.topicAName': 'Getreidefreie Ernährung',
    'compare.grainFreeVsWholeGrain.topicBName': 'Vollkorn-Ernährung',
    'compare.scratchingPostVsCatTree.title': 'Kratzbaum vs Katzenbaum: Was braucht Ihre Katze?',
    'compare.scratchingPostVsCatTree.topicAName': 'Kratzbaum (einzeln)',
    'compare.scratchingPostVsCatTree.topicBName': 'Katzenbaum (mehrstöckig)',
    // Breed names
    'dog.breedContent.breeds.germanShepherd.name': 'Deutscher Schäferhund',
    'dog.breedContent.breeds.frenchBulldog.name': 'Französische Bulldogge',
    // Labels
    'dogAge.form.monthsOptional': 'plus (optional):',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'dogAge.scienceSection.aaGuidelines': 'AAHA Lebensphasen-Richtlinien',
    'catAge.scienceSection.aafpGuidelines': 'AAHA/AAFP Lebensphasen-Richtlinien für Katzen',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'vaccination.result.tableStatus': 'Status',
    'catBcs.bcsOptions.5': 'Ideal',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    // Risk levels
    'emergency.shared.riskLevel.high': 'Hoch',
    'emergency.shared.riskLevel.critical': 'KRITISCH',
    'emergency.shared.riskLevel.moderate': 'Mittel',
    'emergency.shared.riskLevel.low': 'Niedrig',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'Theobromin-Gehalt',
  },
  nl: {
    // Common labels
    'common.optional': 'Optioneel',
    'common.senior': 'Senior',
    'common.sidebar.catBcs.ideal': 'Ideaal: 4-5/9',
    'compare.dimension': 'Dimensie',
    // 4 new compare sections
    'compare.harnessVsCollar.title': 'Hondentuig vs Halsband: Wat is juist?',
    'compare.harnessVsCollar.topicAName': 'Rugclip-tuig',
    'compare.harnessVsCollar.topicBName': 'Plat halsband',
    'compare.harnessVsCollar.topicB.bestFor': 'Rustige wandelaars, goed getrainde honden die niet trekken, en voor permanent dragen van ID-tags.',
    'compare.petInsuranceVsEmergencyFund.title': 'Huisdierenverzekering vs Noodfonds: Wat is beter?',
    'compare.petInsuranceVsEmergencyFund.topicAName': 'Huisdierenverzekering',
    'compare.petInsuranceVsEmergencyFund.topicBName': 'Zelfgefinancierde noodreserve',
    'compare.petInsuranceVsEmergencyFund.topicB.bestFor': 'Eigenaren met sterke financiële discipline, oudere huisdieren met bestaande aandoeningen, en als aanvulling op een verzekering met hoog eigen risico.',
    'compare.grainFreeVsWholeGrain.title': 'Graanvrij vs Volkoren Hondenvoer: Wat is gezonder?',
    'compare.grainFreeVsWholeGrain.topicAName': 'Graanvrij dieet',
    'compare.grainFreeVsWholeGrain.topicBName': 'Volkoren dieet',
    'compare.scratchingPostVsCatTree.title': 'Krabpaal vs Kattenboom: Wat heeft je kat nodig?',
    'compare.scratchingPostVsCatTree.topicAName': 'Krabpaal (zelfstandig)',
    'compare.scratchingPostVsCatTree.topicBName': 'Kattenboom (meerdere niveaus)',
    // Breed names
    'dog.breedContent.breeds.germanShepherd.name': 'Duitse Herder',
    'dog.breedContent.breeds.frenchBulldog.name': 'Franse Bulldog',
    // Labels
    'dogAge.form.monthsOptional': 'plus (optioneel):',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'dogAge.scienceSection.aaGuidelines': 'AAHA Levensfase Richtlijnen',
    'catAge.scienceSection.aafpGuidelines': 'AAHA/AAFP Levensfase Richtlijnen voor Katten',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'vaccination.result.tableStatus': 'Status',
    'catBcs.bcsOptions.5': 'Ideaal',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    // Risk levels
    'emergency.shared.riskLevel.high': 'Hoog',
    'emergency.shared.riskLevel.critical': 'KRITIEK',
    'emergency.shared.riskLevel.moderate': 'Matig',
    'emergency.shared.riskLevel.low': 'Laag',
    'emergency.ateChocolate.riskAssessment.headers.theobromine': 'Theobromine-niveau',
    // Other labels
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

// Also handle universal keys that are same in all languages
const universalKeys = new Set([
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber', 'emergency.shared.aspcaLink',
  'common.unit.kcal', 'common.notFound.title',
]);

function applyTranslations(locale, transMap) {
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

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
  return applied;
}

// Process de and nl
console.log('=== Applying translations ===');
for (const locale of ['de', 'nl']) {
  const trans = translations[locale] || {};
  const applied = applyTranslations(locale, trans);
  console.log(`${locale}: ${applied} translations applied`);
}

// Count remaining English values
console.log('\n=== Remaining English values ===');
for (const locale of ['de', 'nl', 'fr', 'hi']) {
  const obj = readJson(path.join(messagesDir, `${locale}.json`));
  const enKeys = Object.keys(translations[locale] || {}).length > 0 ? 
    Object.keys(translations[locale]) : [];
  
  let count = 0;
  const allKeys = new Set();
  function collectKeys(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        collectKeys(value, fullKey);
      } else {
        allKeys.add(fullKey);
      }
    }
  }
  collectKeys(obj);
  
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