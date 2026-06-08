import { describe, it, expect } from 'vitest';
import { calculateCatHydration } from '@/lib/calculators/cat-hydration.calc';

describe('calculateCatHydration', () => {
  describe('basic calculation', () => {
    it('calculates for a 4kg cat with mixed diet', () => {
      // totalDaily = 4 * 50 = 200ml
      // fromFood = 30 * 0.1 + 100 * 0.8 = 3 + 80 = 83ml
      // extraNeeded = 200 - 83 = 117ml
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 30,
        dailyWetFoodGrams: 100,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.totalDailyMl).toBe(200);
      expect(result.data.fromFoodMl).toBe(83);
      expect(result.data.extraWaterNeededMl).toBe(117);
      expect(result.data.hydrationStatus).toBe('low');
    });
  });

  describe('hydration status', () => {
    it('adequate when wet food covers all water needs', () => {
      // 4kg: total = 200ml, wet food 250g -> 200ml, extra = 0
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 0,
        dailyWetFoodGrams: 250,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.extraWaterNeededMl).toBe(0);
      expect(result.data.hydrationStatus).toBe('adequate');
    });

    it('adequate when food provides more than needed', () => {
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 0,
        dailyWetFoodGrams: 300,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.extraWaterNeededMl).toBe(0);
      expect(result.data.hydrationStatus).toBe('adequate');
    });

    it('slightly_low when extra needed is 0-20ml', () => {
      // 4kg: total=200, wetFood=230g -> 184ml, extra=16ml
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 0,
        dailyWetFoodGrams: 230,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.extraWaterNeededMl).toBe(16);
      expect(result.data.hydrationStatus).toBe('slightly_low');
    });

    it('low when extra needed > 20ml', () => {
      // 4kg, dry-only: total=200, fromFood=50*0.1=5, extra=195
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 50,
        dailyWetFoodGrams: 0,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.hydrationStatus).toBe('low');
    });
  });

  describe('different weights', () => {
    it('calculates for a 3kg cat', () => {
      const result = calculateCatHydration({
        weightKg: 3,
        dailyDryFoodGrams: 40,
        dailyWetFoodGrams: 0,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.totalDailyMl).toBe(150);
    });

    it('calculates for a 6kg cat', () => {
      const result = calculateCatHydration({
        weightKg: 6,
        dailyDryFoodGrams: 0,
        dailyWetFoodGrams: 200,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.totalDailyMl).toBe(300);
      // fromFood = 200 * 0.8 = 160, extra = 140
      expect(result.data.extraWaterNeededMl).toBe(140);
    });
  });

  describe('error handling', () => {
    it('returns error for weight <= 0', () => {
      const result = calculateCatHydration({
        weightKg: 0,
        dailyDryFoodGrams: 30,
        dailyWetFoodGrams: 50,
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_WEIGHT');
    });

    it('returns error for negative food amounts', () => {
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: -10,
        dailyWetFoodGrams: 50,
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_FOOD_AMOUNT');
    });

    it('returns error for zero total food', () => {
      const result = calculateCatHydration({
        weightKg: 4,
        dailyDryFoodGrams: 0,
        dailyWetFoodGrams: 0,
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('NO_FOOD_INPUT');
    });
  });

  describe('precision', () => {
    it('rounds values to integers', () => {
      const result = calculateCatHydration({
        weightKg: 4.5,
        dailyDryFoodGrams: 33,
        dailyWetFoodGrams: 85,
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // total = 4.5 * 50 = 225
      // fromFood = 33*0.1 + 85*0.8 = 3.3 + 68 = 71.3 -> 71
      // extra = 225 - 71 = 154
      expect(result.data.totalDailyMl).toBe(225);
      expect(result.data.fromFoodMl).toBe(71);
      expect(result.data.extraWaterNeededMl).toBe(154);
    });
  });
});
