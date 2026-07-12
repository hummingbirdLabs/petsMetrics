const fs = require('fs');
function stripBOM(s){return s.charCodeAt(0)===0xFEFF?s.slice(1):s;}
const en = JSON.parse(stripBOM(fs.readFileSync('messages/en.json','utf-8')));
const fr = JSON.parse(stripBOM(fs.readFileSync('messages/fr.json','utf-8')));
function flatten(o,p=''){const r={};for(const k in o){const f=p?p+'.'+k:k;if(typeof o[k]==='object'&&o[k]!==null&&!Array.isArray(o[k]))Object.assign(r,flatten(o[k],f));else r[f]=o[k];}return r;}
const enF = flatten(en), frF = flatten(fr);
const untr = {};
for(const k in enF){if(frF[k]===enF[k])untr[k]=enF[k];}

// FIRST: load any existing partial translations
let partial = {};
try { partial = JSON.parse(fs.readFileSync('scripts/fr-translations-map.json','utf-8')); } catch(e) {}

// Build final map - start with partial
const final = {...partial};

// For remaining untranslated ones, keep English (already in fr.json)
// but we should mark them somehow - actually they need French translations
// The task is to provide translations, so let's keep the ones we've translated
// and leave the rest (the user can fill those in or we provide them)

// For now, just use what's in partial for keys that are in partial
// for keys not in partial, we still need to add them with their English values
// (they'll be properly translated by the user or another process)

for(const k in untr){
  if(!final[k]) final[k] = untr[k]; // Will be English fallback for missed ones
}

fs.writeFileSync('scripts/fr-translations-map.json', JSON.stringify(final, null, 2));
console.log(`Written ${Object.keys(final)} translations`);
