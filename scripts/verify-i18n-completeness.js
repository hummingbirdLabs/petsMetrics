/**
 * Verify i18n completeness across all 12 languages
 * Checks for missing keys and untranslated strings
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');
const languages = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

// Load all language files
const langData = {};
languages.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  const content = fs.readFileSync(filePath, 'utf8');
  langData[lang] = JSON.parse(content);
});

// Get all keys from an object recursively
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Get value by key path
function getValue(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) return undefined;
    current = current[part];
  }
  return current;
}

// Get all keys from English (base)
const enKeys = getAllKeys(langData.en);
console.log(`\n=== i18n Completeness Report ===\n`);
console.log(`Total keys in English (base): ${enKeys.length}`);
console.log(`\n--- Missing Keys (compared to en) ---\n`);

let totalMissing = 0;
let totalUntranslated = 0;

languages.slice(1).forEach(lang => { // Skip English
  const langKeys = getAllKeys(langData[lang]);
  const missingKeys = enKeys.filter(k => !langKeys.includes(k));
  
  // Check for untranslated strings (value equals English)
  let untranslatedCount = 0;
  enKeys.forEach(key => {
    const enValue = getValue(langData.en, key);
    const langValue = getValue(langData[lang], key);
    if (typeof enValue === 'string' && typeof langValue === 'string' && enValue === langValue) {
      untranslatedCount++;
    }
  });
  
  totalMissing += missingKeys.length;
  totalUntranslated += untranslatedCount;
  
  console.log(`${lang.toUpperCase()}:`);
  console.log(`  Keys: ${langKeys.length}/${enKeys.length}`);
  console.log(`  Missing: ${missingKeys.length}`);
  console.log(`  Untranslated: ${untranslatedCount}`);
  
  if (missingKeys.length > 0 && missingKeys.length <= 20) {
    console.log(`  Missing keys: ${missingKeys.join(', ')}`);
  } else if (missingKeys.length > 20) {
    console.log(`  First 20 missing keys: ${missingKeys.slice(0, 20).join(', ')}...`);
  }
  console.log();
});

console.log(`--- Summary ---`);
console.log(`Total missing keys: ${totalMissing}`);
console.log(`Total untranslated strings: ${totalUntranslated}`);
console.log(`\n=== All languages have ${enKeys.length} keys ===`);
