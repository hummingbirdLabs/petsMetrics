import type { Metadata } from 'next';
import { SITE_URL } from '@/constants';
import { pageUrl } from '@/lib/utils/url';
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
import { getTranslations } from 'next-intl/server';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { CatHydrationWidget } from '@/components/cat/CatHydrationWidget';

export const metadata: Metadata = {
  title: 'Cat Hydration Calculator — How Much Water Your Cat Needs | petsMetrics',
  description:
    'Calculate how much water your cat needs daily. Accounts for moisture from dry and wet food. Most cats are chronically dehydrated — find out if yours is getting enough.',
  alternates: {
    canonical: `${SITE_URL}/cat/hydration-calculator/`,
  },
  openGraph: {
    title: 'Cat Hydration Calculator — How Much Water Your Cat Needs | petsMetrics',
    description:
      'Calculate your cat\'s daily water needs. Accounts for food moisture content and weight-based formula.',
    url: `${SITE_URL}/cat/hydration-calculator/`,
    type: 'website',
  },
};

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

export default async function CatHydrationPage() {
  const t = await getTranslations('common');
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
            <KnowledgeCards cards={CAT_HYDRATION_KNOWLEDGE} />
            <ScienceBehindIt content={CAT_HYDRATION_SCIENCE} />
            <ToolCtaSection
              heading="Check Your Cat's Healthy Weight"
              description="Hydration is key to health — but is your cat at their ideal weight too? Use our BCS Weight Tracker to get a body condition score and personalized weight goals."
              href="/cat/bcs-weight-tracker/"
              buttonLabel="Check Body Condition →"
            />
            <DisclaimerSection text={t('disclaimer.standard')} />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Facts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>50 ml/kg daily</li>
                <li>Wet food: ~80% water</li>
                <li>Dry food: ~10% water</li>
                <li>Dehydration risk: dry-only diets</li>
              </ul>
            </Card>
            <AffiliateBanner variant="food" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Cat Tools</p>
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
