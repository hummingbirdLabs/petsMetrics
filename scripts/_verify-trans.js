// Verify _trans_<lang>.json against _extract_<lang>.json:
// 1. Keys must match exactly
// 2. Values must not be English-only / must not contain U+FFFD
const fs = require('fs');
const path = require('path');

const lang = process.argv[2];
if (!lang) { console.error('Usage: node _verify-trans.js <lang>'); process.exit(1); }

const dir = path.join(__dirname, '..', 'messages');
const extract = JSON.parse(fs.readFileSync(path.join(dir, `_extract_${lang}.json`), 'utf8'));
const trans = JSON.parse(fs.readFileSync(path.join(dir, `_trans_${lang}.json`), 'utf8'));

const exKeys = new Set(Object.keys(extract));
const trKeys = new Set(Object.keys(trans));

const missingInTrans = [...exKeys].filter(k => !trKeys.has(k));
const extraInTrans = [...trKeys].filter(k => !exKeys.has(k));

console.log(`Extract keys: ${exKeys.size}`);
console.log(`Trans keys:   ${trKeys.size}`);
console.log(`Missing in trans: ${missingInTrans.length}`);
console.log(`Extra in trans:   ${extraInTrans.length}`);

if (missingInTrans.length) console.log('  Missing:', missingInTrans.slice(0, 5));
if (extraInTrans.length) console.log('  Extra:', extraInTrans.slice(0, 5));

// Check for U+FFFD corruption and obvious English-only values
let corrupt = 0, englishOnly = 0, samples = [];
for (const [k, v] of Object.entries(trans)) {
  const val = Array.isArray(v) ? v.join(' ') : String(v);
  if (val.includes('\uFFFD')) corrupt++;
  // English-only heuristic: only ASCII letters/spaces/punctuation, no CJK/Cyrillic/Arabic/Devanagari/Hangul
  const hasNonAscii = /[^\x00-\x7F]/.test(val);
  if (!hasNonAscii && val.length > 3) {
    // Could be legitimate (URLs, $ amounts, breed names) — sample for review
    englishOnly++;
    if (samples.length < 5) samples.push({ key: k, val: val.slice(0, 60) });
  }
}
console.log(`\nCorrupt (U+FFFD): ${corrupt}`);
console.log(`ASCII-only values: ${englishOnly} (may be legitimate URLs/$/breeds)`);
if (samples.length) console.log('  Samples:', JSON.stringify(samples, null, 2));

// Show 3 sample translations
console.log('\nSample translations:');
const keys = Object.keys(trans).slice(0, 3);
for (const k of keys) {
  const v = trans[k];
  console.log(`  ${k}: ${JSON.stringify(v).slice(0, 100)}`);
}
