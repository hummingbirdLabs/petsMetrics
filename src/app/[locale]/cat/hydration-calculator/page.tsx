import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { createPageUrl } from '@/lib/utils/url';
import {
  generateSoftwareAppJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
  graphJsonLd,
  TOOL_CITATIONS,
  HOWTO_STEPS,
} from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd, CAT_HYDRATION_FAQ } from '@/lib/seo/geo-faq';
import { CAT_HYDRATION_KNOWLEDGE, CAT_HYDRATION_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { RelatedComparison } from '@/components/shared/RelatedComparison';
import { getTranslations } from 'next-intl/server';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { CatHydrationWidget } from '@/components/cat/CatHydrationWidget';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Cat Hydration Calculator — How Much Water Your Cat Needs | petsMetrics',
    description:
      'Calculate how much water your cat needs daily. Accounts for moisture from dry and wet food. Most cats are chronically dehydrated — find out if yours is getting enough.',
    keywords: 'cat hydration calculator, how much water should my cat drink, cat water intake per day, cat not drinking enough water, dehydrated cat symptoms, cat water needs',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/hydration-calculator/`,
    },
    openGraph: {
      title: 'Cat Hydration Calculator — How Much Water Your Cat Needs | petsMetrics',
      description:
        'Calculate your cat\'s daily water needs. Accounts for food moisture content and weight-based formula.',
      url: `${SITE_URL}/${locale}/cat/hydration-calculator/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/cat-hydration-calculator.webp`, width: 1200, height: 630, alt: 'Cat Hydration Calculator — Daily Water Needs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cat Hydration Calculator — How Much Water Your Cat Needs | petsMetrics',
      description: 'Calculate your cat\'s daily water needs. Accounts for food moisture content and weight-based formula.',
      images: [`${SITE_URL}/og/cat-hydration-calculator.webp`],
    },
  };
}

const faqSchema = generateFaqPageJsonLd(CAT_HYDRATION_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Hydration Calculator',
  toolPath: '/cat/hydration-calculator/',
  description: 'Calculate how much water your cat needs daily based on weight and food type, using NRC feline nutrition standards.',
  citations: TOOL_CITATIONS['cat/hydration-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/hydration-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat Hydration Calculator', item: '' },
]);

export default async function CatHydrationPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const pageUrl = createPageUrl(locale);
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Cat', href: 'cat' },
            { label: 'Hydration Calculator' },
          ]}
        />
      </div>
      <ErrorBoundaryWrapper>
        <PetProfileBar profile={null} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      </ErrorBoundaryWrapper>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
                Cat Hydration Calculator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate how much water your cat needs daily. Accounts for moisture from dry food and wet food.
              </p>
            </div>
            <CatHydrationWidget />
            <KnowledgeCards cards={CAT_HYDRATION_KNOWLEDGE} locale={locale} />
            <ScienceBehindIt content={CAT_HYDRATION_SCIENCE} />
            <ToolCtaSection
              heading={t('toolCta.checkCatWeight.heading')}
              description={t('toolCta.checkCatWeight.description')}
              href={pageUrl('cat/bcs-weight-tracker')}
              buttonLabel={t('toolCta.checkCatWeight.button')}
            />
            <RelatedComparison
              title={tc('indoorVsOutdoor.title')}
              description={tc('indoorVsOutdoor.subtitle')}
              href={pageUrl('cat/compare/indoor-vs-outdoor')}
              sourcesText="AAFP, ISFM"
              section="cat"
              t={{
                heading: tc('relatedCompare.heading'),
                readComparison: tc('relatedCompare.readComparison'),
              }}
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.quickFacts')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>{t('sidebar.catHydration.dailyNeed')}</li>
                <li>{t('sidebar.catHydration.wetFood')}</li>
                <li>{t('sidebar.catHydration.dryFood')}</li>
              </ul>
            </Card>
            <AffiliateBanner variant="food" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.catTools')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href={pageUrl('cat/gestation-calculator')} className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
                <li><a href={pageUrl('cat/vaccination-schedule')} className="hover:text-[--cat-primary] transition-colors">Vaccination Schedule</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
