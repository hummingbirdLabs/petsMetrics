// Count keys in all _trans_*.json and _extract_*.json files
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'messages');
const files = fs.readdirSync(dir).filter(f => f.startsWith('_') && f.endsWith('.json')).sort();

console.log('File                                        Keys');
console.log('------------------------------------------  -----');
for (const f of files) {
  try {
    const o = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    console.log(f.padEnd(42), Object.keys(o).length);
  } catch (e) {
    console.log(f.padEnd(42), 'ERROR: ' + e.message.slice(0, 40));
  }
}
