// Targeted fix: Apply proper German translations for 12 keys that were
// incorrectly flagged as keep-as-is by the build script's broad patterns.
import { readFileSync, writeFileSync } from 'fs';

const deRaw = readFileSync('./messages/de.json', 'utf8');
const de = JSON.parse(deRaw.charCodeAt(0) === 0xFEFF ? deRaw.slice(1) : deRaw);

function setNested(obj, dotpath, value) {
  const parts = dotpath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in cur) || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

const fixes = {
  // home.hero.cardBreedAge — breed/age/weight display line, not just a breed name
  'home.hero.cardBreedAge': 'Labrador · 3 J. · 28 kg',
  // home.stats.standards — heading text describing standards
  'home.stats.standards': 'AAHA- / WSAVA-Standards',
  // dog.breedContent breed card titles — "Labrador Xyz", "Golden Retriever Xyz"
  'dog.breedContent.breeds.labrador.calorie': 'Labrador Kalorienrechner',
  'dog.breedContent.breeds.labrador.age': 'Labrador menschliches Alter',
  'dog.breedContent.breeds.labrador.growth': 'Labrador Welpe-Wachstumstabelle',
  'dog.breedContent.breeds.goldenRetriever.age': 'Golden Retriever Altersrechner',
  'dog.breedContent.breeds.goldenRetriever.calorie': 'Golden Retriever Kalorienbedarf',
  // dogAge.result.equivalent — full sentence with variables
  'dogAge.result.equivalent':
    'In menschenentsprechenden Jahren ist {name} wie ein {age}-jähriger {stageName} — energiegeladen, in den besten Jahren, mit vielen gesunden Jahren vor sich.',
  // dogAge.scienceSection.aaGuidelines — section heading
  'dogAge.scienceSection.aaGuidelines': 'AAHA-Lebensphasenrichtlinien',
  // puppyGrowth.result.predictedLabel — label with variables
  'puppyGrowth.result.predictedLabel': 'Vorhergesagtes Erwachsenengewicht: {min}–{max} kg',
  // catBcs.result.condition.ideal — short result label
  'catBcs.result.condition.ideal': 'Idealgewicht',
  // emergency.ateCaffeine.toxicityData.ld50 — LD50 toxicity value
  'emergency.ateCaffeine.toxicityData.ld50': 'LD50: ~140 mg/kg Körpergewicht',
};

let count = 0;
for (const [key, value] of Object.entries(fixes)) {
  setNested(de, key, value);
  count++;
  console.log(`  Fixed: ${key}`);
}

writeFileSync('./messages/de.json', JSON.stringify(de, null, 2) + '\n', 'utf8');
console.log(`\nApplied ${count} targeted German translations to messages/de.json`);
