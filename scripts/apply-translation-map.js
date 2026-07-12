#!/usr/bin/env node
/**
 * Apply translation map to a locale JSON file
 * Usage: node apply-translation-map.js [locale]
 */
const fs = require('fs');
const path = require('path');

const locale = process.argv[2] || 'ja';
const msgDir = path.join(__dirname, '..', 'messages');

const target = JSON.parse(fs.readFileSync(path.join(msgDir, locale + '.json'), 'utf8').replace(/^\uFEFF/, ''));
const mapPath = path.join(__dirname, locale + '-translations-map.json');

if (!fs.existsSync(mapPath)) {
  console.error(`Translation map not found: ${mapPath}`);
  process.exit(1);
}

const translations = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

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
  setNested(target, key, value);
  applied++;
}

fs.writeFileSync(path.join(msgDir, locale + '.json'), JSON.stringify(target, null, 2), 'utf8');
console.log(`Applied ${applied} translations to ${locale}.json`);

// Verify
const en = JSON.parse(fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, ''));
const updated = JSON.parse(fs.readFileSync(path.join(msgDir, locale + '.json'), 'utf8'));

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
const updatedFlat = flatten(updated);
const remaining = Object.keys(enFlat).filter(key => {
  if (typeof enFlat[key] !== 'string') return false;
  if (enFlat[key].length <= 2) return false;
  return updatedFlat[key] === enFlat[key];
});

console.log(`Remaining untranslated in ${locale}: ${remaining.length}`);
