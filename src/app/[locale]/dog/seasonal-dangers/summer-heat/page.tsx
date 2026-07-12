import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'How to Keep Your Dog Cool in Summer: Heat Safety Guide | petsMetrics',
    description:
      'Complete guide to preventing heatstroke in dogs — recognizing early symptoms, cooling techniques, unsafe temperature thresholds, and emergency steps.',
    keywords:
      'how to keep dog cool in summer, dog heatstroke prevention, dog heatstroke symptoms, hot weather dog safety, can dogs overheat',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/summer-heat/`,
    },
    openGraph: {
      title: 'How to Keep Your Dog Cool in Summer | petsMetrics',
      description: 'Prevent heatstroke in dogs with evidence-based cooling and safety guidelines.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/summer-heat/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog summer heat safety guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Summer Heat Safety | petsMetrics',
      description: 'Prevent heatstroke in dogs with evidence-based guidelines.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function SummerHeatPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['summer-heat'];

  return (
    <SeasonalDangerPage
      slug="summer-heat"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.summerHeat') },
      ]}
    />
  );
}
