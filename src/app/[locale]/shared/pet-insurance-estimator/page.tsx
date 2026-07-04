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
import { generateFaqPageJsonLd, INSURANCE_FAQ } from '@/lib/seo/geo-faq';
import { INSURANCE_KNOWLEDGE, INSURANCE_SCIENCE } from '@/lib/seo/geo-content';
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
import { InsuranceWidget } from '@/components/shared/InsuranceWidget';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
  title: 'Pet Insurance Cost Estimator — Compare Plans Instantly | petsMetrics',
  description:
    'Compare pet insurance rates from Lemonade, Pumpkin, Trupanion, and Petplan. Get monthly estimates based on breed, age, and location.',
  keywords: 'pet insurance calculator, pet insurance cost estimator, how much is pet insurance, is pet insurance worth it, best pet insurance for dogs, dog insurance comparison',
  alternates: { canonical: `${SITE_URL}/${locale}/shared/pet-insurance-estimator/` },
  openGraph: {
    title: 'Pet Insurance Cost Estimator — Compare Plans Instantly | petsMetrics',
    description: 'Compare monthly pet insurance premiums based on breed, age, and location. NAPHIA industry data.',
    url: `${SITE_URL}/${locale}/shared/pet-insurance-estimator/`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Insurance Cost Estimator — Compare Plans Instantly | petsMetrics',
    description: 'Compare monthly pet insurance premiums based on breed, age, and location. NAPHIA industry data.',
  },
};
}

const faqSchema = generateFaqPageJsonLd(INSURANCE_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Pet Insurance Cost Estimator',
  toolPath: '/shared/pet-insurance-estimator/',
  description: 'Compare pet insurance rates and coverage options. NAPHIA industry data.',
  citations: TOOL_CITATIONS['shared/pet-insurance-estimator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['shared/pet-insurance-estimator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Pet Insurance Cost Estimator', item: '' },
]);

export default async function PetInsuranceEstimatorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const pageUrl = createPageUrl(locale);
  return (
    <>
      <JsonLdScript data={graphJsonLd(faqSchema, softwareAppSchema, howToSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Home', href: '' }, { label: 'Insurance Estimator' }]} />
      </div>
      <ErrorBoundaryWrapper>
        <PetProfileBar profile={null} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      </ErrorBoundaryWrapper>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
                Pet Insurance Cost Estimator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Compare monthly premiums from top providers based on your pet&apos;s breed, age, and location. All links are affiliate and clearly marked Sponsored.
              </p>
            </div>
            <InsuranceWidget disclaimerText={t('disclaimer.standard')} />
            <KnowledgeCards cards={INSURANCE_KNOWLEDGE} locale={locale} />
            <ScienceBehindIt content={INSURANCE_SCIENCE} />
            <ToolCtaSection
              heading={t('toolCta.calculateCalories.heading')}
              description={t('toolCta.calculateCalories.description')}
              href={pageUrl('dog/calorie-calculator')}
              buttonLabel={t('toolCta.calculateCalories.button')}
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.averageMonthlyCosts')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Dog (accident & illness): ~$53/mo</li>
                <li>Cat (accident & illness): ~$32/mo</li>
                <li>Accident-only: from $15/mo</li>
                <li>Comprehensive + wellness: $50-100/mo</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.whatAffectsCost')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Species: dogs cost more than cats</li>
                <li>Breed: large & brachycephalic = higher</li>
                <li>Age: premiums rise after age 5</li>
                <li>Location: urban areas are more expensive</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
          </div>
        }
      />
    </>
  );
}
