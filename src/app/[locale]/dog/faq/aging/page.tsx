import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Dog Age FAQs: Senior Care, Longevity & Life Stages | petsMetrics',
    description:
      'Expert answers to dog aging questions — life stage transitions, senior care needs, longevity factors, and when to start geriatric screenings. Based on AAHA and UCSD research.',
    keywords:
      'dog age FAQs, dog life stages, when is a dog senior, dog longevity, senior dog care questions',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/faq/aging/`,
    },
    openGraph: {
      title: 'Dog Age FAQs: Senior Care, Longevity & Life Stages | petsMetrics',
      description:
        'Expert answers to dog aging questions. Life stage transitions, senior care needs, longevity factors, and geriatric screenings.',
      url: `${SITE_URL}/${locale}/dog/faq/aging/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog Age FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Age FAQs | petsMetrics',
      description: 'Expert answers to dog aging questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function DogAgingFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'dogAging' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.faq'), href: 'dog/faq' },
        { label: tc('breadcrumb.aging') },
      ]}
    />
  );
}
