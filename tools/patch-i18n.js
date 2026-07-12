/**
 * i18n Translation Patcher
 * 
 * Reads the en.json baseline and a target language JSON,
 * applies translations for all untranslated strings.
 * 
 * Usage: node tools/patch-i18n.js <lang-code>
 * 
 * Translations are provided inline in the translate() function.
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// Collect all string paths from en.json
function collectPaths(obj, prefix) {
  prefix = prefix || '';
  const paths = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? prefix + '.' + k : k;
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === 'string') {
          paths.push({ path: full, idx: i, subKey: null, enValue: v[i] });
        } else if (typeof v[i] === 'object' && v[i] !== null) {
          for (const [sk, sv] of Object.entries(v[i])) {
            if (typeof sv === 'string') {
              paths.push({ path: full, idx: i, subKey: sk, enValue: sv });
            }
          }
        }
      }
    } else if (typeof v === 'object' && v !== null) {
      paths.push(...collectPaths(v, full));
    } else if (typeof v === 'string') {
      paths.push({ path: full, idx: null, subKey: null, enValue: v });
    }
  }
  return paths;
}

// Get value at path in target JSON
function getValueAt(obj, item) {
  const parts = item.path.split('.');
  let current = obj;
  for (const p of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[p];
  }
  if (item.idx !== null && Array.isArray(current)) {
    const elem = current[item.idx];
    if (item.subKey !== null && typeof elem === 'object' && elem !== null) {
      return elem[item.subKey];
    }
    return elem;
  }
  return current;
}

// Set value at path in target JSON
function setValueAt(obj, item, value) {
  const parts = item.path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  const last = parts[parts.length - 1];
  
  if (item.idx !== null) {
    if (!Array.isArray(current[last])) current[last] = [];
    if (item.subKey !== null) {
      if (!current[last][item.idx]) current[last][item.idx] = {};
      current[last][item.idx][item.subKey] = value;
    } else {
      current[last][item.idx] = value;
    }
  } else {
    current[last] = value;
  }
}

// Skip keys that should stay as-is
function shouldSkip(enValue) {
  if (/^\(\d{3}\)\s\d{3}[-]\d{4}$/.test(enValue)) return true;
  if (/^https?:\/\//.test(enValue)) return true;
  if (['kg', 'lb', 'ml', 'oz', 'kcal', 'g'].includes(enValue)) return true;
  if (enValue === 'petsMetrics') return true;
  if (/^\d+$/.test(enValue)) return true;
  if (enValue.length <= 3 && /^[A-Za-z]+$/.test(enValue)) return true;
  // URLs in strings
  if (enValue.includes('http://') || enValue.includes('https://')) return true;
  return false;
}

// ============================================================
// TRANSLATION FUNCTION - Edit this to add translations
// ============================================================
function translate(enValue, lang) {
  // Common translations shared across languages
  const commonMap = {
    'de': {
      'Dimension': 'Dimension',
      'Breed matters. Golden Retrievers, German Shepherds, and Boxers have different cancer risks, life expectancies, and dietary needs. Always consult your vet for breed-specific decisions.': 'Die Rasse ist wichtig. Golden Retriever, Deutsche Schäferhunde und Boxer haben unterschiedliche Krebsrisiken, Lebenserwartungen und Ernährungsbedürfnisse. Konsultieren Sie immer Ihren Tierarzt für rassespezifische Entscheidungen.',
      'Raw diets carry bacterial risks (Salmonella, Campylobacter). Always consult a veterinary nutritionist before switching to raw.': 'Rohfutter birgt bakterielle Risiken (Salmonellen, Campylobacter). Konsultieren Sie immer einen tierärztlichen Ernährungsberater, bevor Sie auf Rohfutter umstellen.',
      'Breed matters.': 'Die Rasse ist wichtig.',
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'Buddy': 'Buddy',
      'Optional': 'Optional',
      'Senior': 'Senior',
      'Ideal: 4-5/9': 'Ideal: 4-5/9',
      'Tool CTA': 'Tool CTA',
      'Ideal': 'Ideal',
      'ASPCA Poison Control: (888) 426-4435': 'ASPCA Giftnotruf: (888) 426-4435',
      'plus (optional):': 'plus (optional):',
      'Status': 'Status',
      'coeff.': 'Koeff.',
      'Intact': 'Intakt',
      'Contact': 'Kontakt',
      'Disclaimer': 'Haftungsausschluss',
      'Home': 'Startseite',
      'Recent:': 'Kürzlich:',
      'ASPCA Animal Poison Control': 'ASPCA Tiergiftkontrolle',
      'Source': 'Quelle',
      'Destination': 'Ziel',
      'Microchip (ISO 11784/11785)': 'Mikrochip (ISO 11784/11785)',
      'Pro Tip': 'Profi-Tipp',
      'Gewicht': 'Gewicht',
      'petsMetrics. All rights reserved.': 'petsMetrics. Alle Rechte vorbehalten.',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'ASPCA Poison Control: (888) 426-4435 · Pet Poison Helpline: (855) 764-7661': 'ASPCA Giftnotruf: (888) 426-4435 · Pet Poison Helpline: (855) 764-7661',
      '4. Analytics': '4. Analytics',
      '9. Contact': '9. Kontakt',
    },
    'fr': {
      'Dimension': 'Dimension',
      'Intact': 'Intact',
      'Contact': 'Contact',
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'coeff.': 'coeff.',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'Source': 'Source',
      'ASPCA Animal Poison Control': 'Centre Antipoison ASPCA',
      'Destination': 'Destination',
      'Microchip (ISO 11784/11785)': 'Puce électronique (ISO 11784/11785)',
      '9. Contact': '9. Contact',
    },
    'ja': {
      'P0': 'P0',
      'P1': 'P1',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'petsMetrics. All rights reserved.': 'petsMetrics. All rights reserved.',
    },
    'ko': {
      'P0': 'P0',
      'P1': 'P1',
    },
    'es': {
      'Dimension': 'Dimensión',
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'Buddy': 'Buddy',
      'Ideal: 4-5/9': 'Ideal: 4-5/9',
      'Ideal': 'Ideal',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'Microchip (ISO 11784/11785)': 'Microchip (ISO 11784/11785)',
    },
    'pt': {
      'Dimension': 'Dimensão',
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'Buddy': 'Buddy',
      'Ideal: 4-5/9': 'Ideal: 4-5/9',
      'Ideal': 'Ideal',
      'Status': 'Status',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'Microchip (ISO 11784/11785)': 'Microchip (ISO 11784/11785)',
    },
    'nl': {
      'Dimension': 'Dimensie',
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'Buddy': 'Buddy',
      'Senior': 'Senior',
      'Intact': 'Intact',
      'Tool CTA': 'Tool CTA',
      'Home': 'Home',
      'Disclaimer': 'Disclaimer',
      'Contact': 'Contact',
      'coeff.': 'coëff.',
      'Status': 'Status',
      'BCS {score}/9': 'BCS {score}/9',
      '{min} – {max} kg': '{min} – {max} kg',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'ASPCA Poison Control: (888) 426-4435': 'ASPCA Poison Control: (888) 426-4435',
      'Recent:': 'Recent:',
      'ASPCA Animal Poison Control': 'ASPCA Animal Poison Control',
      'ASPCA Poison Control: (888) 426-4435 · Pet Poison Helpline: (855) 764-7661': 'ASPCA Poison Control: (888) 426-4435 · Pet Poison Helpline: (855) 764-7661',
      'Microchip (ISO 11784/11785)': 'Microchip (ISO 11784/11785)',
      'Pro Tip': 'Pro Tip',
      'Gewicht': 'Gewicht',
      '4. Analytics': '4. Analytics',
      '9. Contact': '9. Contact',
    },
    'ar': {
      'P0': 'P0',
      'P1': 'P1',
      '{stage} — {stageName}': '{stage} — {stageName}',
    },
    'ru': {
      'P0': 'P0',
      'P1': 'P1',
      '{stage} — {stageName}': '{stage} — {stageName}',
      'ASPCA Poison Control: (888) 426-4435': 'ASPCA Poison Control: (888) 426-4435',
    },
    'hi': {
      'P0': 'P0',
      'P1': 'P1',
      'Labrador Retriever': 'Labrador Retriever',
      'Golden Retriever': 'Golden Retriever',
      'ASPCA Poison Control: (888) 426-4435': 'ASPCA Poison Control: (888) 426-4435',
      '{stage} — {stageName}': '{stage} — {stageName}',
      '{min} – {max} kg': '{min} – {max} kg',
      'BCS {score}/9': 'BCS {score}/9',
    },
    'zh': {
      'P0': 'P0',
      'P1': 'P1',
    },
  };

  if (commonMap[lang] && commonMap[lang][enValue]) {
    return commonMap[lang][enValue];
  }

  return null; // No translation available yet
}

// Main
const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node tools/patch-i18n.js <lang-code>');
  process.exit(1);
}

const en = readJson('messages/en.json');
const target = readJson(path.join('messages', lang + '.json'));

const enPaths = collectPaths(en);
let patched = 0;
let skipped = 0;
let untranslated = 0;

for (const item of enPaths) {
  if (shouldSkip(item.enValue)) {
    skipped++;
    continue;
  }

  const targetVal = getValueAt(target, item);
  if (targetVal === undefined) {
    // Key doesn't exist in target
    continue;
  }

  if (targetVal === item.enValue) {
    const translation = translate(item.enValue, lang);
    if (translation !== null) {
      setValueAt(target, item, translation);
      patched++;
    } else {
      untranslated++;
    }
  }
}

fs.writeFileSync(path.join('messages', lang + '.json'), JSON.stringify(target, null, 2) + '\n');

console.log(`Language: ${lang}`);
console.log(`Patched: ${patched} strings`);
console.log(`Skipped: ${skipped} (intentionally kept as-is)`);
console.log(`Still untranslated: ${untranslated}`);
console.log(`Updated: messages/${lang}.json`);