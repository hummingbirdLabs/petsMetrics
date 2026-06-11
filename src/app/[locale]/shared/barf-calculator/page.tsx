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
import { generateFaqPageJsonLd, BARF_FAQ } from '@/lib/seo/geo-faq';
import { BARF_KNOWLEDGE, BARF_SCIENCE } from '@/lib/seo/geo-content';
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
import { BARFWidget } from '@/components/shared/BARFWidget';

export const metadata: Metadata = {
  title: 'BARF Raw Feeding Calculator — Free Daily Portion Guide | petsMetrics',
  description:
    'Calculate daily BARF raw feeding portions for dogs and cats. Muscle meat, bone, liver, organ, and vegetable ratios based on NRC guidelines.',
  keywords: 'BARF calculator, raw dog food calculator, raw feeding calculator, how much raw food to feed dog, 80 10 10 raw diet calculator, BARF diet for beginners, raw feeding guide for dogs',
  alternates: { canonical: `${SITE_URL}/shared/barf-calculator/` },
  openGraph: {
    title: 'BARF Raw Feeding Calculator — Free Daily Portion Guide | petsMetrics',
    description: 'Calculate precise daily raw feeding portions using the 80-10-10 BARF model. Dog and cat calculators.',
    url: `${SITE_URL}/shared/barf-calculator/`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BARF Raw Feeding Calculator — Free Daily Portion Guide | petsMetrics',
    description: 'Calculate precise daily raw feeding portions using the 80-10-10 BARF model. Dog and cat calculators.',
  },
};

const faqSchema = generateFaqPageJsonLd(BARF_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'BARF Raw Feeding Calculator',
  toolPath: '/shared/barf-calculator/',
  description: 'Calculate daily BARF raw feeding portions using the 80-10-10 ratio. NRC and FEDIAF nutrient standards.',
  citations: TOOL_CITATIONS['shared/barf-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['shared/barf-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'BARF Raw Feeding Calculator', item: '' },
]);

export default async function BARFCalculatorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const pageUrl = createPageUrl(locale);
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'BARF Calculator' }]} />
      </div>
      <ErrorBoundaryWrapper>
        <PetProfileBar profile={null} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      </ErrorBoundaryWrapper>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
                BARF Raw Feeding Calculator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate precise daily raw feeding portions based on your pet&apos;s weight and species. Uses the 80-10-10 BARF model.
              </p>
            </div>
            <BARFWidget disclaimerText={t('disclaimer.standard')} />
            <KnowledgeCards cards={BARF_KNOWLEDGE} />
            <ScienceBehindIt content={BARF_SCIENCE} />
            <ToolCtaSection
              heading="Calculate Your Dog's Daily Calories"
              description="Prefer commercial food? Use our Dog Calorie Calculator to find the exact daily portion using the AAFCO MER formula. Compare with your raw feeding plan."
              href="/dog/calorie-calculator/"
              buttonLabel="Calculate Daily Calories →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">BARF Ratios</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Muscle meat: 80% (dog) / 75% (cat)</li>
                <li>Raw meaty bone: 10% / 10%</li>
                <li>Liver: 5% / 5%</li>
                <li>Other organs: 5% / 10%</li>
                <li>Vegetables: 10% (dog only)</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Safety Tips</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Freeze meat 2-3 weeks before feeding</li>
                <li>Use human-grade meat sources</li>
                <li>Sanitize all surfaces after prep</li>
                <li>Never feed cooked bones</li>
              </ul>
            </Card>
            <AffiliateBanner variant="food" />
          </div>
        }
      />
    </>
  );
}
