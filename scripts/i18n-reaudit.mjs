// Re-audit a single locale after applying translations.
// Respects the skip-list (intentionally-identical keys like URLs, slugs, units).
// Usage: node scripts/i18n-reaudit.mjs <locale>
import fs from 'fs';

const dir = 'd:/prj2/GitHub/petsMetrics/messages/';
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node scripts/i18n-reaudit.mjs <locale>');
  process.exit(1);
}

const skipListPath = 'd:/prj2/GitHub/petsMetrics/scripts/i18n-skip-list.json';
const skipList = new Set(JSON.parse(fs.readFileSync(skipListPath, 'utf8')).keys);

function collectKeys(obj, prefix = '', arr = []) {
  for (const k in obj) {
    const v = obj[k];
    const np = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      collectKeys(v, np, arr);
    } else {
      arr.push(np);
    }
  }
  return arr;
}

function getValue(obj, path) {
  const parts = path.split('.');
  let cur = obj;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

const en = JSON.parse(fs.readFileSync(dir + 'en.json', 'utf8'));
const enKeys = collectKeys(en);
const data = JSON.parse(fs.readFileSync(dir + locale + '.json', 'utf8'));

let missing = 0;
let untranslated = 0;
const untranslatedKeys = [];
const missingKeys = [];
const cognates = []; // legitimately identical (e.g. "Optional" in German)

for (const k of enKeys) {
  if (skipList.has(k)) continue; // intentionally identical
  const ev = getValue(en, k);
  const lv = getValue(data, k);
  if (lv === undefined || lv === '' || lv === null) {
    missing++;
    missingKeys.push(k);
  } else if (JSON.stringify(ev) === JSON.stringify(lv)) {
    untranslated++;
    untranslatedKeys.push({ key: k, value: ev });
  }
}

console.log(`=== ${locale} re-audit ===`);
console.log(`Missing keys: ${missing}`);
console.log(`Untranslated (same as EN, not in skip-list): ${untranslated}`);
if (untranslatedKeys.length > 0) {
  console.log('\nRemaining identical-to-EN keys (review: cognates vs genuinely untranslated):');
  for (const { key, value } of untranslatedKeys) {
    const display = typeof value === 'string' ? value.slice(0, 60) : JSON.stringify(value).slice(0, 60);
    console.log(`  ${key.padEnd(45)} = "${display}"`);
  }
}
if (missingKeys.length > 0) {
  console.log('\nMissing keys:');
  for (const k of missingKeys) console.log(`  ${k}`);
}
