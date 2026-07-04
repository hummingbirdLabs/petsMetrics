import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Wet Food vs Dry Food for Cats: Which Is Better? | petsMetrics',
  description:
    'Science-based comparison of wet and dry cat food: hydration, dental health, cost, and urinary health. AAFP and AAFCO data cited. Find the right food for your cat.',
  keywords:
    'wet food vs dry food for cats, wet vs dry cat food, best cat food type, wet food or dry food for cats, cat food comparison',
  alternates: {
    canonical: `${SITE_URL}/${locale}/cat/compare/wet-food-vs-dry-food/`,
  },
  openGraph: {
    title: 'Wet Food vs Dry Food for Cats: Which Is Better? | petsMetrics',
    description:
      'Compare wet and dry cat food: hydration, dental health, cost, and urinary health.',
    url: `${SITE_URL}/${locale}/cat/compare/wet-food-vs-dry-food/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Wet Food vs Dry Food for Cats' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wet Food vs Dry Food for Cats | petsMetrics',
    description: 'Science-based comparison of wet and dry cat food.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wet Food vs Dry Food for Cats: Which Is Better?',
  description: 'Science-based comparison of wet and dry cat food.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
    { '@type': 'CreativeWork', name: 'AAFCO Cat Food Nutrient Profiles', url: 'https://www.aafco.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat Hub', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Wet vs Dry Food', item: '' },
]);

export default async function WetFoodVsDryFoodPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('catWetVsDry', locale);

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
        section="cat"
        t={t}
        tc={tc}
        breadcrumb={[
          { label: 'Home', href: '' },
          { label: 'Cat Hub', href: 'cat' },
          { label: 'Wet vs Dry Food' },
        ]}
        sourcesText="AAFP and AAFCO."
        relatedToolLabels={[
          'Calculate Cat Hydration →',
          'Check Body Condition →',
        ]}
      />
    </>
  );
}
