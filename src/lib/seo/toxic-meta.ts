import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import type { ToxicItem } from '@/lib/data/toxic-items';

function levelLabel(level: string): string {
  if (level === 'toxic') return 'Toxic';
  if (level === 'caution') return 'Caution';
  return 'Safe';
}

function h1Question(item: ToxicItem, species: 'dog' | 'cat'): string {
  if (species === 'dog') return `Can Dogs Eat ${item.name}?`;
  return `Is ${item.name} Toxic to Cats?`;
}

function fullTitle(item: ToxicItem, species: 'dog' | 'cat'): string {
  const question = h1Question(item, species);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  return `${question} — ${levelLabel(level)} | petsMetrics`;
}

function metaDescription(item: ToxicItem, species: 'dog' | 'cat'): string {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';
  if (level === 'toxic') return `${item.name} is toxic to ${pet}. Learn symptoms, emergency steps, and safe alternatives. ASPCA-backed, science-based reference.`;
  if (level === 'caution') return `${item.name} requires caution for ${pet}. Learn safe amounts, potential risks, and feeding guidelines. ASPCA-backed.`;
  return `${item.name} is generally safe for ${pet}. Learn safe serving guidelines and nutritional value. ASPCA-backed.`;
}

function slugToUrl(species: 'dog' | 'cat', slug: string): string {
  const prefix = species === 'dog' ? 'dog/can-dogs-eat' : 'cat/are-toxic-to-cats';
  return `${SITE_URL}/${prefix}/${slug}/`;
}

export function generateToxicMetadata(item: ToxicItem, species: 'dog' | 'cat'): Metadata {
  const title = fullTitle(item, species);
  const description = metaDescription(item, species);
  const url = slugToUrl(species, item.slug);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: SITE_NAME,
    },
    other: {
      'article:tag': [item.name, item.category, level, species],
    },
  };
}

export function generateToxicFaqJsonLd(item: ToxicItem, species: 'dog' | 'cat'): Record<string, unknown> {
  const question = h1Question(item, species);
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const pet = species === 'dog' ? 'dogs' : 'cats';

  let answerText: string;
  if (level === 'toxic') {
    answerText = `${item.name} is toxic to ${pet}. Common symptoms include: ${item.symptoms.join(', ')}. ${item.emergencyNote || ''} If ingestion occurred, contact ASPCA Animal Poison Control at (888) 426-4435 immediately.`;
  } else if (level === 'caution') {
    answerText = `${item.name} requires caution when fed to ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Symptoms of overconsumption include: ${item.symptoms.join(', ')}. Always consult a veterinarian.`;
  } else {
    answerText = `${item.name} is generally safe for ${pet}. ${item.safeAmount ? `Safe amount: ${item.safeAmount}. ` : ''}Always introduce new foods gradually and consult your veterinarian.`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerText,
        },
      },
    ],
  };
}

export function generateToxicArticleJsonLd(item: ToxicItem, species: 'dog' | 'cat'): Record<string, unknown> {
  const level = species === 'dog' ? item.dogLevel : item.catLevel;
  const url = slugToUrl(species, item.slug);
  const pet = species === 'dog' ? 'dogs' : 'cats';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fullTitle(item, species),
    description: metaDescription(item, species),
    url,
    about: {
      '@type': 'Thing',
      name: item.name,
      description: `Toxicity profile of ${item.name} for ${pet}: ${levelLabel(level)}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
