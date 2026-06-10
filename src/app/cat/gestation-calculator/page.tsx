import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { pageUrl } from '@/lib/utils/url';
import {
  generateSoftwareAppJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
  graphJsonLd,
  TOOL_CITATIONS,
  HOWTO_STEPS,
} from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd, CAT_GESTATION_FAQ } from '@/lib/seo/geo-faq';
import { CAT_GESTATION_KNOWLEDGE, CAT_GESTATION_SCIENCE } from '@/lib/seo/geo-content';
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
import { CatGestationWidget } from '@/components/cat/CatGestationWidget';

export const metadata: Metadata = {
  title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
  description:
    'Calculate your cat\'s due date from the mating date. View key pregnancy milestones, ultrasound windows, and queening preparation timeline. Based on average 65-day feline gestation.',
  keywords: 'cat pregnancy calculator, how long are cats pregnant, cat due date calculator, cat gestation period, signs of cat pregnancy, cat pregnancy stages',
  alternates: {
    canonical: `${SITE_URL}/cat/gestation-calculator/`,
  },
  openGraph: {
    title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
    description:
      'Calculate your cat\'s due date. Track key developmental milestones from implantation to queening.',
    url: `${SITE_URL}/cat/gestation-calculator/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/gestation-calculator.webp`, width: 1200, height: 630, alt: 'Cat Gestation Calculator — Due Date & Milestones' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Gestation Calculator — Kitten Due Date | petsMetrics',
    description: 'Calculate your cat\'s due date. Track key developmental milestones from implantation to queening.',
    images: [`${SITE_URL}/og/gestation-calculator.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(CAT_GESTATION_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Gestation Calculator',
  toolPath: '/cat/gestation-calculator/',
  description: 'Calculate your cat\'s queening due date and track key fetal development milestones based on AAFP and ISFM feline reproduction guidelines.',
  citations: TOOL_CITATIONS['cat/gestation-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/gestation-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat Gestation Calculator', item: '' },
]);

export default async function CatGestationPage() {
  const t = await getTranslations('common');
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Cat', href: 'cat' },
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
                Cat Gestation Calculator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate your cat&apos;s due date, track key developmental milestones, and prepare for queening.
              </p>
            </div>
            <CatGestationWidget />
            <KnowledgeCards cards={CAT_GESTATION_KNOWLEDGE} />
            <ScienceBehindIt content={CAT_GESTATION_SCIENCE} />
            <ToolCtaSection
              heading="Check Your Cat's Vaccination Schedule"
              description="Kittens on the way? Plan their vaccination schedule now. Our calculator generates a personalized immunization timeline from kittenhood through adulthood."
              href="/cat/vaccination-schedule/"
              buttonLabel="See Vaccine Schedule →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Facts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Average: 65 days</li>
                <li>Range: 61–67 days</li>
                <li>Ultrasound: Day 21–28</li>
                <li>X-ray: Day 45+</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Cat Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href={pageUrl('cat/vaccination-schedule')} className="hover:text-[--cat-primary] transition-colors">Vaccination Schedule</a></li>
                <li><a href={pageUrl('cat/hydration-calculator')} className="hover:text-[--cat-primary] transition-colors">Hydration Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
