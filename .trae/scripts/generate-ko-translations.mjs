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

// Build translations map
const translations = {};

for (const key of Object.keys(enFlat)) {
  const enVal = enFlat[key];
  const koVal = koFlat[key];
  if (typeof enVal !== 'string' || typeof koVal !== 'string') continue;
  
  const hasKorean = /[가-힣]/.test(koVal);
  if (hasKorean) continue;
  
  // Skip pure units/numbers/URLs/brand names that should stay as-is
  if (/^(kg|lb|ml|oz|kcal|P0|P1|\(888\) 426-4435|\(855\) 764-7661|petsMetrics|404|https?:\/\/.+)$/.test(koVal)) {
    translations[key] = koVal;
    continue;
  }
  
  // Skip if value matches a pattern that doesn't need translation
  if (/^(BCS |DHPP |FVRCP |RER =|MER =|RER\(|MER\()/ .test(koVal)) {
    translations[key] = koVal;
    continue;
  }
  
  // Skip pure template/metadata values that are technical
  if (/^[\d\s\-\–\×\=\+\^\.\(\)\{\}\:\,\/\\\*\$\#\@\!\?\%\&\|\"\'\;<>\_~\`′″°\|ₐ-₿]+$/.test(koVal)) {
    translations[key] = koVal;
    continue;
  }
  
  // This key needs translation - we'll fill it in
  translations[key] = null;
}

console.log('Keys needing translation:', Object.values(translations).filter(v => v === null).length);
console.log('Keys kept as-is:', Object.values(translations).filter(v => v !== null).length);
console.log('Total:', Object.keys(translations).length);

// Save the keys list for reference
writeFileSync(join(root, '.trae/scripts/keys-to-translate.json'), JSON.stringify(translations, null, 2));
