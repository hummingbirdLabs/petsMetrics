import { describe, it, expect } from 'vitest';
import { calculateCatAge } from '@/lib/calculators/cat-age.calc';

describe('calculateCatAge', () => {
  describe('kitten stage (0-6 months)', () => {
    it('returns 0 for 0 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 0 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(0);
      expect(result.data.lifeStage).toBe('kitten');
    });

    it('returns 4 for 3 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 3 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(4);
      expect(result.data.lifeStage).toBe('kitten');
    });

    it('returns 10 for 6 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 6 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(10);
      expect(result.data.lifeStage).toBe('kitten');
    });
  });

  describe('junior stage (7-24 months)', () => {
    it('returns 15 for 12 months (1 year)', () => {
      const result = calculateCatAge({ actualAgeMonths: 12 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(15);
      expect(result.data.lifeStage).toBe('junior');
    });

    it('returns 24 for 24 months (2 years)', () => {
      const result = calculateCatAge({ actualAgeMonths: 24 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(24);
      expect(result.data.lifeStage).toBe('junior');
    });

    it('returns 20 for 18 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 18 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9*(0.5) = 19.5 -> rounded 20
      expect(result.data.humanAgeEquivalent).toBe(20);
    });
  });

  describe('prime stage (2-6 years)', () => {
    it('returns 28 for 3 years (36 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 36 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4 = 28
      expect(result.data.humanAgeEquivalent).toBe(28);
      expect(result.data.lifeStage).toBe('prime');
    });

    it('returns 40 for 6 years (72 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 72 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*4 = 40
      expect(result.data.humanAgeEquivalent).toBe(40);
      expect(result.data.lifeStage).toBe('prime');
    });
  });

  describe('mature stage (7-10 years)', () => {
    it('returns 44 for 7 years (84 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 84 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*5 = 44
      expect(result.data.humanAgeEquivalent).toBe(44);
      expect(result.data.lifeStage).toBe('mature');
    });

    it('returns 56 for 10 years (120 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 120 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*8 = 56
      expect(result.data.humanAgeEquivalent).toBe(56);
      expect(result.data.lifeStage).toBe('mature');
    });
  });

  describe('senior stage (11-14 years)', () => {
    it('returns 60 for 11 years (132 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 132 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*9 = 60
      expect(result.data.humanAgeEquivalent).toBe(60);
      expect(result.data.lifeStage).toBe('senior');
    });

    it('returns 72 for 14 years (168 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 168 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*12 = 72
      expect(result.data.humanAgeEquivalent).toBe(72);
      expect(result.data.lifeStage).toBe('senior');
    });
  });

  describe('geriatric stage (15+ years)', () => {
    it('returns 76 for 15 years (180 months)', () => {
      const result = calculateCatAge({ actualAgeMonths: 180 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*13 = 76
      expect(result.data.humanAgeEquivalent).toBe(76);
      expect(result.data.lifeStage).toBe('geriatric');
    });

    it('returns 96 for 20 years', () => {
      const result = calculateCatAge({ actualAgeMonths: 240 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 24 + 4*18 = 96
      expect(result.data.humanAgeEquivalent).toBe(96);
      expect(result.data.lifeStage).toBe('geriatric');
    });
  });

  describe('edge cases', () => {
    it('returns error for negative months', () => {
      const result = calculateCatAge({ actualAgeMonths: -1 });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_AGE');
    });

    it('returns correct stage for boundary at 7 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 7 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('junior');
    });

    it('returns correct stage for boundary at 25 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 25 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('prime');
    });
  });

  describe('recommended checkup frequency', () => {
    it('gives kitten checkup frequency for 3 months', () => {
      const result = calculateCatAge({ actualAgeMonths: 3 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.recommendedCheckupFrequency).toContain('3–4 weeks');
    });

    it('gives annual checkup frequency for prime cats', () => {
      const result = calculateCatAge({ actualAgeMonths: 48 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.recommendedCheckupFrequency).toContain('Annual');
    });

    it('gives biannual checkup frequency for senior cats', () => {
      const result = calculateCatAge({ actualAgeMonths: 144 });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.recommendedCheckupFrequency).toContain('6 months');
    });
  });
});
