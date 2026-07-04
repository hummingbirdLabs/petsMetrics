import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Raw Diet vs Kibble for Dogs: Science & Safety Compared | petsMetrics',
  description:
    'Objective comparison of BARF raw diet vs commercial kibble for dogs: nutritional completeness, bacterial risks, cost, dental benefits, and practical feasibility. NRC and AVMA data cited.',
  keywords:
    'raw diet vs kibble, BARF vs commercial dog food pros cons, raw feeding vs kibble, raw dog food safety, is raw food better than kibble',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/compare/raw-diet-vs-kibble/`,
  },
  openGraph: {
    title: 'Raw Diet vs Kibble for Dogs: Safety & Cost | petsMetrics',
    description:
      'Compare BARF raw diets vs kibble: bacterial risks, nutrition, cost, and dental benefits. NRC and AVMA data cited.',
    url: `${SITE_URL}/${locale}/dog/compare/raw-diet-vs-kibble/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Raw Diet vs Kibble Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raw Diet vs Kibble for Dogs | petsMetrics',
    description: 'Science-based comparison of raw feeding vs commercial kibble for dogs.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Raw Diet vs Kibble for Dogs: Science, Safety & Cost Compared',
  description: 'Objective comparison of BARF raw diets and commercial kibble for dogs.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'NRC Nutrient Requirements of Dogs and Cats (2006)', url: 'https://nap.nationalacademies.org/catalog/10668/' },
    { '@type': 'CreativeWork', name: 'AVMA Raw Pet Food Position Statement', url: 'https://www.avma.org/resources-tools/avma-policies/raw-or-uncooked-animal-source-protein-diets-companion-animals' },
    { '@type': 'CreativeWork', name: 'FEDIAF Nutritional Guidelines for Complete and Complementary Pet Food', url: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Raw vs Kibble', item: '' },
]);

export default async function RawVsKibblePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('rawVsKibble', locale);

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
          { label: 'Raw vs Kibble' },
        ]}
        warningKey="rawWarning"
        sourcesText="NRC, AVMA, and FEDIAF."
        relatedToolLabels={[
          'Calculate BARF Portions →',
          'Calculate Daily Calorie Needs →',
        ]}
      />
    </>
  );
}
