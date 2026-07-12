import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Thanksgiving Foods Dogs Can Eat: Safe vs Dangerous Guide | petsMetrics',
    description:
      'Complete Thanksgiving food safety guide for dogs — safe foods (plain turkey, pumpkin, green beans) and toxic foods (grapes, onions, butter, alcohol).',
    keywords:
      'thanksgiving foods dogs can eat, dog ate thanksgiving turkey, thanksgiving safe foods for dogs, dog ate thanksgiving stuffing, is thanksgiving turkey safe for dogs',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/thanksgiving/`,
    },
    openGraph: {
      title: 'Thanksgiving Foods Dogs Can Eat: Safe vs Dangerous | petsMetrics',
      description: 'Complete Thanksgiving food safety guide for dogs.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/thanksgiving/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Thanksgiving food safety guide for dogs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Thanksgiving Foods Dogs Can Eat | petsMetrics',
      description: 'Keep your dog safe this Thanksgiving — know which foods are toxic.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function ThanksgivingPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['thanksgiving'];

  return (
    <SeasonalDangerPage
      slug="thanksgiving"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.thanksgiving') },
      ]}
    />
  );
}
