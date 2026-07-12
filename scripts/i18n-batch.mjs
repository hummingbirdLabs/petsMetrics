// Split extract JSON into smaller batch files for translation.
// Usage: node scripts/i18n-batch.mjs <locale> <batchSize>
import fs from 'fs';

const dir = 'd:/prj2/GitHub/petsMetrics/messages/';
const locale = process.argv[2];
const batchSize = parseInt(process.argv[3] || '20', 10);

const extractPath = dir + '_extract_' + locale + '.json';
const data = JSON.parse(fs.readFileSync(extractPath, 'utf8'));
const keys = Object.keys(data);

const batches = [];
for (let i = 0; i < keys.length; i += batchSize) {
  batches.push(keys.slice(i, i + batchSize));
}

const batchDir = dir + '_batches_' + locale + '/';
fs.mkdirSync(batchDir, { recursive: true });

batches.forEach((batch, idx) => {
  const obj = {};
  for (const k of batch) obj[k] = data[k];
  fs.writeFileSync(batchDir + `batch_${idx}.json`, JSON.stringify(obj, null, 2), 'utf8');
});

console.log(`Split ${keys.length} keys into ${batches.length} batches of ~${batchSize} in ${batchDir}`);
