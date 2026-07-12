import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Pet Insurance vs Emergency Fund: Which Is Better? | petsMetrics',
    description:
      'Comprehensive financial comparison of pet insurance and self-insured emergency funds: monthly costs, coverage gaps, claim processes, breed-specific conditions, and breakeven analysis. NAPHIA data cited.',
    keywords:
      'pet insurance vs emergency fund, pet insurance vs savings, is pet insurance worth it, pet emergency fund how much, self insure vs pet insurance',
    alternates: {
      canonical: `${SITE_URL}/${locale}/shared/compare/pet-insurance-vs-emergency-fund/`,
    },
    openGraph: {
      title: 'Pet Insurance vs Emergency Fund: Which Is Better? | petsMetrics',
      description:
        'Comprehensive pet insurance vs emergency fund comparison with NAPHIA data.',
      url: `${SITE_URL}/${locale}/shared/compare/pet-insurance-vs-emergency-fund/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Pet Insurance vs Emergency Fund Comparison' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pet Insurance vs Emergency Fund | petsMetrics',
      description: 'Comprehensive pet insurance vs emergency fund comparison.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pet Insurance vs Emergency Fund: Which Is Better?',
  description: 'Comprehensive pet insurance vs self-insured emergency fund comparison.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-05',
  dateModified: '2026-07-05',
  citation: [
    { '@type': 'CreativeWork', name: 'NAPHIA State of the Industry Report', url: 'https://naphia.org/' },
    { '@type': 'CreativeWork', name: 'AAHA Financial Planning Guidelines', url: 'https://www.aaha.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Pet Insurance vs Emergency Fund', item: '' },
]);

export default async function PetInsuranceVsEmergencyFundPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('petInsuranceVsEmergencyFund', locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, faqSchema, breadcrumbSchema)} />
      <ComparePage
        data={data}
        section="dog"
        t={t}
        tc={tc}
        breadcrumb={[
          { label: 'Home', href: '' },
          { label: 'Pet Insurance vs Emergency Fund' },
        ]}
        sourcesText="NAPHIA and AAHA."
        relatedToolLabels={[
          'Pet Insurance Estimator →',
          'Emergency Cost Calculator →',
        ]}
      />
    </>
  );
}
