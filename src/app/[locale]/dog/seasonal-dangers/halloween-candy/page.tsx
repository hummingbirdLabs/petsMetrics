import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'My Dog Ate Halloween Candy: Emergency Action Plan | petsMetrics',
    description:
      'Emergency guide for dogs who ate Halloween candy — recognizing toxicity signs, when to rush to the vet, and which candy types are most dangerous.',
    keywords:
      'dog ate halloween candy, halloween candy toxic to dogs, dog ate chocolate halloween, xylitol halloween candy dog, halloween pet emergency',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/halloween-candy/`,
    },
    openGraph: {
      title: 'Halloween Candy Toxicity: Dog Emergency Guide | petsMetrics',
      description: 'What to do if your dog ate Halloween candy — fast action saves lives.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/halloween-candy/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Halloween candy toxicity emergency guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Halloween Candy Toxicity: Dog Emergency Guide | petsMetrics',
      description: 'Emergency action plan for dogs who ate Halloween candy.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function HalloweenCandyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['halloween-candy'];

  return (
    <SeasonalDangerPage
      slug="halloween-candy"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.halloweenCandy') },
      ]}
    />
  );
}
