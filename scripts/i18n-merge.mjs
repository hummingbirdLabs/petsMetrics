// Merge translations into a locale file.
// Usage: node scripts/i18n-merge.mjs <locale>
// Reads:  messages/_trans_<locale>.json  (key -> translated value, dotted keys)
// Updates: messages/<locale>.json
import fs from 'fs';

const dir = 'd:/prj2/GitHub/petsMetrics/messages/';
const locale = process.argv[2];
if (!locale) {
  console.error('Usage: node scripts/i18n-merge.mjs <locale>');
  process.exit(1);
}

const transPath = dir + '_trans_' + locale + '.json';
const localePath = dir + locale + '.json';

const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));

function setValue(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (cur[part] == null || typeof cur[part] !== 'object') {
      cur[part] = {};
    }
    cur = cur[part];
  }
  cur[parts[parts.length - 1]] = value;
}

let applied = 0;
let skipped = 0;
for (const [key, value] of Object.entries(translations)) {
  // null means "skip - intentionally identical to EN"
  if (value === null) {
    skipped++;
    continue;
  }
  setValue(data, key, value);
  applied++;
}

fs.writeFileSync(localePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`[${locale}] Applied ${applied} translations, skipped ${skipped} intentionally-identical keys.`);
