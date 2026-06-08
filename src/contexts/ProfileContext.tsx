'use client';
import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { PetProfile } from '@/types/profile.types';
import type { Result } from '@/types/common.types';
import {
  getAllProfiles,
  getActiveProfileId,
  setActiveProfileId as storageSetActive,
  getProfileById,
  saveProfile,
  deleteProfile as storageDeleteProfile,
  exportProfilesJson,
  importProfilesJson,
} from '@/lib/storage/profile.storage';

type ProfileContextValue = {
  profiles: PetProfile[];
  activeProfile: PetProfile | null;
  setActiveProfile: (id: string) => void;
  createProfile: (data: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>) => PetProfile;
  updateProfile: (id: string, data: Partial<PetProfile>) => void;
  deleteProfile: (id: string) => void;
  exportJSON: () => void;
  downloadSingleProfileBackup: (profile: PetProfile) => void;
  importJSON: (file: File) => Promise<Result<void>>;
};

export const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<PetProfile[]>(() => getAllProfiles());
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(() =>
    getActiveProfileId(),
  );

  const activeProfile = activeProfileId ? getProfileById(activeProfileId) : null;

  const refreshProfiles = useCallback(() => {
    setProfiles(getAllProfiles());
  }, []);

  const setActiveProfile = useCallback(
    (id: string) => {
      storageSetActive(id);
      setActiveProfileIdState(id);
    },
    [],
  );

  const createProfile = useCallback(
    (data: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>): PetProfile => {
      const now = new Date().toISOString();
      const profile: PetProfile = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      saveProfile(profile);
      storageSetActive(profile.id);
      setActiveProfileIdState(profile.id);
      refreshProfiles();
      return profile;
    },
    [refreshProfiles],
  );

  const updateProfile = useCallback(
    (id: string, data: Partial<PetProfile>) => {
      const existing = getProfileById(id);
      if (!existing) return;
      const updated: PetProfile = { ...existing, ...data, updatedAt: new Date().toISOString() };
      saveProfile(updated);
      refreshProfiles();
    },
    [refreshProfiles],
  );

  const deleteProfileFn = useCallback(
    (id: string) => {
      storageDeleteProfile(id);
      const remaining = getAllProfiles();
      if (activeProfileId === id) {
        if (remaining.length > 0) {
          storageSetActive(remaining[0].id);
          setActiveProfileIdState(remaining[0].id);
        } else {
          setActiveProfileIdState(null);
        }
      }
      refreshProfiles();
    },
    [activeProfileId, refreshProfiles],
  );

  const exportJSON = useCallback(() => {
    const json = exportProfilesJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'petsmetrics-profile-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const downloadSingleProfileBackup = useCallback((profile: PetProfile) => {
    const json = JSON.stringify([profile], null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.toLowerCase()}-petsmetrics-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importJSON = useCallback(
    async (file: File): Promise<Result<void>> => {
      try {
        const text = await file.text();
        const result = importProfilesJson(text);
        if (!result.ok) return result;
        refreshProfiles();
        const activeId = getActiveProfileId();
        if (activeId) setActiveProfileIdState(activeId);
        return { ok: true, data: undefined };
      } catch {
        return { ok: false, error: { code: 'FILE_READ_ERROR', details: 'Could not read the selected file.' } };
      }
    },
    [refreshProfiles],
  );

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        setActiveProfile,
        createProfile,
        updateProfile,
        deleteProfile: deleteProfileFn,
        exportJSON,
        downloadSingleProfileBackup,
        importJSON,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
