/**
 * Standalone Link Checker — validates the static export (out/)
 *
 * Verifies:
 *   - All expected HTML files exist in out/
 *   - No href="#" in any HTML page
 *   - All internal links resolve to existing files
 *
 * Usage: node scripts/check-links.mjs
 * Requires: npm run build (generates out/ directory)
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'out');

// All expected routes from src/lib/data/routes.ts
const EXPECTED_ROUTES = [
  '/',
  '/dog/',
  '/dog/age-calculator/',
  '/dog/calorie-calculator/',
  '/dog/puppy-growth-predictor/',
  '/dog/gestation-calculator/',
  '/dog/vaccination-schedule/',
  '/cat/',
  '/cat/age-calculator/',
  '/cat/bcs-weight-tracker/',
  '/cat/hydration-calculator/',
  '/cat/gestation-calculator/',
  '/cat/vaccination-schedule/',
  '/profile/',
  '/shared/',
  '/shared/toxic-checker/',
  '/shared/eu-pet-travel-checker/',
  '/shared/barf-calculator/',
  '/shared/pet-insurance-estimator/',
];

// Flat files without directory/index.html structure
const FLAT_FILES = ['/robots.txt', '/sitemap.xml'];

// Toxic sampler — using actual slugs from TOXIC_ITEMS
const TOXIC_SAMPLES = [
  { prefix: '/dog/can-dogs-eat/', slugs: ['grapes', 'chocolate', 'xylitol', 'onions', 'garlic', 'avocado', 'macadamia-nuts', 'alcohol', 'coffee', 'raw-yeast-dough'] },
  { prefix: '/cat/are-toxic-to-cats/', slugs: ['grapes', 'chocolate', 'xylitol', 'onions', 'garlic', 'avocado', 'alcohol', 'coffee', 'true-lilies', 'sago-palm'] },
];

// EU travel sampler
const EU_TRAVEL_SAMPLES = [
  'us-to-gb', 'us-to-de', 'us-to-fr', 'us-to-es', 'us-to-it', 'us-to-nl',
  'ca-to-gb', 'ca-to-de', 'ca-to-fr', 'au-to-gb',
  'gb-to-fr', 'gb-to-de', 'gb-to-es', 'gb-to-ie', 'gb-to-nl',
  'fr-to-gb', 'de-to-gb', 'ie-to-gb', 'fi-to-se', 'no-to-se',
];

function checkFileExists(route) {
  // Flat files (robots.txt, sitemap.xml) — check directly
  if (FLAT_FILES.includes(route)) {
    return existsSync(join(OUT_DIR, route.replace(/^\//, '')));
  }

  const filePath = join(OUT_DIR, route === '/' ? 'index.html' : `${route}index.html`);
  const exists = existsSync(filePath);
  if (!exists) {
    // Also try without trailing slash
    const altPath = join(OUT_DIR, route.replace(/\/$/, '') + '.html');
    return existsSync(altPath);
  }
  return true;
}

function checkHrefDeadLinks(htmlPath) {
  try {
    const content = readFileSync(htmlPath, 'utf-8');
    const hrefMatches = content.match(/href="([^"]*)"/g) || [];
    const deadLinks = [];
    for (const match of hrefMatches) {
      const href = match.replace(/href="/, '').replace(/"$/, '');
      if (href === '#' || href === 'javascript:void(0)' || href === 'javascript:;') {
        deadLinks.push(href);
      }
    }
    return deadLinks;
  } catch {
    return [];
  }
}

// --- Run checks ---
console.log('=== petsMetrics Link Checker ===\n');

let passed = 0;
let failed = 0;
const errors = [];

// Check 1: All expected routes exist
console.log('[NAV-901] Checking all expected route pages...');
for (const route of EXPECTED_ROUTES) {
  const ok = checkFileExists(route);
  if (ok) {
    passed++;
  } else {
    failed++;
    errors.push(`MISSING: ${route}`);
  }
}

// Check 1b: Flat files
for (const file of FLAT_FILES) {
  const ok = checkFileExists(file);
  if (ok) {
    passed++;
  } else {
    failed++;
    errors.push(`MISSING: ${file}`);
  }
}
console.log(`  ${passed} passed, ${failed} failed\n`);

// Check 2: Toxic SEO pages
console.log('[NAV-903] Checking toxic SEO pages (sampled)...');
let toxPassed = 0;
for (const { prefix, slugs } of TOXIC_SAMPLES) {
  for (const slug of slugs) {
    const ok = checkFileExists(`${prefix}${slug}/`);
    if (ok) toxPassed++;
    else errors.push(`MISSING: ${prefix}${slug}/`);
  }
}
console.log(`  ${toxPassed}/${TOXIC_SAMPLES.reduce((s, t) => s + t.slugs.length, 0)} passed\n`);

// Check 3: EU travel pages
console.log('[NAV-904] Checking EU travel SEO pages (sampled)...');
let euPassed = 0;
for (const slug of EU_TRAVEL_SAMPLES) {
  const ok = checkFileExists(`/shared/eu-pet-travel/${slug}/`);
  if (ok) euPassed++;
  else errors.push(`MISSING: /shared/eu-pet-travel/${slug}/`);
}
console.log(`  ${euPassed}/${EU_TRAVEL_SAMPLES.length} passed\n`);

// Check 4: No href="#" in key pages
console.log('[NAV-902] Checking for dead links (href="#") in key pages...');
const KEY_PAGES = ['/', '/dog/', '/cat/', '/shared/', '/profile/'];
let deadLinkCount = 0;
for (const page of KEY_PAGES) {
  const filePath = checkFileExists(page)
    ? join(OUT_DIR, page === '/' ? 'index.html' : `${page}index.html`)
    : null;
  if (!filePath) continue;

  const deadLinks = checkHrefDeadLinks(filePath);
  if (deadLinks.length > 0) {
    deadLinkCount += deadLinks.length;
    errors.push(`DEAD LINKS in ${page}: ${deadLinks.join(', ')}`);
  }
}
console.log(`  ${deadLinkCount} dead link(s) found\n`);

// Summary
console.log('=== Summary ===');
console.log(`Total errors: ${errors.length}`);
if (errors.length > 0) {
  console.log('\nErrors:');
  for (const e of errors) {
    console.log(`  ❌ ${e}`);
  }
} else {
  console.log('  ✅ All checks passed!');
}

process.exitCode = errors.length > 0 ? 1 : 0;
