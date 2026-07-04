import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Adopt vs Buy a Dog: Cost, Ethics & Health Compared | petsMetrics',
  description:
    'Compare adopting vs buying a dog: cost breakdown, health considerations, ethical implications, and long-term commitment. AVMA and shelter data cited.',
  keywords:
    'adopt vs buy a dog, adopt or buy puppy, shelter dog vs breeder, adoption vs purchase cost, should I adopt or buy a dog',
  alternates: {
    canonical: `${SITE_URL}/${locale}/shared/compare/adopt-vs-buy/`,
  },
  openGraph: {
    title: 'Adopt vs Buy a Dog: Cost, Ethics & Health Compared | petsMetrics',
    description:
      'Compare adopting vs buying a dog: cost breakdown, health considerations, and ethical implications.',
    url: `${SITE_URL}/${locale}/shared/compare/adopt-vs-buy/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Adopt vs Buy a Dog Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adopt vs Buy a Dog | petsMetrics',
    description: 'Compare adopting vs buying a dog: cost, ethics, and health.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Adopt vs Buy a Dog: Cost, Ethics & Health Compared',
  description: 'Compare adopting vs buying a dog: cost breakdown, health considerations, and ethical implications.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AVMA Pet Ownership and Demographics Sourcebook', url: 'https://www.avma.org/resources-tools/avma-policies/principles-vaccination' },
    { '@type': 'CreativeWork', name: 'ASPCA Pet Statistics', url: 'https://www.aspca.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Adopt vs Buy', item: '' },
]);

export default async function AdoptVsBuyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('adoptVsBuy', locale);

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
          { label: 'Adopt vs Buy' },
        ]}
        sourcesText="AVMA and ASPCA."
        relatedToolLabels={[
          'Calculate Dog Costs →',
          'Find Local Shelters →',
        ]}
      />
    </>
  );
}
