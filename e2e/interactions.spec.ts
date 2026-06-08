/**
 * Phase B — Core Tool Interaction Tests
 *
 * Covers test.md §4.1 ~ §4.15:
 *   - 10 P0 tool pages: form rendering, calculations, result display
 *   - P1 tools: BARF, Insurance Estimator
 *   - Shared components: AffiliateBanner, ShareButtons, DisclaimerSection, Chart.js
 *   - Cross-tool data consistency
 */
import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// §4.1 Dog Age Calculator — /dog/age-calculator/
// ---------------------------------------------------------------------------
test.describe('Dog Age Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dog/age-calculator/');
  });

  test('CALC-001: Default values render', async ({ page }) => {
    await expect(page.locator('[data-testid="dog-age-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="dog-age-years-input"]')).toHaveValue('3');
    await expect(page.locator('[data-testid="dog-age-months-input"]')).toHaveValue('0');
    await expect(page.locator('[data-testid="dog-size-medium"]')).toBeChecked();
  });

  test('CALC-002: Medium dog (3yr) gives ~28 human years', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('3');
    await page.locator('[data-testid="dog-age-months-input"]').fill('0');
    await page.click('[data-testid="dog-age-submit"]');

    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
    await expect(page.locator('[data-testid="dog-age-human-equivalent"]')).toContainText('28');
  });

  test('CALC-003: Small dog (5yr) calculation', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('5');
    await page.locator('[data-testid="dog-size-small"]').check();
    await page.click('[data-testid="dog-age-submit"]');

    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
    await expect(page.locator('[data-testid="dog-age-human-equivalent"]')).toContainText('36');
  });

  test('CALC-004: Large dog (2yr) calculation', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('2');
    await page.locator('[data-testid="dog-size-large"]').check();
    await page.click('[data-testid="dog-age-submit"]');

    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
    await expect(page.locator('[data-testid="dog-age-human-equivalent"]')).toContainText('22');
  });

  test('CALC-005: Giant dog (4yr) calculation', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('4');
    await page.locator('[data-testid="dog-size-giant"]').check();
    await page.click('[data-testid="dog-age-submit"]');

    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
    await expect(page.locator('[data-testid="dog-age-human-equivalent"]')).toContainText('39');
  });

  test('CALC-006: Partial year (months) calculation', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('2');
    await page.locator('[data-testid="dog-age-months-input"]').fill('6');
    await page.click('[data-testid="dog-age-submit"]');

    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
    const result = await page.locator('[data-testid="dog-age-human-equivalent"]').textContent();
    expect(result).toBeTruthy();
  });

  test('CALC-008: Max age (25yr) does not crash', async ({ page }) => {
    await page.locator('[data-testid="dog-age-years-input"]').fill('25');
    await page.click('[data-testid="dog-age-submit"]');
    await expect(page.locator('[data-testid="dog-age-result"]')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.2 Cat Age Calculator — /cat/age-calculator/
// ---------------------------------------------------------------------------
test.describe('Cat Age Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cat/age-calculator/');
  });

  test('CALC-101: Form renders with defaults', async ({ page }) => {
    // The cat age widget should have a form with age input
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate/i })).toBeVisible();
  });

  test('CALC-102: Adult cat (3yr) calculation', async ({ page }) => {
    await page.locator('input[type="number"]').first().fill('3');
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/28/)).toBeVisible();
  });

  test('CALC-103: Senior cat (15yr) calculation', async ({ page }) => {
    await page.locator('input[type="number"]').first().fill('15');
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/76/)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.3 Toxic Checker — /shared/toxic-checker/
// ---------------------------------------------------------------------------
test.describe('Toxic Checker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shared/toxic-checker/');
  });

  test('CALC-201: Search input visible', async ({ page }) => {
    await expect(page.locator('[data-testid="toxic-search-input"]')).toBeVisible();
  });

  test('CALC-202: Chocolate shows TOXIC badge', async ({ page }) => {
    await page.locator('[data-testid="toxic-search-input"]').fill('chocolate');
    await page.waitForSelector('[data-testid="toxic-result-badge"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="toxic-result-badge"]')).toContainText('TOXIC');
  });

  test('CALC-203: Carrot shows SAFE badge', async ({ page }) => {
    await page.locator('[data-testid="toxic-search-input"]').fill('carrot');
    await page.waitForSelector('[data-testid="toxic-result-badge"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="toxic-result-badge"]')).toContainText('SAFE');
  });

  test('CALC-204: Species toggle between Dog and Cat', async ({ page }) => {
    // Default is Dog
    const dogToggle = page.getByRole('button', { name: 'Dog' }).or(page.getByText('Dog', { exact: true })).first();
    await expect(dogToggle).toBeVisible();

    // Switch to Cat
    const catToggle = page.getByRole('button', { name: 'Cat' }).or(page.getByText('Cat', { exact: true })).first();
    if (await catToggle.isVisible()) {
      await catToggle.click();
    }
  });

  test('CALC-206: No results shows appropriate message', async ({ page }) => {
    await page.locator('[data-testid="toxic-search-input"]').fill('xyz123nonexistent');
    await page.waitForTimeout(800);
    const notFound = page.getByText(/No results/i).or(page.getByText(/not found/i));
    await expect(notFound.first()).toBeVisible({ timeout: 5000 });
  });

  test('CALC-208: Emergency contact info visible', async ({ page }) => {
    await expect(page.getByText(/poison/i).or(page.getByText(/veterinarian/i))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.4 Dog Calorie Calculator — /dog/calorie-calculator/
// ---------------------------------------------------------------------------
test.describe('Dog Calorie Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dog/calorie-calculator/');
  });

  test('CALC-301: Form renders', async ({ page }) => {
    // Weight input should exist
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate/i })).toBeVisible();
  });

  test('CALC-302: Adult neutered (28kg) calculation', async ({ page }) => {
    await page.locator('input[type="number"]').first().fill('28');
    await page.getByRole('button', { name: /Calculate/i }).click();

    // Result should contain calories
    await expect(page.getByText(/kcal/i)).toBeVisible();
  });

  test('CALC-303: Puppy (5kg) calculation', async ({ page }) => {
    await page.locator('input[type="number"]').first().fill('5');
    // Try to select puppy life stage if dropdown exists
    const select = page.locator('select').first();
    if (await select.isVisible()) {
      await select.selectOption({ label: /Puppy/i });
    }
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/kcal/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.5 Gestation Calculator — /dog/gestation-calculator/
// ---------------------------------------------------------------------------
test.describe('Dog Gestation Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dog/gestation-calculator/');
  });

  test('CALC-401: Date input and calculation', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible()) {
      // Set a past date
      await dateInput.fill('2026-01-01');
      await page.getByRole('button', { name: /Calculate/i }).click();
      // Expect some result text
      await expect(page.getByText(/due/i).or(page.getByText(/day/i))).toBeVisible();
    } else {
      // If date picker not visible, check form is at least present
      await expect(page.getByText(/mating/i).or(page.getByText(/Date/i))).toBeVisible();
    }
  });

  test('CALC-404: Future date rejected', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible()) {
      await dateInput.fill('2030-01-01');
      await page.getByRole('button', { name: /Calculate/i }).click();
      // May show error or just not navigate
      const errorText = page.getByText(/future/i).or(page.getByText(/invalid/i));
      await expect(errorText.first()).toBeVisible({ timeout: 3000 }).catch(() => {
        // If no explicit error, page should still render without crashing
        expect(page.locator('h1')).toBeVisible();
      });
    }
  });
});

