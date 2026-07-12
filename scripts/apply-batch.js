const fs = require('fs');
const path = require('path');

const msgDir = path.join(__dirname, '..', 'messages');
const locales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

function setNestedValue(obj, dotKey, value) {
  const keys = dotKey.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

function applyBatch(batchFile) {
  const { translations } = require(batchFile);
  
  let totalApplied = 0;
  
  for (const locale of locales) {
    const filePath = path.join(msgDir, locale + '.json');
    const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
    const data = JSON.parse(raw);
    
    let applied = 0;
    
    for (const [key, trans] of Object.entries(translations)) {
      if (trans[locale]) {
        setNestedValue(data, key, trans[locale]);
        applied++;
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`${locale}.json: Applied ${applied} translations`);
    totalApplied += applied;
  }
  
  return totalApplied;
}

// Apply batch 3
const total = applyBatch('./i18n-translations-3.js');
console.log(`\nTotal: ${total} translations applied`);
