/**
 * i18n Repair Script - Fixes all language files
 * Syncs keys with en.json and translates English-only values
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

function deleteNestedKey(obj, dottedKey) {
  const parts = dottedKey.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current)) return;
    current = current[parts[i]];
  }
  delete current[parts[parts.length - 1]];
}

function getAllKeys(obj, prefix = '') {
  const keys = new Set();
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const subKeys = getAllKeys(value, fullKey);
      subKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }
  return keys;
}

// Translation maps for keys that genuinely need translation
const translations = {
  zh: {},
  ar: {
    'header.logoAlt': 'شعار petsMetrics',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
  },
  ko: {
    'header.logoAlt': 'petsMetrics 로고',
  },
  ru: {
    'header.logoAlt': 'Логотип petsMetrics',
    'home.featuredTool.emergencyPhone': 'Контроль отравлений ASPCA: (888) 426-4435',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'emergency.atePlastic.toxicityData.source': 'Ветеринарный справочник Merck, ASPCA',
  },
  ja: {
    'header.logoAlt': 'petsMetrics ロゴ',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'footer.copyright': '© petsMetrics. 無断転載禁止。',
    'puppyGrowth.result.predictedRange': '{min}～{max} kg',
    'catBcs.result.bcsScore': 'BCS {score}/9',
  },
  pt: {
    'header.logoAlt': 'Logotipo petsMetrics',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
    'catBcs.bcsOptions.5': 'Ideal',
    'vaccination.result.tableStatus': 'Status',
    'home.hero.cardPetName': 'Buddy',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
  },
  es: {
    'header.logoAlt': 'Logotipo de petsMetrics',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
    'catBcs.bcsOptions.5': 'Ideal',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    'home.hero.cardPetName': 'Buddy',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'emergency.atePlastic.toxicityData.source': 'Merck Veterinary Manual, ASPCA',
  },
  de: {
    'header.logoAlt': 'petsMetrics Logo',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'footer.copyright': '© petsMetrics. Alle Rechte vorbehalten.',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    'catBcs.bcsOptions.5': 'Ideal',
    'common.sidebar.catBcs.ideal': 'Ideal: 4-5/9',
    'vaccination.result.tableStatus': 'Status',
    'home.hero.cardPetName': 'Bello',
    'home.featuredTool.emergencyPhone': 'ASPCA Giftnotruf: (888) 426-4435',
    'common.breadcrumb.home': 'Startseite',
    'nav.home': 'Startseite',
    'profile.breadcrumb.home': 'Startseite',
  },
  nl: {
    'header.logoAlt': 'petsMetrics Logo',
    'dogAge.lifeStage.cardTitle': '{stage} — {stageName}',
    'footer.copyright': '© petsMetrics. Alle rechten voorbehouden.',
    'puppyGrowth.result.predictedRange': '{min} – {max} kg',
    'catBcs.result.bcsScore': 'BCS {score}/9',
    'catBcs.bcsOptions.5': 'Ideaal',
    'common.sidebar.catBcs.ideal': 'Ideaal: 4-5/9',
    'vaccination.result.tableStatus': 'Status',
    'home.hero.cardPetName': 'Max',
    'home.featuredTool.emergencyPhone': 'ASPCA Vergiftigingencentrum: (888) 426-4435',
    'common.breadcrumb.home': 'Home',
    'nav.home': 'Home',
    'profile.breadcrumb.home': 'Home',
    'common.toolCtaAriaLabel': 'Call-to-action voor tool',
  },
};

// Keys that are universal (phone numbers, URLs, units, proper names)
const universalKeys = new Set([
  'toxicLanding.aspcaNumber',
  'toxicLanding.petPoisonNumber',
  'emergency.shared.aspcaLink',
  'common.unit.kcal',
  'common.notFound.title',
  'dog.breedContent.breeds.labrador.name',
  'dog.breedContent.breeds.goldenRetriever.name',
  'euTravel.documents.microchip',
  'compare.microchipVsTattoo.topicAName',
]);

// Read baseline
const en = readJson(path.join(messagesDir, 'en.json'));
const enKeys = getAllKeys(en);

function fixLocale(locale) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  let obj = readJson(filePath);
  const keys = getAllKeys(obj);
  let fixed = 0;

  // 1. Remove extra keys
  const extraKeys = [...keys].filter(k => !enKeys.has(k));
  for (const k of extraKeys) {
    deleteNestedKey(obj, k);
    fixed++;
  }
  if (extraKeys.length > 0) {
    console.log(`  Removed ${extraKeys.length} extra keys`);
  }

  // 2. Add missing keys from en.json
  const missingKeys = [...enKeys].filter(k => !getAllKeys(obj).has(k));
  for (const k of missingKeys) {
    const enVal = getNestedValue(en, k);
    if (enVal !== undefined) {
      setNestedValue(obj, k, enVal);
      fixed++;
    }
  }
  if (missingKeys.length > 0) {
    console.log(`  Added ${missingKeys.length} missing keys`);
  }

  // 3. Apply translations for known keys
  const localeTrans = translations[locale] || {};
  let translated = 0;
  for (const [k, v] of Object.entries(localeTrans)) {
    if (enKeys.has(k)) {
      const currentVal = getNestedValue(obj, k);
      const enVal = getNestedValue(en, k);
      if (currentVal === undefined || currentVal === enVal) {
        setNestedValue(obj, k, v);
        translated++;
      }
    }
  }
  if (translated > 0) {
    console.log(`  Translated ${translated} keys`);
  }

  // 4. Count remaining English values
  const currentKeys = getAllKeys(obj);
  let remainingEnglish = 0;
  for (const k of currentKeys) {
    const enVal = getNestedValue(en, k);
    const locVal = getNestedValue(obj, k);
    if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2) {
      if (!universalKeys.has(k) && !(localeTrans[k])) {
        remainingEnglish++;
      }
    }
  }
  if (remainingEnglish > 0) {
    console.log(`  Remaining English: ${remainingEnglish} keys`);
  }

  // Write back
  const output = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(filePath, output, 'utf-8');

  // Final verification
  const finalObj = readJson(filePath);
  const finalKeys = getAllKeys(finalObj);
  const finalMissing = [...enKeys].filter(k => !finalKeys.has(k));
  const finalExtra = [...finalKeys].filter(k => !enKeys.has(k));

  console.log(`  Result: ${finalMissing.length} missing, ${finalExtra.length} extra, ${remainingEnglish} English`);
  return { locale, fixed, missing: finalMissing.length, extra: finalExtra.length, remainingEnglish };
}

// Main
const targetLocale = process.argv[2];
const locales = targetLocale ? [targetLocale] : ['zh', 'ar', 'ko', 'ru', 'ja', 'pt', 'es', 'de', 'nl'];

console.log('=== i18n Repair ===\n');
console.log(`Baseline: en.json has ${enKeys.size} keys\n`);

const results = [];
for (const locale of locales) {
  if (locale === 'en') continue;
  console.log(`--- ${locale} ---`);
  const result = fixLocale(locale);
  results.push(result);
}

console.log('\n=== Summary ===');
console.log('| Locale | Fixed | Missing | Extra | English |');
console.log('|--------|-------|---------|-------|---------|');
for (const r of results) {
  console.log(`| ${r.locale} | ${r.fixed} | ${r.missing} | ${r.extra} | ${r.remainingEnglish} |`);
}
console.log('\nDone! Run "pnpm typecheck" to verify.');