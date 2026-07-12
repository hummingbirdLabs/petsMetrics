// Generate German translations data file
// This script generates the de-translations-data.json from English values
import { readFileSync, writeFileSync } from 'fs';

const en = JSON.parse(readFileSync('./messages/en.json', 'utf8').replace(/^\uFEFF/, ''));

function flatten(obj, prefix = '') {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(result, flatten(v, path));
    } else {
      result[path] = v;
    }
  }
  return result;
}

// Keys that should be kept as-is (units, URL, phone number, brand name, etc.)
const KEEP_AS = /^kg$|^lb$|^ml$|^oz$|^kcal$|^404$|^https?:\/\//;
const PHONE = /\(\d{3}\)\s*\d{3}-\d{4}/;
const URL = /^https?:\/\//;
const VARIABLE = /\{[a-z]+\}/i;
const ACRONYM = /^(ASPCA|AVMA|AAHA|AAFP|LD50|P0|P1)$/;
const BREED_NAME = /Retriever/;
const BCS_LABEL = /^Ideal|^BCS /;

const translations = {};

for (const [key, value] of Object.entries(flatten(en))) {
  // Skip if not a string
  if (typeof value !== 'string') continue;
  if (!value.trim()) continue;

  // Keep units
  if (KEEP_AS.test(value.trim())) {
    translations[key] = value;
    continue;
  }

  // Keep URLs
  if (URL.test(value)) {
    translations[key] = value;
    continue;
  }

  // Keep only phone numbers
  if (value.length < 50 && PHONE.test(value) && !/[a-zA-Z]{5,}/.test(value)) {
    translations[key] = value.trim();
    continue;
  }

  // Keep brand name
  if (value === 'petsMetrics') {
    translations[key] = value;
    continue;
  }

  // Keep breed names
  if (key.endsWith('.name') && BREED_NAME.test(value)) {
    translations[key] = value;
    continue;
  }

  // Keep BCS labels like "Ideal", "BCS 5/9"
  if (BCS_LABEL.test(value) && value.length < 30) {
    translations[key] = value;
    continue;
  }

  // Keep priority codes
  if (ACRONYM.test(value)) {
    translations[key] = value;
    continue;
  }

  // Keep LD50 values and toxicity data
  if (value.startsWith('LD50') || value.startsWith('Minimum toxic dose') || value === 'Not applicable' || value === 'N/A (mechanical hazard') {
    translations[key] = value;
    continue;
  }

  // For variables like "{stage} — {stageName}" translate template parts
  if (key.includes('cardTitle') && VARIABLE.test(value)) {
    translations[key] = '{stage} — {stageName}';
    continue;
  }

  if (key === 'puppyGrowth.result.predictedRange') {
    translations[key] = '{min} – {max} kg';
    continue;
  }

  if (key === 'catBcs.result.bcsScore') {
    translations[key] = 'BCS {score}/9';
    continue;
  }

  // For phone-heavy values, keep as-is
  if (value.includes('(888) 426-4435') && value.length < 200) {
    translations[key] = value;
    continue;
  }

  // For toxicity sources, keep source citations
  if (key.endsWith('.source') || key.endsWith('.ld50') || key.endsWith('.minimum')) {
    const lowerVal = value.toLowerCase();
    if (lowerVal.startsWith('source') || lowerVal.startsWith('ld50') || lowerVal.startsWith('minimum') ||
        lowerVal.startsWith('not applicable') || lowerVal.startsWith('n/a') || lowerVal.startsWith('not well') ||
        lowerVal.startsWith('drug-dependent') || lowerVal.startsWith('varies')) {
      translations[key] = value;
      continue;
    }
  }

  // For toxicity examples
  if (key.endsWith('.example')) {
    const lowerVal = value.toLowerCase();
    if (lowerVal.startsWith('example') || lowerVal.startsWith('a single') || lowerVal.startsWith('partial') ||
        lowerVal.startsWith('a 2cm') || lowerVal.startsWith('a single 200mg') || lowerVal.startsWith('1 teaspoon') ||
        lowerVal.startsWith('1 kaugummi') || lowerVal.startsWith('===') || lowerVal.startsWith('one amanita') ||
        lowerVal.startsWith('1 brownie') || lowerVal.startsWith('1 ibuprofen') || lowerVal.startsWith('10 g') ||
        lowerVal.startsWith('1 clove garlic') || lowerVal.startsWith('30 g zartbitter') ||
        lowerVal.startsWith('1 angelhaken') || lowerVal.startsWith('1 lilien') ||
        lowerVal.startsWith('1 große zwiebel') || lowerVal.startsWith('jede schnur') ||
        lowerVal.startsWith('jegliche aufnahme') || lowerVal.startsWith('eine golfkugel')) {
      translations[key] = value;
      continue;
    }
  }

  // For "plus (optional):"
  if (value.includes('(optional)')) {
    translations[key] = value;
    continue;
  }

  // Default: pass through for now (will be manually translated)
  translations[key] = null;
}

const final = {};
let count = 0;
for (const [k, v] of Object.entries(translations)) {
  if (v !== null) {
    final[k] = v;
    count++;
  }
}

writeFileSync('./scripts/de-translations-data.json', JSON.stringify(final, null, 2), 'utf8');
console.log(`Generated ${count} automatic translations`);
console.log(`Remaining keys needing manual translation: ${Object.keys(translations).length - count}`);
