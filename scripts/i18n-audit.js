// i18n coverage auditor for petsMetrics (Next.js + next-intl)
// Usage: node scripts/i18n-audit.js
// Baseline: messages/en.json. Compares all other locale files for:
//   1. Missing leaf keys (structural gaps)
//   2. Genuine English-leak strings (values identical to en, excluding whitelist)
//
// Whitelist (legitimately kept in English across all locales):
//   - phone numbers, units (kg/lb/ml/oz/kcal), URLs, slugs, relatedEmergency paths
//   - brand/breed names (petsMetrics, Labrador Retriever, etc.)
//   - pure numbers, short codes <=3 chars (except yes/no/dog/cat)
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'messages');
const langs = ['zh','fr','de','ja','ko','es','pt','nl','ar','ru','hi'];

function load(file) {
  return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
}

function collectLeaves(obj, prefix = '') {
  const out = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => out.push(...collectLeaves(item, prefix + '[' + i + ']')));
  } else if (obj !== null && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const full = prefix ? prefix + '.' + k : k;
      out.push(...collectLeaves(obj[k], full));
    }
  } else {
    out.push([prefix, obj]);
  }
  return out;
}

const en = load('en.json');
const enLeaves = new Map(collectLeaves(en));
const enLeafKeys = new Set(enLeaves.keys());

const VALUE_WHITELIST = [
  /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  /^\$[\d,.\-–+\s]+$/,
  /^ISO\s?\d/,
  /^\{[^}]+\}\s*[\u2014\u2013\-]?\s*\{[^}]+\}(\s+(kg|lbs?|oz|mg|ml|kcal|cm|in))?$/,
];
const PATH_WHITELIST = [
  /^common\.unit\./, /\.href$/, /\.url$/, /\.slug$/, /\.relatedEmergency$/, /\.aspcaLink$/,
  /\.color$/,
  /^toxicLanding\.(aspca|petPoison)Number$/,
  /^dog\.breedContent\.breeds\.[^.]+\.name$/,
  /^cat\.breedContent\.breeds\.[^.]+\.name$/,
  /^nav\.(dog|cat|shared|profile)$/, /^header\.logoAlt$/,
  /riskAssessment\.rows\[\d+\]\.(amount|weight|level|amountEaten|activeIngredient|xylitolContent|source|type)$/,
  // Medical score formats & BCS labels (universal — keep identical across locales)
  /^catBcs\.result\.bcsScore$/,
  /^common\.sidebar\..*Bcs\.ideal$/,
  // Proper nouns — US holiday names kept in English across all locales
  /^seasonal\.thanksgiving\.season$/,
];
const UNIT_RE = /\b(lbs?|kg|oz|mg|ml|kcal|years?|months?|weeks?|days?|kcal\/100g|mg\/oz|mg\/kg|g\/kg|\/oz|\/kg|\/lb|\/100g)\b/gi;
function isPureDataValue(s) {
  const stripped = s.replace(UNIT_RE, '').replace(/[\d<>,\-–+\s~%$]/g, '').trim();
  return stripped.length <= 2;
}
// Latin-script languages where English cognates are legitimate translations.
const LATIN_LANGS = new Set(['fr', 'de', 'es', 'pt', 'nl']);
const COGNATE_VALUES = new Set([
  'Ideal', 'Optional', 'Senior', 'Status', 'Minimal', 'Protein', 'Normal',
  'Optimal', 'Premium', 'Standard', 'Maximum', 'Minimum',
]);
function isWhitelisted(p, v, lang) {
  if (typeof v !== 'string') return true;
  const s = v.trim();
  if (!s) return true;
  for (const re of VALUE_WHITELIST) if (re.test(s)) return true;
  for (const re of PATH_WHITELIST) if (re.test(p)) return true;
  if (isPureDataValue(s)) return true;
  if (/^[0-9.,\-+/:%°FCA\s]+$/.test(s) && s.length < 15) return true;
  if (/^[a-z]{1,3}$/i.test(s) && !/^(yes|no|dog|cat)$/i.test(s)) return true;
  if (lang && LATIN_LANGS.has(lang) && COGNATE_VALUES.has(s)) return true;
  return false;
}

console.log(`Baseline en.json: ${enLeafKeys.size} leaf values\n`);
console.log('Lang   Missing  EnLeak  Corrupt');
console.log('------  -------  ------  -------');
const summary = [];
for (const lang of langs) {
  const data = load(lang + '.json');
  const leaves = new Map(collectLeaves(data));
  const missing = [...enLeafKeys].filter(k => !leaves.has(k));
  let leak = 0, corrupt = 0;
  for (const [k, v] of leaves) {
    if (!enLeafKeys.has(k)) continue;
    const ev = enLeaves.get(k);
    if (typeof v !== 'string' || typeof ev !== 'string') continue;
    if (v.includes('\uFFFD')) { corrupt++; continue; }
    if (v.trim() !== ev.trim()) continue;
    if (isWhitelisted(k, v, lang)) continue;
    if (ev.trim().length < 4) continue;
    leak++;
  }
  summary.push({ lang, missing: missing.length, leak, corrupt });
  console.log(`${lang.padEnd(6)}  ${String(missing.length).padStart(7)}  ${String(leak).padStart(6)}  ${String(corrupt).padStart(7)}`);
}
