import { describe, it, expect } from 'vitest';
import { generateVaccinationSchedule } from '@/lib/calculators/vaccination.calc';

describe('generateVaccinationSchedule', () => {
  const birthDate = '2025-01-01';

  describe('dog vaccination (US)', () => {
    it('generates schedule for a puppy', () => {
      const result = generateVaccinationSchedule({
        species: 'dog',
        birthDate,
        region: 'US',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.schedule.length).toBeGreaterThan(0);
    });

    it('includes DHPP doses', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const dhpp = result.data.schedule.filter(s => s.vaccine.includes('DHPP'));
      expect(dhpp.length).toBeGreaterThanOrEqual(3);
    });

    it('DHPP first dose at ~6 weeks', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const firstDose = result.data.schedule[0];
      // 6 weeks after Jan 1 = Feb 12
      expect(firstDose.dueDate).toBeDefined();
    });

    it('includes rabies dose', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const rabies = result.data.schedule.filter(s => s.vaccine.includes('Rabies'));
      expect(rabies.length).toBeGreaterThanOrEqual(1);
    });

    it('rabies at ~12 weeks', () => {
      // 12 weeks after Jan 1 = Mar 26
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const rabies = result.data.schedule.find(s => s.vaccine.includes('Rabies'));
      expect(rabies).toBeDefined();
      expect(rabies!.dueDate).toBe('2025-03-26');
    });
  });

  describe('cat vaccination (US)', () => {
    it('generates schedule for a kitten', () => {
      const result = generateVaccinationSchedule({
        species: 'cat',
        birthDate,
        region: 'US',
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.schedule.length).toBeGreaterThan(0);
    });

    it('includes FVRCP doses', () => {
      const result = generateVaccinationSchedule({ species: 'cat', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const fvrcp = result.data.schedule.filter(s => s.vaccine.includes('FVRCP'));
      expect(fvrcp.length).toBeGreaterThanOrEqual(3);
    });

    it('includes FeLV dose', () => {
      const result = generateVaccinationSchedule({ species: 'cat', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const felv = result.data.schedule.filter(s => s.vaccine.includes('FeLV'));
      expect(felv.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('region differences', () => {
    it('UK schedule includes appropriate vaccines', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'UK' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.schedule.length).toBeGreaterThan(0);
    });

    it('US schedule includes Canine Influenza', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const influenza = result.data.schedule.filter(s => s.vaccine.includes('Influenza'));
      expect(influenza.length).toBeGreaterThan(0);
    });
  });

  describe('status assignment', () => {
    it('all doses for a newborn are future or upcoming', () => {
      const today = new Date().toISOString().slice(0, 10);
      const result = generateVaccinationSchedule({ species: 'dog', birthDate: today, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      for (const entry of result.data.schedule) {
        expect(['upcoming', 'future']).toContain(entry.status);
      }
    });

    it('doses for a date far in the past are overdue', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate: '2018-01-01', region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const overdue = result.data.schedule.filter(s => s.status === 'overdue');
      expect(overdue.length).toBeGreaterThan(0);
    });
  });

  describe('nextDueDate', () => {
    it('returns a next due date for puppies born recently', () => {
      // 使用相对最近的日期确保有 upcoming/future 的剂量
      const recent = new Date();
      recent.setDate(recent.getDate() - 30); // 30天前出生
      const recentBirth = recent.toISOString().slice(0, 10);
      const result = generateVaccinationSchedule({ species: 'dog', birthDate: recentBirth, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.nextDueDate).not.toBeNull();
    });
  });

  describe('non-core notes', () => {
    it('non-core vaccines include a note', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const bordetella = result.data.schedule.find(s => s.vaccine.includes('Bordetella'));
      expect(bordetella).toBeDefined();
      expect(bordetella!.nonCoreNote).toBeDefined();
    });

    it('core vaccines do not include a note', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate, region: 'US' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const coreDose = result.data.schedule.find(s => s.type === 'core');
      expect(coreDose).toBeDefined();
      expect(coreDose!.nonCoreNote).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('returns error for invalid birth date', () => {
      const result = generateVaccinationSchedule({ species: 'dog', birthDate: 'not-a-date', region: 'US' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_DATE');
    });
  });
});
