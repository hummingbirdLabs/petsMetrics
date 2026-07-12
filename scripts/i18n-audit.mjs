// i18n audit script - compares key coverage and translation quality across locales
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
const enKeys = new Set(collectKeys(en));
const locales = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

console.log('en.json total keys:', enKeys.size);
console.log('');
console.log('Locale | Total | Missing | Extra | Empty | SameAsEN(untranslated)');
console.log('-------|-------|---------|-------|-------|----------------------');

for (const loc of locales) {
  const data = JSON.parse(fs.readFileSync(dir + loc + '.json', 'utf8'));
  const locKeys = new Set(collectKeys(data));
  let missing = 0, extra = 0, empty = 0, same = 0;

  for (const k of enKeys) {
    if (!locKeys.has(k)) missing++;
  }
  for (const k of locKeys) {
    if (!enKeys.has(k)) extra++;
  }
  for (const k of locKeys) {
    if (enKeys.has(k)) {
      const ev = JSON.stringify(getValue(en, k));
      const lv = JSON.stringify(getValue(data, k));
      if (lv === '""' || lv === 'null' || lv === 'undefined') {
        empty++;
      } else if (ev === lv) {
        same++;
      }
    }
  }

  console.log(
    loc.padEnd(6) + ' | ' +
    String(locKeys.size).padStart(5) + ' | ' +
    String(missing).padStart(7) + ' | ' +
    String(extra).padStart(5) + ' | ' +
    String(empty).padStart(5) + ' | ' +
    String(same).padStart(6)
  );
}
