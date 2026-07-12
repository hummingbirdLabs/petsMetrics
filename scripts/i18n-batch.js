// Split _unique_<lang>.json into numbered batch files for translation
// Usage: node scripts/i18n-batch.js split <lang> [batchSize=120]
//   Creates _ub_<lang>_<N>.json files, each with { hash: value } pairs
// Usage: node scripts/i18n-batch.js combine <lang>
//   Reads all _ubt_<lang>_<N>.json (hash → translated) and combines into _utrans_<lang>.json
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'messages');
const cmd = process.argv[2];
const lang = process.argv[3];

if (!cmd || !lang) {
  console.error('Usage: node scripts/i18n-batch.js <split|combine> <lang> [batchSize]');
  process.exit(1);
}

if (cmd === 'split') {
  const batchSize = parseInt(process.argv[4] || '120', 10);
  const unique = JSON.parse(fs.readFileSync(path.join(dir, `_unique_${lang}.json`), 'utf8'));
  const entries = Object.entries(unique);
  const numBatches = Math.ceil(entries.length / batchSize);
  for (let i = 0; i < numBatches; i++) {
    const batch = {};
    const slice = entries.slice(i * batchSize, (i + 1) * batchSize);
    for (const [h, info] of slice) {
      batch[h] = info.value; // hash → English value
    }
    const fname = `_ub_${lang}_${i}.json`;
    fs.writeFileSync(path.join(dir, fname), JSON.stringify(batch, null, 2) + '\n', 'utf8');
    console.log(`  ${fname}: ${slice.length} values`);
  }
  console.log(`[${lang}] split: ${entries.length} unique values → ${numBatches} batches (size ${batchSize})`);
} else if (cmd === 'combine') {
  const utrans = {};
  const files = fs.readdirSync(dir).filter(f => f.startsWith(`_ubt_${lang}_`) && f.endsWith('.json')).sort();
  for (const f of files) {
    const batch = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    Object.assign(utrans, batch);
    console.log(`  ${f}: ${Object.keys(batch).length} translations`);
  }
  fs.writeFileSync(path.join(dir, `_utrans_${lang}.json`), JSON.stringify(utrans, null, 2) + '\n', 'utf8');
  console.log(`[${lang}] combine: ${Object.keys(utrans).length} translations → messages/_utrans_${lang}.json`);
} else {
  console.error('Unknown command: ' + cmd);
  process.exit(1);
}
