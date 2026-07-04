import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { ProfilePageContent } from '@/components/profile/ProfilePageContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string> } }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'My Pet Profiles — Free Dog & Cat Health Dashboard',
    description:
      'Create a free pet profile for your dog or cat. All health calculators auto-fill from your profile. No login required. 100% private.',
    keywords: 'pet profile, dog profile, cat profile, free pet dashboard, pet health tracker, pet weight tracker',
    alternates: {
      canonical: `${SITE_URL}/${locale}/profile/`,
    },
    openGraph: {
      title: 'My Pet Profiles — petsMetrics',
      description:
        'Create a free pet profile for your dog or cat. All health calculators auto-fill from your profile.',
      url: `${SITE_URL}/${locale}/profile/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/home.webp`, width: 1200, height: 630, alt: 'My Pet Profiles — petsMetrics' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'My Pet Profiles — Free Dog & Cat Health Dashboard | petsMetrics',
      description: 'Create a free pet profile for your dog or cat. All health calculators auto-fill from your profile.',
    },
  };
}

export default async function ProfilePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'petsMetrics Pet Profile Manager',
    url: `${SITE_URL}/${locale}/profile/`,
    description:
      'Create and manage pet profiles for dogs and cats. Auto-fills all health calculators.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
  };

  return (
    <>
      <JsonLdScript data={webAppSchema} />
      <ProfilePageContent disclaimerText={t('disclaimer.standard')} />
    </>
  );
}
