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
import { generateFaqPageJsonLd, CAT_GESTATION_FAQ } from '@/lib/seo/geo-faq';
import { CAT_GESTATION_KNOWLEDGE, CAT_GESTATION_SCIENCE } from '@/lib/seo/geo-content';
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
import { CatGestationWidget } from '@/components/cat/CatGestationWidget';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
    description:
      'Calculate your cat\'s due date from the mating date. View key pregnancy milestones, ultrasound windows, and queening preparation timeline. Based on average 65-day feline gestation.',
    keywords: 'cat pregnancy calculator, how long are cats pregnant, cat due date calculator, cat gestation period, signs of cat pregnancy, cat pregnancy stages',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/gestation-calculator/`,
    },
    openGraph: {
      title: 'Cat Gestation Calculator — Kitten Due Date & Milestones | petsMetrics',
      description:
        'Calculate your cat\'s due date. Track key developmental milestones from implantation to queening.',
      url: `${SITE_URL}/${locale}/cat/gestation-calculator/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/gestation-calculator.webp`, width: 1200, height: 630, alt: 'Cat Gestation Calculator — Due Date & Milestones' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cat Gestation Calculator — Kitten Due Date | petsMetrics',
      description: 'Calculate your cat\'s due date. Track key developmental milestones from implantation to queening.',
      images: [`${SITE_URL}/og/gestation-calculator.webp`],
    },
  };
}

const faqSchema = generateFaqPageJsonLd(CAT_GESTATION_FAQ);

const softwareAppSchema = generateSoftwareAppJsonLd({
  toolName: 'Cat Gestation Calculator',
  toolPath: '/cat/gestation-calculator/',
  description: 'Calculate your cat\'s queening due date and track key fetal development milestones based on AAFP and ISFM feline reproduction guidelines.',
  citations: TOOL_CITATIONS['cat/gestation-calculator'],
});

const howToSchema = generateHowToJsonLd(HOWTO_STEPS['cat/gestation-calculator']);

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Cat Gestation Calculator', item: '' },
]);

export default async function CatGestationPage({ params }: { params: { locale: string } }) {
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
            { label: 'Gestation Calculator' },
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
                Cat Gestation Calculator
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Calculate your cat&apos;s due date, track key developmental milestones, and prepare for queening.
              </p>
            </div>
            <CatGestationWidget />
            <KnowledgeCards cards={CAT_GESTATION_KNOWLEDGE} locale={locale} />
            <ScienceBehindIt content={CAT_GESTATION_SCIENCE} />
            <ToolCtaSection
              heading={t('toolCta.planCatVaccination.heading')}
              description={t('toolCta.planCatVaccination.description')}
              href={pageUrl('cat/vaccination-schedule')}
              buttonLabel={t('toolCta.planCatVaccination.button')}
            />
            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.quickFacts')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>{t('sidebar.catGestation.average')}</li>
                <li>{t('sidebar.catGestation.range')}</li>
                <li>{t('sidebar.catGestation.ultrasound')}</li>
                <li>{t('sidebar.catGestation.xray')}</li>
              </ul>
            </Card>
            <AffiliateBanner variant="insurance" />
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">{t('sidebar.catTools')}</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li><a href={pageUrl('cat/age-calculator')} className="text-[--cat-primary] hover:underline font-medium">Age Calculator</a></li>
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
