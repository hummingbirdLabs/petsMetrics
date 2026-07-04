import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getCompareData } from '@/lib/seo/compare-data';
import { ComparePage } from '@/components/shared/ComparePage';
import { JsonLdScript } from '@/components/shared/JsonLdScript';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { const { locale } = params; return {
  title: 'Microchip vs Tattoo for Dogs: Which Is Better? | petsMetrics',
  description:
    'Compare microchips and tattoos for pet identification: reliability, safety, cost, and legal acceptance. AVMA and ISO standards cited. Find the best ID method for your dog.',
  keywords:
    'microchip vs tattoo for dogs, dog identification methods, microchip vs tattoo safety, pet microchip vs tattoo, best dog ID method',
  alternates: {
    canonical: `${SITE_URL}/${locale}/shared/compare/microchip-vs-tattoo/`,
  },
  openGraph: {
    title: 'Microchip vs Tattoo for Dogs: Which Is Better? | petsMetrics',
    description:
      'Compare microchips and tattoos for pet identification: reliability, safety, cost, and legal acceptance.',
    url: `${SITE_URL}/${locale}/shared/compare/microchip-vs-tattoo/`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Microchip vs Tattoo for Dogs Comparison' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microchip vs Tattoo for Dogs | petsMetrics',
    description: 'Compare microchips and tattoos for pet identification.',
    images: [`${SITE_URL}/og/home.webp`],
  },
};
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Microchip vs Tattoo for Dogs: Which Is Better?',
  description: 'Compare microchips and tattoos for pet identification: reliability, safety, cost, and legal acceptance.',
  author: { '@type': 'Organization', name: 'petsMetrics' },
  datePublished: '2026-07-03',
  dateModified: '2026-07-03',
  citation: [
    { '@type': 'CreativeWork', name: 'AVMA Microchipping of Animals', url: 'https://www.avma.org/resources-tools/avma-policies/microchipping-animals' },
    { '@type': 'CreativeWork', name: 'ISO 11784/11785 RFID Standards', url: 'https://www.iso.org/' },
  ],
};

const breadcrumbSchema = generateBreadcrumbJsonLd([
  { position: 1, name: 'Home', item: `${SITE_URL}/` },
  { position: 2, name: 'Microchip vs Tattoo', item: '' },
]);

export default async function MicrochipVsTattooPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const tc = await getTranslations('compare');
  const data = await getCompareData('microchipVsTattoo', locale);

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
          { label: 'Microchip vs Tattoo' },
        ]}
        sourcesText="AVMA and ISO."
        relatedToolLabels={[
          'Check EU Travel Requirements →',
          'Learn About Pet ID Laws →',
        ]}
      />
    </>
  );
}
