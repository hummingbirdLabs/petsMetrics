/**
 * Apply All Translations for a Language
 * 
 * Reads all translation files from tools/translations/<lang>/*.json
 * and applies them to the target language JSON file.
 * 
 * Usage: node tools/apply-all.js <lang-code>
 */

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const clean = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
  return JSON.parse(clean);
}

// Set a value at a dot-notation path like "dryVsWet.topicA.pros[0].title"
function setAtPath(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let current = obj;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const arrMatch = part.match(/^(.+)\[(\d+)\]$/);
    
    if (arrMatch) {
      const key = arrMatch[1];
      const idx = parseInt(arrMatch[2]);
      
      if (i === parts.length - 1) {
        if (!Array.isArray(current[key])) current[key] = [];
        current[key][idx] = value;
      } else {
        if (!Array.isArray(current[key])) current[key] = [];
        if (current[key][idx] === undefined) current[key][idx] = {};
        current = current[key][idx];
      }
    } else {
      if (i === parts.length - 1) {
        current[part] = value;
      } else {
        if (current[part] === undefined) {
          const nextPart = parts[i + 1];
          const nextArrMatch = nextPart ? nextPart.match(/^(.+)\[(\d+)\]$/) : null;
          current[part] = nextArrMatch ? [] : {};
        }
        current = current[part];
      }
    }
  }
}

const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node tools/apply-all.js <lang-code>');
  process.exit(1);
}

const targetFile = path.join('messages', lang + '.json');
const target = readJson(targetFile);
const transDir = path.join('tools', 'translations', lang);

if (!fs.existsSync(transDir)) {
  console.error('Translation directory not found: ' + transDir);
  process.exit(1);
}

const files = fs.readdirSync(transDir).filter(f => f.endsWith('.json'));
let totalCount = 0;

for (const file of files) {
  const namespace = file.replace('.json', '');
  const translations = readJson(path.join(transDir, file));
  
  if (!target[namespace]) {
    console.log(`  Skipping ${namespace}: not in target`);
    continue;
  }
  
  let count = 0;
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value === 'string') {
      setAtPath(target[namespace], key, value);
      count++;
    }
  }
  
  totalCount += count;
  console.log(`  ${namespace}: ${count} translations applied`);
}

fs.writeFileSync(targetFile, JSON.stringify(target, null, 2) + '\n');
console.log(`\nTotal: ${totalCount} translations applied to ${targetFile}`);