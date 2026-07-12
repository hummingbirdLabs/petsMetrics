/**
 * Fix seasonal keywords format in fr.json and pt.json
 * The keywords field should be an array, not a string
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'messages');

// Function to fix keywords in a language file
function fixKeywords(langCode) {
  const filePath = path.join(messagesDir, `${langCode}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  let fixedCount = 0;
  
  // Fix keywords in seasonal items
  if (data.seasonal) {
    for (const seasonKey of Object.keys(data.seasonal)) {
      if (seasonKey === 'breadcrumb') continue;
      
      const seasonItem = data.seasonal[seasonKey];
      if (seasonItem.keywords && typeof seasonItem.keywords === 'string') {
        // Convert string to array by splitting on comma
        seasonItem.keywords = seasonItem.keywords.split(',').map(k => k.trim());
        fixedCount++;
      }
    }
  }
  
  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Fixed ${fixedCount} seasonal keywords in ${langCode}.json`);
}

// Process French and Portuguese
const languages = ['fr', 'pt'];

console.log('Fixing seasonal keywords format...');
languages.forEach(lang => fixKeywords(lang));
console.log('Done!');
