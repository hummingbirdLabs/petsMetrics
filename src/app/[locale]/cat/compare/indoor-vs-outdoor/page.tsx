import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return {
  title: 'Indoor vs Outdoor Cats: Lifespan & Health Comparison | petsMetrics',
  description:
    'Data-driven comparison of indoor-only and outdoor-access cats covering lifespan, disease risk, behavioral needs, and safe enrichment. AAFP and ISFM feline welfare guidelines cited.',
  keywords:
    'indoor vs outdoor cat lifespan, should cats go outside, indoor cat vs outdoor cat health, keep cat indoors or outdoor, outdoor cat risks',
  alternates: {
    canonical: `${SITE_URL}/${locale}/cat/compare/indoor-vs-outdoor/`,
  },
  openGraph: {
    title: 'Indoor vs Outdoor Cats: Lifespan & Health | petsMetrics',
    description:
      'Compare indoor-only vs outdoor-access cat care: lifespan, disease risk, behavioral needs, and the best middle ground approach.',
    url: `${SITE_URL}/${locale}/cat/compare/indoor-vs-outdoor/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Indoor vs Outdoor Cats Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indoor vs Outdoor Cats | petsMetrics',
    description: 'Data-driven comparison of indoor vs outdoor cat care.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Indoor vs Outdoor Cats: Lifespan, Health & Safety Comparison',
  description: 'Data-driven comparison of indoor-only and outdoor-access cat care.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFP Feline Life Stage Guidelines (2021)', url: 'https://catvets.com/life-stage-guidelines' },
    { '@type': 'CreativeWork', name: 'ISFM Guidelines on Feline Environmental Needs', url: 'https://icatcare.org/' },
    { '@type': 'CreativeWork', name: 'WSAVA Global Veterinary Vaccination Guidelines (2024)', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat Hub', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Indoor vs Outdoor', item: '' },
]);

export default async function IndoorVsOutdoorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('indoorVsOutdoor', locale);

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
          { label: 'Indoor vs Outdoor' },
        ]}
        sourcesText="AAFP, ISFM, and WSAVA."
        relatedToolLabels={[
          'Check Hydration Needs →',
          'Assess Body Condition →',
        ]}
      />
    </>
  );
}
