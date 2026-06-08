import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { CatBCSWidget } from '@/components/cat/CatBCSWidget';

export const metadata: Metadata = {
  title: 'Cat Body Condition Score — Is My Cat Overweight? | petsMetrics',
  description:
    'Use our visual BCS assessment to check if your cat is at a healthy weight. Get a safe calorie-reduction plan based on the AAHA 9-point BCS scale.',
  alternates: {
    canonical: `${SITE_URL}/cat/bcs-weight-tracker/`,
  },
  openGraph: {
    title: 'Cat Body Condition Score — Is My Cat Overweight? | petsMetrics',
    description:
      'Assess your cat\'s body condition using the 9-point BCS scale. Get a safe weight management plan with calorie targets.',
    url: `${SITE_URL}/cat/bcs-weight-tracker/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I tell if my cat is overweight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Body Condition Score (BCS) 1-9 scale. Feel your cat\'s ribs — you should feel them with a slight fat cover. Look down from above — there should be a visible waist behind the ribs. About 60% of indoor cats are overweight (BCS 6+).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is hepatic lipidosis in cats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hepatic lipidosis (fatty liver disease) is a serious condition that occurs when a cat loses weight too quickly. The liver becomes overwhelmed with fat metabolism and can fail. Never restrict a cat\'s calories below 80% of their ideal-weight RER without veterinary supervision.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cat Body Condition Score & Weight Calculator',
  url: `${SITE_URL}/cat/bcs-weight-tracker/`,
  description: 'Assess your cat\'s body condition using the AAHA 9-point BCS scale and get a safe weight management plan.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function CatBCSPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Cat', href: 'cat' },
            { label: 'BCS & Weight Tracker' },
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
                Cat Body Condition Score & Weight Tracker
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Assess your cat&apos;s body condition visually and get a science-based weight management plan. 60% of indoor cats are overweight — find out where yours stands.
              </p>
            </div>
            <CatBCSWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">About BCS</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Based on the AAHA 9-point Body Condition Score scale</li>
                <li>Safe calorie targets prevent hepatic lipidosis</li>
                <li>60% of indoor cats are overweight (BCS &ge; 6)</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Tips</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Feel ribs with a slight fat cover = ideal</li>
                <li>Visible waist from above = healthy weight</li>
                <li>Never cut calories below 80% of ideal-weight RER</li>
              </ul>
            </Card>
            <AffiliateBanner variant="food" />
          </div>
        }
      />
    </>
  );
}
