import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { FaqHubPage } from '@/components/shared/FaqHubPage';
import type { FaqHubKey } from '@/lib/seo/faq-hub-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Dog Health FAQs: Vaccines, Growth & Wellness | petsMetrics',
    description:
      'Expert answers to common dog health questions — vaccination schedules, growth milestones, spay/neuter timing, and preventive care. Based on WSAVA and AAHA guidelines.',
    keywords:
      'dog health FAQs, dog vaccination questions, puppy growth milestones, when to spay neuter dog, dog wellness care',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/faq/health/`,
    },
    openGraph: {
      title: 'Dog Health FAQs: Vaccines, Growth & Wellness | petsMetrics',
      description:
        'Expert answers to common dog health questions. Vaccination schedules, growth milestones, spay/neuter timing, and preventive care.',
      url: `${SITE_URL}/${locale}/dog/faq/health/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog Health FAQs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Health FAQs | petsMetrics',
      description: 'Expert answers to common dog health questions.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function DogHealthFaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('faqHub');

  return (
    <FaqHubPage
      hubKey={'dogHealth' as FaqHubKey}
      locale={locale}
      tc={tc}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.faq'), href: 'dog/faq' },
        { label: tc('breadcrumb.health') },
      ]}
    />
  );
}
