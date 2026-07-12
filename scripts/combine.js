const fs = require('fs');

// Read all parts
const files = [
  'scripts/part1.json',
  'scripts/part2.json',
  'scripts/part3.json',
  'scripts/part4.json',
  'scripts/part5.json',
  'scripts/part6.json',
  'scripts/part7.json',
  'scripts/part8.json',
  'scripts/part9.json',
  'scripts/part10.json',
  'scripts/part11.json',
  'scripts/part12.json',
  'scripts/part13.json',
];

let merged = {};
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  merged = { ...merged, ...data };
}

// Read the txt file to get all untranslated keys to know what we still need
const txt = fs.readFileSync('scripts/untranslated.txt', 'utf8');
const lines = txt.split('\n');
const allKeys = [];
for (const line of lines) {
  if (line.startsWith('KEY: ')) {
    allKeys.push(line.substring(5));
  }
}

console.log('Merged parts count:', Object.keys(merged).length);
console.log('Total untranslated:', allKeys.length);

// Find missing keys
const missing = allKeys.filter(k => !merged[k]);
console.log('Still missing keys:', missing.length);

// Write result
fs.writeFileSync('scripts/ja-translations-map.json', JSON.stringify(merged, null, 2));
console.log('Written to scripts/ja-translations-map.json');
