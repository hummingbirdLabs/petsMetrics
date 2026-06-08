'use client';
import { useTranslations } from 'next-intl';
import { pageUrl } from '@/lib/utils/url';

type ProfileBarProps = {
  species: 'dog' | 'cat';
};

export function ProfileBar({ species }: ProfileBarProps) {
  const t = useTranslations(`${species}.profileBar`);

  // In a real implementation, this would read from localStorage ProfileContext
  // For Phase 5, we show the "no profile" state as the default
  const hasProfile = false;

  if (hasProfile) {
    const petName = 'Buddy';
    return (
      <div
        className="border-b"
        style={{
          backgroundColor: species === 'dog' ? 'var(--dog-primary-light)' : 'var(--cat-primary-light)',
          borderBottomColor: species === 'dog' ? 'var(--dog-accent)' : 'var(--cat-accent)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-medium text-[--gray-700]">
            <span>{species === 'dog' ? '🐕' : '🐱'}</span>
            <span>
              {t('autofillActive', { name: petName })}
            </span>
          </div>
          <button type="button" className="text-sm text-[--gray-500]">
            Switch ▾
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-b"
      style={{
        backgroundColor: species === 'dog' ? 'var(--dog-primary-light)' : 'var(--cat-primary-light)',
        borderBottomColor: species === 'dog' ? 'var(--dog-accent)' : 'var(--cat-accent)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-sm text-[--gray-500]">
          💡 {t('noProfile')}
        </span>
        <a
          href={pageUrl('profile')}
          className="rounded-lg bg-[--brand-teal] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[--brand-teal]/90"
        >
          {t('createCta')}
        </a>
      </div>
    </div>
  );
}
