import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Cat Health FAQs: Vaccines, Indoor Life & Wellness | petsMetrics',
    description:
      'Expert answers to common cat health questions — vaccination schedules, indoor vs outdoor risks, behavioral needs, and preventive care. Based on AAFP and ISFM guidelines.',
    keywords:
      'cat health FAQs, cat vaccination questions, indoor cat health, cat wellness care, feline preventive medicine',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/faq/health/`,
    },
    openGraph: {
      title: 'Cat Health FAQs: Vaccines, Indoor Life & Wellness | petsMetrics',
      description:
        'Expert answers to common cat health questions. Vaccination schedules, indoor vs outdoor risks, behavioral needs, and preventive care.',
      url: `${SITE_URL}/${locale}/cat/faq/health/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Cat Health FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cat Health FAQs | petsMetrics',
      description: 'Expert answers to common cat health questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function CatHealthFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'catHealth' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.cat'), href: 'cat' },
        { label: tc('breadcrumb.faq'), href: 'cat/faq' },
        { label: tc('breadcrumb.health') },
      ]}
    />
  );
}
