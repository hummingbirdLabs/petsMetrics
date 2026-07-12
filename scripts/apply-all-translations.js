/**
 * Apply all translations to language files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');
const scriptsDir = __dirname;

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

// Main function
function main() {
  // Apply Spanish (es) translations
  console.log('Applying Spanish (es) translations...');
  const esFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'es.json'), 'utf8'));
  const esSeasonal = JSON.parse(fs.readFileSync(path.join(scriptsDir, 'translations-es-seasonal.json'), 'utf8'));
  const esApplied = deepMerge(esFile, esSeasonal);
  fs.writeFileSync(path.join(messagesDir, 'es.json'), JSON.stringify(esFile, null, 2), 'utf8');
  console.log(`  Applied ${esApplied} translations`);
  
  // Apply Portuguese (pt) translations
  console.log('Applying Portuguese (pt) translations...');
  const ptFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'pt.json'), 'utf8'));
  const ptSeasonal = JSON.parse(fs.readFileSync(path.join(scriptsDir, 'translations-pt-seasonal.json'), 'utf8'));
  const ptApplied = deepMerge(ptFile, ptSeasonal);
  fs.writeFileSync(path.join(messagesDir, 'pt.json'), JSON.stringify(ptFile, null, 2), 'utf8');
  console.log(`  Applied ${ptApplied} translations`);
  
  // Apply Dutch (nl) translations
  console.log('Applying Dutch (nl) translations...');
  const nlFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'nl.json'), 'utf8'));
  const nlSeasonal = JSON.parse(fs.readFileSync(path.join(scriptsDir, 'translations-nl-seasonal.json'), 'utf8'));
  const nlApplied = deepMerge(nlFile, nlSeasonal);
  fs.writeFileSync(path.join(messagesDir, 'nl.json'), JSON.stringify(nlFile, null, 2), 'utf8');
  console.log(`  Applied ${nlApplied} translations`);
  
  // Apply Russian (ru) translations
  console.log('Applying Russian (ru) translations...');
  const ruFile = JSON.parse(fs.readFileSync(path.join(messagesDir, 'ru.json'), 'utf8'));
  const ruSeasonal = JSON.parse(fs.readFileSync(path.join(scriptsDir, 'translations-ru-seasonal.json'), 'utf8'));
  const ruApplied = deepMerge(ruFile, ruSeasonal);
  fs.writeFileSync(path.join(messagesDir, 'ru.json'), JSON.stringify(ruFile, null, 2), 'utf8');
  console.log(`  Applied ${ruApplied} translations`);
  
  console.log('Done!');
}

main();
