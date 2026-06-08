// Phase 4 — T4.3: 狗卡路里 / MER 计算器
// 公式来源: AAHA 2021 Nutritional Guidelines, AAFCO
// RER = 70 × weightKg^0.75, MER = RER × activityFactor

import type { Result } from '@/types/common.types';
import { ACTIVITY_FACTORS, RER_COEFFICIENT, RER_EXPONENT } from '@/constants/calorie.constants';
import type { ActivityScenario } from '@/constants/calorie.constants';

export type { ActivityScenario };

export type DogCalorieInput = {
  weightKg: number;
  activityScenario: ActivityScenario;
  foodCalorieDensityKcalPerKg?: number;
};

export type DogCalorieResult = {
  rer: number;
  mer: number;
  activityFactor: number;
  dailyFoodGrams: number | null;
};

const VALID_ACTIVITY_SCENARIOS = new Set<string>(Object.keys(ACTIVITY_FACTORS));

export function calculateDogCalorie(input: DogCalorieInput): Result<DogCalorieResult> {
  const { weightKg, activityScenario, foodCalorieDensityKcalPerKg } = input;

  if (weightKg <= 0) {
    return {
      ok: false,
      error: { code: 'INVALID_WEIGHT', details: 'Weight must be a positive number' },
    };
  }

  if (!VALID_ACTIVITY_SCENARIOS.has(activityScenario)) {
    return {
      ok: false,
      error: { code: 'INVALID_SCENARIO', details: `Unknown activity scenario: ${activityScenario}` },
    };
  }

  const activityFactor = ACTIVITY_FACTORS[activityScenario];
  const rer = RER_COEFFICIENT * Math.pow(weightKg, RER_EXPONENT);
  const mer = rer * activityFactor;

  let dailyFoodGrams: number | null = null;
  if (foodCalorieDensityKcalPerKg !== undefined) {
    if (foodCalorieDensityKcalPerKg <= 0) {
      return {
        ok: false,
        error: { code: 'INVALID_CALORIE_DENSITY', details: 'Food calorie density must be a positive number' },
      };
    }
    dailyFoodGrams = (mer / foodCalorieDensityKcalPerKg) * 1000;
  }

  return {
    ok: true,
    data: {
      rer: Math.round(rer * 10) / 10,
      mer: Math.round(mer),
      activityFactor,
      dailyFoodGrams: dailyFoodGrams !== null ? Math.round(dailyFoodGrams) : null,
    },
  };
}
