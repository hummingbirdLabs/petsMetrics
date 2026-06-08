'use client';
import { useTranslations } from 'next-intl';
import { useCatBCS } from '@/hooks/useCatBCS';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { pageUrl } from '@/lib/utils/url';

export function CatBCSWidget() {
  const t = useTranslations('catBcs');
  const { activeProfile: profile } = useProfile();
  const {
    bcsScore,
    currentWeightKg,
    result,
    error,
    conditionColor,
    conditionBg,
    setBcsScore,
    setCurrentWeightKg,
    calculate,
  } = useCatBCS();

  const petName = profile?.name ?? 'Luna';
  const shareUrl = SITE_URL + pageUrl('cat/bcs-weight-tracker').slice(0, -1);

  return (
    <div className="flex flex-col gap-6">
      {/* BCS Visual Assessment */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-[--gray-900]">{t('form.title')}</h2>
          <p className="text-sm text-[--gray-500]">{t('form.description')}</p>

          {/* BCS Image Selector */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-9">
            {BCS_OPTIONS.map((opt) => {
              const isSelected = bcsScore === opt.score;
              return (
                <button
                  key={opt.score}
                  type="button"
                  onClick={() => setBcsScore(opt.score)}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-1.5 transition-all ${
                    isSelected
                      ? 'border-[--cat-primary] bg-[--cat-primary-light] shadow-sm'
                      : 'border-[--gray-200] bg-white hover:border-[--gray-300]'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`BCS ${opt.score}`}
                >
                  <img
                    src={`/images/bcs-${opt.score}.webp`}
                    alt={`BCS ${opt.score}`}
                    className="h-16 w-full rounded object-cover"
                    loading="lazy"
                  />
                  <span className="text-[10px] font-medium text-[--gray-600]">{t(opt.labelKey)}</span>
                  <span
                    className={`text-[9px] font-semibold ${
                      isSelected ? 'text-[--cat-primary]' : 'text-[--gray-400]'
                    }`}
                  >
                    BCS {opt.score}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BCS Scale Bar */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <div key={s} className="flex flex-1 flex-col items-center gap-0.5">
                <div
                  className={`h-2 w-full rounded-sm ${
                    s <= 3 ? 'bg-[--status-toxic]' :
                    s <= 4 ? 'bg-[--status-caution]' :
                    s <= 5 ? 'bg-[--status-safe]' :
                    s <= 7 ? 'bg-[--status-caution]' :
                    'bg-[--status-toxic]'
                  }`}
                />
                <span className="text-[9px] text-[--gray-400]">{s}</span>
              </div>
            ))}
          </div>

          {/* Weight Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.weightLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0.5}
                step={0.1}
                value={currentWeightKg}
                onChange={(e) => setCurrentWeightKg(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.weightLabel')}
              />
              <span className="text-sm text-[--gray-500]">kg</span>
            </div>
          </div>

          {error ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{error}</p>
          ) : null}

          <Button
            variant="primary"
            onClick={calculate}
            className="w-full sm:w-auto"
            style={{
              backgroundColor: 'var(--cat-primary)',
              borderColor: 'var(--cat-primary-dark)',
            }}
          >
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <>
          {/* Body Condition Banner */}
          <div
            className="rounded-xl border-l-4 p-6"
            style={{
              borderLeftColor: conditionColor ?? 'var(--cat-primary)',
              backgroundColor: conditionBg ?? 'var(--cat-surface)',
            }}
          >
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: conditionColor }}>
                {t(`result.condition.${result.bodyCondition}`)}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[--gray-900]">
                  {t('result.bcsScore', { score: bcsScore })}
                </span>
              </div>
              <p className="text-sm text-[--gray-600]">
                {t('result.bodyCondition', {
                  condition: t(`result.condition.${result.bodyCondition}`),
                })}
              </p>
            </div>
          </div>

          {/* Ideal Weight & Calorie Target */}
          <Card padding="lg">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[--gray-600]">{t('result.idealWeight')}</span>
                <span className="text-lg font-semibold font-mono text-[--gray-800]">
                  {result.idealWeightKgMin} – {result.idealWeightKgMax} kg
                </span>
              </div>

              {result.dailyCalorieLimit !== null ? (
                <div className="rounded-lg border border-[--cat-primary]/30 bg-[--cat-primary-light] p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-[--gray-700]">{t('result.dailyCalorieTarget')}</span>
                    <span className="text-lg font-bold font-mono text-[--cat-primary]">
                      {result.dailyCalorieLimit} kcal/day
                    </span>
                  </div>
                  {result.weeksToIdealWeight !== null ? (
                    <p className="mt-1 text-xs text-[--gray-500]">
                      {t('result.weeksToIdeal', { weeks: result.weeksToIdealWeight })}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-lg border border-[--status-safe]/30 bg-[--status-safe-bg] p-4">
                  <p className="text-sm font-medium text-[--status-safe]">{t('result.maintainWeight')}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Hepatic Lipidosis Warning */}
          {result.hepaticLipidosisWarning ? (
            <div className="rounded-lg border-l-4 border-l-[--status-toxic] bg-[--status-toxic-bg] p-4">
              <p className="text-sm font-bold text-[--status-toxic]">{t('result.lipidosisWarning.title')}</p>
              <p className="mt-1 text-sm text-[--gray-700]">{t('result.lipidosisWarning.body')}</p>
            </div>
          ) : null}

          {/* BCS Disclaimers */}
          <div className="rounded-lg border-l-4 border-l-[--status-info] bg-[--status-info-bg] p-4">
            <p className="text-sm font-medium text-[--gray-800]">{t('result.disclaimerTitle')}</p>
            <p className="mt-1 text-sm text-[--gray-600]">{t('result.disclaimerBody')}</p>
          </div>

          {/* Share */}
          <div className="rounded-lg border border-[--gray-200] p-4">
            <p className="mb-2 text-sm font-semibold text-[--gray-800]">
              {t('shareCta.title', { name: petName })}
            </p>
            <ShareButtons url={shareUrl} title={t('shareCta.title', { name: petName })} />
          </div>
        </>
      ) : null}
    </div>
  );
}

const BCS_OPTIONS = [
  { score: 1, labelKey: 'bcsOptions.1' },
  { score: 2, labelKey: 'bcsOptions.2' },
  { score: 3, labelKey: 'bcsOptions.3' },
  { score: 4, labelKey: 'bcsOptions.4' },
  { score: 5, labelKey: 'bcsOptions.5' },
  { score: 6, labelKey: 'bcsOptions.6' },
  { score: 7, labelKey: 'bcsOptions.7' },
  { score: 8, labelKey: 'bcsOptions.8' },
  { score: 9, labelKey: 'bcsOptions.9' },
];
