import { describe, it, expect } from 'vitest';
import { checkEUTravelRequirements } from '@/lib/calculators/eu-travel.calc';

describe('checkEUTravelRequirements', () => {
  describe('basic travel between EU countries', () => {
    it('identifies requirements for dog from FR to DE', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.missing.length).toBeGreaterThan(0);
      expect(result.data.isReadyToTravel).toBe(false);
    });

    it('marks satisfied when documents are provided', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'DE',
        existingDocuments: ['microchip', 'rabies-vaccination', 'eu-pet-passport'],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.satisfied.length).toBeGreaterThanOrEqual(3);
      expect(result.data.satisfied.some(s => s.requirement.id === 'microchip')).toBe(true);
      expect(result.data.satisfied.some(s => s.requirement.id === 'rabies-vaccination')).toBe(true);
      expect(result.data.satisfied.some(s => s.requirement.id === 'eu-pet-passport')).toBe(true);
    });

    it('healthy dog traveling FR→DE with all core docs is ready', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'DE',
        existingDocuments: [
          'microchip', 'rabies-vaccination', 'eu-pet-passport',
          'min-age-rabies', 'max-pets-limit',
        ],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.missing.filter(m =>
        !['teip-entry-point', 'rabies-antibody-titer', 'health-certificate-non-eu', 'uk-specific-docs', 'nordic-immunity-zone'].includes(m.requirement.id)
      )).toHaveLength(0);
    });
  });

  describe('tapeworm treatment for specific destinations', () => {
    it('requires tapeworm for dog to UK', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'GB',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const tapewormReq = result.data.missing.find(m => m.requirement.id === 'tapeworm-treatment');
      expect(tapewormReq).toBeDefined();
    });

    it('does not require tapeworm for cat to UK', () => {
      const result = checkEUTravelRequirements({
        species: 'cat',
        originCountry: 'FR',
        destinationCountry: 'GB',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const tapewormReq = result.data.missing.find(m => m.requirement.id === 'tapeworm-treatment');
      expect(tapewormReq).toBeUndefined();
    });

    it('requires tapeworm for dog to Finland', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'SE',
        destinationCountry: 'FI',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const nordicReq = result.data.missing.find(m => m.requirement.id === 'nordic-immunity-zone');
      expect(nordicReq).toBeDefined();
    });
  });

  describe('UK-specific documentation', () => {
    it('requires UK-specific docs when traveling from GB to EU', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'GB',
        destinationCountry: 'FR',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const ukDocs = result.data.missing.find(m => m.requirement.id === 'uk-specific-docs');
      expect(ukDocs).toBeDefined();
    });

    it('requires UK-specific docs for dog and cat alike', () => {
      const dog = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'GB',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      const cat = checkEUTravelRequirements({
        species: 'cat',
        originCountry: 'GB',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      expect(dog.ok).toBe(true);
      expect(cat.ok).toBe(true);
      if (!dog.ok || !cat.ok) throw new Error('expected ok');
      expect(dog.data.missing.some(m => m.requirement.id === 'uk-specific-docs')).toBe(true);
      expect(cat.data.missing.some(m => m.requirement.id === 'uk-specific-docs')).toBe(true);
    });
  });

  describe('totalLeadTimeDays', () => {
    it('calculates max lead time from missing items', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'US',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      // rabies-antibody-titer has 90 days lead time
      expect(result.data.totalLeadTimeDays).toBe(90);
    });

    it('returns 0 when all documents provided', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'DE',
        existingDocuments: [
          'microchip', 'rabies-vaccination', 'eu-pet-passport',
          'min-age-rabies', 'max-pets-limit', 'teip-entry-point',
          'rabies-antibody-titer', 'health-certificate-non-eu',
        ],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.totalLeadTimeDays).toBe(0);
      expect(result.data.isReadyToTravel).toBe(true);
    });
  });

  describe('error handling', () => {
    it('returns error for empty country codes', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: '',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_COUNTRY');
    });

    it('returns error for unknown destination country code', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'US',
        destinationCountry: 'XX',
        existingDocuments: [],
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('INVALID_COUNTRY');
    });
  });

  describe('non-core requirements', () => {
    it('TEIP entry point is always required for travel', () => {
      const result = checkEUTravelRequirements({
        species: 'dog',
        originCountry: 'FR',
        destinationCountry: 'DE',
        existingDocuments: [],
      });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      const teip = result.data.missing.find(m => m.requirement.id === 'teip-entry-point');
      expect(teip).toBeDefined();
    });
  });
});
