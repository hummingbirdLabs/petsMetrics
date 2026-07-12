const fs = require('fs');
const en = require('../messages/en.json');
const hi = require('../messages/hi.json');

const untranslated = [];
const walk = (e, h, p) => {
  for (const k in e) {
    const np = p ? p + '.' + k : k;
    if (typeof e[k] === 'object' && e[k] !== null && !Array.isArray(e[k])) walk(e[k], h[k] || {}, np);
    else if (e[k] === h[k]) untranslated.push({ path: np, v: e[k] });
  }
};
walk(en, hi, '');

// Build translation for each key
const out = {};
for (const { path, v } of untranslated) {
  out[path] = trans(path, v);
}

fs.writeFileSync(__dirname + '/hi-translations-map.json', JSON.stringify(out, null, 2));
console.log('Done:', Object.keys(out).length, 'translations');

function trans(k, v) {
  // Identity cases
  if (v === '404' || v === 'P0' || v === 'P1' || v === 'petsMetrics') return v;
  if (/^https?:\/\//.test(v) && !/ /.test(v)) return v;
  if (/^\(\d{3}\) \d{3}-\d{4}$/.test(v)) return v;
  if (k === 'catBcs.result.bcsScore') return 'BCS {score}/9';
  if (k === 'puppyGrowth.result.predictedRange') return '{min} – {max} किलो';
  if (k === 'dogAge.lifeStage.cardTitle') return '{stage} — {stageName}';
  if (k === 'gestation.result.possibleRange') return 'संभव सीमा: {earliest} → {latest}';
  if (k === 'gestation.result.basedOn') return 'आधार: औसत गर्भावस्था 63 दिन। संभोग तिथि: {date}';
  if (k === 'vaccination.result.generatedOn') return 'बनाया गया: {date} · जन्म तिथि के आधार पर: {birthDate} · क्षेत्र: {region} · WSAVA मुख्य टीका दिशानिर्देश';
  if (k === 'catBcs.result.weeksToIdeal') return 'आदर्श वजन तक पहुंचने में अनुमानित {weeks} सप्ताह (1% साप्ताहिक कमी)';
  if (k.startsWith('emergency.shared.stepTemplates.') && v.includes('[Item]')) return 'चरण 1: तुरंत सभी [Item] हटा दें';
  if (k.startsWith('emergency.shared.stepTemplates.') && v.includes('[item]')) return "चरण 1: अपने पालतू जानवर की पहुंच से कोई भी बचा [item] हटा दें।";

  // All other keys - use requires manual translation
  return require('./translations-bundle.json')[k] || v;
}
