import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Declawing vs Scratching Post: Humane Alternatives | petsMetrics',
  description:
    'Compare declawing and scratching post training: health impacts, behavioral outcomes, and legal status. AAFP and ISFM guidelines cited. Learn humane alternatives.',
  keywords:
    'declawing vs scratching post, declawing cats alternatives, scratching post vs declaw, is declawing cruel, cat scratching solutions',
  alternates: {
    canonical: `${SITE_URL}/${locale}/cat/compare/declawing-vs-scratching-post/`,
  },
  openGraph: {
    title: 'Declawing vs Scratching Post: Humane Alternatives | petsMetrics',
    description:
      'Compare declawing and scratching post training: health impacts, behavioral outcomes, and legal status.',
    url: `${SITE_URL}/${locale}/cat/compare/declawing-vs-scratching-post/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Declawing vs Scratching Post' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Declawing vs Scratching Post | petsMetrics',
    description: 'Compare declawing and scratching post training.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Declawing vs Scratching Post: Humane Alternatives Compared',
  description: 'Compare declawing and scratching post training: health impacts and behavioral outcomes.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFP Declawing Position Statement', url: 'https://catvets.com/' },
    { '@type': 'CreativeWork', name: 'ISFM Feline Environmental Needs Guidelines', url: 'https://icatcare.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat Hub', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Declawing vs Scratching Post', item: '' },
]);

export default async function DeclawingVsScratchingPostPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('declawingVsScratchingPost', locale);

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
          { label: 'Declawing vs Scratching Post' },
        ]}
        sourcesText="AAFP and ISFM."
        relatedToolLabels={[
          'Check Cat Behavior →',
          'Find Scratching Solutions →',
        ]}
      />
    </>
  );
}
