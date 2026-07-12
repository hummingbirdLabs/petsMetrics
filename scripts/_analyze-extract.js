// Analyze extract file: categorize by namespace and by string type
const fs = require('fs');
const path = require('path');

const lang = process.argv[2] || 'ar';
const file = path.join(__dirname, '..', 'messages', `_extract_${lang}.json`);
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const entries = Object.entries(data);

console.log(`Total strings: ${entries.length}\n`);

// Categorize by top-level namespace
const byNamespace = {};
for (const [k, v] of entries) {
  const ns = k.split('.')[0];
  if (!byNamespace[ns]) byNamespace[ns] = { count: 0, chars: 0 };
  byNamespace[ns].count++;
  byNamespace[ns].chars += (Array.isArray(v) ? v.join(' ') : String(v)).length;
}
console.log('By namespace:');
for (const [ns, info] of Object.entries(byNamespace).sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  ${ns.padEnd(20)} ${String(info.count).padStart(5)} strings  ${String(info.chars).padStart(7)} chars`);
}

// Categorize by string type
let shortLabels = 0, sentences = 0, paragraphs = 0, arrays = 0;
const shortLabelMap = {}; // value → count, for repetitive short labels
for (const [k, v] of entries) {
  if (Array.isArray(v)) { arrays++; continue; }
  const s = String(v);
  if (s.length < 30) {
    shortLabels++;
    shortLabelMap[s] = (shortLabelMap[s] || 0) + 1;
  } else if (s.length < 150) {
    sentences++;
  } else {
    paragraphs++;
  }
}
console.log(`\nBy type:`);
console.log(`  Short labels (<30 chars): ${shortLabels}`);
console.log(`  Sentences (30-150 chars): ${sentences}`);
console.log(`  Paragraphs (>150 chars):  ${paragraphs}`);
console.log(`  Arrays:                   ${arrays}`);

// Show repetitive short labels (same value appears multiple times)
console.log(`\nRepetitive short labels (value → count):`);
const repetitive = Object.entries(shortLabelMap).filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]);
for (const [val, count] of repetitive) {
  console.log(`  [${count}x] ${val}`);
}
console.log(`\n  Total repetitive instances: ${repetitive.reduce((s, [, c]) => s + c, 0)} (of ${shortLabels} short labels)`);
