const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const en = JSON.parse(enRaw);

const locales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi', 'zh'];

function flatten(obj, prefix = '') {
  let result = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result = { ...result, ...flatten(obj[key], fullKey) };
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

// Patterns that are OK to be in English
const okPatterns = [
  /^\d+$/,                           // pure numbers (404, etc)
  /^\([0-9\s\-\(\)]+$/,             // phone numbers
  /^P[0-9]$/,                        // priority markers
  /ASPCA|AVMA|AAHA|AAFCO|AAFP|WSAVA|AKC|USDA|UCSD|NAPHIA/i,  // organization names
  /Labrador|German Shepherd|French Bulldog|Golden Retriever/i, // dog breeds (keep English)
  /petsMetrics/i,                    // brand name
  /\.meta\./,                        // SEO meta tags (often keep English)
  /.*\.aria$/,                       // aria labels sometimes same
  /.*\.verdict$/,                    // comparison verdicts (data content)
];

function isLikelyOk(key, value) {
  if (!value || value === '') return true;
  for (const pattern of okPatterns) {
    if (pattern.test(value) || pattern.test(key)) return true;
  }
  return false;
}

const enFlat = flatten(en);
const enKeys = Object.keys(enFlat);

console.log('=== i18n Coverage Report ===\n');
console.log('English total keys:', enKeys.length, '\n');

for (const locale of locales) {
  const raw = fs.readFileSync(path.join(msgDir, locale + '.json'), 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const flat = flatten(data);
  const keys = Object.keys(flat);
  
  const missing = enKeys.filter(k => !keys.includes(k));
  const sameButOk = keys.filter(k => flat[k] === enFlat[k] && enFlat[k] !== '' && isLikelyOk(k, flat[k]));
  const needsTranslation = keys.filter(k => flat[k] === enFlat[k] && enFlat[k] !== '' && !isLikelyOk(k, flat[k]));
  
  console.log(`${locale.toUpperCase()}:`);
  console.log(`  Keys present: ${keys.length}/${enKeys.length}`);
  console.log(`  Missing keys: ${missing.length}`);
  console.log(`  Same as English (OK - phone/rating/etc): ${sameButOk.length}`);
  console.log(`  ⚠️  NEEDS TRANSLATION: ${needsTranslation.length}`);
  
  if (needsTranslation.length > 0 && needsTranslation.length <= 15) {
    console.log('  Examples:');
    needsTranslation.slice(0, 15).forEach(k => {
      const v = flat[k];
      console.log(`    - ${k}: ${v.length > 60 ? v.substring(0, 60) + '...' : v}`);
    });
  } else if (needsTranslation.length > 15) {
    console.log('  Examples (first 15):');
    needsTranslation.slice(0, 15).forEach(k => {
      const v = flat[k];
      console.log(`    - ${k}: ${v.length > 60 ? v.substring(0, 60) + '...' : v}`);
    });
  }
  console.log('');
}
