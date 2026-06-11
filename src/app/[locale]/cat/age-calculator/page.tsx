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
import { generateFaqPageJsonLd, CAT_AGE_FAQ } from '@/lib/seo/geo-faq';
import { CAT_AGE_KNOWLEDGE, CAT_AGE_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { getTranslations } from 'next-intl/server';
import { CatAgeWidget } from '@/components/cat/CatAgeWidget';

export const metadata: Metadata = {
  title: 'Cat Age Calculator — Cat Years to Human Years | petsMetrics',
  description:
    'How old is your cat in human years? Based on official AAHA/AAFP 2021 Feline Life Stage Guidelines. Learn your cat\'s life stage and health needs.',
  keywords: 'cat age calculator, cat years to human years, how old is my cat in human years, cat life stages, how long do cats live, cat age chart',
  alternates: {
    canonical: `${SITE_URL}/cat/age-calculator/`,
  },
  openGraph: {
    title: 'Cat Age Calculator — Cat Years to Human Years | petsMetrics',
    description:
      'Convert cat years to human years using AAHA/AAFP Feline Life Stage Guidelines. Learn your cat\'s life stage and recommended checkup frequency.',
    url: `${SITE_URL}/cat/age-calculator/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/cat-age-calculator.webp`, width: 1200, height: 630, alt: 'Cat Age Calculator — Cat Years to Human Years' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Age Calculator — Cat Years to Human Years | petsMetrics',
    description: 'Convert cat years to human years using AAHA/AAFP Feline Life Stage Guidelines.',
    images: [`${SITE_URL}/og/cat-age-calculator.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(CAT_AGE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Age Calculator',
  toolPath: '/cat/age-calculator/',
  description: 'Convert cat years to human years using AAFP/AAHA feline life stage guidelines. Understand your cat\'s life stage and recommended health screening frequency.',
  citations: TOOL_CITATIONS['cat/age-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/age-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat Age Calculator', item: '' },
]);

export default async function CatAgePage({ params }: { params: { locale: string } }) {
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
            <KnowledgeCards cards={CAT_AGE_KNOWLEDGE} />
            <ScienceBehindIt content={CAT_AGE_SCIENCE} />
            <ToolCtaSection
              heading="Track Your Cat's Health Over Time"
              description="Now that you know your cat's life stage, use our BCS Weight Tracker to monitor their body condition and ensure they stay at a healthy weight at every age."
              href="/cat/bcs-weight-tracker/"
              buttonLabel="Check Body Condition →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
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
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
                <li><a href={pageUrl('cat/gestation-calculator')} className="hover:text-[--cat-primary] transition-colors">Gestation Calculator</a></li>
                <li><a href={pageUrl('cat/vaccination-schedule')} className="hover:text-[--cat-primary] transition-colors">Vaccination Schedule</a></li>
                <li><a href={pageUrl('cat/hydration-calculator')} className="hover:text-[--cat-primary] transition-colors">Hydration Calculator</a></li>
              </ul>
            </Card>
          </div>
        }
      />
    </>
  );
}
