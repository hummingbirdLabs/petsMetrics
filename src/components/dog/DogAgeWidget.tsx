'use client';
import { useTranslations } from 'next-intl';
import { useDogAge } from '@/hooks/useDogAge';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';
import type { SizeClass } from '@/types/profile.types';
import type { DogLifeStage } from '@/lib/calculators/dog-age.calc';
import { calculateDogAge } from '@/lib/calculators/dog-age.calc';

const SIZE_OPTIONS: { value: SizeClass; key: string; descKey: string }[] = [
  { value: 'small', key: 'sizeSmall', descKey: 'sizeSmallDesc' },
  { value: 'medium', key: 'sizeMedium', descKey: 'sizeMediumDesc' },
  { value: 'large', key: 'sizeLarge', descKey: 'sizeLargeDesc' },
  { value: 'giant', key: 'sizeGiant', descKey: 'sizeGiantDesc' },
];

const COMPARISON_AGES = [
  { key: 'row1', years: 1 },
  { key: 'row2', years: 2 },
  { key: 'row3', years: 3 },
  { key: 'row4', years: 4 },
  { key: 'row5', years: 5 },
  { key: 'row7', years: 7 },
  { key: 'row10', years: 10 },
  { key: 'row15', years: 15 },
];

const SIZE_CLASSES: SizeClass[] = ['small', 'medium', 'large', 'giant'];

const LIFESTAGE_I18N_MAP: Record<DogLifeStage, string> = {
  puppy: 'lifeStage.puppy',
  junior: 'lifeStage.junior',
  adult: 'lifeStage.adult',
  mature: 'lifeStage.mature',
  senior: 'lifeStage.senior',
  geriatric: 'lifeStage.geriatric',
};

function getHumanAge(year: number, size: SizeClass): number {
  const res = calculateDogAge({ actualAgeYears: year, sizeClass: size });
  return res.ok ? res.data.humanAgeEquivalent : 0;
}

export function DogAgeWidget() {
  const t = useTranslations('dogAge');
  const { activeProfile: profile } = useProfile();
  const {
    ageYears,
    ageMonths,
    sizeClass,
    result,
    error,
    setAgeYears,
    setAgeMonths,
    setSizeClass,
    calculate,
    stageColor,
  } = useDogAge();
  const pageUrl = usePageUrlBuilder();

  const shareUrl = SITE_URL + pageUrl('dog/age-calculator').slice(0, -1);
  const petName = profile?.name ?? 'Buddy';
  const stageName = result ? t(LIFESTAGE_I18N_MAP[result.lifeStage]) : '';

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5" data-testid="dog-age-form">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.ageLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0}
                step={1}
                value={ageYears}
                onChange={(e) => setAgeYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.years')}
                data-testid="dog-age-years-input"
              />
              <span className="text-sm text-[--gray-500]">{t('form.years')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[--gray-500]">{t('form.monthsOptional')}</span>
              <Input
                label=""
                type="number"
                min={0}
                max={11}
                step={1}
                value={ageMonths}
                onChange={(e) => setAgeMonths(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                className="w-16"
                aria-label={t('form.months')}
                data-testid="dog-age-months-input"
              />
              <span className="text-xs text-[--gray-500]">{t('form.months')}</span>
            </div>
          </div>

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
                    name="dogSize"
                    value={opt.value}
                    checked={sizeClass === opt.value}
                    onChange={() => setSizeClass(opt.value)}
                    className="sr-only"
                    data-testid={`dog-size-${opt.value}`}
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

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto" data-testid="dog-age-submit">
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <div
          className="rounded-xl border-l-4 bg-[--dog-surface]"
          style={{ borderLeftColor: stageColor ?? 'var(--dog-primary)' }}
          data-testid="dog-age-result"
        >
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-[--gray-900] font-mono tracking-tight" data-testid="dog-age-human-equivalent">
                ~{result.humanAgeEquivalent}
              </span>
              <span className="text-xl text-[--gray-500]">human years</span>
            </div>

            <p className="text-sm text-[--gray-600]">
              {t('result.equivalent', { name: petName, age: result.humanAgeEquivalent, stageName: stageName.split(' — ')[1] || stageName })}
            </p>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-[--gray-500]">{t('result.formulaSource')}</p>
              <p className="text-xs text-[--gray-400]">{t('result.not7xRule')}</p>
            </div>

            {/* Life Stage Card */}
            <div className="rounded-lg bg-[--dog-primary-light] p-4 border border-[--dog-primary]/20">
              <h4 className="text-sm font-semibold text-[--gray-900]">
                {t('lifeStage.cardTitle', { stage: stageName.split(' — ')[0] || result.lifeStage, stageName: stageName.split(' — ')[1] || stageName })}
              </h4>
              <p className="mt-1 text-sm text-[--gray-600]">{t(LIFESTAGE_I18N_MAP[result.lifeStage])}</p>
              <div className="mt-3">
                <p className="text-xs font-medium text-[--gray-700]">{t('lifeStage.healthPriorities')}</p>
                <ul className="mt-1 flex flex-col gap-0.5 text-xs text-[--gray-600]">
                  <li>· {t('lifeStage.vetVisit')}</li>
                  <li>· {t('lifeStage.dental')}</li>
                  <li>· {t('lifeStage.weight')}</li>
                  <li>· {t('lifeStage.parasite')}</li>
                </ul>
              </div>
            </div>

            {/* Share CTA */}
            <div className="rounded-lg border border-[--gray-200] p-4">
              <p className="mb-2 text-sm font-semibold text-[--gray-800]">
                {t('shareCta.title', { name: petName, age: result.humanAgeEquivalent })}
              </p>
              <ShareButtons url={shareUrl} title={t('shareCta.title', { name: petName, age: result.humanAgeEquivalent })} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Comparison Table */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-[--gray-900]">{t('comparisonTable.title')}</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--gray-200]">
                <th className="py-2 text-left font-medium text-[--gray-500]">{t('comparisonTable.dogAge')}</th>
                {SIZE_CLASSES.map((s) => (
                  <th key={s} className={`py-2 text-center font-medium ${s === sizeClass ? 'text-[--dog-primary]' : 'text-[--gray-500]'}`}>
                    {t(`comparisonTable.${s}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_AGES.map((row) => {
                const isHighlight =
                  result != null &&
                  row.years === Math.max(1, Math.round(ageYears + ageMonths / 12));
                return (
                  <tr
                    key={row.key}
                    className={`border-b border-[--gray-100] last:border-b-0 ${
                      isHighlight ? 'bg-[--dog-primary-light]' : ''
                    }`}
                  >
                    <td className="py-2 text-[--gray-700]">{t(`comparisonTable.${row.key}`)}</td>
                    {SIZE_CLASSES.map((s) => {
                      const val = getHumanAge(row.years, s);
                      return (
                        <td
                          key={s}
                          className={`py-2 text-center font-mono ${s === sizeClass ? 'font-semibold text-[--dog-primary]' : 'text-[--gray-600]'}`}
                        >
                          {val}
                        </td>
                      );
                    })}
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-[--gray-400]">{t('comparisonTable.footnote')}</p>
      </Card>

      {/* Science Section */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-[--gray-900]">{t('scienceSection.title')}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[--gray-600]">{t('scienceSection.body')}</p>
        <a
          href="https://www.aaha.org/aaha-guidelines/life-stage-canine-2024/life-stage-canine-2024/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-sm font-medium text-[--brand-teal] hover:underline"
        >
          {t('scienceSection.aaGuidelines')} →
        </a>
      </Card>
    </div>
  );
}
