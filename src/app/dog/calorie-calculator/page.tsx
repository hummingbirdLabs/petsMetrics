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
import { DogCalorieWidget } from '@/components/dog/DogCalorieWidget';

export const metadata: Metadata = {
  title: 'Dog Calorie Calculator — How Much to Feed Your Dog | petsMetrics',
  description:
    'Calculate your dog\'s exact daily calorie needs using the AAFCO MER formula. Get feeding amounts for any dog food brand. Based on weight and activity level.',
  alternates: {
    canonical: `${SITE_URL}/dog/calorie-calculator/`,
  },
  openGraph: {
    title: 'Dog Calorie Calculator — Exact Daily Feeding Guide | petsMetrics',
    description:
      'Calculate your dog\'s exact daily calorie needs. AAFCO MER formula. Weight + activity based.',
    url: `${SITE_URL}/dog/calorie-calculator/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate my dog\'s daily calorie needs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our calorie calculator uses the AAFCO Maintenance Energy Requirement (MER) formula: RER × activity multiplier. RER = 70 × (weight in kg)^0.75. The multiplier adjusts for neuter status, activity level, and life stage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I feed my dog each day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The amount depends on your dog\'s weight, activity level, neuter status, and the calorie density of their food. Our calculator shows both the daily calorie target and the grams of food needed based on your specific dog food\'s kcal/kg.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dog Calorie Calculator',
  url: `${SITE_URL}/dog/calorie-calculator/`,
  description: 'Calculate your dog\'s exact daily calorie needs using AAFCO MER formulas. Includes feeding amounts for any dog food brand.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function DogCaloriePage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Dog', href: 'dog' },
            { label: 'Calorie Calculator' },
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
                Dog Calorie Calculator: How Much Should Your Dog Eat
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate your dog&apos;s exact daily calorie needs using the AAFCO MER formula. Get feeding amounts for any dog food brand.
              </p>
            </div>
            <DogCalorieWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Health Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href="/dog/age-calculator/" className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href="/dog/calorie-calculator/" className="text-[--dog-primary] hover:underline font-medium">Calorie Calculator</a></li>
                <li><a href="/dog/puppy-growth-predictor/" className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
