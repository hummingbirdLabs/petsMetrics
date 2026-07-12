/**
 * Build Translation Templates
 * 
 * Reads i18n-gaps.json and creates translation template files for each language.
 * Templates contain the English source text as placeholder values.
 * 
 * Filters out content that should NOT be translated:
 * - URLs (/path/to/page/)
 * - CSS colors (yellow, orange, green, etc.)
 * - Risk levels (HIGH, CRITICAL, Moderate, etc.)
 * - Short codes and abbreviations
 * - Numbers and measurements
 * 
 * Usage: node tools/build-translation-templates.js [lang-code]
 *   If lang-code omitted, generates for ALL languages.
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const clean = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
  return JSON.parse(clean);
}

// Determine if a value should NOT be translated
function shouldSkip(key, enValue) {
  // URLs
  if (/^https?:\/\//.test(enValue)) return true;
  if (/^\/[a-zA-Z]/.test(enValue) && enValue.includes('/')) return true;
  
  // CSS colors
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 
                  'gray', 'grey', 'black', 'white', 'brown', 'cyan', 'magenta',
                  'amber', 'lime', 'teal', 'indigo', 'violet', 'coral', 'gold',
                  'silver', 'navy', 'maroon', 'olive', 'aqua', 'crimson', 'salmon'];
  if (colors.includes(enValue.toLowerCase().trim())) return true;
  
  // Risk/severity levels (short uppercase)
  if (/^(HIGH|CRITICAL|SEVERE|Moderate|Low|Mild|None|Normal|Minimal)$/i.test(enValue.trim())) return true;
  
  // Units and measurements
  if (/^(kg|lb|ml|oz|kcal|g|oz|cm|in|mm|m|km|mi|ft|yd|L|gal|qt|pt|cup|tbsp|tsp|mg|mcg|IU)$/.test(enValue)) return true;
  
  // Pure numbers
  if (/^\d+$/.test(enValue)) return true;
  if (/^\d+[.,]\d+$/.test(enValue)) return true;
  
  // Phone numbers
  if (/^\(\d{3}\)\s\d{3}[-]\d{4}$/.test(enValue)) return true;
  
  // Brand names
  if (enValue === 'petsMetrics') return true;
  
  // Very short codes (1-2 chars)
  if (enValue.length <= 2 && /^[A-Za-z]+$/.test(enValue)) return true;
  
  // Email addresses
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(enValue)) return true;
  
  // Currency symbols and codes
  if (/^[\$\€\£\¥\₹]/.test(enValue) && enValue.length <= 5) return true;
  
  // Pure symbols
  if (/^[→←↑↓↔⇒⇐⇑⇓✓✗✘✔✖●○◉◎◉◆◇■□▲△▼▽►◄«»—–…·•›‹]+$/.test(enValue)) return true;
  
  return false;
}

// Collect all strings that need translation
function collectTranslatable(enObj, langObj, prefix) {
  prefix = prefix || '';
  const results = [];
  
  for (const [k, v] of Object.entries(enObj)) {
    const full = prefix ? prefix + '.' + k : k;
    
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        if (typeof v[i] === 'string') {
          const langVal = langObj?.[k]?.[i];
          if (langVal === v[i] && !shouldSkip(full + '[' + i + ']', v[i])) {
            results.push({ key: full + '[' + i + ']', enValue: v[i] });
          }
        } else if (typeof v[i] === 'object' && v[i] !== null) {
          for (const [sk, sv] of Object.entries(v[i])) {
            if (typeof sv === 'string') {
              const langVal = langObj?.[k]?.[i]?.[sk];
              if (langVal === sv && !shouldSkip(full + '[' + i + '].' + sk, sv)) {
                results.push({ key: full + '[' + i + '].' + sk, enValue: sv });
              }
            }
          }
        }
      }
    } else if (typeof v === 'object' && v !== null) {
      const subResults = collectTranslatable(v, langObj?.[k], full);
      results.push(...subResults);
    } else if (typeof v === 'string') {
      const langVal = langObj?.[k];
      if (langVal === v && !shouldSkip(full, v)) {
        results.push({ key: full, enValue: v });
      }
    }
  }
  
  return results;
}

// Main
const targetLang = process.argv[2];
const gaps = readJson('tools/i18n-gaps.json');
const en = readJson('messages/en.json');

const langs = targetLang ? [targetLang] : Object.keys(gaps);

for (const lang of langs) {
  if (lang === 'count' || lang === 'byNs' || lang === 'untranslated') continue;
  if (!gaps[lang]) {
    console.log(`Skipping ${lang}: no gaps data`);
    continue;
  }
  
  const langData = readJson(path.join('messages', lang + '.json'));
  const langDir = path.join('tools', 'translations', lang);
  
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  
  let totalTranslatable = 0;
  const namespaces = Object.keys(gaps[lang].byNs);
  
  for (const ns of namespaces) {
    const entries = gaps[lang].byNs[ns];
    
    // Filter out non-translatable entries
    const translatable = entries.filter(e => !shouldSkip(e.key, e.enValue));
    
    if (translatable.length === 0) {
      console.log(`  ${lang}/${ns}: 0 translatable (${entries.length} skipped)`);
      continue;
    }
    
    // Create flat key-value JSON
    const template = {};
    for (const { key, enValue } of translatable) {
      // Remove namespace prefix from key
      const shortKey = key.replace(new RegExp('^' + ns + '\\.'), '');
      template[shortKey] = enValue;
    }
    
    const outFile = path.join(langDir, ns + '.json');
    fs.writeFileSync(outFile, JSON.stringify(template, null, 2) + '\n');
    totalTranslatable += translatable.length;
    console.log(`  ${lang}/${ns}: ${translatable.length} translatable (${entries.length - translatable.length} skipped)`);
  }
  
  console.log(`${lang}: ${totalTranslatable} total translatable strings\n`);
}

console.log('Done! Templates created in tools/translations/<lang>/<namespace>.json');
console.log('Replace the English values with translations, then run:');
console.log('  node tools/patch-simple.js <lang> <namespace>');