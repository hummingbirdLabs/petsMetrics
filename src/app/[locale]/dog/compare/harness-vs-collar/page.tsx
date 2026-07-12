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
    title: 'Harness vs Collar for Dogs: Which Is Right? | petsMetrics',
    description:
      'Science-backed comparison of harnesses and flat collars: neck safety, pull control, escape risk, comfort, and breed-specific recommendations. AAHA and veterinary behaviorist data cited.',
    keywords:
      'harness vs collar for dogs, harness or collar for dogs, best dog harness vs collar, collar vs harness safety, harness for brachycephalic dogs',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/compare/harness-vs-collar/`,
    },
    openGraph: {
      title: 'Harness vs Collar for Dogs: Which Is Right? | petsMetrics',
      description:
        'Compare harness vs collar for dogs: neck safety, pull control, and breed-specific recommendations.',
      url: `${SITE_URL}/${locale}/dog/compare/harness-vs-collar/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Harness vs Collar for Dogs Comparison' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Harness vs Collar for Dogs | petsMetrics',
      description: 'Compare harness vs collar for dogs: neck safety and control.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Harness vs Collar for Dogs: Which Is Right?',
  description: 'Science-backed comparison of harnesses and flat collars for dogs.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-05',
  dateModified: '2026-07-05',
  citation: [
    { '@type': 'CreativeWork', name: 'AAHA Canine Life Stage Guidelines (2021)', url: 'https://www.aaha.org/aaha-guidelines/life-stage-canine-2021/' },
    { '@type': 'CreativeWork', name: 'AVSAB Position Statement on Punishment', url: 'https://avsab.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Harness vs Collar', item: '' },
]);

export default async function HarnessVsCollarPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('harnessVsCollar', locale);

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
          { label: 'Harness vs Collar' },
        ]}
        sourcesText="AAHA and AVSAB."
        relatedToolLabels={[
          'Calculate Daily Energy Needs →',
          'Puppy Growth Predictor →',
        ]}
      />
    </>
  );
}
