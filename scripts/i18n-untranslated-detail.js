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

const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8').replace(/^\uFEFF/, ''));
  const flat = flatten(data);
  
  const untranslated = [];
  for (const [k, v] of Object.entries(flat)) {
    if (enFlat[k] !== undefined && v === enFlat[k] && v !== '' && v !== null) {
      untranslated.push(k);
    }
  }
  
  console.log(`\n=== ${file} (${untranslated.length} untranslated) ===`);
  for (const k of untranslated) {
    console.log(`  ${k} = "${String(enFlat[k]).substring(0, 120)}"`);
  }
}