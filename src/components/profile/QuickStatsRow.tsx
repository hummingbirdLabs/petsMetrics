'use client';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';

type QuickStatsRowProps = {
  className?: string;
};

type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
};

function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <Card padding="sm" className="text-center">
      <p className="text-xs text-[--gray-500]">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-[--gray-900]">{value}</p>
      {subtext ? <p className="mt-0.5 text-xs text-[--gray-500]">{subtext}</p> : null}
    </Card>
  );
}

export function QuickStatsRow({ className = '' }: QuickStatsRowProps) {
  const t = useTranslations('profile.dashboard.quickStats');

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      <StatCard label={t('calories')} value="—" subtext={t('comingSoon')} />
      <StatCard label={t('humanAge')} value="—" subtext={t('comingSoon')} />
      <StatCard label={t('nextVaccine')} value="—" subtext={t('comingSoon')} />
      <StatCard label={t('lifeStage')} value="—" subtext={t('comingSoon')} />
    </div>
  );
}
