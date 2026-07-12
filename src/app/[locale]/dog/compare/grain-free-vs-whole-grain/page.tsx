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
    title: 'Grain-Free vs Whole Grain Dog Food: Which Is Healthier? | petsMetrics',
    description:
      'Evidence-based comparison of grain-free and whole grain kibble: DCM concerns, ingredient quality, glycemic response, allergies, and veterinary consensus. AAFCO, FDA, and WSAVA cited.',
    keywords:
      'grain free vs whole grain dog food, grain free dog food DCM, whole grain dog food benefits, is grain free bad for dogs, grain free vs grain inclusive',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/compare/grain-free-vs-whole-grain/`,
    },
    openGraph: {
      title: 'Grain-Free vs Whole Grain Dog Food: Which Is Healthier? | petsMetrics',
      description:
        'Grain-free vs whole grain dog food: FDA DCM investigation and veterinary nutrition consensus.',
      url: `${SITE_URL}/${locale}/dog/compare/grain-free-vs-whole-grain/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Grain-Free vs Whole Grain Comparison' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Grain-Free vs Whole Grain Dog Food | petsMetrics',
      description: 'Grain-free vs whole grain dog food comparison.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Grain-Free vs Whole Grain Dog Food: Which Is Healthier?',
  description: 'Evidence-based comparison of grain-free and whole grain kibble.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-05',
  dateModified: '2026-07-05',
  citation: [
    { '@type': 'CreativeWork', name: 'FDA Investigation into Diet-Associated DCM', url: 'https://www.fda.gov/animal-veterinary/outbreaks-and-advisories/fda-investigation-potential-link-between-certain-diets-and-canine-dilated-cardiomyopathy' },
    { '@type': 'CreativeWork', name: 'WSAVA Global Nutrition Guidelines', url: 'https://wsava.org/global-guidelines/vaccination-guidelines/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Dog Hub', item: `${SITE_URL}/dog/` },
  { position: 3, name: 'Grain-Free vs Whole Grain', item: '' },
]);

export default async function GrainFreeVsWholeGrainPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('grainFreeVsWholeGrain', locale);

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
          { label: 'Grain-Free vs Whole Grain' },
        ]}
        sourcesText="FDA and WSAVA."
        relatedToolLabels={[
          'Calculate Dog Calories →',
          'BCS Weight Tracker →',
        ]}
      />
    </>
  );
}
