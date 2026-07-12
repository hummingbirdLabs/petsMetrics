#!/usr/bin/env node
/**
 * Export all untranslated strings for a given locale
 * Usage: node export-untranslated.js [locale]
 */
const fs = require('fs');
const path = require('path');

const locale = process.argv[2] || 'fr';
const msgDir = path.join(__dirname, '..', 'messages');
const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const locRaw = fs.readFileSync(path.join(msgDir, locale + '.json'), 'utf8').replace(/^\uFEFF/, '');

const en = JSON.parse(enRaw);
const loc = JSON.parse(locRaw);

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
const locFlat = flatten(loc);

// Patterns to skip (units, meta tags, brand names)
const skipPatterns = [
  /^common\.unit\./,
  /^footer\.contact$/,
  /^about\.contact$/,
  /^terms\.contact$/,
  /^common\.no$/,
  /^common\.yes$/,
  /\.meta\./,
];

const untranslated = {};
for (const key of Object.keys(enFlat)) {
  if (skipPatterns.some(p => p.test(key))) continue;
  if (locFlat[key] === enFlat[key] && typeof enFlat[key] === 'string' && enFlat[key].length > 2) {
    untranslated[key] = enFlat[key];
  }
}

const outputFile = path.join(msgDir, locale + '-untranslated.json');
fs.writeFileSync(outputFile, JSON.stringify(untranslated, null, 2), 'utf8');
console.log(`Exported ${Object.keys(untranslated).length} untranslated strings to ${locale}-untranslated.json`);