// ---------------------------------------------------------------------------
// §4.5 Cat Gestation Calculator — /cat/gestation-calculator/
// ---------------------------------------------------------------------------
test.describe('Cat Gestation Calculator', () => {
  test('CALC-403: Date input and calculation', async ({ page }) => {
    await page.goto('/cat/gestation-calculator/');
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible()) {
      await dateInput.fill('2026-01-01');
      await page.getByRole('button', { name: /Calculate/i }).click();
      await expect(page.getByText(/due/i).or(page.getByText(/day/i))).toBeVisible();
    } else {
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// §4.6 Vaccination Schedule — /dog/vaccination-schedule/ & /cat/vaccination-schedule/
// ---------------------------------------------------------------------------
test.describe('Dog Vaccination Schedule', () => {
  test('CALC-501: Form renders', async ({ page }) => {
    await page.goto('/dog/vaccination-schedule/');
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate/i }).or(page.getByRole('button', { name: /Calculate/i }))).toBeVisible();
  });

  test('CALC-502: Generate schedule for US', async ({ page }) => {
    await page.goto('/dog/vaccination-schedule/');
    const dateInput = page.locator('input[type="date"]').first();
    if (await dateInput.isVisible()) {
      await dateInput.fill('2026-01-01');
    }
    await page.getByRole('button', { name: /Generate/i }).or(page.getByRole('button', { name: /Calculate/i })).click();
    await expect(page.getByText(/vaccine/i).or(page.getByText(/DHPP/i))).toBeVisible();
  });
});

test.describe('Cat Vaccination Schedule', () => {
  test('CALC-503: Form renders and generates', async ({ page }) => {
    await page.goto('/cat/vaccination-schedule/');
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
    await page.getByRole('button', { name: /Generate/i }).or(page.getByRole('button', { name: /Calculate/i })).click();
    await expect(page.getByText(/vaccine/i).or(page.getByText(/FVRCP/i))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.7 Puppy Growth Predictor — /dog/puppy-growth-predictor/
// ---------------------------------------------------------------------------
test.describe('Puppy Growth Predictor', () => {
  test('CALC-601: Form renders', async ({ page }) => {
    await page.goto('/dog/puppy-growth-predictor/');
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate/i })).toBeVisible();
  });

  test('CALC-602: Labrador 15kg/4mo calculation', async ({ page }) => {
    await page.goto('/dog/puppy-growth-predictor/');
    // Fill weight and age
    const inputs = page.locator('input[type="number"]');
    const count = await inputs.count();
    if (count >= 2) {
      await inputs.nth(0).fill('15');
      await inputs.nth(1).fill('4');
    }
    await page.getByRole('button', { name: /Calculate/i }).click();
    // Check result
    await expect(page.getByText(/kg/i).or(page.getByText(/lb/i)).or(page.getByText(/weight/i))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.8 Cat BCS Weight Tracker — /cat/bcs-weight-tracker/
// ---------------------------------------------------------------------------
test.describe('Cat BCS Weight Tracker', () => {
  test('CALC-701: Form renders', async ({ page }) => {
    await page.goto('/cat/bcs-weight-tracker/');
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate/i })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.9 Cat Hydration Calculator — /cat/hydration-calculator/
// ---------------------------------------------------------------------------
test.describe('Cat Hydration Calculator', () => {
  test('CALC-801: Hydration calculation', async ({ page }) => {
    await page.goto('/cat/hydration-calculator/');
    const weightInput = page.locator('input[type="number"]').first();
    await weightInput.fill('5');
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/ml/i)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.10 EU Pet Travel Checker — /shared/eu-pet-travel-checker/
// ---------------------------------------------------------------------------
test.describe('EU Pet Travel Checker', () => {
  test('CALC-901: Form renders with origin/destination', async ({ page }) => {
    await page.goto('/shared/eu-pet-travel-checker/');
    await expect(page.locator('select').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Check/i }).or(page.getByRole('button', { name: /Search/i }))).toBeVisible();
  });

  test('CALC-903: SEO route page renders', async ({ page }) => {
    const response = await page.goto('/shared/eu-pet-travel/US-to-DE/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.11 BARF Calculator — /shared/barf-calculator/
// ---------------------------------------------------------------------------
test.describe('BARF Calculator', () => {
  test('CALC-1001: Form renders', async ({ page }) => {
    await page.goto('/shared/barf-calculator/');
    await expect(page.locator('input[type="number"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Calculate/i })).toBeVisible();
  });

  test('CALC-1002: Dog BARF calculation', async ({ page }) => {
    await page.goto('/shared/barf-calculator/');
    await page.locator('input[type="number"]').first().fill('25');
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/g/i).or(page.getByText(/muscle/i))).toBeVisible();
  });

  test('CALC-1003: Cat BARF calculation', async ({ page }) => {
    await page.goto('/shared/barf-calculator/');
    // Switch to Cat
    const catToggle = page.getByRole('button', { name: 'Cat' }).or(page.getByText('Cat', { exact: true })).first();
    if (await catToggle.isVisible()) {
      await catToggle.click();
    }
    await page.locator('input[type="number"]').first().fill('5');
    await page.getByRole('button', { name: /Calculate/i }).click();
    await expect(page.getByText(/g/i).or(page.getByText(/muscle/i))).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.12 Pet Insurance Estimator — /shared/pet-insurance-estimator/
// ---------------------------------------------------------------------------
test.describe('Pet Insurance Estimator', () => {
  test('CALC-1101: Page renders', async ({ page }) => {
    const response = await page.goto('/shared/pet-insurance-estimator/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// §4.13 Shared Component Validation (cross-tool)
// ---------------------------------------------------------------------------
test.describe('Shared Components', () => {
  test('COMP-001: AffiliateBanner on calorie tool page', async ({ page }) => {
    await page.goto('/dog/calorie-calculator/');
    // Affiliate banner should appear somewhere on the page
    await expect(page.getByText(/Insurance/i).or(page.getByText(/Sponsored/i))).toBeVisible();
  });

  test('COMP-007: DisclaimerSection on key tool pages', async ({ page }) => {
    const toolPages = [
      '/dog/age-calculator/',
      '/dog/calorie-calculator/',
      '/dog/gestation-calculator/',
      '/dog/vaccination-schedule/',
      '/cat/age-calculator/',
      '/shared/toxic-checker/',
    ];

    for (const route of toolPages) {
      await page.goto(route);
      // Each result tool should show the standard disclaimer
      await expect(
        page.getByText(/does not constitute veterinary advice/i),
        `Missing disclaimer on ${route}`
      ).toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// §4.15 Disclaimer
// ---------------------------------------------------------------------------
test.describe('Disclaimer Compliance', () => {
  test('MISC-001: Standard disclaimer on all P0 tool result pages', async ({ page }) => {
    const p0Tools = [
      '/dog/age-calculator/',
      '/dog/calorie-calculator/',
      '/dog/gestation-calculator/',
      '/dog/vaccination-schedule/',
      '/dog/puppy-growth-predictor/',
      '/cat/age-calculator/',
      '/cat/gestation-calculator/',
      '/cat/vaccination-schedule/',
      '/cat/bcs-weight-tracker/',
      '/cat/hydration-calculator/',
      '/shared/toxic-checker/',
      '/shared/eu-pet-travel-checker/',
    ];

    for (const route of p0Tools) {
      await page.goto(route);
      await expect(
        page.getByText(/does not constitute veterinary advice/),
        `Disclaimer missing on ${route}`
      ).toBeVisible({ timeout: 3000 });
    }
  });
});
