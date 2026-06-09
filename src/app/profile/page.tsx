import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { ProfilePageContent } from '@/components/profile/ProfilePageContent';

export const metadata: Metadata = {
  title: 'My Pet Profiles — Free Dog & Cat Health Dashboard',
  description:
    'Create a free pet profile for your dog or cat. All health calculators auto-fill from your profile. No login required. 100% private.',
  alternates: {
    canonical: `${SITE_URL}/profile/`,
  },
  openGraph: {
    title: 'My Pet Profiles — petsMetrics',
    description:
      'Create a free pet profile for your dog or cat. All health calculators auto-fill from your profile.',
  },
};

export default async function ProfilePage() {
  const t = await getTranslations('common');
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'petsMetrics Pet Profile Manager',
    url: `${SITE_URL}/profile/`,
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
