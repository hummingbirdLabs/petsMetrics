import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/constants';
import {
  EU_COUNTRY_LABELS,
  EU_TRAVEL_REQUIREMENTS,
  type EUCountry,
  type TravelRequirement,
} from '@/lib/data/eu-travel-rules';

/**
 * 解析 country code → 可读名称
 */
export function countryName(code: string): string {
  const upper = code.toUpperCase();
  const name = EU_COUNTRY_LABELS[upper as EUCountry];
  if (name) return name;
  const nonEU: Record<string, string> = {
    US: 'the United States',
    CA: 'Canada',
    AU: 'Australia',
  };
  return nonEU[upper] ?? upper;
}

/**
 * 检查某条 TravelRequirement 是否适用于给定的 origin/destination（不含物种判断）
 */
export function isRequirementApplicable(
  req: TravelRequirement,
  origin: string,
  destination: string,
): boolean {
  const originOk =
    req.requiredFor.origin === 'all' ||
    req.requiredFor.origin.includes(origin.toUpperCase() as EUCountry);
  const destOk =
    req.requiredFor.destination === 'all' ||
    req.requiredFor.destination.includes(destination.toUpperCase() as EUCountry);
  return originOk && destOk;
}

/**
 * 需求适用性三态结果，考虑 origin/destination/species
 * - required: 适用于犬猫两种
 * - conditional: 适用于 origin/destination，但仅限单一物种
 * - not_required: 该路线不适用
 */
export type RequirementStatus = 'required' | 'conditional' | 'not_required';

export function getRequirementStatus(
  req: TravelRequirement,
  origin: string,
  destination: string,
): RequirementStatus {
  if (!isRequirementApplicable(req, origin, destination)) {
    return 'not_required';
  }
  const species = req.requiredFor.species;
  if (species.includes('dog') && species.includes('cat')) {
    return 'required';
  }
  return 'conditional';
}

/**
 * generateMetadata — 每个 origin→destination 配对独立 SEO metadata
 */
export function generateEUTravelMetadata(origin: string, destination: string): Metadata {
  const destName = countryName(destination);
  const originName = countryName(origin);
  const title = `Traveling to ${destName} with Your Pet — Requirements Checklist`;
  const description = `Complete guide for traveling from ${originName} to ${destName} with your dog or cat. EU pet passport, rabies vaccine, tapeworm treatment, microchip requirements — updated for 2026.`;
  const url = `${SITE_URL}/shared/eu-pet-travel/${origin.toLowerCase()}-to-${destination.toLowerCase()}/`;

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
    keywords: [
      'pet travel',
      `travel to ${destName} with pet`,
      'EU pet passport',
      'rabies vaccine',
      'pet microchip',
      'animal health certificate',
      destination,
      origin,
    ],
  };
}

/**
 * FAQPage Schema.org JSON-LD — 每个 TravelRequirement 生成一个问答对
 */
export function generateEUTravelFaqJsonLd(
  origin: string,
  destination: string,
): Record<string, unknown> {
  const destName = countryName(destination);
  const originName = countryName(origin);

  const mainEntity = EU_TRAVEL_REQUIREMENTS.map((req) => {
    const question = `Is a ${req.name} required when traveling from ${originName} to ${destName}?`;
    const applicable = isRequirementApplicable(req, origin, destination);

    let answerText: string;
    if (applicable) {
      answerText = `Yes, ${req.name.toLowerCase()} is required. ${req.description}`;
      if (req.leadTimeDays) {
        answerText += ` Plan ahead: this requirement must be completed approximately ${req.leadTimeDays} days before travel.`;
      }
      answerText += ` Source: ${req.officialSource}`;
    } else {
      answerText = `This requirement is not specifically required for travel from ${originName} to ${destName}. However, ${req.name.toLowerCase()} is a general EU pet travel requirement and may apply depending on your specific situation.`;
    }

    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerText,
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}
