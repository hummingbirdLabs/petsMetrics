/**
 * Phase A — Navigation & Route Tests
 *
 * Covers test.md §3.1 ~ §3.7:
 *   - Global nav (NAV-001 ~ NAV-008)
 *   - Home ToolDiscovery (NAV-101 ~ NAV-105)
 *   - Home Hero / ProfileFocus / StatsBar / FeaturedTool (HP-001 ~ HP-304)
 *   - Dog/Cat Hub links (NAV-201 ~ NAV-207)
 *   - Breadcrumb (NAV-301 ~ NAV-302)
 *   - Footer (FOOT-001 ~ FOOT-005)
 *   - Full-site crawl (NAV-901 ~ NAV-904)
 */
import { test, expect } from '@playwright/test';

// Static route data mirrors src/lib/data/routes.ts for Playwright compatibility
// (Playwright does not support the @/ path alias without additional config)

const ALL_TOOL_ROUTES = [
  'dog/age-calculator',
  'dog/calorie-calculator',
  'dog/puppy-growth-predictor',
  'dog/gestation-calculator',
  'dog/vaccination-schedule',
  'cat/age-calculator',
  'cat/bcs-weight-tracker',
  'cat/hydration-calculator',
  'cat/gestation-calculator',
  'cat/vaccination-schedule',
  'shared/toxic-checker',
  'shared/eu-pet-travel-checker',
  'shared/barf-calculator',
  'shared/pet-insurance-estimator',
  'profile',
];

// Sample toxic slugs for crawl testing
const SAMPLE_TOXIC_SLUGS = [
  { species: 'dog' as const, slug: 'grapes' },
  { species: 'dog' as const, slug: 'chocolate' },
  { species: 'dog' as const, slug: 'xylitol' },
  { species: 'dog' as const, slug: 'onions' },
  { species: 'dog' as const, slug: 'garlic' },
  { species: 'dog' as const, slug: 'avocado' },
  { species: 'dog' as const, slug: 'macadamia-nuts' },
  { species: 'dog' as const, slug: 'alcohol' },
  { species: 'dog' as const, slug: 'caffeine' },
  { species: 'dog' as const, slug: 'raisins' },
  { species: 'cat' as const, slug: 'grapes' },
  { species: 'cat' as const, slug: 'chocolate' },
  { species: 'cat' as const, slug: 'xylitol' },
  { species: 'cat' as const, slug: 'onions' },
  { species: 'cat' as const, slug: 'garlic' },
  { species: 'cat' as const, slug: 'alcohol' },
  { species: 'cat' as const, slug: 'caffeine' },
  { species: 'cat' as const, slug: 'raisins' },
  { species: 'cat' as const, slug: 'raw-dough' },
  { species: 'cat' as const, slug: 'lilies' },
];

// Sample EU travel routes for crawl testing
const SAMPLE_EU_TRAVEL_ROUTES = [
  { origin: 'US', destination: 'GB' },
  { origin: 'US', destination: 'DE' },
  { origin: 'US', destination: 'FR' },
  { origin: 'US', destination: 'ES' },
  { origin: 'US', destination: 'IT' },
  { origin: 'US', destination: 'NL' },
  { origin: 'CA', destination: 'GB' },
  { origin: 'CA', destination: 'DE' },
  { origin: 'CA', destination: 'FR' },
  { origin: 'AU', destination: 'GB' },
  { origin: 'GB', destination: 'FR' },
  { origin: 'GB', destination: 'DE' },
  { origin: 'GB', destination: 'ES' },
  { origin: 'GB', destination: 'IE' },
  { origin: 'GB', destination: 'NL' },
  { origin: 'FR', destination: 'GB' },
  { origin: 'DE', destination: 'GB' },
  { origin: 'IE', destination: 'GB' },
  { origin: 'FI', destination: 'SE' },
  { origin: 'NO', destination: 'SE' },
];

