// Phase 4 — T4.6: 猫体态评估（BCS）计算器
// BCS 1-9 评分制 (WSAVA Body Condition Score)
// 安全约束: 热量限制不得低于理想体重 RER × 0.8

import type { Result } from '@/types/common.types';
import { RER_COEFFICIENT, RER_EXPONENT } from '@/constants/calorie.constants';

export type CatBCSInput = {
  bcsScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  currentWeightKg: number;
};

export type CatBCSResult = {
  bodyCondition: 'underweight' | 'ideal' | 'overweight' | 'obese';
  idealWeightKgMin: number;
  idealWeightKgMax: number;
  dailyCalorieLimit: number | null;
  weeksToIdealWeight: number | null;
  hepaticLipidosisWarning: boolean;
};

const SAFE_CALORIE_FLOOR_RATIO = 0.8;
const WEEKLY_WEIGHT_LOSS_RATIO = 0.01; // 1% body weight per week safe loss rate

// BCS 映射: score -> [idealBodyWeightMin, idealBodyWeightMax] 乘数 (相对于当前体重)
const BCS_WEIGHT_FACTORS: Record<number, { min: number; max: number }> = {
  1: { min: 1.40, max: 1.50 },
  2: { min: 1.25, max: 1.35 },
  3: { min: 1.10, max: 1.20 },
  4: { min: 1.00, max: 1.00 },
  5: { min: 1.00, max: 1.00 },
  6: { min: 0.90, max: 0.95 },
  7: { min: 0.80, max: 0.85 },
  8: { min: 0.70, max: 0.75 },
  9: { min: 0.60, max: 0.65 },
};

// 减重期的活动系数（减轻 MER）
const WEIGHT_LOSS_FACTOR = 0.8;

function getBodyCondition(bcsScore: number): CatBCSResult['bodyCondition'] {
  if (bcsScore <= 3) return 'underweight';
  if (bcsScore <= 5) return 'ideal';
  if (bcsScore <= 7) return 'overweight';
  return 'obese';
}

export function calculateCatBCS(input: CatBCSInput): Result<CatBCSResult> {
  const { bcsScore, currentWeightKg } = input;

  if (currentWeightKg <= 0) {
    return { ok: false, error: { code: 'INVALID_WEIGHT', details: 'Weight must be positive' } };
  }

  if (bcsScore < 1 || bcsScore > 9) {
    return { ok: false, error: { code: 'INVALID_BCS', details: 'BCS score must be between 1 and 9' } };
  }

  const factors = BCS_WEIGHT_FACTORS[bcsScore];
  const idealWeightKgMin = Math.round(currentWeightKg * factors.min * 100) / 100;
  const idealWeightKgMax = Math.round(currentWeightKg * factors.max * 100) / 100;
  const bodyCondition = getBodyCondition(bcsScore);

  // 热量建议仅当超重或肥胖时
  let dailyCalorieLimit: number | null = null;
  let weeksToIdealWeight: number | null = null;
  let hepaticLipidosisWarning = false;

  if (bodyCondition === 'overweight' || bodyCondition === 'obese') {
    // 用理想体重中点计算 RER
    const idealWeightMid = (idealWeightKgMin + idealWeightKgMax) / 2;
    const idealRER = RER_COEFFICIENT * Math.pow(idealWeightMid, RER_EXPONENT);
    const safeFloor = Math.round(idealRER * SAFE_CALORIE_FLOOR_RATIO);

    dailyCalorieLimit = Math.round(idealRER * WEIGHT_LOSS_FACTOR);

    // 检查肝脂肪沉积症安全边界
    if (dailyCalorieLimit < safeFloor) {
      hepaticLipidosisWarning = true;
      dailyCalorieLimit = safeFloor;
    }

    // 预计达到理想体重所需周数
    const totalWeightToLose = currentWeightKg - idealWeightMid;
    if (totalWeightToLose > 0) {
      const weeklyLoss = currentWeightKg * WEEKLY_WEIGHT_LOSS_RATIO;
      weeksToIdealWeight = Math.ceil(totalWeightToLose / weeklyLoss);
    }
  }

  return {
    ok: true,
    data: {
      bodyCondition,
      idealWeightKgMin,
      idealWeightKgMax,
      dailyCalorieLimit,
      weeksToIdealWeight,
      hepaticLipidosisWarning,
    },
  };
}
