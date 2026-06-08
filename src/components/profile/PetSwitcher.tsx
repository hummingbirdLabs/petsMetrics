'use client';
import { useTranslations } from 'next-intl';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/Button';

type PetSwitcherProps = {
  onAddPet?: () => void;
  className?: string;
};

export function PetSwitcher({ onAddPet, className = '' }: PetSwitcherProps) {
  const t = useTranslations('profile');
  const { profiles, activeProfile, setActiveProfile } = useProfile();

  if (profiles.length === 0) return null;

  return (
    <div className={`flex items-center gap-1 overflow-x-auto ${className}`}>
      {profiles.map((p) => {
        const isActive = activeProfile?.id === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveProfile(p.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-b-2 border-[--brand-teal] text-[--brand-teal]'
                : 'text-[--gray-500] hover:text-[--gray-700]'
            }`}
          >
            <span aria-hidden="true">{p.species === 'dog' ? '🐕' : '🐱'}</span>
            {p.name}
          </button>
        );
      })}
      {onAddPet ? (
        <Button variant="secondary" size="sm" className="ml-2 shrink-0 border-dashed" onClick={onAddPet}>
          + {t('dashboard.addPet')}
        </Button>
      ) : null}
    </div>
  );
}
