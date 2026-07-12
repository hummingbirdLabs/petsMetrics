/**
 * Apply translations to language files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

// Get value by key path
function getValue(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) return undefined;
    current = current[part];
  }
  return current;
}

// Set value by key path
function setValue(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// Deep merge translations into target
function deepMerge(target, source, prefix = '') {
  let count = 0;
  
  for (const key of Object.keys(source)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    const sourceVal = source[key];
    
    if (typeof sourceVal === 'object' && sourceVal !== null && !Array.isArray(sourceVal)) {
      // Recurse into nested objects
      count += deepMerge(target, sourceVal, fullKey);
    } else {
      // Apply the value
      setValue(target, fullKey, sourceVal);
      count++;
    }
  }
  
  return count;
}

// Apply partial translations (only for keys that have same value as English)
function applyUntranslated(target, source, enFile, prefix = '') {
  let count = 0;
  
  for (const key of Object.keys(source)) {
    const fullKey = prefix ? prefix + '.' + key : key;
    const sourceVal = source[key];
    const targetVal = getValue(target, fullKey);
    const enVal = getValue(enFile, fullKey);
    
    if (typeof sourceVal === 'object' && sourceVal !== null && !Array.isArray(sourceVal)) {
      // Recurse into nested objects
      count += applyUntranslated(target, sourceVal, enFile, fullKey);
    } else {
      // Only apply if the target value is same as English (untranslated)
      if (targetVal === enVal && targetVal !== undefined) {
        setValue(target, fullKey, sourceVal);
        count++;
      }
    }
  }
  
  return count;
}

// Main function
function main() {
  const enFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
  
  // Apply French translations
  console.log('Applying French (fr) translations...');
  let frFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'fr.json'), 'utf8'));
  
  // Regular translations
  const frTrans = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations-fr.json'), 'utf8'));
  const frApplied = deepMerge(frFile, frTrans);
  
  // Seasonal translations for French
  const frSeasonal = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations-fr-seasonal.json'), 'utf8'));
  const frSeasonalApplied = deepMerge(frFile, frSeasonal);
  
  // Cat emergency translations for French
  const frCatEmergency = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations-fr-catEmergency.json'), 'utf8'));
  const frCatEmergencyApplied = deepMerge(frFile, frCatEmergency);
  
  fs.writeFileSync(path.join(messagesDir, 'fr.json'), JSON.stringify(frFile, null, 2), 'utf8');
  console.log(`  Applied ${frApplied} regular + ${frSeasonalApplied} seasonal + ${frCatEmergencyApplied} cat emergency translations`);
  
  // Apply Hindi translations
  console.log('Applying Hindi (hi) translations...');
  const hiFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'hi.json'), 'utf8'));
  
  // Original translations
  const hiTrans = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations-hi.json'), 'utf8'));
  const hiApplied = deepMerge(hiFile, hiTrans);
  
  // Complete translations for remaining strings
  const hiComplete = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations-hi-complete.json'), 'utf8'));
  const hiCompleteApplied = applyUntranslated(hiFile, hiComplete, enFile);
  
  fs.writeFileSync(path.join(messagesDir, 'hi.json'), JSON.stringify(hiFile, null, 2), 'utf8');
  console.log(`  Applied ${hiApplied} + ${hiCompleteApplied} translations`);
  
  console.log('Done!');
}

main();
