'use client';
import { useTranslations } from 'next-intl';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { HubSearch } from '@/components/hub/HubSearch';
import { ProfileBar } from '@/components/hub/ProfileBar';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';
import { graphJsonLd } from '@/lib/seo/geo-meta';

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Cat Health Calculators and Tools',
  description:
    'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule, and gestation calculator.',
  url: `${SITE_URL}/cat/`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  ],
};

type ToolCard = {
  icon: string;
  nameKey: string;
  descKey: string;
  path: string;
  priority: 'P0' | 'P1';
};

/** Comparison Guides — 对比页入口数据（猫） */
const catCompareGuides = [
  { icon: '🏠', titleKey: 'indoorVsOutdoor.title', descKey: 'indoorVsOutdoor.subtitle', path: 'cat/compare/indoor-vs-outdoor', sources: 'AAFP, ISFM' },
];

/** Life Stage Checklist Guides — 生命阶段新手清单入口数据（猫） */
const catChecklistGuides = [
  { icon: '🐱', titleKey: 'cat.guide.newKitten', descKey: 'cat.guide.newKitten.desc', path: 'cat/guide/new-kitten-checklist', sources: 'AAFP, ISFM' },
  { icon: '🐈', titleKey: 'cat.guide.seniorCat', descKey: 'cat.guide.seniorCat.desc', path: 'cat/guide/senior-cat-care', sources: 'AAFP Senior' },
];

