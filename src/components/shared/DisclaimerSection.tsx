'use client';
import { useTranslations } from 'next-intl';

type DisclaimerSectionProps = {
  className?: string;
};

export function DisclaimerSection({ className = '' }: DisclaimerSectionProps) {
  const t = useTranslations('common');

  return (
    <div className={`rounded-lg border border-[--gray-300] bg-[--gray-50] p-4 ${className}`}>
      <p className="text-xs leading-relaxed text-[--gray-500]">
        {t('disclaimer.standard')}
      </p>
      <div id="adsense-result-below" />
    </div>
  );
}
