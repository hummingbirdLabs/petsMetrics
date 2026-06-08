'use client';
import { useTranslations } from 'next-intl';
import type { PetProfile } from '@/types/profile.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type ProfileCardProps = {
  profile: PetProfile;
  onEdit?: () => void;
  className?: string;
};

export function ProfileCard({ profile, onEdit, className = '' }: ProfileCardProps) {
  const t = useTranslations('profile');
  const tu = useTranslations('common.unit');

  const speciesColors =
    profile.species === 'dog'
      ? { surface: 'bg-[--dog-surface]', border: 'border-l-[--dog-primary]' }
      : { surface: 'bg-[--cat-surface]', border: 'border-l-[--cat-primary]' };

  return (
    <Card
      padding="lg"
      className={`relative overflow-hidden border-l-4 ${speciesColors.border} ${speciesColors.surface} ${className}`}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-[--gray-100] text-4xl shadow-sm">
          {profile.species === 'dog' ? '🐕' : '🐱'}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold text-[--gray-900]">{profile.name}</h2>
          <p className="text-sm text-[--gray-500]">
            {profile.breed}
            {profile.sizeClass ? ` · ${profile.sizeClass}` : ''}
          </p>
          <p className="mt-1 text-sm text-[--gray-500]">
            {profile.sex === 'male' ? '♂' : '♀'} {profile.sex === 'male' ? t('wizard.step4Male') : t('wizard.step4Female')}
            {' · '}
            {profile.isNeutered ? t('wizard.step4NeuteredYes') : t('wizard.step4NeuteredNo')}
          </p>
          <p className="mt-1 text-sm text-[--gray-500]">
            {profile.birthDate ? `${profile.birthDate} · ` : ''}
            {profile.weightKg} {tu('kg')}
          </p>
        </div>
        {onEdit ? (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            {t('dashboard.data.edit')}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
