// Phase 4 — T4.3: 卡路里计算器常量
// 数据来源: AAHA 2021 Nutritional Guidelines, AAFCO

export type ActivityScenario =
  | 'puppy_under_4m'
  | 'puppy_over_4m'
  | 'neutered_adult'
  | 'intact_adult'
  | 'weight_loss'
  | 'working_dog';

export const ACTIVITY_FACTORS: Record<ActivityScenario, number> = {
  puppy_under_4m: 3.0,
  puppy_over_4m: 2.0,
  neutered_adult: 1.4,
  intact_adult: 1.6,
  weight_loss: 1.0,
  working_dog: 5.0,
} as const;

export const RER_EXPONENT = 0.75;
export const RER_COEFFICIENT = 70;
