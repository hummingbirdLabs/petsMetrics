const fs = require('fs');
const path = require('path');

const messagesDir = 'd:/prj2/GitHub/petsMetrics/messages';

function flatten(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

const enData = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8').replace(/^\uFEFF/, ''));
const enFlat = flatten(enData);

// Keys that are intentionally identical across all languages
const intentSame = new Set([
  'common.unit.kg', 'common.unit.lb', 'common.unit.ml', 'common.unit.oz', 'common.unit.kcal',
  'common.notFound.title',  // "404" is universal
  'dog.toolGrid.rating', 'dog.toolGrid.priority',  // P0/P1 codes
  'cat.toolGrid.rating', 'cat.toolGrid.priority',
  'toxicLanding.aspcaNumber', 'toxicLanding.petPoisonNumber',  // phone numbers
  'emergency.shared.aspcaLink',  // URL
  'header.logoAlt',  // brand name
  'dogAge.lifeStage.cardTitle',  // template with {variables}
  'home.hero.cardPetName',  // example name
]);

for (const file of ['fr.json', 'hi.json']) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8').replace(/^\uFEFF/, ''));
  const flat = flatten(data);
  const real = [];
  for (const [k, v] of Object.entries(flat)) {
    if (enFlat[k] !== undefined && v === enFlat[k] && v !== '' && v !== null && !intentSame.has(k)) {
      real.push(k);
    }
  }
  console.log(`${file}: ${real.length} genuinely untranslated`);
  for (const k of real.slice(0, 40)) {
    const val = String(enFlat[k]).substring(0, 80);
    console.log(`  ${k} = "${val}"`);
  }
}