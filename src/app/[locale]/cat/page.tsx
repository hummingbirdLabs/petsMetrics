import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { CatHubContent } from '@/components/hub/CatHubContent';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Free Cat Health Calculators — Calories, Age, BCS & More',
    description:
      'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule, and gestation calculator. Free, no login.',
    keywords: 'free cat calculator, cat health tools, cat health calculator, kitten tools, cat nutrition calculator, cat age calculator, kitten vaccine schedule',
    alternates: {
      canonical: `${SITE_URL}/${locale}/cat/`,
    },
    openGraph: {
      title: 'Free Cat Health Calculators — Calories, Age, BCS & More | petsMetrics',
      description:
        'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule, and gestation calculator. Free, no login.',
      url: `${SITE_URL}/${locale}/cat/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/cat-hub.webp`, width: 1200, height: 630, alt: 'Free Cat Health Calculators — petsMetrics' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Cat Health Calculators — Calories, Age, BCS & More | petsMetrics',
      description: 'Science-based cat calculators: BCS weight tracker, hydration needs, human age, vaccination schedule. Free, no login.',
      images: [`${SITE_URL}/og/cat-hub.webp`],
    },
  };
}

export default function CatHubPage() {
  return <CatHubContent />;
}
