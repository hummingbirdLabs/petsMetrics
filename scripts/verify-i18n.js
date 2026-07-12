const fs = require('fs');
const path = require('path');

const locales = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];
const messagesDir = path.join(__dirname, '..', 'messages');

function readJson(file) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  return JSON.parse(content);
}

function getKeys(obj, prefix = '') {
  const keys = [];
  for (const k of Object.keys(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys.push(...getKeys(obj[k], full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

const enFile = path.join(messagesDir, 'en.json');
const enKeys = getKeys(readJson(enFile));
const enKeySet = new Set(enKeys);

console.log(`en.json: ${enKeys.length} keys\n`);

const results = {};
for (const loc of locales) {
  if (loc === 'en') continue;
  const file = path.join(messagesDir, `${loc}.json`);
  const data = readJson(file);
  const keys = getKeys(data);
  const keySet = new Set(keys);

  const missing = enKeys.filter(k => !keySet.has(k));
  const extra = keys.filter(k => !enKeySet.has(k));

  results[loc] = { total: keys.length, missing: missing.length, extra: extra.length, missingKeys: missing, extraKeys: extra };

  console.log(`${loc}: ${keys.length} keys | missing: ${missing.length} | extra: ${extra.length}`);
  if (missing.length > 0 && missing.length <= 10) {
    console.log(`  MISSING: ${missing.join(', ')}`);
  } else if (missing.length > 10) {
    console.log(`  MISSING (first 10): ${missing.slice(0, 10).join(', ')}`);
  }
  if (extra.length > 0 && extra.length <= 5) {
    console.log(`  EXTRA: ${extra.join(', ')}`);
  } else if (extra.length > 5) {
    console.log(`  EXTRA (first 5): ${extra.slice(0, 5).join(', ')}`);
  }
}

// Summary
const allOk = locales.slice(1).every(loc => results[loc].missing === 0);
console.log(`\n${'='.repeat(50)}`);
console.log(allOk ? '✅ All locales match en.json keys!' : '❌ Some locales have key mismatches');
