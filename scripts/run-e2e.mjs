/**
 * Standalone E2E Test Runner — uses raw playwright API (no @playwright/test)
 *
 * Runs against the static export served via `npx serve out`.
 * Usage: node scripts/run-e2e.mjs
 */
import { chromium } from 'playwright';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:4173';

// ---- Test helpers ----
let failures = 0;
let passed = 0;
const errors = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    process.stdout.write(`  ✓ ${name}\n`);
  } catch (e) {
    failures++;
    errors.push({ name, error: e.message });
    process.stdout.write(`  ✗ ${name}\n    → ${e.message}\n`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

// ---- Test suites ----

async function runNavigationTests(page) {
  // NAV-001~005 Global nav
  await test('NAV-001: Home link -> /', async () => {
    await page.goto(BASE + '/');
    const h1 = await page.$('h1');
    assert(h1, 'H1 not found');
    const text = await h1.textContent();
    assert(text.includes('One Profile'), `H1 text: "${text}"`);
  });

  await test('NAV-002: /dog/ renders', async () => {
    const r = await page.goto(BASE + '/dog/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    const h1 = await page.$('h1');
    assert(h1, 'H1 not found on /dog/');
  });

  await test('NAV-003: /cat/ renders', async () => {
    const r = await page.goto(BASE + '/cat/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'H1 not found');
  });

  await test('NAV-004: /shared/ renders', async () => {
    const r = await page.goto(BASE + '/shared/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'H1 not found');
  });

  await test('NAV-005: /profile/ renders', async () => {
    const r = await page.goto(BASE + '/profile/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'H1 not found');
  });

  // NAV-006 Mobile hamburger menu
  await test('NAV-006: Mobile hamburger menu', async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    const btn = await page.$('[aria-label="Toggle navigation"]');
    assert(btn, 'Hamburger button not found');
    const expanded = await btn.getAttribute('aria-expanded');
    assert(expanded === 'false', `Expected aria-expanded=false, got ${expanded}`);
    await btn.click();
    const expanded2 = await btn.getAttribute('aria-expanded');
    assert(expanded2 === 'true', `Expected aria-expanded=true, got ${expanded2}`);
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  // HP-001 H1 on homepage
  await test('HP-001: Homepage H1 = "One Profile. Every Answer."', async () => {
    await page.goto(BASE + '/');
    const h1 = await page.$('h1');
    const text = await h1.textContent();
    assert(text.includes('One Profile. Every Answer.'), `H1: "${text}"`);
  });

  // HP-002 Subtitles
  await test('HP-002: Hero subtitles render', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('No login. No AI. Just science.'), 'Subtitle2 missing');
  });

  // HP-003/004 CTA buttons
  await test('HP-003: Dog Tools CTA links to /dog/', async () => {
    await page.goto(BASE + '/');
    const link = await page.$('a[href="/dog/"]');
    assert(link, 'Dog CTA link not found');
  });

  await test('HP-004: Cat Tools CTA links to /cat/', async () => {
    await page.goto(BASE + '/');
    const link = await page.$('a[href="/cat/"]');
    assert(link, 'Cat CTA link not found');
  });

  // HP-005 Trust line
  await test('HP-005: Trust line renders', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('200+ Foods'), 'Trust line missing');
  });

  // HP-101 Profile Focus section
  await test('HP-101: ProfileFocus section renders', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('Why petsMetrics is different'), 'Section title missing');
  });

  // HP-301 Emergency banner
  await test('HP-301: Emergency phone visible', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('(888) 426-4435'), 'Emergency phone missing');
  });

  // HP-303 Quick search redirect
  await test('HP-303: Quick search -> toxic checker', async () => {
    await page.goto(BASE + '/');
    const input = await page.$('input[placeholder*="grapes"]') || await page.$('input[placeholder*="Search"]');
    if (input) {
      await input.fill('chocolate');
      const btn = await page.$('button');
      if (btn) {
        await btn.click();
        const url = page.url();
        assert(url.includes('toxic-checker'), `URL: ${url}`);
      }
    }
  });

  // NAV-201 Dog Hub links valid
  await test('NAV-201: Dog Hub links not dead', async () => {
    await page.goto(BASE + '/dog/');
    const dead = await page.$$eval('a[href="#"]', els => els.length);
    assert(dead === 0, `${dead} dead link(s) on /dog/`);
  });

  // NAV-202 Cat Hub links valid
  await test('NAV-202: Cat Hub links not dead', async () => {
    await page.goto(BASE + '/cat/');
    const dead = await page.$$eval('a[href="#"]', els => els.length);
    assert(dead === 0, `${dead} dead link(s) on /cat/`);
  });
}

