'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { PetProfile } from '@/types/profile.types';
import { useProfile } from '@/hooks/useProfile';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { ProfileCreationWizard } from '@/components/profile/ProfileCreationWizard';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { PetSwitcher } from '@/components/profile/PetSwitcher';
import { QuickStatsRow } from '@/components/profile/QuickStatsRow';
import { LinkedToolsGrid } from '@/components/profile/LinkedToolsGrid';
import { DataManagementPanel } from '@/components/profile/DataManagementPanel';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';

type PageView = 'dashboard' | 'wizard' | 'success';

export function ProfilePageContent() {
  const t = useTranslations('profile');
  const pb = useTranslations('profile.breadcrumb');
  const { profiles, activeProfile, downloadSingleProfileBackup } = useProfile();
  const [view, setView] = useState<PageView>(profiles.length > 0 ? 'dashboard' : 'wizard');
  const [createdProfile, setCreatedProfile] = useState<PetProfile | null>(null);

  const handleWizardComplete = (profile: PetProfile) => {
    setCreatedProfile(profile);
    setView('success');
  };

  // State A: No profiles and no wizard → show hero
  if (view === 'wizard' && !createdProfile) {
    return (
      <div className="min-h-[60vh]">
        <Breadcrumb
          items={[
            { label: pb('home'), href: '' },
            { label: pb('profile') },
          ]}
          className="mb-8"
        />
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-[--gray-900] sm:text-4xl">
            {t('empty.title')}
          </h1>
          <p className="mb-8 text-lg text-[--gray-500]">{t('empty.subtitle')}</p>
          <ProfileCreationWizard
            onComplete={handleWizardComplete}
            className="mb-8"
          />
          <div className="flex items-center justify-center gap-6 text-sm text-[--gray-500]">
            <span>{t('empty.privacyLocal')}</span>
            <span>{t('empty.privacyNoAccount')}</span>
          </div>
        </div>
      </div>
    );
  }

  // Success state after creation
  if (view === 'success' && createdProfile) {
    return (
      <div className="min-h-[60vh]">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-[--brand-teal]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="mb-2 font-display text-2xl font-bold text-[--gray-900]">
            {t('success.title').replace('{name}', createdProfile.name)}
          </h1>
          <p className="mb-6 text-[--gray-500]">
            {t('success.message').replace('{name}', createdProfile.name)}
          </p>
          <div className="mb-6 rounded-lg border border-[--gray-300] bg-[--gray-50] p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-[--gray-700]">{t('backup.title')}</p>
            <p className="mb-3 text-xs text-[--gray-500]">{t('backup.body')}</p>
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => downloadSingleProfileBackup(createdProfile)}
              >
                {t('backup.download')}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setView('dashboard')}>
                {t('success.goToDashboard')}
              </Button>
            </div>
          </div>
          <DisclaimerSection />
        </div>
      </div>
    );
  }

  // State B: Dashboard with existing profiles
  const currentProfile = activeProfile ?? profiles[0] ?? null;

  if (!currentProfile) {
    return (
      <div className="min-h-[60vh] text-center">
        <Breadcrumb
          items={[
            { label: pb('home'), href: '' },
            { label: pb('profile') },
          ]}
          className="mb-8"
        />
        <h1 className="mb-4 font-display text-2xl font-bold text-[--gray-900]">
          {t('dashboard.title')}
        </h1>
        <p className="mb-6 text-[--gray-500]">{t('dashboard.noProfiles')}</p>
        <Button onClick={() => setView('wizard')}>{t('empty.cta')}</Button>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: pb('home'), href: '' },
          { label: pb('profile') },
        ]}
        className="mb-4"
      />
      <PetSwitcher onAddPet={() => setView('wizard')} className="mb-6" />
      <ProfileCard
        profile={currentProfile}
        onEdit={() => setView('wizard')}
        className="mb-6"
      />
      <QuickStatsRow className="mb-8" />
      <LinkedToolsGrid profile={currentProfile} className="mb-8" />
      <DataManagementPanel
        profileId={currentProfile.id}
        onEdit={() => setView('wizard')}
        className="mb-6"
      />
      <DisclaimerSection />
    </div>
  );
}
