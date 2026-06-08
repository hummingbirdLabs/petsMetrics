// Phase 3 — T3.4: 幼犬生长曲线数据
// 按体型分 4 组: small / medium / large / giant
// 数据来源: 兽医生长标准参考 (Waltham Puppy Growth Charts, UC Davis, AKC breed standards)

import type { SizeClass } from '@/types/profile.types';

export type GrowthCurve = {
  sizeClass: SizeClass;
  maturityAgeWeeks: number;
  maturityAgeLabel: string;
  adultWeightCoefficient: number;
  growthNodes: {
    ageWeeks: number;
    ageLabel: string;
    weightRatio: number; // 该周龄体重 ÷ 成年体重
  }[];
};

export const PUPPY_GROWTH_CURVES: readonly GrowthCurve[] = [
  {
    sizeClass: 'small',
    maturityAgeWeeks: 52,
    maturityAgeLabel: '10–12 months',
    adultWeightCoefficient: 1.0,
    growthNodes: [
      { ageWeeks: 8, ageLabel: '8 weeks', weightRatio: 0.25 },
      { ageWeeks: 12, ageLabel: '12 weeks', weightRatio: 0.36 },
      { ageWeeks: 16, ageLabel: '16 weeks (4 mo)', weightRatio: 0.50 },
      { ageWeeks: 24, ageLabel: '24 weeks (6 mo)', weightRatio: 0.75 },
      { ageWeeks: 36, ageLabel: '36 weeks (9 mo)', weightRatio: 0.90 },
      { ageWeeks: 52, ageLabel: '52 weeks (12 mo)', weightRatio: 1.00 },
    ],
  },
  {
    sizeClass: 'medium',
    maturityAgeWeeks: 65,
    maturityAgeLabel: '12–15 months',
    adultWeightCoefficient: 1.0,
    growthNodes: [
      { ageWeeks: 8, ageLabel: '8 weeks', weightRatio: 0.20 },
      { ageWeeks: 12, ageLabel: '12 weeks', weightRatio: 0.30 },
      { ageWeeks: 16, ageLabel: '16 weeks (4 mo)', weightRatio: 0.42 },
      { ageWeeks: 24, ageLabel: '24 weeks (6 mo)', weightRatio: 0.65 },
      { ageWeeks: 36, ageLabel: '36 weeks (9 mo)', weightRatio: 0.82 },
      { ageWeeks: 52, ageLabel: '52 weeks (12 mo)', weightRatio: 0.95 },
      { ageWeeks: 65, ageLabel: '65 weeks (15 mo)', weightRatio: 1.00 },
    ],
  },
  {
    sizeClass: 'large',
    maturityAgeWeeks: 78,
    maturityAgeLabel: '15–18 months',
    adultWeightCoefficient: 1.0,
    growthNodes: [
      { ageWeeks: 8, ageLabel: '8 weeks', weightRatio: 0.16 },
      { ageWeeks: 12, ageLabel: '12 weeks', weightRatio: 0.24 },
      { ageWeeks: 16, ageLabel: '16 weeks (4 mo)', weightRatio: 0.36 },
      { ageWeeks: 24, ageLabel: '24 weeks (6 mo)', weightRatio: 0.55 },
      { ageWeeks: 36, ageLabel: '36 weeks (9 mo)', weightRatio: 0.72 },
      { ageWeeks: 52, ageLabel: '52 weeks (12 mo)', weightRatio: 0.85 },
      { ageWeeks: 65, ageLabel: '65 weeks (15 mo)', weightRatio: 0.95 },
      { ageWeeks: 78, ageLabel: '78 weeks (18 mo)', weightRatio: 1.00 },
    ],
  },
  {
    sizeClass: 'giant',
    maturityAgeWeeks: 104,
    maturityAgeLabel: '18–24 months',
    adultWeightCoefficient: 1.0,
    growthNodes: [
      { ageWeeks: 8, ageLabel: '8 weeks', weightRatio: 0.13 },
      { ageWeeks: 12, ageLabel: '12 weeks', weightRatio: 0.20 },
      { ageWeeks: 16, ageLabel: '16 weeks (4 mo)', weightRatio: 0.30 },
      { ageWeeks: 24, ageLabel: '24 weeks (6 mo)', weightRatio: 0.45 },
      { ageWeeks: 36, ageLabel: '36 weeks (9 mo)', weightRatio: 0.62 },
      { ageWeeks: 52, ageLabel: '52 weeks (12 mo)', weightRatio: 0.75 },
      { ageWeeks: 78, ageLabel: '78 weeks (18 mo)', weightRatio: 0.90 },
      { ageWeeks: 104, ageLabel: '104 weeks (24 mo)', weightRatio: 1.00 },
    ],
  },
];
