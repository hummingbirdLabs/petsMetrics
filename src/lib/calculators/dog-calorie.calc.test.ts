import { describe, it, expect } from 'vitest';
import { calculateDogCalorie } from '@/lib/calculators/dog-calorie.calc';
import type { ActivityScenario } from '@/lib/calculators/dog-calorie.calc';

describe('calculateDogCalorie', () => {
  describe('RER calculation', () => {
    it('calculates RER for a 10kg dog', () => {
      const result = calculateDogCalorie({ weightKg: 10, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER = 70 × 10^0.75 = 70 × 5.6234 ≈ 393.6
      expect(result.data.rer).toBeCloseTo(393.6, 0);
    });

    it('calculates RER for a 1kg dog', () => {
      const result = calculateDogCalorie({ weightKg: 1, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER = 70 × 1^0.75 = 70
      expect(result.data.rer).toBeCloseTo(70, 0);
    });
  });

  describe('MER calculation', () => {
    it('calculates MER for neutered adult 10kg dog', () => {
      const result = calculateDogCalorie({ weightKg: 10, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER ≈ 393.6, factor = 1.4, MER ≈ 551
      expect(result.data.mer).toBe(551);
      expect(result.data.activityFactor).toBe(1.4);
    });

    it('calculates MER for intact adult 10kg dog', () => {
      const result = calculateDogCalorie({ weightKg: 10, activityScenario: 'intact_adult' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER ≈ 393.6, factor = 1.6, MER ≈ 630
      expect(result.data.mer).toBe(630);
      expect(result.data.activityFactor).toBe(1.6);
    });

    it('calculates MER for puppy under 4 months', () => {
      const result = calculateDogCalorie({ weightKg: 5, activityScenario: 'puppy_under_4m' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER = 70 × 5^0.75 = 70 × 3.3437 ≈ 234.1, factor = 3.0, MER ≈ 702
      expect(result.data.mer).toBe(702);
      expect(result.data.activityFactor).toBe(3.0);
    });

    it('calculates MER for weight loss', () => {
      const result = calculateDogCalorie({ weightKg: 10, activityScenario: 'weight_loss' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.activityFactor).toBe(1.0);
      expect(result.data.mer).toBe(394);
    });

    it('calculates MER for working dog', () => {
      const result = calculateDogCalorie({ weightKg: 20, activityScenario: 'working_dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // RER = 70 × 20^0.75 = 70 × 9.4574 ≈ 662, MER ≈ 662 × 5 = 3310
      expect(result.data.activityFactor).toBe(5.0);
      expect(result.data.mer).toBe(3310);
    });
  });

  describe('food grams calculation', () => {
    it('calculates daily food grams when density provided', () => {
      const result = calculateDogCalorie({
        weightKg: 10,
        activityScenario: 'neutered_adult',
        foodCalorieDensityKcalPerKg: 3500,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // MER = 551 kcal, density = 3500 kcal/kg -> 551/3500 * 1000 = 157.4 -> 157g
      expect(result.data.dailyFoodGrams).toBe(157);
    });

    it('returns null for dailyFoodGrams when density not provided', () => {
      const result = calculateDogCalorie({ weightKg: 10, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.dailyFoodGrams).toBeNull();
    });
  });

  describe('error handling', () => {
    it('returns error for weight <= 0', () => {
      const result = calculateDogCalorie({ weightKg: 0, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_WEIGHT');
    });

    it('returns error for negative weight', () => {
      const result = calculateDogCalorie({ weightKg: -5, activityScenario: 'neutered_adult' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_WEIGHT');
    });

    it('returns error for invalid activity scenario', () => {
      const result = calculateDogCalorie({
        weightKg: 10,
        activityScenario: 'invalid_scenario' as ActivityScenario,
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_SCENARIO');
    });

    it('returns error for invalid calorie density', () => {
      const result = calculateDogCalorie({
        weightKg: 10,
        activityScenario: 'neutered_adult',
        foodCalorieDensityKcalPerKg: -1,
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_CALORIE_DENSITY');
    });
  });

  describe('activity factors from spec', () => {
    it('puppy_under_4m factor is 3.0', () => {
      const result = calculateDogCalorie({ weightKg: 5, activityScenario: 'puppy_under_4m' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.activityFactor).toBe(3.0);
    });

    it('puppy_over_4m factor is 2.0', () => {
      const result = calculateDogCalorie({ weightKg: 5, activityScenario: 'puppy_over_4m' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.activityFactor).toBe(2.0);
    });
  });
});
