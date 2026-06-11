'use client';
import { useTranslations } from 'next-intl';
import type { PetProfile } from '@/types/profile.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

type ToolLink = {
  label: string;
  href: string;
};

const TOOLS: ToolLink[] = [
  { label: 'Dog Age Calculator', href: 'dog/age' },
  { label: 'Cat Age Calculator', href: 'cat/age' },
  { label: 'Dog Calorie Calculator', href: 'dog/calorie' },
  { label: 'Puppy Growth Tracker', href: 'dog/puppy-growth' },
  { label: 'Gestation Calculator', href: 'dog/gestation' },
  { label: 'Vaccination Schedule', href: 'shared/vaccination' },
  { label: 'Cat BCS Calculator', href: 'cat/bcs' },
  { label: 'Cat Hydration Calculator', href: 'cat/hydration' },
  { label: 'Toxic Checker', href: 'shared/toxic-checker' },
  { label: 'EU Travel Checker', href: 'shared/eu-travel' },
];

type LinkedToolsGridProps = {
  profile: PetProfile;
  className?: string;
};

export function LinkedToolsGrid({ profile, className = '' }: LinkedToolsGridProps) {
  const t = useTranslations('profile.dashboard');
  const pageUrl = usePageUrlBuilder();

  return (
    <div className={className}>
      <h3 className="mb-4 font-display text-lg font-semibold text-[--gray-900]">
        {t('tools.title')}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <Card key={tool.href} padding="sm" className="flex flex-col justify-between gap-2">
            <p className="text-sm font-medium text-[--gray-700]">{tool.label}</p>
            <a
              href={pageUrl(tool.href)}
              className="inline-flex items-center gap-1 text-sm font-medium text-[--brand-teal] hover:underline"
            >
              {t('tools.openWith').replace('{name}', profile.name)}
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
