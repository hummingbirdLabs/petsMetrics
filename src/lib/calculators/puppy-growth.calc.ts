// Phase 4 — T4.5: 幼犬成年体重预测器
// 使用 Phase 3 puppy-growth-curves.ts 数据
// 通过当前年龄/体重和生长曲线插值预测成年体重

import type { Result } from '@/types/common.types';
import type { SizeClass } from '@/types/profile.types';
import { PUPPY_GROWTH_CURVES } from '@/lib/data/puppy-growth-curves';
import type { GrowthCurve } from '@/lib/data/puppy-growth-curves';

export type PuppyGrowthInput = {
  currentAgeWeeks: number;
  currentWeightKg: number;
  sizeClass: SizeClass;
};

export type PuppyGrowthResult = {
  predictedAdultWeightKgMin: number;
  predictedAdultWeightKgMax: number;
  growthCurvePoints: { ageWeeks: number; weightKg: number }[];
  /** 当前体重与预测成年体重中点的比例（1.0 = 正中，<1 = 偏轻，>1 = 偏重）。
   *  注意：此值基于自身体重反推，不含品种群体百分位数据。 */
  weightToPredictedRatio: number;
};

const PREDICTION_VARIANCE = 0.15; // ±15% 预测容差

function getClosestNodes(curve: GrowthCurve, ageWeeks: number) {
  const nodes = curve.growthNodes;
  if (nodes.length === 0) return null;
  if (ageWeeks <= nodes[0].ageWeeks) return { lower: nodes[0], upper: nodes[0] };
  if (ageWeeks >= nodes[nodes.length - 1].ageWeeks)
    return { lower: nodes[nodes.length - 1], upper: nodes[nodes.length - 1] };

  for (let i = 0; i < nodes.length - 1; i++) {
    if (ageWeeks >= nodes[i].ageWeeks && ageWeeks <= nodes[i + 1].ageWeeks) {
      return { lower: nodes[i], upper: nodes[i + 1] };
    }
  }
  return null;
}

export function calculatePuppyGrowth(input: PuppyGrowthInput): Result<PuppyGrowthResult> {
  const { currentAgeWeeks, currentWeightKg, sizeClass } = input;

  if (currentAgeWeeks < 0) {
    return { ok: false, error: { code: 'INVALID_AGE', details: 'Age must be non-negative' } };
  }

  if (currentWeightKg <= 0) {
    return { ok: false, error: { code: 'INVALID_WEIGHT', details: 'Weight must be positive' } };
  }

  const curve = PUPPY_GROWTH_CURVES.find(c => c.sizeClass === sizeClass);
  if (!curve) {
    return { ok: false, error: { code: 'NO_CURVE_DATA', details: `No growth curve for size class: ${sizeClass}` } };
  }

  const nodes = getClosestNodes(curve, currentAgeWeeks);
  if (!nodes) {
    return { ok: false, error: { code: 'NO_CURVE_DATA', details: 'Could not interpolate growth curve' } };
  }

  // 插值当前周龄对应的 weightRatio
  let currentRatio: number;
  if (nodes.lower.ageWeeks === nodes.upper.ageWeeks) {
    currentRatio = nodes.lower.weightRatio;
  } else {
    const fraction =
      (currentAgeWeeks - nodes.lower.ageWeeks) / (nodes.upper.ageWeeks - nodes.lower.ageWeeks);
    currentRatio = nodes.lower.weightRatio + fraction * (nodes.upper.weightRatio - nodes.lower.weightRatio);
  }

  // 预测成年体重 = currentWeight / currentRatio
  const predictedAdultWeightKg = currentWeightKg / currentRatio;
  const predictedAdultWeightKgMin = Math.round(predictedAdultWeightKg * (1 - PREDICTION_VARIANCE) * 10) / 10;
  const predictedAdultWeightKgMax = Math.round(predictedAdultWeightKg * (1 + PREDICTION_VARIANCE) * 10) / 10;

  // 生成完整生长曲线点（基于预测成年体重）
  const growthCurvePoints = curve.growthNodes.map(n => ({
    ageWeeks: n.ageWeeks,
    weightKg: Math.round(predictedAdultWeightKg * n.weightRatio * 100) / 100,
  }));

  // 当前体重相对于预测成年体重中点的比例
  const predictedMid = (predictedAdultWeightKgMin + predictedAdultWeightKgMax) / 2;
  const weightToPredictedRatio = Math.round((currentWeightKg / (predictedMid * currentRatio)) * 100) / 100;

  return {
    ok: true,
    data: {
      predictedAdultWeightKgMin,
      predictedAdultWeightKgMax,
      growthCurvePoints,
      weightToPredictedRatio,
    },
  };
}
