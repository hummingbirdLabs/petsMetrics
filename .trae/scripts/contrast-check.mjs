// WCAG 2.1 Contrast Ratio Calculator - Post-Fix Verification v2
// Usage: node contrast-check.mjs

function hexToRgb(hex) {
  const varMap = {
    'var(--white)': '#FFFFFF',
    'var(--status-toxic)': '#EF4444',
    'var(--status-caution)': '#F59E0B',
    'var(--status-safe)': '#10B981',
  };
  
  if (varMap[hex]) hex = varMap[hex];
  if (hex.startsWith('var(')) return null;
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function srgbLinearize(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb) {
  if (!rgb) return null;
  return 0.2126 * srgbLinearize(rgb.r) +
         0.7152 * srgbLinearize(rgb.g) +
         0.0722 * srgbLinearize(rgb.b);
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  if (l1 === null || l2 === null) return 'N/A';
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// Updated color tokens after fixes (v2)
const tokens = {
  light: {
    'brand-navy': '#1B2D4F',
    'brand-teal': '#0D9488',
    'brand-teal-dark': '#065F56',
    'brand-teal-light': '#CCFBF1',
    white: '#FFFFFF',
    'gray-50': '#F8FAFC',
    'gray-100': '#F1F5F9',
    'gray-300': '#CBD5E1',
    'gray-500': '#64748B',
    'gray-700': '#334155',
    'gray-900': '#0F172A',
    'dog-primary': '#D97706',
    'dog-primary-dark': '#92400E',
    'dog-primary-light': '#FEF3C7',
    'dog-accent': '#F59E0B',
    'dog-surface': '#FFFBEB',
    'cat-primary': '#7C3AED',
    'cat-primary-dark': '#4C1D95',
    'cat-primary-light': '#EDE9FE',
    'cat-accent': '#A78BFA',
    'cat-surface': '#F5F3FF',
    'status-safe': '#10B981',
    'status-safe-dark': '#065F46',
    'status-safe-bg': '#A7F3D0',
    'status-caution': '#F59E0B',
    'status-caution-dark': '#92400E',
    'status-caution-bg': '#FDE68A',
    'status-toxic': '#EF4444',
    'status-toxic-dark': '#991B1B',
    'status-toxic-bg': '#FEE2E2',
    'status-info': '#3B82F6',
    'status-info-dark': '#1E40AF',
    'status-info-bg': '#DBEAFE',
  },
  dark: {
    'brand-navy': '#E2E8F0',
    'brand-teal': '#0D9488',
    'brand-teal-dark': '#065F56',
    'brand-teal-light': '#0F766E',
    white: '#0F172A',
    'gray-50': '#1E293B',
    'gray-100': '#334155',
    'gray-300': '#475569',
    'gray-500': '#94A3B8',
    'gray-700': '#CBD5E1',
    'gray-900': '#F1F5F9',
    'dog-primary': '#D97706',
    'dog-primary-dark': '#92400E',
    'dog-primary-light': '#451A03',
    'dog-accent': '#F59E0B',
    'dog-surface': '#7D4E00',
    'cat-primary': '#7C3AED',
    'cat-primary-dark': '#4C1D95',
    'cat-primary-light': '#2E1065',
    'cat-accent': '#A78BFA',
    'cat-surface': '#6B3A8A',
    'status-safe': '#10B981',
    'status-safe-dark': '#065F46',
    'status-safe-bg': '#064E3B',
    'status-caution': '#F59E0B',
    'status-caution-dark': '#92400E',
    'status-caution-bg': '#451A03',
    'status-toxic': '#EF4444',
    'status-toxic-dark': '#991B1B',
    'status-toxic-bg': '#450A0A',
    'status-info': '#3B82F6',
    'status-info-dark': '#1E40AF',
    'status-info-bg': '#1E3A5F',
  }
};

console.log('\n=== WCAG 2.1 AA Contrast Audit (Post-Fix v2) ===\n');

// Light mode results
console.log('--- LIGHT MODE ---');
console.log('| Foreground | Background | Ratio | Required | Pass | Description |');
console.log('|------------|------------|-------|----------|------|-------------|');

const lightPairs = [
  { fg: 'gray-700', bg: 'white', desc: 'Body text on white', req: 4.5 },
  { fg: 'gray-500', bg: 'white', desc: 'Secondary text on white', req: 4.5 },
  { fg: 'gray-900', bg: 'white', desc: 'Heading on white', req: 4.5 },
  { fg: 'brand-navy', bg: 'white', desc: 'Brand navy on white', req: 4.5 },
  { fg: 'white', bg: 'dog-primary', desc: 'White on dog primary (large text)', req: 3.0 },
  { fg: 'white', bg: 'brand-teal', desc: 'White on brand teal', req: 4.5 },
  { fg: 'white', bg: 'cat-primary', desc: 'White on cat primary', req: 4.5 },
  { fg: 'dog-primary-dark', bg: 'dog-surface', desc: 'Dog primary dark on dog surface', req: 4.5 },
  { fg: 'cat-primary-dark', bg: 'cat-surface', desc: 'Cat primary dark on cat surface', req: 4.5 },
  { fg: 'brand-teal-dark', bg: 'gray-50', desc: 'Brand teal dark on gray-50', req: 4.5 },
];

let lightPass = 0;
let lightFail = 0;
for (const pair of lightPairs) {
  const ratio = contrastRatio(tokens.light[pair.fg], tokens.light[pair.bg]);
  const pass = parseFloat(ratio) >= pair.req;
  if (pass) lightPass++; else lightFail++;
  console.log(`| ${pair.fg} | ${pair.bg} | ${ratio}:1 | ${pair.req}:1 | ${pass ? '✅' : '❌'} | ${pair.desc} |`);
}

// Dark mode results
console.log('\n--- DARK MODE ---');
console.log('| Foreground | Background | Ratio | Required | Pass | Description |');
console.log('|------------|------------|-------|----------|------|-------------|');

const darkPairs = [
  { fg: 'gray-700', bg: 'white', desc: 'Body text on dark bg', req: 4.5 },
  { fg: 'gray-500', bg: 'white', desc: 'Secondary text on dark bg', req: 4.5 },
  { fg: 'gray-900', bg: 'white', desc: 'Heading on dark bg', req: 4.5 },
  { fg: 'brand-navy', bg: 'white', desc: 'Brand navy on dark bg', req: 4.5 },
  { fg: 'white', bg: 'dog-primary', desc: 'White on dog primary (dark)', req: 3.0 },
  { fg: 'white', bg: 'brand-teal', desc: 'White on brand teal (dark)', req: 4.5 },
  { fg: 'white', bg: 'cat-primary', desc: 'White on cat primary (dark)', req: 4.5 },
  { fg: 'dog-primary-dark', bg: 'dog-surface', desc: 'Dog primary dark on dog surface', req: 4.5 },
  { fg: 'cat-primary-dark', bg: 'cat-surface', desc: 'Cat primary dark on cat surface', req: 4.5 },
  { fg: 'brand-teal-dark', bg: 'gray-50', desc: 'Brand teal dark on gray-50 (dark)', req: 4.5 },
];

let darkPass = 0;
let darkFail = 0;
for (const pair of darkPairs) {
  const ratio = contrastRatio(tokens.dark[pair.fg], tokens.dark[pair.bg]);
  const pass = parseFloat(ratio) >= pair.req;
  if (pass) darkPass++; else darkFail++;
  console.log(`| ${pair.fg} | ${pair.bg} | ${ratio}:1 | ${pair.req}:1 | ${pass ? '✅' : '❌'} | ${pair.desc} |`);
}

// Status colors - using dark text on light backgrounds in light mode
console.log('\n--- STATUS BADGES (Light Mode) ---');
console.log('| Text | Background | Ratio | Required | Pass |');
console.log('|------|------------|-------|----------|------|');

const statusPairs = [
  { name: 'safe', fg: 'status-safe-dark', bg: 'status-safe-bg' },
  { name: 'caution', fg: 'status-caution-dark', bg: 'status-caution-bg' },
  { name: 'toxic', fg: 'status-toxic-dark', bg: 'status-toxic-bg' },
  { name: 'info', fg: 'status-info-dark', bg: 'status-info-bg' },
];

let statusPass = 0;
let statusFail = 0;
for (const pair of statusPairs) {
  const ratio = contrastRatio(tokens.light[pair.fg], tokens.light[pair.bg]);
  const pass = parseFloat(ratio) >= 4.5;
  if (pass) statusPass++; else statusFail++;
  console.log(`| ${pair.fg} | ${pair.bg} | ${ratio}:1 | 4.5:1 | ${pass ? '✅' : '❌'} |`);
}

console.log('\n--- STATUS BADGES (Dark Mode) ---');
console.log('| Text | Background | Ratio | Required | Pass |');
console.log('|------|------------|-------|----------|------|');

for (const pair of statusPairs) {
  const ratio = contrastRatio(tokens.dark[pair.fg], tokens.dark[pair.bg]);
  const pass = parseFloat(ratio) >= 4.5;
  if (pass) statusPass++; else statusFail++;
  console.log(`| ${pair.fg} | ${pair.bg} | ${ratio}:1 | 4.5:1 | ${pass ? '✅' : '❌'} |`);
}

const totalPass = lightPass + darkPass + statusPass;
const totalFail = lightFail + darkFail + statusFail;
const total = totalPass + totalFail;

console.log('\n=== SUMMARY ===');
console.log(`Total: ${totalPass}/${total} passed ${totalFail > 0 ? `(${totalFail} failed)` : ''}`);
console.log(`Pass rate: ${((totalPass/total)*100).toFixed(1)}%`);

if (totalFail === 0) {
  console.log('\n🎉 All color combinations pass WCAG 2.1 AA requirements!');
} else {
  console.log(`\n⚠️  ${totalFail} combinations need attention.`);
}
console.log('\n=== End of Audit ===\n');
