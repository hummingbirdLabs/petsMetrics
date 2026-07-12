const fs = require('fs');

function stripBOM(str) {
  return str.replace(/^\uFEFF/, '');
}

const en = JSON.parse(stripBOM(fs.readFileSync('messages/en.json', 'utf8')));
const ja = JSON.parse(stripBOM(fs.readFileSync('messages/ja.json', 'utf8')));

function flatten(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const enFlat = flatten(en);
const jaFlat = flatten(ja);

const untranslated = {};
for (const key in jaFlat) {
  if (enFlat[key] && jaFlat[key] === enFlat[key]) {
    untranslated[key] = enFlat[key];
  }
}

console.log('Total untranslated keys:', Object.keys(untranslated).length);
fs.writeFileSync('scripts/untranslated-keys.json', JSON.stringify(untranslated, null, 2));
console.log('Wrote untranslated-keys.json');
