/**
 * Simple i18n Patcher - patches specific keys in target language JSON
 * 
 * Usage: node tools/patch-simple.js <lang-code> <namespace>
 * 
 * Reads translation data from tools/translations/<lang>/<namespace>.json
 * and patches the target language JSON file.
 * Handles nested keys like "dryVsWet.topicA.pros[0].title"
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

// Set a value at a dot-notation path like "dryVsWet.topicA.pros[0].title"
function setAtPath(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const arrMatch = part.match(/^(.+)\[(\d+)\]$/);
    
    if (arrMatch) {
      // This part has an array index: "pros[0]"
      const key = arrMatch[1];
      const idx = parseInt(arrMatch[2]);
      
      if (i === parts.length - 1) {
        // Last part - set the value
        if (!Array.isArray(current[key])) current[key] = [];
        current[key][idx] = value;
      } else {
        // Navigate into the array element
        if (!Array.isArray(current[key])) current[key] = [];
        if (current[key][idx] === undefined) current[key][idx] = {};
        current = current[key][idx];
      }
    } else {
      // Regular object key
      if (i === parts.length - 1) {
        // Last part - set the value
        current[part] = value;
      } else {
        // Navigate deeper
        if (current[part] === undefined) {
          // Check if next part is an array index
          const nextPart = parts[i + 1];
          const nextArrMatch = nextPart ? nextPart.match(/^(.+)\[(\d+)\]$/) : null;
          current[part] = nextArrMatch ? [] : {};
        }
        current = current[part];
      }
    }
  }
}

// Main
const lang = process.argv[2];
const namespace = process.argv[3];

if (!lang || !namespace) {
  console.error('Usage: node tools/patch-simple.js <lang-code> <namespace>');
  console.error('Example: node tools/patch-simple.js fr compare');
  process.exit(1);
}

// Read translation data
const transFile = path.join('tools', 'translations', lang, namespace + '.json');
if (!fs.existsSync(transFile)) {
  console.error('Translation file not found: ' + transFile);
  process.exit(1);
}

const translations = readJson(transFile);
console.log('Translation entries: ' + Object.keys(translations).length);

// Read target JSON
const targetFile = path.join('messages', lang + '.json');
const target = readJson(targetFile);

// Ensure the namespace exists in target
if (!target[namespace]) {
  console.error('Namespace "' + namespace + '" not found in target JSON');
  process.exit(1);
}

// Apply translations
let count = 0;
for (const [key, value] of Object.entries(translations)) {
  if (typeof value === 'string') {
    setAtPath(target[namespace], key, value);
    count++;
  }
}

// Write updated JSON
fs.writeFileSync(targetFile, JSON.stringify(target, null, 2) + '\n');
console.log('Applied: ' + count + ' translations');
console.log('Updated: ' + targetFile);