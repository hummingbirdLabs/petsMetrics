import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { DogHubContent } from '@/components/hub/DogHubContent';

export const metadata: Metadata = {
  title: 'Free Dog Health Calculators — Calories, Age, Vaccines & More',
  description:
    'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date. Free, no login. AAHA standards.',
  alternates: {
    canonical: `${SITE_URL}/dog/`,
  },
  openGraph: {
    title: 'Free Dog Health Calculators — Calories, Age, Vaccines & More | petsMetrics',
    description:
      'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date. Free, no login. AAHA standards.',
    url: `${SITE_URL}/dog/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/dog-hub.webp`, width: 1200, height: 630, alt: 'Dog Health Calculators' }],
  },
};

export default function DogHubPage() {
  return <DogHubContent />;
}
