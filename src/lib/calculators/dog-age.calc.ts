// Phase 4 — T4.1: 狗年龄计算器
// 公式来源: AKC / AAHA 体型分组非线性系数换算
// 参考: UCSD 2020 甲基化研究 (Labrador-specific formula not directly applied here)

import type { Result } from '@/types/common.types';
import type { SizeClass } from '@/types/profile.types';

export type DogAgeInput = {
  actualAgeYears: number;
  sizeClass: SizeClass;
};

export type DogLifeStage =
  | 'puppy'
  | 'junior'
  | 'adult'
  | 'mature'
  | 'senior'
  | 'geriatric';

export type DogAgeResult = {
  humanAgeEquivalent: number;
  lifeStage: DogLifeStage;
  lifeStageDescription: string;
  formulaSource: string;
};

// 各体型第一年等效人类年龄
const FIRST_YEAR_EQUIVALENT: Record<SizeClass, number> = {
  small: 15,
  medium: 15,
  large: 15,
  giant: 14,
};

// 各体型第二年增量（累计）
const SECOND_YEAR_INCREMENT: Record<SizeClass, number> = {
  small: 9,
  medium: 9,
  large: 9,
  giant: 8,
};

// 各体型后续每年增量
const SUBSEQUENT_YEAR_INCREMENT: Record<SizeClass, number> = {
  small: 4,
  medium: 5.5,
  large: 6,
  giant: 9,
};

// 各体型生命阶段阈值（实际年龄，单位：年）
interface LifeStageRange {
  stage: DogLifeStage;
  maxYears: number;
  description: string;
}

const LIFE_STAGE_RANGES: Record<SizeClass, LifeStageRange[]> = {
  small: [
    { stage: 'puppy', maxYears: 1, description: 'Puppy — rapid growth and socialization period' },
    { stage: 'junior', maxYears: 2, description: 'Junior — still maturing emotionally and physically' },
    { stage: 'adult', maxYears: 7, description: 'Adult — in prime physical condition' },
    { stage: 'mature', maxYears: 10, description: 'Mature — starting to slow down, watch weight' },
    { stage: 'senior', maxYears: 14, description: 'Senior — increased health monitoring recommended' },
    { stage: 'geriatric', maxYears: Infinity, description: 'Geriatric — requires specialized senior care' },
  ],
  medium: [
    { stage: 'puppy', maxYears: 1, description: 'Puppy — rapid growth and socialization period' },
    { stage: 'junior', maxYears: 2, description: 'Junior — still maturing emotionally and physically' },
    { stage: 'adult', maxYears: 6, description: 'Adult — in prime physical condition' },
    { stage: 'mature', maxYears: 9, description: 'Mature — starting to slow down, watch weight' },
    { stage: 'senior', maxYears: 12, description: 'Senior — increased health monitoring recommended' },
    { stage: 'geriatric', maxYears: Infinity, description: 'Geriatric — requires specialized senior care' },
  ],
  large: [
    { stage: 'puppy', maxYears: 1.5, description: 'Puppy — extended growth period for large breeds' },
    { stage: 'junior', maxYears: 2, description: 'Junior — nearing physical maturity' },
    { stage: 'adult', maxYears: 5, description: 'Adult — in prime physical condition' },
    { stage: 'mature', maxYears: 8, description: 'Mature — joint care becomes important' },
    { stage: 'senior', maxYears: 10, description: 'Senior — increased health monitoring recommended' },
    { stage: 'geriatric', maxYears: Infinity, description: 'Geriatric — requires specialized senior care' },
  ],
  giant: [
    { stage: 'puppy', maxYears: 2, description: 'Puppy — extended growth period for giant breeds' },
    { stage: 'junior', maxYears: 3, description: 'Junior — still filling out frame' },
    { stage: 'adult', maxYears: 5, description: 'Adult — in prime physical condition' },
    { stage: 'mature', maxYears: 7, description: 'Mature — joint care becomes important' },
    { stage: 'senior', maxYears: 9, description: 'Senior — increased health monitoring recommended' },
    { stage: 'geriatric', maxYears: Infinity, description: 'Geriatric — requires specialized senior care' },
  ],
};

function getLifeStage(sizeClass: SizeClass, ageYears: number): { stage: DogLifeStage; description: string } {
  const ranges = LIFE_STAGE_RANGES[sizeClass];
  for (const range of ranges) {
    if (ageYears <= range.maxYears) {
      return { stage: range.stage, description: range.description };
    }
  }
  return { stage: 'geriatric', description: 'Geriatric — requires specialized senior care' };
}

export function calculateDogAge(input: DogAgeInput): Result<DogAgeResult> {
  if (input.actualAgeYears < 0) {
    return {
      ok: false,
      error: { code: 'INVALID_AGE', details: 'Age must be a non-negative number' },
    };
  }

  const { actualAgeYears, sizeClass } = input;
  let humanAgeEquivalent: number;

  if (actualAgeYears <= 1) {
    humanAgeEquivalent = FIRST_YEAR_EQUIVALENT[sizeClass] * actualAgeYears;
  } else if (actualAgeYears <= 2) {
    humanAgeEquivalent =
      FIRST_YEAR_EQUIVALENT[sizeClass] +
      SECOND_YEAR_INCREMENT[sizeClass] * (actualAgeYears - 1);
  } else {
    humanAgeEquivalent =
      FIRST_YEAR_EQUIVALENT[sizeClass] +
      SECOND_YEAR_INCREMENT[sizeClass] +
      SUBSEQUENT_YEAR_INCREMENT[sizeClass] * (actualAgeYears - 2);
  }

  humanAgeEquivalent = Math.round(humanAgeEquivalent);

  const { stage, description } = getLifeStage(sizeClass, actualAgeYears);

  return {
    ok: true,
    data: {
      humanAgeEquivalent,
      lifeStage: stage,
      lifeStageDescription: description,
      formulaSource: 'AKC / AAHA size-class adjusted nonlinear age conversion',
    },
  };
}
