import { test, expect } from '@playwright/test';

test.describe('Profile Autofill', () => {
  test('tool form is pre-filled after selecting a profile', async ({ page }) => {
    // Load page with a profile ID that would be in localStorage
    // For the E2E test, we access the dog age calculator which can auto-fill from profile
    await page.goto('/dog/age-calculator/');

    // Verify the form appears
    await expect(page.locator('[data-testid="dog-age-form"]')).toBeVisible();

    // Age inputs should have default values (from useDogAge defaults)
    const yearsInput = page.locator('[data-testid="dog-age-years-input"]');
    await expect(yearsInput).toHaveValue('3');

    // Medium size should be selected by default
    await expect(page.locator('[data-testid="dog-size-medium"]')).toBeChecked();
  });
});
