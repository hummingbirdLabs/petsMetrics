import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { createPageUrl } from '@/lib/utils/url';
import {
  generateSoftwareAppJsonLd,
  generateHowToJsonLd,
  generateBreadcrumbJsonLd,
  graphJsonLd,
  TOOL_CITATIONS,
  HOWTO_STEPS,
} from '@/lib/seo/geo-meta';
import { generateFaqPageJsonLd, CAT_BCS_FAQ } from '@/lib/seo/geo-faq';
import { CAT_BCS_KNOWLEDGE, CAT_BCS_SCIENCE } from '@/lib/seo/geo-content';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { getTranslations } from 'next-intl/server';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { AffiliateBanner } from '@/components/shared/AffiliateBanner';
import { ToolCtaSection } from '@/components/shared/ToolCtaSection';
import { KnowledgeCards } from '@/components/shared/KnowledgeCards';
import { ScienceBehindIt } from '@/components/shared/ScienceBehindIt';
import { CatBCSWidget } from '@/components/cat/CatBCSWidget';

export const metadata: Metadata = {
  title: 'Cat Body Condition Score — Is My Cat Overweight? | petsMetrics',
  description:
    'Use our visual BCS assessment to check if your cat is at a healthy weight. Get a safe calorie-reduction plan based on the AAHA 9-point BCS scale.',
  keywords: 'cat body condition score, is my cat overweight, cat weight calculator, how to tell if cat is overweight, cat obesity chart, healthy cat weight by breed, indoor cat weight gain',
  alternates: {
    canonical: `${SITE_URL}/cat/bcs-weight-tracker/`,
  },
  openGraph: {
    title: 'Cat Body Condition Score — Is My Cat Overweight? | petsMetrics',
    description:
      'Assess your cat\'s body condition using the 9-point BCS scale. Get a safe weight management plan with calorie targets.',
    url: `${SITE_URL}/cat/bcs-weight-tracker/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/cat-bcs-weight-tracker.webp`, width: 1200, height: 630, alt: 'Cat Body Condition Score — BCS Weight Tracker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Body Condition Score — Is My Cat Overweight? | petsMetrics',
    description: 'Assess your cat\'s body condition using the 9-point BCS scale. Get a safe weight management plan.',
    images: [`${SITE_URL}/og/cat-bcs-weight-tracker.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(CAT_BCS_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Body Condition Score & Weight Tracker',
  toolPath: '/cat/bcs-weight-tracker/',
  description: 'Assess your cat\'s body condition using the WSAVA 9-point BCS scale and get a safe weight management plan.',
  citations: TOOL_CITATIONS['cat/bcs-weight-tracker'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/bcs-weight-tracker']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat BCS & Weight Tracker', item: '' },
]);

export default async function CatBCSPage({ params }: { params: { locale: string } }) {
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
            <KnowledgeCards cards={CAT_BCS_KNOWLEDGE} />
            <ScienceBehindIt content={CAT_BCS_SCIENCE} />
            <ToolCtaSection
              heading="Check Your Cat's Hydration"
              description="Weight management and hydration go together. Use our Hydration Calculator to ensure your cat gets enough water — a critical factor in healthy weight loss."
              href="/cat/hydration-calculator/"
              buttonLabel="Check Hydration Status →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">About BCS</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Based on the WSAVA 9-point Body Condition Score scale</li>
                <li>Safe calorie targets prevent hepatic lipidosis</li>
                <li>60% of indoor cats are overweight (BCS ≥ 6)</li>
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
