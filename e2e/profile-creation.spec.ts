import { test, expect } from '@playwright/test';

test.describe('Profile Creation Wizard', () => {
  test('creates a dog profile through all steps', async ({ page }) => {
    await page.goto('/profile/');

    // Step 1: Select species — Dog
    await page.click('[data-testid="wizard-species-dog"]');
    await page.click('[data-testid="wizard-continue"]');

    // Step 2: Enter pet name
    const nameInput = page.locator('[data-testid="wizard-name-input"]');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Buddy');
    await page.click('[data-testid="wizard-continue"]');

    // Step 3: Enter age and weight
    const ageYearsInput = page.locator('[data-testid="wizard-age-years"]');
    await expect(ageYearsInput).toBeVisible();
    await ageYearsInput.fill('3');

    const weightInput = page.locator('[data-testid="wizard-weight"]');
    await weightInput.fill('28');
    await page.click('[data-testid="wizard-continue"]');

    // Step 4: Health details — male, neutered
    await page.click('[data-testid="wizard-sex-male"]');
    await page.click('[data-testid="wizard-neutered-yes"]');
    await page.click('[data-testid="wizard-continue"]');

    // Step 5: Review and create
    await page.click('[data-testid="wizard-continue"]');

    // Verify profile card appears
    await expect(page.locator('[data-testid="profile-card"]')).toBeVisible();
  });
});
