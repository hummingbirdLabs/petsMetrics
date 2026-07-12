import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Christmas Foods Toxic to Dogs: Holiday Food Safety Guide | petsMetrics',
    description:
      'Complete guide to Christmas foods dangerous for dogs — chocolate, xylitol-sweetened treats, cooked bones, grapes, onions, and alcohol.',
    keywords:
      'christmas foods toxic to dogs, dog ate christmas chocolate, dog ate christmas ham, xylitol christmas cookies dogs, holiday food safety dogs',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/christmas-foods/`,
    },
    openGraph: {
      title: 'Christmas Foods Toxic to Dogs | petsMetrics',
      description: 'Holiday food safety guide: toxic Christmas foods for dogs.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/christmas-foods/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Christmas food toxicity guide for dogs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Christmas Foods Toxic to Dogs | petsMetrics',
      description: 'Keep your dog safe this Christmas from toxic holiday foods.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function ChristmasFoodsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['christmas-foods'];

  return (
    <SeasonalDangerPage
      slug="christmas-foods"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.christmasFoods') },
      ]}
    />
  );
}
