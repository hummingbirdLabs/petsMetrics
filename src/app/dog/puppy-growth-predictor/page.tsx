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
import { PuppyGrowthWidget } from '@/components/dog/PuppyGrowthWidget';

export const metadata: Metadata = {
  title: 'Puppy Weight Predictor — How Big Will My Puppy Get | petsMetrics',
  description:
    'Predict your puppy\'s adult weight using breed size and growth curves. Track weight milestones with an interactive chart. Science-based estimation.',
  alternates: {
    canonical: `${SITE_URL}/dog/puppy-growth-predictor/`,
  },
  openGraph: {
    title: 'Puppy Adult Weight Predictor — Growth Chart | petsMetrics',
    description:
      'Predict how big your puppy will get. Interactive growth chart with breed-specific curves.',
    url: `${SITE_URL}/dog/puppy-growth-predictor/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I predict how big my puppy will get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our puppy growth predictor uses breed size growth curves. Enter your puppy\'s current age (in weeks), weight, and expected adult size. The tool interpolates from standardized growth curves to estimate adult weight with ±15% variance.',
      },
    },
    {
      '@type': 'Question',
      name: 'When do puppies stop growing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on breed size. Small dogs reach full size by 10–12 months, medium dogs by 12–15 months, large dogs by 18–24 months, and giant breeds can continue growing until 24–36 months.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Puppy Adult Weight Predictor',
  url: `${SITE_URL}/dog/puppy-growth-predictor/`,
  description: 'Predict your puppy\'s adult weight using breed size growth curves and an interactive chart.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function PuppyGrowthPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Dog', href: 'dog' },
            { label: 'Puppy Growth Predictor' },
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
                Puppy Adult Weight Predictor
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Predict how big your puppy will get using breed size and growth curves. Track weight milestones with an interactive growth chart.
              </p>
            </div>
            <PuppyGrowthWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Health Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href="/dog/age-calculator/" className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href="/dog/calorie-calculator/" className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href="/dog/puppy-growth-predictor/" className="text-[--dog-primary] hover:underline font-medium">Puppy Growth</a></li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
