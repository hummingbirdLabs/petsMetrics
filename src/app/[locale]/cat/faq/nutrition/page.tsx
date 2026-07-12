import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Cat Nutrition FAQs: Feeding, Hydration & Diet Questions | petsMetrics',
    description:
      'Expert answers to common cat nutrition questions — hydration needs, wet vs dry food, feeding schedules, and safe foods. Based on AAFP and NRC feline guidelines.',
    keywords:
      'cat nutrition FAQs, cat feeding questions, how much water does a cat need, wet vs dry food for cats, cat food safety',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/faq/nutrition/`,
    },
    openGraph: {
      title: 'Cat Nutrition FAQs: Feeding, Hydration & Diet Questions | petsMetrics',
      description:
        'Expert answers to common cat nutrition questions. Hydration needs, wet vs dry food, feeding schedules, and safe foods.',
      url: `${SITE_URL}/${locale}/cat/faq/nutrition/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Cat Nutrition FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cat Nutrition FAQs | petsMetrics',
      description: 'Expert answers to common cat nutrition questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function CatNutritionFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'catNutrition' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.cat'), href: 'cat' },
        { label: tc('breadcrumb.faq'), href: 'cat/faq' },
        { label: tc('breadcrumb.nutrition') },
      ]}
    />
  );
}
