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
import { generateFaqPageJsonLd, TOXIC_CHECKER_FAQ } from '@/lib/seo/geo-faq';
import { TOXIC_CHECKER_KNOWLEDGE, TOXIC_CHECKER_SCIENCE } from '@/lib/seo/geo-content';
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
import { ToxicCheckerWidget } from '@/components/shared/ToxicCheckerWidget';

export const metadata: Metadata = {
  title: 'Toxic Food & Plant Checker for Dogs & Cats | petsMetrics',
  description:
    'Instantly check if any food or plant is safe for your dog or cat. 200+ items in our database. Severity ratings, symptoms, and vet hotline included.',
  keywords: 'dog toxic food checker, cat toxic plant checker, is it safe for dogs, can dogs eat, what foods are toxic to dogs, foods dogs can\'t eat list, plants toxic to cats, human foods safe for dogs',
  alternates: {
    canonical: `${SITE_URL}/shared/toxic-checker/`,
  },
  openGraph: {
    title: 'Toxic Food & Plant Checker for Dogs & Cats | petsMetrics',
    description:
      'Check food and plant safety for your pet — 200+ items. Get toxicity levels, symptoms, and emergency numbers.',
    url: `${SITE_URL}/shared/toxic-checker/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/toxic-checker.webp`, width: 1200, height: 630, alt: 'Toxic Food & Plant Checker for Dogs & Cats' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toxic Food & Plant Checker for Dogs & Cats | petsMetrics',
    description: 'Check food and plant safety for your pet — 200+ items. Get toxicity levels, symptoms, and emergency numbers.',
    images: [`${SITE_URL}/og/toxic-checker.webp`],
  },
};

const faqSchema = generateFaqPageJsonLd(TOXIC_CHECKER_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Toxic Food & Plant Checker',
  toolPath: '/shared/toxic-checker/',
  description: 'Check if any food or plant is safe for your dog or cat. 200+ items with toxicity levels, symptoms, and ASPCA-backed data.',
  citations: TOOL_CITATIONS['shared/toxic-checker'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['shared/toxic-checker']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Toxic Food & Plant Checker', item: '' },
]);

export default async function ToxicCheckerPage({ params }: { params: { locale: string } }) {
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
            { label: 'Toxic Checker' },
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
                Toxic Food &amp; Plant Checker
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Is that food or plant safe for your pet? Search our database of 200+ items instantly — no login, no signup.
              </p>
            </div>
            <ToxicCheckerWidget />
            <KnowledgeCards cards={TOXIC_CHECKER_KNOWLEDGE} />
            <ScienceBehindIt content={TOXIC_CHECKER_SCIENCE} />
            <ToolCtaSection
              heading="Check If a Specific Food Is Safe"
              description="Wondering about a particular food? Browse our 200+ detailed guides covering grapes, chocolate, lilies, and more. Each page shows safety status, symptoms, and emergency steps."
              href="/dog/can-dogs-eat-grapes/"
              buttonLabel="Browse All Food Guides →"
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Emergency Contacts</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>ASPCA Poison Control: (888) 426-4435</li>
                <li>Pet Poison Helpline: (855) 764-7661</li>
                <li>Always contact a vet immediately if ingestion occurred</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Vet Tip</p>
              <p className="mt-2 text-sm text-[--gray-600]">
                If your pet ate something suspicious, save a sample and call your vet or poison control immediately. Do not induce vomiting without professional guidance.
              </p>
            </Card>
          </div>
        }
      />
    </>
  );
}
