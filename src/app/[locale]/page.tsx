import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import { graphJsonLd } from '@/lib/seo/geo-meta';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { HeroSection } from '@/components/home/HeroSection';
import { ProfileFocusSection } from '@/components/home/ProfileFocusSection';
import { ToolDiscovery } from '@/components/home/ToolDiscovery';
import { StatsBar } from '@/components/home/StatsBar';
import { FeaturedTool } from '@/components/home/FeaturedTool';
import { routing } from '@/lib/routing';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  return {
    title: `${SITE_NAME} — Free Dog & Cat Health Calculators`,
    description:
      'Science-based tools for dog and cat owners. Calorie calculators, age converters, vaccination schedules, toxic food checker, and more. No login. Free forever.',
    keywords: 'dog health calculator, cat health calculator, pet calculator, free pet tools, pet health tools online, free dog calculator, free cat calculator',
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
    },
    openGraph: {
      title: `${SITE_NAME} — Free Dog & Cat Health Calculators`,
      description:
        'Science-based tools for dog and cat owners. Calorie calculators, age converters, vaccination schedules, toxic food checker, and more. No login. Free forever.',
      url: `${SITE_URL}/${locale}/`,
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
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — Free Dog & Cat Health Calculators`,
      description: 'Science-based tools for dog and cat owners. Calorie calculators, age converters, vaccination schedules, toxic food checker, and more. No login. Free forever.',
      images: [`${SITE_URL}/og/home.webp`],
    },
  };
}

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Science-based pet health calculators for dogs and cats. Free, no login required.',
    sameAs: [
      'https://github.com/petsmetrics',
      'https://www.producthunt.com/@petsmetrics',
    ],
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is petsMetrics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'petsMetrics is a free, science-based pet health calculator suite for dog and cat owners. Create a pet profile once and all calculators auto-fill — calories, age, vaccines, toxic food checker, and more. No login required. All calculations run in your browser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are petsMetrics calculators free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all petsMetrics calculators are completely free. There is no login, no registration, and no paid tier. Our tools use AAHA, WSAVA, ASPCA, and AAFCO veterinary standards to provide accurate, science-backed results for dog and cat owners.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my pet data stored on petsMetrics servers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All pet profile data is stored only in your browser using localStorage. petsMetrics has no backend server to collect or store your data. You can export your profiles as JSON anytime for backup or cross-device transfer.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={graphJsonLd(organizationSchema, websiteSchema, faqSchema)} />
      <HeroSection />
      <ProfileFocusSection />
      <ToolDiscovery />
      <StatsBar />
      <FeaturedTool />
    </>
  );
}
