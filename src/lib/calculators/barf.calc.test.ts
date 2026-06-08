import { describe, it, expect } from 'vitest';
import { calculateBARF } from '@/lib/calculators/barf.calc';

describe('calculateBARF', () => {
  describe('Dog BARF', () => {
    it('10kg dog at 2.5% daily', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 10, dailyFeedingPercentage: 0.025 });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // 10kg × 1000 × 0.025 = 250g total
      expect(r.data.muscleMeatG).toBe(175); // 250 * 0.70
      expect(r.data.rawMeatyBoneG).toBe(25); // 250 * 0.10
      expect(r.data.liverG).toBe(13); // 250 * 0.05 = 12.5 → 13
      expect(r.data.secretingOrganG).toBe(13); // 250 * 0.05 = 12.5 → 13
      expect(r.data.vegetablesG).toBe(25); // 250 * 0.10
      expect(r.data.totalG).toBe(251);
    });

    it('20kg dog at 2% daily', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 20, dailyFeedingPercentage: 0.02 });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // 20kg × 1000 × 0.02 = 400g total
      expect(r.data.muscleMeatG).toBe(280);
      expect(r.data.rawMeatyBoneG).toBe(40);
      expect(r.data.totalG).toBe(400);
    });

    it('5kg dog at 3% daily', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 5, dailyFeedingPercentage: 0.03 });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      expect(r.data.totalG).toBe(151); // 105+15+8+8+15=151 due to rounding
    });
  });

  describe('Cat BARF', () => {
    it('4kg cat at 2.5% daily', () => {
      const r = calculateBARF({ species: 'cat', targetWeightKg: 4, dailyFeedingPercentage: 0.025 });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // 4kg × 1000 × 0.025 = 100g total
      expect(r.data.muscleMeatG).toBe(75); // 100 * 0.75
      expect(r.data.rawMeatyBoneG).toBe(10); // 100 * 0.10
      expect(r.data.liverG).toBe(5); // 100 * 0.05
      expect(r.data.secretingOrganG).toBe(10); // 100 * 0.10
      expect(r.data.vegetablesG).toBeNull();
      expect(r.data.totalG).toBe(100);
    });

    it('cat has no vegetables', () => {
      const r = calculateBARF({ species: 'cat', targetWeightKg: 5, dailyFeedingPercentage: 0.03 });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      expect(r.data.vegetablesG).toBeNull();
    });
  });

  describe('error cases', () => {
    it('rejects zero weight', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 0, dailyFeedingPercentage: 0.025 });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('INVALID_WEIGHT');
    });

    it('rejects negative weight', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: -5, dailyFeedingPercentage: 0.025 });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('INVALID_WEIGHT');
    });

    it('rejects negative percentage', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 10, dailyFeedingPercentage: -0.01 });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('INVALID_PERCENTAGE');
    });

    it('rejects percentage over 10%', () => {
      const r = calculateBARF({ species: 'dog', targetWeightKg: 10, dailyFeedingPercentage: 0.15 });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('INVALID_PERCENTAGE');
    });
  });
});
