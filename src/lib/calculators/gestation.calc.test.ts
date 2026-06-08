import { describe, it, expect } from 'vitest';
import { calculateGestation } from '@/lib/calculators/gestation.calc';

describe('calculateGestation', () => {
  const matingDate = '2025-01-01';

  describe('dog gestation', () => {
    it('calculates due dates for a single mating date', () => {
      const result = calculateGestation({ species: 'dog', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // min=58: Jan1 + 58 = Feb28, avg=63: Jan1 + 63 = Mar5, max=68: Jan1 + 68 = Mar10
      expect(result.data.earliestDate).toBe('2025-02-28');
      expect(result.data.likelyDate).toBe('2025-03-05');
      expect(result.data.latestDate).toBe('2025-03-10');
    });

    it('includes all milestones', () => {
      const result = calculateGestation({ species: 'dog', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.milestones).toHaveLength(5);
    });

    it('milestone at day 28 falls on correct date', () => {
      const result = calculateGestation({ species: 'dog', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const ultra = result.data.milestones.find(m => m.dayOffset === 28);
      expect(ultra).toBeDefined();
      expect(ultra!.date).toBe('2025-01-29');
    });

    it('milestone at day 55 falls on correct date', () => {
      const result = calculateGestation({ species: 'dog', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const nesting = result.data.milestones.find(m => m.dayOffset === 55);
      expect(nesting).toBeDefined();
      expect(nesting!.date).toBe('2025-02-25');
    });
  });

  describe('cat gestation', () => {
    it('calculates due dates for a single mating date', () => {
      const result = calculateGestation({ species: 'cat', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // min=63: Jan1 + 63 = Mar5, avg=65: Jan1 + 65 = Mar7, max=67: Jan1 + 67 = Mar9
      expect(result.data.earliestDate).toBe('2025-03-05');
      expect(result.data.likelyDate).toBe('2025-03-07');
      expect(result.data.latestDate).toBe('2025-03-09');
    });

    it('includes all milestones', () => {
      const result = calculateGestation({ species: 'cat', matingDates: [matingDate] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.milestones).toHaveLength(6);
    });
  });

  describe('multiple mating dates', () => {
    it('uses the average of all mating dates', () => {
      const result = calculateGestation({
        species: 'dog',
        matingDates: ['2025-01-05', '2025-01-03', '2025-01-07'],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // average = (Jan3 + Jan5 + Jan7) / 3 = Jan5, avg=63 -> Mar9
      expect(result.data.likelyDate).toBe('2025-03-09');
    });
  });

  describe('edge cases', () => {
    it('handles year boundary', () => {
      const result = calculateGestation({ species: 'dog', matingDates: ['2025-12-01'] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // avg=63 -> Feb 2 2026
      expect(result.data.likelyDate).toBe('2026-02-02');
    });

    it('handles leap year', () => {
      // 2024 is a leap year
      const result = calculateGestation({ species: 'dog', matingDates: ['2024-02-01'] });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // avg=63 -> Mar+31d from Feb1 = Apr4 (Feb has 29 days in 2024)
      expect(result.data.likelyDate).toBe('2024-04-04');
    });
  });

  describe('error handling', () => {
    it('returns error for empty matingDates array', () => {
      const result = calculateGestation({ species: 'dog', matingDates: [] });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('NO_MATING_DATES');
    });

    it('returns error for invalid date format', () => {
      const result = calculateGestation({ species: 'dog', matingDates: ['not-a-date'] });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_DATE_FORMAT');
    });

    it('returns error for invalid date value', () => {
      const result = calculateGestation({ species: 'dog', matingDates: ['2025-13-01'] });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_DATE_FORMAT');
    });
  });
});
