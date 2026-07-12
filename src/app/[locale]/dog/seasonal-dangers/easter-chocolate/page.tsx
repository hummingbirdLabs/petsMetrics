import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Easter Chocolate and Dogs: Easter Egg Hunt Safety | petsMetrics',
    description:
      'Easter chocolate toxicity guide for dog owners — theobromine poisoning thresholds, Easter-specific hazards (eggs, grass, lilies), symptoms timeline.',
    keywords:
      'easter chocolate dog, dog ate easter chocolate, easter egg hunt dog safety, easter lily dog toxicity, chocolate poisoning dogs easter',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/easter-chocolate/`,
    },
    openGraph: {
      title: 'Easter Chocolate and Dogs: Easter Egg Hunt Safety | petsMetrics',
      description: 'Easter chocolate toxicity guide — thresholds, hazards, and emergency response.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/easter-chocolate/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Easter chocolate safety guide for dogs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Easter Chocolate Safety for Dogs | petsMetrics',
      description: 'Easter chocolate toxicity guide with emergency action steps.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function EasterChocolatePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['easter-chocolate'];

  return (
    <SeasonalDangerPage
      slug="easter-chocolate"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.easterChocolate') },
      ]}
    />
  );
}
