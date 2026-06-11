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
import { generateFaqPageJsonLd, DOG_VACCINE_FAQ } from '@/lib/seo/geo-faq';
import { DOG_VACCINE_KNOWLEDGE, DOG_VACCINE_SCIENCE } from '@/lib/seo/geo-content';
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
import { DogVaccinationWidget } from '@/components/dog/DogVaccinationWidget';

export const metadata: Metadata = {
  title: 'Dog Vaccination Schedule — Free Personalized Timeline | petsMetrics',
  description:
    'Generate a complete vaccination schedule for your dog by age and region. DHPP, Rabies, Bordetella and more. Free printable. WSAVA guidelines.',
  keywords: 'dog vaccination schedule, puppy shot schedule, dog vaccine schedule by age, puppy vaccination chart, when do puppies need shots, dog deworming schedule',
  alternates: {
    canonical: `${SITE_URL}/dog/vaccination-schedule/`,
  },
  openGraph: {
    title: 'Dog Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description:
      'Never miss a vaccine. Personalized to your dog\'s age and region. WSAVA core vaccine guidelines.',
    url: `${SITE_URL}/dog/vaccination-schedule/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/vaccination-schedule.webp`, width: 1200, height: 630, alt: 'Dog Vaccination Schedule — Free Personalized Timeline' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description: 'Never miss a vaccine. Personalized to your dog\'s age and region. WSAVA core vaccine guidelines.',
    images: [`${SITE_URL}/og/vaccination-schedule.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(DOG_VACCINE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Dog Vaccination Schedule',
  toolPath: '/dog/vaccination-schedule/',
  description: 'Generate a personalized vaccination and deworming schedule for your dog based on WSAVA global guidelines and AAHA canine vaccination recommendations.',
  citations: TOOL_CITATIONS['dog/vaccination-schedule'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['dog/vaccination-schedule']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Dog Vaccination Schedule', item: '' },
]);

export default async function DogVaccinationPage({ params }: { params: { locale: string } }) {
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
                Dog Vaccination Schedule
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Get a personalized vaccination and deworming schedule for your dog based on WSAVA core vaccine guidelines.
              </p>
            </div>
            <DogVaccinationWidget />
            <KnowledgeCards cards={DOG_VACCINE_KNOWLEDGE} />
            <ScienceBehindIt content={DOG_VACCINE_SCIENCE} />
            <ToolCtaSection
              heading="Check If Your Dog Eats Something Toxic"
              description="Vaccination is one part of prevention. Know what foods are dangerous too. Use our Toxic Checker to instantly identify 200+ household dangers for dogs."
              href="/shared/toxic-checker/"
              buttonLabel="Check Food Safety →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Facts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Core: DHPP + Rabies</li>
                <li>Puppy series: 6–16 weeks</li>
                <li>DHPP booster: every 3 years</li>
                <li>Rabies: every 1–3 years</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('dog/age-calculator')} className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href={pageUrl('dog/puppy-growth-predictor')} className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
                <li><a href={pageUrl('dog/gestation-calculator')} className="hover:text-[--dog-primary] transition-colors">Gestation Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
