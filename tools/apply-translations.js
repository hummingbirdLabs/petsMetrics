/**
 * i18n Translation Applicator
 * 
 * Reads translation data from tools/translations/<lang>/<namespace>.json
 * and applies them to the target language JSON file.
 * 
 * Translation files use dot-notation keys for nested access:
 *   "dryVsWet.topicA.pros.0.title": "Translated Text"
 * 
 * Usage: node tools/apply-translations.js <lang-code> [namespace]
 *   namespace: compare, emergency, catEmergency, or all (default)
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function setNestedValue(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i];
    let idx = null;
    
    // Check if this part is an array index
    const arrMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrMatch) {
      part = arrMatch[1];
      idx = parseInt(arrMatch[2]);
    }
    
    if (current[part] === undefined) {
      // Try to determine if next part is a number (array) or string (object)
      const nextPart = parts[i + 1];
      const nextArrMatch = nextPart ? nextPart.match(/^(\w+)\[(\d+)\]$/) : null;
      if (nextArrMatch || /^\d+$/.test(nextPart || '')) {
        current[part] = [];
      } else {
        current[part] = {};
      }
    }
    
    if (idx !== null) {
      if (!Array.isArray(current[part])) current[part] = [];
      if (current[part][idx] === undefined) current[part][idx] = {};
      current = current[part][idx];
    } else {
      current = current[part];
    }
  }
  
  // Handle the last part
  let lastPart = parts[parts.length - 1];
  const lastArrMatch = lastPart.match(/^(\w+)\[(\d+)\]$/);
  if (lastArrMatch) {
    const arrName = lastArrMatch[1];
    const arrIdx = parseInt(lastArrMatch[2]);
    if (!Array.isArray(current[arrName])) current[arrName] = [];
    current[arrName][arrIdx] = value;
  } else {
    current[lastPart] = value;
  }
}

function applyTranslations(targetObj, translations, prefix) {
  prefix = prefix || '';
  let count = 0;
  
  for (const [key, value] of Object.entries(translations)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    
    if (typeof value === 'string') {
      setNestedValue(targetObj, fullKey, value);
      count++;
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Check if this is a dot-notation key mapping or a nested structure
      const hasNestedKeys = Object.values(value).some(v => typeof v === 'object' && !Array.isArray(v));
      if (hasNestedKeys) {
        count += applyTranslations(targetObj, value, fullKey);
      } else {
        // Direct key-value mapping
        for (const [subKey, subValue] of Object.entries(value)) {
          const subFullKey = fullKey + '.' + subKey;
          setNestedValue(targetObj, subFullKey, subValue);
          count++;
        }
      }
    }
  }
  
  return count;
}

// ================================================================
// Main
// ================================================================
const lang = process.argv[2];
const namespace = process.argv[3] || 'all';

if (!lang) {
  console.error('Usage: node tools/apply-translations.js <lang-code> [namespace]');
  process.exit(1);
}

const target = readJson(path.join('messages', lang + '.json'));
const transDir = path.join('tools', 'translations', lang);

let totalCount = 0;

const namespaces = namespace === 'all' 
  ? ['compare', 'emergency', 'catEmergency', 'common', 'home', 'dog', 'cat', 'footer', 'privacy', 'terms', 'gestation', 'guide', 'dogAge', 'catAge', 'calculator', 'vaccination', 'puppyGrowth', 'catBcs', 'toxicChecker', 'toxicLanding', 'euTravel', 'faqHub', 'about', 'seo', 'nav', 'profile', 'dogCalorie', 'catHydration', 'euTravelLanding']
  : [namespace];

for (const ns of namespaces) {
  const transFile = path.join(transDir, ns + '.json');
  if (!fs.existsSync(transFile)) continue;
  
  const translations = readJson(transFile);
  
  if (!target[ns]) {
    target[ns] = JSON.parse(JSON.stringify(readJson('messages/en.json')[ns] || {}));
  }
  
  const count = applyTranslations(target[ns], translations);
  totalCount += count;
  console.log(`  ${ns}: ${count} translations applied`);
}

fs.writeFileSync(path.join('messages', lang + '.json'), JSON.stringify(target, null, 2) + '\n');
console.log(`\nTotal: ${totalCount} translations applied`);
console.log(`Updated: messages/${lang}.json`);