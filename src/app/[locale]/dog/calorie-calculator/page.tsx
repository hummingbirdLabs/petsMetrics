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
import { generateFaqPageJsonLd, DOG_CALORIE_FAQ } from '@/lib/seo/geo-faq';
import { CALORIE_KNOWLEDGE, CALORIE_SCIENCE } from '@/lib/seo/geo-content';
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
import { DogCalorieWidget } from '@/components/dog/DogCalorieWidget';

export const metadata: Metadata = {
  title: 'Dog Calorie Calculator — How Much to Feed Your Dog | petsMetrics',
  description:
    'Calculate your dog\'s exact daily calorie needs using the AAFCO MER formula. Get feeding amounts for any dog food brand. Based on weight and activity level.',
  keywords: 'dog calorie calculator, how much to feed my dog, dog daily food amount, how many calories does my dog need, dog MER calculator, dog weight loss calorie calculator, dog feeding guide by weight',
  alternates: {
    canonical: `${SITE_URL}/dog/calorie-calculator/`,
  },
  openGraph: {
    title: 'Dog Calorie Calculator — Exact Daily Feeding Guide | petsMetrics',
    description:
      'Calculate your dog\'s exact daily calorie needs. AAFCO MER formula. Weight + activity based.',
    url: `${SITE_URL}/dog/calorie-calculator/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/dog-calorie-calculator.webp`, width: 1200, height: 630, alt: 'Dog Calorie Calculator — Daily Feeding Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Calorie Calculator — How Much to Feed Your Dog | petsMetrics',
    description: 'Calculate your dog\'s exact daily calorie needs. AAFCO MER formula. Weight + activity based.',
    images: [`${SITE_URL}/og/dog-calorie-calculator.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(DOG_CALORIE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Dog Calorie Calculator',
  toolPath: '/dog/calorie-calculator/',
  description: 'Calculate your dog\'s exact daily calorie needs using AAFCO MER formulas. Includes feeding amounts for any dog food brand.',
  citations: TOOL_CITATIONS['dog/calorie-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['dog/calorie-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Dog Calorie Calculator', item: '' },
]);

export default async function DogCaloriePage({ params }: { params: { locale: string } }) {
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
            { label: 'Calorie Calculator' },
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
                Dog Calorie Calculator: How Much Should Your Dog Eat
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate your dog&apos;s exact daily calorie needs using the AAFCO MER formula. Get feeding amounts for any dog food brand.
              </p>
            </div>
            <DogCalorieWidget />
            <KnowledgeCards cards={CALORIE_KNOWLEDGE} />
            <ScienceBehindIt content={CALORIE_SCIENCE} />
            <ToolCtaSection
              heading="Predict Your Puppy's Adult Size"
              description="Knowing your dog's calorie needs is great — but how big will they get? Use our Puppy Growth Predictor to estimate adult size and adjust feeding accordingly."
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
                <li><a href={pageUrl('dog/age-calculator')} className="hover:text-[--dog-primary] transition-colors">Age Calculator</a></li>
                <li><a href={pageUrl('dog/calorie-calculator')} className="text-[--dog-primary] hover:underline font-medium">Calorie Calculator</a></li>
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
