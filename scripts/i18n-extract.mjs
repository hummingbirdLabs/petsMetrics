// Extract untranslated (same-as-EN) and missing keys for a given locale.
// Outputs a JSON file: messages/_extract_{locale}.json with structure:
// { "<dotted.key>": "<english value>", ... }
// Usage: node scripts/i18n-extract.mjs <locale>
import fs from 'fs';

const dir = 'd:/prj2/GitHub/petsMetrics/messages/';
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node scripts/i18n-extract.mjs <locale>');
  process.exit(1);
}

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

const result = {};
let count = 0;
for (const k of enKeys) {
  const ev = getValue(en, k);
  const lv = getValue(data, k);
  const evStr = JSON.stringify(ev);
  const lvStr = JSON.stringify(lv);
  // Missing OR empty OR identical to English
  if (lv === undefined || lv === '' || lv === null || evStr === lvStr) {
    result[k] = ev;
    count++;
  }
}

const outPath = dir + '_extract_' + locale + '.json';
fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
console.log(`Extracted ${count} untranslated/missing keys for ${locale} -> ${outPath}`);

// Also print summary by top-level namespace
const nsCount = {};
for (const k of Object.keys(result)) {
  const ns = k.split('.')[0];
  nsCount[ns] = (nsCount[ns] || 0) + 1;
}
console.log('\nBy namespace:');
for (const [ns, c] of Object.entries(nsCount).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${ns.padEnd(28)} ${c}`);
}
