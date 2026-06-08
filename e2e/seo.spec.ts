/**
 * Phase D — SEO & Metadata Tests
 *
 * Covers test.md §6.1 ~ §6.3:
 *   - Per-page metadata (title, description, canonical, OG, JSON-LD, H1, alt)
 *   - Sitemap & Robots
 *   - Dynamic landing page SEO
 */
import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// §6.1 Per-Page Metadata
// ---------------------------------------------------------------------------

/** Critical pages to verify metadata on */
const CRITICAL_PAGES = [
  '/',
  '/dog/',
  '/dog/age-calculator/',
  '/dog/calorie-calculator/',
  '/dog/gestation-calculator/',
  '/dog/vaccination-schedule/',
  '/dog/puppy-growth-predictor/',
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

test.describe('Page Metadata', () => {
  for (const route of CRITICAL_PAGES) {
    test(`SEO-001: Title <= 60 chars on ${route}`, async ({ page }) => {
      await page.goto(route);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length, `Title on ${route} is ${title.length} chars (must be <= 60)`).toBeLessThanOrEqual(60);
    });

    test(`SEO-002: Meta description <= 155 chars on ${route}`, async ({ page }) => {
      await page.goto(route);
      const descContent = await page.locator('meta[name="description"]').getAttribute('content');
      expect(descContent).toBeTruthy();
      expect(descContent!.length, `Description on ${route} is ${descContent!.length} chars (must be <= 155)`)
        .toBeLessThanOrEqual(155);
    });

    test(`SEO-003: Canonical URL correct on ${route}`, async ({ page }) => {
      await page.goto(route);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const href = await canonical.getAttribute('href');
      expect(href).toContain('petsmetrics.com');
    });

    test(`SEO-004: Open Graph tags present on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
    });

    test(`SEO-005: Schema.org JSON-LD present on ${route}`, async ({ page }) => {
      await page.goto(route);
      const jsonLd = page.locator('script[type="application/ld+json"]');
      const count = await jsonLd.count();
      expect(count, `No JSON-LD on ${route}`).toBeGreaterThanOrEqual(1);
    });

    test(`SEO-006: Exactly one H1 on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1'), `${route} must have exactly one H1`).toHaveCount(1);
    });

    test(`SEO-007: All img have alt on ${route}`, async ({ page }) => {
      await page.goto(route);
      const imgsWithoutAlt = await page.$$eval('img:not([alt])', (els) => els.length);
      expect(imgsWithoutAlt, `${route} has ${imgsWithoutAlt} <img> without alt`).toBe(0);
    });
  }
});

// ---------------------------------------------------------------------------
// §6.1b Dynamic landing page metadata
// ---------------------------------------------------------------------------
test.describe('Dynamic Page SEO', () => {
  test('SEO-201: Toxic landing page title contains food name', async ({ page }) => {
    await page.goto('/dog/can-dogs-eat/grapes/');
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/grape/);
  });

  test('SEO-202: EU travel landing page metadata', async ({ page }) => {
    await page.goto('/shared/eu-pet-travel/US-to-DE/');
    const title = await page.title();
    expect(title).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content');
  });
});

// ---------------------------------------------------------------------------
// §6.2 Sitemap & Robots
// ---------------------------------------------------------------------------
test.describe('Sitemap & Robots', () => {
  test('SEO-101: sitemap.xml reachable and contains routes', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const body = await page.content();
    expect(body).toContain('<urlset');
    expect(body).toContain('/dog/age-calculator/');
    expect(body).toContain('/cat/age-calculator/');
    expect(body).toContain('/shared/toxic-checker/');
  });

  test('SEO-102: robots.txt reachable and allows crawling', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);

    const body = await page.content();
    expect(body).toContain('Allow');
    expect(body).toContain('sitemap');
  });

  test('SEO-103: Dynamic SEO slugs in sitemap (toxicity pages)', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);

    const body = await page.content();
    // Should contain dog toxic pages
    expect(body).toContain('/dog/can-dogs-eat/');
    // Should contain cat toxic pages
    expect(body).toContain('/cat/are-toxic-to-cats/');
  });
});
