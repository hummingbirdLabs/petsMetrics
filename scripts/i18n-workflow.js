// i18n translation workflow tool for petsMetrics
// Usage:
//   node scripts/i18n-workflow.js extract <lang>   — extracts untranslated + missing leaves to messages/_extract_<lang>.json
//   node scripts/i18n-workflow.js merge <lang>     — deep-merges messages/_trans_<lang>.json into messages/<lang>.json
//
// Extract output format: { "dotted.path[0].field": "English source value", ... }
// Merge input format:    { "dotted.path[0].field": "translated value", ... }
//
// Path tokens: dots for object keys, [N] for array indices, e.g. "compare.spayedVsUnspayed.topicA.pros[0].title"
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'messages');
const langs = ['zh','fr','de','ja','ko','es','pt','nl','ar','ru','hi'];

function load(file) { return JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')); }
function save(file, data) { fs.writeFileSync(path.join(dir, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

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

const VALUE_WHITELIST = [
  /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,                // phone numbers
  /^\$[\d,.\-–+\s]+$/,                                     // pure currency $2-5
  /^ISO\s?\d/,                                             // ISO 11784/11785
  /^\{[^}]+\}\s*[\u2014\u2013\-]?\s*\{[^}]+\}(\s+(kg|lbs?|oz|mg|ml|kcal|cm|in))?$/,  // "{a} — {b}" or "{a} — {b} kg"
];
const PATH_WHITELIST = [
  /^common\.unit\./, /\.href$/, /\.url$/, /\.slug$/, /\.relatedEmergency$/, /\.aspcaLink$/,
  /\.color$/,                                              // CSS color keys (yellow/orange/green)
  /^toxicLanding\.(aspca|petPoison)Number$/,
  /^dog\.breedContent\.breeds\.[^.]+\.name$/,
  /^cat\.breedContent\.breeds\.[^.]+\.name$/,
  /^nav\.(dog|cat|shared|profile)$/, /^header\.logoAlt$/,
  // riskAssessment data-threshold fields (keep prose fields like riskLevel/action/actionRequired translatable)
  /riskAssessment\.rows\[\d+\]\.(amount|weight|level|amountEaten|activeIngredient|xylitolContent|source|type)$/,
  // Medical score formats & BCS labels (universal — keep identical across locales)
  /^catBcs\.result\.bcsScore$/,
  /^common\.sidebar\..*Bcs\.ideal$/,
  // Proper nouns — US holiday names kept in English across all locales
  /^seasonal\.thanksgiving\.season$/,
];
// Heuristic: a value is "pure data" if, after stripping unit tokens + numeric/operator chars,
// almost nothing remains (e.g. "~10%", "350–450 kcal/100g", "12–18+ years", "$2-5").
const UNIT_RE = /\b(lbs?|kg|oz|mg|ml|kcal|years?|months?|weeks?|days?|kcal\/100g|mg\/oz|mg\/kg|g\/kg|\/oz|\/kg|\/lb|\/100g)\b/gi;
function isPureDataValue(s) {
  const stripped = s.replace(UNIT_RE, '').replace(/[\d<>,\-–+\s~%$]/g, '').trim();
  return stripped.length <= 2;
}
// Latin-script languages where English cognates are legitimate translations.
// For non-Latin languages (zh/ja/ko/ar/ru/hi), identical-to-English values are real leaks.
const LATIN_LANGS = new Set(['fr', 'de', 'es', 'pt', 'nl']);
// Single words identical in English AND at least one Latin-script target language.
// These are NOT leaks — they're correct translations that happen to share spelling.
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
  // Cognate check: for Latin-script languages, single-word English cognates are valid
  if (lang && LATIN_LANGS.has(lang) && COGNATE_VALUES.has(s)) return true;
  return false;
}

// ---- EXTRACT ----
function extract(lang) {
  const en = load('en.json');
  const enLeaves = new Map(collectLeaves(en));
  const data = load(lang + '.json');
  const langLeaves = new Map(collectLeaves(data));
  const out = {};
  let missing = 0, leak = 0, corrupt = 0;
  for (const [k, enVal] of enLeaves) {
    if (!langLeaves.has(k)) {
      // Missing key — include if it's a string needing translation OR a whitelisted value to copy
      if (typeof enVal === 'string') {
        out[k] = enVal;
        missing++;
      }
      // Non-string missing (numbers/booleans) handled at merge time via en.json structure
    } else {
      const lv = langLeaves.get(k);
      if (typeof enVal !== 'string' || typeof lv !== 'string') continue;
      // Corrupted string (contains U+FFFD replacement char) — must re-translate
      if (lv.includes('\uFFFD')) {
        out[k] = enVal;
        corrupt++;
        continue;
      }
      // English leak — value identical to en source
      if (lv.trim() === enVal.trim() && !isWhitelisted(k, lv, lang) && enVal.trim().length >= 4) {
        out[k] = enVal;
        leak++;
      }
    }
  }
  save('_extract_' + lang + '.json', out);
  console.log(`[${lang}] extracted: ${missing} missing + ${leak} leak + ${corrupt} corrupt = ${missing + leak + corrupt} strings → messages/_extract_${lang}.json`);
}

// ---- MERGE ----
// Parse "a.b[0].c" into ['a','b',0,'c']
function parsePath(p) {
  const tokens = [];
  const re = /([^.\[\]]+)|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(p)) !== null) {
    if (m[1] !== undefined) tokens.push(m[1]);
    else tokens.push(parseInt(m[2], 10));
  }
  return tokens;
}
function setPath(root, p, value) {
  const tokens = parsePath(p);
  let cur = root;
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i];
    const next = tokens[i + 1];
    if (typeof t === 'number') {
      if (!Array.isArray(cur)) throw new Error('Expected array at ' + p);
      while (cur.length <= t) cur.push({});
      if (cur[t] === null || typeof cur[t] !== 'object') cur[t] = typeof next === 'number' ? [] : {};
      cur = cur[t];
    } else {
      if (typeof cur !== 'object' || Array.isArray(cur) || cur === null) throw new Error('Expected object at ' + p);
      if (cur[t] === undefined || cur[t] === null || typeof cur[t] !== 'object') cur[t] = typeof next === 'number' ? [] : {};
      cur = cur[t];
    }
  }
  const last = tokens[tokens.length - 1];
  if (typeof last === 'number') {
    if (!Array.isArray(cur)) throw new Error('Expected array at ' + p);
    while (cur.length <= last) cur.push({});
    cur[last] = value;
  } else {
    cur[last] = value;
  }
}

function merge(lang) {
  const transFile = '_trans_' + lang + '.json';
  if (!fs.existsSync(path.join(dir, transFile))) { console.error('Missing ' + transFile); process.exit(1); }
  const trans = load(transFile);
  const data = load(lang + '.json');
  let applied = 0, skipped = 0;
  for (const [k, v] of Object.entries(trans)) {
    try {
      setPath(data, k, v);
      applied++;
    } catch (e) {
      console.error('SKIP ' + k + ': ' + e.message);
      skipped++;
    }
  }
  save(lang + '.json', data);
  console.log(`[${lang}] merged: ${applied} applied, ${skipped} skipped → messages/${lang}.json`);
}

// ---- MAIN ----
const cmd = process.argv[2];
const lang = process.argv[3];
if (!cmd || !lang || !langs.includes(lang)) {
  console.error('Usage: node scripts/i18n-workflow.js <extract|merge> <lang>');
  console.error('Langs: ' + langs.join(', '));
  process.exit(1);
}
if (cmd === 'extract') extract(lang);
else if (cmd === 'merge') merge(lang);
else { console.error('Unknown command: ' + cmd); process.exit(1); }
