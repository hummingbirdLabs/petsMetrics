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
import { DogGestationWidget } from '@/components/dog/DogGestationWidget';

export const metadata: Metadata = {
  title: 'Dog Gestation Calculator — Whelping Due Date & Milestones | petsMetrics',
  description:
    'Calculate your dog\'s due date from the mating date. View key pregnancy milestones, vet check windows, and whelping preparation timeline. Based on average 63-day gestation.',
  alternates: {
    canonical: `${SITE_URL}/dog/gestation-calculator/`,
  },
  openGraph: {
    title: 'Dog Gestation Calculator — Whelping Due Date & Milestones | petsMetrics',
    description:
      'Calculate your dog\'s due date. Track key developmental milestones from implantation to whelping.',
    url: `${SITE_URL}/dog/gestation-calculator/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long are dogs pregnant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dogs are pregnant for approximately 63 days (9 weeks) from ovulation. The range is 58–68 days. Our gestation calculator shows the expected due date range and key developmental milestones.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate my dog\'s due date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter the first mating date into our calculator. If multiple matings occurred, add additional dates — the calculator averages them for a more accurate estimate. Key milestones include ultrasound at day 25–35, X-ray at day 45, and whelping box preparation at day 55.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dog Gestation Calculator',
  url: `${SITE_URL}/dog/gestation-calculator/`,
  description: 'Calculate your dog\'s whelping due date and track key pregnancy milestones.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function DogGestationPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
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
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Facts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Average: 63 days</li>
                <li>Range: 58–68 days</li>
                <li>Ultrasound: Day 25–35</li>
                <li>X-ray: Day 45+</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href="/dog/age-calculator/" className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href="/dog/calorie-calculator/" className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href="/dog/puppy-growth-predictor/" className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
                <li><a href="/dog/vaccination-schedule/" className="hover:text-[--dog-primary] transition-colors">Vaccination Schedule</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
