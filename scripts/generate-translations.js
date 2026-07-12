const fs = require('fs');

function stripBOM(str) {
  return str.replace(/^\uFEFF/, '');
}

const en = JSON.parse(stripBOM(fs.readFileSync('messages/en.json', 'utf8')));
const ja = JSON.parse(stripBOM(fs.readFileSync('messages/ja.json', 'utf8')));

function flatten(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const enFlat = flatten(en);
const jaFlat = flatten(ja);

const untranslated = {};
for (const key in jaFlat) {
  if (enFlat[key] && jaFlat[key] === enFlat[key]) {
    untranslated[key] = enFlat[key];
  }
}

// TRANSLATIONS MAP
const translations = {
  "calculator.activityLevel": "活動レベル",
  "calculator.bodyCondition": "体調",
  "calculator.breedSize": "品種サイズ",
  "calculator.dailyCalories": "1日のカロリー",
  "calculator.feedAmount": "給餌量",
  "calculator.healthyWeight": "健康体重",
  "calculator.recommended": "推奨",
  "calculator.reproductiveStatus": "繁殖状態",
  "calculator.result": "結果",
  "calculator.waterNeeded": "必要水分量",
  "cat.guide.newKitten.meta.description": "40項目の完全な子猫チェックリスト。インタラクティブ、印刷可能なPDF、コスト見積もり、タイムライン、専門家のヒント付き。",
  "cat.guide.newKitten.meta.title": "子猫チェックリスト：初日に必要なすべてのもの | petsMetrics",
  "cat.toolGrid.priority": "P1",
  "cat.toolGrid.rating": "P0",
  "catBcs.result.bcsScore": "BCS {score}/9",
  "common.notFound.title": "404",
  "common.unit.kcal": "kcal",
  "common.unit.kg": "kg",
  "common.unit.lb": "lb",
  "common.unit.ml": "ml",
  "common.unit.oz": "oz",
  "dog.toolGrid.priority": "P1",
  "dog.toolGrid.rating": "P0",
  "header.logoAlt": "petsMetrics",
  "puppyGrowth.result.predictedRange": "{min} – {max} kg",
  "toxicLanding.aspcaNumber": "(888) 426-4435",
  "toxicLanding.petPoisonNumber": "(855) 764-7661"
};

console.log('Static translations:', Object.keys(translations).length);
fs.writeFileSync('scripts/ja-translations-map.json', JSON.stringify(translations, null, 2));
console.log('Written static translations');
