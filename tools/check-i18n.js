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

const en = readJson('messages/en.json');
const enVals = getLeafValues(en);
const enMap = new Map(enVals.map(e => [e.key, e.value]));

const langs = ['zh', 'fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

console.log('=== POTENTIAL UNTRANSLATED KEYS (value same as English) ===\n');
for (const lang of langs) {
  const data = readJson(path.join('messages', lang + '.json'));
  const langVals = getLeafValues(data);
  const langMap = new Map(langVals.map(e => [e.key, e.value]));

  const sameAsEnglish = [];
  for (const [key, enVal] of enMap) {
    const langVal = langMap.get(key);
    if (langVal === enVal && enVal.length > 3 && !/^\d+$/.test(enVal) && !/^[A-Z]{2,}$/.test(enVal)) {
      sameAsEnglish.push(key);
    }
  }

  console.log(lang + ': ' + sameAsEnglish.length + ' keys still in English');
  if (sameAsEnglish.length > 0 && sameAsEnglish.length <= 20) {
    sameAsEnglish.forEach(k => {
      const v = enMap.get(k);
      console.log('  - ' + k + ' = ' + JSON.stringify(v.substring(0, 80)));
    });
  } else if (sameAsEnglish.length > 20) {
    sameAsEnglish.slice(0, 15).forEach(k => {
      const v = enMap.get(k);
      console.log('  - ' + k + ' = ' + JSON.stringify(v.substring(0, 80)));
    });
    console.log('  ... and ' + (sameAsEnglish.length - 15) + ' more');
  }
  console.log('');
}