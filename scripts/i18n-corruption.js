// Count U+FFFD replacement characters (data corruption) in each locale file
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'messages');
const langs = ['en','zh','fr','de','ja','ko','es','pt','nl','ar','ru','hi'];
console.log('Lang   U+FFFD count   File size');
console.log('------  -------------  ---------');
for (const lang of langs) {
  const raw = fs.readFileSync(path.join(dir, lang + '.json'), 'utf8');
  const count = (raw.match(/\uFFFD/g) || []).length;
  console.log(`${lang.padEnd(6)}  ${String(count).padStart(13)}  ${raw.length} chars`);
}
