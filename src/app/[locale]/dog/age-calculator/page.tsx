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
import { generateFaqPageJsonLd, DOG_AGE_FAQ } from '@/lib/seo/geo-faq';
import { DOG_AGE_KNOWLEDGE, DOG_AGE_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { getTranslations } from 'next-intl/server';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { DogAgeWidget } from '@/components/dog/DogAgeWidget';

export const metadata: Metadata = {
  title: 'Dog Age Calculator — Dog to Human Years | petsMetrics',
  description:
    'How old is your dog in human years? Our science-based calculator uses breed size and UCSD methylation research — not the outdated 7× rule. Free and instant.',
  keywords: 'dog age calculator, dog years to human years, how old is my dog in human years, dog age chart, how long do dogs live, dog life stages, dog years calculator by breed',
  alternates: {
    canonical: `${SITE_URL}/dog/age-calculator/`,
  },
  openGraph: {
    title: 'Dog Age Calculator — Convert Dog Years to Human Years | petsMetrics',
    description:
      'How old is your dog in human years? Science-based, size-adjusted AAHA guidelines. Not the 7× rule.',
    url: `${SITE_URL}/dog/age-calculator/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/dog-age-calculator.webp`, width: 1200, height: 630, alt: 'Dog Age Calculator — Convert Dog Years to Human Years' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Age Calculator — Dog to Human Years | petsMetrics',
    description: 'How old is your dog in human years? Science-based, size-adjusted AAHA guidelines. Not the 7× rule.',
    images: [`${SITE_URL}/og/dog-age-calculator.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(DOG_AGE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Dog Age Calculator',
  toolPath: '/dog/age-calculator/',
  description: 'Convert dog years to human years using AAHA breed-size-adjusted life stage guidelines and UCSD epigenetic research.',
  citations: TOOL_CITATIONS['dog/age-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['dog/age-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Dog Age Calculator', item: '' },
]);

export default async function DogAgePage({ params }: { params: { locale: string } }) {
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
            <KnowledgeCards cards={DOG_AGE_KNOWLEDGE} />
            <ScienceBehindIt content={DOG_AGE_SCIENCE} />
            <ToolCtaSection
              heading="Predict Your Puppy's Adult Size"
              description="Curious how big your puppy will get? Use our Puppy Growth Predictor with your dog's current age and weight to estimate their adult size using breed-specific growth curves."
              href="/dog/puppy-growth-predictor/"
              buttonLabel="Predict Adult Size →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Dog Health Tools</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('dog/age-calculator')} className="text-[--dog-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="hover:text-[--dog-primary] transition-colors">Calorie Calculator</a></li>
                <li><a href={pageUrl('dog/puppy-growth-predictor')} className="hover:text-[--dog-primary] transition-colors">Puppy Growth</a></li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
