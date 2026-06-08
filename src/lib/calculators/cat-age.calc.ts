// Phase 4 — T4.2: 猫年龄计算器
// 数据来源: AAHA/AAFP 2021 Feline Life Stage Guidelines

import type { Result } from '@/types/common.types';

export type CatAgeInput = { actualAgeMonths: number };

export type CatLifeStage =
  | 'kitten'
  | 'junior'
  | 'prime'
  | 'mature'
  | 'senior'
  | 'geriatric';

export type CatAgeResult = {
  humanAgeEquivalent: number;
  lifeStage: CatLifeStage;
  recommendedCheckupFrequency: string;
};

const MONTHS_PER_YEAR = 12;

interface LifeStageInfo {
  stage: CatLifeStage;
  maxMonths: number;
  checkupFrequency: string;
}

const LIFE_STAGE_RANGES: LifeStageInfo[] = [
  { stage: 'kitten', maxMonths: 6, checkupFrequency: 'Every 3–4 weeks until 16 weeks of age' },
  { stage: 'junior', maxMonths: 24, checkupFrequency: 'Annual wellness exam' },
  { stage: 'prime', maxMonths: 72, checkupFrequency: 'Annual wellness exam' },
  { stage: 'mature', maxMonths: 120, checkupFrequency: 'Every 6 months (biannual senior screening)' },
  { stage: 'senior', maxMonths: 168, checkupFrequency: 'Every 6 months (biannual senior screening)' },
  { stage: 'geriatric', maxMonths: Infinity, checkupFrequency: 'Every 3–4 months (quarterly geriatric monitoring)' },
];

function getLifeStage(ageMonths: number): { stage: CatLifeStage; checkupFrequency: string } {
  for (const range of LIFE_STAGE_RANGES) {
    if (ageMonths <= range.maxMonths) {
      return { stage: range.stage, checkupFrequency: range.checkupFrequency };
    }
  }
  return { stage: 'geriatric', checkupFrequency: 'Every 3–4 months (quarterly geriatric monitoring)' };
}

// 猫年龄到人类年龄的映射
// Kitten (0-6 months): 非线性加速发育
// 1年 = 15人类年, 2年 = 24人类年, 3年+ 每年+4人类年
function catMonthsToHumanYears(ageMonths: number): number {
  if (ageMonths <= 0) {
    return 0;
  }

  const ageYears = ageMonths / MONTHS_PER_YEAR;

  if (ageYears <= 1) {
    // 第一年: 0-6个月非线性加速, 7-12个月线性插值从10到15
    if (ageMonths <= 1) return Math.round(ageMonths * 1);
    if (ageMonths <= 2) return 2;
    if (ageMonths <= 3) return 4;
    if (ageMonths <= 4) return 6;
    if (ageMonths <= 5) return 8;
    if (ageMonths <= 6) return 10;
    // 7–12个月: 线性从10增长到15（斜率 = 5/6 ≈ 0.833/月）
    return Math.round(10 + (ageMonths - 6) * (5 / 6));
  }

  if (ageYears <= 2) {
    // 第二年: 从15线性增长到24
    // ageYears 在 1-2 之间
    const fraction = ageYears - 1;
    return Math.round(15 + 9 * fraction);
  }

  // 2岁以上: 每年+4人类年
  return Math.round(24 + 4 * (ageYears - 2));
}

export function calculateCatAge(input: CatAgeInput): Result<CatAgeResult> {
  if (input.actualAgeMonths < 0) {
    return {
      ok: false,
      error: { code: 'INVALID_AGE', details: 'Age must be a non-negative number of months' },
    };
  }

  const humanAgeEquivalent = catMonthsToHumanYears(input.actualAgeMonths);
  const { stage, checkupFrequency } = getLifeStage(input.actualAgeMonths);

  return {
    ok: true,
    data: {
      humanAgeEquivalent,
      lifeStage: stage,
      recommendedCheckupFrequency: checkupFrequency,
    },
  };
}
