import type { Metadata } from 'next';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { SeasonalDangerPage } from '@/components/shared/SeasonalDangerPage';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Dog Spring Allergies: Symptoms, Treatment & Prevention | petsMetrics',
    description:
      'Complete guide to canine spring allergies — pollen, grass, mold. Identify symptoms, distinguish them from infections, and implement effective treatment plans.',
    keywords:
      'dog spring allergies symptoms, dog pollen allergy treatment, dog seasonal allergies spring, canine atopic dermatitis, dog skin allergies',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/seasonal-dangers/spring-allergies/`,
    },
    openGraph: {
      title: 'Dog Spring Allergies: Symptoms & Treatment | petsMetrics',
      description: 'Evidence-based guide to canine seasonal allergy management.',
      url: `${SITE_URL}/${locale}/dog/seasonal-dangers/spring-allergies/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'Dog spring allergy management guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dog Spring Allergies: Symptoms & Treatment | petsMetrics',
      description: 'Evidence-based guide to canine seasonal allergy management.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default async function SpringAllergiesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const tc = await getTranslations('seasonal');
  const messages = await getMessages();
  const seasonalData = (messages as any).seasonal?.['spring-allergies'];

  return (
    <SeasonalDangerPage
      slug="spring-allergies"
      locale={locale}
      tc={tc}
      data={seasonalData}
      breadcrumb={[
        { label: tc('breadcrumb.home'), href: '' },
        { label: tc('breadcrumb.dog'), href: 'dog' },
        { label: tc('breadcrumb.seasonal'), href: 'dog/seasonal-dangers' },
        { label: tc('breadcrumb.springAllergies') },
      ]}
    />
  );
}
