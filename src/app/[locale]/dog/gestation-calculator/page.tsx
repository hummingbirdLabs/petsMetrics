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
import { generateFaqPageJsonLd, DOG_GESTATION_FAQ } from '@/lib/seo/geo-faq';
import { DOG_GESTATION_KNOWLEDGE, DOG_GESTATION_SCIENCE } from '@/lib/seo/geo-content';
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
import { DogGestationWidget } from '@/components/dog/DogGestationWidget';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Dog Gestation Calculator — Whelping Due Date & Milestones | petsMetrics',
    description:
      'Calculate your dog\'s due date from the mating date. View key pregnancy milestones, vet check windows, and whelping preparation timeline. Based on average 63-day gestation.',
    keywords: 'dog pregnancy calculator, dog due date calculator, how long are dogs pregnant, dog gestation period, dog pregnancy week by week, dog pregnancy stages timeline, when to ultrasound pregnant dog',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/gestation-calculator/`,
    },
    openGraph: {
      title: 'Dog Gestation Calculator — Whelping Due Date & Milestones | petsMetrics',
      description:
        'Calculate your dog\'s due date. Track key developmental milestones from implantation to whelping.',
      url: `${SITE_URL}/${locale}/dog/gestation-calculator/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/gestation-calculator.webp`, width: 1200, height: 630, alt: 'Dog Gestation Calculator — Due Date & Milestones' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Gestation Calculator — Whelping Due Date | petsMetrics',
      description: 'Calculate your dog\'s due date. Track key developmental milestones from implantation to whelping.',
      images: [`${SITE_URL}/og/gestation-calculator.webp`],
    },
  };
}

const faqSchema = generateFaqPageJsonLd(DOG_GESTATION_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Dog Gestation Calculator',
  toolPath: '/dog/gestation-calculator/',
  description: 'Calculate your dog\'s whelping due date and track key pregnancy milestones using AAHA canine reproduction guidelines.',
  citations: TOOL_CITATIONS['dog/gestation-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['dog/gestation-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Dog Gestation Calculator', item: '' },
]);

export default async function DogGestationPage({ params }: { params: { locale: string } }) {
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
            { label: 'Dog', href: 'dog' },
            { label: 'Gestation Calculator' },
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
                Dog Gestation Calculator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate your dog&apos;s due date, track key developmental milestones, and prepare for whelping.
              </p>
            </div>
            <DogGestationWidget />
            <KnowledgeCards cards={DOG_GESTATION_KNOWLEDGE} locale={locale} />
            <ScienceBehindIt content={DOG_GESTATION_SCIENCE} />
            <ToolCtaSection
              heading={t('toolCta.planDogVaccination.heading')}
              description={t('toolCta.planDogVaccination.description')}
              href={pageUrl('dog/vaccination-schedule')}
              buttonLabel={t('toolCta.planDogVaccination.button')}
            />
            <RelatedComparison
              title={tc('spayedVsUnspayed.title')}
              description={tc('spayedVsUnspayed.subtitle')}
              href={pageUrl('dog/compare/spayed-vs-unspayed')}
              sourcesText="AAHA, AVMA"
              section="dog"
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
                <li>{t('sidebar.dogGestation.average')}</li>
                <li>{t('sidebar.dogGestation.range')}</li>
                <li>{t('sidebar.dogGestation.ultrasound')}</li>
                <li>{t('sidebar.dogGestation.xray')}</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.dogTools')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('dog/age-calculator')} className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href={pageUrl('dog/puppy-growth-predictor')} className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
                <li><a href={pageUrl('dog/vaccination-schedule')} className="hover:text-[--dog-primary] transition-colors">Vaccination Schedule</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
