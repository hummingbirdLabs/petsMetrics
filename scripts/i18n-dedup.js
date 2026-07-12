// Dedup-based translation workflow for large language files
// Usage:
//   node scripts/i18n-dedup.js dedup <lang>   — creates _unique_<lang>.json (unique values to translate)
//   node scripts/i18n-dedup.js expand <lang>   — expands _utrans_<lang>.json back to _trans_<lang>.json
//
// dedup: reads _extract_<lang>.json, groups by unique value, outputs _unique_<lang>.json
//   Format: { "value_hash": { "value": "English", "paths": ["path1","path2",...] } }
// expand: reads _utrans_<lang>.json (hash → translated value), applies to all paths → _trans_<lang>.json
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.resolve(__dirname, '..', 'messages');
const lang = process.argv[3];
const cmd = process.argv[2];

if (!cmd || !lang) {
  console.error('Usage: node scripts/i18n-dedup.js <dedup|expand> <lang>');
  process.exit(1);
}

function hash(s) {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
}

if (cmd === 'dedup') {
  const extract = JSON.parse(fs.readFileSync(path.join(dir, `_extract_${lang}.json`), 'utf8'));
  const unique = {}; // hash → { value, paths }
  for (const [k, v] of Object.entries(extract)) {
    const valStr = Array.isArray(v) ? JSON.stringify(v) : String(v);
    const h = hash(valStr);
    if (!unique[h]) unique[h] = { value: v, paths: [] };
    unique[h].paths.push(k);
  }
  const uniqueCount = Object.keys(unique).length;
  const totalCount = Object.keys(extract).length;
  fs.writeFileSync(path.join(dir, `_unique_${lang}.json`), JSON.stringify(unique, null, 2) + '\n', 'utf8');
  console.log(`[${lang}] dedup: ${totalCount} strings → ${uniqueCount} unique values → messages/_unique_${lang}.json`);
  console.log(`  Reduction: ${totalCount - uniqueCount} duplicates removed (${Math.round((1 - uniqueCount/totalCount)*100)}%)`);
} else if (cmd === 'expand') {
  const unique = JSON.parse(fs.readFileSync(path.join(dir, `_unique_${lang}.json`), 'utf8'));
  const utransFile = path.join(dir, `_utrans_${lang}.json`);
  if (!fs.existsSync(utransFile)) {
    console.error(`Missing ${utransFile}. Create it with hash → translated value mappings.`);
    process.exit(1);
  }
  const utrans = JSON.parse(fs.readFileSync(utransFile, 'utf8'));
  const trans = {};
  let applied = 0, missing = 0;
  for (const [h, info] of Object.entries(unique)) {
    const tv = utrans[h];
    if (tv === undefined) {
      console.error(`Missing translation for hash ${h}: "${String(info.value).slice(0, 50)}..."`);
      missing++;
      continue;
    }
    for (const p of info.paths) {
      trans[p] = tv;
      applied++;
    }
  }
  fs.writeFileSync(path.join(dir, `_trans_${lang}.json`), JSON.stringify(trans, null, 2) + '\n', 'utf8');
  console.log(`[${lang}] expand: ${applied} paths filled, ${missing} unique values missing → messages/_trans_${lang}.json`);
} else {
  console.error('Unknown command: ' + cmd);
  process.exit(1);
}