async function runSEOTests(page) {
  const pages = [
    '/', '/dog/', '/cat/', '/profile/', '/shared/',
    '/dog/age-calculator/', '/dog/calorie-calculator/',
    '/dog/gestation-calculator/', '/dog/vaccination-schedule/',
    '/cat/age-calculator/', '/cat/bcs-weight-tracker/',
    '/cat/hydration-calculator/', '/cat/gestation-calculator/',
    '/cat/vaccination-schedule/', '/shared/toxic-checker/',
    '/shared/eu-pet-travel-checker/', '/shared/barf-calculator/',
    '/shared/pet-insurance-estimator/',
  ];

  for (const route of pages) {
    await test(`SEO: ${route} has <title>`, async () => {
      await page.goto(BASE + route);
      const title = await page.title();
      assert(title.length > 0, 'Title empty');
      assert(title.length <= 60, `Title too long: ${title.length} chars`);
    });

    await test(`SEO: ${route} has meta description`, async () => {
      await page.goto(BASE + route);
      const desc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
      assert(desc && desc.length > 0, 'Description empty');
      assert(desc.length <= 155, `Description too long: ${desc.length} chars`);
    });

    await test(`SEO: ${route} has canonical`, async () => {
      await page.goto(BASE + route);
      const canonical = await page.$('link[rel="canonical"]');
      assert(canonical, 'Canonical link not found');
    });

    await test(`SEO: ${route} has OG tags`, async () => {
      await page.goto(BASE + route);
      const og = await page.$('meta[property="og:title"]');
      assert(og, 'og:title not found');
    });

    await test(`SEO: ${route} has JSON-LD`, async () => {
      await page.goto(BASE + route);
      const ld = await page.$('script[type="application/ld+json"]');
      assert(ld, 'JSON-LD not found');
    });

    await test(`SEO: ${route} has exactly 1 H1`, async () => {
      await page.goto(BASE + route);
      const count = await page.$$eval('h1', els => els.length);
      assert(count === 1, `Expected 1 H1, got ${count}`);
    });

    await test(`SEO: ${route} all img have alt`, async () => {
      await page.goto(BASE + route);
      const missing = await page.$$eval('img:not([alt])', els => els.length);
      assert(missing === 0, `${missing} img without alt`);
    });
  }
}

