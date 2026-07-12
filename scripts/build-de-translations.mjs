import { readFileSync, writeFileSync } from 'fs';

// This script regenerates de-translations-data.json from messages/en.json
// using a strict keepAsIs classification that avoids over-translating.
// Run apply-de-translations.mjs afterwards to apply to messages/de.json.

const enRaw = readFileSync('./messages/en.json', 'utf8');
const en = JSON.parse(enRaw.charCodeAt(0) === 0xFEFF ? enRaw.slice(1) : enRaw);

// Read the original untranslated keys list (517 keys)
const utRaw = readFileSync('./untranslatedKeys.json', 'utf8');
const ut = JSON.parse(utRaw.charCodeAt(0) === 0xFEFF ? utRaw.slice(1) : utRaw);
const utKeys = new Set(Object.keys(ut));

function flatten(obj, prefix = '') {
  const r = {};
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(r, flatten(v, p));
    else r[p] = v;
  }
  return r;
}

const eV = flatten(en);

// ── keepAsIs: only strictly mechanical values that must remain as-is ──
const keepAsIs = new Set();
for (const [k, v] of Object.entries(eV)) {
  if (!utKeys.has(k)) continue;
  const val = String(v).trim();
  if (/^(kg|lb|ml|oz|kcal)$/.test(val)) { keepAsIs.add(k); continue; }
  if (/^(P0|P1)$/.test(val)) { keepAsIs.add(k); continue; }
  if (/^https?:\/\//.test(val)) { keepAsIs.add(k); continue; }
  if (val === 'petsMetrics') { keepAsIs.add(k); continue; }
  if (/\(\d{3}\)\s*\d{3}-\d{4}/.test(val) && val.length < 60) {
    keepAsIs.add(k); continue;
  }
  // Source citations: contain year, short, are a proper citation
  if (/\b(20|19)\d{2}\b/.test(val) && val.length < 50 &&
      /\b(ASPCA|AVMA|AAHA|AAFP|FDA|AAFO|WSAVA|Merck|NRC|AAFCO)\b/.test(val)) {
    keepAsIs.add(k); continue;
  }
  // Values that are entirely variables and separators
  if (/^\{[a-z]+\}([\s\-—·]+\{[a-z]+\})*$/.test(val)) { keepAsIs.add(k); continue; }
  // BCS template with variable
  if (val === 'BCS {score}/9') { keepAsIs.add(k); continue; }
}

// ── German translations ──
// Translations are maintained in the existing de-translations-data.json
// which was already built. This script reads it and ensures all 517
// untranslated keys have an entry (either keep-as-is EN or proper DE).
const existingData = JSON.parse(readFileSync('./scripts/de-translations-data.json', 'utf8'));

// Build the final map: start from existing, then ensure all utKeys are present
const result = {};
for (const k of keepAsIs) {
  if (eV[k] !== undefined) result[k] = eV[k];
}
// Override with German translations (from existing data file)
for (const [k, v] of Object.entries(existingData)) {
  if (k in result || utKeys.has(k)) {
    result[k] = v;
  }
}
// Ensure any remaining untranslated key gets its EN value (fallback)
for (const k of utKeys) {
  if (!(k in result) && eV[k] !== undefined) {
    result[k] = eV[k];
  }
}

writeFileSync('./scripts/de-translations-data.json', JSON.stringify(result, null, 2), 'utf8');
console.log(`Regenerated de-translations-data.json: ${Object.keys(result).length} keys (${keepAsIs.size} keep-as-is)`);
