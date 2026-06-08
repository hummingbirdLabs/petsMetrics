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
import { DogVaccinationWidget } from '@/components/dog/DogVaccinationWidget';

export const metadata: Metadata = {
  title: 'Dog Vaccination Schedule — Free Personalized Timeline | petsMetrics',
  description:
    'Generate a complete vaccination schedule for your dog by age and region. DHPP, Rabies, Bordetella and more. Free printable. WSAVA guidelines.',
  alternates: {
    canonical: `${SITE_URL}/dog/vaccination-schedule/`,
  },
  openGraph: {
    title: 'Dog Vaccination Schedule — Free Personalized Timeline | petsMetrics',
    description:
      'Never miss a vaccine. Personalized to your dog\'s age and region. WSAVA core vaccine guidelines.',
    url: `${SITE_URL}/dog/vaccination-schedule/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which vaccinations does my dog need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core vaccines (required for all dogs) include Rabies and DHPP (distemper, hepatitis, parvovirus, parainfluenza). Non-core vaccines like Bordetella and Leptospirosis depend on your region and lifestyle. Our schedule follows WSAVA guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often does my dog need booster shots?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DHPP boosters are typically every 3 years after the initial puppy series. Rabies boosters are every 1–3 years depending on local laws. Annual wellness exams are recommended even in non-booster years. Our calculator generates a personalized timeline.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dog Vaccination Schedule',
  url: `${SITE_URL}/dog/vaccination-schedule/`,
  description: 'Generate a personalized dog vaccination schedule based on age and region. WSAVA guidelines.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function DogVaccinationPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
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
            <DisclaimerSection />
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
                <li><a href="/dog/age-calculator/" className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href="/dog/calorie-calculator/" className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href="/dog/puppy-growth-predictor/" className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
                <li><a href="/dog/gestation-calculator/" className="hover:text-[--dog-primary] transition-colors">Gestation Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
