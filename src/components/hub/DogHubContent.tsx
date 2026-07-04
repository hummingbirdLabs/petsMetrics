'use client';
import { useTranslations } from 'next-intl';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { HubSearch } from '@/components/hub/HubSearch';
import { ProfileBar } from '@/components/hub/ProfileBar';
import { graphJsonLd } from '@/lib/seo/geo-meta';
import { usePageUrlBuilder } from '@/hooks/usePageUrl';

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Dog Health Calculators and Tools',
  description:
    'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date.',
  url: `${SITE_URL}/dog/`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  ],
};

type ToolCard = {
  icon: string;
  nameKey: string;
  descKey: string;
  path: string;
  priority: 'P0' | 'P1';
};

const breedData = [
  {
    key: 'labrador', name: 'Labrador Retriever', slug: 'labrador-retriever',
    links: [
      { key: 'calorie', slug: 'calorie-calculator', label: 'Labrador Calorie Calculator' },
      { key: 'age', slug: 'age-calculator', label: 'Labrador Human Age' },
      { key: 'growth', slug: 'puppy-growth-predictor', label: 'Labrador Puppy Growth Chart' },
    ],
  },
  {
    key: 'germanShepherd', name: 'German Shepherd', slug: 'german-shepherd',
    links: [
      { key: 'calorie', slug: 'calorie-calculator', label: 'German Shepherd Daily Calories' },
      { key: 'age', slug: 'age-calculator', label: 'German Shepherd Human Age' },
    ],
  },
  {
    key: 'frenchBulldog', name: 'French Bulldog', slug: 'french-bulldog',
    links: [
      { key: 'calorie', slug: 'calorie-calculator', label: 'French Bulldog Weight Guide' },
      { key: 'calorie', slug: 'calorie-calculator', label: 'French Bulldog Calorie Calculator' },
    ],
  },
  {
    key: 'goldenRetriever', name: 'Golden Retriever', slug: 'golden-retriever',
    links: [
      { key: 'age', slug: 'age-calculator', label: 'Golden Retriever Age Calculator' },
      { key: 'calorie', slug: 'calorie-calculator', label: 'Golden Retriever Calorie Needs' },
    ],
  },
];

/** Comparison Guides — 对比页入口数据 */
const compareGuides = [
  { icon: '🍖', titleKey: 'dryVsWet.title', descKey: 'dryVsWet.subtitle', path: 'dog/compare/dry-food-vs-wet-food', sources: 'AAFCO, WSAVA' },
  { icon: '🥩', titleKey: 'rawVsKibble.title', descKey: 'rawVsKibble.subtitle', path: 'dog/compare/raw-diet-vs-kibble', sources: 'NRC, AVMA' },
  { icon: '💉', titleKey: 'spayedVsUnspayed.title', descKey: 'spayedVsUnspayed.subtitle', path: 'dog/compare/spayed-vs-unspayed', sources: 'AAHA, AVMA' },
];

/** Life Stage Checklist Guides — 生命阶段新手清单入口数据 */
const checklistGuides = [
  { icon: '🐶', titleKey: 'dog.guide.newPuppy', descKey: 'dog.guide.newPuppy.desc', path: 'dog/guide/new-puppy-checklist', sources: 'AAHA, AVSAB' },
  { icon: '📋', titleKey: 'dog.guide.puppyDevelopment', descKey: 'dog.guide.puppyDevelopment.desc', path: 'dog/guide/puppy-development-stages', sources: 'AVSAB, AKC' },
  { icon: '🏠', titleKey: 'dog.guide.rescueDog', descKey: 'dog.guide.rescueDog.desc', path: 'dog/guide/adopting-rescue-dog', sources: 'ASPCA, AVSAB' },
  { icon: '🐕', titleKey: 'dog.guide.seniorDog', descKey: 'dog.guide.seniorDog.desc', path: 'dog/guide/senior-dog-care', sources: 'AAHA Senior' },
];

