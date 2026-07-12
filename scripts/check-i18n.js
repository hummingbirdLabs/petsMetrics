const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const enRaw = fs.readFileSync(path.join(msgDir, 'en.json'), 'utf8').replace(/^\uFEFF/, '');
const en = JSON.parse(enRaw);

const locales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi', 'zh'];

// Flatten object to dot-separated keys
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

const enFlat = flatten(en);
const enKeys = Object.keys(enFlat);

console.log('=== English reference keys:', enKeys.length);
console.log('');

let totalIssues = 0;

for (const locale of locales) {
  try {
    const raw = fs.readFileSync(path.join(msgDir, locale + '.json'), 'utf8').replace(/^\uFEFF/, '');
    const data = JSON.parse(raw);
    const flat = flatten(data);
    const keys = Object.keys(flat);
    
    // Find missing keys
    const missing = enKeys.filter(k => !keys.includes(k));
    // Find extra keys
    const extra = keys.filter(k => !enKeys.includes(k));
    
    // Find potentially untranslated values (same as English)
    const sameAsEn = keys.filter(k => flat[k] === enFlat[k] && enFlat[k] !== '');
    
    if (missing.length === 0 && sameAsEn.length === 0 && extra.length === 0) {
      console.log(locale + '.json: ✅ Perfect! All ' + keys.length + ' keys present and translated');
    } else {
      console.log(locale + '.json:');
      console.log('  Total keys:', keys.length, '(expected:', enKeys.length + ')');
      if (missing.length > 0) {
        console.log('  ❌ Missing keys (' + missing.length + '):');
        missing.forEach(k => console.log('    - ' + k));
        totalIssues += missing.length;
      }
      if (extra.length > 0) {
        console.log('  ⚠️  Extra keys (' + extra.length + '):');
        extra.forEach(k => console.log('    + ' + k));
      }
      if (sameAsEn.length > 0) {
        console.log('  ⚠️  Same as English (possibly untranslated): (' + sameAsEn.length + '):');
        sameAsEn.slice(0, 30).forEach(k => console.log('    = ' + k + ': "' + flat[k] + '"'));
        if (sameAsEn.length > 30) console.log('    ... and ' + (sameAsEn.length - 30) + ' more');
        totalIssues += sameAsEn.length;
      }
    }
    console.log('');
  } catch (e) {
    console.log(locale + '.json: ERROR -', e.message);
  }
}

console.log('=========================================');
if (totalIssues === 0) {
  console.log('✅ ALL LANGUAGES ARE COMPLETELY TRANSLATED!');
} else {
  console.log('⚠️  Total issues found:', totalIssues);
}
