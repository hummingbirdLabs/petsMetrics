const fs = require('fs');
const path = require('path');

const messagesDir = 'd:/prj2/GitHub/petsMetrics/messages';

// Read all JSON files
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));
const enPath = path.join(messagesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8').replace(/^\uFEFF/, ''));

// Flatten nested object keys
function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

const enFlat = flatten(enData);
const enKeys = Object.keys(enFlat);
const enKeySet = new Set(enKeys);

console.log(`=== en.json (baseline): ${enKeys.length} flattened keys ===\n`);

const results = [];

for (const file of files) {
  if (file === 'en.json') continue;
  const filePath = path.join(messagesDir, file);
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.log(`${file}: JSON PARSE ERROR: ${e.message}`);
    continue;
  }
  const flat = flatten(data);
  const localeKeys = Object.keys(flat);
  const localeKeySet = new Set(localeKeys);

  const missing = enKeys.filter(k => !localeKeySet.has(k));
  const extra = localeKeys.filter(k => !enKeySet.has(k));
  const empty = localeKeys.filter(k => flat[k] === '' || flat[k] === null || flat[k] === undefined);

  // Count English values (untranslated)
  const englishValues = [];
  for (const k of localeKeys) {
    if (enFlat[k] !== undefined && flat[k] === enFlat[k] && flat[k] !== '' && flat[k] !== null) {
      englishValues.push(k);
    }
  }

  results.push({
    file,
    totalKeys: localeKeys.length,
    missing: missing.length,
    extra: extra.length,
    empty: empty.length,
    englishValues: englishValues.length,
    missingKeys: missing.slice(0, 10),
    emptyKeys: empty.slice(0, 10),
    englishSample: englishValues.slice(0, 10),
  });

  console.log(`${file}: ${localeKeys.length} keys | missing=${missing.length} | extra=${extra.length} | empty=${empty.length} | untranslated(English)=${englishValues.length}`);
}

// Summary
console.log('\n=== SUMMARY ===');
console.log('| Locale | Total Keys | Missing | Extra | Empty | Untranslated (English) |');
console.log('|--------|-----------|---------|-------|-------|----------------------|');
for (const r of results) {
  console.log(`| ${r.file.padEnd(6)} | ${String(r.totalKeys).padStart(9)} | ${String(r.missing).padStart(7)} | ${String(r.extra).padStart(5)} | ${String(r.empty).padStart(5)} | ${String(r.englishValues).padStart(20)} |`);
}

// Top priority: locales with most untranslated English values
console.log('\n=== PRIORITY (by untranslated count) ===');
results.sort((a, b) => b.englishValues - a.englishValues);
for (const r of results) {
  console.log(`${r.file}: ${r.englishValues} untranslated English values`);
  if (r.missing > 0) console.log(`  Missing keys: ${r.missingKeys.join(', ')}`);
  if (r.empty > 0) console.log(`  Empty keys: ${r.emptyKeys.join(', ')}`);
  if (r.englishSample.length > 0) console.log(`  Untranslated samples: ${r.englishSample.join(', ')}`);
}