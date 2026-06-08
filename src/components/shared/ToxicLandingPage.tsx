import { useTranslations } from 'next-intl';
import { SITE_URL } from '@/constants';
import { pageUrl } from '@/lib/utils/url';
import { TOXIC_ITEMS, type ToxicItem } from '@/lib/data/toxic-items';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import {
  generateToxicFaqJsonLd,
  generateToxicArticleJsonLd,
} from '@/lib/seo/toxic-meta';

type BreadcrumbItem = { label: string; href?: string };

type ToxicLandingPageProps = {
  item: ToxicItem;
  species: 'dog' | 'cat';
  breadcrumbItems: BreadcrumbItem[];
};

const LEVEL_CONFIG: Record<string, { label: string; bg: string; text: string; borderColor: string }> = {
  toxic: {
    label: 'TOXIC',
    bg: 'var(--status-toxic-bg)',
    text: 'var(--status-toxic)',
    borderColor: 'var(--status-toxic)',
  },
  caution: {
    label: 'CAUTION',
    bg: 'var(--status-caution-bg)',
    text: 'var(--status-caution)',
    borderColor: 'var(--status-caution)',
  },
  safe: {
    label: 'SAFE',
    bg: 'var(--status-safe-bg)',
    text: 'var(--status-safe)',
    borderColor: 'var(--status-safe)',
  },
};

function getRelatedItems(item: ToxicItem, species: 'dog' | 'cat', limit: number = 6): ToxicItem[] {
  const speciesFilter = species === 'dog'
    ? ['dog', 'both']
    : ['cat', 'both'];
  const related = TOXIC_ITEMS
    .filter((i) =>
      i.slug !== item.slug &&
      i.category === item.category &&
      speciesFilter.includes(i.species),
    )
    .slice(0, limit);
  // If not enough from same category, fill with same species from other categories
  if (related.length < limit) {
    const extra = TOXIC_ITEMS
      .filter((i) =>
        i.slug !== item.slug &&
        i.category !== item.category &&
        speciesFilter.includes(i.species),
      )
      .slice(0, limit - related.length);
    related.push(...extra);
  }
  return related;
}

function headingForSpeciesItem(item: ToxicItem, species: 'dog' | 'cat'): string {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const levelLabel = LEVEL_CONFIG[level]?.label ?? level.toUpperCase();
  if (species === 'dog') return `Can Dogs Eat ${item.name}? — ${levelLabel}`;
  return `Is ${item.name} Toxic to Cats? — ${levelLabel}`;
}

function shareTitleForSpeciesItem(item: ToxicItem, species: 'dog' | 'cat'): string {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const levelLabel = LEVEL_CONFIG[level]?.label ?? level.toUpperCase();
  return `${item.name} is ${levelLabel} for pets — check the Toxic Checker!`;
}

function getSpeciesLevel(item: ToxicItem, species: 'dog' | 'cat'): string {
  return species === 'dog' ? item.dogLevel : item.catLevel;
}

const toxicH1Styles: Record<string, { gradient: string; badgeBg: string; badgeText: string }> = {
  toxic: {
    gradient: 'from-red-50 to-red-100',
    badgeBg: 'var(--status-toxic)',
    badgeText: '#FFFFFF',
  },
  caution: {
    gradient: 'from-amber-50 to-amber-100',
    badgeBg: 'var(--status-caution)',
    badgeText: '#FFFFFF',
  },
  safe: {
    gradient: 'from-emerald-50 to-emerald-100',
    badgeBg: 'var(--status-safe)',
    badgeText: '#FFFFFF',
  },
};

