import { describe, it, expect } from 'vitest';
import { searchToxicItems } from '@/lib/calculators/toxic.calc';

describe('searchToxicItems', () => {
  describe('exact match', () => {
    it('finds grapes by exact name', () => {
      const result = searchToxicItems({ query: 'Grapes & Raisins', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).not.toBeNull();
      expect(result.data.exactMatch!.slug).toBe('grapes');
    });

    it('refines to dog-only items', () => {
      const result = searchToxicItems({ query: 'hops', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).not.toBeNull();
      expect(result.data.exactMatch!.slug).toBe('hops');
    });

    it('excludes dog-only items for cat search', () => {
      const result = searchToxicItems({ query: 'hops', species: 'cat' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).toBeNull();
      expect(result.data.items).toHaveLength(0);
    });
  });

  describe('alias match', () => {
    it('finds chocolate by alias "cocoa"', () => {
      const result = searchToxicItems({ query: 'cocoa', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).not.toBeNull();
      expect(result.data.exactMatch!.slug).toBe('chocolate');
    });

    it('finds xylitol by alias "birch sugar"', () => {
      const result = searchToxicItems({ query: 'birch sugar', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).not.toBeNull();
      expect(result.data.exactMatch!.slug).toBe('xylitol');
    });
  });

  describe('case insensitivity', () => {
    it('finds GRAPES in uppercase', () => {
      const result = searchToxicItems({ query: 'GRAPES', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.length).toBeGreaterThan(0);
    });

    it('finds Chocolate in mixed case', () => {
      const result = searchToxicItems({ query: 'ChOcOlAtE', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.exactMatch).not.toBeNull();
    });
  });

  describe('substring match', () => {
    it('finds items containing "nut"', () => {
      const result = searchToxicItems({ query: 'nut', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.length).toBeGreaterThan(0);
      expect(result.data.items.some(i => i.slug === 'macadamia-nuts')).toBe(true);
    });

    it('finds items containing "choc"', () => {
      const result = searchToxicItems({ query: 'choc', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.some(i => i.slug === 'chocolate')).toBe(true);
    });
  });

  describe('prefix match', () => {
    it('finds items starting with "gar"', () => {
      const result = searchToxicItems({ query: 'gar', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.some(i => i.slug === 'garlic')).toBe(true);
    });
  });

  describe('fuzzy match (Levenshtein)', () => {
    it('finds grapes with typo "graps"', () => {
      const result = searchToxicItems({ query: 'graps', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.length).toBeGreaterThan(0);
      expect(result.data.items.some(i => i.slug === 'grapes')).toBe(true);
    });

    it('finds onion with typo "onon"', () => {
      const result = searchToxicItems({ query: 'onon', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.some(i => i.slug === 'onions')).toBe(true);
    });
  });

  describe('no results', () => {
    it('returns empty for nonsense query', () => {
      const result = searchToxicItems({ query: 'xyznonexistentfood', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items).toHaveLength(0);
      expect(result.data.exactMatch).toBeNull();
    });
  });

  describe('trim and edge cases', () => {
    it('trims whitespace from query', () => {
      const result = searchToxicItems({ query: '  grapes  ', species: 'dog' });
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.items.length).toBeGreaterThan(0);
      expect(result.data.items.some(i => i.slug === 'grapes')).toBe(true);
    });
  });

  describe('error handling', () => {
    it('returns error for empty query', () => {
      const result = searchToxicItems({ query: '', species: 'dog' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('EMPTY_QUERY');
    });

    it('returns error for whitespace-only query', () => {
      const result = searchToxicItems({ query: '   ', species: 'dog' });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('expected error');
      expect(result.error.code).toBe('EMPTY_QUERY');
    });
  });
});
