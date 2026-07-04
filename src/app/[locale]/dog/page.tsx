import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { DogHubContent } from '@/components/hub/DogHubContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string> } }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Free Dog Health Calculators — Calories, Age, Vaccines & More',
    description:
      'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date. Free, no login. AAHA standards.',
    keywords: 'free dog calculator, dog health tools, dog health calculator, puppy tools, dog nutrition calculator, dog age calculator, puppy vaccine schedule',
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog/`,
    },
    openGraph: {
      title: 'Free Dog Health Calculators — Calories, Age, Vaccines & More | petsMetrics',
      description:
        'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date. Free, no login. AAHA standards.',
      url: `${SITE_URL}/${locale}/dog/`,
      type: 'website',
      images: [{ url: `${SITE_URL}/og/dog-hub.webp`, width: 1200, height: 630, alt: 'Free Dog Health Calculators — petsMetrics' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Dog Health Calculators — Calories, Age, Vaccines & More | petsMetrics',
      description: 'Science-based dog calculators: calorie needs, human age, puppy growth, vaccination schedule, and gestation due date. Free, no login.',
      images: [`${SITE_URL}/og/dog-hub.webp`],
    },
  };
}

export default function DogHubPage() {
  return <DogHubContent />;
}
