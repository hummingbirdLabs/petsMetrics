import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Dog Nutrition FAQs: Feeding, Diet & Food Safety | petsMetrics',
    description:
      'Expert answers to the most common dog nutrition questions — calorie needs, feeding schedules, food safety, and diet selection. Based on AAFCO and WSAVA guidelines.',
    keywords:
      'dog nutrition FAQs, dog feeding questions, how much to feed a dog, dog food safety, best dog food diet',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/faq/nutrition/`,
    },
    openGraph: {
      title: 'Dog Nutrition FAQs: Feeding, Diet & Food Safety | petsMetrics',
      description:
        'Expert answers to common dog nutrition questions. Calorie needs, feeding schedules, food safety, and diet selection.',
      url: `${SITE_URL}/${locale}/dog/faq/nutrition/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog Nutrition FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Nutrition FAQs | petsMetrics',
      description: 'Expert answers to common dog nutrition questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function DogNutritionFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'dogNutrition' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.faq'), href: 'dog/faq' },
        { label: tc('breadcrumb.nutrition') },
      ]}
    />
  );
}
