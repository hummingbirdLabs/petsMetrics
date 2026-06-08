'use client';
import { useTranslations } from 'next-intl';
import type { PetProfile } from '@/types/profile.types';
import { Card } from '@/components/ui/Card';

type PetProfileBarProps = {
  profile: PetProfile | null;
  className?: string;
};

export function PetProfileBar({ profile, className = '' }: PetProfileBarProps) {
  const t = useTranslations();

  if (!profile) {
    return (
      <Card padding="sm" className={className}>
        <p className="text-sm text-[--gray-500]">{t('profile.noProfile')}</p>
      </Card>
    );
  }

  return (
    <Card padding="sm" className={`flex items-center gap-3 ${className}`}>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--gray-100] text-lg"
        aria-hidden="true"
      >
        {profile.species === 'dog' ? '🐕' : '🐈'}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[--gray-900]">{profile.name}</span>
        <span className="text-xs text-[--gray-500]">
          {t(`nav.${profile.species}`)} · {profile.weightKg} {t('common.unit.kg')}
          {profile.sizeClass ? ` · ${profile.sizeClass}` : ''}
        </span>
      </div>
    </Card>
  );
}
