// Phase 4 — T4.7: 猫饮水量计算器
// 公式: totalDaily = weightKg × 50 ml
// fromFood = (dryFoodG × 0.1) + (wetFoodG × 0.8)
// extraNeeded = totalDaily - fromFood

import type { Result } from '@/types/common.types';

export type CatHydrationInput = {
  weightKg: number;
  dailyDryFoodGrams: number;
  dailyWetFoodGrams: number;
};

export type CatHydrationResult = {
  totalDailyMl: number;
  fromFoodMl: number;
  extraWaterNeededMl: number;
  hydrationStatus: 'adequate' | 'slightly_low' | 'low';
};

const ML_PER_KG = 50;
const DRY_FOOD_MOISTURE = 0.1;
const WET_FOOD_MOISTURE = 0.8;

const ADEQUATE_THRESHOLD = 0; // extraWaterNeeded <= 0 means adequate
const SLIGHTLY_LOW_THRESHOLD = 20; // extraWaterNeeded > 0 and <= 20

export function calculateCatHydration(input: CatHydrationInput): Result<CatHydrationResult> {
  const { weightKg, dailyDryFoodGrams, dailyWetFoodGrams } = input;

  if (weightKg <= 0) {
    return { ok: false, error: { code: 'INVALID_WEIGHT', details: 'Weight must be positive' } };
  }

  if (dailyDryFoodGrams < 0 || dailyWetFoodGrams < 0) {
    return {
      ok: false,
      error: { code: 'INVALID_FOOD_AMOUNT', details: 'Food amounts must be non-negative' },
    };
  }

  if (dailyDryFoodGrams === 0 && dailyWetFoodGrams === 0) {
    return {
      ok: false,
      error: { code: 'NO_FOOD_INPUT', details: 'At least one food type amount must be provided' },
    };
  }

  const totalDailyMl = Math.round(weightKg * ML_PER_KG);
  const fromFoodMl = Math.round(dailyDryFoodGrams * DRY_FOOD_MOISTURE + dailyWetFoodGrams * WET_FOOD_MOISTURE);
  const extraWaterNeededMl = Math.max(0, totalDailyMl - fromFoodMl);

  let hydrationStatus: CatHydrationResult['hydrationStatus'];
  if (extraWaterNeededMl <= ADEQUATE_THRESHOLD) {
    hydrationStatus = 'adequate';
  } else if (extraWaterNeededMl <= SLIGHTLY_LOW_THRESHOLD) {
    hydrationStatus = 'slightly_low';
  } else {
    hydrationStatus = 'low';
  }

  return {
    ok: true,
    data: { totalDailyMl, fromFoodMl, extraWaterNeededMl, hydrationStatus },
  };
}
