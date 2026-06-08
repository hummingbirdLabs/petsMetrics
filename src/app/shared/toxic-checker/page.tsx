import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { ToxicCheckerWidget } from '@/components/shared/ToxicCheckerWidget';

export const metadata: Metadata = {
  title: 'Toxic Food & Plant Checker for Dogs & Cats | petsMetrics',
  description:
    'Instantly check if any food or plant is safe for your dog or cat. 200+ items in our database. Severity ratings, symptoms, and vet hotline included.',
  alternates: {
    canonical: `${SITE_URL}/shared/toxic-checker/`,
  },
  openGraph: {
    title: 'Toxic Food & Plant Checker for Dogs & Cats | petsMetrics',
    description:
      'Check food and plant safety for your pet — 200+ items. Get toxicity levels, symptoms, and emergency numbers.',
    url: `${SITE_URL}/shared/toxic-checker/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What foods are toxic to dogs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common toxic foods for dogs include grapes, raisins, chocolate, xylitol, onions, garlic, macadamia nuts, avocado, alcohol, coffee/caffeine, raw yeast dough, and moldy food. Our toxic checker instantly identifies 200+ items with severity ratings and symptoms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if my dog ate something toxic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your dog has ingested a toxic substance, contact ASPCA Poison Control at (888) 426-4435 or the Pet Poison Helpline at (855) 764-7661 immediately. Time is critical. Have the food/plant name and approximate amount consumed ready.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Toxic Food & Plant Checker',
  url: `${SITE_URL}/shared/toxic-checker/`,
  description: 'Check if any food or plant is safe for your dog or cat. 200+ items with toxicity levels and symptoms.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function ToxicCheckerPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Tools', href: '' },
            { label: 'Toxic Checker' },
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
                Toxic Food &amp; Plant Checker
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Is that food or plant safe for your pet? Search our database of 200+ items instantly — no login, no signup.
              </p>
            </div>
            <ToxicCheckerWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Emergency Contacts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>ASPCA Poison Control: (888) 426-4435</li>
                <li>Pet Poison Helpline: (855) 764-7661</li>
                <li>Always contact a vet immediately if ingestion occurred</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Vet Tip</p>
              <p className="mt-2 text-sm text-[--gray-600]">
                If your pet ate something suspicious, save a sample and call your vet or poison control immediately. Do not induce vomiting without professional guidance.
              </p>
            </Card>
          </div>
        }
      />
    </>
  );
}
