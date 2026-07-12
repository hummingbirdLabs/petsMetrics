const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function getLeafValues(obj, prefix) {
  prefix = prefix || '';
  const entries = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? prefix + '.' + k : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      entries.push(...getLeafValues(v, full));
    } else {
      entries.push({ key: full, value: String(v) });
    }
  }
  return entries;
}

// Heuristic to skip keys that are intentionally kept as English
function shouldSkip(key, enVal) {
  // Phone numbers
  if (/^\(\d{3}\)\s\d{3}[-]\d{4}$/.test(enVal)) return true;
  // URLs
  if (/^https?:\/\//.test(enVal)) return true;
  // Unit labels
  if (['kg', 'lb', 'ml', 'oz', 'kcal', 'g', 'oz'].includes(enVal)) return true;
  // Brand name
  if (enVal === 'petsMetrics') return true;
  // Pure numbers
  if (/^\d+$/.test(enVal)) return true;
  // Template-only strings (variables + punctuation)
  if (/^\{[^}]+\}\s*[—–\-]\s*\{[^}]+\}$/.test(enVal.trim())) return true;
  // Short abbreviations
  if (enVal.length <= 3 && /^[A-Za-z]+$/.test(enVal)) return true;
  return false;
}

const en = readJson('messages/en.json');
const enVals = getLeafValues(en);
const enMap = new Map(enVals.map(e => [e.key, e.value]));

const langs = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

const summary = [];

for (const lang of langs) {
  const data = readJson(path.join('messages', lang + '.json'));
  const langVals = getLeafValues(data);
  const langMap = new Map(langVals.map(e => [e.key, e.value]));

  const untranslated = [];
  for (const [key, enVal] of enMap) {
    const langVal = langMap.get(key);
    if (langVal === undefined) continue; // Skip missing keys
    if (shouldSkip(key, enVal)) continue;
    if (langVal === enVal) {
      untranslated.push(key);
    }
  }

  // Group by namespace
  const byNs = {};
  for (const k of untranslated) {
    const ns = k.split('.')[0];
    if (!byNs[ns]) byNs[ns] = [];
    byNs[ns].push(k);
  }

  summary.push({ lang, count: untranslated.length, byNs });
}

// Print summary
console.log('=== REAL UNTRANSLATED KEYS (filtered) ===\n');
for (const s of summary) {
  console.log(s.lang + ': ' + s.count + ' untranslated keys');
  const namespaces = Object.entries(s.byNs).sort((a, b) => b[1].length - a[1].length);
  for (const [ns, keys] of namespaces) {
    console.log('  ' + ns + ': ' + keys.length);
  }
  console.log('');
}

// Print top 30 untranslated keys per language (excluding emergency)
console.log('=== TOP UNTRANSLATED KEYS (non-emergency) ===\n');
for (const s of summary) {
  const nonEmergency = [];
  for (const [ns, keys] of Object.entries(s.byNs)) {
    if (ns === 'emergency') continue;
    nonEmergency.push(...keys);
  }
  console.log(s.lang + ' (' + nonEmergency.length + ' non-emergency):');
  nonEmergency.slice(0, 20).forEach(k => {
    console.log('  ' + k + ' = ' + JSON.stringify(enMap.get(k).substring(0, 100)));
  });
  if (nonEmergency.length > 20) console.log('  ... and ' + (nonEmergency.length - 20) + ' more');
  console.log('');
}