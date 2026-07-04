import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return {
  title: 'Grain-Free vs Grain-Inclusive Dog Food | petsMetrics',
  description:
    'Science-based comparison of grain-free and grain-inclusive dog food: nutritional value, DCM risk, cost, and AAFCO compliance. FDA investigation data cited.',
  keywords:
    'grain free vs grain inclusive dog food, grain free dog food DCM, grain inclusive vs grain free, best dog food grains, grain free dog food risks',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/compare/grain-free-vs-grain-inclusive/`,
  },
  openGraph: {
    title: 'Grain-Free vs Grain-Inclusive Dog Food | petsMetrics',
    description:
      'Compare grain-free and grain-inclusive dog food: nutritional value, DCM risk, and AAFCO compliance.',
    url: `${SITE_URL}/${locale}/dog/compare/grain-free-vs-grain-inclusive/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Grain-Free vs Grain-Inclusive Dog Food' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grain-Free vs Grain-Inclusive Dog Food | petsMetrics',
    description: 'Science-based comparison of grain-free and grain-inclusive dog food.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Grain-Free vs Grain-Inclusive Dog Food: Which Is Better?',
  description: 'Science-based comparison of grain-free and grain-inclusive dog food.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'FDA Investigation into Potential Link between Diet and DCM', url: 'https://www.fda.gov/' },
    { '@type': 'CreativeWork', name: 'AAFCO Dog Food Nutrient Profiles', url: 'https://www.aafco.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Grain-Free vs Grain-Inclusive', item: '' },
]);

export default async function GrainFreeVsGrainInclusivePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('grainFreeVsGrainInclusive', locale);

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
          { label: 'Grain-Free vs Grain-Inclusive' },
        ]}
        sourcesText="FDA and AAFCO."
        relatedToolLabels={[
          'Calculate Daily Calories →',
          'Check Food Safety →',
        ]}
      />
    </>
  );
}
