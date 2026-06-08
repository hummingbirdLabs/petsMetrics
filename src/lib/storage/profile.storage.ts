import type { PetProfile } from '@/types/profile.types';
import type { Result } from '@/types/common.types';

const PROFILES_KEY = 'petsmetrics_profiles';
const ACTIVE_PROFILE_KEY = 'petsmetrics_active_profile_id';

function isPetProfile(value: unknown): value is PetProfile {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    (p.species === 'dog' || p.species === 'cat') &&
    typeof p.breed === 'string' &&
    (p.sex === 'male' || p.sex === 'female') &&
    typeof p.isNeutered === 'boolean' &&
    typeof p.weightKg === 'number' &&
    typeof p.createdAt === 'string' &&
    typeof p.updatedAt === 'string'
  );
}

function readProfilesRaw(): unknown {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeProfiles(profiles: PetProfile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // 静默失败 — localStorage 可能已满或被禁用
  }
}

export function getAllProfiles(): PetProfile[] {
  const raw = readProfilesRaw();
  if (!Array.isArray(raw)) return [];
  return raw.filter(isPetProfile);
}

export function getActiveProfileId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY) ?? null;
  } catch {
    return null;
  }
}

export function setActiveProfileId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch {
    // 静默失败
  }
}

export function getProfileById(id: string): PetProfile | null {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.id === id) ?? null;
}

export function saveProfile(profile: PetProfile): void {
  const profiles = getAllProfiles();
  const idx = profiles.findIndex((p) => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  writeProfiles(profiles);
}

export function deleteProfile(id: string): void {
  const profiles = getAllProfiles().filter((p) => p.id !== id);
  writeProfiles(profiles);
  if (getActiveProfileId() === id) {
    if (profiles.length > 0) {
      setActiveProfileId(profiles[0].id);
    } else {
      try {
        localStorage.removeItem(ACTIVE_PROFILE_KEY);
      } catch {
        // 静默失败
      }
    }
  }
}

export function exportProfilesJson(): string {
  return JSON.stringify(getAllProfiles(), null, 2);
}

export function importProfilesJson(json: string): Result<PetProfile[]> {
  try {
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return { ok: false, error: { code: 'INVALID_FORMAT', details: 'Expected a JSON array of profiles.' } };
    }
    const valid = parsed.filter(isPetProfile);
    if (valid.length === 0) {
      return { ok: false, error: { code: 'NO_VALID_PROFILES', details: 'No valid pet profiles found in the imported data.' } };
    }
    const existing = getAllProfiles();
    for (const profile of valid) {
      const idx = existing.findIndex((p) => p.id === profile.id);
      if (idx >= 0) {
        existing[idx] = profile;
      } else {
        existing.push(profile);
      }
    }
    writeProfiles(existing);
    return { ok: true, data: valid };
  } catch {
    return { ok: false, error: { code: 'PARSE_ERROR', details: 'Failed to parse the JSON file.' } };
  }
}
