import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Dog Years vs Cat Years: How They Compare | petsMetrics',
  description:
    'Science-based comparison of dog and cat aging: lifespan, life stages, and health implications. AAHA and AAFP data cited. Learn how your pet ages differently.',
  keywords:
    'dog years vs cat years, dog aging vs cat aging, pet lifespan comparison, dog life stages vs cat life stages, how do dogs and cats age',
  alternates: {
    canonical: `${SITE_URL}/${locale}/shared/compare/dog-years-vs-cat-years/`,
  },
  openGraph: {
    title: 'Dog Years vs Cat Years: How They Compare | petsMetrics',
    description:
      'Compare dog and cat aging: lifespan, life stages, and health implications. Data from AAHA and AAFP.',
    url: `${SITE_URL}/${locale}/shared/compare/dog-years-vs-cat-years/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog Years vs Cat Years Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Years vs Cat Years | petsMetrics',
    description: 'Science-based comparison of dog and cat aging patterns.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dog Years vs Cat Years: How They Compare',
  description: 'Science-based comparison of dog and cat aging patterns, lifespan, and life stages.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
    { '@type': 'CreativeWork', name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Years vs Cat Years', item: '' },
]);

export default async function DogYearsVsCatYearsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('dogYearsVsCatYears', locale);

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
          { label: 'Dog Years vs Cat Years' },
        ]}
        sourcesText="AAHA and AAFP."
        relatedToolLabels={[
          'Calculate Dog Age →',
          'Calculate Cat Age →',
        ]}
      />
    </>
  );
}
