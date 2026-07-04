import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';
import { createPageUrl } from '@/lib/utils/url';
import {
  generateSoftwareAppJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
  graphJsonLd,
  TOOL_CITATIONS,
  HOWTO_STEPS,
} from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd, PUPPY_GROWTH_FAQ } from '@/lib/seo/geo-faq';
import { PUPPY_GROWTH_KNOWLEDGE, PUPPY_GROWTH_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { getTranslations } from 'next-intl/server';
import { PuppyGrowthWidget } from '@/components/dog/PuppyGrowthWidget';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Puppy Weight Predictor — How Big Will My Puppy Get | petsMetrics',
    description:
      'Predict your puppy\'s adult weight using breed size and growth curves. Track weight milestones with an interactive chart. Science-based estimation.',
    keywords: 'puppy growth calculator, how big will my puppy get, puppy weight estimator, puppy growth chart by breed, when do puppies stop growing',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/puppy-growth-predictor/`,
    },
    openGraph: {
      title: 'Puppy Adult Weight Predictor — Growth Chart | petsMetrics',
      description:
        'Predict how big your puppy will get. Interactive growth chart with breed-specific curves.',
      url: `${SITE_URL}/${locale}/dog/puppy-growth-predictor/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/puppy-growth-predictor.webp`, width: 1200, height: 630, alt: 'Puppy Growth Predictor — How Big Will My Puppy Get' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Puppy Weight Predictor — How Big Will My Puppy Get | petsMetrics',
      description: 'Predict how big your puppy will get. Interactive growth chart with breed-specific curves.',
      images: [`${SITE_URL}/og/puppy-growth-predictor.webp`],
    },
  };
}

const faqSchema = generateFaqPageJsonLd(PUPPY_GROWTH_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Puppy Growth Predictor',
  toolPath: '/dog/puppy-growth-predictor/',
  description: 'Predict your puppy\'s adult weight using breed-size-specific growth curves based on UCSD and AKC breed data. Interactive growth chart with confidence intervals.',
  citations: TOOL_CITATIONS['dog/puppy-growth-predictor'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['dog/puppy-growth-predictor']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Puppy Growth Predictor', item: '' },
]);

export default async function PuppyGrowthPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const pageUrl = createPageUrl(locale);
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Dog', href: 'dog' },
            { label: 'Puppy Growth Predictor' },
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
                Puppy Adult Weight Predictor
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Predict how big your puppy will get using breed size and growth curves. Track weight milestones with an interactive growth chart.
              </p>
            </div>
            <PuppyGrowthWidget />
            <KnowledgeCards cards={PUPPY_GROWTH_KNOWLEDGE} locale={locale} />
            <ScienceBehindIt content={PUPPY_GROWTH_SCIENCE} />
            <ToolCtaSection
              heading={t('toolCta.calculateCalories.heading')}
              description={t('toolCta.calculateCalories.description')}
              href={pageUrl('dog/calorie-calculator')}
              buttonLabel={t('toolCta.calculateCalories.button')}
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.dogTools')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('dog/age-calculator')} className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href={pageUrl('dog/puppy-growth-predictor')} className="text-[--dog-primary] hover:underline font-medium">Puppy Growth</a></li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
