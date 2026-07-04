'use client';
import { useTranslations } from 'next-intl';
import { useDogCalorie, ACTIVITY_SCENARIO_LABELS } from '@/hooks/useDogCalorie';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Divider } from '@/components/ui/Divider';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import type { ActivityScenario } from '@/constants/calorie.constants';

const SCENARIO_I18N_MAP: Record<ActivityScenario, string> = {
  puppy_under_4m: 'form.puppyUnder4m',
  puppy_over_4m: 'form.puppyOver4m',
  neutered_adult: 'form.neuteredAdult',
  intact_adult: 'form.intactAdult',
  weight_loss: 'form.weightLoss',
  working_dog: 'form.workingDog',
};

export function DogCalorieWidget() {
  const t = useTranslations('dogCalorie');
  const tc = useTranslations('common');
  const { activeProfile: profile } = useProfile();
  const {
    weightKg,
    activityScenario,
    foodCalorieDensity,
    result,
    error,
    setWeight,
    setActivityScenario,
    setFoodCalorieDensity,
    calculate,
  } = useDogCalorie();

  const petName = profile?.name ?? '—';

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          {/* Step 1 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--gray-500]">
              {t('form.step1Title', { name: petName })}
            </p>
          </div>

          <Input
            label={t('form.weightLabel')}
            type="number"
            min={0}
            step={0.1}
            value={weightKg}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            aria-label={t('form.weightLabel')}
          />

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[--gray-700]">{t('form.scenarioLabel')}</span>
            <div className="rounded-lg border border-[--gray-200] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {ACTIVITY_SCENARIO_LABELS.map(({ key, factor }) => (
                    <tr
                      key={key}
                      className={`cursor-pointer border-b border-[--gray-100] last:border-b-0 transition-colors hover:bg-[--gray-50] ${
                        activityScenario === key ? 'bg-[--dog-primary-light]' : ''
                      }`}
                      onClick={() => setActivityScenario(key)}
                    >
                      <td className="flex items-center gap-2 px-3 py-2">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            activityScenario === key
                              ? 'border-[--dog-primary] bg-[--dog-primary]'
                              : 'border-[--gray-300]'
                          }`}
                        >
                          {activityScenario === key ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          ) : null}
                        </span>
                        <span className="text-[--gray-700]">{t(SCENARIO_I18N_MAP[key])}</span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-[--gray-500]">
                        {t('form.coefficient')} {factor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          {/* Step 2 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--gray-500]">
              {t('form.step2Title')}
            </p>
          </div>

          <Input
            label={t('form.foodDensityLabel')}
            type="number"
            min={0}
            step={1}
            placeholder={t('form.foodDensityPlaceholder')}
            value={foodCalorieDensity}
            onChange={(e) => setFoodCalorieDensity(e.target.value)}
            aria-label={t('form.foodDensityLabel')}
          />
          <p className="-mt-3 text-xs text-[--gray-400]">{t('form.foodDensityHint')}</p>

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
        <div className="rounded-xl border-l-4 bg-[--dog-surface]" style={{ borderLeftColor: 'var(--dog-primary)' }}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-[--gray-500]">{t('result.dailyCalories', { name: petName })}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[--gray-900] font-mono tracking-tight">
                  {result.mer.toLocaleString()}
                </span>
                <span className="text-xl text-[--gray-500]">{tc('common.unit.kcal')} / day</span>
              </div>
            </div>

            <Divider />

            <div>
              <p className="text-xs font-medium text-[--gray-700]">{t('result.howCalculated')}</p>
              <div className="mt-2 flex flex-col gap-1 font-mono text-sm">
                <p className="text-[--gray-500]">
                  RER = 70 × ({weightKg} kg)<sup>0.75</sup> = {result.rer} kcal/day
                </p>
                <p className="font-semibold text-[--gray-900]">
                  MER = {result.rer} × {result.activityFactor} ({t(SCENARIO_I18N_MAP[activityScenario]).toLowerCase()}) = {result.mer} kcal/day
                </p>
              </div>
              <p className="mt-2 text-xs text-[--gray-400]">{t('result.source')}</p>
            </div>

            {result.dailyFoodGrams !== null ? (
              <>
                <Divider />
                <div>
                  <p className="text-sm text-[--gray-600]">
                    {t('result.foodSection', { density: parseInt(foodCalorieDensity) || 0 })}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[--gray-900] font-mono">
                    {result.dailyFoodGrams} g / day
                  </p>
                  <p className="text-xs text-[--gray-500]">
                    {t('result.cupsEquivalent', { cups: Math.round((result.dailyFoodGrams / 150) * 10) / 10 })}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-[--gray-700]">{t('result.feedingBreakdown')}</p>
                    <div className="mt-1 flex gap-4 text-sm text-[--gray-600]">
                      <span>{t('result.morning', { grams: Math.round(result.dailyFoodGrams / 2), cups: Math.round((result.dailyFoodGrams / 2 / 150) * 10) / 10 })}</span>
                      <span>{t('result.evening', { grams: Math.round(result.dailyFoodGrams / 2), cups: Math.round((result.dailyFoodGrams / 2 / 150) * 10) / 10 })}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <AffiliateBanner variant="food" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
