/**
 * Output remaining English keys for a locale
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

// Universal keys
const universalKeys = new Set([
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber',
  'emergency.shared.aspcaLink', 'common.unit.kcal', 'common.notFound.title',
  'dog.breedContent.breeds.labrador.name', 'dog.breedContent.breeds.goldenRetriever.name',
  'euTravel.documents.microchip', 'compare.microchipVsTattoo.topicAName',
]);

const en = readJson(path.join(messagesDir, 'en.json'));

const locale = process.argv[2];
if (!locale) { console.log('Usage: node i18n-english.js <locale>'); process.exit(1); }

const obj = readJson(path.join(messagesDir, `${locale}.json`));
const keys = getAllKeys(obj);

let count = 0;
for (const k of keys) {
  const enVal = getNestedValue(en, k);
  const locVal = getNestedValue(obj, k);
  if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2) {
    if (!universalKeys.has(k)) {
      console.log(`${k}: "${enVal.substring(0, 100)}"`);
      count++;
    }
  }
}
console.log(`\nTotal: ${count} English keys`);