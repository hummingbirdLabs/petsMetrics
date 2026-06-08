import { test, expect } from '@playwright/test';

test.describe('Dog Age Calculator', () => {
  test('calculates human age for a 3-year-old medium dog', async ({ page }) => {
    await page.goto('/dog/age-calculator/');

    // Fill the age form
    const yearsInput = page.locator('[data-testid="dog-age-years-input"]');
    await yearsInput.fill('3');

    const monthsInput = page.locator('[data-testid="dog-age-months-input"]');
    await monthsInput.fill('0');

    // Medium size is selected by default
    await expect(page.locator('[data-testid="dog-size-medium"]')).toBeChecked();

    // Click calculate
    await page.click('[data-testid="dog-age-submit"]');

    // Verify result appears
    const result = page.locator('[data-testid="dog-age-result"]');
    await expect(result).toBeVisible();

    // Verify human age equivalent is shown (3yr medium ≈ 28)
    await expect(page.locator('[data-testid="dog-age-human-equivalent"]')).toContainText('28');
  });
});
