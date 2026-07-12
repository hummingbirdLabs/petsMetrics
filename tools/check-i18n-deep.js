const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// Deep compare: for arrays, compare element-by-element
function deepCompareStrings(enVal, langVal) {
  if (typeof enVal === 'string' && typeof langVal === 'string') {
    return enVal === langVal;
  }
  if (Array.isArray(enVal) && Array.isArray(langVal)) {
    if (enVal.length !== langVal.length) return false;
    for (let i = 0; i < enVal.length; i++) {
      if (typeof enVal[i] === 'string' && typeof langVal[i] === 'string') {
        if (enVal[i] === langVal[i]) return true; // found untranslated string in array
      } else if (typeof enVal[i] === 'object' && typeof langVal[i] === 'object') {
        // Check object entries
        for (const k of Object.keys(enVal[i])) {
          if (typeof enVal[i][k] === 'string' && typeof langVal[i][k] === 'string') {
            if (enVal[i][k] === langVal[i][k] && enVal[i][k].length > 3) {
              return true; // found untranslated
            }
          }
        }
      }
    }
    return false;
  }
  return false;
}

// Collect all leaf string values from en.json recursively
function collectStrings(obj, prefix) {
  prefix = prefix || '';
  const results = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? prefix + '.' + k : k;
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === 'string') {
          results.push({ key: full + '[' + i + ']', value: v[i], enValue: v[i] });
        } else if (typeof v[i] === 'object' && v[i] !== null) {
          for (const [sk, sv] of Object.entries(v[i])) {
            if (typeof sv === 'string') {
              results.push({ key: full + '[' + i + '].' + sk, value: sv, enValue: sv });
            }
          }
        }
      }
    } else if (typeof v === 'object' && v !== null) {
      results.push(...collectStrings(v, full));
    } else if (typeof v === 'string') {
      results.push({ key: full, value: v, enValue: v });
    }
  }
  return results;
}

// Skip keys that are intentionally English
function shouldSkip(key, enVal) {
  if (/^\(\d{3}\)\s\d{3}[-]\d{4}$/.test(enVal)) return true;
  if (/^https?:\/\//.test(enVal)) return true;
  if (['kg', 'lb', 'ml', 'oz', 'kcal', 'g', 'oz'].includes(enVal)) return true;
  if (enVal === 'petsMetrics') return true;
  if (/^\d+$/.test(enVal)) return true;
  if (enVal.length <= 3 && /^[A-Za-z]+$/.test(enVal)) return true;
  return false;
}

const en = readJson('messages/en.json');
const enStrings = collectStrings(en);
console.log('Total en string entries: ' + enStrings.length);

const langs = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

const summary = {};

for (const lang of langs) {
  const data = readJson(path.join('messages', lang + '.json'));
  const langStrings = collectStrings(data);
  const langMap = new Map(langStrings.map(e => [e.key, e.value]));

  const untranslated = [];
  for (const { key, enValue } of enStrings) {
    if (shouldSkip(key, enValue)) continue;
    const langVal = langMap.get(key);
    if (langVal !== undefined && langVal === enValue) {
      untranslated.push({ key, enValue });
    }
  }

  // Group by namespace
  const byNs = {};
  for (const { key, enValue } of untranslated) {
    const ns = key.split('.')[0];
    if (!byNs[ns]) byNs[ns] = [];
    byNs[ns].push({ key, enValue });
  }

  summary[lang] = { count: untranslated.length, byNs, untranslated };
  console.log(lang + ': ' + untranslated.length + ' untranslated strings');
}

// Print per-language detail
console.log('\n=== DETAILED BREAKDOWN ===\n');
for (const lang of langs) {
  const s = summary[lang];
  console.log('--- ' + lang + ' (' + s.count + ' untranslated) ---');
  const namespaces = Object.entries(s.byNs).sort((a, b) => b[1].length - a[1].length);
  for (const [ns, entries] of namespaces) {
    console.log('  ' + ns + ': ' + entries.length);
    // Show a few examples
    entries.slice(0, 5).forEach(e => {
      console.log('    ' + e.key + ' = ' + JSON.stringify(e.enValue.substring(0, 80)));
    });
    if (entries.length > 5) console.log('    ...');
  }
  console.log('');
}

// Write detailed report for the fix phase
fs.writeFileSync('tools/i18n-gaps.json', JSON.stringify(summary, null, 2));
console.log('Detailed report written to tools/i18n-gaps.json');