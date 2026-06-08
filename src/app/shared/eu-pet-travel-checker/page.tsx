import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { EUTravelWidget } from '@/components/shared/EUTravelWidget';

export const metadata: Metadata = {
  title: 'EU Pet Travel Requirements Checker 2026 | petsMetrics',
  description:
    'Check official EU pet travel requirements by destination country. Microchip, rabies vaccine, tapeworm treatment, pet passport. Updated for 2026.',
  alternates: {
    canonical: `${SITE_URL}/shared/eu-pet-travel-checker/`,
  },
  openGraph: {
    title: 'EU Pet Travel Requirements Checker 2026 | petsMetrics',
    description:
      'Verify all EU pet travel requirements for your dog or cat. Includes UK post-Brexit rules and Nordic tapeworm zones.',
    url: `${SITE_URL}/shared/eu-pet-travel-checker/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What documents does my pet need to travel to the EU?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pets traveling to the EU need: an ISO-compliant microchip, a valid rabies vaccination (at least 21 days before travel), an EU Pet Passport or Animal Health Certificate, and for certain countries (UK, Ireland, Finland, Malta, Norway) a tapeworm treatment 1-5 days before entry.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long before travel should I start preparing my pet for EU travel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You should start at least 3-4 months before travel. Key timelines: rabies vaccination requires 21 days waiting period, and if a rabies antibody titer test is required, the blood sample must be taken at least 30 days after vaccination with an additional 3-month waiting period. Use our EU Travel Checker to get your specific timeline.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EU Pet Travel Requirements Checker',
  url: `${SITE_URL}/shared/eu-pet-travel-checker/`,
  description: 'Check official EU pet travel requirements by destination. Microchip, rabies, tapeworm, pet passport.',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function EUTravelPage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Tools', href: '' },
            { label: 'EU Pet Travel Checker' },
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
                EU Pet Travel Requirements Checker
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Check all official requirements for traveling with your dog or cat to any EU country. Updated 2026 with post-Brexit UK rules and Nordic tapeworm zones.
              </p>
            </div>
            <EUTravelWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Official Sources</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>EU Regulation (EU) No 576/2013</li>
                <li>UK DEFRA pet travel rules</li>
                <li>EU Pet Movement portal (ec.europa.eu)</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Common Mistakes</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Microchip implanted after rabies vaccine</li>
                <li>Tapeworm treatment given too early/late</li>
                <li>Wrong health certificate format</li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
