import { readFileSync, writeFileSync } from 'fs';

const koRaw = readFileSync('./messages/ko.json', 'utf8').replace(/^\uFEFF/, '');
const ko = JSON.parse(koRaw);
const translations = JSON.parse(readFileSync('./scripts/translations-data.json', 'utf8'));

function setNested(obj, dotpath, value) {
  const parts = dotpath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in cur) || typeof cur[parts[i]] !== 'object') {
      cur[parts[i]] = {};
    }
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

let applied = 0;
for (const [key, value] of Object.entries(translations)) {
  setNested(ko, key, value);
  applied++;
}

writeFileSync('./messages/ko.json', JSON.stringify(ko, null, 2) + '\n', 'utf8');
console.log(`Applied ${applied} translations to ko.json`);
