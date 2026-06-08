'use client';
import { useTranslations } from 'next-intl';
import { Toggle } from '@/components/ui/Toggle';

type SpeciesToggleProps = {
  value: 'dog' | 'cat';
  onChange: (value: 'dog' | 'cat') => void;
  className?: string;
};

const OPTIONS: [string, string] = ['dog', 'cat'];

export function SpeciesToggle({ value, onChange, className = '' }: SpeciesToggleProps) {
  const t = useTranslations('speciesToggle');

  return (
    <Toggle
      options={OPTIONS}
      value={value}
      onChange={(v) => onChange(v as 'dog' | 'cat')}
      ariaLabel={t('label')}
      className={className}
    />
  );
}
