'use client';
import { useTranslations } from 'next-intl';
import { useInsurance } from '@/hooks/useInsurance';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SpeciesToggle } from '@/components/shared/SpeciesToggle';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { DOG_BREED_RATES, CAT_BREED_RATES, US_STATE_REGIONS } from '@/lib/data/insurance-data';
import type { ProviderEstimate } from '@/lib/calculators/insurance.calc';

function rangeStr(low: number, high: number) {
  return `$${low}–$${high}/mo`;
}

export function InsuranceWidget() {
  const t = useTranslations('insurance');
  const { species, breed, age, region, result, error, setSpecies, setBreed, setAge, setRegion, calculate } =
    useInsurance();

  const breeds = species === 'dog' ? DOG_BREED_RATES : CAT_BREED_RATES;
  const states = Object.keys(US_STATE_REGIONS).sort();

  return (
    <div className="flex flex-col gap-6">
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <SpeciesToggle value={species} onChange={(v) => setSpecies(v as 'dog' | 'cat')} />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.breedLabel')}</label>
            <select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="rounded-lg border border-[--gray-300] bg-white px-3 py-2 text-sm text-[--gray-900]"
              aria-label={t('form.breedLabel')}
            >
              {breeds.map((b) => (
                <option key={b.breed} value={b.breed}>{b.breed}</option>
              ))}
            </select>
          </div>

          <Input
            label={t('form.ageLabel')}
            type="number"
            min={0}
            max={25}
            step={1}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.regionLabel')}</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-lg border border-[--gray-300] bg-white px-3 py-2 text-sm text-[--gray-900]"
              aria-label={t('form.regionLabel')}
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {error ? <p className="text-sm text-[--status-toxic]">{error}</p> : null}

          <Button onClick={calculate} variant="primary">
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {result ? (
        <>
          <Card padding="lg">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-medium text-[--gray-500]">{t('result.estimatedRange')}</h3>
              <p className="text-3xl font-bold font-mono text-[--gray-900]">
                {rangeStr(result.monthlyRange.low, result.monthlyRange.high)}
              </p>
              <p className="text-sm text-[--gray-500]">{t('result.disclaimer')}</p>
              {result.ageWarning ? (
                <div className="rounded-lg bg-[--status-caution-bg] p-3 text-sm text-[--status-caution]">
                  {result.ageWarning}
                </div>
              ) : null}
            </div>
          </Card>

          <h3 className="text-lg font-semibold text-[--gray-900]">{t('result.providersTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.providers.map((p) => (
              <ProviderCard key={p.id} provider={p} t={t} />
            ))}
          </div>

          <AffiliateBanner variant="insurance" />
          <DisclaimerSection />
        </>
      ) : null}
    </div>
  );
}

function ProviderCard({ provider, t }: { provider: ProviderEstimate; t: ReturnType<typeof useTranslations<'insurance'>> }) {
  return (
    <Card padding="md" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-[--gray-900]">{provider.name}</h4>
        <span className="text-sm font-mono font-bold text-[--brand-teal]">
          {rangeStr(provider.lowEstimate, provider.highEstimate)}
        </span>
      </div>
      <ul className="flex flex-col gap-1 text-xs text-[--gray-500]">
        {provider.features.map((f) => (
          <li key={f} className="flex items-start gap-1">
            <span className="mt-0.5 shrink-0 text-[--brand-teal]">&#10003;</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-4 text-xs text-[--gray-500]">
        <span>{t('result.deductible')}: {provider.annualDeductibleRange}</span>
        <span>{t('result.reimburse')}: {provider.reimbursementRate}</span>
      </div>
      <a
        href={provider.url}
        className="text-xs font-medium text-[--brand-teal] hover:underline"
        rel="sponsored nofollow"
        target="_blank"
      >
        {t('result.getQuote')} &rarr; <span className="text-[--gray-400]">(Sponsored)</span>
      </a>
    </Card>
  );
}
