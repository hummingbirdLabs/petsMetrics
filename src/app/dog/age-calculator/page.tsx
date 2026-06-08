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
import { DogAgeWidget } from '@/components/dog/DogAgeWidget';

export const metadata: Metadata = {
  title: 'Dog Age Calculator — Dog to Human Years | petsMetrics',
  description:
    'How old is your dog in human years? Our science-based calculator uses breed size and UCSD methylation research — not the outdated 7× rule. Free and instant.',
  alternates: {
    canonical: `${SITE_URL}/dog/age-calculator/`,
  },
  openGraph: {
    title: 'Dog Age Calculator — Convert Dog Years to Human Years | petsMetrics',
    description:
      'How old is your dog in human years? Science-based, size-adjusted AAHA guidelines. Not the 7× rule.',
    url: `${SITE_URL}/dog/age-calculator/`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate my dog\'s age in human years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our dog age calculator uses AAHA 2023 life stage guidelines adjusted by breed size. Small dogs age slower than large dogs — a 5-year-old Chihuahua is roughly 36 human years, while a 5-year-old Great Dane is about 42.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is the 7× rule inaccurate for dogs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The "multiply by 7" formula ignores the rapid maturation in the first 2 years of a dog\'s life and the size-dependent aging rates. Our calculator accounts for breed size, which is backed by AAHA guidelines and UCSD methylation research.',
      },
    },
  ],
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dog Age Calculator',
  url: `${SITE_URL}/dog/age-calculator/`,
  description: 'Convert dog years to human years using AAHA breed-size-adjusted life stage guidelines.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
};

export default function DogAgePage() {
  return (
    <>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={appSchema} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'Dog', href: 'dog' },
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
                Dog Age Calculator: Dog Years to Human Years
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                How old is your dog in human years? Our calculator uses breed size — not the outdated 7× rule.
              </p>
            </div>
            <DogAgeWidget />
            <DisclaimerSection />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Health Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href="/dog/age-calculator/" className="text-[--dog-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href="/dog/calorie-calculator/" className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
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
