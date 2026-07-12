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

const keys = Object.keys(untranslated).sort();
let output = `Total untranslated keys: ${keys.length}\n\n`;
for (const key of keys) {
  output += `KEY: ${key}\nVALUE: ${untranslated[key]}\n\n`;
}
fs.writeFileSync('scripts/untranslated.txt', output);
console.log('Wrote', keys.length, 'keys to scripts/untranslated.txt');
