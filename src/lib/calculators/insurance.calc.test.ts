import { describe, it, expect } from 'vitest';
import { calculateInsurance } from '@/lib/calculators/insurance.calc';

describe('calculateInsurance', () => {
  describe('basic estimation', () => {
    it('2yr lab in CA', () => {
      const r = calculateInsurance({ species: 'dog', breed: 'Labrador Retriever', age: 2, region: 'CA' });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // base 45 * breed 1.0 * CA 1.3 * age 1.0 = 58.5
      expect(r.data.monthlyRange.low).toBeGreaterThan(30);
      expect(r.data.monthlyRange.high).toBeLessThan(120);
      expect(r.data.providers).toHaveLength(4);
      expect(r.data.ageWarning).toBeNull();
    });

    it('8yr bulldog in NY', () => {
      const r = calculateInsurance({ species: 'dog', breed: 'Bulldog', age: 8, region: 'NY' });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // base 45 * bulldog 1.5 * NY 1.35 * age 2.0 = 182.25
      expect(r.data.monthlyRange.low).toBeGreaterThan(100);
      expect(r.data.ageWarning).toContain('age 7');
    });

    it('12yr mixed breed in OH', () => {
      const r = calculateInsurance({ species: 'dog', breed: 'Mixed Breed', age: 12, region: 'OH' });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      expect(r.data.ageWarning).toContain('10+');
    });
  });

  describe('cat', () => {
    it('2yr domestic shorthair in TX', () => {
      const r = calculateInsurance({ species: 'cat', breed: 'Domestic Shorthair', age: 2, region: 'TX' });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // base 20 * breed 1.0 * TX 1.05 * age 1.0 = 21
      expect(r.data.monthlyRange.low).toBeGreaterThan(10);
      expect(r.data.monthlyRange.high).toBeLessThan(60);
    });

    it('4yr persian in NY', () => {
      const r = calculateInsurance({ species: 'cat', breed: 'Persian', age: 4, region: 'NY' });
      expect(r.ok).toBe(true);
      if (!r.ok) throw new Error('expected ok');
      // base 20 * persian 1.3 * NY 1.35 * age 1.3 = 45.63
      expect(r.data.monthlyRange.high).toBeGreaterThan(50);
    });
  });

  describe('error cases', () => {
    it('rejects negative age', () => {
      const r = calculateInsurance({ species: 'dog', breed: 'Mixed Breed', age: -1, region: 'CA' });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('INVALID_AGE');
    });

    it('rejects age > 25', () => {
      const r = calculateInsurance({ species: 'cat', breed: 'Domestic Shorthair', age: 30, region: 'CA' });
      expect(r.ok).toBe(false);
      if (r.ok) throw new Error('expected error');
      expect(r.error.code).toBe('AGE_OUT_OF_RANGE');
    });
  });
});
