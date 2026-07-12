import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');

const enRaw = readFileSync(join(root, 'messages/en.json'), 'utf8').replace(/^\uFEFF/, '');
const koRaw = readFileSync(join(root, 'messages/ko.json'), 'utf8').replace(/^\uFEFF/, '');
const en = JSON.parse(enRaw);
const ko = JSON.parse(koRaw);

function flatten(obj, prefix = '') {
  const result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], fullKey));
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

const enFlat = flatten(en);
const koFlat = flatten(ko);

// Get all english keys
const allKeys = Object.keys(enFlat).sort();

// Find all keys that exist in both and the ko version is untranslated (no Korean chars)
const untranslated = [];
for (const key of allKeys) {
  const enVal = enFlat[key];
  const koVal = koFlat[key];
  if (typeof enVal !== 'string' || typeof koVal !== 'string') continue;
  
  const hasKorean = /[가-힣]/.test(koVal);
  if (hasKorean) continue;
  
  untranslated.push({key, en: enVal, ko: koVal});
}

console.log('Total untranslated:', untranslated.length);

// Output list to file
writeFileSync(join(root, '.trae/scripts/untranslated-list.json'), JSON.stringify(untranslated, null, 2));
console.log('Saved to .trae/scripts/untranslated-list.json');
