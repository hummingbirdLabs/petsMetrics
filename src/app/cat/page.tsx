import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { CatHubContent } from '@/components/hub/CatHubContent';

export const metadata: Metadata = {
  title: 'Free Cat Health Calculators — Calories, Age, BCS & More',
  description:
    'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule, and gestation calculator. Free, no login.',
  alternates: {
    canonical: `${SITE_URL}/cat/`,
  },
  openGraph: {
    title: 'Free Cat Health Calculators — Calories, Age, BCS & More | petsMetrics',
    description:
      'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule, and gestation calculator. Free, no login.',
    url: `${SITE_URL}/cat/`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og/cat-hub.webp`, width: 1200, height: 630, alt: 'Cat Health Calculators' }],
  },
};

export default function CatHubPage() {
  return <CatHubContent />;
}
