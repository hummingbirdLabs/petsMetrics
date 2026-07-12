// Extract and dedup all remaining languages
const { execSync } = require('child_process');
const path = require('path');

const langs = ['es', 'pt', 'nl', 'fr', 'hi', 'ja'];
const scriptDir = path.join(__dirname);

for (const lang of langs) {
  console.log(`\n=== ${lang} ===`);
  try {
    execSync(`node "${path.join(scriptDir, 'i18n-workflow.js')}" extract ${lang}`, { stdio: 'inherit' });
    execSync(`node "${path.join(scriptDir, 'i18n-dedup.js')}" dedup ${lang}`, { stdio: 'inherit' });
    execSync(`node "${path.join(scriptDir, 'i18n-batch.js')}" split ${lang} 120`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error processing ${lang}: ${e.message}`);
  }
}