export function DogHubContent() {
  const t = useTranslations('dog');
  const tg = useTranslations('dog.toolGrid');
  const tseo = useTranslations('dog.seoContent');
  const tb = useTranslations('dog.breedContent');
  const tc = useTranslations('compare');
  const tGuide = useTranslations('dog.guide');
  const pageUrl = usePageUrlBuilder();

  const tools: ToolCard[] = [
    { icon: '📅', nameKey: 'ageCalculator', descKey: 'ageCalculator.desc', path: 'dog/age-calculator', priority: 'P0' },
    { icon: '🐣', nameKey: 'puppyGrowth', descKey: 'puppyGrowth.desc', path: 'dog/puppy-growth-predictor', priority: 'P0' },
    { icon: '🤰', nameKey: 'gestation', descKey: 'gestation.desc', path: 'dog/gestation-calculator', priority: 'P0' },
    { icon: '🥩', nameKey: 'barf', descKey: 'barf.desc', path: 'dog/barf-calculator', priority: 'P1' },
    { icon: '🛡️', nameKey: 'insurance', descKey: 'insurance.desc', path: 'shared/pet-insurance-estimator', priority: 'P1' },
  ];

  // Map i18n name keys to display names
  const toolNames: Record<string, string> = {
    ageCalculator: 'Age Calculator',
    puppyGrowth: 'Puppy Growth',
    gestation: 'Gestation',
    barf: 'BARF Calculator',
    insurance: 'Insurance',
    vaccination: 'Vaccination Schedule',
  };

  return (
    <>
      <JsonLdScript data={graphJsonLd(collectionSchema, breadcrumbSchema)} />

      {/* Hero */}
      <section
        className="flex min-h-[280px] items-center px-4 py-12 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, var(--dog-primary-dark) 0%, var(--dog-primary) 60%, var(--dog-accent) 100%)' }}
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[40px]">
            🐕 {t('hero.title')}
          </h1>
          <p className="mt-3 text-lg text-white/80">{t('hero.subtitle')}</p>
          <div className="mt-2 text-sm text-white/70">
            <a href={pageUrl('')} className="hover:text-white">{t('breadcrumb.home')}</a>
            <span className="mx-1">›</span>
            <span>{t('breadcrumb.dog')}</span>
          </div>
          <HubSearch placeholder={t('hero.searchPlaceholder')} />
        </div>
      </section>

      <ProfileBar species="dog" />

      {/* 特色工具 */}
      <section className="bg-[--white] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">
            {t('featuredTools.title')}
          </h2>
          <hr className="mt-3 border-[--gray-200]" />

          {/* Hero 工具卡片 — 有毒检测 */}
          <div className="mt-8 rounded-xl border-l-4 border-l-[--dog-primary] bg-[--dog-surface] p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-[--gray-900]">
                    ⚠️ {t('featuredTools.heroCard.title')}
                  </h3>
                  <span className="rounded-full bg-[--dog-primary-light] px-2.5 py-0.5 text-xs font-semibold text-[--dog-primary]">
                    ⭐ {t('featuredTools.heroCard.badge')}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-[--gray-500]">{t('featuredTools.heroCard.desc')}</p>
                <p className="mt-2 text-sm text-[--dog-primary]">{t('featuredTools.heroCard.tagline')}</p>
              </div>
              <a
                href={pageUrl('shared/toxic-checker')}
                className="flex-shrink-0 self-start rounded-lg bg-[--dog-primary] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[--dog-primary-dark]"
              >
                {t('featuredTools.heroCard.cta')} →
              </a>
            </div>
          </div>

          {/* 两列特色工具 */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={pageUrl('dog/calorie-calculator')}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--dog-accent]"
            >
              <span className="text-3xl">🍖</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[--gray-900]">{t('featuredTools.calorie.title')}</h3>
              <p className="mt-1 text-sm text-[--gray-500]">{t('featuredTools.calorie.desc')}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                {t('featuredTools.calorie.cta')} →
              </span>
            </a>
            <a
              href={pageUrl('dog/vaccination-schedule')}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--dog-accent]"
            >
              <span className="text-3xl">💉</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[--gray-900]">{t('featuredTools.vaccination.title')}</h3>
              <p className="mt-1 text-sm text-[--gray-500]">{t('featuredTools.vaccination.desc')}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[--brand-teal] opacity-0 transition-opacity group-hover:opacity-100">
                {t('featuredTools.vaccination.cta')} →
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
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--dog-accent]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--dog-primary-light] text-lg text-[--dog-primary]">
                    {tool.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-[--gray-900]">
                        {toolNames[tool.nameKey]}
                      </h3>
                      <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tool.priority === 'P0' ? 'bg-[--dog-primary-light] text-[--dog-primary]' : 'bg-[--gray-100] text-[--gray-500]'}`}>
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

      {/* Comparison Guides — 对比指南入口 */}
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
            {compareGuides.map((guide) => (
              <a
                key={guide.path}
                href={pageUrl(guide.path)}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--dog-accent]"
                aria-label={tc('hub.compareCardAria', { title: tc(guide.titleKey) })}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--dog-primary-light] text-lg text-[--dog-primary]">
                    {guide.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-semibold leading-snug text-[--gray-900]">
                      {tc(guide.titleKey)}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-[--dog-primary-light] px-2 py-0.5 text-[10px] font-semibold text-[--dog-primary]">
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

      {/* Life Stage Checklist Guides — 生命阶段新手清单入口 */}
      <section className="bg-[--gray-50] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">
            {tGuide('title')}
          </h2>
          <p className="mt-2 text-base text-[--gray-500]">
            {tGuide('description')}
          </p>
          <hr className="mt-3 border-[--gray-200]" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {checklistGuides.map((guide) => (
              <a
                key={guide.path}
                href={pageUrl(guide.path)}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md border border-transparent hover:border-[--dog-accent]"
                aria-label={tGuide(`${guide.titleKey}.aria`)}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[--dog-primary-light] text-lg text-[--dog-primary]">
                    {guide.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm font-semibold leading-snug text-[--gray-900]">
                      {tGuide(guide.titleKey)}
                    </h3>
                    <span className="mt-1 inline-block rounded-full bg-[--dog-primary-light] px-2 py-0.5 text-[10px] font-semibold text-[--dog-primary]">
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
            {(['faq1', 'faq2', 'faq3', 'faq4'] as const).map((faqKey) => (
              <details key={faqKey} className="group rounded-xl border border-[--gray-200] bg-white p-4">
                <summary className="cursor-pointer font-medium text-[--gray-900] list-none [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 text-[--brand-teal] group-open:hidden">▶</span>
                  <span className="mr-2 hidden text-[--brand-teal] group-open:inline">▼</span>
                  {tseo(faqKey)}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[--gray-500]">
                  {tseo(`${faqKey}Answer`)}{' '}
                  {faqKey === 'faq1' && <a href={pageUrl('dog/age-calculator')} className="text-[--brand-teal] underline">{t('cta.tryAgeCalculator')}</a>}
                  {faqKey === 'faq2' && <a href={pageUrl('dog/calorie-calculator')} className="text-[--brand-teal] underline">{t('cta.calculateCalories')}</a>}
                  {faqKey === 'faq3' && <a href={pageUrl('dog/vaccination-schedule')} className="text-[--brand-teal] underline">{t('cta.viewVaccineSchedule')}</a>}
                  {faqKey === 'faq4' && <a href={pageUrl('dog/gestation-calculator')} className="text-[--brand-teal] underline">{t('cta.checkDueDates')}</a>}
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

      {/* 品种特定 SEO 内容 */}
      <section className="bg-[--gray-50] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-[--gray-900] sm:text-3xl">{tb('title')}</h2>
          <hr className="mt-3 border-[--gray-200]" />
          <h3 className="mt-8 font-display text-lg font-semibold text-[--gray-700]">{tb('popularBreeds')}</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {breedData.map((breed) => {
              const links = breed.links;
              return (
                <div key={breed.key} className="rounded-xl bg-white p-5 shadow-sm">
                  <h4 className="font-display font-semibold text-[--gray-900]">🐕 {breed.name}</h4>
                  <ul className="mt-2 space-y-1">
                    {links.map((link) => (
                      <li key={link.key}>
                        <a
                          href={`${pageUrl(`dog/${link.slug}`)}?breed=${breed.slug}`}
                          className="text-sm text-[--brand-teal] underline"
                        >
                          {link.label} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm font-medium text-[--brand-teal]">{tb('viewAllBreeds')}</span>
          </div>
        </div>
      </section>
    </>
  );
}
