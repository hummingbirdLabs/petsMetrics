import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { CatVaccinationWidget } from '@/components/cat/CatVaccinationWidget';

export const metadata: Metadata = {
  title: 'Cat Vaccination Schedule — Free Personalized Timeline | petsMetrics',
  description:
    'Generate a complete vaccination schedule for your cat by age and region. Core (FVRCP, Rabies) and non-core (FeLV) vaccines with WSAVA & AAFP guidelines.',
  alternates: {
    canonical: `${SITE_URL}/cat/vaccination-schedule/`,
  },
  openGraph: {
    title: 'Cat Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description:
      'Never miss a vaccine. Personalized to your cat\'s age and region. WSAVA core feline vaccine guidelines.',
    url: `${SITE_URL}/cat/vaccination-schedule/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which vaccinations does my cat need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core vaccines (required for all cats) include Rabies and FVRCP (feline viral rhinotracheitis, calicivirus, panleukopenia). Non-core vaccines like FeLV (feline leukemia virus) depend on your region and lifestyle. Our schedule follows WSAVA and AAFP feline guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often does my cat need booster shots?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FVRCP boosters are typically every 1–3 years after the initial kitten series. Rabies boosters are every 1–3 years depending on local laws. Annual wellness exams are recommended even in non-booster years. Our calculator generates a personalized timeline.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cat Vaccination Schedule',
  url: `${SITE_URL}/cat/vaccination-schedule/`,
  description: 'Generate a personalized cat vaccination schedule based on age and region. WSAVA feline guidelines.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function CatVaccinationPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
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
            <DisclaimerSection />
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
                <li><a href="/cat/age-calculator/" className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href="/cat/gestation-calculator/" className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
                <li><a href="/cat/hydration-calculator/" className="hover:text-[--cat-primary] transition-colors">Hydration Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
