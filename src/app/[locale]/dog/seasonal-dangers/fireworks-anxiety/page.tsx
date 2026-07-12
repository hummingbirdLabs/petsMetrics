import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'How to Calm a Dog During Fireworks: Anxiety Management Guide | petsMetrics',
    description:
      'Complete guide to managing dog fireworks anxiety — prevention strategies, environmental management, medications, behavioral techniques.',
    keywords:
      'how to calm dog during fireworks, dog fireworks anxiety treatment, fireworks scared dog, dog thunder fireworks phobia, fireworks night dog safety',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/fireworks-anxiety/`,
    },
    openGraph: {
      title: 'Fireworks Anxiety in Dogs: Management Guide | petsMetrics',
      description: 'Evidence-based strategies to calm your dog during fireworks.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/fireworks-anxiety/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog fireworks anxiety guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Fireworks Anxiety in Dogs | petsMetrics',
      description: 'Evidence-based strategies to calm your dog during fireworks.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function FireworksAnxietyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['fireworks-anxiety'];

  return (
    <SeasonalDangerPage
      slug="fireworks-anxiety"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.fireworksAnxiety') },
      ]}
    />
  );
}
