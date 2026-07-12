const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

function readJson(filePath) {
  let raw = fs.readFileSync(filePath, 'utf-8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  return JSON.parse(raw);
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

// Read all data
const data = {};
for (const file of files) {
  const locale = file.replace('.json', '');
  data[locale] = readJson(path.join(messagesDir, file));
}

const en = data['en'];
const enKeys = getAllKeys(en);

// Process each non-English locale
const targetLocale = process.argv[2];

if (targetLocale) {
  processLocale(targetLocale);
} else {
  // Print summary for all
  for (const file of files) {
    const locale = file.replace('.json', '');
    if (locale === 'en') continue;
    processLocale(locale);
  }
}

function processLocale(locale) {
  const obj = data[locale];
  const keys = getAllKeys(obj);
  
  const missingKeys = [...enKeys].filter(k => !keys.has(k));
  const extraKeys = [...keys].filter(k => !enKeys.has(k));
  
  // Find untranslated (English) keys
  const untranslated = [];
  for (const k of keys) {
    const enVal = getNestedValue(en, k);
    const locVal = getNestedValue(obj, k);
    if (typeof enVal === 'string' && enVal === locVal && enVal.length > 2) {
      untranslated.push({ key: k, value: enVal });
    }
  }
  
  // Also get missing key values
  const missingWithValues = missingKeys.map(k => ({
    key: k,
    value: getNestedValue(en, k)
  })).filter(x => typeof x.value === 'string');
  
  console.log(`\n=== ${locale} ===`);
  console.log(`Missing keys: ${missingKeys.length}`);
  console.log(`Extra keys: ${extraKeys.length}`);
  console.log(`Untranslated keys: ${untranslated.length}`);
  console.log(`Missing keys with string values: ${missingWithValues.length}`);
  
  const totalToTranslate = untranslated.length + missingWithValues.length;
  console.log(`Total to translate: ${totalToTranslate}`);
  
  if (totalToTranslate <= 30 && totalToTranslate > 0) {
    // Print all items for small batches
    console.log(`\n--- Untranslated (English values) ---`);
    for (const item of untranslated) {
      console.log(`  "${item.key}": "${item.value}"`);
    }
    console.log(`\n--- Missing keys (need to add + translate) ---`);
    for (const item of missingWithValues) {
      console.log(`  "${item.key}": "${item.value}"`);
    }
  }
  
  if (extraKeys.length > 0 && extraKeys.length <= 20) {
    console.log(`\n--- Extra keys ---`);
    for (const k of extraKeys) {
      console.log(`  ${k}`);
    }
  }
}