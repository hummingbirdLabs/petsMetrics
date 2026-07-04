import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { SITE_URL, SITE_NAME } from '@/constants';
import { getAllEUTravelRoutes } from '@/lib/data/routes';
import {
  EU_COUNTRY_CODES,
  EU_TRAVEL_REQUIREMENTS,
  EU_COUNTRY_LABELS,
} from '@/lib/data/eu-travel-rules';
import { checkEUTravelRequirements } from '@/lib/calculators/eu-travel.calc';
import { graphJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/geo-meta';
import { getEUTravelRulesUpdatedDate } from '@/lib/data/content-version';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { PetProfileBar } from '@/components/shared/PetProfileBar';
import { ErrorBoundaryWrapper } from '@/components/shared/ErrorBoundaryWrapper';
import { JsonLdScript } from '@/components/shared/JsonLdScript';
import { Card } from '@/components/ui/Card';
import { DisclaimerSection } from '@/components/shared/DisclaimerSection';
import { getTranslations } from 'next-intl/server';
import { createPageUrl } from '@/lib/utils/url';

type Props = {
  params: {
    locale: string;
    slug: string[];
  };
};

/**
 * 解析 slug 数组获取 origin 和 destination
 * URL 模式: /shared/eu-pet-travel/[origin]-to-[destination]
 */
function parseSlug(slug: string[]): { origin: string; destination: string } | null {
  if (!slug || slug.length === 0) return null;

  const fullSlug = slug.join('/');
  const match = fullSlug.match(/^([a-z]+)-to-([a-z]+)$/);

  if (!match) return null;

  const origin = match[1].toUpperCase();
  const destination = match[2].toUpperCase();

  // 验证国家代码是否有效
  const validCodes = new Set([...EU_COUNTRY_CODES, 'US', 'CA', 'AU']);
  if (!validCodes.has(origin) || !validCodes.has(destination)) return null;

  return { origin, destination };
}

export async function generateStaticParams() {
  const routes = getAllEUTravelRoutes();
  const params: { slug: string[] }[] = [];

  for (const route of routes) {
    params.push({
      slug: [`${route.origin.toLowerCase()}-to-${route.destination.toLowerCase()}`],
    });
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseSlug(params.slug);
  if (!parsed) {
    return {
      title: 'EU Pet Travel Requirements | petsMetrics',
      description: 'Check EU pet travel requirements for your destination.',
    };
  }

  const originLabel = EU_COUNTRY_LABELS[parsed.origin as keyof typeof EU_COUNTRY_LABELS] || parsed.origin;
  const destLabel = EU_COUNTRY_LABELS[parsed.destination as keyof typeof EU_COUNTRY_LABELS] || parsed.destination;

  return {
    title: `Pet Travel: ${originLabel} to ${destLabel} Requirements | petsMetrics`,
    description:
      `Check official pet travel requirements from ${originLabel} to ${destLabel}. Microchip, rabies vaccine, tapeworm, and documentation requirements.`,
    keywords: `pet travel ${originLabel} to ${destLabel}, ${originLabel} ${destLabel} pet requirements, EU pet travel, moving pets ${destLabel}`,
    alternates: {
      canonical: `${SITE_URL}/${params.locale}/shared/eu-pet-travel/${parsed.origin.toLowerCase()}-to-${parsed.destination.toLowerCase()}/`,
    },
    openGraph: {
      title: `Pet Travel Requirements: ${originLabel} → ${destLabel} | petsMetrics`,
      description: `Official requirements for traveling with dogs and cats from ${originLabel} to ${destLabel}.`,
      url: `${SITE_URL}/${params.locale}/shared/eu-pet-travel/${parsed.origin.toLowerCase()}-to-${parsed.destination.toLowerCase()}/`,
      type: 'article',
      images: [{ url: `${SITE_URL}/og/eu-pet-travel.webp`, width: 1200, height: 630, alt: `Pet Travel Requirements: ${originLabel} to ${destLabel}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Pet Travel Requirements: ${originLabel} → ${destLabel} | petsMetrics`,
      description: `Official requirements for traveling with dogs and cats from ${originLabel} to ${destLabel}.`,
      images: [`${SITE_URL}/og/eu-pet-travel.webp`],
    },
  };
}

export default async function EUTravelDetailPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const pageUrl = createPageUrl(locale);

  const parsed = parseSlug(slug);
  if (!parsed) {
    notFound();
    return null;
  }

  const { origin, destination } = parsed;
  const originLabel = EU_COUNTRY_LABELS[origin as keyof typeof EU_COUNTRY_LABELS] || origin;
  const destLabel = EU_COUNTRY_LABELS[destination as keyof typeof EU_COUNTRY_LABELS] || destination;

  const t = await getTranslations('common');

  // 获取适用于该路线的要求
  const applicableRequirements = EU_TRAVEL_REQUIREMENTS.filter((req) => {
    if (!req.requiredFor.species.includes('dog')) return false;

    const originMatch = req.requiredFor.origin === 'all' ||
      (Array.isArray(req.requiredFor.origin) && req.requiredFor.origin.includes(origin as any));
    const destMatch = req.requiredFor.destination === 'all' ||
      (Array.isArray(req.requiredFor.destination) && req.requiredFor.destination.includes(destination as any));

    return originMatch && destMatch;
  });

  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { position: 1, name: 'Home', item: `${SITE_URL}/${locale}/` },
    { position: 2, name: 'EU Pet Travel Checker', item: `${SITE_URL}/${locale}/shared/eu-pet-travel-checker/` },
    { position: 3, name: `${originLabel} → ${destLabel}`, item: '' },
  ]);

  const euUpdatedDate = getEUTravelRulesUpdatedDate();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Pet Travel Requirements: ${originLabel} to ${destLabel}`,
    description: `Official requirements for traveling with dogs and cats from ${originLabel} to ${destLabel}.`,
    author: { '@type': 'Organization', name: 'petsMetrics' },
    datePublished: euUpdatedDate,
    dateModified: euUpdatedDate,
  };

  return (
    <>
      <JsonLdScript data={graphJsonLd(articleSchema, breadcrumbSchema)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '' },
            { label: 'EU Pet Travel Checker', href: 'shared/eu-pet-travel-checker' },
            { label: `${originLabel} → ${destLabel}` },
          ]}
        />
      </div>
      <ErrorBoundaryWrapper>
        <PetProfileBar profile={null} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      </ErrorBoundaryWrapper>
      <SidebarLayout
        main={
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[--gray-900] sm:text-4xl">
                Pet Travel: {originLabel} → {destLabel}
              </h1>
              <p className="mt-2 text-base text-[--gray-500]">
                Official requirements for traveling with dogs and cats from {originLabel} to {destLabel}.
                Based on EU Regulation 576/2013 and official government sources.
              </p>
            </div>

            <Card padding="lg">
              <h2 className="text-xl font-semibold text-[--gray-900] mb-4">Required Documentation</h2>
              <ul className="space-y-3">
                {applicableRequirements.map((req) => (
                  <li key={req.id} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-800">
                      ✓
                    </span>
                    <div>
                      <p className="font-medium text-[--gray-900]">{req.name}</p>
                      <p className="text-sm text-[--gray-600]">{req.description}</p>
                      {req.leadTimeDays && (
                        <p className="mt-1 text-xs text-[--gray-500]">
                          Lead time: {req.leadTimeDays} days before travel
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <DisclaimerSection text={t('disclaimer.tool')} variant="tool" />
          </div>
        }
        sidebar={
          <div className="flex flex-col gap-4">
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Quick Info</p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[--gray-600]">
                <li>Origin: {originLabel}</li>
                <li>Destination: {destLabel}</li>
                <li>Species: Dog, Cat</li>
              </ul>
            </Card>
            <Card padding="md">
              <p className="text-sm font-semibold text-[--gray-900]">Need Help?</p>
              <p className="mt-2 text-sm text-[--gray-600]">
                Use our interactive checker to verify all requirements for your specific situation.
              </p>
              <a
                href={pageUrl('shared/eu-pet-travel-checker')}
                className="mt-3 inline-block text-sm font-medium text-[--primary] hover:underline"
              >
                Go to Checker →
              </a>
            </Card>
          </div>
        }
      />
    </>
  );
}
