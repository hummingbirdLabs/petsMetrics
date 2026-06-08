import { describe, it, expect } from 'vitest';
import { calculatePuppyGrowth } from '@/lib/calculators/puppy-growth.calc';

describe('calculatePuppyGrowth', () => {
  describe('small breed', () => {
    it('predicts adult weight for 16-week-old small puppy', () => {
      // 16周 weightRatio=0.50, 当前体重2.5kg -> 成年预测=5kg
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 16,
        currentWeightKg: 2.5,
        sizeClass: 'small',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.predictedAdultWeightKgMin).toBeCloseTo(4.3, 0); // 5 * 0.85 = 4.25
      expect(result.data.predictedAdultWeightKgMax).toBeCloseTo(5.8, 0); // 5 * 1.15 = 5.75
    });

    it('generates correct number of growth curve points', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 12,
        currentWeightKg: 1.5,
        sizeClass: 'small',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.growthCurvePoints).toHaveLength(6); // small has 6 nodes
    });

    it('growth curve final point equals adult weight prediction', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 8,
        currentWeightKg: 1,
        sizeClass: 'small',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const lastPoint = result.data.growthCurvePoints[result.data.growthCurvePoints.length - 1];
      const avg = (result.data.predictedAdultWeightKgMin + result.data.predictedAdultWeightKgMax) / 2;
      expect(lastPoint.weightKg).toBeCloseTo(avg, 0);
    });
  });

  describe('giant breed', () => {
    it('predicts adult weight for 12-week-old giant puppy', () => {
      // 12周 weightRatio=0.20, 当前体重10kg -> 成年预测=50kg
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 12,
        currentWeightKg: 10,
        sizeClass: 'giant',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.predictedAdultWeightKgMin).toBeCloseTo(42.5, 0); // 50 * 0.85
      expect(result.data.predictedAdultWeightKgMax).toBeCloseTo(57.5, 0); // 50 * 1.15
    });

    it('has 8 growth curve points for giant breed', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 16,
        currentWeightKg: 15,
        sizeClass: 'giant',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.growthCurvePoints).toHaveLength(8);
    });
  });

  describe('edge cases', () => {
    it('returns error for negative age', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: -1,
        currentWeightKg: 5,
        sizeClass: 'medium',
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_AGE');
    });

    it('returns error for zero weight', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 8,
        currentWeightKg: 0,
        sizeClass: 'medium',
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_WEIGHT');
    });

    it('handles age at exact node point', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 24,
        currentWeightKg: 7.5,
        sizeClass: 'small',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // weightRatio at 24 weeks = 0.75, predicted = 7.5 / 0.75 = 10kg
      const avg = (result.data.predictedAdultWeightKgMin + result.data.predictedAdultWeightKgMax) / 2;
      expect(avg).toBeCloseTo(10, 0);
    });

    it('handles age below first node', () => {
      const result = calculatePuppyGrowth({
        currentAgeWeeks: 1,
        currentWeightKg: 1,
        sizeClass: 'small',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // uses first node (8 weeks, ratio=0.25), predicted = 1 / 0.25 = 4
      const avg = (result.data.predictedAdultWeightKgMin + result.data.predictedAdultWeightKgMax) / 2;
      expect(avg).toBeCloseTo(4, 0);
    });
  });
});
