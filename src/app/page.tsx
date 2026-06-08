import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { HeroSection } from '@/components/home/HeroSection';
import { ProfileFocusSection } from '@/components/home/ProfileFocusSection';
import { ToolDiscovery } from '@/components/home/ToolDiscovery';
import { StatsBar } from '@/components/home/StatsBar';
import { FeaturedTool } from '@/components/home/FeaturedTool';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free Dog & Cat Health Calculators`,
  description:
    'Science-based tools for dog and cat owners. Calorie calculators, age converters, vaccination schedules, toxic food checker, and more. No login. Free forever.',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: `${SITE_NAME} — Free Dog & Cat Health Calculators`,
    description:
      'Science-based tools for dog and cat owners. Calorie calculators, age converters, vaccination schedules, toxic food checker, and more. No login. Free forever.',
    url: `${SITE_URL}/`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og/home.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — One Profile. Every Answer.`,
      },
    ],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Science-based pet health calculators for dogs and cats. Free, no login required.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Science-based pet health calculators for dogs and cats. Free, no login required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shared/toxic-checker/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={organizationSchema} />
      <JsonLdScript data={websiteSchema} />
      <HeroSection />
      <ProfileFocusSection />
      <ToolDiscovery />
      <StatsBar />
      <FeaturedTool />
    </>
  );
}
