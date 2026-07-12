#!/usr/bin/env node
/**
 * Apply French translations from fr-translations-map.json
 */
const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const fr = JSON.parse(fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8').replace(/^\uFEFF/, ''));
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, 'fr-translations-map.json'), 'utf8'));

function setNested(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

let applied = 0;
for (const [key, value] of Object.entries(translations)) {
  setNested(fr, key, value);
  applied++;
}

fs.writeFileSync(path.join(msgDir, 'fr.json'), JSON.stringify(fr, null, 2), 'utf8');
console.log(`Applied ${applied} French translations`);

// Verify
const en = JSON.parse(fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, ''));
const newFr = JSON.parse(fs.readFileSync(path.join(msgDir, 'fr.json'), 'utf8'));

function flatten(obj, prefix = '') {
  let result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result = { ...result, ...flatten(obj[key], fullKey) };
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

const enFlat = flatten(en);
const newFrFlat = flatten(newFr);
const remaining = Object.keys(enFlat).filter(key => {
  if (typeof enFlat[key] !== 'string') return false;
  if (enFlat[key].length <= 2) return false;
  return newFrFlat[key] === enFlat[key];
});

console.log(`Remaining untranslated: ${remaining.length}`);
if (remaining.length > 0 && remaining.length <= 20) {
  console.log('Remaining keys:', remaining.join('\n  '));
}