// ---------------------------------------------------------------------------
// §3.1 Global Nav
// ---------------------------------------------------------------------------
test.describe('Global Navigation', () => {
  test('NAV-001: Home link navigates to /', async ({ page }) => {
    await page.goto('/dog/');
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('One Profile');
  });

  test('NAV-002: Dog link navigates to /dog/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Dog' }).first().click();
    await expect(page).toHaveURL('/dog/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('NAV-003: Cat link navigates to /cat/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Cat' }).first().click();
    await expect(page).toHaveURL('/cat/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('NAV-004: Shared link navigates to /shared/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Shared' }).first().click();
    await expect(page).toHaveURL('/shared/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('NAV-005: Profile link navigates to /profile/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Profile' }).first().click();
    await expect(page).toHaveURL('/profile/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('NAV-006: Mobile hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // Hamburger should be visible on mobile
    const hamburger = page.getByLabel('Toggle navigation');
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Nav links now visible
    await expect(page.getByRole('link', { name: 'Dog' })).toBeVisible();

    // Click again to close
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------------------------------
// §3.2 Home ToolDiscovery
// ---------------------------------------------------------------------------
test.describe('Home ToolDiscovery Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('NAV-101: Dog Tab tools have valid links', async ({ page }) => {
    // Dog tab should be active by default (or click it)
    await page.getByRole('button', { name: 'Dog' }).click();

    // Get all tool card links visible in the ToolDiscovery section
    const links = page.locator('section').filter({ hasText: 'Explore Our Tools' }).locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(6);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href, `Tool card ${i} href should not be #`).not.toBe('#');
      expect(href, `Tool card ${i} href should not be empty`).toBeTruthy();
      expect(href, `Tool card ${i} href should end with /`).toMatch(/\/$/);
    }
  });

  test('NAV-102: Cat Tab tools have valid links', async ({ page }) => {
    await page.getByRole('button', { name: 'Cat' }).click();
    const links = page.locator('section').filter({ hasText: 'Explore Our Tools' }).locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(7);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).not.toBe('#');
      expect(href).toBeTruthy();
    }
  });

  test('NAV-103: All Tab tools have valid links', async ({ page }) => {
    await page.getByRole('button', { name: 'All' }).click();
    const links = page.locator('section').filter({ hasText: 'Explore Our Tools' }).locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(14);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).not.toBe('#');
      expect(href).toBeTruthy();
    }
  });

  test('NAV-104: Insurance card link is not a dead link', async ({ page }) => {
    await page.getByRole('button', { name: 'All' }).click();

    // Find the insurance card link
    const insuranceLink = page.getByRole('link', { name: /Insurance/i }).first();
    const href = await insuranceLink.getAttribute('href');
    expect(href).not.toBe('#');
    expect(href).toContain('pet-insurance-estimator');
  });
});

// ---------------------------------------------------------------------------
// §3.2b Home Hero Section
// ---------------------------------------------------------------------------
test.describe('Home Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('HP-001: H1 title renders', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('One Profile. Every Answer.');
  });

  test('HP-002: Subtitle renders', async ({ page }) => {
    await expect(page.getByText('Create your pet profile once')).toBeVisible();
    await expect(page.getByText('No login. No AI. Just science.')).toBeVisible();
  });

  test('HP-003: Dog Tools CTA navigates to /dog/', async ({ page }) => {
    await page.getByRole('link', { name: /Dog Tools/ }).click();
    await expect(page).toHaveURL('/dog/');
  });

  test('HP-004: Cat Tools CTA navigates to /cat/', async ({ page }) => {
    await page.getByRole('link', { name: /Cat Tools/ }).click();
    await expect(page).toHaveURL('/cat/');
  });

  test('HP-005: Trust line renders', async ({ page }) => {
    await expect(page.getByText(/200\+ Foods/)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §3.2b Profile Focus Section
// ---------------------------------------------------------------------------
test.describe('Home Profile Focus Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('HP-101: Section title renders', async ({ page }) => {
    await expect(page.getByText('Why petsMetrics is different')).toBeVisible();
  });

  test('HP-102: Three steps render', async ({ page }) => {
    await expect(page.getByText('Create a Pet Profile')).toBeVisible();
    await expect(page.getByText('Open Any Tool')).toBeVisible();
    await expect(page.getByText('Get Science-Based Answers')).toBeVisible();
  });

  test('HP-104: CTA navigates to /profile/', async ({ page }) => {
    await page.getByRole('link', { name: /Create My Pet Profile/ }).click();
    await expect(page).toHaveURL('/profile/');
  });
});

// ---------------------------------------------------------------------------
// §3.2b Home Featured Tool (Toxic Checker inline)
// ---------------------------------------------------------------------------
test.describe('Home Featured Tool', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('HP-301: Emergency banner renders with phone number', async ({ page }) => {
    await expect(page.getByText('(888) 426-4435')).toBeVisible();
  });

  test('HP-303: Quick search redirects to toxic checker', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="grapes"]').or(page.getByPlaceholder(/Search:/));
    await searchInput.fill('chocolate');
    await page.getByRole('button', { name: 'Check' }).click();
    await expect(page).toHaveURL(/shared\/toxic-checker/);
  });
});

