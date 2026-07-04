'use client';
import { useTranslations } from 'next-intl';
import { useToxicChecker } from '@/hooks/useToxicChecker';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SpeciesToggle } from '@/components/shared/SpeciesToggle';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { SITE_URL } from '@/constants';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

const LEVEL_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  toxic: {
    label: 'TOXIC',
    bg: 'var(--status-toxic-bg)',
    text: 'var(--status-toxic)',
    border: 'var(--status-toxic)',
  },
  caution: {
    label: 'CAUTION',
    bg: 'var(--status-caution-bg)',
    text: 'var(--status-caution)',
    border: 'var(--status-caution)',
  },
  safe: {
    label: 'SAFE',
    bg: 'var(--status-safe-bg)',
    text: 'var(--status-safe)',
    border: 'var(--status-safe)',
  },
};

const POPULAR_SEARCHES = ['grapes', 'chocolate', 'avocado', 'onion', 'xylitol', 'lilies', 'garlic', 'macadamia', 'raisins', 'almonds'];

export function ToxicCheckerWidget() {
  const t = useTranslations('toxicChecker');
  const {
    query,
    species,
    items,
    exactMatch,
    emptyQuery,
    loading,
    setQuery,
    setSpecies,
    clearQuery,
    getSpeciesLevel,
  } = useToxicChecker();
  const pageUrl = usePageUrlBuilder();

  const shareUrl = SITE_URL + pageUrl('shared/toxic-checker').slice(0, -1);
  const primaryItem = exactMatch ?? (items.length > 0 ? items[0] : null);
  const primaryLevel = primaryItem ? getSpeciesLevel(primaryItem, species) : null;
  const levelCfg = primaryLevel ? LEVEL_CONFIG[primaryLevel] : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Species Toggle */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-[--gray-700]">{t('form.speciesLabel')}</span>
        <SpeciesToggle value={species} onChange={setSpecies} />
      </div>

      {/* Search Input */}
      <Card padding="lg">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[--gray-700]">{t('form.searchLabel')}</label>
          <div className="relative">
            <Input
              label=""
              type="text"
              placeholder={t('form.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 text-lg"
              aria-label={t('form.searchLabel')}
              data-testid="toxic-search-input"
            />
            {query ? (
              <button
                type="button"
                onClick={clearQuery}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[--gray-400] hover:text-[--gray-600]"
                aria-label={t('form.clear')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </Card>

      {/* Loading Indicator */}
      {loading ? (
        <div className="rounded-lg border border-[--gray-200] bg-[--gray-50] p-6 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[--gray-300] border-t-[--status-info]" />
          <p className="mt-2 text-sm text-[--gray-500]">{t('searching')}</p>
        </div>
      ) : null}

      {/* Empty State */}
      {!loading && emptyQuery ? (
        <Card padding="lg">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="5" stroke="var(--gray-400)" strokeWidth="1.5" />
                <path d="M13 13L17 17" stroke="var(--gray-400)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-[--gray-500]">{t('emptyState')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium text-[--gray-500]">{t('popularSearches')}</span>
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-[--gray-200] px-2.5 py-1 text-xs text-[--gray-600] transition-colors hover:border-[--status-info] hover:text-[--status-info]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Card>
      ) : null}

      {/* No Results */}
      {!loading && !emptyQuery && items.length === 0 ? (
        <Card padding="lg">
          <p className="text-sm text-[--gray-500]">{t('noResults')}</p>
        </Card>
      ) : null}

      {/* Primary Result Card */}
      {!loading && primaryItem && levelCfg ? (
        <div
          className="overflow-hidden rounded-xl border-l-4"
          style={{ borderLeftColor: levelCfg.border }}
        >
          {/* Header */}
          <div className="p-6" style={{ backgroundColor: levelCfg.bg }}>
            <div className="flex flex-col gap-3">
              <span
                className="inline-block w-fit rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: levelCfg.text, color: 'var(--white)' }}
                data-testid="toxic-result-badge"
              >
                {levelCfg.label}
              </span>
              <h2 className="text-2xl font-bold text-[--gray-900]">{primaryItem.name}</h2>
              <p className="text-sm text-[--gray-500]">
                {t('affectedSpecies')}: {primaryItem.species === 'both' ? '🐕 Dogs & 🐱 Cats' : primaryItem.species === 'dog' ? '🐕 Dogs' : '🐱 Cats'}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 border-t border-[--gray-200] bg-white p-6">
            {/* Danger / Safety Message */}
            {primaryLevel === 'toxic' ? (
              <div className="rounded-lg border-l-4 border-l-[--status-toxic] bg-[--status-toxic-bg] p-4">
                <p className="text-sm font-bold text-[--status-toxic]">{t('result.toxicHeader')}</p>
                {primaryItem.emergencyNote ? (
                  <p className="mt-1 text-sm text-[--gray-700]">{primaryItem.emergencyNote}</p>
                ) : null}
              </div>
            ) : primaryLevel === 'caution' ? (
              <div className="rounded-lg border-l-4 border-l-[--status-caution] bg-[--status-caution-bg] p-4">
                <p className="text-sm font-bold text-[--status-caution]">{t('result.cautionHeader')}</p>
                {primaryItem.safeAmount ? (
                  <p className="mt-1 text-sm text-[--gray-700]">{t('result.safeAmount')}: {primaryItem.safeAmount}</p>
                ) : null}
              </div>
            ) : (
              <div className="rounded-lg border-l-4 border-l-[--status-safe] bg-[--status-safe-bg] p-4">
                <p className="text-sm font-bold text-[--status-safe]">{t('result.safeHeader')}</p>
              </div>
            )}

            {/* Symptoms */}
            {primaryItem.symptoms.length > 0 ? (
              <div>
                <p className="text-sm font-semibold text-[--gray-800]">{t('result.symptoms')}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {primaryItem.symptoms.map((symptom) => (
                    <li key={symptom} className="rounded-md bg-[--gray-100] px-2.5 py-1 text-xs text-[--gray-700]">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Safe Amount */}
            {!primaryLevel || primaryLevel !== 'toxic' ? (
              primaryItem.safeAmount ? (
                <div className="rounded-lg border border-[--gray-200] bg-[--gray-50] p-3">
                  <p className="text-sm">
                    <span className="font-medium text-[--gray-700]">{t('result.safeAmountLabel')}:</span>{' '}
                    <span className="text-[--gray-600]">{primaryItem.safeAmount}</span>
                  </p>
                </div>
              ) : null
            ) : null}

            {/* Emergency Section (for toxic items only) */}
            {primaryLevel === 'toxic' ? (
              <div className="rounded-lg border-2 border-[--status-toxic] bg-[--status-toxic-bg] p-4">
                <p className="text-sm font-bold text-[--status-toxic]">{t('result.emergencyTitle')}</p>
                <p className="mt-1 text-sm text-[--gray-700]">{t('result.emergencyNumbers')}</p>
                <p className="mt-2 text-sm font-semibold text-[--gray-800]">ASPCA: (888) 426-4435</p>
                <p className="text-sm font-semibold text-[--gray-800]">Pet Poison Helpline: (855) 764-7661</p>
              </div>
            ) : null}

            {/* Source */}
            <p className="text-xs text-[--gray-400]">
              {t('result.source')}: {primaryItem.source}
            </p>

            {/* Share */}
            <div className="border-t border-[--gray-200] pt-4">
              <ShareButtons
                url={shareUrl}
                title={t('shareCta.title', { item: primaryItem.name, level: levelCfg.label })}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Additional Results (multiple items) */}
      {!loading && items.length > 1 ? (
        <Card padding="lg">
          <p className="mb-3 text-sm font-semibold text-[--gray-800]">{t('result.otherResults')} ({items.length - 1})</p>
          <div className="flex flex-col gap-2">
            {items.slice(1).map((item) => {
              const lvl = getSpeciesLevel(item, species);
              const cfg = LEVEL_CONFIG[lvl];
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setQuery(item.name.split(' ')[0])}
                  className="flex items-center justify-between rounded-lg border border-[--gray-200] p-3 text-left transition-colors hover:bg-[--gray-50]"
                >
                  <span className="text-sm font-medium text-[--gray-700]">{item.name}</span>
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                    style={{ backgroundColor: cfg.text }}
                  >
                    {cfg.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
