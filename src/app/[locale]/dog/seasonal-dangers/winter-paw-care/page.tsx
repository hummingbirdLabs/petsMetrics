import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Dog Paw Protection in Winter: Cold, Ice & Salt Safety | petsMetrics',
    description:
      'Expert guide to protecting dog paws in winter — preventing frostbite, ice burn, and road salt irritation.',
    keywords:
      'dog paw protection winter, dog paw frostbite treatment, dog road salt paws, winter paw care dogs, dog boots winter',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/winter-paw-care/`,
    },
    openGraph: {
      title: 'Winter Paw Protection for Dogs | petsMetrics',
      description: 'Protect dog paws from frostbite, ice burn, and road salt.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/winter-paw-care/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog winter paw care guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Winter Paw Protection for Dogs | petsMetrics',
      description: 'Protect dog paws from frostbite and salt damage.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function WinterPawCarePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['winter-paw-care'];

  return (
    <SeasonalDangerPage
      slug="winter-paw-care"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.winterPawCare') },
      ]}
    />
  );
}
