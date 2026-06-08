'use client';
import { useTranslations } from 'next-intl';
import { useBARF } from '@/hooks/useBARF';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SpeciesToggle } from '@/components/shared/SpeciesToggle';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { ResultSection } from '@/components/shared/ResultSection';

export function BARFWidget() {
  const t = useTranslations('barf');
  const { species, targetWeightKg, dailyFeedingPercentage, result, error, setSpecies, setWeight, setPercentage, calculate } =
    useBARF();

  return (
    <div className="flex flex-col gap-6">
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <SpeciesToggle
            value={species}
            onChange={(v) => setSpecies(v as 'dog' | 'cat')}
          />

          <Input
            label={t('form.weightLabel')}
            type="number"
            min={0.1}
            step={0.1}
            value={targetWeightKg}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.percentageLabel')}</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={dailyFeedingPercentage * 100}
                onChange={(e) => setPercentage(parseFloat(e.target.value) / 100)}
                className="flex-1 accent-[--brand-teal]"
                aria-label={t('form.percentageLabel')}
              />
              <span className="w-14 text-right text-sm font-mono text-[--gray-700]">
                {(dailyFeedingPercentage * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-[--gray-500]">{t('form.percentageHint')}</p>
          </div>

          {error ? <p className="text-sm text-[--status-toxic]">{error}</p> : null}

          <Button onClick={calculate} variant="primary">
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {result ? (
        <>
          <ResultSection
            title={t('result.total')}
            value={`${result.totalG} g`}
            resultSlot={
              <div className="flex flex-col gap-2 text-sm text-[--gray-700]">
                <div className="flex justify-between border-b border-[--gray-100] py-1">
                  <span>{t('result.muscleMeat')}</span>
                  <span className="font-mono font-semibold">{result.muscleMeatG} g</span>
                </div>
                <div className="flex justify-between border-b border-[--gray-100] py-1">
                  <span>{t('result.bone')}</span>
                  <span className="font-mono font-semibold">{result.rawMeatyBoneG} g</span>
                </div>
                <div className="flex justify-between border-b border-[--gray-100] py-1">
                  <span>{t('result.liver')}</span>
                  <span className="font-mono font-semibold">{result.liverG} g</span>
                </div>
                <div className="flex justify-between border-b border-[--gray-100] py-1">
                  <span>{t('result.organ')}</span>
                  <span className="font-mono font-semibold">{result.secretingOrganG} g</span>
                </div>
                {result.vegetablesG !== null ? (
                  <div className="flex justify-between border-b border-[--gray-100] py-1">
                    <span>{t('result.vegetables')}</span>
                    <span className="font-mono font-semibold">{result.vegetablesG} g</span>
                  </div>
                ) : null}
              </div>
            }
            footerSlot={
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[--gray-500]">
                  {t('result.shoppingNote')}
                </p>
                <button
                  disabled
                  aria-disabled="true"
                  className="opacity-50 cursor-not-allowed rounded-lg border border-[--gray-300] px-4 py-2 text-sm font-medium text-[--gray-500]"
                >
                  {t('pdfExport.comingSoon')}
                </button>
                <AffiliateBanner variant="pdf_upsell" />
              </div>
            }
          />
          <AdviceNote />
        </>
      ) : null}
    </div>
  );
}

function AdviceNote() {
  const t = useTranslations('barf');
  return (
    <Card padding="md" className="!bg-[--status-info-bg]">
      <p className="text-sm text-[--status-info]">{t('adviceNote')}</p>
    </Card>
  );
}
