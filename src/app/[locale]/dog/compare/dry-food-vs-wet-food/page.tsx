import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Dry Food vs Wet Food for Dogs | petsMetrics',
  description:
    'Science-based comparison of kibble and canned diets: cost, moisture, shelf life, dental health, and palatability. AAFCO and WSAVA data cited. Find the right food for your dog.',
  keywords:
    'dry food vs wet food for dogs, kibble vs canned dog food, wet food vs dry food, best dog food type, dry or wet food for dogs',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/compare/dry-food-vs-wet-food/`,
  },
  openGraph: {
    title: 'Dry Food vs Wet Food for Dogs: Which Is Right? | petsMetrics',
    description:
      'Compare kibble vs canned diets: cost, moisture, shelf life, dental health, and palatability. Data from AAFCO and WSAVA.',
    url: `${SITE_URL}/${locale}/dog/compare/dry-food-vs-wet-food/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dry Food vs Wet Food for Dogs Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dry Food vs Wet Food for Dogs | petsMetrics',
    description: 'Science-based comparison of kibble vs canned diets for dogs.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dry Food vs Wet Food for Dogs: Which Is Right?',
  description: 'Science-based comparison of kibble and canned dog food diets.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFCO Dog Food Nutrient Profiles', url: 'https://www.aafco.org/' },
    { '@type': 'CreativeWork', name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
    { '@type': 'CreativeWork', name: 'WSAVA Global Veterinary Nutrition Guidelines', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Dry vs Wet Food', item: '' },
]);

export default async function DryVsWetPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('dryVsWet', locale);

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
          { label: 'Dry vs Wet Food' },
        ]}
        sourcesText="AAFCO, AAHA, and WSAVA."
        relatedToolLabels={[
          'Calculate Daily Calorie Needs →',
          'Assess Body Condition →',
        ]}
      />
    </>
  );
}
