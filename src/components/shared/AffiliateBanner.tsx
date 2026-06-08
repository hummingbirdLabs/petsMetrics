'use client';
import { useTranslations } from 'next-intl';

type AffiliateBannerProps = {
  variant: 'insurance' | 'food' | 'amazon' | 'pdf_upsell';
  className?: string;
};

export function AffiliateBanner({ variant, className = '' }: AffiliateBannerProps) {
  const t = useTranslations('affiliateBanner');

  return (
    <div
      className={`rounded-lg border border-[--brand-teal]/20 bg-gradient-to-r from-[--brand-teal-light]/30 to-transparent p-4 ${className}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[--gray-900]">{t(`${variant}.title`)}</p>
          <p className="text-xs text-[--gray-500]">{t(`${variant}.description`)}</p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-md bg-[--brand-teal] px-4 py-1.5 text-xs font-medium text-white cursor-pointer">
          {t(`${variant}.cta`)}
        </span>
      </div>
    </div>
  );
}
