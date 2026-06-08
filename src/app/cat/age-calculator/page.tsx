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
import { CatAgeWidget } from '@/components/cat/CatAgeWidget';

export const metadata: Metadata = {
  title: 'Cat Age Calculator — Cat Years to Human Years | petsMetrics',
  description:
    'How old is your cat in human years? Based on official AAHA/AAFP 2021 Feline Life Stage Guidelines. Learn your cat\'s life stage and health needs.',
  alternates: {
    canonical: `${SITE_URL}/cat/age-calculator/`,
  },
  openGraph: {
    title: 'Cat Age Calculator — Cat Years to Human Years | petsMetrics',
    description:
      'Convert cat years to human years using AAHA/AAFP Feline Life Stage Guidelines. Learn your cat\'s life stage and recommended checkup frequency.',
    url: `${SITE_URL}/cat/age-calculator/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How old is my cat in human years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cats age differently from dogs and humans. A 1-year-old cat is roughly 15 human years. A 5-year-old cat is about 36. Our calculator uses the AAHA/AAFP feline life stage guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the feline life stages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to AAHA/AAFP 2021 guidelines: Kitten (0–6 months), Junior (7 months–2 years), Prime (3–6 years), Mature (7–10 years), Senior (11–14 years), Geriatric (15+ years). Each stage has different health and checkup needs.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cat Age Calculator',
  url: `${SITE_URL}/cat/age-calculator/`,
  description: 'Convert cat years to human years using AAHA/AAFP Feline Life Stage Guidelines.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function CatAgePage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Cat', href: 'cat' },
            { label: 'Age Calculator' },
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
                Cat Age Calculator: Cat Years to Human Years
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                How old is your cat in human years? Based on official AAHA/AAFP 2021 Feline Life Stage Guidelines.
              </p>
            </div>
            <CatAgeWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Cat Life Stages</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Kitten: 0–6 months</li>
                <li>Junior: 7m–2 years</li>
                <li>Prime: 3–6 years</li>
                <li>Mature: 7–10 years</li>
                <li>Senior: 11–14 years</li>
                <li>Geriatric: 15+ years</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Cat Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href="/cat/age-calculator/" className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href="/cat/gestation-calculator/" className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
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
