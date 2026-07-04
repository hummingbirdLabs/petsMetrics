import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Spayed vs Unspayed Dog: Health, Behavior & Timing | petsMetrics',
  description:
    'Balanced comparison of spay/neuter vs keeping your dog intact: pyometra elimination, cancer risk trade-offs, orthopedic timing concerns, and breed-specific recommendations. AAHA and AVMA guidelines cited.',
  keywords:
    'spayed vs unspayed dog, spay neuter pros cons, best age to spay dog, should I spay my dog, early spay neuter risks',
  alternates: {
    canonical: `${SITE_URL}/${locale}/dog/compare/spayed-vs-unspayed/`,
  },
  openGraph: {
    title: 'Spayed vs Unspayed Dog: Health & Timing | petsMetrics',
    description:
      'Compare spay/neuter benefits and risks: pyometra elimination, cancer timing, orthopedic concerns, and breed-specific age recommendations.',
    url: `${SITE_URL}/${locale}/dog/compare/spayed-vs-unspayed/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Spayed vs Unspayed Dog Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spayed vs Unspayed Dog | petsMetrics',
    description: 'Balanced comparison of spay/neuter timing and health trade-offs for dogs.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Spayed vs Unspayed Dog: Health, Behavior & Timing',
  description: 'Balanced comparison of spay/neuter vs keeping your dog intact.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
    { '@type': 'CreativeWork', name: 'AVMA Spay-Neuter Policy', url: 'https://www.avma.org/resources-tools/avma-policies/spayneuter-dogs' },
    { '@type': 'CreativeWork', name: 'UCSD Canine Aging Project — Health Outcomes', url: 'https://dogagingproject.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Spayed vs Unspayed', item: '' },
]);

export default async function SpayedVsUnspayedPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('spayedVsUnspayed', locale);

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
          { label: 'Spayed vs Unspayed' },
        ]}
        warningKey="breedMatters"
        sourcesText="AAHA, AVMA, and UCSD."
        relatedToolLabels={[
          'Check Gestation Timeline →',
          'Calculate Daily Calorie Needs →',
        ]}
      />
    </>
  );
}
