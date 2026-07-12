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
const enKeySet = new Set(Object.keys(enFlat));

const files = ['fr.json', 'hi.json', 'nl.json'];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8').replace(/^\uFEFF/, ''));
  const flat = flatten(data);
  const localeKeys = Object.keys(flat);
  const localeKeySet = new Set(localeKeys);
  const extra = localeKeys.filter(k => !enKeySet.has(k));
  
  if (extra.length > 0) {
    console.log(`\n=== ${file} EXTRA KEYS (${extra.length}) ===`);
    for (const k of extra.slice(0, 30)) {
      console.log(`  ${k} = "${String(flat[k]).substring(0, 100)}"`);
    }
  }
  
  // Also show remaining untranslated
  const untranslated = [];
  for (const [k, v] of Object.entries(flat)) {
    if (enFlat[k] !== undefined && v === enFlat[k] && v !== '' && v !== null) {
      untranslated.push(k);
    }
  }
  console.log(`\n  Remaining untranslated: ${untranslated.length}`);
  for (const k of untranslated.slice(0, 20)) {
    console.log(`    ${k} = "${String(enFlat[k]).substring(0, 100)}"`);
  }
}