'use client';
import { useTranslations } from 'next-intl';
import { useEUTravel } from '@/hooks/useEUTravel';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SpeciesToggle } from '@/components/shared/SpeciesToggle';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';
import { EU_COUNTRY_CODES, EU_COUNTRY_LABELS } from '@/lib/data/eu-travel-rules';

const COUNTRY_FLAGS: Record<string, string> = {
  AT: '🇦🇹', BE: '🇧🇪', BG: '🇧🇬', HR: '🇭🇷', CY: '🇨🇾',
  CZ: '🇨🇿', DK: '🇩🇰', EE: '🇪🇪', FI: '🇫🇮', FR: '🇫🇷',
  DE: '🇩🇪', GR: '🇬🇷', HU: '🇭🇺', IE: '🇮🇪', IT: '🇮🇹',
  LV: '🇱🇻', LT: '🇱🇹', LU: '🇱🇺', MT: '🇲🇹', NL: '🇳🇱',
  PL: '🇵🇱', PT: '🇵🇹', RO: '🇷🇴', SK: '🇸🇰', SI: '🇸🇮',
  ES: '🇪🇸', SE: '🇸🇪', GB: '🇬🇧', NO: '🇳🇴', IS: '🇮🇸',
  LI: '🇱🇮', CH: '🇨🇭',
};

const ALL_DOC_IDS = [
  'microchip',
  'rabies-vaccination',
  'eu-pet-passport',
  'rabies-antibody-titer',
  'tapeworm-treatment',
  'health-certificate-non-eu',
  'min-age-rabies',
  'max-pets-limit',
  'teip-entry-point',
  'uk-specific-docs',
  'nordic-immunity-zone',
];

