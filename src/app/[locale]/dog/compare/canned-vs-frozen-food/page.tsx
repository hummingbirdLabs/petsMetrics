import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Canned vs Frozen Dog Food: Nutrition & Cost Compared | petsMetrics',
  description:
    'Compare canned and frozen dog food: nutritional retention, convenience, shelf life, and cost. AAFCO and NRC data cited. Find the best option for your dog.',
  keywords:
    'canned vs frozen dog food, frozen dog food vs canned, fresh dog food comparison, canned or frozen dog food, best dog food type',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/compare/canned-vs-frozen-food/`,
  },
  openGraph: {
    title: 'Canned vs Frozen Dog Food: Nutrition & Cost Compared | petsMetrics',
    description:
      'Compare canned and frozen dog food: nutritional retention, convenience, and cost.',
    url: `${SITE_URL}/${locale}/dog/compare/canned-vs-frozen-food/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Canned vs Frozen Dog Food' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canned vs Frozen Dog Food | petsMetrics',
    description: 'Compare canned and frozen dog food: nutrition and cost.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Canned vs Frozen Dog Food: Nutrition & Cost Compared',
  description: 'Compare canned and frozen dog food: nutritional retention, convenience, and cost.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFCO Dog Food Nutrient Profiles', url: 'https://www.aafco.org/' },
    { '@type': 'CreativeWork', name: 'NRC Nutrient Requirements of Dogs and Cats (2006)', url: 'https://nap.nationalacademies.org/catalog/10668/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Canned vs Frozen Food', item: '' },
]);

export default async function CannedVsFrozenFoodPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('cannedVsFrozen', locale);

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
          { label: 'Dog Hub', href: 'dog' },
          { label: 'Canned vs Frozen Food' },
        ]}
        sourcesText="AAFCO and NRC."
        relatedToolLabels={[
          'Calculate Daily Calories →',
          'Check Food Safety →',
        ]}
      />
    </>
  );
}
