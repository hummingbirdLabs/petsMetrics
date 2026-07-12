import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Cat Age FAQs: Senior Care, Longevity & Life Stages | petsMetrics',
    description:
      'Expert answers to cat aging questions — life stage transitions, senior care needs, longevity factors, and when to start geriatric screenings. Based on AAFP and ISFM guidelines.',
    keywords:
      'cat age FAQs, cat life stages, when is a cat senior, cat longevity, senior cat care questions',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/faq/aging/`,
    },
    openGraph: {
      title: 'Cat Age FAQs: Senior Care, Longevity & Life Stages | petsMetrics',
      description:
        'Expert answers to cat aging questions. Life stage transitions, senior care needs, longevity factors, and geriatric screenings.',
      url: `${SITE_URL}/${locale}/cat/faq/aging/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Cat Age FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cat Age FAQs | petsMetrics',
      description: 'Expert answers to cat aging questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function CatAgingFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'catAging' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.cat'), href: 'cat' },
        { label: tc('breadcrumb.faq'), href: 'cat/faq' },
        { label: tc('breadcrumb.aging') },
      ]}
    />
  );
}
