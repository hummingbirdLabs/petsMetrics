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
import { generateFaqPageJsonLd, CAT_VACCINE_FAQ } from '@/lib/seo/geo-faq';
import { CAT_VACCINE_KNOWLEDGE, CAT_VACCINE_SCIENCE } from '@/lib/seo/geo-content';
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
import { CatVaccinationWidget } from '@/components/cat/CatVaccinationWidget';

export const metadata: Metadata = {
  title: 'Cat Vaccination Schedule — Free Personalized Timeline | petsMetrics',
  description:
    'Generate a complete vaccination schedule for your cat by age and region. Core (FVRCP, Rabies) and non-core (FeLV) vaccines with WSAVA & AAFP guidelines.',
  keywords: 'cat vaccination schedule, kitten shot schedule, FVRCP vaccine schedule, kitten vaccination chart, when do kittens need shots, indoor cat vaccine schedule, cat rabies vaccine schedule',
  alternates: {
    canonical: `${SITE_URL}/cat/vaccination-schedule/`,
  },
  openGraph: {
    title: 'Cat Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description:
      'Never miss a vaccine. Personalized to your cat\'s age and region. WSAVA core feline vaccine guidelines.',
    url: `${SITE_URL}/cat/vaccination-schedule/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/vaccination-schedule.webp`, width: 1200, height: 630, alt: 'Cat Vaccination Schedule — Free Personalized Timeline' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description: 'Never miss a vaccine. Personalized to your cat\'s age and region. WSAVA core feline vaccine guidelines.',
    images: [`${SITE_URL}/og/vaccination-schedule.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(CAT_VACCINE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Vaccination Schedule',
  toolPath: '/cat/vaccination-schedule/',
  description: 'Generate a personalized vaccination schedule for your cat based on WSAVA global guidelines and AAFP feline vaccination recommendations.',
  citations: TOOL_CITATIONS['cat/vaccination-schedule'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/vaccination-schedule']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat Vaccination Schedule', item: '' },
]);

export default async function CatVaccinationPage() {
  const t = await getTranslations('common');
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Cat', href: 'cat' },
            { label: 'Vaccination Schedule' },
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
                Cat Vaccination Schedule
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Get a personalized vaccination schedule for your cat based on WSAVA core feline vaccine guidelines.
              </p>
            </div>
            <CatVaccinationWidget />
            <KnowledgeCards cards={CAT_VACCINE_KNOWLEDGE} />
            <ScienceBehindIt content={CAT_VACCINE_SCIENCE} />
            <ToolCtaSection
              heading="Check Your Cat's Healthy Weight"
              description="Vaccines keep your cat protected — but what about their weight? Use our BCS Weight Tracker to ensure your cat maintains a healthy body condition."
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
                <li>Core: FVRCP + Rabies</li>
                <li>Kitten series: 6–16 weeks</li>
                <li>FVRCP booster: every 1–3 years</li>
                <li>Rabies: every 1–3 years</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Cat Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href={pageUrl('cat/gestation-calculator')} className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
                <li><a href={pageUrl('cat/hydration-calculator')} className="hover:text-[--cat-primary] transition-colors">Hydration Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
