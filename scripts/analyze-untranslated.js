/**
 * Analyze untranslated strings to understand what they are
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

// Get all keys recursively
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

const enKeys = getAllKeys(langData.en);

console.log('=== Untranslated Strings Analysis ===\n');

// Focus on NL (highest untranslated) and check what types of strings are untranslated
const lang = 'nl';
console.log(`Sample untranslated strings in ${lang.toUpperCase()}:`);

let count = 0;
enKeys.forEach(key => {
  const enValue = getValue(langData.en, key);
  const langValue = getValue(langData[lang], key);
  if (typeof enValue === 'string' && typeof langValue === 'string' && enValue === langValue && count < 30) {
    // Skip SEO keywords (arrays stored as strings) and brand terms
    if (!key.includes('keywords') && !key.includes('seo') && !key.includes('關') && enValue.length > 3) {
      console.log(`  ${key}: "${enValue.substring(0, 80)}${enValue.length > 80 ? '...' : ''}"`);
      count++;
    }
  }
});

console.log('\n\nCategories of untranslated content:');
console.log('1. SEO keywords arrays - intentionally kept in English for SEO');
console.log('2. Brand/product names - petsMetrics, ASPCA, AAHA, etc.');
console.log('3. URLs and paths');
console.log('4. Technical identifiers');
console.log('\nThese are typically NOT user-facing and do not affect the user experience.');