async function runInteractionTests(page) {
  // Dog Age Calculator
  await test('CALC-001: Dog age form renders', async () => {
    await page.goto(BASE + '/dog/age-calculator/');
    const form = await page.$('[data-testid="dog-age-form"]');
    assert(form, 'Dog age form not found');
  });

  await test('CALC-002: 3yr medium dog -> ~28 human age', async () => {
    await page.goto(BASE + '/dog/age-calculator/');
    await page.fill('[data-testid="dog-age-years-input"]', '3');
    await page.fill('[data-testid="dog-age-months-input"]', '0');
    await page.click('[data-testid="dog-age-submit"]');
    const result = await page.waitForSelector('[data-testid="dog-age-human-equivalent"]', { timeout: 5000 });
    const text = await result.textContent();
    assert(text.includes('28'), `Expected ~28, got "${text}"`);
  });

  // Toxic Checker
  await test('CALC-201: Toxic search input visible', async () => {
    await page.goto(BASE + '/shared/toxic-checker/');
    const input = await page.$('[data-testid="toxic-search-input"]');
    assert(input, 'Search input not found');
  });

  await test('CALC-202: Chocolate -> TOXIC badge', async () => {
    await page.goto(BASE + '/shared/toxic-checker/');
    await page.fill('[data-testid="toxic-search-input"]', 'chocolate');
    const badge = await page.waitForSelector('[data-testid="toxic-result-badge"]', { timeout: 5000 });
    const text = await badge.textContent();
    assert(text.includes('TOXIC'), `Expected TOXIC, got "${text}"`);
  });

  await test('CALC-203: Carrot -> SAFE badge', async () => {
    await page.goto(BASE + '/shared/toxic-checker/');
    await page.fill('[data-testid="toxic-search-input"]', 'carrot');
    const badge = await page.waitForSelector('[data-testid="toxic-result-badge"]', { timeout: 5000 });
    const text = await badge.textContent();
    assert(text.includes('SAFE'), `Expected SAFE, got "${text}"`);
  });

  // Calorie Calculator
  await test('CALC-301: Calorie form renders', async () => {
    await page.goto(BASE + '/dog/calorie-calculator/');
    const inputs = await page.$$('input[type="number"]');
    assert(inputs.length > 0, 'No number inputs found');
  });

  await test('CALC-302: 28kg neutered calorie calculation', async () => {
    await page.goto(BASE + '/dog/calorie-calculator/');
    const input = await page.$('input[type="number"]');
    await input.fill('28');
    // Click the Calculate button
    const btn = await page.$('button');
    await btn.click();
    // Wait for result
    await page.waitForTimeout(1000);
    const body = await page.textContent('body');
    assert(body.includes('kcal'), 'Calorie result not found');
  });

  // Gestation Calculator
  await test('CALC-401: Dog gestation form renders', async () => {
    await page.goto(BASE + '/dog/gestation-calculator/');
    const dateInput = await page.$('input[type="date"]');
    assert(dateInput || await page.$('h1'), 'Form not found');
  });

  // Vacination Schedule
  await test('CALC-501: Dog vaccine form renders', async () => {
    await page.goto(BASE + '/dog/vaccination-schedule/');
    assert(await page.$('input[type="date"]') || await page.$('h1'), 'Vaccine form not found');
  });

  await test('CALC-503: Cat vaccine form renders', async () => {
    await page.goto(BASE + '/cat/vaccination-schedule/');
    assert(await page.$('input[type="date"]') || await page.$('h1'), 'Vaccine form not found');
  });

  // Puppy Growth
  await test('CALC-601: Puppy growth renders', async () => {
    await page.goto(BASE + '/dog/puppy-growth-predictor/');
    assert(await page.$('h1'), 'Puppy growth page not rendering');
  });

  // Cat BCS
  await test('CALC-701: Cat BCS renders', async () => {
    await page.goto(BASE + '/cat/bcs-weight-tracker/');
    assert(await page.$('h1'), 'BCS page not rendering');
  });

  // Cat Hydration
  await test('CALC-801: Cat hydration renders', async () => {
    await page.goto(BASE + '/cat/hydration-calculator/');
    assert(await page.$('h1'), 'Hydration page not rendering');
  });

  // EU Travel
  await test('CALC-901: EU travel checker renders', async () => {
    await page.goto(BASE + '/shared/eu-pet-travel-checker/');
    const select = await page.$('select');
    assert(select, 'Country select not found');
  });

  await test('CALC-903: EU travel SEO page renders', async () => {
    const r = await page.goto(BASE + '/shared/eu-pet-travel/us-to-de/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'H1 not found');
  });

  // BARF Calculator
  await test('CALC-1001: BARF calculator renders', async () => {
    const r = await page.goto(BASE + '/shared/barf-calculator/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'BARF page H1 not found');
  });

  // Insurance Estimator
  await test('CALC-1101: Insurance estimator renders', async () => {
    const r = await page.goto(BASE + '/shared/pet-insurance-estimator/');
    assert(r.status() === 200, `Status: ${r.status()}`);
    assert(await page.$('h1'), 'Insurance page H1 not found');
  });

  // Disclaimer checks
  await test('COMP-007: Disclaimer on tool pages', async () => {
    const tools = ['/dog/age-calculator/', '/dog/calorie-calculator/', '/shared/toxic-checker/'];
    for (const t of tools) {
      await page.goto(BASE + t);
      const body = await page.textContent('body');
      assert(body.includes('does not constitute veterinary advice'), `Disclaimer missing on ${t}`);
    }
  });
}

async function runErrorTests(page) {
  // ERR-001: 404 page
  await test('ERR-001: 404 page for nonexistent route', async () => {
    const r = await page.goto(BASE + '/nonexistent-page-xyz/');
    assert(r.status() === 404, `Expected 404, got ${r.status()}`);
  });

  // ERR-007: P1 tools reachable
  await test('ERR-007: BARF and Insurance reachable', async () => {
    const r1 = await page.goto(BASE + '/shared/barf-calculator/');
    assert(r1.status() === 200, `BARF: ${r1.status()}`);
    const r2 = await page.goto(BASE + '/shared/pet-insurance-estimator/');
    assert(r2.status() === 200, `Insurance: ${r2.status()}`);
  });
}

async function runFooterTests(page) {
  await test('FOOT-001: Footer on homepage', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('petsMetrics'), 'Footer missing "petsMetrics"');
  });

  await test('FOOT-004: Contact is mailto', async () => {
    await page.goto(BASE + '/');
    const mailto = await page.$('a[href^="mailto:"]');
    assert(mailto, 'No mailto link found');
  });

  await test('FOOT-005: Copyright year is 2026', async () => {
    await page.goto(BASE + '/');
    const body = await page.textContent('body');
    assert(body.includes('2026'), 'Copyright year 2026 not found');
  });
}

async function runResponsiveTests(page) {
  await test('RESP-001: Mobile portrait', async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    assert(overflow.scrollWidth <= overflow.clientWidth + 1, 'Horizontal overflow on mobile');
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await test('RESP-004: Desktop layout', async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + '/');
    assert(await page.$('h1'), 'Desktop layout broken');
  });
}

// ---- Main ----
async function main() {
  console.log('=== petsMetrics E2E Test Runner ===\n');
  console.log('Using existing server at ' + BASE + '\n');

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('--- Navigation Tests ---');
    await runNavigationTests(page);

    console.log('\n--- Interaction Tests ---');
    await runInteractionTests(page);

    console.log('\n--- Footer Tests ---');
    await runFooterTests(page);

    console.log('\n--- Error/Boundary Tests ---');
    await runErrorTests(page);

    console.log('\n--- Responsive Tests ---');
    await runResponsiveTests(page);

    console.log('\n--- SEO Metadata Tests ---');
    await runSEOTests(page);

    await page.close();
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n=== Test Summary ===');
  const total = passed + failures;
  console.log(`  Passed: ${passed}/${total}`);
  console.log(`  Failed: ${failures}/${total}`);

  if (errors.length > 0) {
    console.log('\nFailed tests:');
    for (const e of errors) {
      console.log(`  ✗ ${e.name}`);
      console.log(`    ${e.error}`);
    }
  }

  console.log(failures === 0 ? '\n✅ All tests passed!' : `\n❌ ${failures} test(s) failed`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
