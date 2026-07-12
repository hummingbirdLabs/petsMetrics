/**
 * Complete i18n fix - makes en.json the superset baseline, then syncs all locales
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

// Read all locales
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));
const data = {};
for (const file of files) {
  const locale = file.replace('.json', '');
  data[locale] = readJson(path.join(messagesDir, file));
}

// Step 1: Collect union of all keys
const allKeys = new Set();
for (const locale of Object.keys(data)) {
  const keys = getAllKeys(data[locale]);
  keys.forEach(k => allKeys.add(k));
}
console.log(`Union of all keys across all locales: ${allKeys.size}`);

// Step 2: Add missing keys to en.json from other locales
const en = data['en'];
const enKeys = getAllKeys(en);
const enMissing = [...allKeys].filter(k => !enKeys.has(k));
console.log(`Keys missing from en.json: ${enMissing.length}`);

for (const k of enMissing) {
  // Find value from any locale that has it
  for (const locale of Object.keys(data)) {
    if (locale === 'en') continue;
    const val = getNestedValue(data[locale], k);
    if (val !== undefined) {
      setNestedValue(en, k, val);
      break;
    }
  }
}

// Write updated en.json
fs.writeFileSync(path.join(messagesDir, 'en.json'), JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log(`Updated en.json: now has ${getAllKeys(en).size} keys`);

// Step 3: Sync all other locales to en.json
console.log('\n=== Syncing locales ===');
for (const locale of Object.keys(data)) {
  if (locale === 'en') continue;
  const obj = data[locale];
  const keys = getAllKeys(obj);
  
  // Remove extra keys
  const extraKeys = [...keys].filter(k => !allKeys.has(k));
  for (const k of extraKeys) {
    deleteNestedKey(obj, k);
  }
  
  // Add missing keys from en.json
  const missingKeys = [...allKeys].filter(k => !getAllKeys(obj).has(k));
  for (const k of missingKeys) {
    const enVal = getNestedValue(en, k);
    if (enVal !== undefined) {
      setNestedValue(obj, k, enVal);
    }
  }
  
  // Write back
  fs.writeFileSync(path.join(messagesDir, `${locale}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf-8');
  
  const finalKeys = getAllKeys(obj);
  const finalMissing = [...allKeys].filter(k => !finalKeys.has(k));
  const finalExtra = [...finalKeys].filter(k => !allKeys.has(k));
  console.log(`  ${locale}: ${finalMissing.length} missing, ${finalExtra.length} extra`);
}

// Step 4: Count English values in non-English locales
console.log('\n=== English values in non-English locales ===');
const updatedEn = readJson(path.join(messagesDir, 'en.json'));
const updatedEnKeys = getAllKeys(updatedEn);

// Universal keys
const universalKeys = new Set([
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber',
  'emergency.shared.aspcaLink', 'common.unit.kcal', 'common.notFound.title',
  'dog.breedContent.breeds.labrador.name', 'dog.breedContent.breeds.goldenRetriever.name',
  'euTravel.documents.microchip', 'compare.microchipVsTattoo.topicAName',
]);

for (const locale of Object.keys(data)) {
  if (locale === 'en') continue;
  const obj = readJson(path.join(messagesDir, `${locale}.json`));
  let count = 0;
  for (const k of updatedEnKeys) {
    const enVal = getNestedValue(updatedEn, k);
    const locVal = getNestedValue(obj, k);
    if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2 && !universalKeys.has(k)) {
      count++;
    }
  }
  console.log(`  ${locale}: ${count} English values`);
}

console.log('\nDone!');