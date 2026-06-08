'use client';
import { useTranslations } from 'next-intl';
import { useCatHydration } from '@/hooks/useCatHydration';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { pageUrl } from '@/lib/utils/url';

export function CatHydrationWidget() {
  const t = useTranslations('catHydration');
  const { activeProfile: profile } = useProfile();
  const {
    weightKg,
    dryFoodG,
    wetFoodG,
    result,
    error,
    hydrationStatus,
    statusColor,
    setWeightKg,
    setDryFoodG,
    setWetFoodG,
    calculate,
  } = useCatHydration();

  const petName = profile?.name ?? 'Luna';
  const shareUrl = SITE_URL + pageUrl('cat/hydration-calculator').slice(0, -1);

  const STATUS_I18N_MAP: Record<string, string> = {
    adequate: 'result.statusAdequate',
    slightly_low: 'result.statusSlightlyLow',
    low: 'result.statusLow',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.weightLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0.5}
                step={0.1}
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.weightLabel')}
              />
              <span className="text-sm text-[--gray-500]">kg</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.dryFoodLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0}
                step={5}
                value={dryFoodG}
                onChange={(e) => setDryFoodG(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.dryFoodLabel')}
              />
              <span className="text-sm text-[--gray-500]">g/day</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.wetFoodLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0}
                step={5}
                value={wetFoodG}
                onChange={(e) => setWetFoodG(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.wetFoodLabel')}
              />
              <span className="text-sm text-[--gray-500]">g/day</span>
            </div>
          </div>

          {error ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{error}</p>
          ) : null}

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto" style={{
            backgroundColor: 'var(--cat-primary)',
            borderColor: 'var(--cat-primary-dark)',
          }}>
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <>
          {/* Total Water Hero */}
          <div className="rounded-xl border-l-4 bg-[--cat-surface]" style={{ borderLeftColor: statusColor ?? 'var(--cat-primary)' }}>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[--gray-900] font-mono tracking-tight">
                  {result.totalDailyMl}
                </span>
                <span className="text-xl text-[--gray-500]">ml / day</span>
              </div>
              <p className="text-sm text-[--gray-600]">
                {t('result.totalMl', { name: petName, ml: result.totalDailyMl })}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <Card padding="lg">
            <div className="flex flex-col gap-4">
              {/* From food */}
              <div className="rounded-lg border border-[--gray-200] bg-[--gray-50] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[--gray-600]">{t('result.fromFood')}</span>
                  <span className="text-lg font-semibold font-mono text-[--gray-800]">{result.fromFoodMl} ml</span>
                </div>
                <p className="mt-1 text-xs text-[--gray-400]">
                  {t('result.moistureNote')}
                </p>
              </div>

              {/* Extra needed */}
              <div
                className="rounded-lg border p-4"
                style={{
                  borderColor: statusColor ?? 'var(--cat-primary)',
                  backgroundColor: statusColor ? `${statusColor}0D` : 'var(--cat-primary-light)',
                }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-[--gray-700]">{t('result.extraNeeded')}</span>
                  <span className="text-lg font-bold font-mono" style={{ color: statusColor ?? 'var(--cat-primary)' }}>
                    {result.extraWaterNeededMl} ml
                  </span>
                </div>
                {hydrationStatus ? (
                  <p className="mt-1 text-xs font-medium" style={{ color: statusColor ?? 'var(--cat-primary)' }}>
                    {t(STATUS_I18N_MAP[hydrationStatus])}
                  </p>
                ) : null}
              </div>
            </div>
          </Card>

          {/* Science note */}
          <div className="rounded-lg border-l-4 border-l-[--status-info] bg-[--status-info-bg] p-4">
            <p className="text-sm font-medium text-[--gray-800]">{t('result.scienceTitle')}</p>
            <p className="mt-1 text-sm text-[--gray-600]">{t('result.scienceBody')}</p>
          </div>

          {/* Share */}
          <div className="rounded-lg border border-[--gray-200] p-4">
            <p className="mb-2 text-sm font-semibold text-[--gray-800]">
              {t('shareCta.title', { name: petName, ml: result.totalDailyMl })}
            </p>
            <ShareButtons url={shareUrl} title={t('shareCta.title', { name: petName, ml: result.totalDailyMl })} />
          </div>
        </>
      ) : null}
    </div>
  );
}
