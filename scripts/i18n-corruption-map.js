// Map U+FFFD corruption to top-level and second-level namespaces for ko and ja
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'messages');

function analyze(lang) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, lang + '.json'), 'utf8'));
  const report = {};
  function walk(obj, prefix = '') {
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, prefix + '[' + i + ']'));
    } else if (obj !== null && typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        const full = prefix ? prefix + '.' + k : k;
        walk(obj[k], full);
      }
    } else if (typeof obj === 'string') {
      const c = (obj.match(/\uFFFD/g) || []).length;
      if (c > 0) {
        const top2 = prefix.split('.').slice(0, 2).join('.');
        const top1 = prefix.split('.')[0];
        report[top1] = report[top1] || { strings: 0, chars: 0 };
        report[top1].strings++;
        report[top1].chars += c;
      }
    }
  }
  walk(data);
  console.log(`\n=== ${lang}.json corruption by top-level namespace ===`);
  const sorted = Object.entries(report).sort((a, b) => b[1].chars - a[1].chars);
  for (const [ns, { strings, chars }] of sorted) {
    console.log(`  ${ns.padEnd(20)} ${String(strings).padStart(4)} corrupted strings  ${String(chars).padStart(5)} U+FFFD chars`);
  }
  const total = Object.values(report).reduce((a, b) => a + b.chars, 0);
  console.log(`  TOTAL: ${total} U+FFFD characters`);
}

analyze('ko');
analyze('ja');
analyze('zh');
