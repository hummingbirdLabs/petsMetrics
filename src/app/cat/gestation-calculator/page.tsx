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
import { CatGestationWidget } from '@/components/cat/CatGestationWidget';

export const metadata: Metadata = {
  title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
  description:
    'Calculate your cat\'s due date from the mating date. View key pregnancy milestones, ultrasound windows, and queening preparation timeline. Based on average 65-day feline gestation.',
  alternates: {
    canonical: `${SITE_URL}/cat/gestation-calculator/`,
  },
  openGraph: {
    title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
    description:
      'Calculate your cat\'s due date. Track key developmental milestones from implantation to queening.',
    url: `${SITE_URL}/cat/gestation-calculator/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long are cats pregnant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cats are pregnant for approximately 65 days (about 9 weeks) from mating. The range is 61–67 days. Our gestation calculator shows the expected due date range and key developmental milestones.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate my cat\'s due date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter the first mating date into our calculator. If multiple matings occurred, add additional dates — the calculator averages them for a more accurate estimate. Key milestones include ultrasound confirmation at day 21, fetal development at day 28, and queening box preparation at day 55.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cat Gestation Calculator',
  url: `${SITE_URL}/cat/gestation-calculator/`,
  description: 'Calculate your cat\'s queening due date and track key pregnancy milestones.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function CatGestationPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
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
            <DisclaimerSection />
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
                <li><a href="/cat/age-calculator/" className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href="/cat/vaccination-schedule/" className="hover:text-[--cat-primary] transition-colors">Vaccination Schedule</a></li>
                <li><a href="/cat/hydration-calculator/" className="hover:text-[--cat-primary] transition-colors">Hydration Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
