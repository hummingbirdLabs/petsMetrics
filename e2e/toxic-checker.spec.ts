import { test, expect } from '@playwright/test';

test.describe('Toxic Checker', () => {
  test('shows TOXIC badge when chocolate is searched', async ({ page }) => {
    await page.goto('/shared/toxic-checker/');

    // Click dog species toggle (should be selected by default)
    const searchInput = page.locator('[data-testid="toxic-search-input"]');
    await expect(searchInput).toBeVisible();

    // Search for a popular toxic food
    await searchInput.fill('chocolate');

    // Wait for the debounced search result
    await page.waitForSelector('[data-testid="toxic-result-badge"]', { timeout: 5000 });

    // Verify TOXIC badge appears
    const badge = page.locator('[data-testid="toxic-result-badge"]');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('TOXIC');
  });
});
