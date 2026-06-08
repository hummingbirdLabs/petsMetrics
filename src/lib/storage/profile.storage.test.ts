import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { PetProfile } from '@/types/profile.types';
import {
  getAllProfiles,
  getActiveProfileId,
  setActiveProfileId,
  getProfileById,
  saveProfile,
  deleteProfile,
  exportProfilesJson,
  importProfilesJson,
} from '@/lib/storage/profile.storage';

const PROFILES_KEY = 'petsmetrics_profiles';
const ACTIVE_PROFILE_KEY = 'petsmetrics_active_profile_id';

function makeProfile(overrides: Partial<PetProfile> = {}): PetProfile {
  return {
    id: crypto.randomUUID(),
    name: 'Buddy',
    species: 'dog',
    breed: 'Labrador',
    sex: 'male',
    isNeutered: true,
    birthDate: '2023-03-12',
    currentAgeWeeks: null,
    weightKg: 28,
    sizeClass: 'large',
    photoUrl: null,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('profile.storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getAllProfiles', () => {
    it('returns empty array when localStorage is empty', () => {
      expect(getAllProfiles()).toEqual([]);
    });

    it('returns valid profiles from localStorage', () => {
      const profile = makeProfile();
      localStorage.setItem(PROFILES_KEY, JSON.stringify([profile]));
      expect(getAllProfiles()).toEqual([profile]);
    });

    it('filters out invalid entries', () => {
      localStorage.setItem(PROFILES_KEY, JSON.stringify([{ id: 'x' }, makeProfile()]));
      const profiles = getAllProfiles();
      expect(profiles).toHaveLength(1);
      expect(profiles[0].name).toBe('Buddy');
    });

    it('returns empty array for malformed JSON', () => {
      localStorage.setItem(PROFILES_KEY, '{not valid json');
      expect(getAllProfiles()).toEqual([]);
    });

    it('returns empty array when stored value is not an array', () => {
      localStorage.setItem(PROFILES_KEY, '42');
      expect(getAllProfiles()).toEqual([]);
    });
  });

  describe('getActiveProfileId / setActiveProfileId', () => {
    it('returns null when no active profile is set', () => {
      expect(getActiveProfileId()).toBeNull();
    });

    it('returns the set active profile id', () => {
      setActiveProfileId('abc123');
      expect(getActiveProfileId()).toBe('abc123');
    });
  });

  describe('getProfileById', () => {
    it('returns null when profile not found', () => {
      expect(getProfileById('nonexistent')).toBeNull();
    });

    it('returns the matching profile', () => {
      const profile = makeProfile({ id: 'test-id' });
      localStorage.setItem(PROFILES_KEY, JSON.stringify([profile]));
      const found = getProfileById('test-id');
      expect(found).not.toBeNull();
      expect(found?.name).toBe('Buddy');
    });
  });

  describe('saveProfile', () => {
    it('adds a new profile', () => {
      const profile = makeProfile();
      saveProfile(profile);
      expect(getAllProfiles()).toHaveLength(1);
      expect(getAllProfiles()[0].id).toBe(profile.id);
    });

    it('updates an existing profile', () => {
      const profile = makeProfile({ id: 'test-id', name: 'Buddy' });
      saveProfile(profile);
      const updated = makeProfile({ id: 'test-id', name: 'Buddy Jr.' });
      saveProfile(updated);
      const profiles = getAllProfiles();
      expect(profiles).toHaveLength(1);
      expect(profiles[0].name).toBe('Buddy Jr.');
    });
  });

  describe('deleteProfile', () => {
    it('removes a profile by id', () => {
      const p1 = makeProfile({ id: 'id-1', name: 'Buddy' });
      const p2 = makeProfile({ id: 'id-2', name: 'Luna' });
      saveProfile(p1);
      saveProfile(p2);
      deleteProfile('id-1');
      const profiles = getAllProfiles();
      expect(profiles).toHaveLength(1);
      expect(profiles[0].name).toBe('Luna');
    });

    it('clears active profile if deleted', () => {
      const p1 = makeProfile({ id: 'id-1' });
      const p2 = makeProfile({ id: 'id-2' });
      saveProfile(p1);
      saveProfile(p2);
      setActiveProfileId('id-1');
      deleteProfile('id-1');
      expect(getActiveProfileId()).toBe('id-2');
    });

    it('removes active profile key when no profiles remain', () => {
      const p1 = makeProfile({ id: 'id-1' });
      saveProfile(p1);
      setActiveProfileId('id-1');
      deleteProfile('id-1');
      expect(getActiveProfileId()).toBeNull();
    });
  });

  describe('exportProfilesJson', () => {
    it('exports profiles as JSON string', () => {
      const profile = makeProfile({ id: 'id-1' });
      saveProfile(profile);
      const json = exportProfilesJson();
      const parsed = JSON.parse(json);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].name).toBe('Buddy');
    });

    it('exports empty array when no profiles', () => {
      const json = exportProfilesJson();
      expect(json).toBe('[]');
    });
  });

  describe('importProfilesJson', () => {
    it('imports valid profiles successfully', () => {
      const profile = makeProfile({ id: 'imp-1', name: 'ImportTest' });
      const json = JSON.stringify([profile]);
      const result = importProfilesJson(json);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toHaveLength(1);
        expect(result.data[0].name).toBe('ImportTest');
      }
      expect(getAllProfiles()).toHaveLength(1);
    });

    it('returns error for invalid JSON', () => {
      const result = importProfilesJson('{invalid');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('PARSE_ERROR');
      }
    });

    it('returns error when no valid profiles in array', () => {
      const result = importProfilesJson(JSON.stringify([{ foo: 'bar' }]));
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('NO_VALID_PROFILES');
      }
    });

    it('returns error for non-array input', () => {
      const result = importProfilesJson('42');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('INVALID_FORMAT');
      }
    });

    it('merges with existing profiles', () => {
      const existing = makeProfile({ id: 'exist-1', name: 'Existing' });
      saveProfile(existing);
      const imported = makeProfile({ id: 'imp-1', name: 'Imported' });
      const result = importProfilesJson(JSON.stringify([imported]));
      expect(result.ok).toBe(true);
      expect(getAllProfiles()).toHaveLength(2);
    });
  });
});