export function ToxicLandingPage({ item, species, breadcrumbItems }: ToxicLandingPageProps) {
  const t = useTranslations('toxicLanding');
  const tNav = useTranslations('nav');
  const tToxic = useTranslations('toxicChecker.result');

  const level = getSpeciesLevel(item, species);
  const levelCfg = LEVEL_CONFIG[level];
  const heading = headingForSpeciesItem(item, species);
  const h1Style = toxicH1Styles[level];
  const faqSchema = generateToxicFaqJsonLd(item, species);
  const articleSchema = generateToxicArticleJsonLd(item, species);
  const relatedItems = getRelatedItems(item, species);

  const prefix = species === 'dog' ? 'dog/can-dogs-eat' : 'cat/are-toxic-to-cats';
  const shareUrl = SITE_URL + pageUrl(`${prefix}/${item.slug}`).slice(0, -1);
  const shareTitle = shareTitleForSpeciesItem(item, species);

  const petLabel = species === 'dog' ? tNav('dog') : tNav('cat');
  const speciesColor = species === 'dog' ? 'var(--dog-primary)' : 'var(--cat-primary)';

  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={articleSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <ErrorBoundaryWrapper>
        <PetProfileBar profile={null} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      </ErrorBoundaryWrapper>

      <SidebarLayout
        main={
          <div className="flex flex-col gap-6">
            {/* Hero Header */}
            <div
              className={`rounded-xl bg-gradient-to-br ${h1Style.gradient} border-l-4 p-6 sm:p-8`}
              style={{ borderLeftColor: levelCfg.borderColor }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-block rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: h1Style.badgeBg, color: h1Style.badgeText }}
                  >
                    {levelCfg.label}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: species === 'dog' ? 'var(--dog-primary-light)' : 'var(--cat-primary-light)',
                      color: speciesColor,
                    }}
                  >
                    {petLabel}
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
                  {heading}
                </h1>
              </div>
            </div>

            {/* Level-specific message */}
            <Card padding="lg">
              {level === 'toxic' ? (
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border-2 border-[--status-toxic] bg-[--status-toxic-bg] p-5">
                    <p className="text-base font-bold text-[--status-toxic]">
                      {tToxic('toxicHeader')}
                    </p>
                    {item.emergencyNote ? (
                      <p className="mt-2 text-sm text-[--gray-700]">{item.emergencyNote}</p>
                    ) : null}
                  </div>
                  {item.symptoms.length > 0 ? (
                    <div>
                      <p className="text-sm font-semibold text-[--gray-800]">{tToxic('symptoms')}</p>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {item.symptoms.map((s) => (
                          <li key={s} className="flex items-start gap-2">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[--status-toxic]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-[--gray-700]">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : level === 'caution' ? (
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border-2 border-[--status-caution] bg-[--status-caution-bg] p-5">
                    <p className="text-base font-bold text-[--status-caution]">
                      {tToxic('cautionHeader')}
                    </p>
                    {item.emergencyNote ? (
                      <p className="mt-2 text-sm text-[--gray-700]">{item.emergencyNote}</p>
                    ) : null}
                  </div>
                  {item.safeAmount ? (
                    <div className="rounded-lg border border-[--gray-200] bg-[--gray-50] p-4">
                      <p className="text-sm">
                        <span className="font-semibold text-[--gray-800]">{tToxic('safeAmountLabel')}:</span>{' '}
                        <span className="text-[--gray-600]">{item.safeAmount}</span>
                      </p>
                    </div>
                  ) : null}
                  {item.symptoms.length > 0 ? (
                    <div>
                      <p className="text-sm font-semibold text-[--gray-800]">{tToxic('symptoms')}</p>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {item.symptoms.map((s) => (
                          <li key={s} className="flex items-start gap-2">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[--status-caution]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-[--gray-700]">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border-2 border-[--status-safe] bg-[--status-safe-bg] p-5">
                    <p className="text-base font-bold text-[--status-safe]">
                      {tToxic('safeHeader')}
                    </p>
                  </div>
                  {item.safeAmount ? (
                    <div className="rounded-lg border border-[--gray-200] bg-[--gray-50] p-4">
                      <p className="text-sm">
                        <span className="font-semibold text-[--gray-800]">{tToxic('safeAmountLabel')}:</span>{' '}
                        <span className="text-[--gray-600]">{item.safeAmount}</span>
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </Card>

            {/* Emergency Section (toxic only) */}
            {level === 'toxic' ? (
              <Card padding="lg">
                <div className="rounded-lg border-2 border-[--status-toxic] bg-[--status-toxic-bg] p-5">
                  <p className="text-base font-bold text-[--status-toxic]">{t('emergencyTitle')}</p>
                  <p className="mt-2 text-sm text-[--gray-700]">{t('emergencyDescription')}</p>
                  <div className="mt-3 flex flex-col gap-1">
                    <p className="text-base font-bold text-[--gray-900]">{t('aspcaPhone')}: {t('aspcaNumber')}</p>
                    <p className="text-sm text-[--gray-600]">{t('petPoisonHelpline')}: {t('petPoisonNumber')}</p>
                  </div>
                  <p className="mt-3 text-xs text-[--gray-500]">{t('emergencyDisclaimer')}</p>
                </div>
              </Card>
            ) : null}

            {/* Source attribution */}
            <Card padding="md">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[--gray-400]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-[--gray-500]">
                  {tToxic('source')}: <span className="font-medium text-[--gray-700]">{item.source}</span>
                </p>
              </div>
            </Card>

            {/* Related Items */}
            {relatedItems.length > 0 ? (
              <div>
                <h2 className="mb-4 text-xl font-bold text-[--gray-900]">{t('relatedTitle')}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {relatedItems.map((ri) => {
                    const riLevel = getSpeciesLevel(ri, species);
                    const riCfg = LEVEL_CONFIG[riLevel];
                    const riUrl = pageUrl(`${prefix}/${ri.slug}`);
                    return (
                      <a
                        key={ri.slug}
                        href={riUrl}
                        className="flex items-center justify-between rounded-lg border border-[--gray-200] p-4 transition-all hover:border-[--gray-300] hover:shadow-sm"
                      >
                        <span className="text-sm font-medium text-[--gray-700]">{ri.name}</span>
                        <span
                          className="rounded px-2.5 py-0.5 text-[10px] font-bold uppercase text-white"
                          style={{ backgroundColor: riCfg.text }}
                        >
                          {riCfg.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Share */}
            <div className="border-t border-[--gray-200] pt-4">
              <ShareButtons url={shareUrl} title={shareTitle} className="justify-center" />
            </div>

            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.moreItems')}</p>
              <p className="mt-1 text-xs text-[--gray-500]">
                {t('sidebar.totalItems', { count: TOXIC_ITEMS.filter((i) => {
                  const sf = species === 'dog' ? ['dog', 'both'] : ['cat', 'both'];
                  return sf.includes(i.species);
                }).length })}
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>
                  <a
                    href={pageUrl('shared/toxic-checker')}
                    className="hover:underline"
                    style={{ color: speciesColor }}
                  >
                    {t('sidebar.openChecker')}
                  </a>
                </li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
