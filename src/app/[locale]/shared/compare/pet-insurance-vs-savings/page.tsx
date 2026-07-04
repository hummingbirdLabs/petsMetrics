import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Pet Insurance vs Savings Account: Which Is Better? | petsMetrics',
  description:
    'Compare pet insurance vs self-insurance through savings: cost analysis, coverage gaps, and real-world scenarios. NAPHIA data cited. Make the right choice for your pet.',
  keywords:
    'pet insurance vs savings account, pet insurance vs self insurance, is pet insurance worth it, pet emergency fund vs insurance, pet health insurance comparison',
  alternates: {
    canonical: `${SITE_URL}/${locale}/shared/compare/pet-insurance-vs-savings/`,
  },
  openGraph: {
    title: 'Pet Insurance vs Savings Account: Which Is Better? | petsMetrics',
    description:
      'Compare pet insurance vs self-insurance: cost analysis, coverage gaps, and real-world scenarios. NAPHIA data cited.',
    url: `${SITE_URL}/${locale}/shared/compare/pet-insurance-vs-savings/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Pet Insurance vs Savings Account Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Insurance vs Savings Account | petsMetrics',
    description: 'Compare pet insurance vs self-insurance through savings.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pet Insurance vs Savings Account: Which Is Better?',
  description: 'Compare pet insurance vs self-insurance through savings: cost analysis, coverage gaps, and real-world scenarios.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'NAPHIA State of the Industry Report', url: 'https://naphia.org/' },
    { '@type': 'CreativeWork', name: 'AVMA Pet Ownership and Demographics Sourcebook', url: 'https://www.avma.org/resources-tools/avma-policies/principles-vaccination' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Pet Insurance vs Savings', item: '' },
]);

export default async function PetInsuranceVsSavingsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('petInsuranceVsSavings', locale);

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
          { label: 'Pet Insurance vs Savings' },
        ]}
        sourcesText="NAPHIA and AVMA."
        relatedToolLabels={[
          'Estimate Insurance Costs →',
          'Calculate Emergency Fund →',
        ]}
      />
    </>
  );
}