export function CatHubContent() {
  const t = useTranslations('cat');
  const tg = useTranslations('cat.toolGrid');
  const tseo = useTranslations('cat.seoContent');
  const tc = useTranslations('compare');
  const tGuide = useTranslations('cat.guide');
  const pageUrl = usePageUrlBuilder();

  const tools: ToolCard[] = [
    { icon: '📅', nameKey: 'ageCalculator', descKey: 'ageCalculator.desc', path: 'cat/age-calculator', priority: 'P0' },
    { icon: '💉', nameKey: 'vaccination', descKey: 'vaccination.desc', path: 'cat/vaccination-schedule', priority: 'P0' },
    { icon: '🤰', nameKey: 'gestation', descKey: 'gestation.desc', path: 'cat/gestation-calculator', priority: 'P0' },
    { icon: '🥩', nameKey: 'barf', descKey: 'barf.desc', path: 'cat/barf-calculator', priority: 'P1' },
    { icon: '🛡️', nameKey: 'insurance', descKey: 'insurance.desc', path: 'shared/pet-insurance-estimator', priority: 'P1' },
  ];

  const toolNames: Record<string, string> = {
    ageCalculator: 'Age Calculator',
    vaccination: 'Vaccination Schedule',
    gestation: 'Gestation Calculator',
    barf: 'BARF Calculator',
    insurance: 'Insurance Estimator',
  };

  const faqLinks: Record<string, string> = {
    faq1: 'cat/age-calculator',
    faq2: 'cat/bcs-weight-tracker',
    faq3: 'cat/hydration-calculator',
    faq4: 'cat/vaccination-schedule',
    faq5: 'cat/gestation-calculator',
  };

  return (
    <>
      <JsonLdScript data={graphJsonLd(collectionSchema, breadcrumbSchema)} />

      {/* Hero */}
      <section
        className="flex min-h-[280px] items-center px-4 py-12 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, var(--cat-primary-dark) 0%, var(--cat-primary) 60%, var(--cat-accent) 100%)' }}
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[40px]">
            🐱 {t('hero.title')}
          </h1>
          <p className="mt-3 text-lg text-white/80">{t('hero.subtitle')}</p>
          <div className="mt-2 text-sm text-white/70">
            <a href={pageUrl('')} className="hover:text-white">{t('breadcrumb.home')}</a>
            <span className="mx-1">›</span>
            <span>{t('breadcrumb.cat')}</span>
          </div>
          <HubSearch placeholder={t('hero.searchPlaceholder')} />
        </div>
      </section>

      <ProfileBar species="cat" />

      {/* 特色工具 */}
      <section className="bg-[--white] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">
            {t('featuredTools.title')}
          </h2>
          <hr className="mt-3 border-[--gray-200]" />

          {/* Hero 工具卡片 — BCS */}
          <div className="mt-8 rounded-xl border-l-4 border-l-[--cat-primary] bg-[--cat-surface] p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-[--gray-900]">
                    ⚖️ {t('featuredTools.heroCard.title')}
                  </h3>
                  <span className="rounded-full bg-[--cat-primary-light] px-2.5 py-0.5 text-xs font-semibold text-[--cat-primary]">
                    {t('featuredTools.heroCard.badge')}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-[--gray-500]">{t('featuredTools.heroCard.desc')}</p>
                <p className="mt-2 text-sm text-[--cat-primary]">{t('featuredTools.heroCard.tagline')}</p>
              </div>
              <a
                href={pageUrl('cat/bcs-weight-tracker')}
                className="flex-shrink-0 self-start rounded-lg bg-[--cat-primary] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[--cat-primary-dark]"
              >
                {t('featuredTools.heroCard.cta')} →
              </a>
            </div>
          </div>

          {/* 两列特色工具 */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={pageUrl('shared/toxic-checker')}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--cat-accent]"
            >
              <span className="text-3xl">⚠️</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[--gray-900]">{t('featuredTools.toxicChecker.title')}</h3>
              <p className="mt-1 text-sm text-[--gray-500]">{t('featuredTools.toxicChecker.desc')}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                {t('featuredTools.toxicChecker.cta')} →
              </span>
            </a>
            <a
              href={pageUrl('cat/hydration-calculator')}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--cat-accent]"
            >
              <span className="text-3xl">💧</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[--gray-900]">{t('featuredTools.hydration.title')}</h3>
              <p className="mt-1 text-sm text-[--gray-500]">{t('featuredTools.hydration.desc')}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                {t('featuredTools.hydration.cta')} →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 所有工具网格 */}
      <section className="bg-[--gray-50] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">{tg('title')}</h2>
          <hr className="mt-3 border-[--gray-200]" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.nameKey}
                href={pageUrl(tool.path)}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--cat-accent]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--cat-primary-light] text-lg text-[--cat-primary]">
                    {tool.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-[--gray-900]">
                        {toolNames[tool.nameKey]}
                      </h3>
                      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tool.priority === 'P0' ? 'bg-[--cat-primary-light] text-[--cat-primary]' : 'bg-[--gray-100] text-[--gray-500]'}`}>
                        {tool.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[--gray-500]">{tg(tool.descKey)}</p>
                  </div>
                </div>
                <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                  {tg('open')} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Guides — 猫对比指南入口 */}
      <section className="bg-[--white] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">
            {tc('hub.guidesHeading')}
          </h2>
          <p className="mt-2 text-base text-[--gray-500]">
            {tc('hub.guidesDescription')}
          </p>
          <hr className="mt-3 border-[--gray-200]" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catCompareGuides.map((guide) => (
              <a
                key={guide.path}
                href={pageUrl(guide.path)}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--cat-accent]"
                aria-label={tc('hub.compareCardAria', { title: tc(guide.titleKey) })}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--cat-primary-light] text-lg text-[--cat-primary]">
                    {guide.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-semibold leading-snug text-[--gray-900]">
                      {tc(guide.titleKey)}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-[--cat-primary-light] px-2 py-0.5 text-[10px] font-semibold text-[--cat-primary]">
                      {guide.sources}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[--gray-500] line-clamp-3">
                  {tc(guide.descKey)}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                  Read comparison →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Life Stage Checklist Guides — 生命阶段新手清单入口（猫） */}
      <section className="bg-[--gray-50] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">
            {tGuide('title')}
          </h2>
          <p className="mt-2 text-base text-[--gray-500]">
            {tGuide('description')}
          </p>
          <hr className="mt-3 border-[--gray-200]" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {catChecklistGuides.map((guide) => (
              <a
                key={guide.path}
                href={pageUrl(guide.path)}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--cat-accent]"
                aria-label={tGuide(`${guide.titleKey}.aria`)}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--cat-primary-light] text-lg text-[--cat-primary]">
                    {guide.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-semibold leading-snug text-[--gray-900]">
                      {tGuide(guide.titleKey)}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-[--cat-primary-light] px-2 py-0.5 text-[10px] font-semibold text-[--cat-primary]">
                      {guide.sources}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[--gray-500] line-clamp-3">
                  {tGuide(guide.descKey)}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                  {tGuide('open')} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEO 内容区块 */}
      <section className="bg-[--white] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">{tseo('title')}</h2>
          <hr className="mt-3 border-[--gray-200]" />
          <p className="mt-6 leading-relaxed text-[--gray-500]">{tseo('intro')}</p>

          <div className="mt-8 space-y-3">
            {(['faq1', 'faq2', 'faq3', 'faq4', 'faq5'] as const).map((faqKey) => (
              <details key={faqKey} className="group rounded-xl border border-[--gray-200] bg-white p-4">
                <summary className="cursor-pointer font-medium text-[--gray-900] list-none [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 text-[--brand-teal] group-open:hidden">▶</span>
                  <span className="mr-2 hidden text-[--brand-teal] group-open:inline">▼</span>
                  {tseo(faqKey)}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[--gray-500]">
                  {tseo(`${faqKey}Answer`)}{' '}
                  {faqLinks[faqKey] && <a href={pageUrl(faqLinks[faqKey])} className="text-[--brand-teal] underline">{t('cta.open')}</a>}
                </p>
              </details>
            ))}
          </div>

          {/* GEO Privacy Statement — SSG paragraph for AI search engine trust signals */}
          <div className="mt-10 rounded-lg border border-[--gray-200] bg-[--gray-50] p-5">
            <h3 className="text-sm font-semibold text-[--gray-700]">{t('privacy.heading')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[--gray-500]">
              {t('privacy.body')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
