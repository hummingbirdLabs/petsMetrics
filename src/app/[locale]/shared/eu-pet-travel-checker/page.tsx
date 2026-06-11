import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';
import { createPageUrl } from '@/lib/utils/url';
import {
  generateSoftwareAppJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
  graphJsonLd,
  TOOL_CITATIONS,
  HOWTO_STEPS,
} from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd, EU_TRAVEL_FAQ } from '@/lib/seo/geo-faq';
import { EU_TRAVEL_KNOWLEDGE, EU_TRAVEL_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { getTranslations } from 'next-intl/server';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { EUTravelWidget } from '@/components/shared/EUTravelWidget';

export const metadata: Metadata = {
  title: 'EU Pet Travel Requirements Checker 2026 | petsMetrics',
  description:
    'Check official EU pet travel requirements by destination country. Microchip, rabies vaccine, tapeworm treatment, pet passport. Updated for 2026.',
  keywords: 'EU pet travel requirements, taking dog to Europe, pet passport Europe, bringing dog to France from UK, traveling to Europe with cat, EU pet health certificate, USDA pet travel to Europe',
  alternates: {
    canonical: `${SITE_URL}/shared/eu-pet-travel-checker/`,
  },
  openGraph: {
    title: 'EU Pet Travel Requirements Checker 2026 | petsMetrics',
    description:
      'Verify all EU pet travel requirements for your dog or cat. Includes UK post-Brexit rules and Nordic tapeworm zones.',
    url: `${SITE_URL}/shared/eu-pet-travel-checker/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/eu-pet-travel-checker.webp`, width: 1200, height: 630, alt: 'EU Pet Travel Requirements Checker 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EU Pet Travel Requirements Checker 2026 | petsMetrics',
    description: 'Verify all EU pet travel requirements for your dog or cat. UK post-Brexit rules included.',
    images: [`${SITE_URL}/og/eu-pet-travel-checker.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(EU_TRAVEL_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'EU Pet Travel Requirements Checker',
  toolPath: '/shared/eu-pet-travel-checker/',
  description: 'Check official EU pet travel requirements by destination. Microchip, rabies, tapeworm, pet passport. EU Regulation 576/2013.',
  citations: TOOL_CITATIONS['shared/eu-pet-travel-checker'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['shared/eu-pet-travel-checker']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'EU Pet Travel Requirements Checker', item: '' },
]);

export default async function EUTravelCheckerPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const pageUrl = createPageUrl(locale);
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
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
                Verify all EU pet travel requirements for your dog or cat. Includes UK post-Brexit rules and Nordic tapeworm zones.
              </p>
            </div>
            <EUTravelWidget />
            <KnowledgeCards cards={EU_TRAVEL_KNOWLEDGE} />
            <ScienceBehindIt content={EU_TRAVEL_SCIENCE} />
            <ToolCtaSection
              heading="Check Your Pet's Vaccination Status"
              description="Traveling requires up-to-date vaccines. Use our vaccination schedule to ensure your dog or cat meets all country-specific requirements before your trip."
              href="/dog/vaccination-schedule/"
              buttonLabel="Check Vaccination Schedule →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Required Documents</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>ISO microchip (15-digit)</li>
                <li>Valid rabies vaccination</li>
                <li>EU Pet Passport or Health Certificate</li>
                <li>Tapeworm treatment (UK/IE/FI/MT/NO)</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Timeline</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Start preparation: 3-4 months before</li>
                <li>Rabies vaccine: 21 days before travel</li>
                <li>Titer test wait: 3 months (if required)</li>
                <li>Tapeworm: 1-5 days before entry</li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