export function EUTravelWidget() {
  const t = useTranslations('euTravel');
  const {
    species,
    originCountry,
    destinationCountry,
    existingDocuments,
    result,
    errorCode,
    setSpecies,
    setOriginCountry,
    setDestinationCountry,
    toggleDocument,
    calculate,
  } = useEUTravel();
  const pageUrl = usePageUrlBuilder();

  const shareUrl = SITE_URL + pageUrl('shared/eu-pet-travel-checker').slice(0, -1);

  return (
    <div className="flex flex-col gap-6">
      {/* Input Form */}
      <Card padding="lg">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-[--gray-900]">{t('form.title')}</h2>

          {/* Species */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.speciesLabel')}</label>
            <SpeciesToggle value={species} onChange={setSpecies} />
          </div>

          {/* Origin Country */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.originLabel')}</label>
            <select
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className="rounded-lg border border-[--gray-300] bg-white px-3 py-2.5 text-sm text-[--gray-900] focus:border-[--status-info] focus:outline-none focus:ring-1 focus:ring-[--status-info]"
              aria-label={t('form.originLabel')}
            >
              <option value="">{t('form.selectCountry')}</option>
              {EU_COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {COUNTRY_FLAGS[code]} {EU_COUNTRY_LABELS[code]}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Country */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.destinationLabel')}</label>
            <select
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              className="rounded-lg border border-[--gray-300] bg-white px-3 py-2.5 text-sm text-[--gray-900] focus:border-[--status-info] focus:outline-none focus:ring-1 focus:ring-[--status-info]"
              aria-label={t('form.destinationLabel')}
            >
              <option value="">{t('form.selectCountry')}</option>
              {EU_COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {COUNTRY_FLAGS[code]} {EU_COUNTRY_LABELS[code]}
                </option>
              ))}
            </select>
          </div>

          {/* Existing Documents */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[--gray-700]">{t('form.documentsLabel')}</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ALL_DOC_IDS.map((docId) => (
                <label
                  key={docId}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    existingDocuments.includes(docId)
                      ? 'border-[--status-safe] bg-[--status-safe-bg]'
                      : 'border-[--gray-200] hover:border-[--gray-300]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={existingDocuments.includes(docId)}
                    onChange={() => toggleDocument(docId)}
                    className="h-4 w-4 rounded accent-[--status-safe]"
                  />
                  <span className="text-[--gray-700]">{t(`documents.${docId}`)}</span>
                </label>
              ))}
            </div>
          </div>

          {errorCode ? (
            <p className="text-sm text-[--status-toxic]" role="alert">{t(`errors.${errorCode}`)}</p>
          ) : null}

          <Button variant="primary" onClick={calculate} className="w-full sm:w-auto">
            {t('form.submit')}
          </Button>
        </div>
      </Card>

      {/* Result */}
      {result ? (
        <>
          {/* Summary Header */}
          <div
            className={`rounded-xl border-l-4 p-6 ${
              result.isReadyToTravel ? 'border-l-[--status-safe]' : 'border-l-[--status-toxic]'
            }`}
            style={{
              backgroundColor: result.isReadyToTravel ? 'var(--status-safe-bg)' : 'var(--status-toxic-bg)',
            }}
          >
            <div className="flex flex-col gap-2">
              <p
                className="text-lg font-bold"
                style={{ color: result.isReadyToTravel ? 'var(--status-safe)' : 'var(--status-toxic)' }}
              >
                {result.isReadyToTravel ? t('result.readyToTravel') : t('result.notReady')}
              </p>
              <p className="text-sm text-[--gray-600]">
                {t('result.requirementsSummary', { satisfied: result.satisfied.length, missing: result.missing.length })}
              </p>
              {result.totalLeadTimeDays > 0 ? (
                <div className="mt-1 rounded-md bg-white/60 px-3 py-2">
                  <p className="text-sm font-semibold text-[--gray-800]">
                    {t('result.leadTimeWarning', { days: result.totalLeadTimeDays })}
                  </p>
                  <p className="text-xs text-[--gray-500]">{t('result.leadTimeHint')}</p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Satisfied Requirements */}
          {result.satisfied.length > 0 ? (
            <Card padding="lg">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[--status-safe]">{t('result.satisfied')} ({result.satisfied.length})</p>
                {result.satisfied.map(({ requirement }) => (
                  <div key={requirement.id} className="flex items-start gap-3 rounded-lg border border-[--status-safe]/20 bg-[--status-safe-bg] p-3">
                    <span className="mt-0.5 text-base" aria-hidden="true">✅</span>
                    <div>
                      <p className="text-sm font-medium text-[--gray-800]">{requirement.name}</p>
                      <p className="text-xs text-[--gray-500]">{requirement.description}</p>
                      <a
                        href={requirement.officialSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-[--status-info] underline hover:opacity-80"
                      >
                        {t('result.officialSource')} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {/* Missing Requirements */}
          {result.missing.length > 0 ? (
            <Card padding="lg">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-[--status-toxic]">{t('result.missing')} ({result.missing.length})</p>
                {result.missing.map(({ requirement, leadTimeDays }) => (
                  <div key={requirement.id} className="flex items-start gap-3 rounded-lg border border-[--status-toxic]/20 bg-[--status-toxic-bg] p-3">
                    <span className="mt-0.5 text-base" aria-hidden="true">❌</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[--gray-800]">{requirement.name}</p>
                      <p className="text-xs text-[--gray-600]">{requirement.description}</p>
                      {leadTimeDays !== null ? (
                        <p className="mt-1 text-xs font-medium text-[--status-toxic]">
                          {t('result.leadTime', { days: leadTimeDays })}
                        </p>
                      ) : null}
                      <a
                        href={requirement.officialSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-[--status-info] underline hover:opacity-80"
                      >
                        {t('result.officialSource')} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {/* Share */}
          <div className="rounded-lg border border-[--gray-200] p-4">
            <p className="mb-2 text-sm font-semibold text-[--gray-800]">
              {t('shareCta.title')}
            </p>
            <ShareButtons url={shareUrl} title={t('shareCta.title')} />
          </div>
        </>
      ) : null}
    </div>
  );
}
