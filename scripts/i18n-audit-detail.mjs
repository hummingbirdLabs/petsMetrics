// Detailed i18n audit - shows untranslated keys by namespace per locale
import fs from 'fs';

const dir = 'd:/prj2/GitHub/petsMetrics/messages/';

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
const enKeysSet = new Set(enKeys);

// Top-level namespaces in en.json
const topNamespaces = Object.keys(en);
console.log('Top-level namespaces in en.json:', topNamespaces.join(', '));
console.log('');

const locales = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

// For each locale, count untranslated (same as EN) and missing keys per top-level namespace
console.log('=== Untranslated (same as EN) and Missing keys per namespace ===\n');

for (const loc of locales) {
  const data = JSON.parse(fs.readFileSync(dir + loc + '.json', 'utf8'));
  const nsStats = {};
  for (const ns of topNamespaces) {
    nsStats[ns] = { untranslated: 0, missing: 0, total: 0 };
  }

  for (const k of enKeys) {
    const topNs = k.split('.')[0];
    if (!nsStats[topNs]) continue;
    nsStats[topNs].total++;
    const locVal = getValue(data, k);
    if (locVal === undefined) {
      nsStats[topNs].missing++;
    } else {
      const ev = JSON.stringify(getValue(en, k));
      const lv = JSON.stringify(locVal);
      if (lv === '""' || lv === 'null') {
        nsStats[topNs].missing++;
      } else if (ev === lv) {
        nsStats[topNs].untranslated++;
      }
    }
  }

  // Find namespaces with issues
  const problemNs = Object.entries(nsStats)
    .filter(([_, s]) => s.untranslated > 0 || s.missing > 0)
    .sort((a, b) => (b[1].untranslated + b[1].missing) - (a[1].untranslated + a[1].missing));

  if (problemNs.length > 0) {
    console.log(`--- ${loc} ---`);
    for (const [ns, s] of problemNs) {
      console.log(`  ${ns.padEnd(30)} untranslated: ${String(s.untranslated).padStart(4)} | missing: ${String(s.missing).padStart(4)} | total: ${String(s.total).padStart(4)}`);
    }
    console.log('');
  }
}