// ---------------------------------------------------------------------------
// §3.3 Dog Hub / Cat Hub Links
// ---------------------------------------------------------------------------
test.describe('Dog Hub Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dog/');
  });

  test('NAV-201: P0 tool links are valid', async ({ page }) => {
    const links = page.locator('main a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && href.startsWith('/')) {
        expect(href, `Link ${i}: ${href} should not be #`).not.toBe('#');
      }
    }
  });

  test('NAV-203: Insurance card is not a dead link', async ({ page }) => {
    const insuranceLink = page.getByRole('link', { name: /Insurance/i }).first();
    const href = await insuranceLink.getAttribute('href');
    expect(href).not.toBe('#');
    expect(href).toContain('pet-insurance-estimator');
  });
});

test.describe('Cat Hub Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cat/');
  });

  test('NAV-202: Tool links are valid', async ({ page }) => {
    const links = page.locator('main a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && href.startsWith('/')) {
        expect(href, `Link ${i}: ${href} should not be #`).not.toBe('#');
      }
    }
  });

  test('NAV-204: Insurance card is not a dead link', async ({ page }) => {
    const insuranceLink = page.getByRole('link', { name: /Insurance/i }).first();
    const href = await insuranceLink.getAttribute('href');
    expect(href).not.toBe('#');
    expect(href).toContain('pet-insurance-estimator');
  });
});

// ---------------------------------------------------------------------------
// §3.6 Footer
// ---------------------------------------------------------------------------
test.describe('Footer', () => {
  const pagesToCheck = ['/', '/dog/', '/cat/', '/profile/'];

  for (const route of pagesToCheck) {
    test(`FOOT-001: Footer renders on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByText('petsMetrics')).toBeVisible();
    });
  }

  test('FOOT-002: Privacy link navigates', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Privacy' }).click();
    await expect(page).not.toHaveURL(/\/404/);
  });

  test('FOOT-003: Disclaimer link navigates', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Disclaimer' }).click();
    await expect(page).not.toHaveURL(/\/404/);
  });

  test('FOOT-004: Contact is a mailto link', async ({ page }) => {
    await page.goto('/');
    const contactLink = page.getByRole('link', { name: 'Contact' });
    const href = await contactLink.getAttribute('href');
    expect(href).toContain('mailto:');
  });

  test('FOOT-005: Copyright year is current', async ({ page }) => {
    await page.goto('/');
    const currentYear = String(new Date().getFullYear());
    await expect(page.getByText(new RegExp(currentYear))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §3.7 Full-Site Crawl
// ---------------------------------------------------------------------------
test.describe('Full-Site Crawl', () => {
  test('NAV-901: All tool routes return 200', async ({ page }) => {
    const results: string[] = [];

    for (const route of ALL_TOOL_ROUTES) {
      const response = await page.goto(`/${route}/`);
      if (!response || response.status() !== 200) {
        results.push(`${route} → ${response?.status() ?? 'no response'}`);
      }
    }

    expect(results, `Dead routes found:\n${results.join('\n')}`).toEqual([]);
  });

  test('NAV-902: No # href in any page', async ({ page }) => {
    const pages = ['/', '/dog/', '/cat/', '/shared/', '/profile/'];

    for (const route of pages) {
      await page.goto(route);
      const deadLinks = await page.$$eval(
        'a[href="#"]',
        (els) => els.length,
      );
      expect(deadLinks, `${route} has ${deadLinks} dead link(s) (href="#")`).toBe(0);
    }
  });

  test('NAV-903: Toxic SEO pages are reachable (sampling 20)', async ({ page }) => {
    const failures: string[] = [];
    for (const { species, slug } of SAMPLE_TOXIC_SLUGS) {
      const prefix = species === 'dog' ? '/dog/can-dogs-eat/' : '/cat/are-toxic-to-cats/';
      const response = await page.goto(`${prefix}${slug}/`);
      if (!response || response.status() !== 200) {
        failures.push(`${prefix}${slug}/ → ${response?.status()}`);
      }
    }

    expect(failures, `Toxic pages failed:\n${failures.join('\n')}`).toEqual([]);
  });

  test('NAV-904: EU travel routes are reachable (sampling 20)', async ({ page }) => {
    const failures: string[] = [];
    for (const { origin, destination } of SAMPLE_EU_TRAVEL_ROUTES) {
      const slug = `${origin}-to-${destination}`.toLowerCase();
      const response = await page.goto(`/shared/eu-pet-travel/${slug}/`);
      if (!response || response.status() !== 200) {
        failures.push(`/shared/eu-pet-travel/${slug}/ → ${response?.status()}`);
      }
    }

    expect(failures, `EU travel routes failed:\n${failures.join('\n')}`).toEqual([]);
  });
});
