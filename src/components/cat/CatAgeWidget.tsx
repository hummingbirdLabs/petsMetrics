'use client';
import { useTranslations } from 'next-intl';
import { useCatAge } from '@/hooks/useCatAge';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';
import type { CatLifeStage } from '@/lib/calculators/cat-age.calc';

const LIFESTAGE_I18N_MAP: Record<CatLifeStage, string> = {
  kitten: 'lifeStage.kitten',
  junior: 'lifeStage.junior',
  prime: 'lifeStage.prime',
  mature: 'lifeStage.mature',
  senior: 'lifeStage.senior',
  geriatric: 'lifeStage.geriatric',
};

export function CatAgeWidget() {
  const t = useTranslations('catAge');
  const { activeProfile: profile } = useProfile();
  const {
    ageMonths,
    result,
    error,
    comparisonData,
    setAgeMonths,
    calculate,
    stageColor,
  } = useCatAge();
  const pageUrl = usePageUrlBuilder();

  const shareUrl = SITE_URL + pageUrl('cat/age-calculator').slice(0, -1);
  const petName = profile?.name ?? '—';
  const stageName = result ? t(LIFESTAGE_I18N_MAP[result.lifeStage]) : '';

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.ageMonthsLabel')}</label>
            <div className="flex items-center gap-2">
              <Input
                label=""
                type="number"
                min={0}
                step={1}
                value={ageMonths}
                onChange={(e) => setAgeMonths(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24"
                aria-label={t('form.months')}
              />
              <span className="text-sm text-[--gray-500]">{t('form.months')}</span>
            </div>
            <p className="text-xs text-[--gray-400]">{t('form.monthsHint')}</p>
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
          <div
            className="rounded-xl border-l-4 bg-[--cat-surface]"
            style={{ borderLeftColor: stageColor ?? 'var(--cat-primary)' }}
          >
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-[--gray-900] font-mono tracking-tight">
                  ~{result.humanAgeEquivalent}
                </span>
                <span className="text-xl text-[--gray-500]">human years</span>
              </div>

              <p className="text-sm text-[--gray-600]">
                {t('result.equivalent', { name: petName, age: result.humanAgeEquivalent })}
              </p>

              <div className="flex flex-col gap-1">
                <p className="text-xs text-[--gray-500]">{t('result.source')}</p>
              </div>
            </div>
          </div>

          {/* Life Stage Card */}
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-[--gray-900]">{t('result.lifeStage')}</h3>
            <div className="mt-3 rounded-lg bg-[--cat-primary-light] p-4 border border-[--cat-primary]/20">
              <h4 className="text-sm font-semibold text-[--gray-900]">
                {stageName.split(' — ')[0] || result.lifeStage}
              </h4>
              <p className="mt-1 text-sm text-[--gray-600]">{t(LIFESTAGE_I18N_MAP[result.lifeStage])}</p>
              <p className="mt-2 text-sm text-[--gray-700]">
                {t('result.checkupFrequency')}: {result.recommendedCheckupFrequency}
              </p>
            </div>
          </Card>

          {/* Comparison Table */}
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-[--gray-900]">{t('comparisonTable.title')}</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[--gray-200]">
                    <th className="py-2 text-left font-medium text-[--gray-500]">{t('comparisonTable.catAge')}</th>
                    <th className="py-2 text-left font-medium text-[--gray-500]">{t('comparisonTable.humanAge')}</th>
                    <th className="py-2 text-left font-medium text-[--gray-500]">{t('comparisonTable.lifeStage')}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => {
                    const isHighlight =
                      result != null &&
                      Math.abs(row.months - ageMonths) <= 3; // within 3 months
                    return (
                      <tr
                        key={row.key}
                        className={`border-b border-[--gray-100] last:border-b-0 ${
                          isHighlight ? 'bg-[--cat-primary-light]' : ''
                        }`}
                      >
                        <td className={`py-2 ${isHighlight ? 'font-semibold text-[--cat-primary]' : 'text-[--gray-700]'}`}>
                          {row.key}
                        </td>
                        <td className={`py-2 font-mono ${isHighlight ? 'font-semibold text-[--cat-primary]' : 'text-[--gray-600]'}`}>
                          {row.humanAge}
                        </td>
                        <td className={`py-2 ${isHighlight ? 'text-[--cat-primary]' : 'text-[--gray-500]'}`}>
                          {row.stage}
                        </td>
                      </tr>
                    );
                  })}
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
              href="https://catfriendly.com/life-stages/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-medium text-[--cat-primary] hover:underline"
            >
              {t('scienceSection.aafpGuidelines')} →
            </a>
          </Card>

          {/* Share CTA */}
          <div className="rounded-lg border border-[--gray-200] p-4">
            <p className="mb-2 text-sm font-semibold text-[--gray-800]">
              {t('shareCta.title', { name: petName, age: result.humanAgeEquivalent })}
            </p>
            <ShareButtons url={shareUrl} title={t('shareCta.title', { name: petName, age: result.humanAgeEquivalent })} />
          </div>
        </>
      ) : null}
    </div>
  );
}
