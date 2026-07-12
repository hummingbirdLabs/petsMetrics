const fs = require('fs');
const path = require('path');
const { guideTranslations } = require('./i18n-translations');

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

let totalApplied = 0;

for (const locale of locales) {
  const filePath = path.join(msgDir, locale + '.json');
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  
  let applied = 0;
  
  for (const [key, translations] of Object.entries(guideTranslations)) {
    if (translations[locale]) {
      setNestedValue(data, key, translations[locale]);
      applied++;
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`${locale}.json: Applied ${applied} translations`);
  totalApplied += applied;
}

console.log(`\nTotal: ${totalApplied} translations applied across ${locales.length} languages`);
