'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { usePuppyGrowth } from '@/hooks/usePuppyGrowth';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import type { SizeClass } from '@/types/profile.types';

/** Dynamically import chart to avoid bundling 100KB+ chart.js in initial page load */
const DynamicGrowthChart = dynamic(
  () => import('./PuppyGrowthChart'),
  { ssr: false, loading: () => <div className="h-[360px] animate-pulse rounded-lg bg-[--gray-100]" /> },
);

const SIZE_OPTIONS: { value: SizeClass; key: string; descKey: string }[] = [
  { value: 'small', key: 'sizeSmall', descKey: 'sizeSmallDesc' },
  { value: 'medium', key: 'sizeMedium', descKey: 'sizeMediumDesc' },
  { value: 'large', key: 'sizeLarge', descKey: 'sizeLargeDesc' },
  { value: 'giant', key: 'sizeGiant', descKey: 'sizeGiantDesc' },
];

const DOG_CHART_COLORS = {
  primary: '#D97706',
  primaryAlpha: 'rgba(217, 119, 6, 0.15)',
  grid: '#CBD5E1',
  tick: '#64748B',
};

export function PuppyGrowthWidget() {
  const t = useTranslations('puppyGrowth');
  const { activeProfile: profile } = useProfile();
  const {
    currentAgeWeeks,
    currentWeightKg,
    sizeClass,
    result,
    error,
    setCurrentAgeWeeks,
    setCurrentWeightKg,
    setSizeClass,
    calculate,
  } = usePuppyGrowth();

  const petName = profile?.name ?? 'Buddy';

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <Input
            label={t('form.ageWeeksLabel')}
            type="number"
            min={0}
            step={1}
            placeholder={t('form.ageWeeksPlaceholder')}
            value={currentAgeWeeks}
            onChange={(e) => setCurrentAgeWeeks(Math.max(0, parseInt(e.target.value) || 0))}
            aria-label={t('form.ageWeeksLabel')}
          />

          <Input
            label={t('form.weightLabel')}
            type="number"
            min={0}
            step={0.1}
            value={currentWeightKg}
            onChange={(e) => setCurrentWeightKg(parseFloat(e.target.value) || 0)}
            aria-label={t('form.weightLabel')}
          />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[--gray-700]">{t('form.sizeLabel')}</span>
            <div className="flex flex-col gap-2">
              {SIZE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    sizeClass === opt.value
                      ? 'border-[--dog-primary] bg-[--dog-primary-light]'
                      : 'border-[--gray-300] bg-white hover:bg-[--gray-50]'
                  }`}
                >
                  <input
                    type="radio"
                    name="puppySize"
                    value={opt.value}
                    checked={sizeClass === opt.value}
                    onChange={() => setSizeClass(opt.value)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      sizeClass === opt.value
                        ? 'border-[--dog-primary] bg-[--dog-primary]'
                        : 'border-[--gray-300]'
                    }`}
                  >
                    {sizeClass === opt.value ? (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    ) : null}
                  </span>
                  <span className="text-sm font-medium text-[--gray-900]">{t(`form.${opt.key}`)}</span>
                  <span className="text-xs text-[--gray-500]">{t(`form.${opt.descKey}`)}</span>
                </label>
              ))}
            </div>
          </div>

          {error ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{error}</p>
          ) : null}

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto">
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <>
          <div className="rounded-xl border-l-4 bg-[--dog-surface]" style={{ borderLeftColor: 'var(--dog-primary)' }}>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-[--gray-500]">
                  {t('result.predictedTitle', { name: petName })}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[--gray-900] font-mono tracking-tight">
                    {result.predictedAdultWeightKgMin} – {result.predictedAdultWeightKgMax}
                  </span>
                  <span className="text-xl text-[--gray-500]">kg</span>
                </div>
                <p className="mt-1 text-xs text-[--gray-500]">{t('result.varianceNote')}</p>
              </div>
              <p className="text-sm text-[--gray-600]">
                {t('result.currentMarker', {
                  weight: currentWeightKg,
                  age: currentAgeWeeks,
                })}
              </p>
            </div>
          </div>

          {/* Growth Chart */}
          {result ? (
            <Card padding="lg">
              <h3 className="mb-3 text-lg font-semibold text-[--gray-900]">
                {t('result.growthChartTitle', { name: petName })}
              </h3>
              <DynamicGrowthChart
                data={result.growthCurvePoints.map((p) => ({
                  ageWeeks: p.ageWeeks,
                  weightKg: p.weightKg,
                }))}
                currentAgeWeeks={currentAgeWeeks}
                chartTitle={t('result.growthChartTitle', { name: petName })}
                chartXLabel={t('result.chartXLabel')}
                chartYLabel={t('result.chartYLabel')}
                primaryColor={DOG_CHART_COLORS.primary}
                primaryAlpha={DOG_CHART_COLORS.primaryAlpha}
                gridColor={DOG_CHART_COLORS.grid}
                tickColor={DOG_CHART_COLORS.tick}
              />
              <p className="mt-2 text-xs text-[--gray-400]">
                {t('result.predictedLabel', {
                  min: result.predictedAdultWeightKgMin,
                  max: result.predictedAdultWeightKgMax,
                })}
              </p>
            </Card>
          ) : null}

          <AffiliateBanner variant="food" />
        </>
      ) : null}
    </div>
  );
}
