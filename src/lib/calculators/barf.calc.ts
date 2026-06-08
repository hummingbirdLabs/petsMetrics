// Phase 8 — T8.1: BARF 生食计算器
// 科学配比: README.MD §7.1, NRC犬猫营养学

import type { Result } from '@/types/common.types';
import { BARF_RATIOS } from '@/lib/data/barf-data';

export type BARFInput = {
  species: 'dog' | 'cat';
  targetWeightKg: number;
  dailyFeedingPercentage: number; // 通常 0.02–0.03
};

export type BARFResult = {
  muscleMeatG: number;
  rawMeatyBoneG: number;
  liverG: number;
  secretingOrganG: number;
  vegetablesG: number | null; // 猫咪为 null
  totalG: number;
};

export function calculateBARF(input: BARFInput): Result<BARFResult> {
  const { species, targetWeightKg, dailyFeedingPercentage } = input;

  if (targetWeightKg <= 0) {
    return { ok: false, error: { code: 'INVALID_WEIGHT', details: 'Target weight must be positive' } };
  }

  if (dailyFeedingPercentage <= 0 || dailyFeedingPercentage > 0.1) {
    return {
      ok: false,
      error: { code: 'INVALID_PERCENTAGE', details: 'Daily feeding percentage must be between 0 and 10%' },
    };
  }

  const ratios = BARF_RATIOS[species];
  const totalFoodG = targetWeightKg * 1000 * dailyFeedingPercentage;

  const muscleMeatG = Math.round(totalFoodG * ratios.muscleMeat);
  const rawMeatyBoneG = Math.round(totalFoodG * ratios.rawMeatyBone);
  const liverG = Math.round(totalFoodG * ratios.liver);
  const secretingOrganG = Math.round(totalFoodG * ratios.secretingOrgan);
  const vegetablesG = ratios.vegetables !== null ? Math.round(totalFoodG * ratios.vegetables) : null;

  const totalG = muscleMeatG + rawMeatyBoneG + liverG + secretingOrganG + (vegetablesG ?? 0);

  return {
    ok: true,
    data: {
      muscleMeatG,
      rawMeatyBoneG,
      liverG,
      secretingOrganG,
      vegetablesG,
      totalG,
    },
  };
}
