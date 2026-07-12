// Apply German translations to messages/de.json
import { readFileSync, writeFileSync } from 'fs';

const deRaw = readFileSync('./messages/de.json', 'utf8');
const de = JSON.parse(deRaw.charCodeAt(0) === 0xFEFF ? deRaw.slice(1) : deRaw);

function setNested(obj, dotpath, value) {
  const parts = dotpath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in cur) || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

const T = null; // placeholder to be replaced with actual translations in build step

// This script is the apply script. Run `node scripts/build-de-translations.mjs` first
// to generate the translations data, then run this script to apply them.

const translations = JSON.parse(readFileSync('./scripts/de-translations-data.json', 'utf8'));

let count = 0;
for (const [key, value] of Object.entries(translations)) {
  setNested(de, key, value);
  count++;
}

writeFileSync('./messages/de.json', JSON.stringify(de, null, 2) + '\n', 'utf8');
console.log(`Applied ${count} German translations to messages/de.json`);
