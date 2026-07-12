import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Scratching Post vs Cat Tree: Which Does Your Cat Need? | petsMetrics',
    description:
      'Detailed comparison of scratching posts and cat trees: space requirements, scratching behavior, vertical territory, multi-cat households, and cost. AAFP and ISFM guidelines cited.',
    keywords:
      'scratching post vs cat tree, cat tree vs scratching post, best cat scratching solution, cat tree for multiple cats, scratching post alternatives',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/compare/scratching-post-vs-cat-tree/`,
    },
    openGraph: {
      title: 'Scratching Post vs Cat Tree: Which Does Your Cat Need? | petsMetrics',
      description:
        'Detailed comparison of scratching posts and cat trees based on AAFP and ISFM guidelines.',
      url: `${SITE_URL}/${locale}/cat/compare/scratching-post-vs-cat-tree/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Scratching Post vs Cat Tree Comparison' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Scratching Post vs Cat Tree | petsMetrics',
      description: 'Scratching posts vs cat trees: comprehensive comparison.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Scratching Post vs Cat Tree: Which Does Your Cat Need?',
  description: 'Detailed comparison of scratching posts and cat trees.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-05',
  dateModified: '2026-07-05',
  citation: [
    { '@type': 'CreativeWork', name: 'AAFP Feline Environmental Needs Guidelines', url: 'https://catvets.com/' },
    { '@type': 'CreativeWork', name: 'ISFM Environmental Needs Guidelines', url: 'https://icatcare.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Cat Hub', item: `${SITE_URL}/cat/` },
  { position: 3, name: 'Scratching Post vs Cat Tree', item: '' },
]);

export default async function ScratchingPostVsCatTreePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('scratchingPostVsCatTree', locale);

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
          { label: 'Scratching Post vs Cat Tree' },
        ]}
        sourcesText="AAFP and ISFM."
        relatedToolLabels={[
          'Check Cat Behavior →',
          'Cat BCS Tracker →',
        ]}
      />
    </>
  );
}
