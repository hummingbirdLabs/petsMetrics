import { describe, it, expect } from 'vitest';
import { calculateDogAge } from '@/lib/calculators/dog-age.calc';

describe('calculateDogAge', () => {
  describe('small size (<10kg)', () => {
    it('calculates human equivalent for a 1-year-old small dog', () => {
      const result = calculateDogAge({ actualAgeYears: 1, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(15);
    });

    it('calculates human equivalent for a 2-year-old small dog', () => {
      const result = calculateDogAge({ actualAgeYears: 2, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(24);
    });

    it('calculates human equivalent for a 5-year-old small dog', () => {
      const result = calculateDogAge({ actualAgeYears: 5, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9 + 4*3 = 36
      expect(result.data.humanAgeEquivalent).toBe(36);
    });

    it('returns geriatric for a 15-year-old small dog', () => {
      const result = calculateDogAge({ actualAgeYears: 15, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9 + 4*13 = 76
      expect(result.data.humanAgeEquivalent).toBe(76);
      expect(result.data.lifeStage).toBe('geriatric');
    });
  });

  describe('medium size (10-25kg)', () => {
    it('calculates human equivalent for a 1-year-old medium dog', () => {
      const result = calculateDogAge({ actualAgeYears: 1, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(15);
    });

    it('calculates human equivalent for a 2-year-old medium dog', () => {
      const result = calculateDogAge({ actualAgeYears: 2, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(24);
    });

    it('calculates human equivalent for a 7-year-old medium dog', () => {
      const result = calculateDogAge({ actualAgeYears: 7, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9 + 5.5*5 = 51.5 -> rounded 52
      expect(result.data.humanAgeEquivalent).toBe(52);
    });
  });

  describe('large size (25-45kg)', () => {
    it('calculates human equivalent for a 5-year-old large dog', () => {
      const result = calculateDogAge({ actualAgeYears: 5, sizeClass: 'large' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9 + 6*3 = 42
      expect(result.data.humanAgeEquivalent).toBe(42);
    });

    it('returns senior for a 9-year-old large dog', () => {
      const result = calculateDogAge({ actualAgeYears: 9, sizeClass: 'large' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('senior');
    });
  });

  describe('giant size (>45kg)', () => {
    it('calculates human equivalent for a 4-year-old giant dog', () => {
      const result = calculateDogAge({ actualAgeYears: 4, sizeClass: 'giant' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 14 + 8 + 9*2 = 40
      expect(result.data.humanAgeEquivalent).toBe(40);
    });

    it('returns senior for a 8-year-old giant dog', () => {
      const result = calculateDogAge({ actualAgeYears: 8, sizeClass: 'giant' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 14 + 8 + 9*6 = 76
      expect(result.data.humanAgeEquivalent).toBe(76);
      expect(result.data.lifeStage).toBe('senior');
    });
  });

  describe('edge cases', () => {
    it('returns humanAgeEquivalent 0 for age 0', () => {
      const result = calculateDogAge({ actualAgeYears: 0, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(0);
      expect(result.data.lifeStage).toBe('puppy');
    });

    it('returns error for negative age', () => {
      const result = calculateDogAge({ actualAgeYears: -1, sizeClass: 'medium' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_AGE');
    });

    it('handles extremely high age gracefully', () => {
      const result = calculateDogAge({ actualAgeYears: 30, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9 + 4*28 = 136
      expect(result.data.humanAgeEquivalent).toBe(136);
      expect(result.data.lifeStage).toBe('geriatric');
    });

    it('handles age between 0 and 1', () => {
      const result = calculateDogAge({ actualAgeYears: 0.5, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.humanAgeEquivalent).toBe(8); // 15 * 0.5 = 7.5 rounded
      expect(result.data.lifeStage).toBe('puppy');
    });

    it('handles age between 1 and 2', () => {
      const result = calculateDogAge({ actualAgeYears: 1.5, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // 15 + 9*0.5 = 19.5 -> 20
      expect(result.data.humanAgeEquivalent).toBe(20);
    });
  });

  describe('lifeStage assignments', () => {
    it('assigns puppy for small dog <= 1 year', () => {
      const result = calculateDogAge({ actualAgeYears: 0.75, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('puppy');
    });

    it('assigns junior for medium dog at 1.5 years', () => {
      const result = calculateDogAge({ actualAgeYears: 1.5, sizeClass: 'medium' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('junior');
    });

    it('assigns adult for large dog at 3 years', () => {
      const result = calculateDogAge({ actualAgeYears: 3, sizeClass: 'large' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('adult');
    });

    it('assigns mature for small dog at 8 years', () => {
      const result = calculateDogAge({ actualAgeYears: 8, sizeClass: 'small' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('mature');
    });

    it('assigns geriatric for giant dog at 10 years', () => {
      const result = calculateDogAge({ actualAgeYears: 10, sizeClass: 'giant' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.lifeStage).toBe('geriatric');
    });
  });
});
