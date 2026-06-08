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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much water does a cat need per day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cats need approximately 50 ml of water per kilogram of body weight per day. A 4.5 kg (10 lb) cat needs about 225 ml of water daily. This includes water from food — wet food is ~80% water, dry food is ~10% water.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my cat is dehydrated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Signs of dehydration in cats include lethargy, dry gums, loss of skin elasticity (skin tenting), sunken eyes, and decreased urination. Cats on dry-food-only diets are at highest risk. Use our hydration calculator to see if your cat gets enough water from food.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cat Hydration Calculator',
  url: `${SITE_URL}/cat/hydration-calculator/`,
  description: 'Calculate how much water your cat needs daily based on weight and food type.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function CatHydrationPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
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
            <DisclaimerSection />
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
                <li><a href="/cat/age-calculator/" className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href="/cat/gestation-calculator/" className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
                <li><a href="/cat/vaccination-schedule/" className="hover:text-[--cat-primary] transition-colors">Vaccination Schedule</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
